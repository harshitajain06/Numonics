import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { Platform } from 'react-native';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAmp5ofC6lOKmGxESLZCwXxWI-2MNjxmv4",
  authDomain: "numonics-226e1.firebaseapp.com",
  projectId: "numonics-226e1",
  storageBucket: "numonics-226e1.firebasestorage.app",
  messagingSenderId: "743253914783",
  appId: "1:743253914783:web:9888859a197c4a99041eaa",
  measurementId: "G-4QXT7RTPPF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Use correct auth initialization based on platform
let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app); // Use standard web auth
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth };

export const db = getFirestore(app);
export const storage = getStorage(app);
export const usersRef = collection(db, 'users');
