"use client";

import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/utils/firebase/auth-context";
import ExerciseSearch from "@/components/exercise/exercise-search";
import SearchedExercise from "@/components/exercise/searched-exercise";
import FoodSearch from "@/components/nutrition/food-search";
import SearchedFood from "@/components/nutrition/searched-food";
import { db } from "@/utils/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

//all these datatypes are here because food api doesn't have ids for each food,
//so this keeps track exactly the food and all its data
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
  const [exercises, setExercises] = useState<any[]>([]);
  const [foods, setFoods] = useState<any[]>([]);

  //if not signed in, redirect to landing page
  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  //if page is loading (usually really quick), say that its loading. otherwise if not loading and user is
  //signed in, load the search page.
  if (loading)
    return (
      <div className="bg-[#111827] h-screen w-full flex items-center justify-center text-white">
        Loading...
      </div>
    );

  //after the user presses search, all results provided by the api are loaded into the exercises array to be shown.
  //what's shown is/are "searched-exercise" component(s)
  function onExercisesSearch(exercises: string[]) {
    setExercises(exercises);
  }

  //after the user presses search, all results provided by the api are loaded into the foods array to be shown.
  //what's shown is/are "searched-food" component(s)
  function onFoodSearch(foods: string[]) {
    setFoods(foods);
  }

  //called after a user presses a "day-button" component. function goes from "day-button" to "searched-exercise" to here.
  //passes name, difficulty, and the day for storing.
  async function handleExerciseClick(
    name: string,
    difficulty: string,
    day: string,
  ) {
    if (!user?.uid) return;

    try {
      const userData = await getDoc(doc(db, "users", user.uid));
      if (userData.exists()) {
        const data = userData.data();
        const newExercise = { name, difficulty };

        //update exercise schedule by matching the 'day' string to the correct field in "exerciseSchedule".
        //the spread operator (...) with "|| []" added to it ensures we append to existing data or start a new array if empty
        //
        //flow is like this: users -> user (randomly jumbled characters) -> exerciseSchedule
        //exerciseSchedule:
        //  > monday
        //  > tuesday
        //  > wednesday
        //  > thursday
        //  > friday
        //  > saturday
        //  > sunday
        switch (day) {
          case "monday":
            data.exerciseSchedule.monday = [
              ...(data.exerciseSchedule.monday || []),
              newExercise,
            ];
            break;
          case "tuesday":
            data.exerciseSchedule.tuesday = [
              ...(data.exerciseSchedule.tuesday || []),
              newExercise,
            ];
            break;
          case "wednesday":
            data.exerciseSchedule.wednesday = [
              ...(data.exerciseSchedule.wednesday || []),
              newExercise,
            ];
            break;
          case "thursday":
            data.exerciseSchedule.thursday = [
              ...(data.exerciseSchedule.thursday || []),
              newExercise,
            ];
            break;
          case "friday":
            data.exerciseSchedule.friday = [
              ...(data.exerciseSchedule.friday || []),
              newExercise,
            ];
            break;
          case "saturday":
            data.exerciseSchedule.saturday = [
              ...(data.exerciseSchedule.saturday || []),
              newExercise,
            ];
            break;
          case "sunday":
            data.exerciseSchedule.sunday = [
              ...(data.exerciseSchedule.sunday || []),
              newExercise,
            ];
            break;
          default:
            return;
        }

        await updateDoc(doc(db, "users", user.uid), {
          exerciseSchedule: data.exerciseSchedule,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  //called after user presses the add button on a food card. saves to firestore and updates streak
  async function handleFoodClick(food: FoodData) {
    if (!user?.uid) return;
    try {
      const userData = await getDoc(doc(db, "users", user.uid));
      if (!userData.exists()) return;

      const data = userData.data();
      const existingFood = data.food || [];

      //stamp with current time so we can filter by date later
      const newEntry = { ...food, addedAt: new Date().toISOString() };

      //streak logic. compare datstrings to keep it simple
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const lastLogged = data.lastLoggedDate || "";
      let newStreak = data.streak || 0;

      if (lastLogged === today) {
        //already logged today so dont change streak
      } else if (lastLogged === yesterday) {
        //logged yesterday so keep it going
        newStreak = newStreak + 1;
      } else {
        //missed a day so reset to 1
        newStreak = 1;
      }

      await updateDoc(doc(db, "users", user.uid), {
        food: [...existingFood, newEntry],
        streak: newStreak,
        lastLoggedDate: today,
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#254D32] to-[#3A7D44]">
      <Sidebar page="Search" />
      <main className="flex-1 pl-70 pt-10">
        <div className="mx-50">
          <div className="flex flex-col gap-2">
            <header>
              <div className="flex flex-col">
                <h1 className="text-4xl font-black text-white">Search</h1>
                <p className="text-white font-medium">
                  Find food by name and exercises based on muscles.
                </p>
              </div>
            </header>
            <div className="flex flex-row gap-10">
              <div className="flex-1">
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
                          fat_saturated_g={food.fat_saturated_g}
                          protein_g={food.protein_g}
                          sodium_mg={food.sodium_mg}
                          potassium_mg={food.potassium_mg}
                          cholesterol_mg={food.cholesterol_mg}
                          carbohydrates_total_g={food.carbohydrates_total_g}
                          fiber_g={food.fiber_g}
                          sugar_g={food.sugar_g}
                          handleOnClick={(scaledFood) => handleFoodClick(scaledFood)}
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
                          key={index}
                          name={exercise.name}
                          difficulty={exercise.difficulty}
                          handleOnClick={(name, difficulty, day) =>
                            handleExerciseClick(name, difficulty, day)
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-white font-bold">
                        Valid muscles include: abdominals, abductors, adductors,
                        biceps, calves, chest, forearms, glutes, hamstrings,
                        lats, back, neck, quadriceps, traps, and triceps.
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
