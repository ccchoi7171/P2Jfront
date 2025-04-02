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

  const goToToday = () => {
    setCurrentDate(new Date());  // 오늘 날짜로 설정
  };

  return {
    currentDate,
    goToNextMonth,
    goToPrevMonth,
    goToToday
  };
};

export default useCalendar;
