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
        Welcome, {user?.displayName}!
      </h1>
      <div className="flex flex-col justify-center items-center gap-4 bg-[#181d27] rounded-lg shadow-[0px_0px_12px_8px_rgba(0,_0,_0,_0.3)] w-110 h-50">
        <button
          className="bg-[#181d27] border-3 border-[#254D32] hover:border-none text-white font-bold text-lg w-100 h-15 rounded-lg hover:cursor-pointer hover:bg-[#69B578]"
          onClick={() => router.push("/dashboard")}
        >
          View Dashboard
        </button>
        <button
          className="bg-[#181d27] border-3 border-[#254D32] hover:border-none text-white font-bold text-lg w-100 h-15 rounded-lg hover:cursor-pointer hover:bg-[#69B578]"
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
