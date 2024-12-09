import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Dashboard = () => {
  // Static dummy data for Booking Trends (Line Chart)
  const bookingTrendsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Bookings Per Month",
        data: [12, 19, 3, 5, 2, 3, 20, 30, 25, 18, 12, 15],
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  // Static dummy data for Popular Booking Times (Pie Chart)
  const popularTimesData = {
    labels: ["9-10am", "10-11am", "11-12pm", "12-1pm", "1-2pm"],
    datasets: [
      {
        label: "Popular Booking Times",
        data: [25, 30, 15, 20, 10],
        backgroundColor: ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#818cf8"],
        hoverOffset: 4,
      },
    ],
  };

  // Static dummy data for Most Booked Slots (Bar Chart)
  const mostBookedSlotsData = {
    labels: ["Slot 1", "Slot 2", "Slot 3", "Slot 4", "Slot 5"],
    datasets: [
      {
        label: "Bookings",
        data: [40, 25, 35, 50, 20],
        backgroundColor: ["#60a5fa", "#34d399", "#fbbf24", "#f87171", "#818cf8"],
      },
    ],
  };

  // Chart.js options to control responsiveness
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="font-sans bg-gradient-to-r from-green-100 via-white to-green-100 text-black">
      {/* Navbar */}
      <Navbar />

      <div className="p-8 bg-white shadow-lg rounded-lg min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Host Dashboard</h1>

        {/* Chart Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Booking Trends Line Chart */}
          <div className="bg-white shadow-xl rounded-lg p-6 h-80 overflow-hidden flex flex-col justify-between border-l-4 border-green-500">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Booking Trends Over Time</h2>
            {/* Line Chart Component */}
          </div>

          {/* Popular Booking Times Pie Chart */}
          <div className="bg-white shadow-xl rounded-lg p-6 h-80 overflow-hidden flex flex-col justify-between border-l-4 border-yellow-500">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Popular Booking Times</h2>
            {/* Pie Chart Component */}
          </div>

          {/* Most Booked Slots Bar Chart */}
          <div className="bg-white shadow-xl rounded-lg p-6 h-80 overflow-hidden flex flex-col justify-between border-l-4 border-blue-500">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Most Booked Slots</h2>
            {/* Bar Chart Component */}
          </div>
        </div>

        {/* Export Buttons */}
        <div className="mt-10 bg-white shadow-xl rounded-lg p-6 border-t-4 border-green-500">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Export Booking Data</h2>
          <div className="flex gap-4">
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition ease-in-out duration-200 transform hover:scale-105"
              onClick={() => exportData('json')}
            >
              Export as JSON
            </button>

            <button 
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition ease-in-out duration-200 transform hover:scale-105"
              onClick={() => exportData('csv')}
            >
              Export as CSV
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Function to export booking data (simulated for demo)
const exportData = (format) => {
  const data = {
    bookings: [
      { slot: "9-10am", count: 25 },
      { slot: "10-11am", count: 30 },
      { slot: "11-12pm", count: 15 },
      { slot: "12-1pm", count: 20 },
      { slot: "1-2pm", count: 10 },
    ],
  };

  const filename = `booking_data.${format}`;
  const dataStr = JSON.stringify(data, null, 2);
  
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export default Dashboard;
