"use client";

import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/utils/firebase/auth-context";
import { db } from "@/utils/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface WaterLog {
  date: string;
  amount: number;
}

interface AchievementBadge {
  name: string;
  description: string;
  progressLabel: string;
  progressPercent: number;
  unlocked: boolean;
  shortCode: string;
}

interface BadgeGalleryItem {
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  accentBg: string;
  accentText: string;
}

function formatLastActive(lastLoggedDate: string) {
  if (!lastLoggedDate) return "No logs yet";

  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (lastLoggedDate === today) return "Active today";
  if (lastLoggedDate === yesterday) return "Last active yesterday";

  return `Last active ${lastLoggedDate}`;
}

function getProgressPercent(current: number, goal: number) {
  if (goal <= 0) return 0;
  return Math.min((current / goal) * 100, 100);
}

function BadgeIcon({ icon }: { icon: string }) {
  const commonProps = {
    className: "h-9 w-9",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "spark":
      return (
        <svg {...commonProps}>
          <path d="M12 3L13.9 8.1L19 10L13.9 11.9L12 17L10.1 11.9L5 10L10.1 8.1L12 3Z" />
        </svg>
      );
    case "apple":
      return (
        <svg {...commonProps}>
          <path d="M14 7C14.8 5.8 16 5.2 17 5C16.7 4 15.7 3 14.2 3C12.8 3 12 4 12 4C12 4 11.2 3 9.8 3C7.3 3 5 5.4 5 9.1C5 13.9 8.3 19 11.3 19C12.2 19 12.8 18.5 14 18.5C15.2 18.5 15.8 19 16.7 19C19.6 19 22 13.8 22 10.5C22 8.8 21.4 7.4 20.3 6.5C18.6 5.1 16.5 5.3 15 6.4" />
          <path d="M12 4C12 5.8 10.6 7 9 7" />
        </svg>
      );
    case "drop":
      return (
        <svg {...commonProps}>
          <path d="M12 3C12 3 6 10 6 14C6 17.3 8.7 20 12 20C15.3 20 18 17.3 18 14C18 10 12 3 12 3Z" />
        </svg>
      );
    case "dumbbell":
      return (
        <svg {...commonProps}>
          <path d="M3 10V14" />
          <path d="M6 8V16" />
          <path d="M18 8V16" />
          <path d="M21 10V14" />
          <path d="M6 12H18" />
        </svg>
      );
    case "target":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2V5" />
          <path d="M22 12H19" />
          <path d="M12 22V19" />
          <path d="M2 12H5" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...commonProps}>
          <path d="M19 5C14 5 8 8 7 14C6.5 17 8.7 19 11.5 19C17.5 19 19 12.5 19 5Z" />
          <path d="M8 16C10 14 12.5 12.5 16 10" />
        </svg>
      );
    case "compass":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M14.5 9.5L13 13L9.5 14.5L11 11L14.5 9.5Z" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...commonProps}>
          <path d="M13 2L6 13H11L10 22L18 10H13L13 2Z" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...commonProps}>
          <path d="M8 4H16V8C16 10.2 14.2 12 12 12C9.8 12 8 10.2 8 8V4Z" />
          <path d="M10 12V15" />
          <path d="M14 12V15" />
          <path d="M8 20H16" />
          <path d="M12 15V20" />
          <path d="M8 5H5C5 8 6.5 9.5 8 10" />
          <path d="M16 5H19C19 8 17.5 9.5 16 10" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useUserAuth();
  const [displayName, setDisplayName] = useState("");
  const [calories, setCalories] = useState<number>(0);
  const [protein, setProtein] = useState(0);
  const [water, setWater] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [setupComplete, setSetupComplete] = useState(false);
  const [lastLoggedDate, setLastLoggedDate] = useState("");
  const [waterLog, setWaterLog] = useState<WaterLog>({ date: "", amount: 0 });

  useEffect(() => {
    if (!loading && !user) router.push("/");

    async function fetchData() {
      if (!user?.uid) return;

      const userData = await getDoc(doc(db, "users", user.uid));
      if (!userData.exists()) return;

      const data = userData.data();
      setDisplayName(data.displayName || "");
      setCalories(data.dailyGoals.calories || 0);
      setProtein(data.dailyGoals.protein || 0);
      setWater(data.dailyGoals.water || 0);
      setAchievements(data.achievements || []);
      setStreak(data.streak || 0);
      setSetupComplete(Boolean(data.setupComplete));
      setLastLoggedDate(data.lastLoggedDate || "");
      setWaterLog(data.waterLog || { date: "", amount: 0 });
    }

    fetchData();
  }, [user, loading, router]);

  async function saveChanges() {
    if (!user?.uid) return;

    await updateDoc(doc(db, "users", user.uid), {
      displayName: displayName,
      "dailyGoals.calories": calories,
      "dailyGoals.protein": protein,
      "dailyGoals.water": water,
      setupComplete: true,
    });

    setSetupComplete(true);
    alert("Profile Updated!");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    saveChanges();
  }

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#111827] text-white">
        Loading...
      </div>
    );

  const today = new Date().toDateString();
  const waterToday = waterLog.date === today ? waterLog.amount : 0;
  const hydrationPercent = getProgressPercent(waterToday, water);
  const unlockedAchievementCount = achievements.length;

  const achievementBadges: AchievementBadge[] = [
    {
      name: "Profile Setup",
      description: "Save your profile with daily goals to unlock your setup badge.",
      progressLabel: setupComplete ? "Completed" : "Waiting for first save",
      progressPercent: setupComplete ? 100 : 50,
      unlocked: setupComplete,
      shortCode: "PF",
    },
    {
      name: "First Log",
      description: "Add your first nutrition entry to begin tracking progress.",
      progressLabel: streak > 0 ? "Unlocked" : "Log food from Search",
      progressPercent: streak > 0 || lastLoggedDate ? 100 : 0,
      unlocked: streak > 0 || Boolean(lastLoggedDate),
      shortCode: "FL",
    },
    {
      name: "3 Day Streak",
      description: "Stay consistent for three straight days of logging.",
      progressLabel: `${Math.min(streak, 3)} / 3 days`,
      progressPercent: Math.min((streak / 3) * 100, 100),
      unlocked: streak >= 3,
      shortCode: "S3",
    },
    {
      name: "7 Day Streak",
      description: "Reach a full week of healthy tracking habits.",
      progressLabel: `${Math.min(streak, 7)} / 7 days`,
      progressPercent: Math.min((streak / 7) * 100, 100),
      unlocked: streak >= 7,
      shortCode: "S7",
    },
    {
      name: "Hydration Goal",
      description: "Meet your daily water target to earn this badge.",
      progressLabel:
        water > 0
          ? `${Math.min(waterToday, water)} / ${water} ml today`
          : "Set a water goal first",
      progressPercent: hydrationPercent,
      unlocked: water > 0 && waterToday >= water,
      shortCode: "HY",
    },
  ];

  const unlockedBadges = achievementBadges.filter((badge) => badge.unlocked).length;
  const activeGoals = [calories, protein, water].filter((goal) => goal > 0).length;
  const badgeGallery: BadgeGalleryItem[] = [
    {
      name: "Fresh Start",
      description: "Set up your profile and get moving.",
      icon: "spark",
      unlocked: setupComplete,
      accentBg: "bg-[#1f3344]",
      accentText: "text-[#7fd3ff]",
    },
    {
      name: "Nutrition Pro",
      description: "Keep your meals and protein on track.",
      icon: "apple",
      unlocked: protein > 0,
      accentBg: "bg-[#2d2f19]",
      accentText: "text-[#d7dd74]",
    },
    {
      name: "Hydration Hero",
      description: "Build strong daily water habits.",
      icon: "drop",
      unlocked: water > 0 && waterToday >= water,
      accentBg: "bg-[#182d44]",
      accentText: "text-[#74c4ff]",
    },
    {
      name: "Workout Ready",
      description: "Stay committed to your exercise plan.",
      icon: "dumbbell",
      unlocked: activeGoals > 0,
      accentBg: "bg-[#301f38]",
      accentText: "text-[#d8a0ff]",
    },
    {
      name: "Consistency",
      description: "Show up day after day for yourself.",
      icon: "target",
      unlocked: streak >= 3,
      accentBg: "bg-[#3a2719]",
      accentText: "text-[#ffbf7b]",
    },
    {
      name: "Goal Setter",
      description: "Define targets that guide your progress.",
      icon: "leaf",
      unlocked: activeGoals === 3,
      accentBg: "bg-[#173225]",
      accentText: "text-[#89e3a8]",
    },
    {
      name: "Wellness Mindset",
      description: "Balance your habits with intention.",
      icon: "compass",
      unlocked: setupComplete && activeGoals > 0,
      accentBg: "bg-[#1e2940]",
      accentText: "text-[#9bb6ff]",
    },
    {
      name: "Daily Explorer",
      description: "Keep discovering tools and tracking options.",
      icon: "bolt",
      unlocked: Boolean(lastLoggedDate),
      accentBg: "bg-[#372916]",
      accentText: "text-[#ffd27b]",
    },
    {
      name: "Champion Week",
      description: "Turn healthy actions into a full-week routine.",
      icon: "trophy",
      unlocked: streak >= 7,
      accentBg: "bg-[#2f221a]",
      accentText: "text-[#f7c66d]",
    },
  ];
  const completionPercent = Math.round(
    ((setupComplete ? 1 : 0) + activeGoals / 3 + unlockedBadges / achievementBadges.length) /
      3 *
      100
  );

  const shellCard =
    "rounded-2xl border border-[#31473a] bg-[#131a23]/95 shadow-[0px_16px_38px_rgba(0,0,0,0.18)]";
  const panelCard =
    "rounded-2xl border border-[#31473a] bg-[#0f1720]/85";
  const inputStyles =
    "w-full rounded-xl border border-[#31473a] bg-[#0d141c] px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#69B578] focus:outline-none";

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#254D32] to-[#3A7D44]">
      <Sidebar page="Profile" />
      <main className="pb-10 pl-[22rem] pt-10">
        <div className="mx-auto max-w-7xl px-6 xl:px-10">
          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D4E5B2]">
                  Account
                </p>
                <h1 className="pt-2 text-4xl font-black text-white">Profile</h1>
                <p className="pt-2 text-base text-[#E3ECD9]">
                  Manage your details, refine your goals, and keep an eye on your progress.
                </p>
              </div>
              <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[#466955] bg-[#121821]/80 px-4 py-2 text-sm text-[#D4E5B2]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#69B578]" />
                {formatLastActive(lastLoggedDate)}
              </div>
            </header>

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.9fr)]">
              <section className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className={`${shellCard} p-5`}>
                    <p className="text-sm font-semibold text-[#A7CBB0]">Current streak</p>
                    <p className="pt-3 text-3xl font-black text-white">
                      {streak}
                      <span className="pl-2 text-base font-semibold text-gray-300">
                        day{streak !== 1 ? "s" : ""}
                      </span>
                    </p>
                    <p className="pt-2 text-sm text-gray-400">
                      Keep logging to build consistency.
                    </p>
                  </div>

                  <div className={`${shellCard} p-5`}>
                    <p className="text-sm font-semibold text-[#A7CBB0]">Badges unlocked</p>
                    <p className="pt-3 text-3xl font-black text-white">
                      {unlockedBadges}
                      <span className="pl-2 text-base font-semibold text-gray-300">
                        / {achievementBadges.length}
                      </span>
                    </p>
                    <p className="pt-2 text-sm text-gray-400">
                      Milestones earned from your habits.
                    </p>
                  </div>

                  <div className={`${shellCard} p-5`}>
                    <p className="text-sm font-semibold text-[#A7CBB0]">Goal setup</p>
                    <p className="pt-3 text-3xl font-black text-white">
                      {activeGoals}
                      <span className="pl-2 text-base font-semibold text-gray-300">
                        / 3
                      </span>
                    </p>
                    <p className="pt-2 text-sm text-gray-400">
                      Daily nutrition targets configured.
                    </p>
                  </div>
                </div>

                <div className={`${shellCard} p-8`}>
                  <div className="flex flex-col gap-3 border-b border-[#273a2f] pb-6 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h2 className="text-2xl font-black text-white">Profile details</h2>
                      <p className="pt-2 text-sm text-gray-400">
                        Update your name and tune your daily calorie, protein, and hydration goals.
                      </p>
                    </div>
                    <div className="inline-flex w-fit rounded-full border border-[#3d5b48] bg-[#101720] px-4 py-2 text-sm font-semibold text-[#CDE0B2]">
                      {setupComplete ? "Setup complete" : "Setup in progress"}
                    </div>
                  </div>

                  <form className="flex flex-col gap-6 pt-6" onSubmit={handleSubmit}>
                    <div className={`${panelCard} p-5`}>
                      <label className="block text-sm font-semibold text-[#BFD8C6]">
                        Display name
                      </label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className={`${inputStyles} mt-3`}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                      <div className={`${panelCard} p-5`}>
                        <label className="block text-sm font-semibold text-[#BFD8C6]">
                          Calories
                        </label>
                        <input
                          type="number"
                          value={calories}
                          onChange={(e) => setCalories(Number(e.target.value))}
                          className={`${inputStyles} mt-3`}
                        />
                        <p className="pt-3 text-xs text-gray-400">
                          Daily energy target in kcal.
                        </p>
                      </div>

                      <div className={`${panelCard} p-5`}>
                        <label className="block text-sm font-semibold text-[#BFD8C6]">
                          Protein
                        </label>
                        <input
                          type="number"
                          value={protein}
                          onChange={(e) => setProtein(Number(e.target.value))}
                          className={`${inputStyles} mt-3`}
                        />
                        <p className="pt-3 text-xs text-gray-400">
                          Daily protein target in grams.
                        </p>
                      </div>

                      <div className={`${panelCard} p-5`}>
                        <label className="block text-sm font-semibold text-[#BFD8C6]">
                          Water
                        </label>
                        <input
                          type="number"
                          value={water}
                          onChange={(e) => setWater(Number(e.target.value))}
                          className={`${inputStyles} mt-3`}
                        />
                        <p className="pt-3 text-xs text-gray-400">
                          Daily hydration target in ml.
                        </p>
                      </div>
                    </div>

                    <div className={`${panelCard} p-5`}>
                      <p className="text-sm font-semibold text-[#BFD8C6]">Current plan</p>
                      <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-3">
                        <div className="rounded-xl bg-[#0c1219] px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                            Calories
                          </p>
                          <p className="pt-2 text-xl font-bold text-white">{calories} kcal</p>
                        </div>
                        <div className="rounded-xl bg-[#0c1219] px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                            Protein
                          </p>
                          <p className="pt-2 text-xl font-bold text-white">{protein} g</p>
                        </div>
                        <div className="rounded-xl bg-[#0c1219] px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                            Water
                          </p>
                          <p className="pt-2 text-xl font-bold text-white">{water} ml</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="rounded-xl bg-[#69B578] px-6 py-3 text-base font-bold text-[#112016] transition-colors duration-200 hover:cursor-pointer hover:bg-[#82c78e]"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>

                <div className={`${shellCard} p-8`}>
                  <div className="flex flex-col gap-2 border-b border-[#273a2f] pb-6">
                    <h2 className="text-2xl font-black text-white">Badge collection</h2>
                    <p className="text-sm text-gray-400">
                      A visual snapshot of the milestones you&apos;re building across your health journey.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 xl:grid-cols-3">
                    {badgeGallery.map((badge) => (
                      <div
                        key={badge.name}
                        className={`${panelCard} flex flex-col gap-4 p-5 transition-all ${
                          badge.unlocked ? "border-[#4d7a57]" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div
                            className={`flex h-16 w-16 items-center justify-center rounded-2xl ${badge.accentBg} ${badge.accentText}`}
                          >
                            <BadgeIcon icon={badge.icon} />
                          </div>
                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                              badge.unlocked
                                ? "bg-[#173322] text-[#A9D9B4]"
                                : "bg-[#1a222d] text-[#9aa6b2]"
                            }`}
                          >
                            {badge.unlocked ? "Unlocked" : "Locked"}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-white">{badge.name}</h3>
                          <p className="pt-2 text-sm leading-6 text-gray-400">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <aside className="flex flex-col gap-6">
                <div className={`${shellCard} p-7`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#A7CBB0]">Progress overview</p>
                      <h2 className="pt-2 text-2xl font-black text-white">
                        {completionPercent}% complete
                      </h2>
                      <p className="pt-2 text-sm text-gray-400">
                        Based on profile setup, goal configuration, and badge progress.
                      </p>
                    </div>
                    <div className="rounded-full border border-[#365241] bg-[#0f1720] px-3 py-1 text-sm font-semibold text-[#D4E5B2]">
                      {formatLastActive(lastLoggedDate)}
                    </div>
                  </div>

                  <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-[#223228]">
                    <div
                      className="h-full rounded-full bg-[#69B578] transition-all duration-500"
                      style={{ width: `${completionPercent}%` }}
                    />
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className={`${panelCard} p-4`}>
                      <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                        Hydration today
                      </p>
                      <p className="pt-2 text-2xl font-bold text-white">{waterToday} ml</p>
                      <p className="pt-1 text-sm text-gray-400">Goal: {water} ml</p>
                    </div>
                    <div className={`${panelCard} p-4`}>
                      <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                        Stored achievements
                      </p>
                      <p className="pt-2 text-2xl font-bold text-white">
                        {unlockedAchievementCount}
                      </p>
                      <p className="pt-1 text-sm text-gray-400">Saved in your profile</p>
                    </div>
                  </div>
                </div>

                <div className={`${shellCard} p-7`}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-white">Achievement badges</h2>
                      <p className="pt-2 text-sm text-gray-400">
                        Clean milestone tracking for your health habits.
                      </p>
                    </div>
                    <div className="rounded-full border border-[#365241] bg-[#0f1720] px-3 py-1 text-sm font-semibold text-[#D4E5B2]">
                      {unlockedBadges}/{achievementBadges.length}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-4">
                    {achievementBadges.map((badge) => (
                      <div key={badge.name} className={`${panelCard} p-4`}>
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-sm font-bold ${
                              badge.unlocked
                                ? "border-[#69B578] bg-[#173322] text-[#BFE3C7]"
                                : "border-[#2d3f36] bg-[#0c1219] text-[#7e9788]"
                            }`}
                          >
                            {badge.shortCode}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="text-base font-bold text-white">{badge.name}</h3>
                                <p className="pt-1 text-sm text-gray-400">
                                  {badge.description}
                                </p>
                              </div>
                              <span
                                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                                  badge.unlocked
                                    ? "bg-[#173322] text-[#A9D9B4]"
                                    : "bg-[#1a222d] text-[#9aa6b2]"
                                }`}
                              >
                                {badge.unlocked ? "Unlocked" : "Tracking"}
                              </span>
                            </div>

                            <p className="pt-3 text-sm font-medium text-[#BFD8C6]">
                              {badge.progressLabel}
                            </p>
                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#223228]">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  badge.unlocked ? "bg-[#69B578]" : "bg-[#4d6c58]"
                                }`}
                                style={{ width: `${badge.progressPercent}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`${panelCard} mt-6 p-4`}>
                    <p className="text-sm font-semibold text-[#BFD8C6]">Saved achievement notes</p>
                    {achievements.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {achievements.map((achievement) => (
                          <span
                            key={achievement}
                            className="rounded-full border border-[#365241] bg-[#0c1219] px-3 py-1.5 text-sm text-[#DDE8D4]"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="pt-3 text-sm text-gray-400">
                        No custom achievement notes yet. This area is ready for future milestone rewards.
                      </p>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
