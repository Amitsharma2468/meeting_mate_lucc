import React, { useState, useEffect } from "react";
import axios from "axios";

const Guest = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [error, setError] = useState(null);

  // Fetch available time slots when the component is mounted
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get("http://localhost:5000/guest/timeslots");
        setTimeSlots(response.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching available time slots.");
      }
    };

    fetchAvailableSlots();
  }, []);

  // Handle booking a time slot
  const handleBookSlot = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/guest/book/${id}`);
      if (response.data.message === "Time slot booked successfully") {
        // After successful booking, remove the booked slot from the list
        setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
      }
      alert(response.data.message); // Show booking success message
    } catch (err) {
      console.error(err);
      setError("Error booking time slot.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Available Time Slots</h2>

        {/* Display error message if any */}
        {error && <div className="text-red-600">{error}</div>}

        {/* List available slots */}
        <div className="space-y-4">
          {timeSlots.length > 0 ? (
            timeSlots.map((slot) => (
              <div key={slot.id} className="border p-4 rounded-lg">
                <div>
                  <p className="text-lg font-semibold text-gray-800">Start Time: {slot.start_time}</p>
                  <p className="text-lg font-semibold text-gray-800">End Time: {slot.end_time}</p>
                  <p className="text-lg font-semibold text-gray-800">Timezone: {slot.timezone}</p>
                </div>
                <div className="mt-4">
                  {slot.booked === 0 ? (
                    <button
                      onClick={() => handleBookSlot(slot.id)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg"
                    >
                      Book Slot
                    </button>
                  ) : (
                    <button className="w-full bg-gray-400 text-white py-2 rounded-lg" disabled>
                      Slot Booked
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No available slots at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guest;
