Meeting Scheduler Website

Project Overview
The Meeting Scheduler Website is a web application designed to facilitate seamless scheduling and booking of meetings between hosts and guests. The platform allows hosts to create and manage their time slots, while guests can book appointments according to available slots. This system aims to provide a clean, intuitive, and user-friendly experience for both parties.

The platform offers role-based user authentication, a comprehensive dashboard for hosts, and an easy-to-use search and booking interface for guests. The application is built using modern web development technologies like ReactJS, Tailwind CSS, Node.js, Express.js, and MySQL for a robust and efficient full-stack experience.

Features:
Guest User
View Available Slots: Guests can view a list of available slots.
Search Functionality: Filter slots by preferred date, time, or host name.
Slot Booking: Book an available time slot from the host's schedule.

Host User
Dashboard: A dedicated dashboard to view and manage bookings.
Slot Management: Create, edit, delete, and update availability of time slots.
View Booked List: View booked time slots with guest details in LIFO order.

General Features:
Role-based Authentication: Separate views and privileges for guests and hosts.
Responsive Design: The website works seamlessly on desktops, tablets, and mobile devices.

Tech Stack
Front End: ReactJS, Tailwind CSS.
Backend: NodeJS, ExpressJS.
Database: MySQL
Version Control: Git, Github.

Setup Instructions
Prerequisites
Node.js (version 16 or later)
MySQL (Ensure MySQL server is running)
Git (version control)

1. Clone the Repository
git clone https://github.com/your-username/meeting-scheduler.git
cd client

2. Backend Setup
Navigate to the backend folder:
            cd server
      2. Install dependencies:
            npm install
      3. Configure Database:
Open the server/config/db.js file.
Update the MySQL connection details (host, user, password, database) according to your local setup.

API Endpoints
Authentication Endpoints
POST /api/auth/register: Register a new user (host/guest)
POST /api/auth/login: Login as a user
Slot Endpoints
GET /api/slots: Get all available slots (for guests)
POST /api/slots: Create a new time slot (for hosts)
PATCH /api/slots/:id: Update a time slot status
DELETE /api/slots/:id: Delete a time slot
Booking Endpoints
POST /api/bookings: Book a slot as a guest
GET /api/bookings: View booking history (for hosts)






