import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState('https://via.placeholder.com/40');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  // Check login status when component mounts
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from local storage
    setIsLoggedIn(false); // Update state
    setUserProfileImage(''); // Optionally clear profile image
    console.log('User logged out');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-green-500">
          <Link to="/">Meeting Mate</Link>
        </div>

        {/* Desktop Menu Links */}
        <ul className="hidden md:flex space-x-6 text-black">
          <li className="hover:text-green-500">
            <Link to="/about">About Us</Link>
          </li>
          <li className="hover:text-green-500">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="hover:text-green-500">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        {/* Call-to-Action Buttons / Profile Section */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative">
              <img 
                src="https://img.freepik.com/premium-photo/human-icon-3d-render-illustration_567294-4123.jpg?ga=GA1.1.579235623.1730386950&semt=ais_hybrid" 
                alt="User Profile" 
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-green-500" 
                onClick={toggleProfileDropdown} 
              />
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-black hover:bg-green-100"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <button 
                    className="block w-full text-left px-4 py-2 text-black hover:bg-green-100"
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-green-500">Log In</Link>
              <Link to="/signup" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button 
          className="md:hidden text-green-500 focus:outline-none" 
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
