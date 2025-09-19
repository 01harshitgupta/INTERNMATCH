import React, { useState } from 'react';
import { MapPin, Search, Check } from 'lucide-react';

const LocationSelector = ({ selectedLocation, onLocationChange, error }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Major Indian cities and districts
  const popularLocations = [
    // Major Cities
    { name: 'Mumbai', state: 'Maharashtra', type: 'Metro' },
    { name: 'Delhi', state: 'Delhi', type: 'Metro' },
    { name: 'Bangalore', state: 'Karnataka', type: 'Metro' },
    { name: 'Chennai', state: 'Tamil Nadu', type: 'Metro' },
    { name: 'Kolkata', state: 'West Bengal', type: 'Metro' },
    { name: 'Hyderabad', state: 'Telangana', type: 'Metro' },
    { name: 'Pune', state: 'Maharashtra', type: 'Metro' },
    { name: 'Ahmedabad', state: 'Gujarat', type: 'Metro' },
    { name: 'Jaipur', state: 'Rajasthan', type: 'Metro' },
    { name: 'Surat', state: 'Gujarat', type: 'Metro' },
    
    // Tier 2 Cities
    { name: 'Indore', state: 'Madhya Pradesh', type: 'Tier 2' },
    { name: 'Bhopal', state: 'Madhya Pradesh', type: 'Tier 2' },
    { name: 'Vadodara', state: 'Gujarat', type: 'Tier 2' },
    { name: 'Visakhapatnam', state: 'Andhra Pradesh', type: 'Tier 2' },
    { name: 'Kochi', state: 'Kerala', type: 'Tier 2' },
    { name: 'Coimbatore', state: 'Tamil Nadu', type: 'Tier 2' },
    { name: 'Chandigarh', state: 'Chandigarh', type: 'Tier 2' },
    { name: 'Mysore', state: 'Karnataka', type: 'Tier 2' },
    { name: 'Nashik', state: 'Maharashtra', type: 'Tier 2' },
    { name: 'Aurangabad', state: 'Maharashtra', type: 'Tier 2' },
    
    // Regional Centers
    { name: 'Bhubaneswar', state: 'Odisha', type: 'Regional' },
    { name: 'Guwahati', state: 'Assam', type: 'Regional' },
    { name: 'Patna', state: 'Bihar', type: 'Regional' },
    { name: 'Ranchi', state: 'Jharkhand', type: 'Regional' },
    { name: 'Raipur', state: 'Chhattisgarh', type: 'Regional' },
    { name: 'Dehradun', state: 'Uttarakhand', type: 'Regional' },
    { name: 'Shimla', state: 'Himachal Pradesh', type: 'Regional' },
    { name: 'Gangtok', state: 'Sikkim', type: 'Regional' },
    { name: 'Aizawl', state: 'Mizoram', type: 'Regional' },
    { name: 'Kohima', state: 'Nagaland', type: 'Regional' },
    
    // Remote Options
    { name: 'Remote Work', state: 'Anywhere', type: 'Remote' },
    { name: 'Work from Home', state: 'Anywhere', type: 'Remote' },
  ];

  const filteredLocations = popularLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLocationSelect = (location) => {
    onLocationChange(location.name);
  };

  const getLocationIcon = (type) => {
    switch (type) {
      case 'Metro': return '🏙️';
      case 'Tier 2': return '🏢';
      case 'Regional': return '🏘️';
      case 'Remote': return '🏠';
      default: return '📍';
    }
  };

  const getLocationColor = (type) => {
    switch (type) {
      case 'Metro': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Tier 2': return 'bg-green-100 text-green-800 border-green-200';
      case 'Regional': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Remote': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Where would you like to work? 📍
        </h2>
        <p className="text-gray-600 text-lg">
          Choose your preferred location for internships
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for your city or district..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Selected Location */}
      {selectedLocation && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-green-500" />
            <MapPin className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-semibold text-blue-800">Selected Location</p>
              <p className="text-blue-600">{selectedLocation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Location Categories */}
      <div className="space-y-4">
        {['Metro', 'Tier 2', 'Regional', 'Remote'].map(category => {
          const categoryLocations = filteredLocations.filter(loc => loc.type === category);
          if (categoryLocations.length === 0) return null;

          return (
            <div key={category} className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                {getLocationIcon(category)}
                {category} Cities
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {categoryLocations.map(location => (
                  <button
                    key={location.name}
                    onClick={() => handleLocationSelect(location)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedLocation === location.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{location.name}</p>
                        <p className="text-sm text-gray-600">{location.state}</p>
                      </div>
                      {selectedLocation === location.name && (
                        <Check className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Location Tips */}
      <div className="bg-gray-50 p-4 rounded-xl">
        <h4 className="font-semibold text-gray-800 mb-2">💡 Location Tips</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Metro cities have more opportunities but higher competition</li>
          <li>• Tier 2 cities offer good opportunities with less competition</li>
          <li>• Regional centers are great for local opportunities</li>
          <li>• Remote work allows you to work from anywhere</li>
        </ul>
      </div>
    </div>
  );
};

export default LocationSelector;
