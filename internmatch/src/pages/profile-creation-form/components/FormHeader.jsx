import React from 'react';
import { useId } from 'react';
import { useLanguage } from '../../../components/ui/Header';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';

const FormHeader = () => {
  const { currentLanguage } = useLanguage();
  const { user } = useAuth();
  const headerId = useId();

  const translations = {
    en: {
      title: 'Create Your Profile',
      subtitle: 'Tell us about yourself to find the perfect internship matches',
      description:
        'Complete your profile to get personalized internship recommendations based on your skills, education, and preferences.',
      greeting: 'Hello'
    },
    hi: {
      title: 'अपना प्रोफ़ाइल बनाएं',
      subtitle: 'सही इंटर्नशिप मैच खोजने के लिए हमें अपने बारे में बताएं',
      description:
        'अपने कौशल, शिक्षा और प्राथमिकताओं के आधार पर व्यक्तिगत इंटर्नशिप सिफारिशें प्राप्त करें।',
      greeting: 'नमस्ते'
    }
  };

  const currentStrings = translations[currentLanguage] || translations.en;

  return (
    <header
      className="text-center mb-6 pt-1"
      aria-labelledby={headerId}
    >
      {/* Icon */}
      <div className="flex justify-center mb-3">
        <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded-full">
          <Icon
            name="UserPlus"
            size={28}
            className="text-primary"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Title */}
      <h1
        id={headerId}
        className="text-2xl md:text-3xl font-bold text-foreground mb-1"
      >
        {currentStrings.title}
      </h1>

      {/* Greeting */}
      {user?.name && (
        <p className="text-base text-foreground/90 mb-1">
          {currentStrings.greeting},{' '}
          <span className="font-semibold">{user.name}</span>
        </p>
      )}

      {/* Subtitle */}
      <p className="text-lg font-medium text-muted-foreground mb-1">
        {currentStrings.subtitle}
      </p>

      {/* Description */}
      <p className="text-sm text-muted-foreground max-w-xl mx-auto">
        {currentStrings.description}
      </p>
    </header>
  );
};

export default FormHeader;
