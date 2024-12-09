import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState('https://via.placeholder.com/40');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserProfileImage('');
    console.log('User logged out');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-gray-800">
          <Link to="/">Meeting Mate</Link>
        </div>

        {/* Desktop Menu Links */}
        <ul className="hidden md:flex ml-auto space-x-8 text-black">
          <li className="hover:text-green-500">
            <Link to="/about">About Us</Link>
          </li>
          <li className="hover:text-green-500">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="hover:text-green-500">
            <Link to="/dashboard">Dashboard</Link>
          </li>

          {!isLoggedIn && (
            <>
              <li className="hover:text-green-500">
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/signup" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Call-to-Action Buttons / Profile Section */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn && (
            <div className="relative">
              <img
                src={userProfileImage || 'https://via.placeholder.com/40'}
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
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-green-500 focus:outline-none ml-auto" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-2">
          <ul className="space-y-4 text-center">
            <li>
              <Link to="/about" className="block text-black hover:text-green-500 py-2">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block text-black hover:text-green-500 py-2">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="block text-black hover:text-green-500 py-2">
                Dashboard
              </Link>
            </li>
            {isLoggedIn ? (
              <div>
                <button
                  className="w-full text-left px-4 py-2 text-black hover:bg-green-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link to="/login" className="block text-black hover:text-green-500 py-2">
                  Log In
                </Link>
                <Link to="/signup" className="block text-white bg-green-500 py-2 px-4 rounded-md hover:bg-green-600">
                  Sign Up
                </Link>
              </div>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

