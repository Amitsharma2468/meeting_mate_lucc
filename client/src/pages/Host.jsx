import React, { useState, useEffect } from "react";
import axios from "axios";

const Host = () => {
  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
    timeZone: "",
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setFormData((prevData) => ({
      ...prevData,
      timeZone: detectedTimeZone,
    }));

    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get("http://localhost:5000/guest/timeslots");
      setAvailableSlots(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch available slots.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateSlot = async () => {
    try {
      await axios.post("http://localhost:5000/host/timeslots", {
        start_time: formData.start_time,
        end_time: formData.end_time,
        timezone: formData.timeZone,
      });
      alert("Slot created successfully!");
      fetchAvailableSlots();
    } catch (error) {
      console.error(error);
      alert("Failed to create slot.");
    }
  };

  const handleUpdateSlot = async () => {
    if (!selectedSlot) {
      alert("No slot selected for update");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/host/timeslots/${selectedSlot.id}`,
        {
          start_time: formData.start_time,
          end_time: formData.end_time,
          timezone: formData.timeZone,
        }
      );
      alert("Slot updated successfully!");
      fetchAvailableSlots();
    } catch (error) {
      console.error(error);
      alert("Failed to update slot.");
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      await axios.delete(`http://localhost:5000/host/timeslots/${slotId}`);
      alert("Slot deleted successfully!");
      fetchAvailableSlots();
    } catch (error) {
      console.error(error);
      alert("Failed to delete slot.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center py-12">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-8 space-y-10">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          MEETING SCHEDULE
        </h2>

        {/* Create Slot Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">Create a Slot</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="start_time" className="block text-gray-700">
                Start Time
              </label>
              <input
                type="datetime-local"
                name="start_time"
                value={formData.start_time}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="end_time" className="block text-gray-700">
                End Time
              </label>
              <input
                type="datetime-local"
                name="end_time"
                value={formData.end_time}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="timeZone" className="block text-gray-700">
              Time Zone
            </label>
            <input
              type="text"
              name="timeZone"
              value={formData.timeZone}
              readOnly
              className="w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-100"
            />
          </div>
          <button
            onClick={handleCreateSlot}
            className="w-full py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
          >
            Create Slot
          </button>
        </div>

        {/* Available Slots Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Available Slots
          </h3>
          {availableSlots.length > 0 ? (
            <ul className="space-y-6">
              {availableSlots.map((slot) => (
                <li
                  key={slot.id}
                  className="flex justify-between items-center p-6 bg-gray-50 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <div>
                    <p className="text-gray-800">
                      <strong>Start:</strong>{" "}
                      {new Date(slot.start_time).toLocaleString()}
                    </p>
                    <p className="text-gray-800">
                      <strong>End:</strong>{" "}
                      {new Date(slot.end_time).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setSelectedSlot(slot);
                        setFormData({
                          start_time: slot.start_time,
                          end_time: slot.end_time,
                          timeZone: formData.timeZone,
                        });
                      }}
                      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 shadow"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 shadow"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">
              No available slots found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Host;



