import React, { useState, useEffect } from "react";
import axios from "axios";

const Guest = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [error, setError] = useState(null);

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

  const handleBookSlot = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/guest/book/${id}`);
      if (response.data.message === "Time slot booked successfully") {
        setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
      }
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      setError("Error booking time slot.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center py-12">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-8 space-y-8">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          Available Time Slots
        </h2>

        {error && (
          <div className="p-4 bg-red-100 text-red-600 rounded-lg shadow">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {timeSlots.length > 0 ? (
            timeSlots.map((slot) => (
              <div
                key={slot.id}
                className="p-6 bg-gray-50 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="space-y-2">
                  <p className="text-xl text-gray-800">
                    <strong>Start Time:</strong> {slot.start_time}
                  </p>
                  <p className="text-xl text-gray-800">
                    <strong>End Time:</strong> {slot.end_time}
                  </p>
                  <p className="text-xl text-gray-800">
                    <strong>Timezone:</strong> {slot.timezone}
                  </p>
                </div>
                <div className="mt-4">
                  {slot.booked === 0 ? (
                    <button
                      onClick={() => handleBookSlot(slot.id)}
                      className="w-full py-3 bg-green-700 text-white rounded-lg shadow-lg hover:bg-green-900 transition duration-300"
                    >
                      Book Slot
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 bg-gray-400 text-white rounded-lg shadow-lg"
                    >
                      Slot Booked
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700 text-lg">
              No available slots at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guest;

