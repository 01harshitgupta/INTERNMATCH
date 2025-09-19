import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '../../components/ui/Header';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProgressMeter from '../../components/CareerPathway/ProgressMeter';
import SkillSelector from '../../components/CareerPathway/SkillSelector';
import LocationSelector from '../../components/CareerPathway/LocationSelector';
import RecommendationCard from '../../components/CareerPathway/RecommendationCard';
import recommendationService from '../../services/recommendationService';
import { Loader2, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';

const CareerPathwayContent = () => {
  const { currentLanguage, t } = useLanguage();
  const navigate = useNavigate();

  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isApiConnected, setIsApiConnected] = useState(true);

  // Form validation
  const [errors, setErrors] = useState({});

  // Milestones configuration
  const milestones = [
    {
      title: 'Select Your Skills',
      description: 'Choose the skills you have or want to develop',
      emoji: '🎯',
    },
    {
      title: 'Choose Location',
      description: 'Select your preferred work location',
      emoji: '📍',
    },
    {
      title: 'Get Recommendations',
      description: 'View personalized internship matches',
      emoji: '✨',
    },
  ];

  const totalSteps = milestones.length;

  // Check API connectivity on component mount
  useEffect(() => {
    const checkApiConnection = async () => {
      const connected = await recommendationService.testConnection();
      setIsApiConnected(connected);
    };
    checkApiConnection();
  }, []);

  // Validation functions
  const validateSkills = () => {
    if (selectedSkills.length < 3) {
      setErrors(prev => ({
        ...prev,
        skills: 'Please select at least 3 skills for better recommendations'
      }));
      return false;
    }
    setErrors(prev => ({ ...prev, skills: '' }));
    return true;
  };

  const validateLocation = () => {
    if (!selectedLocation.trim()) {
      setErrors(prev => ({
        ...prev,
        location: 'Please select your preferred location'
      }));
      return false;
    }
    setErrors(prev => ({ ...prev, location: '' }));
    return true;
  };

  // Step navigation
  const goToNextStep = () => {
    if (currentStep === 1) {
      if (!validateSkills()) return;
    } else if (currentStep === 2) {
      if (!validateLocation()) return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    if (step <= currentStep || (step === 2 && selectedSkills.length >= 3) || (step === 3 && selectedLocation)) {
      setCurrentStep(step);
    }
  };

  // Fetch recommendations
  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const skillsString = selectedSkills.join(', ');
      const result = await recommendationService.getRecommendations({
        skills: skillsString,
        location: selectedLocation,
      });

      if (result.success) {
        setRecommendations(result.data);
        if (result.isMockData) {
          console.warn('Using mock data - API connection failed');
        }
      } else {
        setError(result.error || 'Failed to fetch recommendations');
        setRecommendations([]);
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Something went wrong. Please try again.');
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fetch recommendations when reaching step 3
  useEffect(() => {
    if (currentStep === 3 && selectedSkills.length > 0 && selectedLocation) {
      fetchRecommendations();
    }
  }, [currentStep, selectedSkills, selectedLocation]);

  // Handle skill selection
  const handleSkillsChange = (skills) => {
    setSelectedSkills(skills);
    setErrors(prev => ({ ...prev, skills: '' }));
  };

  // Handle location selection
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setErrors(prev => ({ ...prev, location: '' }));
  };

  // Refresh recommendations
  const handleRefreshRecommendations = () => {
    fetchRecommendations();
  };

  // Start over
  const handleStartOver = () => {
    setCurrentStep(1);
    setSelectedSkills([]);
    setSelectedLocation('');
    setRecommendations([]);
    setError(null);
    setErrors({});
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SkillSelector
            selectedSkills={selectedSkills}
            onSkillsChange={handleSkillsChange}
            error={errors.skills}
          />
        );
      case 2:
        return (
          <LocationSelector
            selectedLocation={selectedLocation}
            onLocationChange={handleLocationChange}
            error={errors.location}
          />
        );
      case 3:
        return (
          <div className="space-y-6">
            {/* Results Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your Personalized Recommendations ✨
              </h2>
              <p className="text-gray-600 text-lg">
                Based on your skills in {selectedSkills.join(', ')} and location preference: {selectedLocation}
              </p>
            </div>

            {/* API Status */}
            {!isApiConnected && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800">Demo Mode</p>
                    <p className="text-sm text-yellow-700">
                      Showing sample recommendations. Connect to the API for real data.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Finding the best matches for you...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div className="flex-1">
                    <p className="font-medium text-red-800">Error</p>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                  <button
                    onClick={handleRefreshRecommendations}
                    className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-sm font-medium transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {!isLoading && !error && recommendations.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    Found {recommendations.length} matching internships
                  </p>
                  <button
                    onClick={handleRefreshRecommendations}
                    className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>
                <div className="space-y-6">
                  {recommendations.map((recommendation) => (
                    <RecommendationCard
                      key={recommendation.InternshipID}
                      recommendation={recommendation}
                      userSkills={selectedSkills}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {!isLoading && !error && recommendations.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No recommendations found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your skills or location preferences
                </p>
                <button
                  onClick={handleStartOver}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <ProgressIndicator />
      <main className="pt-20 sm:pt-24 pb-8 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb />

          {/* Progress Meter */}
          <ProgressMeter
            currentStep={currentStep}
            totalSteps={totalSteps}
            milestones={milestones}
          />

          {/* Step Content */}
          <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6 sm:p-8">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          {currentStep < 3 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
              <button
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex gap-3">
                {currentStep < 3 && (
                  <button
                    onClick={goToNextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                  >
                    {currentStep === 2 ? 'Get Recommendations' : 'Next Step'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step Indicators */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              {milestones.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index + 1)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index < currentStep
                      ? 'bg-green-500'
                      : index === currentStep - 1
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const CareerPathway = () => {
  return (
    <LanguageProvider>
      <CareerPathwayContent />
    </LanguageProvider>
  );
};

export default CareerPathway;
