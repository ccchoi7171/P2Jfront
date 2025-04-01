import React, { useState } from "react";
import DateBox from "./DateBox";

interface CalendarGridProps {
  currentMonth: number; // 0-based (0 = January)
  currentYear: number;
  currentDate: number;
  mode: "calendar" | "timetable"; // 모드에 따른 달력 상태 변경
}

// ✅ 1. 타입 선언을 따로 해줘야 TypeScript가 추론 가능
type DateInfo = {
  fullDate: Date;
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
};


// ✅ 정확한 달력 날짜 생성 함수
const generateCalendarDates = (year: number, month: number): DateInfo[] => {

  const today = new Date();

  // 1일의 요일 (0: 일요일 ~ 6: 토요일)
  const firstDay = new Date(year, month, 1);
  const startDayOfWeek = firstDay.getDay();

  // 시작일은 이전 달부터 시작될 수 있음
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

  const dates = generateCalendarDates(currentYear, currentMonth);

  return (
    <div className="grid grid-rows-6 flex-1 h-full w-full">
      {[0, 1, 2, 3, 4, 5].map((week) => (
        <div key={week} className="grid grid-cols-7 min-h-[60px]">
          {dates.slice(week * 7, week * 7 + 7).map((d, idx) => {
            let status: "default" | "hover" | "checked" | "differentMonth" = "default";

            if (!d.isCurrentMonth) {
              status = "differentMonth";
            } else if (selectedDate?.getTime() === d.fullDate.getTime()) {
              status = "checked";
            } else if (hoveredDate?.getTime() === d.fullDate.getTime()) {
              status = "hover";
            }

            return (
              <DateBox
                key={idx}
                date={d.date}
                isToday={d.isToday}
                status={status}
                onClick={() => {
                  if (d.isCurrentMonth) {
                    setSelectedDate(d.fullDate);
                  }
                }}
                onMouseEnter={() => {
                  if (d.isCurrentMonth) {
                    setHoveredDate(d.fullDate);
                  }
                }}
                onMouseLeave={() => setHoveredDate(null)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;
