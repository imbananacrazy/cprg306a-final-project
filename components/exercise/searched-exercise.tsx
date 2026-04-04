import { useState } from "react";

interface Props {
  id: string;
  name: string;
  targetMuscles: string[];
  equipment: string[];
  handleOnClick: () => void;
}

export default function SearchedExercise({
  id,
  name,
  targetMuscles,
  equipment,
  handleOnClick,
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="group relative w-full bg-white border-[#254D32] p-5 rounded-lg flex flex-col gap-4 border transition-all hover:cursor-pointer hover:bg-[#69B578] text-black hover:text-white hover:border-transparent active:scale-[0.99] overflow-hidden"
      onClick={handleOnClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`${hovered ? "opacity-0" : "opacity-100"} transition-opacity duration-200 w-full flex flex-col gap-4`}
      >
        <div className="flex justify-between items-start w-full">
          <h1 className="text-start text-xl font-bold capitalize group-hover:text-white transition-colors">
            {name}
          </h1>
        </div>

        <div className="flex flex-row justify-end gap-2 flex-wrap mt-auto">
          {targetMuscles.map((muscle) => (
            <div
              key={muscle}
              className="text-xs font-bold capitalize bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-400 transition-all"
            >
              {muscle}
            </div>
          ))}

          {equipment.map((item) => (
            <div
              key={item}
              className="text-xs font-bold capitalize bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-200 group-hover:bg-gray-700 group-hover:text-white group-hover:border-gray-600 transition-all"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"}`}
      >
        <h1 className="text-xl font-bold capitalize text-white">
          CLICK TO ADD
        </h1>
      </div>
    </button>
  );
}
