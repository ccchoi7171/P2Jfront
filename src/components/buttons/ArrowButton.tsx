import React from "react";
import { ChevronLeft } from "lucide-react";

interface ArrowButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 flex justify-center items-center ${direction === "prev" ? "rotate-180" : ""}`}
    >
      <ChevronLeft className="w-5 h-5 text-[#444]" />
    </button>
  );
};

export default ArrowButton;
