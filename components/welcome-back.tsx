"use client";
import { useUserAuth } from "@/utils/firebase/auth-context";
import { auth, db } from "@/utils/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

//the welcome back component that gets displayed onto the "/" page if the user is sign in.
//when the user presses "View Dashboard", it checks to see if they've completed the setup. the setup is just editing the
//profile page (editing caloris, protein, water) and pressing the "Save Changes" button. if they haven't. pressing "View Dashboard"
//will redirect them to the profile page. the user can also sign out here, resulting in the sign in component being displayed.
export default function WelcomeBack() {
  const { firebaseSignOut, user } = useUserAuth();
  const router = useRouter();

  async function handleDashboardClick() {
    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.setupComplete) {
          router.push("/dashboard");
        } else {
          router.push("/profile");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-7xl font-bold text-white pb-2">Healthmax Tracking</h1>
      <h1 className="text-3xl font-bold text-white pb-10">
        Welcome, {user?.displayName}!
      </h1>
      <div className="flex flex-col justify-center items-center gap-4 bg-[#181d27] rounded-lg shadow-[0px_0px_12px_8px_rgba(0,_0,_0,_0.3)] w-110 h-50">
        <button
          className="bg-[#181d27] border-3 border-[#254D32] hover:border-none text-white font-bold text-lg w-100 h-15 rounded-lg hover:cursor-pointer hover:bg-[#69B578] transition-all duration-200 ease-in-out"
          onClick={handleDashboardClick}
        >
          View Dashboard
        </button>
        <button
          className="bg-[#181d27] border-3 border-[#254D32] hover:border-none text-white font-bold text-lg w-100 h-15 rounded-lg hover:cursor-pointer hover:bg-[#69B578] transition-all duration-200 ease-in-out"
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
