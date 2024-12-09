import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-xl font-bold mb-4">Meeting Scheduler</h2>
          <p className="mb-4">Simplifying scheduling for hosts and guests.</p>
          
          <div className="flex justify-center space-x-6">
            <a href="#about" className="hover:text-green-500">About Us</a>
            <a href="/contact" className="hover:text-green-500">Contact</a>
            <a href="/privacy" className="hover:text-green-500">Privacy Policy</a>
          </div>
          
          <p className="mt-4">&copy; 2024 Meeting Scheduler. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer