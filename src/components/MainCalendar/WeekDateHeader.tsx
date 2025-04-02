import React from "react";
import clsx from "clsx";

interface WeekDateHeaderProps {
  weekDates: Date[];
  currentMonth: number; // 0-based (0 = January)
}

const WeekDateHeader: React.FC<WeekDateHeaderProps> = ({
  weekDates,
  currentMonth,
}) => {
  const today = new Date();

  return (
    <div className="grid grid-cols-7 h-6 border-b border-[#DEDEDE] text-[14px] font-light bg-white">
      {weekDates.map((date, idx) => {
        const isCurrentMonth = date.getMonth() === currentMonth;

        const isToday =
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear();

        return (
          <div key={idx} className="flex justify-center items-center w-full">
            <span
              className={clsx(
                "inline-flex justify-center items-center text-[13px] leading-none w-full max-w-[32px]",
                isToday
                  ? "bg-[#C69788] text-white rounded-full px-2 py-[2px]"
                  : isCurrentMonth
                    ? "text-[#2E2E2E]"
                    : "text-[#C0C0C0]"
              )}
            >
              {date.getDate().toString().padStart(2, "0")}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default WeekDateHeader;
