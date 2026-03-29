interface Props {
  name: string;
  targetMuscles: string[];
  equipment: string[];
}

export default function SearchedExercise({
  name,
  targetMuscles,
  equipment,
}: Props) {
  return (
    <button className="group w-full bg-white border-[#254D32] p-5 rounded-lg flex flex-col gap-4 border transition-all hover:cursor-pointer hover:bg-[#69B578] text-black hover:text-white hover:border-transparent active:scale-[0.99]">
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
    </button>
  );
}
