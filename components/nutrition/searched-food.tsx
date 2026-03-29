interface Props {
  name: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  protein_g: number;
  sodium_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
}

export default function SearchedFood({
  name,
  serving_size_g,
  calories,
  protein_g,
  fat_total_g,
  carbohydrates_total_g,
}: Props) {
  return (
    <button className="group bg-white border-[#254D32] p-5 rounded-lg flex flex-col gap-3 border hover:cursor-pointer hover:bg-[#69B578] text-black hover:text-white hover:border-transparent transition-all w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-start text-xl font-bold capitalize">
          {name} ({serving_size_g}g)
        </h1>
        <span className="text-black text-lg font-bold group-hover:text-white text-[#254D32]">
          {Math.round(calories)} Calories
        </span>
      </div>

      {/* Tag Container (Matches the Exercise layout) */}
      <div className="flex flex-row flex-wrap justify-end gap-2">
        {/* Protein Tag */}
        <div className="text-sm font-bold capitalize bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent">
          {protein_g.toFixed(1)}g Protein
        </div>

        {/* Carbs Tag */}
        <div className="text-sm font-bold capitalize bg-orange-50 text-orange-600 px-2 py-1 rounded-md border border-orange-100 group-hover:bg-orange-600 group-hover:text-white group-hover:border-transparent">
          {carbohydrates_total_g.toFixed(1)}g Carbs
        </div>

        {/* Fat Tag */}
        <div className="text-sm font-bold capitalize bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-200 group-hover:bg-gray-700 group-hover:text-white group-hover:border-transparent">
          {fat_total_g.toFixed(1)}g Fat
        </div>
      </div>
    </button>
  );
}
