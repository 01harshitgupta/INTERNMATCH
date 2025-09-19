import React, { useState } from 'react';
import { Search, Check, X } from 'lucide-react';

const SkillSelector = ({ selectedSkills, onSkillsChange, error }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Popular skills with icons for better visual recognition
  const popularSkills = [
    { name: 'Data Entry', icon: '📊', category: 'Office' },
    { name: 'MS Office', icon: '📝', category: 'Office' },
    { name: 'Excel', icon: '📈', category: 'Office' },
    { name: 'PowerPoint', icon: '📊', category: 'Office' },
    { name: 'Word', icon: '📄', category: 'Office' },
    { name: 'Java', icon: '☕', category: 'Programming' },
    { name: 'Python', icon: '🐍', category: 'Programming' },
    { name: 'JavaScript', icon: '⚡', category: 'Programming' },
    { name: 'HTML', icon: '🌐', category: 'Web Development' },
    { name: 'CSS', icon: '🎨', category: 'Web Development' },
    { name: 'React', icon: '⚛️', category: 'Web Development' },
    { name: 'Marketing', icon: '📢', category: 'Business' },
    { name: 'Social Media', icon: '📱', category: 'Business' },
    { name: 'Content Writing', icon: '✍️', category: 'Business' },
    { name: 'Customer Service', icon: '🎧', category: 'Business' },
    { name: 'Sales', icon: '💼', category: 'Business' },
    { name: 'Accounting', icon: '💰', category: 'Finance' },
    { name: 'Tally', icon: '🧮', category: 'Finance' },
    { name: 'Photoshop', icon: '🎨', category: 'Design' },
    { name: 'Canva', icon: '🎨', category: 'Design' },
    { name: 'Video Editing', icon: '🎬', category: 'Design' },
    { name: 'Digital Marketing', icon: '📈', category: 'Marketing' },
    { name: 'SEO', icon: '🔍', category: 'Marketing' },
    { name: 'Google Analytics', icon: '📊', category: 'Marketing' },
    { name: 'Communication', icon: '💬', category: 'Soft Skills' },
    { name: 'Teamwork', icon: '🤝', category: 'Soft Skills' },
    { name: 'Problem Solving', icon: '🧩', category: 'Soft Skills' },
    { name: 'Leadership', icon: '👑', category: 'Soft Skills' },
    { name: 'Time Management', icon: '⏰', category: 'Soft Skills' },
    { name: 'English', icon: '🇬🇧', category: 'Language' },
    { name: 'Hindi', icon: '🇮🇳', category: 'Language' },
    { name: 'Regional Language', icon: '🗣️', category: 'Language' },
  ];

  const filteredSkills = popularSkills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSkillToggle = (skillName) => {
    if (selectedSkills.includes(skillName)) {
      onSkillsChange(selectedSkills.filter(skill => skill !== skillName));
    } else {
      onSkillsChange([...selectedSkills, skillName]);
    }
  };

  const removeSkill = (skillName) => {
    onSkillsChange(selectedSkills.filter(skill => skill !== skillName));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What skills do you have? 🎯
        </h2>
        <p className="text-gray-600 text-lg">
          Select your skills to find the perfect internship match
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            Selected Skills ({selectedSkills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map(skill => (
              <div
                key={skill}
                className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="hover:bg-blue-200 rounded-full p-1 transition-colors"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Popular Skills
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredSkills.map(skill => {
            const isSelected = selectedSkills.includes(skill.name);
            return (
              <button
                key={skill.name}
                onClick={() => handleSkillToggle(skill.name)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{skill.icon}</span>
                  <span className="font-medium text-sm">{skill.name}</span>
                </div>
                <div className="text-xs text-gray-500">{skill.category}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Progress Indicator */}
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Profile Strength</span>
          <span className="text-sm font-bold text-blue-600">
            {selectedSkills.length >= 3 ? 'Strong' : selectedSkills.length >= 1 ? 'Good' : 'Getting Started'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((selectedSkills.length / 5) * 100, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          {selectedSkills.length < 3 
            ? `Add ${3 - selectedSkills.length} more skills for better matches`
            : 'Great! You have enough skills for good matches'
          }
        </p>
      </div>
    </div>
  );
};

export default SkillSelector;
