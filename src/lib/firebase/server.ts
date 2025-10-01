import admin from 'firebase-admin';

// This function ensures there's a single initialized Firebase Admin app per request.
function getAdminApp() {
  // If an app is already initialized, return it.
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.App;
  }

  // Otherwise, initialize a new one.
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    // This warning is crucial for debugging deployment issues.
    console.warn(
      'FIREBASE_SERVICE_ACCOUNT_KEY is not set. Admin features will be disabled. This is expected in client-side rendering but is an error on the server.'
    );
    return null;
  }

  try {
    const serviceAccount = JSON.parse(
      Buffer.from(serviceAccountKey, 'base64').toString('utf-8')
    );

    // Initialize the app with the service account and storage bucket.
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error: any) {
    console.error('Firebase admin initialization error:', error.stack);
    // In a serverless environment, throwing an error is better than failing silently.
    throw new Error('Failed to initialize Firebase Admin SDK. Check server logs for details.');
  }
}

// Getter functions that ensure the app is initialized before returning the service.
// This is a more reliable pattern for serverless environments like Vercel.
function getAdminAuth() {
  const app = getAdminApp();
  return app ? app.auth() : null;
}

function getAdminDb() {
  const app = getAdminApp();
  return app ? app.firestore() : null;
}

function getAdminStorage() {
  const app = getAdminApp();
  return app ? app.storage() : null;
}

export const adminAuth = getAdminAuth();
export const adminDb = getAdminDb();
export const adminStorage = getAdminStorage();
