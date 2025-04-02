import React from "react";

interface TodayButtonProps {
  onClick: () => void;
}

const TodayButton: React.FC<TodayButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-[60px] h-[40px] text-center border-2 border-[#444444] rounded-[10px] px-4 py-1 text-[20px] font-medium text-[#444]"
    >
      Today
    </button>
  );
};

export default TodayButton;
