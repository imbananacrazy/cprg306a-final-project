"use client";

import SignInPage from "@/components/sign-in";
import { useUserAuth } from "@/utils/firebase/auth-context";
import WelcomeBack from "@/components/welcome-back";

export default function Landing() {
  const { user } = useUserAuth();

  return (
    <div className="relative flex flex-col justify-center items-center bg-[#181d27] h-screen w-screen overflow-hidden">
      <div className="relative z-10 flex flex-col justify-center items-center">
        {user ? (
          <WelcomeBack />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-7xl font-bold text-white pb-10 tracking-tight drop-shadow-2xl">
              Healthmax Tracking
            </h1>
            <SignInPage />
          </div>
        )}
      </div>
    </div>
  );
}
