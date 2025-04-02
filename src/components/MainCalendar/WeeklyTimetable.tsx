import React from "react";
import WeekdayHeader from "./WeekdayHeader";
import WeekDateHeader from "./WeekDateHeader";
import TimetableGrid from "./TimetableGrid";

interface WeeklyTimetableProps {
  currentDate: Date;
}

const WeeklyTimetable: React.FC<WeeklyTimetableProps> = ({ currentDate }) => {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  const weekDates = Array.from({ length: 7 }, (_, i) =>
    new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i)
  );

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="sticky top-0 z-10 bg-white">
        <WeekdayHeader />
        <WeekDateHeader
            weekDates={weekDates}
            currentMonth={currentDate.getMonth()} // 현재 달 넘겨줌
        />
      </div>
      <TimetableGrid />
    </div>
  );
};

export default WeeklyTimetable;