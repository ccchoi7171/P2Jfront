import React, { useState, useRef } from "react";
import DateBox from "./DateBox";

interface CalendarGridProps {
  currentMonth: number;
  currentYear: number;
  currentDate: number;
  mode: "calendar" | "timetable";
}

type DateInfo = {
  fullDate: Date;
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
};

const generateCalendarDates = (year: number, month: number): DateInfo[] => {
  const today = new Date();
  const firstDay = new Date(year, month, 1);
  const startDayOfWeek = firstDay.getDay();
  const startDate = new Date(year, month, 1 - startDayOfWeek);

  const dates: DateInfo[] = [];

  for (let i = 0; i < 42; i++) {
    const current = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);

    dates.push({
      fullDate: current,
      date: current.getDate(),
      isCurrentMonth: current.getMonth() === month,
      isToday:
        current.getFullYear() === today.getFullYear() &&
        current.getMonth() === today.getMonth() &&
        current.getDate() === today.getDate(),
    });
  }

  return dates;
};

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentMonth, currentYear }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const dates = generateCalendarDates(currentYear, currentMonth);

  return (
    <div
      className="relative flex-1 overflow-y-auto custom-scrollbar"
      ref={scrollRef}
    >
      <div className="w-full">
        {[0, 1, 2, 3, 4, 5].map((week) => (
          <div
            key={week}
            className="grid grid-cols-7 min-h-[120px] border-t border-gray-200"
          >
            {dates.slice(week * 7, week * 7 + 7).map((d, idx) => {
              let status: "default" | "hover" | "checked" | "differentMonth" = "default";

              if (!d.isCurrentMonth) status = "differentMonth";
              else if (selectedDate?.getTime() === d.fullDate.getTime()) status = "checked";
              else if (hoveredDate?.getTime() === d.fullDate.getTime()) status = "hover";

              return (
                <DateBox
                  key={idx}
                  date={d.date}
                  isToday={d.isToday}
                  status={status}
                  onClick={() => {
                    if (d.isCurrentMonth) setSelectedDate(d.fullDate);
                  }}
                  onMouseEnter={() => {
                    if (d.isCurrentMonth) setHoveredDate(d.fullDate);
                  }}
                  onMouseLeave={() => setHoveredDate(null)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
