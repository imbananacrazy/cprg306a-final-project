"use client";

import { useUserAuth } from "@/utils/firebase/auth-context";

export default function WelcomeBack() {
  const { firebaseSignOut } = useUserAuth();

  return (
    <div className="flex flex-col justify-center items-center w-120 h-55 rounded-lg bg-[#3A7D44] shadow-lg gap-4">
      <button
        className="bg-[#254D32] text-white font-bold w-100 h-15 rounded-lg hover:cursor-pointer hover:bg-[#69B578]"
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      >
        View Dashboard
      </button>
      <button
        className="bg-[#254D32] text-white font-bold w-100 h-15 rounded-lg hover:cursor-pointer hover:bg-[#69B578]"
        onClick={firebaseSignOut}
      >
        Sign Out
      </button>
    </div>
  );
}
