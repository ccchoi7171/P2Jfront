import React from "react";
import clsx from "clsx";

type Mode = "calendar" | "timetable";

interface ModeSwitchProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

const ModeSwitch: React.FC<ModeSwitchProps> = ({ mode, onModeChange }) => {
  return (
    <div className="flex justify-center items-center w-[200px] h-8 self-center relative">
      {/* 캘린더 모드 */}
      <button
        className={clsx(
          "w-1/2 h-full rounded-[10px] font-medium text-[15px]",
          mode === "calendar"
            ? "bg-[#C69788] text-white"
            : "bg-transparent text-[#444444]"
        )}
        onClick={() => onModeChange("calendar")}
      >
        Calendar
      </button>

      {/* 시간표 모드 */}
      <button
        className={clsx(
          "w-1/2 h-full rounded-[10px] font-medium text-[15px]",
          mode === "timetable"
            ? "bg-[#C69788] text-white"
            : "bg-transparent text-[#444444]"
        )}
        onClick={() => onModeChange("timetable")}
      >
        Timetable
      </button>
    </div>
  );
};

export default ModeSwitch;
