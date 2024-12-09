import React from 'react';

const Contact = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 md:px-12">
        {/* Page Header */}
        <h2 className="text-4xl font-bold text-center text-green-500 mb-10">
          Contact Us
        </h2>

        {/* Contact Form and Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Form */}
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Send Us a Message</h3>
            
            <form className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-700 font-medium">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Enter your name" 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required 
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required 
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block mb-2 text-gray-700 font-medium">
                  Your Message
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="Write your message here" 
                  rows="5" 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required 
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details Section */}
          <div className="bg-green-50 p-8 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Get in Touch</h3>
            
            {/* Address */}
            <div className="flex items-start space-x-4 mb-6">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21l-6-6m0 0l6-6m-6 6h11" />
              </svg>
              <p className="text-gray-700">1234 Meeting Mate Ave, Dhaka, Bangladesh</p>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4 mb-6">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-8 0v2m8-10a4 4 0 01-8 0m8 0V5a4 4 0 00-8 0v6m12 0a4 4 0 00-8 0m8 0v6m-8 0V5m0 12h8" />
              </svg>
              <p className="text-gray-700">support@meetingmate.com</p>
            </div>

            {/* Phone Number */}
            <div className="flex items-start space-x-4 mb-6">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21l-6-6m0 0l6-6m-6 6h11" />
              </svg>
              <p className="text-gray-700">+880 1234 567 890</p>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-6 mt-6">
              <a href="#" className="text-green-500 hover:text-green-700">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a10.41 10.41 0 01-3 1.58A4.48 4.48 0 0021.92 4a8.87 8.87 0 01-2.82 1.08A4.44 4.44 0 0016 3a4.5 4.5 0 00-4.5 4.5c0 .35.04.7.12 1.03A12.75 12.75 0 013 4.54a4.48 4.48 0 001.4 6 4.4 4.4 0 01-2-.55v.05a4.52 4.52 0 003.61 4.42A4.48 4.48 0 012 14.4v.05a4.48 4.48 0 004.2 3 9 9 0 01-6.62 1.85A12.75 12.75 0 007 20c8.27 0 12.8-6.85 12.8-12.79v-.58a9 9 0 002.24-2.26z" />
                </svg>
              </a>

              <a href="#" className="text-green-500 hover:text-green-700">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a10.41 10.41 0 01-3 1.58A4.48 4.48 0 0021.92 4a8.87 8.87 0 01-2.82 1.08A4.44 4.44 0 0016 3a4.5 4.5 0 00-4.5 4.5c0 .35.04.7.12 1.03A12.75 12.75 0 013 4.54a4.48 4.48 0 001.4 6 4.4 4.4 0 01-2-.55v.05a4.52 4.52 0 003.61 4.42A4.48 4.48 0 012 14.4v.05a4.48 4.48 0 004.2 3 9 9 0 01-6.62 1.85A12.75 12.75 0 007 20c8.27 0 12.8-6.85 12.8-12.79v-.58a9 9 0 002.24-2.26z" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
