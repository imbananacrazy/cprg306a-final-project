"use client";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/utils/firebase/auth-context";

export default function Sidebar({ page }: { page: string }) {
  const router = useRouter();
  const { firebaseSignOut } = useUserAuth();

  // Base button styles
  const baseButtonStyles =
    "text-white font-bold w-60 h-12 rounded-lg text-left pl-4 border hover:cursor-pointer hover:bg-[#69B578] hover:border-none";

  return (
    <div className="flex flex-col bg-[#181d27] h-screen fixed top-0 left-0 w-70">
      <div className="flex flex-col items-center justify-center font-bold text-white text-4xl pt-10 mb-10">
        <h1>Healthmax</h1>
        <h1 className="text-[#69B578]">Tracking</h1>
      </div>
      <div className="flex flex-col gap-3 items-center h-full">
        <button
          className={`${baseButtonStyles} border-[#69B578] ${
            page === "Dashboard"
              ? "bg-[#69B578] border-none"
              : "bg-[#181d27] border-[#254D32]"
          }`}
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`${baseButtonStyles} border-[#69B578] ${
            page === "Nutrition"
              ? "bg-[#69B578] border-none"
              : "bg-[#181d27] border-[#254D32]"
          }`}
          onClick={() => router.push("/nutrition")}
        >
          Nutrition
        </button>
        <button
          className={`${baseButtonStyles} border-[#69B578] ${
            page === "Exercise"
              ? "bg-[#69B578] border-none"
              : "bg-[#181d27] border-[#254D32]"
          }`}
          onClick={() => router.push("/exercise")}
        >
          Exercise
        </button>
        <div className="mt-auto pb-5">
          <button
            className={`${baseButtonStyles} border-red-900 hover:bg-red-400 hover:border-none bg-[#181d27]`}
            onClick={async () => {
              await firebaseSignOut();
              router.push("/");
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
