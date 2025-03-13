// src/lib/auth.ts

import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// User Data Type Definition
export type UserData = {
  userId: string;
  first_name: string;
  last_name: string;
  email: string;
  contact_no: string;
  street_name: string;
  city: string;
  province: string;
  postal_code: number;
  country: string;
  user_type: "customer" | "seller" | "admin";
  cart: string[]; // Array of product IDs
  orders: string[]; // Array of order IDs
};

// Sign up and store additional data
export const signUp = async (
  email: string,
  password: string,
  userData: Omit<UserData, "userId" | "email" | "cart" | "orders">
): Promise<UserCredential> => {
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Prepare user data for Firestore
    const userDoc: UserData = {
      userId: user.uid,
      email: user.email!,
      cart: [],
      orders: [],
      ...userData,
    };

    // Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), userDoc);
    console.log("User registered and data saved to Firestore");

    return userCredential;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error; // Re-throw to handle the error in the calling component
  }
};

// Sign in existing users
export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in successfully");
    return userCredential;
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error;
  }
};

// Sign out users
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error during sign-out:", error);
    throw error;
  }
};

// Check if the user is a seller
export const isCustomer = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return resolve(false);

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        resolve(userSnap.exists() && userSnap.data().user_type === "customer");
      } catch (error) {
        console.error("Error checking customer status: ", error);
        resolve(false);
      }
    });
  });
};

// Check if the user is a seller
export const isSeller = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return resolve(false);

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        resolve(userSnap.exists() && userSnap.data().user_type === "seller");
      } catch (error) {
        console.error("Error checking seller status: ", error);
        resolve(false);
      }
    });
  });
};

// Fetch user data
export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as UserData;
    }

    return null;
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return null;
  }
};
