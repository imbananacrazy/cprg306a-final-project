"use client";

import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/utils/firebase/auth-context";
import { db } from "@/utils/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function ExercisePage() {
  const router = useRouter();
  const { user, loading } = useUserAuth();
  const [displayName, setDisplayName] = useState("");
  const [calories, setCalories] = useState<number>(0);
  const [protein, setProtein] = useState(0);
  const [water, setWater] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);

  //if not signed in, redirect to landing page
  useEffect(() => {
    if (!loading && !user) router.push("/");

    //fetch data from "users" collection in firestore
    async function fetchData() {
      if (user?.uid) {
        const userData = await getDoc(doc(db, "users", user.uid));
        if (userData.exists()) {
          const data = userData.data();
          setDisplayName(data.displayName || "");
          setCalories(data.dailyGoals.calories || 0);
          setProtein(data.dailyGoals.protein || 0);
          setWater(data.dailyGoals.water || 0);
          setAchievements(data.achievements || []);
        }
      }
    }
    fetchData();
  }, [user, loading, router]);

  //update the data in firestore "users" collection using values from the inputs in the form
  async function saveChanges() {
    if (user?.uid) {
      await updateDoc(doc(db, "users", user.uid), {
        displayName: displayName,
        "dailyGoals.calories": calories,
        "dailyGoals.protein": protein,
        "dailyGoals.water": water,
        setupComplete: true,
      });
      alert("Profile Updated!");
    }
  }

  if (loading)
    return (
      <div className="bg-[#111827] h-screen w-full flex items-center justify-center text-white">
        Loading...
      </div>
    );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    saveChanges();
  }

  const baseStyles =
    "bg-[#181d27] border-1 border-[#254D32] transition-all duration-200 ease-in-out text-white";

  return (
    <div className="h-screen bg-gradient-to-r from-[#254D32] to-[#3A7D44]">
      <Sidebar page="Profile" />
      <main className="flex-1 pl-70 pt-10">
        <div className="mx-50">
          <div className="flex flex-col gap-2">
            <header>
              <div className="flex flex-col">
                <h1 className="text-4xl font-black text-white">Profile</h1>
                <p className="text-white font-medium">
                  Manage your profile and view your achievements.
                </p>
              </div>
            </header>
          </div>
          <div className="pt-5">
            <h1 className="text-3xl font-extrabold text-white pb-5">
              Edit Profile
            </h1>
            <form
              className="flex flex-col bg-transparent rounded-lg gap-2 pb-4"
              onSubmit={handleSubmit}
            >
              <h1 className="text-xl font-bold text-white">
                Change Display Name
              </h1>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={`w-full text-lg p-4 placeholder:text-gray-500 rounded-lg focus:outline-none ${baseStyles}`}
              />
              <h1 className="text-xl font-bold text-white">
                Daily Calorie Limit
              </h1>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className={`w-full text-lg p-4 placeholder:text-gray-500 rounded-lg focus:outline-none ${baseStyles}`}
              />
              <h1 className="text-xl font-bold text-white">
                Daily Protein Intake (g)
              </h1>
              <input
                type="number"
                value={protein}
                onChange={(e) => setProtein(Number(e.target.value))}
                className={`w-full text-lg p-4 placeholder:text-gray-500 rounded-lg focus:outline-none ${baseStyles}`}
              />
              <h1 className="text-xl font-bold text-white">
                Daily Water Intake (ml)
              </h1>
              <input
                type="number"
                value={water}
                onChange={(e) => setWater(Number(e.target.value))}
                className={`w-full text-lg p-4 placeholder:text-gray-500 rounded-lg focus:outline-none ${baseStyles}`}
              />
              <button
                type="submit"
                className={`px-5 rounded-lg text-lg font-bold hover:bg-[#69B578] h-15 hover:cursor-pointer ${baseStyles}`}
              >
                Save Changes
              </button>
            </form>
            <h1 className="text-3xl font-extrabold text-white pb-5">
              Achievements
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}
