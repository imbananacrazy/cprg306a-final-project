interface Props {
  day: string;
  click: () => void;
}

//component to display each day of the week after clicking an exercise on the "Search" page
export default function DayButton({ day, click }: Props) {
  return (
    <div
      className={`bg-white rounded-xl border-[#254D32] border-3 h-5 w-full p-10 flex items-center justify-center transition-all duration-200 hover:cursor-pointer hover:bg-[#69B578] hover:border-none hover:text-white`}
      onClick={click}
    >
      <h1 className={`font-black`}>{day}</h1>
    </div>
  );
}
