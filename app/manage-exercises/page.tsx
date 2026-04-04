"use client";

import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/utils/firebase/auth-context";
import ExerciseCard from "@/components/exercise/exercise-card";
import { db } from "@/utils/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface Exercise {
  name: string;
  targetMuscles: string[];
  equipments: string[];
}

export default function ExercisePage() {
  const router = useRouter();
  const { user, loading } = useUserAuth();

  //exercises stored in the days of the week are the exercise IDs
  const [mondayIDs, setMondayIDs] = useState<string[]>([]);
  const [tuesdayIDs, setTuesdayIDs] = useState<string[]>([]);
  const [wednesdayIDs, setWednesdayIDs] = useState<string[]>([]);
  const [thursdayIDs, setThursdayIDs] = useState<string[]>([]);
  const [fridayIDs, setFridayIDs] = useState<string[]>([]);
  const [saturdayIDs, setSaturdayIDs] = useState<string[]>([]);
  const [sundayIDs, setSundayIDs] = useState<string[]>([]);

  //if not signed in, redirect to landing page
  useEffect(() => {
    if (!loading && !user) router.push("/");

    async function fetchExercises() {
      if (user?.uid) {
        const userData = await getDoc(doc(db, "users", user.uid));
        if (userData.exists()) {
          const data = userData.data();
          setMondayIDs(data.exerciseSchedule?.monday || []);
          setTuesdayIDs(data.exerciseSchedule?.tuesday || []);
          setWednesdayIDs(data.exerciseSchedule?.wednesday || []);
          setThursdayIDs(data.exerciseSchedule?.thursday || []);
          setFridayIDs(data.exerciseSchedule?.friday || []);
          setSaturdayIDs(data.exerciseSchedule?.saturday || []);
          setSundayIDs(data.exerciseSchedule?.sunday || []);
        }
      }
    }
    fetchExercises();
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="bg-[#111827] h-screen w-full flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="h-screen bg-gradient-to-r from-[#254D32] to-[#3A7D44]">
      <Sidebar page="Manage Exercises" />
      <main className="flex-1 pl-70 pt-10">
        <div className="mx-50">
          <div className="flex flex-col gap-2">
            <header>
              <div className="flex flex-col">
                <h1 className="text-4xl font-black text-white">
                  Manage Exercises
                </h1>
                <p className="text-white font-medium">
                  View and manage your weekly exercises.
                </p>
              </div>
            </header>
          </div>
        </div>
      </main>
    </div>
  );
}
