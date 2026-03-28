"use client";

import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/utils/firebase/auth-context";
import ExerciseSearch from "@/components/exercise/exercise-search";
import SearchedExercise from "@/components/exercise/searched-exercise";
import FoodSearch from "@/components/nutrition/food-search";
import SearchedFood from "@/components/nutrition/searched-food";

export default function ExercisePage() {
  const router = useRouter();
  const { user, loading } = useUserAuth();

  const [exercises, setExercises] = useState<any[]>([]);
  const [foods, setFoods] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="bg-[#111827] h-screen w-full flex items-center justify-center text-white">
        Loading...
      </div>
    );

  function onExercisesSearch(exercises: string[]) {
    setExercises(exercises);
  }

  function onFoodSearch(foods: string[]) {
    setFoods(foods);
  }

  return (
    <div className="h-screen bg-white">
      <Sidebar page="Search" />

      <main className="flex-1 pl-70 pt-10">
        <div className="mx-50">
          <div className="flex flex-col gap-2">
            <header>
              <div className="flex flex-col">
                <h1 className="text-4xl font-black text-black">Search</h1>
                <p className="text-gray-500 font-medium">
                  Find food by name and exercises based on muscles or body
                  parts.
                </p>
              </div>
            </header>
            <div className="flex flex-row gap-2">
              <div className="flex-2">
                <FoodSearch onSearchResults={onFoodSearch} />
                <div className="bg-[#181d27] p-6 rounded-xl min-h-10">
                  {foods.length > 0 ? (
                    <div className="grid gap-4 max-h-[740px] overflow-y-auto pr-2 custom-scrollbar">
                      {foods.map((food, index) => (
                        <SearchedFood
                          key={index}
                          name={food.name}
                          calories={food.calories}
                          serving_size_g={food.serving_size_g}
                          fat_total_g={food.fat_total_g}
                          protein_g={food.protein_g}
                          sodium_mg={food.sodium_mg}
                          carbohydrates_total_g={food.carbohydrates_total_g}
                          fiber_g={food.fiber_g}
                          sugar_g={food.sugar_g}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-white font-bold">
                        Search for valid food to get nutrition information.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <ExerciseSearch onSearchResults={onExercisesSearch} />
                <div className="bg-[#181d27] p-6 rounded-xl min-h-10">
                  {exercises.length > 0 ? (
                    <div className="grid gap-4 max-h-[740px] overflow-y-auto pr-2 custom-scrollbar">
                      {exercises.map((exercise, index) => (
                        <SearchedExercise
                          key={exercise.exerciseId}
                          name={exercise.name}
                          targetMuscles={exercise.targetMuscles}
                          equipment={exercise.equipments}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-white font-bold">
                        Search for valid muscles or body parts to get exercises.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
