"use client";

//taken and edited from one of our in class assignments (solaakinbode.com)
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function createUserDocument(user, displayNameOverride) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const resolvedDisplayName =
      displayNameOverride || user.displayName || user.email?.split("@")[0] || "";

    // Add user to "users" collection and create default data if user doesn't exist.
    // default data includes daily goals, achievements, food (their food data for the day), and their exercise schedule.
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: resolvedDisplayName,
        dailyGoals: {
          calories: 1500,
          protein: 100,
          water: 2000,
        },
        exerciseSchedule: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        },
        food: [],
        achievements: [],
        setupComplete: false,
        created: new Date(),
        // Streak tracking
        streak: 0,
        lastLoggedDate: "",
        // Water logging: stores today's date + amount so it resets each day
        waterLog: { date: "", amount: 0 },
      });
    }
  }

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserDocument(result.user, result.user.displayName);
      return result;
    } catch (error) {
      console.error("Google Sign In Error:", error);
      throw error;
    }
  };

  const githubSignIn = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserDocument(result.user, result.user.displayName);
      return result;
    } catch (error) {
      console.error("Github Sign In Error:", error);
      throw error;
    }
  };

  const emailPasswordSignIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await createUserDocument(result.user);
      return result;
    } catch (error) {
      console.error("Email Sign In Error:", error);
      throw error;
    }
  };

  const emailPasswordSignUp = async (displayName, email, password) => {
    const resolvedDisplayName = displayName?.trim() || email.split("@")[0];

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: resolvedDisplayName });
      await createUserDocument(result.user, resolvedDisplayName);
      return result;
    } catch (error) {
      console.error("Email Sign Up Error:", error);
      throw error;
    }
  };

  const firebaseSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //set isloading to false when firebase sends back auth status (signed in or not)
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        googleSignIn,
        githubSignIn,
        emailPasswordSignIn,
        emailPasswordSignUp,
        firebaseSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};
