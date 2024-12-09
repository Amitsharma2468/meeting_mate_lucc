import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutUs = () => {
  return (
     <div className="font-sans bg-white text-black">
      
      {/* Navbar */}
      <Navbar/>
    <div className="bg-white">
      {/* Hero Section */}
      <section className="text-center py-20 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://media.istockphoto.com/id/2037006388/photo/technology-and-financial-advisory-services-concept-business-teamwork-and-working-on-digital.jpg?s=612x612&w=0&k=20&c=4zt4f-9rVD9Q_8ii_ijAmpHnzhrxWZHWNQ5ZmL8bo2Y=')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          opacity: 0.9 
        }}
      >
        <div className="bg-black bg-opacity-50 py-24 px-6">
          <h1 className="text-5xl font-bold text-white mb-6">About Us</h1>
          <p className="text-xl text-white opacity-90">
            Empowering seamless scheduling and enhancing productivity for hosts and guests.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Mission</h2>
          <p className="text-lg text-gray-700 text-center leading-relaxed max-w-3xl mx-auto">
            Our mission is to simplify the way people schedule and manage their meetings. We aim to bridge the gap 
            between hosts and guests by offering an intuitive, efficient, and user-friendly platform. Our solution 
            helps businesses, teams, and individuals streamline appointments, saving time and effort.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <img 
                src="https://img.icons8.com/external-flat-icons-inmotus-design/64/external-efficiency-customer-journey-flat-icons-inmotus-design.png" 
                alt="Efficiency Icon" 
                className="mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Effortless Scheduling</h3>
              <p className="text-gray-600">
                Book, manage, and track your meetings with minimal effort.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <img 
                src="https://img.icons8.com/ios-filled/64/26e07f/security-checked.png" 
                alt="Security Icon" 
                className="mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is safe with us. We prioritize privacy and confidentiality.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <img 
                src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-support-call-center-wanicon-lineal-color-wanicon.png" 
                alt="Support Icon" 
                className="mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our support team is always ready to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Team Member 1 */}
            <div className="text-center">
              <img 
                src="https://img.icons8.com/bubbles/100/000000/user.png" 
                alt="Team Member" 
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800">Nairobi J</h3>
              <p className="text-gray-600">Software Engineer</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <img 
                src="https://img.icons8.com/bubbles/100/000000/user.png" 
                alt="Team Member" 
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800">John Doe</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <img 
                src="https://img.icons8.com/bubbles/100/000000/user.png" 
                alt="Team Member" 
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800">Jane Smith</h3>
              <p className="text-gray-600">UI/UX Designer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-green-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Us Today!</h2>
          <p className="text-lg mb-6">
            Take control of your time and streamline your meetings with ease.
          </p>
          <a 
            href="/signUp" 
            className="px-8 py-4 bg-white text-green-500 font-semibold rounded-lg hover:bg-gray-100"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>

    <Footer/>
    </div>
  );
};

export default AboutUs;
