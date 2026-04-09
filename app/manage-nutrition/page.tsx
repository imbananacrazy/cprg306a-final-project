"use client";

import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/utils/firebase/auth-context";
import { db } from "@/utils/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import FoodCard from "@/components/nutrition/food-card";

interface FoodData {
  name: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
  addedAt: string;
}

export default function ManageNutritionPage() {
  const router = useRouter();
  const { user, loading } = useUserAuth();

  // All food entries from Firestore (all-time, needed for delete to write correct array back)
  const [allFoods, setAllFoods] = useState<FoodData[]>([]);

  // If not signed in, redirect to landing page
  useEffect(() => {
    if (!loading && !user) router.push("/");

    async function fetchFood() {
      if (user?.uid) {
        const userData = await getDoc(doc(db, "users", user.uid));
        if (userData.exists()) {
          const data = userData.data();
          setAllFoods(data.food || []);
        }
      }
    }
    fetchFood();
  }, [user, loading, router]);

  // Filter to only show food logged today.
  // We compare using toDateString() so "Wed Apr 09 2026" === "Wed Apr 09 2026"
  // regardless of what exact time the item was added.
  const todayString = new Date().toDateString();
  const todayFoods = allFoods.filter(
    (item) => new Date(item.addedAt).toDateString() === todayString
  );

  // Total calories for today (shown in the summary bar at the top)
  const totalCaloriesToday = todayFoods.reduce(
    (sum, item) => sum + (item.calories || 0),
    0
  );
  const totalProteinToday = todayFoods.reduce(
    (sum, item) => sum + (item.protein_g || 0),
    0
  );

  // Removes the clicked item from the FULL allFoods array (by matching addedAt timestamp,
  // which is unique per entry). Then writes the updated full array back to Firestore.
  // We use the full array because Firestore stores all-time food — we just display today's.
  async function removeFood(addedAt: string) {
    if (!user?.uid) return;

    const newAllFoods = allFoods.filter((item) => item.addedAt !== addedAt);
    setAllFoods(newAllFoods); // update UI immediately

    await updateDoc(doc(db, "users", user.uid), {
      food: newAllFoods,
    });
  }

  // Loading state
  if (loading)
    return (
      <div className="bg-[#111827] h-screen w-full flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#254D32] to-[#3A7D44]">
      <Sidebar page="Manage Nutrition" />
      <main className="flex-1 pl-70 pt-10 pb-10">
        <div className="mx-50">
          <div className="flex flex-col gap-4">
            <header>
              <div className="flex flex-col">
                <h1 className="text-4xl font-black text-white">
                  Manage Nutrition
                </h1>
                <p className="text-white font-medium">
                  Showing today&apos;s logged food. Click a card to remove it.
                </p>
              </div>
            </header>

            {/* Today's summary bar */}
            <div className="bg-[#181d27] rounded-xl p-5 flex flex-row gap-6">
              <div className="flex flex-col">
                <span className="text-green-300 text-sm font-bold uppercase tracking-wide">
                  Total Calories Today
                </span>
                <span className="text-white text-3xl font-black">
                  {Math.round(totalCaloriesToday)} kcal
                </span>
              </div>
              <div className="w-px bg-[#254D32]" />
              <div className="flex flex-col">
                <span className="text-blue-300 text-sm font-bold uppercase tracking-wide">
                  Total Protein Today
                </span>
                <span className="text-white text-3xl font-black">
                  {Math.round(totalProteinToday)}g
                </span>
              </div>
              <div className="w-px bg-[#254D32]" />
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm font-bold uppercase tracking-wide">
                  Items Logged
                </span>
                <span className="text-white text-3xl font-black">
                  {todayFoods.length}
                </span>
              </div>
            </div>

            {/* Today's food list */}
            <div>
              {todayFoods.length > 0 ? (
                <div className="grid gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {todayFoods.map((food) => (
                    <FoodCard
                      key={food.addedAt}
                      name={food.name}
                      calories={food.calories}
                      serving_size_g={food.serving_size_g}
                      fat_total_g={food.fat_total_g}
                      fat_saturated_g={food.fat_saturated_g}
                      protein_g={food.protein_g}
                      sodium_mg={food.sodium_mg}
                      potassium_mg={food.potassium_mg}
                      cholesterol_mg={food.cholesterol_mg}
                      carbohydrates_total_g={food.carbohydrates_total_g}
                      fiber_g={food.fiber_g}
                      sugar_g={food.sugar_g}
                      handleOnClick={() => removeFood(food.addedAt)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-[#181d27] rounded-xl p-6 text-center">
                  <p className="text-white font-medium">
                    Nothing logged today yet. Head to{" "}
                    <span className="font-bold text-[#69B578]">Search</span> to
                    find and add foods!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
