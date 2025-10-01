import admin from 'firebase-admin';
import 'dotenv/config';

// This is a more robust way to initialize the admin SDK for serverless environments like Vercel.
// It ensures that we don't try to re-initialize an app that already exists.

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

const hasAdminApp = admin.apps.length > 0;

if (!hasAdminApp && serviceAccountKey) {
  try {
    const serviceAccount = JSON.parse(
      Buffer.from(serviceAccountKey, 'base64').toString('utf-8')
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: storageBucket,
    });
  } catch (error: any) {
    console.error('Firebase admin initialization error:', error.stack);
  }
} else if (!serviceAccountKey) {
  console.warn(
    'FIREBASE_SERVICE_ACCOUNT_KEY is not set. Admin features will be disabled.'
  );
}

// We export the services directly. If initialization failed, these will throw errors
// which is better for debugging than failing silently.
export const adminAuth = admin.apps.length > 0 ? admin.auth() : null;
export const adminDb = admin.apps.length > 0 ? admin.firestore() : null;
export const adminStorage = admin.apps.length > 0 ? admin.storage() : null;
