"use client";

import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/utils/firebase/auth-context";
import { db } from "@/utils/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

//maps getDay() index to firestore field names (0 = sunday)
const DAY_NAMES = [
  "sunday", "monday", "tuesday", "wednesday",
  "thursday", "friday", "saturday",
];

//capitalizes first letter
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//progress bar component, reused for calories protein and water
function ProgressBar({
  label, current, goal, unit, color,
}: {
  label: string; current: number; goal: number; unit: string; color: string;
}) {
  //clamp between 0 and 100 so it doesnt overflow
  const percent = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;
  return (
    <div className="bg-[#181d27] rounded-xl p-6 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2 className="text-white font-bold text-lg">{label}</h2>
        <span className="text-white font-bold text-lg">
          {Math.round(current)}{unit} / {goal}{unit}
        </span>
      </div>
      <div className="w-full bg-[#254D32] rounded-full h-4 overflow-hidden">
        <div
          className={`h-4 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-green-300 text-sm font-medium">
        {Math.round(percent)}% of daily goal
      </p>
    </div>
  );
}

interface ExerciseData {
  name: string;
  difficulty: string;
}

//shape for waterlog stored in firestore
interface WaterLog {
  date: string;
  amount: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useUserAuth();

  //goals
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [proteinGoal, setProteinGoal] = useState(0);
  const [waterGoal, setWaterGoal] = useState(0);

  //todays nutrition totals
  const [caloriesToday, setCaloriesToday] = useState(0);
  const [proteinToday, setProteinToday] = useState(0);

  //water tracking, resets each day
  const [waterLog, setWaterLog] = useState<WaterLog>({ date: "", amount: 0 });

  //streak
  const [streak, setStreak] = useState(0);

  //todays exercise plan
  const [todayExercises, setTodayExercises] = useState<ExerciseData[]>([]);
  const [todayName, setTodayName] = useState("");

  useEffect(() => {
    if (!loading && !user) router.push("/");

    async function fetchDashboardData() {
      if (!user?.uid) return;
      const userData = await getDoc(doc(db, "users", user.uid));
      if (!userData.exists()) return;
      const data = userData.data();

      //goals
      setCalorieGoal(data.dailyGoals?.calories || 0);
      setProteinGoal(data.dailyGoals?.protein || 0);
      setWaterGoal(data.dailyGoals?.water || 0);

      //streak
      setStreak(data.streak || 0);

      //if its a new day treat water as 0
      const storedWater = data.waterLog || { date: "", amount: 0 };
      const todayString = new Date().toDateString();
      if (storedWater.date === todayString) {
        setWaterLog(storedWater);
      } else {
        setWaterLog({ date: todayString, amount: 0 });
      }

      //todays food totals
      const allFood = data.food || [];
      const todayFood = allFood.filter(
        (item: { addedAt: string }) =>
          new Date(item.addedAt).toDateString() === todayString
      );
      setCaloriesToday(
        todayFood.reduce(
          (sum: number, item: { calories: number }) => sum + (item.calories || 0),
          0
        )
      );
      setProteinToday(
        todayFood.reduce(
          (sum: number, item: { protein_g: number }) => sum + (item.protein_g || 0),
          0
        )
      );

      //todays exercises
      const todayKey = DAY_NAMES[new Date().getDay()];
      setTodayName(capitalize(todayKey));
      setTodayExercises(data.exerciseSchedule?.[todayKey] || []);
    }

    fetchDashboardData();
  }, [user, loading, router]);

  //adds water and saves to firestore
  async function addWater(ml: number) {
    if (!user?.uid) return;
    const today = new Date().toDateString();
    const currentAmount = waterLog.date === today ? waterLog.amount : 0;
    const newLog: WaterLog = { date: today, amount: currentAmount + ml };
    setWaterLog(newLog);
    await updateDoc(doc(db, "users", user.uid), { waterLog: newLog });
  }

  //resets water back to 0
  async function resetWater() {
    if (!user?.uid) return;
    const newLog: WaterLog = { date: new Date().toDateString(), amount: 0 };
    setWaterLog(newLog);
    await updateDoc(doc(db, "users", user.uid), { waterLog: newLog });
  }

  //0 if its a new day
  const waterToday =
    waterLog.date === new Date().toDateString() ? waterLog.amount : 0;

  if (loading)
    return (
      <div className="bg-[#111827] h-screen w-full flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#254D32] to-[#3A7D44]">
      <Sidebar page="Dashboard" />
      <main className="flex-1 pl-70 pt-10 pb-10">
        <div className="mx-50">
          <div className="flex flex-col gap-6">

            {/* header and streak badge */}
            <header className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-white">Dashboard</h1>
                <p className="text-white font-medium">
                  Here&apos;s how your day is going.
                </p>
              </div>
              {/* streak badge, only shows if streak is above 0 */}
              {streak > 0 && (
                <div className="bg-[#181d27] rounded-xl px-5 py-3 flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <div className="flex flex-col">
                    <span className="text-white font-black text-xl leading-none">
                      {streak} day{streak !== 1 ? "s" : ""}
                    </span>
                    <span className="text-green-300 text-xs font-bold">
                      Current streak
                    </span>
                  </div>
                </div>
              )}
            </header>

            {/* quick actions */}
            <section className="grid grid-cols-3 gap-3">
              <button
                onClick={() => router.push("/search")}
                className="bg-[#181d27] hover:bg-[#69B578] text-white font-bold rounded-xl p-4 text-left transition-colors duration-200 hover:cursor-pointer"
              >
                <p className="text-2xl mb-1">🍎</p>
                <p className="text-base font-bold">Log Food</p>
                <p className="text-xs text-green-300 font-medium">
                  Search &amp; add meals
                </p>
              </button>
              <button
                onClick={() => router.push("/manage-nutrition")}
                className="bg-[#181d27] hover:bg-[#69B578] text-white font-bold rounded-xl p-4 text-left transition-colors duration-200 hover:cursor-pointer"
              >
                <p className="text-2xl mb-1">📋</p>
                <p className="text-base font-bold">Today&apos;s Log</p>
                <p className="text-xs text-green-300 font-medium">
                  View &amp; remove entries
                </p>
              </button>
              <button
                onClick={() => router.push("/manage-exercises")}
                className="bg-[#181d27] hover:bg-[#69B578] text-white font-bold rounded-xl p-4 text-left transition-colors duration-200 hover:cursor-pointer"
              >
                <p className="text-2xl mb-1">🏋️</p>
                <p className="text-base font-bold">Weekly Plan</p>
                <p className="text-xs text-green-300 font-medium">
                  View &amp; manage exercises
                </p>
              </button>
            </section>

            {/* daily progress */}
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold text-white">
                Today&apos;s Progress
              </h2>

              <ProgressBar
                label="Calories"
                current={caloriesToday}
                goal={calorieGoal}
                unit=" kcal"
                color="bg-[#69B578]"
              />

              <ProgressBar
                label="Protein"
                current={proteinToday}
                goal={proteinGoal}
                unit="g"
                color="bg-blue-500"
              />

              {/* water with real logging */}
              <div className="bg-[#181d27] rounded-xl p-6 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-white font-bold text-lg">Water</h2>
                  <span className="text-white font-bold text-lg">
                    {waterToday} ml / {waterGoal} ml
                  </span>
                </div>
                <div className="w-full bg-[#254D32] rounded-full h-4 overflow-hidden">
                  <div
                    className="h-4 rounded-full bg-cyan-400 transition-all duration-500"
                    style={{
                      width: `${waterGoal > 0 ? Math.min((waterToday / waterGoal) * 100, 100) : 0}%`,
                    }}
                  />
                </div>
                <p className="text-green-300 text-sm font-medium">
                  {waterGoal > 0
                    ? `${Math.round((waterToday / waterGoal) * 100)}% of daily goal`
                    : "Set your water goal in Profile"}
                </p>
                {/* quick add buttons */}
                <div className="flex flex-row gap-2 pt-1">
                  {[250, 500, 1000].map((ml) => (
                    <button
                      key={ml}
                      onClick={() => addWater(ml)}
                      className="flex-1 bg-[#254D32] hover:bg-[#69B578] text-white font-bold py-2 rounded-lg text-sm transition-colors duration-200 hover:cursor-pointer"
                    >
                      +{ml} ml
                    </button>
                  ))}
                  <button
                    onClick={resetWater}
                    className="bg-transparent border border-red-800 hover:bg-red-800 text-white font-bold py-2 px-3 rounded-lg text-sm transition-colors duration-200 hover:cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </section>

            {/* todays workout */}
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold text-white">
                {todayName}&apos;s Workout
              </h2>

              {todayExercises.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {todayExercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="bg-[#181d27] rounded-xl p-5 flex justify-between items-center"
                    >
                      <h3 className="text-white font-bold text-lg capitalize">
                        {exercise.name}
                      </h3>
                      <span className="text-sm font-bold bg-[#254D32] text-green-300 px-3 py-1 rounded-full capitalize">
                        {exercise.difficulty}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#181d27] rounded-xl p-6 text-center">
                  <p className="text-white font-medium">
                    No exercises scheduled for {todayName}. Head to{" "}
                    <span
                      className="font-bold text-[#69B578] cursor-pointer"
                      onClick={() => router.push("/search")}
                    >
                      Search
                    </span>{" "}
                    to add some!
                  </p>
                </div>
              )}
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
