import { useState } from "react";
import { addMonths, subMonths } from "date-fns";

const useCalendar = (initialDate: Date) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const goToPrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const goToNextWeek = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };
  
  const goToPrevWeek = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());  // 오늘 날짜로 설정
  };

  return {
    currentDate,
    goToNextMonth,
    goToPrevMonth,
    goToNextWeek,
    goToPrevWeek,
    goToToday,
  };
};

// 현재 날짜 기준 주차적어주는 텍스트인데 추후에 필요하면 쓰기
export const getWeekLabel = (date: Date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const passedDays = date.getDate() + firstDay.getDay() - 1;
  const weekNumber = Math.floor(passedDays / 7) + 1;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return `${year}년 ${month}월 ${weekNumber}주차`;
};

export default useCalendar;