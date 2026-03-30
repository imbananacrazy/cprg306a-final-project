"use client";

import Sidebar from "@/components/sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/utils/firebase/auth-context";

export default function ExercisePage() {
  const router = useRouter();
  const { user, loading } = useUserAuth();

  //if not signed in, redirect to landing page
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
