import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'User',
      title: 'Profile Setup',
      description: 'Create your professional profile to get matched with relevant internships',
      action: 'Setup Profile',
      path: '/profile-creation-form'
    },
    {
      icon: 'Search',
      title: 'Find Internships',
      description: 'Browse and apply to government internship opportunities',
      action: 'Browse Opportunities',
      path: '/internship-recommendations'
    },
    {
      icon: 'FileText',
      title: 'Track Applications',
      description: 'Monitor your application status and manage your submissions',
      action: 'View Applications',
      path: '/applications'
    }
  ];

  const stats = [
    { label: 'Active Internships', value: '1,250+' },
    { label: 'Government Departments', value: '45+' },
    { label: 'Successful Placements', value: '8,500+' },
    { label: 'Student Satisfaction', value: '98%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Government Internship Portal
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with meaningful internship opportunities across Government of India
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/profile-creation-form')}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg"
              >
                Get Started
              </Button>
              <Button
                onClick={() => navigate('/internship-recommendations')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold rounded-lg"
              >
                Browse Opportunities
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to find your perfect government internship
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={feature.icon} className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <Button
                  onClick={() => navigate(feature.path)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                >
                  {feature.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Government Notice */}
      <div className="bg-blue-50 border-t border-blue-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Icon name="Info" className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Official Government Portal
              </h3>
              <p className="text-blue-800">
                This is an official portal of the Government of India, Ministry of Education. 
                All internship opportunities listed here are verified and legitimate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <Icon name="Shield" className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold">Government of India</span>
              </div>
              <p className="text-gray-400 text-sm">
                Ministry of Education
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Help</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Guidelines</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Ministry of Education</p>
                <p>Shastri Bhawan, New Delhi</p>
                <p>Phone: +91-11-2378-1234</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Government of India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
