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
    <button className="bg-white border-[#254D32] p-5 rounded-lg flex flex-col gap-3 border hover:cursor-pointer hover:bg-[#69B578] text-black hover:text-white hover:border-none">
      <h1 className="text-start text-xl font-bold capitalize">{name}</h1>

      <div className="flex flex-row justify-end gap-2">
        {targetMuscles.map((muscle) => (
          <div
            key={muscle}
            className="text-sm font-bold capitalize bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100"
          >
            {muscle}
          </div>
        ))}

        {equipment.map((item) => (
          <div
            key={item}
            className="text-sm font-bold capitalize bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-200"
          >
            {item}
          </div>
        ))}
      </div>
    </button>
  );
}
