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
    <div className="min-h-screen bg-white flex items-center justify-center py-12">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-10 space-y-10 ring-2 ring-pink-300 ring-offset-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 drop-shadow-lg">
          Available Time Slots
        </h2>

        {error && (
          <div className="p-4 bg-red-200 text-red-800 rounded-lg shadow-md ring-2 ring-red-400">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {timeSlots.length > 0 ? (
            timeSlots.map((slot) => (
              <div
                key={slot.id}
                className="p-8 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 ring-1 ring-gray-300 ring-offset-4"
              >
                <div className="space-y-2">
                  <p className="text-lg text-gray-800 font-semibold">
                    <strong>Start Time:</strong> {slot.start_time}
                  </p>
                  <p className="text-lg text-gray-800 font-semibold">
                    <strong>End Time:</strong> {slot.end_time}
                  </p>
                  <p className="text-lg text-gray-800 font-semibold">
                    <strong>Timezone:</strong> {slot.timezone}
                  </p>
                </div>
                <div className="mt-6">
                  {slot.booked === 0 ? (
                    <button
                      onClick={() => handleBookSlot(slot.id)}
                      className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-lg shadow-xl hover:from-green-700 hover:to-green-900 transition-transform transform hover:scale-105"
                    >
                      Book Slot
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 bg-gray-400 text-white font-bold rounded-lg shadow-md cursor-not-allowed"
                    >
                      Slot Booked
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700 text-xl font-medium">
              No available slots at the moment. Please check back later!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guest;
