import { useState } from "react";

//api provides the name, the target muscle, instructions, and the difficulty of the exercise.
//we are only taking the name and difficulty. this card will be shown in the "Manage Exercises" page.
interface Props {
  name: string;
  difficulty: string;
}

export default function ExerciseCard({ name, difficulty }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="group relative w-full bg-white border-[#254D32] p-5 rounded-lg flex flex-col gap-4 border transition-all hover:cursor-pointer hover:bg-red-400 text-black hover:border-transparent active:scale-[0.99] overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`${
          hovered ? "opacity-0" : "opacity-100"
        } transition-opacity duration-200 w-full`}
      >
        <div className="flex justify-between items-start w-full">
          <h1 className="text-start text-xl font-bold capitalize transition-colors">
            {name}
          </h1>
        </div>

        <div className="flex flex-row justify-end gap-2 flex-wrap mt-auto">
          <div className="text-xs font-bold capitalize bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all">
            {difficulty}
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 pointer-events-none ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-xl font-bold capitalize text-white">
          CLICK TO REMOVE
        </h1>
      </div>
    </button>
  );
}
