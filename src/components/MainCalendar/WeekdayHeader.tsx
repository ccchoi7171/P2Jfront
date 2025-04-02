import React from "react";

const days = [
  { label: "SUN", color: "text-[#BF5555]" },
  { label: "MON", color: "text-[#747474]" },
  { label: "TUE", color: "text-[#747474]" },
  { label: "WED", color: "text-[#747474]" },
  { label: "THU", color: "text-[#747474]" },
  { label: "FRI", color: "text-[#747474]" },
  { label: "SAT", color: "text-[#3D87D8]" },
];

const WeekDays: React.FC = () => {
  return (
    <div className="flex w-full h-6 border-b border-black">
      {days.map((day, index) => (
        <div
          key={index}
          className={`flex-1 basis-0 flex justify-center items-center h-full font-bold text-[15px] ${day.color}`}
        >
          {day.label}
        </div>
      ))}
    </div>
  );
};

export default WeekDays;
