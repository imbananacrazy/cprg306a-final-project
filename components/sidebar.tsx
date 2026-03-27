export default function Sidebar() {
  return (
    <div className="bg-[#181d27] h-screen w-70 left-0">
      <div className="flex justify-center font-bold text-white text-[26px] pt-10 mb-10">
        <h1>Healthmax Tracking</h1>
      </div>
      <div className="flex flex-col gap-3 items-center h-full">
        <button className="bg-[#254D32] text-white font-bold w-60 h-12 rounded-lg hover:cursor-pointer hover:bg-[#69B578]">
          Dashboard
        </button>
        <button className="bg-[#254D32] text-white font-bold w-60 h-12 rounded-lg hover:cursor-pointer hover:bg-[#69B578]">
          Nutrition
        </button>
        <button className="bg-[#254D32] text-white font-bold w-60 h-12 rounded-lg hover:cursor-pointer hover:bg-[#69B578]">
          Exercise
        </button>
        <button className="bottom-0 bg-[#254D32] text-white font-bold w-60 h-12 rounded-lg hover:cursor-pointer hover:bg-[#69B578]">
          Sign Out
        </button>
      </div>
    </div>
  );
}
