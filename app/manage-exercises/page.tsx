"use client";

import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/utils/firebase/auth-context";
import ExerciseCard from "@/components/exercise/exercise-card";
import { db } from "@/utils/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

interface ExerciseData {
  name: string;
  difficulty: string;
}

//displays exercises the user has set for each day of the week. fetches all exercises under "exerciseSchedule" and puts them
//into useState arrays depending on the day they are under using the interface above since each exercise only stores those pieces of data.
export default function ExercisePage() {
  const router = useRouter();
  const { user, loading } = useUserAuth();
  const [mondayExercises, setMondayExercises] = useState<ExerciseData[]>([]);
  const [tuesdayExercises, setTuesdayExercises] = useState<ExerciseData[]>([]);
  const [wednesdayExercises, setWednesdayExercises] = useState<ExerciseData[]>(
    [],
  );
  const [thursdayExercises, setThursdayExercises] = useState<ExerciseData[]>(
    [],
  );
  const [fridayExercises, setFridayExercises] = useState<ExerciseData[]>([]);
  const [saturdayExercises, setSaturdayExercises] = useState<ExerciseData[]>(
    [],
  );
  const [sundayExercises, setSundayExercises] = useState<ExerciseData[]>([]);

  //if not signed in, redirect to landing page
  useEffect(() => {
    if (!loading && !user) router.push("/");

    //fetch all exercises from the "exerciseSchedule" field in the "users" collection. exerciseSchedule is an array of maps that hold
    //name and difficulty
    //ex:
    //    monday:
    //      0:
    //        name: "lift1"
    //        difficulty: intermediate
    //      1:
    //        name: "lift2"
    //        difficulty: beginner
    //    tuesday:
    //      0:
    //        name: "lift 1"
    //        difficulty: beginner
    //    etc...
    async function fetchExercises() {
      if (user?.uid) {
        const userData = await getDoc(doc(db, "users", user.uid));
        if (userData.exists()) {
          const data = userData.data();
          setMondayExercises(data.exerciseSchedule.monday || []);
          setTuesdayExercises(data.exerciseSchedule.tuesday || []);
          setWednesdayExercises(data.exerciseSchedule.wednesday || []);
          setThursdayExercises(data.exerciseSchedule.thursday || []);
          setFridayExercises(data.exerciseSchedule.friday || []);
          setSaturdayExercises(data.exerciseSchedule.saturday || []);
          setSundayExercises(data.exerciseSchedule.sunday || []);
        }
      }
    }
    fetchExercises();
  }, [user, loading, router]);

  //if page is loading (usually really quick), say that its loading. otherwise if not loading and user is
  //signed in, load the manage exercises page.
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
                  View and manage the exercises set for the week.
                </p>
              </div>
            </header>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-white">Monday</h1>
                {mondayExercises.map((exercise, index) => (
                  <ExerciseCard
                    key={index}
                    name={exercise.name}
                    difficulty={exercise.difficulty}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-white">Tuesday</h1>
                {tuesdayExercises.map((exercise, index) => (
                  <ExerciseCard
                    key={index}
                    name={exercise.name}
                    difficulty={exercise.difficulty}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-white">Wednesday</h1>
                {wednesdayExercises.map((exercise, index) => (
                  <ExerciseCard
                    key={index}
                    name={exercise.name}
                    difficulty={exercise.difficulty}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-white">Thursday</h1>
                {thursdayExercises.map((exercise, index) => (
                  <ExerciseCard
                    key={index}
                    name={exercise.name}
                    difficulty={exercise.difficulty}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-white">Friday</h1>
                {fridayExercises.map((exercise, index) => (
                  <ExerciseCard
                    key={index}
                    name={exercise.name}
                    difficulty={exercise.difficulty}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-white">Saturday</h1>
                {saturdayExercises.map((exercise, index) => (
                  <ExerciseCard
                    key={index}
                    name={exercise.name}
                    difficulty={exercise.difficulty}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-white">Sunday</h1>
                {sundayExercises.map((exercise, index) => (
                  <ExerciseCard
                    key={index}
                    name={exercise.name}
                    difficulty={exercise.difficulty}
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
