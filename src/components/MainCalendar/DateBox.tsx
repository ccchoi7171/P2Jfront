import React from "react";
import clsx from "clsx";

type DateBoxStatus = "default" | "hover" | "checked" | "differentMonth";

interface DateBoxProps {
  date: number;
  status?: DateBoxStatus;
  isToday?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const DateBox: React.FC<DateBoxProps> = ({ date, status = "default", isToday, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx(
        "relative w-full h-full min-w-[48px] min-h-[60px] border border-[#DEDEDE] cursor-pointer p-1",
        {
          "bg-white": status === "default",
          "bg-[#F1F1F1]": status === "hover",
          "bg-[#EDD4CD]": status === "checked",
          "bg-[#F3EBEB]": status === "differentMonth",
        }
      )}
    >
      <span className={clsx("flex justify-center items-center text-[15px] font-light text-[#2E2E2E] leading-none",
      isToday
        ? "bg-[#C69788] text-white rounded-full px-2 py-[2px]"
        : "text-[#2E2E2E]")}
        >
        {date.toString().padStart(2, "0")}
      </span>
    </div>
  );
};

export default DateBox;
