import React from 'react';
import { useLanguage } from '../../../components/ui/Header';
import Button from '../../../components/ui/Button';

const FormActions = ({ onSubmit, isLoading, isValid }) => {
  const { currentLanguage, t } = useLanguage();

  const translations = {
    en: {
      submitButton: 'Find My Internships',
      loadingText: 'Processing...',
      helpText: 'We\'ll match you with relevant internship opportunities',
    },
    hi: {
      submitButton: 'मेरी इंटर्नशिप खोजें',
      loadingText: 'प्रसंस्करण...',
      helpText: 'हम आपको प्रासंगिक इंटर्नशिप अवसरों से मिलाएंगे',
    },
  };

  const currentTranslations = translations[currentLanguage] || translations.en;

  return (
    <div className="space-y-4" role="region" aria-label="Form Actions">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-6" id="help-text">
          {currentTranslations.helpText}
        </p>
        <Button
          variant="default"
          size="lg"
          onClick={onSubmit}
          disabled={!isValid || isLoading}
          aria-busy={isLoading}
          aria-describedby="help-text"
          iconName="Search"
          iconPosition="left"
          fullWidth
          className="text-lg py-4 min-h-14"
        >
          {isLoading ? currentTranslations.loadingText : currentTranslations.submitButton}
        </Button>
      </div>
      <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-success rounded-full" aria-hidden="true" />
          <span>Free to use</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full" aria-hidden="true" />
          <span>Instant results</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-accent rounded-full" aria-hidden="true" />
          <span>No registration required</span>
        </div>
      </div>
    </div>
  );
};

export default FormActions;
