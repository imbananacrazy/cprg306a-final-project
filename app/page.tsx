//icons (svgs) acquired from https://www.svgrepo.com/

"use client";

import SignInPage from "@/components/sign-in";
import { useUserAuth } from "@/utils/firebase/auth-context";
import WelcomeBack from "@/components/welcome-back";

//the main landing page. checks if user is signed in and uses that show either the welcome back component or sign in component.
//
//uses svgs for icons. in summary, svg are just images that allow you to change the the colour and fill.
export default function Landing() {
  const { user } = useUserAuth();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-r from-[#254D32] to-[#3A7D44] overflow-x-hidden">
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        {/*if user is signed in, show welcome back page. otherwise, sign in page */}
        {user ? (
          <WelcomeBack />
        ) : (
          <div className="grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(26rem,30rem)] lg:gap-16">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <svg
                fill="#D0DB97"
                className="h-36 w-36 sm:h-44 sm:w-44 lg:h-52 lg:w-52"
                viewBox="0 -8 72 72"
                id="landing-logo"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M48.68,38.71c8.06-8.06,10-34.59,10-34.59A40.94,40.94,0,0,1,44.41,7.73C36.16,8.43,28.52,9.6,24,14.08,17.13,21,15.4,30.82,19.34,37.77,23.66,31,41.47,21.29,41.47,21.29,28.69,30.43,14,47.78,13.41,50s3.64,2.3,4.3,1.15,3.2-5.78,6-8.57C30.68,47.53,41.33,46.07,48.68,38.71Z" />
              </svg>
              <h1 className="pt-4 text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
                Healthmax Tracking
              </h1>
              <p className="max-w-xl pt-4 text-lg text-[#DDE7D0] sm:text-xl">
                Track nutrition, workouts, hydration, and goals in one place.
              </p>
            </div>
            <SignInPage />
          </div>
        )}
      </div>
    </div>
  );
}
