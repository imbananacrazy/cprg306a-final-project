import { useState } from "react";
import DayButton from "../day-button";

interface Props {
  name: string;
  difficulty: string;
  handleOnClick: (name: string, difficulty: string, day: string) => void;
}

export default function SearchedExercise({
  name,
  difficulty,
  handleOnClick,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={`relative w-full border-[#254D32] rounded-lg flex flex-col border transition-all duration-200 text-black overflow-hidden ${
        clicked ? "max-h-[800px] bg-white" : "max-h-[120px]"
      } ${hovered && !clicked ? "bg-[#69B578]" : "bg-white"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setClicked(false);
      }}
    >
      <div
        className="p-5 w-full transition-all cursor-pointer"
        onClick={() => setClicked(!clicked)}
      >
        <div
          className={`flex flex-col gap-4 transition-all duration-200 ${
            hovered && !clicked ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex justify-between items-start w-full">
            <h1
              className={`text-start text-xl font-bold capitalize transition-colors ${
                hovered && !clicked ? "text-white" : "text-black"
              }`}
            >
              {name}
            </h1>
          </div>

          <div className="flex flex-row justify-end gap-2 flex-wrap mt-auto">
            <div
              className={`text-xs font-bold capitalize px-2 py-1 rounded-md border transition-colors ${
                hovered && !clicked
                  ? "bg-white/20 text-white border-white/30"
                  : "bg-blue-50 text-blue-600 border-blue-100"
              }`}
            >
              {difficulty}
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-200 pointer-events-none ${
            hovered && !clicked ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-xl font-bold capitalize text-white text-center px-4">
            CLICK TO ADD TO A DAY
          </h1>
        </div>
      </div>

      <div
        className={`flex flex-col gap-2 p-4 transition-colors duration-200 ${
          clicked ? "bg-white border-t border-gray-100" : "bg-transparent"
        }`}
      >
        <div className="flex flex-col gap-2">
          <DayButton
            day="Monday"
            click={() => handleOnClick(name, difficulty, "monday")}
          />
          <DayButton
            day="Tuesday"
            click={() => handleOnClick(name, difficulty, "tuesday")}
          />
          <DayButton
            day="Wednesday"
            click={() => handleOnClick(name, difficulty, "wednesday")}
          />
          <DayButton
            day="Thursday"
            click={() => handleOnClick(name, difficulty, "thursday")}
          />
          <DayButton
            day="Friday"
            click={() => handleOnClick(name, difficulty, "friday")}
          />
          <DayButton
            day="Saturday"
            click={() => handleOnClick(name, difficulty, "saturday")}
          />
          <DayButton
            day="Sunday"
            click={() => handleOnClick(name, difficulty, "sunday")}
          />
        </div>
      </div>
    </div>
  );
}
