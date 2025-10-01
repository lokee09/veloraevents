'use server';

import { z } from 'zod';
import { adminDb, adminStorage, adminAuth } from './firebase/server';
import { revalidatePath } from 'next/cache';
import { nanoid } from 'nanoid';
import type { Registration } from './types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const registrationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  ign: z.string().min(2, 'In-game name must be at least 2 characters'),
  bgmiUid: z.string().regex(/^\d{8,12}$/, 'Invalid BGMI UID'),
  teamName: z.string().min(2, 'Team name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Invalid phone number'),
  transactionId: z.string().min(5, 'Transaction ID is required'),
});

const fileSchema = z.instanceof(File, { message: 'Screenshot is required' }).refine(
  (file) => file.size > 0, 'Screenshot is required'
).refine(
  (file) => file.size < 4 * 1024 * 1024, 'Screenshot must be less than 4MB'
);

export async function registerTeam(prevState: any, formData: FormData) {
  if (!adminDb || !adminStorage) {
    return {
      message: 'Server not configured. Please contact support.',
      errors: {},
    };
  }

  const registrationOpen = await getRegistrationStatus();
  if (!registrationOpen) {
    return {
      message: 'Registrations are currently closed.',
      errors: {},
    };
  }

  const validatedFields = registrationSchema.safeParse(Object.fromEntries(formData.entries()));
  const validatedFile = fileSchema.safeParse(formData.get('screenshot'));

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (!validatedFile.success) {
    return {
      message: 'Invalid file.',
      errors: { screenshot: validatedFile.error.flatten().formErrors },
    };
  }

  const { data } = validatedFields;
  const file = validatedFile.data;

  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${nanoid()}.${fileExtension}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const bucket = adminStorage.bucket();
    const fileUpload = bucket.file(`screenshots/${fileName}`);
    
    await fileUpload.save(fileBuffer, {
      metadata: { contentType: file.type },
    });

    const [screenshotUrl] = await fileUpload.getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    });

    const registrationData: Omit<Registration, 'id'> = {
      ...data,
      screenshotUrl,
      createdAt: Date.now(),
    };

    await adminDb.collection('registrations').add(registrationData);
    
  } catch (error) {
    console.error('Registration error:', error);
    return { message: 'An error occurred during registration. Please try again.', errors: {} };
  }

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/register');
  // We don't redirect here anymore, success is handled on the client.
   return { message: '', errors: {} };
}

export async function deleteRegistration(id: string) {
    if (!adminDb) {
      console.error('Admin DB not initialized');
      throw new Error('Server not configured');
    }
    if (!id) {
        throw new Error('Registration ID is required');
    }

    try {
        await adminDb.collection('registrations').doc(id).delete();
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        console.error("Error deleting registration: ", error);
        throw new Error('Failed to delete registration');
    }
}

export async function createSession(idToken: string) {
  if (!adminAuth) {
    console.error('Admin Auth not initialized');
    return { success: false, error: 'Could not create session. Auth not configured.' };
  }
  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    cookies().set('session', sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });
    return { success: true };
  } catch (error) {
    console.error('Session creation error:', error);
    return { success: false, error: 'Could not create session.' };
  }
}

export async function clearSession() {
  cookies().delete('session');
  redirect('/login');
}

export async function getRegistrationsAsCsv() {
  if (!adminDb) {
    console.error('Admin DB not initialized');
    return null;
  }
  try {
    const snapshot = await adminDb.collection('registrations').orderBy('createdAt', 'desc').get();
    if (snapshot.empty) {
      return '';
    }

    const registrations = snapshot.docs.map(doc => doc.data() as Omit<Registration, 'id'>);

    const headers = ['FullName', 'IGN', 'BGMI_UID', 'TeamName', 'Email', 'Phone', 'TransactionID', 'ScreenshotURL', 'RegisteredAt'];
    const csvRows = [headers.join(',')];

    for (const reg of registrations) {
      const registeredAt = new Date(reg.createdAt).toLocaleString();
      const values = [
        `"${reg.fullName}"`,
        `"${reg.ign}"`,
        `"${reg.bgmiUid}"`,
        `"${reg.teamName}"`,
        `"${reg.email}"`,
        `"${reg.phone}"`,
        `"${reg.transactionId}"`,
        `"${reg.screenshotUrl}"`,
        `"${registeredAt}"`,
      ];
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  } catch (error) {
    console.error('Error fetching registrations for CSV:', error);
    return null;
  }
}

export async function getRegistrationByEmail(email: string): Promise<Registration | null> {
  if (!adminDb) {
    console.error('Admin DB not initialized');
    return null;
  }
  
  const emailSchema = z.string().email();
  const validation = emailSchema.safeParse(email);

  if (!validation.success) {
    return null;
  }

  try {
    const snapshot = await adminDb.collection('registrations').where('email', '==', validation.data).limit(1).get();
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as Registration;
  } catch (error) {
    console.error('Error fetching registration by email:', error);
    return null;
  }
}

async function getSettingsDoc() {
    if (!adminDb) return null;
    return adminDb.collection('settings').doc('registration');
}

export async function getRegistrationStatus(): Promise<boolean> {
    const doc = await getSettingsDoc();
    if (!doc) return false;

    try {
        const snapshot = await doc.get();
        if (!snapshot.exists) {
            // Default to open if the setting doesn't exist
            return true;
        }
        return snapshot.data()?.isOpen ?? true;
    } catch (error) {
        console.error("Error fetching registration status:", error);
        return false;
    }
}

export async function toggleRegistrationStatus(): Promise<boolean> {
    const doc = await getSettingsDoc();
    if (!doc) throw new Error("Database not configured");

    const currentStatus = await getRegistrationStatus();
    const newStatus = !currentStatus;

    await doc.set({ isOpen: newStatus }, { merge: true });
    
    revalidatePath('/register');
    revalidatePath('/admin');
    
    return newStatus;
}
