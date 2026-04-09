"use client";

import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/utils/firebase/auth-context";
import ExerciseCard from "@/components/exercise/exercise-card";
import { db } from "@/utils/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface ExerciseData {
  name: string;
  difficulty: string;
}

// Single state object to hold all 7 days instead of 7 separate useState calls.
// This makes it much easier to update one day without touching the others.
interface ExerciseSchedule {
  monday: ExerciseData[];
  tuesday: ExerciseData[];
  wednesday: ExerciseData[];
  thursday: ExerciseData[];
  friday: ExerciseData[];
  saturday: ExerciseData[];
  sunday: ExerciseData[];
}

const DAYS: (keyof ExerciseSchedule)[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

// Capitalizes first letter for display
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Default empty schedule used as the initial state
const EMPTY_SCHEDULE: ExerciseSchedule = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

// Displays exercises the user has set for each day of the week.
// Each exercise card has a remove button that deletes it from Firestore.
export default function ManageExercisesPage() {
  const router = useRouter();
  const { user, loading } = useUserAuth();
  const [schedule, setSchedule] = useState<ExerciseSchedule>(EMPTY_SCHEDULE);

  // If not signed in, redirect to landing page
  useEffect(() => {
    if (!loading && !user) router.push("/");

    // Fetch the full exerciseSchedule from Firestore
    async function fetchExercises() {
      if (user?.uid) {
        const userData = await getDoc(doc(db, "users", user.uid));
        if (userData.exists()) {
          const data = userData.data();
          setSchedule({
            monday: data.exerciseSchedule?.monday || [],
            tuesday: data.exerciseSchedule?.tuesday || [],
            wednesday: data.exerciseSchedule?.wednesday || [],
            thursday: data.exerciseSchedule?.thursday || [],
            friday: data.exerciseSchedule?.friday || [],
            saturday: data.exerciseSchedule?.saturday || [],
            sunday: data.exerciseSchedule?.sunday || [],
          });
        }
      }
    }
    fetchExercises();
  }, [user, loading, router]);

  // Removes one exercise from a specific day by index.
  // Builds a new array for that day, updates state immediately, then saves to Firestore.
  async function removeExercise(
    day: keyof ExerciseSchedule,
    indexToRemove: number
  ) {
    if (!user?.uid) return;

    const updatedDay = schedule[day].filter((_, i) => i !== indexToRemove);
    const newSchedule = { ...schedule, [day]: updatedDay };

    setSchedule(newSchedule); // update UI immediately

    await updateDoc(doc(db, "users", user.uid), {
      exerciseSchedule: newSchedule,
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
      <Sidebar page="Manage Exercises" />
      <main className="flex-1 pl-70 pt-10 pb-10">
        <div className="mx-50">
          <div className="flex flex-col gap-2">
            <header>
              <div className="flex flex-col">
                <h1 className="text-4xl font-black text-white">
                  Manage Exercises
                </h1>
                <p className="text-white font-medium">
                  View and manage the exercises set for the week. Click a card
                  to remove it.
                </p>
              </div>
            </header>
            <div className="flex flex-col gap-6 pt-6">
              {DAYS.map((day) => (
                <div key={day} className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold text-white">
                    {capitalize(day)}
                  </h2>
                  {schedule[day].length > 0 ? (
                    schedule[day].map((exercise, index) => (
                      <ExerciseCard
                        key={index}
                        name={exercise.name}
                        difficulty={exercise.difficulty}
                        handleOnClick={() => removeExercise(day, index)}
                      />
                    ))
                  ) : (
                    <p className="text-green-200 text-sm font-medium pl-1">
                      No exercises yet — search to add some.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
