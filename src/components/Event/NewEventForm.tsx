import React from "react";
import { useEventForm } from "./useEventForm";

const NewEventForm = ({ onSubmit }) => {
  const { eventData, handleInputChange, handleSubmit } = useEventForm(
    {
      title: "",
      startDate: "",
      endDate: "",
      eventCategory: "",
      location: "",
      description: "",
    },
    onSubmit
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md"
    >
      <div className="mb-4">
        <label className="block text-lg font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter Title"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium">Category</label>
        <select
          name="eventCategory"
          value={eventData.eventCategory}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Select Category</option>
          <option value="빨강">Red</option>
          <option value="주황">Orange</option>
          <option value="노랑">Yellow</option>
          <option value="초록">Green</option>
          <option value="파랑">Blue</option>
          <option value="보라">Purple</option>
          <option value="회색">Gray</option>
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
          placeholder="Enter Location"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium">Description</label>
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter Description"
        />
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
