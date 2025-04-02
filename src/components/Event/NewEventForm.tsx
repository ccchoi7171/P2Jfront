import React, { useState } from "react";

const NewEventForm = ({ onSubmit }) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    eventCategory: "",
    location: "",
    isAllDay: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData({
      ...eventData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventData.eventCategory) {
      alert("카테고리를 선택해주세요.");
      return;
    }
    onSubmit(eventData); // 상위 컴포넌트로 데이터 전달
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md"
    >
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-lg"
          placeholder="제목을 입력하세요"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">
          Start Date/Time
        </label>
        <input
          type="datetime-local"
          name="startDateTime"
          value={eventData.startDate}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">
          End Date/Time
        </label>
        <input
          type="datetime-local"
          name="endDateTime"
          value={eventData.endDate}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          value={eventData.eventCategory}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-lg"
          required
        >
          <option value="">카테고리를 선택하세요</option>
          <option value="빨강">빨강</option>
          <option value="초록">초록</option>
          <option value="파랑">파랑</option>
          <option value="노랑">노랑</option>
          <option value="주황">주황</option>
          <option value="보라">보라</option>
          <option value="회색">회색</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={eventData.location}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-lg"
          placeholder="장소를 입력하세요"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-lg"
          placeholder="설명을 입력하세요"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="isAllDay"
          checked={eventData.isAllDay}
          onChange={handleInputChange}
          className="mr-2 h-5 w-5 text-blue-500 focus:ring focus:ring-blue-200"
        />
        <label className="text-lg font-medium text-gray-700">All Day</label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white text-lg py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Create Event
      </button>
    </form>
  );
};

export default NewEventForm;
