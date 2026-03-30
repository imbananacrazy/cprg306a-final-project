"use client";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/utils/firebase/auth-context";

export default function Sidebar({ page }: { page: string }) {
  const router = useRouter();
  const { firebaseSignOut } = useUserAuth();

  // Base button styles
  const baseButtonStyles =
    "text-white font-bold w-60 h-12 rounded-lg text-left text-lg pl-4 border hover:cursor-pointer hover:bg-[#69B578] hover:border-none flex flex-row gap-2 items-center transition-all duration-300 ease-in-out";

  return (
    <div className="flex flex-col bg-[#181d27] fixed top-10 left-10 bottom-10 w-70 shadow-[0px_0px_12px_8px_rgba(0,_0,_0,_0.3)] rounded-lg">
      <div className="flex flex-col items-center justify-center font-bold text-white text-4xl pt-10 mb-10">
        <h1>Healthmax</h1>
        <h1 className="text-[#69B578]">Tracking</h1>
      </div>
      <div className="flex flex-col gap-3 items-center h-full">
        <button
          className={`${baseButtonStyles} border-[#69B578] ${
            page === "Dashboard"
              ? "bg-[#69B578] border-none"
              : "bg-[#181d27] border-[#254D32] border-3"
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
            page === "Profile"
              ? "bg-[#69B578] border-none"
              : "bg-[#181d27] border-[#254D32] border-3"
          }`}
          onClick={() => router.push("/profile")}
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 20 20"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              id="Page-1"
              stroke="white"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Dribbble-Light-Preview"
                transform="translate(-180.000000, -2159.000000)"
                fill="white"
              >
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path
                    d="M134,2008.99998 C131.783496,2008.99998 129.980955,2007.20598 129.980955,2004.99998 C129.980955,2002.79398 131.783496,2000.99998 134,2000.99998 C136.216504,2000.99998 138.019045,2002.79398 138.019045,2004.99998 C138.019045,2007.20598 136.216504,2008.99998 134,2008.99998 M137.775893,2009.67298 C139.370449,2008.39598 140.299854,2006.33098 139.958235,2004.06998 C139.561354,2001.44698 137.368965,1999.34798 134.722423,1999.04198 C131.070116,1998.61898 127.971432,2001.44898 127.971432,2004.99998 C127.971432,2006.88998 128.851603,2008.57398 130.224107,2009.67298 C126.852128,2010.93398 124.390463,2013.89498 124.004634,2017.89098 C123.948368,2018.48198 124.411563,2018.99998 125.008391,2018.99998 C125.519814,2018.99998 125.955881,2018.61598 126.001095,2018.10898 C126.404004,2013.64598 129.837274,2010.99998 134,2010.99998 C138.162726,2010.99998 141.595996,2013.64598 141.998905,2018.10898 C142.044119,2018.61598 142.480186,2018.99998 142.991609,2018.99998 C143.588437,2018.99998 144.051632,2018.48198 143.995366,2017.89098 C143.609537,2013.89498 141.147872,2010.93398 137.775893,2009.67298"
                    id="profile-[#1341]"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
          Profile
        </button>
        <button
          className={`${baseButtonStyles} border-[#69B578] ${
            page === "Search"
              ? "bg-[#69B578] border-none"
              : "bg-[#181d27] border-[#254D32] border-3"
          }`}
          onClick={() => router.push("/search")}
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
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Search
        </button>
        <button
          className={`${baseButtonStyles} border-[#69B578] ${
            page === "Manage Nutrition"
              ? "bg-[#69B578] border-none"
              : "bg-[#181d27] border-[#254D32] border-3"
          }`}
          onClick={() => router.push("/manage-nutrition")}
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
          Manage Nutrition
        </button>
        <button
          className={`${baseButtonStyles} border-[#69B578] ${
            page === "Manage Exercises"
              ? "bg-[#69B578] border-none"
              : "bg-[#181d27] border-[#254D32] border-3"
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
            className={`${baseButtonStyles} border-red-900 border-3 hover:bg-red-400 hover:border-none bg-[#181d27]`}
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
