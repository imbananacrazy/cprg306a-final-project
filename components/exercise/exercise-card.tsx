interface Props {
  id: string;
  name: string;
  bodyPart: string;
}

export default function ExerciseCard({ id, name, bodyPart }: Props) {
  return (
    <div className="bg-[#181d27] p-4 rounded-lg">
      <h3 className="text-2xl font-bold text-white">{name}</h3>
      <p className="text-gray-500">{bodyPart}</p>
    </div>
  );
}
