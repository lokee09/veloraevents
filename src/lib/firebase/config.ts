'use client';

// Important: Replace with your actual Firebase project configuration
// and add these variables to your environment variables (.env.local)

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD31UtyCjIO3Y-RjYxYBiN_I_jNQ2WD7Gs",
  authDomain: "studio-4508634926-3fd6e.firebaseapp.com",
  projectId: "studio-4508634926-3fd6e",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "159101215057",
  appId: "1:159101215057:web:58fca6ea2b290b865bf370",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
