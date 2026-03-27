"use client";

import React from "react";
import { useUserAuth } from "../utils/firebase/auth-context";

export default function SignInPage({ swapSignUp }: { swapSignUp: () => void }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { user, googleSignIn } = useUserAuth();

  function HandleClick() {
    swapSignUp();
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Handle form submission logic here
  }
  return (
    <div className="flex flex-col justify-center items-center w-120 h-140 rounded-lg bg-[#3A7D44] shadow-lg">
      <h1 className="flex align-top font-[700] text-5xl text-white">Sign In</h1>
      <form className="flex flex-col gap-4 mt-10" onSubmit={handleSubmit}>
        <p className="font-semibold">Email</p>
        <input
          type="email"
          className="w-100 bg-[#254D32] text-white rounded-lg py-4 px-4 focus:outline-none"
          required
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
        />
        <p className="font-semibold">Password</p>
        <input
          type="password"
          className="w-100 bg-[#254D32] text-white rounded-lg py-4 px-4 focus:outline-none"
          required
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
        />
        <button
          type="submit"
          className="bg-[#254D32] text-white font-bold py-4 px-4 rounded-lg hover:cursor-pointer hover:bg-[#69B578]"
        >
          Sign In
        </button>
      </form>
      <button
        className="bg-[#254D32] text-white font-bold mt-4 w-100 py-4 px-4 rounded-lg hover:cursor-pointer hover:bg-[#69B578]"
        onClick={async () => await googleSignIn()}
      >
        Sign In with Google
      </button>
      <button
        className="text-white underline mt-4 hover:cursor-pointer"
        onClick={HandleClick}
      >
        <p>Don't have an account? Sign Up</p>
      </button>
    </div>
  );
}
