import React, { useState, useEffect } from "react";
import axios from "axios";

const Host = () => {
  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
    timeZone: "",
    profilePicture: null,
  });

  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Detect user's time zone on component mount
  useEffect(() => {
    const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setFormData((prevData) => ({
      ...prevData,
      timeZone: detectedTimeZone,
    }));

    fetchAvailableSlots();
  }, []);

  // Fetch available slots
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

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleCreateSlot = async () => {
    try {
      const response = await axios.post("http://localhost:5000/host/timeslots", {
        start_time: formData.start_time,
        end_time: formData.end_time,
        timezone: formData.timeZone,
      });
      alert("Slot created successfully!");
      fetchAvailableSlots(); // Refresh available slots
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
      const response = await axios.put(
        `http://localhost:5000/host/timeslots/${selectedSlot.id}`,
        {
          start_time: formData.start_time,
          end_time: formData.end_time,
          timezone: formData.timeZone,
        }
      );
      alert("Slot updated successfully!");
      fetchAvailableSlots(); // Refresh available slots
    } catch (error) {
      console.error(error);
      alert("Failed to update slot.");
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/host/timeslots/${slotId}`
      );
      alert("Slot deleted successfully!");
      fetchAvailableSlots(); // Refresh available slots
    } catch (error) {
      console.error(error);
      alert("Failed to delete slot.");
    }
  };

  const handleUpdateProfilePicture = async () => {
    const formDataObj = new FormData();
    formDataObj.append("profilePicture", formData.profilePicture);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/upload-profile-picture",
        formDataObj,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProfilePictureUrl(response.data.url); // Assuming the API returns the URL of the uploaded image
      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile picture.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Host Dashboard</h2>

        {/* Create Slot */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Create a Slot</h3>
          <div>
            <label htmlFor="start_time" className="block text-gray-700">Start Time</label>
            <input
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="end_time" className="block text-gray-700">End Time</label>
            <input
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="timeZone" className="block text-gray-700">Time Zone</label>
            <input
              type="text"
              name="timeZone"
              value={formData.timeZone}
              readOnly
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button
            onClick={handleCreateSlot}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Create Slot
          </button>
        </div>

        {/* Update Slot */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Update a Slot</h3>
          {selectedSlot && (
            <>
              <div>
                <label htmlFor="start_time" className="block text-gray-700">Start Time</label>
                <input
                  type="datetime-local"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="end_time" className="block text-gray-700">End Time</label>
                <input
                  type="datetime-local"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="timeZone" className="block text-gray-700">Time Zone</label>
                <input
                  type="text"
                  name="timeZone"
                  value={formData.timeZone}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <button
                onClick={handleUpdateSlot}
                className="w-full bg-yellow-600 text-white py-2 rounded-lg"
              >
                Update Slot
              </button>
            </>
          )}
        </div>

        {/* Available Slots */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Available Slots</h3>
          {availableSlots.length > 0 ? (
            <ul className="space-y-4">
              {availableSlots.map((slot) => (
                <li key={slot.id} className="flex justify-between items-center p-4 bg-gray-200 rounded-lg">
                  <div>
                    <p><strong>Start Time:</strong> {new Date(slot.start_time).toLocaleString()}</p>
                    <p><strong>End Time:</strong> {new Date(slot.end_time).toLocaleString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedSlot(slot);
                        setFormData({
                          start_time: slot.start_time,
                          end_time: slot.end_time,
                          timeZone: formData.timeZone,
                        });
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No available slots found.</p>
          )}
        </div>

        {/* Update Profile Picture */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Update Profile Picture</h3>
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            onClick={handleUpdateProfilePicture}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Update Profile Picture
          </button>
          {profilePictureUrl && (
            <div className="mt-4">
              <img src={profilePictureUrl} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Host;
