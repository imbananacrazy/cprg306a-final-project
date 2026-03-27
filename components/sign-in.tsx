//icons downloaded from https://www.flaticon.com/free-icons/google
//we do not own the Google or GitHub icons

"use client";

import Image from "next/image";
import { useUserAuth } from "../utils/firebase/auth-context";

export default function SignInPage() {
  const { googleSignIn, githubSignIn } = useUserAuth();
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-120 h-50 rounded-lg bg-[#3A7D44] shadow-lg">
      <button
        className="bg-[#254D32] flex flex-row items-center justify-center gap-2 text-white font-bold w-100 py-4 px-4 rounded-lg hover:cursor-pointer hover:bg-[#69B578]"
        onClick={async () => await googleSignIn()}
      >
        <Image src="/google.png" alt="Google Icon" width={25} height={25} />
        Sign In with Google
      </button>
      <button
        className="bg-[#254D32] flex flex-row items-center justify-center gap-2 text-white font-bold w-100 py-4 px-4 rounded-lg hover:cursor-pointer hover:bg-[#69B578]"
        onClick={async () => await githubSignIn()}
      >
        <Image src="/github.png" alt="GitHub Icon" width={25} height={25} />
        Sign In with GitHub
      </button>
    </div>
  );
}
