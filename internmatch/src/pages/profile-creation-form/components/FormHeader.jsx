import React from 'react';
import { useLanguage } from '../../../components/ui/Header';
import Icon from '../../../components/AppIcon';

const FormHeader = () => {
  const { currentLanguage } = useLanguage();

  const translations = {
    en: {
      title: 'Create Your Profile',
      subtitle: 'Tell us about yourself to find the perfect internship matches',
      description: 'Complete your profile to get personalized internship recommendations based on your skills, education, and preferences.'
    },
    hi: {
      title: 'अपना प्रोफाइल बनाएं',
      subtitle: 'सही इंटर्नशिप मैच खोजने के लिए हमें अपने बारे में बताएं',
      description: 'अपने कौशल, शिक्षा और प्राथमिकताओं के आधार पर व्यक्तिगत इंटर्नशिप सिफारिशें प्राप्त करने के लिए अपना प्रोफाइल पूरा करें।'
    }
  };

  const currentTranslations = translations?.[currentLanguage] || translations?.en;

  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="UserPlus" size={32} color="var(--color-primary)" />
        </div>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        {currentTranslations?.title}
      </h1>
      <p className="text-lg text-muted-foreground mb-4">
        {currentTranslations?.subtitle}
      </p>
      <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
        {currentTranslations?.description}
      </p>
    </div>
  );
};

export default FormHeader;