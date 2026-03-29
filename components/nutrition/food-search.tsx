"use client";

import { useState } from "react";

export default function FoodSearch({
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
      const response = await fetch(`/api/nutrition/search?query=${newQuery}`);
      const result = await response.json();

      console.log(result.data);

      if (result.data.length > 0) {
        onSearchResults(result.data);
      }
    } catch (error) {
      console.error("Error fetching nutrition data: " + error);
    }
  }

  const baseStyles =
    "bg-[#181d27] border-1 border-[#254D32] transition-all duration-200 ease-in-out text-white";

  return (
    <form
      className="flex flex-row bg-transparent rounded-lg gap-2 pb-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search food by name (eg. banana)"
        className={`w-full text-lg p-4 placeholder:text-gray-500 rounded-lg focus:outline-none ${baseStyles}`}
      />
      <button
        type="submit"
        className={`px-5 rounded-lg text-lg font-bold hover:bg-[#69B578] hover:cursor-pointer ${baseStyles}`}
      >
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none">
          <path
            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
            stroke={"white"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
}
