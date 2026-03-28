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
      <Sidebar page="Nutrition" />

      <main className="flex-1 pl-70 pt-10">
        <div className="h-screen mx-50">
          <div className="flex flex-col gap-2">
            <header>
              <div className="flex flex-col">
                <h1 className="text-4xl font-black text-black">Nutrition</h1>
                <p className="text-gray-500 font-medium">
                  View and manage your nutritional intake.
                </p>
              </div>
            </header>
          </div>
        </div>
      </main>
    </div>
  );
}
