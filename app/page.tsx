"use client";

import SignInPage from "@/components/sign-in";
import { useUserAuth } from "@/utils/firebase/auth-context";
import WelcomeBack from "@/components/welcome-back";

export default function Landing() {
  const { user } = useUserAuth();

  return (
    <div className="relative flex flex-col justify-center items-center bg-gradient-to-r from-[#254D32] to-[#3A7D44] h-screen w-screen overflow-hidden pb-50">
      <div className="relative z-10 flex flex-col justify-center items-center">
        <svg
          fill="#D0DB97"
          width="300px"
          height="3 00px"
          viewBox="0 -8 72 72"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M48.68,38.71c8.06-8.06,10-34.59,10-34.59A40.94,40.94,0,0,1,44.41,7.73C36.16,8.43,28.52,9.6,24,14.08,17.13,21,15.4,30.82,19.34,37.77,23.66,31,41.47,21.29,41.47,21.29,28.69,30.43,14,47.78,13.41,50s3.64,2.3,4.3,1.15,3.2-5.78,6-8.57C30.68,47.53,41.33,46.07,48.68,38.71Z" />
        </svg>
        {user ? (
          <WelcomeBack />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-7xl font-bold text-white pb-10">
              Healthmax Tracking
            </h1>
            <SignInPage />
          </div>
        )}
      </div>
    </div>
  );
}
