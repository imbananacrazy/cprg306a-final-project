"use client";

import SignInPage from "../../components/sign-in";
import SignUpPage from "../../components/sign-up";
import { useState } from "react";

export default function LandingPage() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  function handleSwapSignUp() {
    setIsSignUp(!isSignUp);
  }

  return (
    <div className="flex flex-col justify-center items-center bg-[#181d27] h-screen w-screen">
      {isSignUp ? (
        <SignUpPage swapSignUp={handleSwapSignUp} />
      ) : (
        <SignInPage swapSignUp={handleSwapSignUp} />
      )}
    </div>
  );
}
