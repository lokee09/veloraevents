import { adminDb } from '@/lib/firebase/server';
import type { Registration } from '@/lib/types';
import { columns } from './components/columns';
import { ClientPage } from './components/client-page';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RegistrationToggle } from './components/registration-toggle';
import { getRegistrationStatus } from '@/lib/actions';

// This is the key change to prevent build-time prerendering
export const dynamic = 'force-dynamic';

async function getRegistrations(): Promise<Registration[]> {
  if (!adminDb) {
    console.warn("Admin DB not initialized. Cannot fetch registrations.");
    return [];
  }
  try {
    const snapshot = await adminDb.collection('registrations').orderBy('createdAt', 'desc').get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Registration));
  } catch (error) {
    console.error("Error fetching registrations: ", error);
    return [];
  }
}

export default async function AdminPage() {
  if (!adminDb) {
    return (
        <div className="container mx-auto">
            <Alert variant="destructive">
                <AlertTitle>Server Not Configured</AlertTitle>
                <AlertDescription>
                    The Firebase Admin SDK is not configured correctly, so registrations cannot be displayed.
                </AlertDescription>
            </Alert>
        </div>
    )
  }
  const registrations = await getRegistrations();
  const registrationStatus = await getRegistrationStatus();

  return (
    <div className="container mx-auto">
      <ClientPage data={registrations} columns={columns} initialRegistrationStatus={registrationStatus} />
    </div>
  );
}
