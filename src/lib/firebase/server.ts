import admin from 'firebase-admin';

// Important: Your Firebase service account key should be stored securely
// as an environment variable, not committed to version control.
// 1. Go to your Firebase Project Settings -> Service accounts.
// 2. Click "Generate new private key" and save the JSON file.
// 3. Encode the contents of the JSON file to a base64 string.
//    You can use an online tool or a command like:
//    base64 -i [path to your service account file] -o output.txt
// 4. Set the base64 string as an environment variable (e.g., FIREBASE_SERVICE_ACCOUNT_KEY).

function getAdminApp() {
  if (admin.apps.length > 0) {
    return admin.apps[0]!;
  }

  try {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string, 'base64').toString('utf-8')
    );

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error: any) {
    console.error('Firebase admin initialization error', error.stack);
    // Re-throwing the error is important to avoid silent failures.
    throw new Error('Failed to initialize Firebase Admin SDK.');
  }
}

function getAdminAuth() {
  return getAdminApp().auth();
}

function getAdminDb() {
  return getAdminApp().firestore();
}

function getAdminStorage() {
  return getAdminApp().storage();
}

export const adminAuth = getAdminAuth();
export const adminDb = getAdminDb();
export const adminStorage = getAdminStorage();
