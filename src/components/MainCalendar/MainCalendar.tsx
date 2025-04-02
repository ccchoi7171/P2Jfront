import React, { useState } from "react";
import TopBar from "./TopBar";
import CalendarGrid from "./CalendarGrid";
import WeekdayHeader from "./WeekdayHeader";
import ModeSwitch from "./ModeSwitch";
import useCalendar, { getWeekLabel } from "./hooks/useCalendar";
import WeeklyTimetable from "./WeeklyTimetable";

const MainCalendar: React.FC = () => {
  const {
    currentDate,
    goToNextMonth,
    goToPrevMonth,
    goToNextWeek,
    goToPrevWeek,
    goToToday,
  } = useCalendar(new Date());
  const [mode, setMode] = useState<"calendar" | "timetable">("calendar");

  const handleModeChange = (newMode: "calendar" | "timetable") => {
    setMode(newMode);
  };

  const currentMonth = currentDate.toLocaleString("en-US", { month: "long" });
  const currentYear = currentDate.getFullYear();

  // 모드에 따라 동작 다르게 설정
  const handlePrev = () => {
    mode === "calendar" ? goToPrevMonth() : goToPrevWeek();
  };

  const handleNext = () => {
    mode === "calendar" ? goToNextMonth() : goToNextWeek();
  };

  return (
    <div className="flex flex-col justify-between w-full h-full overflow-hidden">
      {/* 상단 툴바 */}
      <TopBar
        month={currentMonth}
        year={currentYear}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={goToToday}
      />

      {/* 캘린더 or 시간표 */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {mode === "calendar" ? (
          <>
            <WeekdayHeader />
            <div className="flex flex-col w-full h-screen overflow-hidden">
              <CalendarGrid
                currentMonth={currentDate.getMonth()}
                currentYear={currentDate.getFullYear()}
                currentDate={currentDate.getDate()}
                mode={mode}
              />
            </div>
          </>
        ) : (
          <WeeklyTimetable currentDate={currentDate} />
        )}
      </div>

      {/* 하단 모드 스위치 */}
      <div className="flex justify-center items-center py-4">
        <ModeSwitch mode={mode} onModeChange={handleModeChange} />
      </div>
    </div>
  );
};

export default MainCalendar;
