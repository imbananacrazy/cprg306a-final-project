"use client";

import { useState } from "react";

// This card is shown in the Search page after a user searches for food.
// It lets the user adjust the serving size in grams before adding.
// All nutritional values scale live as the user types a new gram amount.
// handleOnClick receives the already-scaled food object so the parent
// (search/page.tsx) can save the correct numbers to Firestore.

interface FoodData {
  name: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
}

interface Props extends FoodData {
  handleOnClick: (scaledFood: FoodData) => void;
}

export default function SearchedFood({
  name,
  calories,
  serving_size_g,
  fat_total_g,
  fat_saturated_g,
  protein_g,
  sodium_mg,
  potassium_mg,
  cholesterol_mg,
  carbohydrates_total_g,
  fiber_g,
  sugar_g,
  handleOnClick,
}: Props) {
  // The user's chosen serving size. Starts at the API's default (e.g. 100g).
  const [grams, setGrams] = useState(serving_size_g);

  // Shows a brief "Added!" confirmation on the button after the user clicks Add.
  // Resets back to normal after 2 seconds.
  const [added, setAdded] = useState(false);

  // Scale factor: how many times bigger/smaller the user's portion is vs the base.
  // e.g. base = 100g, user enters 150g → scale = 1.5
  const scale = grams > 0 ? grams / serving_size_g : 0;

  // All values scaled to the user's chosen gram amount
  const scaled: FoodData = {
    name,
    serving_size_g: grams,
    calories: calories * scale,
    fat_total_g: fat_total_g * scale,
    fat_saturated_g: fat_saturated_g * scale,
    protein_g: protein_g * scale,
    sodium_mg: sodium_mg * scale,
    potassium_mg: potassium_mg * scale,
    cholesterol_mg: cholesterol_mg * scale,
    carbohydrates_total_g: carbohydrates_total_g * scale,
    fiber_g: fiber_g * scale,
    sugar_g: sugar_g * scale,
  };

  // Stop the click on the input from bubbling up and triggering the Add button
  function handleInputClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <div className="bg-white border-[#254D32] p-5 rounded-lg flex flex-col gap-3 border w-full">
      {/* Header row: name + calorie count */}
      <div className="flex justify-between items-center text-black">
        <h1 className="text-start text-xl font-bold capitalize">
          {name}
        </h1>
        <span className="text-lg font-bold text-[#254D32]">
          {Math.round(scaled.calories)} kcal
        </span>
      </div>

      {/* Serving size input */}
      <div className="flex items-center gap-2" onClick={handleInputClick}>
        <label className="text-sm font-bold text-gray-600 whitespace-nowrap">
          Serving size:
        </label>
        <input
          type="number"
          min={1}
          value={grams}
          onChange={(e) => setGrams(Number(e.target.value))}
          className="w-24 border border-[#254D32] rounded-lg px-3 py-1 text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#69B578]"
        />
        <span className="text-sm font-bold text-gray-600">g</span>
        <span className="text-xs text-gray-400 ml-1">
          (API default: {serving_size_g}g)
        </span>
      </div>

      {/* Nutrient badges — all live-scaled */}
      <div className="flex flex-row flex-wrap justify-end gap-2">
        <div className="text-sm font-bold capitalize bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100">
          {Math.round(scaled.protein_g)}g Protein
        </div>
        <div className="text-sm font-bold capitalize bg-orange-50 text-orange-600 px-2 py-1 rounded-md border border-orange-100">
          {Math.round(scaled.carbohydrates_total_g)}g Carbs
        </div>
        <div className="text-sm font-bold capitalize bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-200">
          {Math.round(scaled.fat_total_g)}g Fat
        </div>
        <div className="text-sm font-bold capitalize bg-purple-50 text-purple-600 px-2 py-1 rounded-md border border-purple-100">
          {Math.round(scaled.sodium_mg)}mg Sodium
        </div>
        <div className="text-sm font-bold capitalize bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md border border-emerald-100">
          {Math.round(scaled.fiber_g)}g Fiber
        </div>
        <div className="text-sm font-bold capitalize bg-pink-50 text-pink-600 px-2 py-1 rounded-md border border-pink-100">
          {Math.round(scaled.sugar_g)}g Sugar
        </div>
      </div>

      {/* Add button */}
      <button
        className={`w-full font-bold py-2 rounded-lg transition-all duration-200 hover:cursor-pointer ${
          added
            ? "bg-[#69B578] text-white scale-[0.99]"
            : "bg-[#254D32] hover:bg-[#69B578] text-white"
        }`}
        onClick={() => {
          handleOnClick(scaled);
          setAdded(true);
          setTimeout(() => setAdded(false), 2000);
        }}
      >
        {added ? `✓ Added ${grams}g of ${name}!` : `Add ${grams}g of ${name}`}
      </button>
    </div>
  );
}
