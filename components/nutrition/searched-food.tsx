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
  calories,
  serving_size_g,
  fat_total_g,
  protein_g,
  sodium_mg,
  carbohydrates_total_g,
  fiber_g,
  sugar_g,
}: Props) {
  return (
    <button className="bg-white border-[#254D32] p-5 rounded-lg flex flex-col gap-3 border hover:cursor-pointer hover:bg-[#69B578] text-black hover:text-white hover:border-none">
      <h1 className="text-start text-xl font-bold capitalize">{name}</h1>
    </button>
  );
}
