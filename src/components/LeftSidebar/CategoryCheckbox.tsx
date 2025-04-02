import React, { useState } from "react";
import clsx from "clsx";

interface CategoryCheckboxProps {
  label: string;
  color: string; // 예: "#FF4D49"
  checked: boolean;
  onChange: () => void;
}

const darkenColor = (hex: string, factor = 0.85) => {
  let c = hex.replace("#", "");
  let r = Math.floor(parseInt(c.slice(0, 2), 16) * factor);
  let g = Math.floor(parseInt(c.slice(2, 4), 16) * factor);
  let b = Math.floor(parseInt(c.slice(4, 6), 16) * factor);
  return `rgb(${r}, ${g}, ${b})`;
};

const CategoryCheckbox: React.FC<CategoryCheckboxProps> = ({
  label,
  color,
  checked,
  onChange,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <label
      className="flex items-center gap-2 px-2 py-1 cursor-pointer select-none"
      onClick={onChange}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={clsx(
          "w-[20px] h-[20px] border-[3px] border-[#444] rounded-sm transform rotate-90 flex items-center justify-center",
          !checked && (hovered ? "bg-[#E5E5E5]" : "bg-white")
        )}
      >
        {checked && (
          <div
            className="w-[12px] h-[12px] rounded-sm shadow-inner"
            style={{
              backgroundColor: hovered
                ? darkenColor(color)
                : color,
            }}
          />
        )}
      </div>
      <span className="text-[14px] text-[#444444] font-regular">{label}</span>
    </label>
  );
};

export default CategoryCheckbox;
