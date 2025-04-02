import React from "react";
import clsx from "clsx";

interface SidebarFooterProps {
  profileImage?: string;
  nickname?: string;
  email?: string;
  onProfileClick: () => void;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({
  profileImage,
  nickname,
  email,
  onProfileClick,
}) => {
  return (
    <div className="w-full py-4 px-4 flex items-center gap-3 mt-auto">
      <div
        className={clsx(
          "w-14 h-14 rounded-full bg-gray-300 overflow-hidden border border-gray-400",
          profileImage && "bg-transparent"
        )}
      >
        {profileImage && (
          <img
            src={profileImage}
            alt="사용자 프로필"
            className="w-full h-full object-cover cursor-pointer"
            onClick={onProfileClick}
          />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-700">
          {nickname || "비회원"}
        </span>
        <span className="text-xs text-gray-500">
          {email || "로그인이 필요합니다."}
        </span>
      </div>
    </div>
  );
};

export default SidebarFooter;
