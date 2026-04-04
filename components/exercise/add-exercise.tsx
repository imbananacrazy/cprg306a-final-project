interface Props {
  id: string;
}

export default function AddExercise({ id }: Props) {
  return (
    <div className="bg-[#111827] h-100 w-50 flex items-center justify-center text-white left-0">
      <h1 className="text-4xl font-bold">Add Exercise {id}</h1>
    </div>
  );
}
