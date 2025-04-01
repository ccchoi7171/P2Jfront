import React from "react";
import clsx from "clsx";

interface SidebarTabProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}

const SidebarTab: React.FC<SidebarTabProps> = ({
  icon,
  label,
  active,
  isCollapsed,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center transition-all px-3 py-2 rounded-[10px] text-[15px] font-regular",
        isCollapsed ? "w-[40px] justify-center" : "w-full gap-2 justify-start",
        active
          ? "bg-[#C69788] text-white"
          : "bg-white text-[#444444] hover:bg-[#EFEFEF] active:bg-[#C69788]"
      )}
    >
      <span className="text-lg">{icon}</span>
      {!isCollapsed && <span className="truncate">{label}</span>}
    </button>
  );
};

export default SidebarTab;
