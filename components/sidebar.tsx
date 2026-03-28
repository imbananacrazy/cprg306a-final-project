"use client";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/utils/firebase/auth-context";

export default function Sidebar({ page }: { page: string }) {
  const router = useRouter();
  const { firebaseSignOut } = useUserAuth();

  // Base button styles
  const baseButtonStyles =
    "text-white font-bold w-60 h-12 rounded-lg text-left text-lg pl-4 border hover:cursor-pointer hover:bg-[#69B578] hover:border-none flex flex-row gap-2 items-center";

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
          <svg
            fill="white"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            id="dashboard-alt"
          >
            <path d="M14,10V22H4a2,2,0,0,1-2-2V10Z"></path>
            <path d="M22,10V20a2,2,0,0,1-2,2H16V10Z"></path>
            <path d="M22,4V8H2V4A2,2,0,0,1,4,2H20A2,2,0,0,1,22,4Z"></path>
          </svg>
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
          <svg
            fill="white"
            height="20px"
            width="20px"
            version="1.1"
            id="Icons"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <g>
              <path
                d="M21.1,10.5l0.3-0.2c0.4-1,1.1-1.8,2-2.3c0,0,0.1,0,0.1,0c0-0.1-0.1-0.1-0.1-0.2c-0.4-0.7-1-1.2-1.8-1.3
		c-0.8-0.2-1.5-0.1-2.2,0.3c-0.7,0.4-1.2,1.1-1.4,1.9l-0.3,0.1C19,9.2,20.1,9.8,21.1,10.5z"
              />
            </g>
            <path
              d="M29.4,12.4c-0.2-0.3-0.4-0.5-0.6-0.7c-0.1-0.3-0.2-0.6-0.3-0.9c-0.4-0.7-1-1.2-1.8-1.3c-0.8-0.2-1.5-0.1-2.2,0.3
	c-0.7,0.4-1.2,1.1-1.4,1.9l-2.1,1.2c0,0,0,0,0,0c-0.2,0.1-0.5,0.1-0.7,0.1c-1.3-0.4-3.2,0-4.9,1c-1.3,0.7-2.4,1.8-2.9,2.8
	c-0.2,0.3-0.5,0.5-0.9,0.5c-0.2,0-0.3,0-0.5-0.1c-0.5-0.3-0.7-0.9-0.4-1.4c0.8-1.4,2.1-2.6,3.7-3.6c1.1-0.6,2.3-1.1,3.4-1.3
	C16.3,10.3,14.7,10,13,10c-6.1,0-11,4.2-11,9.3C2,26,10.3,26,13,26c2.3,0,8.3,0,10.3-3.8c-0.2,0.2-0.3,0.3-0.5,0.5
	c-0.2,0.2-0.4,0.3-0.7,0.3c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.3-1,0.1-1.4c0.9-0.8,1.5-1.8,1.8-2.6c0.1-0.3,0.3-0.6,0.7-0.7l2-1.2
	c0.8,0.2,1.6,0.2,2.4-0.3C29.7,15.6,30.2,13.8,29.4,12.4z"
            />
          </svg>
          Nutrition
        </button>
        <button
          className={`${baseButtonStyles} border-[#69B578] ${
            page === "Search Exercises"
              ? "bg-[#69B578] border-none"
              : "bg-[#181d27] border-[#254D32]"
          }`}
          onClick={() => router.push("/search-exercises")}
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Search Exercises
        </button>
        <button
          className={`${baseButtonStyles} border-[#69B578] ${
            page === "Manage Exercises"
              ? "bg-[#69B578] border-none"
              : "bg-[#181d27] border-[#254D32]"
          }`}
          onClick={() => router.push("/manage-exercises")}
        >
          <svg
            fill="white"
            width="20px"
            height="20px"
            viewBox="0 0 256 256"
            id="Flat"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M248,120h-8V88a16.01833,16.01833,0,0,0-16-16H208V64a16.01833,16.01833,0,0,0-16-16H168a16.01833,16.01833,0,0,0-16,16v56H104V64A16.01833,16.01833,0,0,0,88,48H64A16.01833,16.01833,0,0,0,48,64v8H32A16.01833,16.01833,0,0,0,16,88v32H8a8,8,0,0,0,0,16h8v32a16.01833,16.01833,0,0,0,16,16H48v8a16.01833,16.01833,0,0,0,16,16H88a16.01833,16.01833,0,0,0,16-16V136h48v56a16.01833,16.01833,0,0,0,16,16h24a16.01833,16.01833,0,0,0,16-16v-8h16a16.01833,16.01833,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM32,168V88H48v80Zm192,0H208V88h16Z" />
          </svg>
          Manage Exercises
        </button>
        <div className="mt-auto pb-5">
          <button
            className={`${baseButtonStyles} border-red-900 hover:bg-red-400 hover:border-none bg-[#181d27]`}
            onClick={async () => {
              await firebaseSignOut();
              router.push("/");
            }}
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 16 16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="white" d="M9 4v-3h-9v14h9v-3h-1v2h-7v-12h7v2z"></path>
              <path fill="white" d="M16 8l-5-4v2h-5v4h5v2z"></path>
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
