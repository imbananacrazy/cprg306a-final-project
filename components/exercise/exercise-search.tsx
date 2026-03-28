"use client";

import { useState } from "react";

export default function ExerciseSearch({
  onSearchResults,
}: {
  onSearchResults: (exercises: any[]) => void;
}) {
  const [query, setQuery] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newQuery = query.trim().toLowerCase();
    if (!newQuery) return;

    try {
      const response = await fetch(`/api/exercise/search?query=${newQuery}`);
      const result = await response.json();

      console.log(result.data.length);

      if (result.data.length > 0) {
        onSearchResults(result.data);
      }
    } catch (error) {
      console.error("Error fetching exercises: " + error);
    }
  }
  return (
    <form
      className="flex flex-row bg-white rounded-lg gap-2 pb-2"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for exercises by muscle or body part (eg. abs, upper arms)"
        className="w-full text-[#181d27] text-lg p-4 placeholder:text-gray-500 border border-[#254D32] rounded-lg focus:outline-none focus:bg-[#69B578] focus:text-white focus:border-none"
      />
      <button
        className="bg-white w-50 text-black p-4 rounded-lg text-lg hover:cursor-pointer focus:outline-none border border-[#254D32] hover:bg-[#69B578] hover:text-white hover:border-none"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
