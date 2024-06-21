import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBIFdawzxgPRHxhLo94BZUINb5v0YVz154",
  authDomain: "uclub-rn.firebaseapp.com",
  projectId: "uclub-rn",
  storageBucket: "uclub-rn.appspot.com",
  messagingSenderId: "943389557064",
  appId: "1:943389557064:web:6fb2bf04b2260197e2337d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
