import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Host from './pages/Host';
import Guest from './pages/Guest';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Footer from './pages/Footer';
import Navbar from './pages/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/host" element={<Host />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        
      </Routes>
    </Router>
  );
}

export default App;
