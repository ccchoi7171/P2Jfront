import React, { useState } from "react";
import TopBar from "./TopBar";
import CalendarGrid from "./CalendarGrid";
import WeekdayHeader from "./WeekdayHeader";
import ModeSwitch from "./ModeSwitch";
import useCalendar from "./hooks/useCalendar";

const MainCalendar: React.FC = () => {
  const { currentDate, goToNextMonth, goToPrevMonth, goToToday } = useCalendar(new Date());
  const [mode, setMode] = useState<"calendar" | "timetable">("calendar");

  const handleModeChange = (newMode: "calendar" | "timetable") => {
    setMode(newMode);
  };

  const currentMonth = currentDate.toLocaleString("en-US", { month: "long" });
  const currentYear = currentDate.getFullYear();

  return (
    <div className="flex flex-col justify-between w-full h-full overflow-hidden">
      {/* 상단 툴바 */}
      <TopBar
        month={currentMonth}
        year={currentYear}
        onPrev={goToPrevMonth}
        onNext={goToNextMonth}
        onToday={goToToday}
      />

      {/* 캘린더 영역 */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <WeekdayHeader />
        <div className="flex-1 min-h-[360px] overflow-auto">
          <CalendarGrid
            currentMonth={currentDate.getMonth()}
            currentYear={currentDate.getFullYear()}
            currentDate={currentDate.getDate()}
            mode={mode}
          />
        </div>
      </div>

      {/* 하단 모드 스위치 */}
      <div className="flex justify-center items-center py-4">
        <ModeSwitch mode={mode} onModeChange={handleModeChange} />
      </div>
    </div>
  );
};

export default MainCalendar;