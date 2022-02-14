import { initializeApp } from "firebase/app";
import {getFirestore,collection, addDoc, Timestamp} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_BLOG_APP_KEY,
  authDomain: process.env.REACT_APP_BLOG_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_BLOG_PROJECT_ID,
  storageBucket: process.env.REACT_APP_BLOG_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_BLOG_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_BLOG_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
export const colRef = collection(db,"blogs");

export const addBlog = async(title,subTitle,details)=>{
  return addDoc(colRef,{
    title:title,
    subTitle:subTitle,
    details:details,
    createdAt:Timestamp.now()
  })

}
