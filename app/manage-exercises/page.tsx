"use client";

import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/utils/firebase/auth-context";

export default function ExercisePage() {
  const router = useRouter();
  const { user, loading } = useUserAuth();

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="bg-[#111827] h-screen w-full flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="h-screen bg-white">
      <Sidebar page="Manage Exercises" />

      <main className="flex-1 pl-70 pt-10">
        <div className="h-screen mx-50">
          <div className="flex flex-col gap-2">
            <header>
              <div className="flex flex-col">
                <h1 className="text-4xl font-black text-black">
                  Manage Exercises
                </h1>
                <p className="text-gray-500 font-medium">
                  Manage your weekly exercises.
                </p>
              </div>
            </header>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h1 className="text-black font-extrabold text-xl">Monday</h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-black font-extrabold text-xl">Tuesday</h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-black font-extrabold text-xl">Wednesday</h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-black font-extrabold text-xl">Thursday</h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-black font-extrabold text-xl">Friday</h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-black font-extrabold text-xl">Saturday</h1>
              </div>
              <h1 className="text-black font-extrabold text-xl">Sunday</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
