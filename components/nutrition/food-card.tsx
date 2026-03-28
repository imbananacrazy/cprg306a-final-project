interface Props {
  id: string;
  name: string;
}

export default function FoodCard({ id, name }: Props) {
  return (
    <div className="bg-[#181d27] p-4 rounded-lg">
      <h1 className="text-2xl font-bold text-white">{name}</h1>
    </div>
  );
}
