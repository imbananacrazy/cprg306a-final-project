"use client";

import SignInPage from "../../components/sign-in";
import SignUpPage from "../../components/sign-up";
import { useState } from "react";
import { useUserAuth } from "@/utils/firebase/auth-context";
import WelcomeBack from "@/components/welcome-back";

export default function LandingPage() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const { user, googleSignIn, firebaseSignOut } = useUserAuth();
  function handleSwapSignUp() {
    setIsSignUp(!isSignUp);
  }

  return (
    <div className="flex flex-col justify-center items-center bg-[#181d27] h-screen w-screen">
      {user ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-7xl font-bold text-white pb-2">
            Healthmax Tracking
          </h1>
          <h1 className="text-3xl font-bold text-white pb-10">
            Welcome back, {user?.displayName}!
          </h1>
          <WelcomeBack />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-7xl font-bold text-white pb-10">
            Healthmax Tracking
          </h1>
          {isSignUp ? (
            <SignUpPage swapSignUp={handleSwapSignUp} />
          ) : (
            <SignInPage swapSignUp={handleSwapSignUp} />
          )}
        </div>
      )}
    </div>
  );
}
