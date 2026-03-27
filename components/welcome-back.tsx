"use client";
import { useUserAuth } from "@/utils/firebase/auth-context";
import { useRouter } from "next/navigation";

export default function WelcomeBack() {
  const { firebaseSignOut, user } = useUserAuth();
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-7xl font-bold text-white pb-2">Healthmax Tracking</h1>
      <h1 className="text-3xl font-bold text-white pb-10">
        Welcome back, {user?.displayName}!
      </h1>
      <div className="flex flex-col justify-center items-center w-120 h-55 rounded-lg bg-[#3A7D44] shadow-lg gap-4">
        <button
          className="bg-[#254D32] text-white font-bold w-100 h-15 rounded-lg hover:cursor-pointer hover:bg-[#69B578]"
          onClick={() => router.push("/dashboard")}
        >
          View Dashboard
        </button>
        <button
          className="bg-[#254D32] text-white font-bold w-100 h-15 rounded-lg hover:cursor-pointer hover:bg-[#69B578]"
          onClick={() => {
            firebaseSignOut();
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
