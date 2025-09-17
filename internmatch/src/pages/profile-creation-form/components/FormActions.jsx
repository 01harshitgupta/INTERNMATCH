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
    <div className="space-y-4 sm:space-y-6" role="region" aria-label="Form Actions">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-6 font-medium" id="help-text">
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
          className="text-lg py-4 min-h-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              {currentTranslations.loadingText}
            </div>
          ) : (
            currentTranslations.submitButton
          )}
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true" />
          <span className="font-medium">Free to use</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-indigo-500 rounded-full" aria-hidden="true" />
          <span className="font-medium">Instant results</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full" aria-hidden="true" />
          <span className="font-medium">No registration required</span>
        </div>
      </div>
    </div>
  );
};

export default FormActions;
