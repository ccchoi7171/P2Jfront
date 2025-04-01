import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx"; // clsx 추가
import useCalendar from "./hooks/useCalendar"; // useCalendar 훅을 가져옴

interface TopBarProps {
  year: number;
  month: string;  // month는 이제 string 타입
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ year, month, onPrev, onNext, onToday }) => {
  return (
    <div className="flex justify-between items-end w-full h-[95px] border-b border-[#929297] px-8">
      {/* 날짜 (년.월) */}
      <div className="h-1 flex items-center gap-1 pb-7">
        <span className="text-[35px] font-semibold text-[#E05054]">{month}</span>
        <span className="text-[35px] font-semibold text-[#E05054]">.</span>
        <span className="text-[35px] font-semibold text-[#E05054]">{year}</span>
      </div>

      {/* 툴 버튼 */}
      <div className="flex items-center gap-1 pb-2">
        <button
          onClick={onPrev}
          className={clsx(
            "w-8 h-8 flex justify-center items-center",
            "hover:bg-[#F1F1F1] active:bg-[#E0E0E0]" // hover, active 추가
          )}
        >
          <ChevronLeft className="w-5 h-5 text-[#444]" />
        </button>
        <button
          onClick={onNext}
          className={clsx(
            "w-8 h-8 flex justify-center items-center rotate-180",
            "hover:bg-[#F1F1F1] active:bg-[#E0E0E0]" // hover, active 추가
          )}
        >
          <ChevronLeft className="w-5 h-5 text-[#444]" />
        </button>
        <button
          onClick={onToday}
          className={clsx(
            "border-2 border-[#444] rounded-[10px] px-4 py-1 text-[15px] font-medium text-[#444]",
            "hover:bg-[#F1F1F1] active:bg-[#E0E0E0]" // hover, active 추가
          )}
        >
          Today
        </button>
      </div>
    </div>
  );
};

export default TopBar;
