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
}

export default function ExercisePage() {
  const router = useRouter();
  const { user, loading } = useUserAuth();
  const [userFoods, setUserFoods] = useState<FoodData[]>([]);

  //if not signed in, redirect to landing page
  useEffect(() => {
    if (!loading && !user) router.push("/");

    //fetch all foods from food collection in users collection (food is an array of maps that hold all food data)
    //ex:
    //    0:
    //    name: "banana"
    //    calories: 123
    //    ...rest of data
    async function fetchFood() {
      if (user?.uid) {
        const userData = await getDoc(doc(db, "users", user.uid));
        if (userData.exists()) {
          const data = userData.data();
          setUserFoods(data.food || []);
        }
      }
    }
    fetchFood();
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="bg-[#111827] h-screen w-full flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="h-screen bg-gradient-to-r from-[#254D32] to-[#3A7D44]">
      <Sidebar page="Manage Nutrition" />
      <main className="flex-1 pl-70 pt-10">
        <div className="mx-50">
          <div className="flex flex-col gap-2">
            <header>
              <div className="flex flex-col">
                <h1 className="text-4xl font-black text-white">
                  Manage Nutrition
                </h1>
                <p className="text-white font-medium">
                  View and manage your nutritional intake.
                </p>
              </div>
            </header>
            <div className="pt-10">
              <div className="grid gap-4 max-h-[740px] overflow-y-auto pr-2 custom-scrollbar">
                {userFoods.map((food, index) => (
                  <FoodCard
                    key={index}
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
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
