import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('host');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        name,
        email,
        password,
        role,
      });
      alert('User registered successfully');
      // Redirect to the login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error(error.response.data);
      alert('Error registering user');
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(meetingcdl.jpg)' }}
    >
      <div
        className="p-8 rounded-xl shadow-lg w-full max-w-md"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          borderRadius: '15px',
          borderImage: 'linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
          borderImageSlice: 1,
        }}
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Your Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full mb-4 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full mb-4 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mb-4 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mb-6 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="host">Host</option>
            <option value="guest">Guest</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-green-600 cursor-pointer hover:underline"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
