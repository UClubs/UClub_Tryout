import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_KEY,
  authDomain: "uclub-rn.firebaseapp.com",
  projectId: "uclub-rn",
  storageBucket: "uclub-rn.appspot.com",
  messagingSenderId: "943389557064",
  appId: "1:943389557064:web:6fb2bf04b2260197e2337d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
