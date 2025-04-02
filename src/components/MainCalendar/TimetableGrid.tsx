import React, { useEffect, useRef, useState } from "react";

const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
const hourHeight = 48;

const TimetableGrid: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [topOffset, setTopOffset] = useState(0);

  // 현재 시간 기준 top 위치 계산 함수
  const calculateTopOffset = () => {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    return hour * hourHeight + (minutes / 60) * hourHeight;
  };

  useEffect(() => {
    // 초기 top 위치 설정
    setTopOffset(calculateTopOffset());

    // 1분마다 top 위치 갱신
    const interval = setInterval(() => {
      setTopOffset(calculateTopOffset());
    }, 60 * 1000);

    // 클린업
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex-1 overflow-y-scroll custom-scrollbar" ref={scrollRef}>
      {/* 현재 시간 빨간 줄 */}
      <div
        className="absolute left-0 right-0 h-[1px] bg-red-500 z-20"
        style={{ top: `${topOffset}px` }}
      >
        <div className="absolute right-1 -top-2 bg-red-500 text-white text-[11px] px-2 py-[1px] rounded-full shadow-sm">
            {new Date().toTimeString().slice(0, 5)} {/* ex. 13:24 */}
        </div>
      </div>


      {hours.map((hour, rowIdx) => (
        <div key={rowIdx} className="grid grid-cols-7 h-[48px] border-t border-[#E0E0E0] text-sm">
          {Array.from({ length: 7 }).map((_, colIdx) => (
            <div
              key={colIdx}
              className="border-l border-[#E0E0E0] px-1 py-1 relative"
            >
              {colIdx === 0 && (
                <span className="absolute left-1 top-1 text-[#A0A0A0] text-[12px]">
                  {hour}
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TimetableGrid;