"use client";

import { useUserAuth } from "@/utils/firebase/auth-context";

export default function SignUpPage({ swapSignUp }: { swapSignUp: () => void }) {
  const { googleSignIn } = useUserAuth();

  function HandleClick() {
    swapSignUp();
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Handle form submission logic here
  }

  return (
    <div className="flex flex-col justify-center items-center w-120 h-170 rounded-lg bg-[#3A7D44] shadow-lg">
      <h1 className="flex align-top font-[700] text-5xl text-white">Sign Up</h1>
      <form className="flex flex-col gap-4 mt-10" onSubmit={handleSubmit}>
        <p className="font-semibold">Email</p>
        <input
          type="email"
          className="w-100 bg-[#254D32] text-white rounded-lg py-4 px-4 focus:outline-none"
        />
        <p className="font-semibold">Password</p>
        <input
          type="password"
          className="w-100 bg-[#254D32] text-white rounded-lg py-4 px-4 focus:outline-none"
        />
        <p className="font-semibold">Confirm Password</p>
        <input
          type="password"
          className="w-100 bg-[#254D32] text-white rounded-lg py-4 px-4 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#254D32] text-white font-bold py-4 px-4 rounded-lg hover:cursor-pointer hover:bg-[#69B578]"
        >
          Sign Up
        </button>
      </form>
      <button
        className="bg-[#254D32] text-white font-bold mt-4 w-100 py-4 px-4 rounded-lg hover:cursor-pointer hover:bg-[#69B578]"
        onClick={async () => await googleSignIn()}
      >
        Sign Up with Google
      </button>
      <button
        className="text-white underline mt-4 hover:cursor-pointer"
        onClick={HandleClick}
      >
        <p>Already have an account? Sign In</p>
      </button>
    </div>
  );
}
