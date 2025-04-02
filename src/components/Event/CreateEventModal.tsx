import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface EventData {
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  eventCategory: string;
  location: string;
  description: string;
}

interface CreateEventModalProps {
  onClose: () => void; // 모달을 닫는 함수
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ onClose }) => {
  const [eventData, setEventData] = useState<EventData>({
    title: "",
    startDate: null,
    endDate: null,
    eventCategory: "빨강", // 기본값 설정
    location: "",
    description: "",
  });

  const [isTimeEnabled, setIsTimeEnabled] = useState(true); // 시간 설정 여부 상태

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleStartDateTimeChange = (date: Date | null) => {
    setEventData({ ...eventData, startDate: date });
  };

  const handleEndDateTimeChange = (date: Date | null) => {
    setEventData({ ...eventData, endDate: date });
  };

  const handleTimeToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTimeEnabled(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventData.eventCategory) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    try {
      const response = await fetch("/api/members/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData), // eventData를 JSON으로 변환하여 전송
      });

      if (response.ok) {
        // 성공 처리
        console.log("Event created successfully!");
        onClose();
      } else {
        // 에러 처리
        console.error("Failed to create event:", response.status);
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="modal-overlay fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold"></h2>
          <button onClick={onClose} className="text-xl text-gray-500">
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium"></label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
              className="w-full p-2 border-0 border-b-2 border-gray-800 focus:outline-none focus:border-blue-500 text-3xl"
              placeholder="제목을 입력하세요"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Date and Time */}
            <div className="mb-4">
              <label className="block text-lg font-medium">
                Start Date and Time
              </label>
              <DatePicker
                selected={eventData.startDate}
                onChange={handleStartDateTimeChange}
                showTimeSelect={isTimeEnabled} // 조건부 시간 설정
                dateFormat={isTimeEnabled ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholderText="Start Date and Time"
              />
            </div>

            {/* End Date and Time */}
            <div className="mb-4">
              <label className="block text-lg font-medium">
                End Date and Time
              </label>
              <DatePicker
                selected={eventData.endDate}
                onChange={handleEndDateTimeChange}
                showTimeSelect={isTimeEnabled} // 조건부 시간 설정
                dateFormat={isTimeEnabled ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholderText="End Date and Time"
              />
            </div>
          </div>
          {/* Time Toggle Checkbox */}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={isTimeEnabled}
                onChange={handleTimeToggleChange}
              />
              <span className="ml-2 text-gray-700">시간 설정</span>
            </label>
          </div>

          {/* Category Select */}
          <div className="mb-4">
            <label className="block text-lg font-medium">Category</label>
            <select
              name="category"
              value={eventData.eventCategory}
              onChange={handleInputChange}
              className="max-w-64 w-32 p-2 border border-gray-300 rounded-md"
            >
              <option value="빨강">빨강</option>
              <option value="주황">주황</option>
              <option value="노랑">노랑</option>
              <option value="초록">초록</option>
              <option value="파랑">파랑</option>
              <option value="보라">보라</option>
              <option value="회색">회색</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          {/* NewEventForm 컴포넌트 제거 */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="w-[120px] h-[36px] border-2 border-[#444444] rounded-lg text-[#444444] text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-[120px] h-[36px] border-2 border-[#444444] rounded-lg text-[#444444] text-sm font-semibold"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
