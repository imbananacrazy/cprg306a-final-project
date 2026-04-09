"use client";

import { useState } from "react";

//food api doesnt have ids so we store every value to keep track of it
//handleOnClick gets passed from the parent to handle the remove
interface Props {
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
  handleOnClick: () => void;
}

export default function FoodCard({
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
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className="group relative bg-white border-[#254D32] p-5 rounded-lg flex flex-col gap-3 border hover:cursor-pointer hover:bg-red-400 hover:text-white hover:border-transparent transition-all w-full overflow-hidden"
      onClick={handleOnClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`${hovered ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
      >
        <div className="flex justify-between items-center text-black">
          <h1 className="text-start text-xl font-bold capitalize">
            {name} ({serving_size_g}g)
          </h1>
          <span className="text-black text-lg font-bold group-hover:text-white text-[#254D32]">
            {Math.round(calories)} Calories
          </span>
        </div>
        <div className="flex flex-row flex-wrap justify-end gap-2">
          <div className="text-sm font-bold capitalize bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-colors">
            {Math.round(protein_g)}g Protein
          </div>
          <div className="text-sm font-bold capitalize bg-orange-50 text-orange-600 px-2 py-1 rounded-md border border-orange-100 group-hover:bg-orange-600 group-hover:text-white group-hover:border-transparent transition-colors">
            {Math.round(carbohydrates_total_g)}g Carbs
          </div>
          <div className="text-sm font-bold capitalize bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-200 group-hover:bg-gray-700 group-hover:text-white group-hover:border-transparent transition-colors">
            {Math.round(fat_total_g)}g Fat
          </div>
          <div className="text-sm font-bold capitalize bg-purple-50 text-purple-600 px-2 py-1 rounded-md border border-purple-100 group-hover:bg-purple-600 group-hover:text-white group-hover:border-transparent transition-colors">
            {Math.round(sodium_mg)}mg Sodium
          </div>
          <div className="text-sm font-bold capitalize bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-transparent transition-colors">
            {Math.round(fiber_g)}g Fiber
          </div>
          <div className="text-sm font-bold capitalize bg-pink-50 text-pink-600 px-2 py-1 rounded-md border border-pink-100 group-hover:bg-pink-600 group-hover:text-white group-hover:border-transparent transition-colors">
            {Math.round(sugar_g)}g Sugar
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"}`}
      >
        <h1 className="text-xl font-bold capitalize text-white">
          CLICK TO REMOVE
        </h1>
      </div>
    </button>
  );
}
