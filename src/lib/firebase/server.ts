import admin from 'firebase-admin';

// Important: Your Firebase service account key should be stored securely
// as an environment variable, not committed to version control.
// 1. Go to your Firebase Project Settings -> Service accounts.
// 2. Click "Generate new private key" and save the JSON file.
// 3. Encode the contents of the JSON file to a base64 string.
//    You can use an online tool or a command like:
//    base64 -i [path to your service account file] -o output.txt
// 4. Set the base64 string as an environment variable (e.g., FIREBASE_SERVICE_ACCOUNT_KEY).

// This function ensures there's a single initialized Firebase Admin app.
function initializeAdminApp() {
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.App;
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    console.warn(
      'FIREBASE_SERVICE_ACCOUNT_KEY is not set. Admin features will be disabled.'
    );
    return null;
  }

  try {
    const serviceAccount = JSON.parse(
      Buffer.from(serviceAccountKey, 'base64').toString('utf-8')
    );

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error: any) {
    console.error('Firebase admin initialization error', error.stack);
    // Throwing an error is important to avoid silent failures.
    throw new Error('Failed to initialize Firebase Admin SDK. Check server logs for details.');
  }
}

function getAdminAuth() {
  const app = initializeAdminApp();
  if (!app) return null;
  return app.auth();
}

function getAdminDb() {
  const app = initializeAdminApp();
  if (!app) return null;
  return app.firestore();
}

function getAdminStorage() {
  const app = initializeAdminApp();
  if (!app) return null;
  return app.storage();
}

export const adminAuth = getAdminAuth();
export const adminDb = getAdminDb();
export const adminStorage = getAdminStorage();