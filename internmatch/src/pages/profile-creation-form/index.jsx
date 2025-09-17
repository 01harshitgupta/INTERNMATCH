import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '../../components/ui/Header';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FormHeader from './components/FormHeader';
import EducationSelector from './components/EducationSelector';
import SkillsSelector from './components/SkillsSelector';
import SectorSelector from './components/SectorSelector';
import LocationSelector from './components/LocationSelector';
import FormActions from './components/FormActions';

const ProfileCreationFormContent = () => {
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    education: '',
    skills: [],
    sector: '',
    location: '',
  });
  const [errors, setErrors] = useState({});

  // Translation strings with validation error messages
  const translations = {
    en: {
      pageTitle: 'Profile Creation - InternMatch',
      validationErrors: {
        education: 'Please select your education level',
        skills: 'Please select at least 3 skills',
        sector: 'Please select your preferred sector',
        location: 'Please specify your location preference',
      },
      completed: 'completed',
    },
    hi: {
      pageTitle: 'प्रोफाइल निर्माण - इंटर्नमैच',
      validationErrors: {
        education: 'कृपया अपना शिक्षा स्तर चुनें',
        skills: 'कृपया कम से कम 3 कौशल चुनें',
        sector: 'कृपया अपना पसंदीदा क्षेत्र चुनें',
        location: 'कृपया अपनी स्थान प्राथमिकता निर्दिष्ट करें',
      },
      completed: 'पूरा हुआ',
    },
  };

  const currentTranslations = translations[currentLanguage] || translations.en;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.education) {
      newErrors.education = currentTranslations.validationErrors.education;
    }
    if (formData.skills.length < 3) {
      newErrors.skills = currentTranslations.validationErrors.skills;
    }
    if (!formData.sector) {
      newErrors.sector = currentTranslations.validationErrors.sector;
    }
    if (!formData.location || formData.location.trim() === '') {
      newErrors.location = currentTranslations.validationErrors.location;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      // Scroll to first error field smoothly
      const firstErrorElement = document.querySelector('[data-error="true"]');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsLoading(true);
    try {
      // Save profile data locally for matching algorithm
      localStorage.setItem(
        'internmatch-profile',
        JSON.stringify({ ...formData, createdAt: new Date().toISOString(), language: currentLanguage })
      );

      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to recommendations page
      navigate('/internship-recommendations');
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const completedCount = [
    formData.education ? 1 : 0,
    formData.skills.length >= 3 ? 1 : 0,
    formData.sector ? 1 : 0,
    formData.location && formData.location.trim() !== '' ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const isFormValid = completedCount === 4;

  return (
    <div className="min-h-screen bg-background">
      <title>{currentTranslations.pageTitle}</title>
      <Header />
      <ProgressIndicator />
      <main className="pt-32 pb-16" aria-label="Profile creation form">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Breadcrumb />
          <FormHeader />

          <div className="bg-card border border-border rounded-lg shadow-soft p-6 md:p-8">
            <form onSubmit={e => e.preventDefault()} className="space-y-8" noValidate>
              <div data-error={!!errors.education}>
                <EducationSelector
                  value={formData.education}
                  onChange={value => updateFormData('education', value)}
                  error={errors.education}
                />
              </div>

              <div data-error={!!errors.skills}>
                <SkillsSelector
                  value={formData.skills}
                  onChange={value => updateFormData('skills', value)}
                  error={errors.skills}
                />
              </div>

              <div data-error={!!errors.sector}>
                <SectorSelector
                  value={formData.sector}
                  onChange={value => updateFormData('sector', value)}
                  error={errors.sector}
                />
              </div>

              <div data-error={!!errors.location}>
                <LocationSelector
                  value={formData.location}
                  onChange={value => updateFormData('location', value)}
                  error={errors.location}
                />
              </div>

              <FormActions onSubmit={handleSubmit} isLoading={isLoading} isValid={isFormValid} />
            </form>
          </div>

          {/* Progress Summary */}
          <div className="mt-8 text-center">
            <div
              className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full"
              aria-label="Profile completion status"
            >
              <div className={`w-2 h-2 rounded-full ${formData.education ? 'bg-success' : 'bg-border'}`}></div>
              <div className={`w-2 h-2 rounded-full ${formData.skills.length >= 3 ? 'bg-success' : 'bg-border'}`}></div>
              <div className={`w-2 h-2 rounded-full ${formData.sector ? 'bg-success' : 'bg-border'}`}></div>
              <div className={`w-2 h-2 rounded-full ${formData.location ? 'bg-success' : 'bg-border'}`}></div>
              <span className="ml-2">
                {completedCount}/4 {currentTranslations.completed}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ProfileCreationForm = () => (
  <LanguageProvider>
    <ProfileCreationFormContent />
  </LanguageProvider>
);

export default ProfileCreationForm;
