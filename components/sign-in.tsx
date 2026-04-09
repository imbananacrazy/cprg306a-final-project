"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useUserAuth } from "../utils/firebase/auth-context";

type AuthMode = "signin" | "signup";

function getAuthErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "That email is already in use. Try signing in instead.";
      case "auth/invalid-credential":
      case "auth/invalid-email":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Your email or password is incorrect.";
      case "auth/weak-password":
        return "Choose a stronger password with at least 6 characters.";
      case "auth/popup-closed-by-user":
        return "The sign-in popup was closed before finishing.";
      default:
        return "Something went wrong while signing you in. Please try again.";
    }
  }

  return "Something went wrong while signing you in. Please try again.";
}

//the sign in component that gets displayed onto the "/" page if the user isn't sign in.
//
//uses svgs for icons. in summary, svg are just images that allow you to change the the colour and fill.
export default function SignInPage() {
  const {
    googleSignIn,
    githubSignIn,
    emailPasswordSignIn,
    emailPasswordSignUp,
  } = useUserAuth();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const baseButtonStyles =
    "flex flex-row gap-2 justify-center items-center bg-[#181d27] border-2 border-[#254D32] text-white font-bold text-lg w-full min-h-14 rounded-lg transition-all duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed";
  const baseInputStyles =
    "w-full rounded-lg border border-[#254D32] bg-[#111827] px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#69B578]";

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setErrorMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Enter both your email and password to continue.");
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      setErrorMessage("Your passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "signin") {
        await emailPasswordSignIn(email.trim(), password);
      } else {
        await emailPasswordSignUp(displayName, email.trim(), password);
      }
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleProviderSignIn(signInMethod: () => Promise<unknown>) {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await signInMethod();
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex w-full max-w-[30rem] flex-col gap-4 rounded-lg bg-[#181d27] p-6 shadow-[0px_0px_12px_8px_rgba(0,_0,_0,_0.3)]">
      <div className="flex rounded-lg bg-[#111827] p-1">
        <button
          type="button"
          className={`flex-1 rounded-md px-4 py-3 font-bold transition-colors ${
            mode === "signin"
              ? "bg-[#69B578] text-[#111827]"
              : "text-white hover:bg-[#1f2937]"
          }`}
          onClick={() => switchMode("signin")}
          disabled={isSubmitting}
        >
          Sign In
        </button>
        <button
          type="button"
          className={`flex-1 rounded-md px-4 py-3 font-bold transition-colors ${
            mode === "signup"
              ? "bg-[#69B578] text-[#111827]"
              : "text-white hover:bg-[#1f2937]"
          }`}
          onClick={() => switchMode("signup")}
          disabled={isSubmitting}
        >
          Sign Up
        </button>
      </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {mode === "signup" ? (
          <input
            type="text"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Display name"
            className={baseInputStyles}
          />
        ) : null}
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className={baseInputStyles}
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className={baseInputStyles}
        />
        {mode === "signup" ? (
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm password"
            className={baseInputStyles}
          />
        ) : null}
        {errorMessage ? (
          <p className="rounded-lg border border-[#8b2e2e] bg-[#3b1111] px-4 py-3 text-sm text-[#ffd2d2]">
            {errorMessage}
          </p>
        ) : null}
        <button
          type="submit"
          className={`${baseButtonStyles} hover:border-transparent hover:bg-[#69B578] hover:text-[#111827]`}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Please wait..."
            : mode === "signin"
              ? "Sign In with Email"
              : "Create Account"}
        </button>
      </form>

      <div className="flex items-center gap-3 text-sm font-medium text-gray-300">
        <div className="h-px flex-1 bg-[#254D32]" />
        <span>or continue with</span>
        <div className="h-px flex-1 bg-[#254D32]" />
      </div>

      <button
        className={`${baseButtonStyles} hover:border-transparent hover:bg-[#69B578] hover:text-[#111827]`}
        onClick={async () => await handleProviderSignIn(googleSignIn)}
        disabled={isSubmitting}
      >
        <Image src="/google.png" alt="Google Icon" width={25} height={25} />
        Sign In with Google
      </button>
      <button
        className={`${baseButtonStyles} hover:border-transparent hover:bg-[#69B578] hover:text-[#111827]`}
        onClick={async () => await handleProviderSignIn(githubSignIn)}
        disabled={isSubmitting}
      >
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-140.000000, -7559.000000)"
              fill="white"
            >
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path
                  d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                  id="github-[#142]"
                ></path>
              </g>
            </g>
          </g>
        </svg>
        Sign In with GitHub
      </button>
    </div>
  );
}
