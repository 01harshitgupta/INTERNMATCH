import React from 'react';
import { useId } from 'react';
import { useLanguage } from '../../../components/ui/Header';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';

const FormHeader = () => {
  const { currentLanguage, t } = useLanguage();
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
    <header className="text-center mb-8" aria-labelledby={headerId}>
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full">
          <Icon name="UserPlus" size={32} color="var(--color-primary)" aria-hidden="true" />
        </div>
      </div>
      <h1 id={headerId} className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        {currentStrings.title}
      </h1>
      {user?.name && (
        <p className="text-base text-muted-foreground mb-2">
          {currentStrings.greeting}, <span className="font-semibold">{user.name}</span>
        </p>
      )}
      <p className="text-lg text-muted-foreground">{currentStrings.subtitle}</p>
      <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-2">{currentStrings.description}</p>
    </header>
  );
};

export default FormHeader;
