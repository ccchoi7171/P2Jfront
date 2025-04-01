import React, { useState } from "react";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import MainCalendar from "../components/MainCalendar/MainCalendar";

const CalendarPage: React.FC<{
  user: { profileImage?: string; nickname: string; email: string };
}> = ({ user }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // 사이드바 상태

  return (
    <div className="flex h-screen w-full">
      {/* 좌측 사이드바 */}
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "w-[80px]" : "w-[320px]"
        }`}
      >
        <LeftSidebar
          user={user}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* 우측 메인 캘린더 */}
      <div className="flex-1 overflow-auto">
        <MainCalendar />
      </div>
    </div>
  );
};

export default CalendarPage;
