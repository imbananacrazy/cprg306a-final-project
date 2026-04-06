"use client";

import { useState } from "react";

//this is the search bar for searching food. it lets users type in a food and it returns back a list of food items using the api.
//it uses an api route to ensure our api key is protected and is never exposed.
//
//uses svgs for icons. in summary, svg are just images that allow you to change the the colour and fill.
export default function FoodSearch({
  onSearchResults,
}: {
  onSearchResults: (exercises: any[]) => void;
}) {
  const [query, setQuery] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newQuery = query.trim().toLowerCase();
    //query empty, dont send to route
    if (!newQuery) return;

    try {
      const response = await fetch(`/api/nutrition/search?query=${newQuery}`);
      const result = await response.json();

      //only display food if theres more than 0. its possible to have a valid query but it return 0
      if (result.data.length > 0) {
        onSearchResults(result.data);
      } else {
        onSearchResults([]);
      }
    } catch (error) {
      console.error("Error: " + error);
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
        placeholder="Search food by name (eg. 2 apples)"
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
