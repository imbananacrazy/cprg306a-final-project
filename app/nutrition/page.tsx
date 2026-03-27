"use client";

import Sidebar from "@/components/sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/utils/firebase/auth-context";

export default function Nutrition() {
  const router = useRouter();
  const { user, loading } = useUserAuth();

  //check if the user is authenticated after loading. if loaded and no user, redirect to landing page.
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  //if loading dashboard, don't display the dashboard, but display "loading..."
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center bg-[#181d27] h-screen w-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-white h-screen w-screen">
      <Sidebar page="Nutrition" />
    </div>
  );
}
