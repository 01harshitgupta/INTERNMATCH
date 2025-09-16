import React from 'react';
import { useLanguage } from '../../../components/ui/Header';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const EducationSelector = ({ value, onChange, error }) => {
  const { t, currentLanguage } = useLanguage();

  const educationOptions = {
    en: [
      { value: '10th', label: '10th Standard', description: 'Secondary School Certificate' },
      { value: '12th', label: '12th Standard', description: 'Higher Secondary Certificate' },
      { value: 'diploma', label: 'Diploma', description: 'Technical/Professional Diploma' },
      { value: 'graduate', label: 'Graduate', description: 'Bachelor\'s Degree (B.A/B.Sc/B.Com/B.Tech)' },
      { value: 'postgraduate', label: 'Post Graduate', description: 'Master\'s Degree (M.A/M.Sc/M.Com/M.Tech/MBA)' },
      { value: 'phd', label: 'PhD/Doctorate', description: 'Doctoral Degree' }
    ],
    hi: [
      { value: '10th', label: '10वीं कक्षा', description: 'माध्यमिक शिक्षा प्रमाणपत्र' },
      { value: '12th', label: '12वीं कक्षा', description: 'उच्चतर माध्यमिक प्रमाणपत्र' },
      { value: 'diploma', label: 'डिप्लोमा', description: 'तकनीकी/व्यावसायिक डिप्लोमा' },
      { value: 'graduate', label: 'स्नातक', description: 'स्नातक डिग्री (बी.ए/बी.एससी/बी.कॉम/बी.टेक)' },
      { value: 'postgraduate', label: 'स्नातकोत्तर', description: 'मास्टर डिग्री (एम.ए/एम.एससी/एम.कॉम/एम.टेक/एमबीए)' },
      { value: 'phd', label: 'पीएचडी/डॉक्टरेट', description: 'डॉक्टरेट डिग्री' }
    ]
  };

  const translations = {
    en: {
      title: 'Education Level',
      description: 'Select your highest completed education',
      placeholder: 'Choose your education level'
    },
    hi: {
      title: 'शिक्षा स्तर',
      description: 'अपनी उच्चतम पूर्ण शिक्षा चुनें',
      placeholder: 'अपना शिक्षा स्तर चुनें'
    }
  };

  const currentTranslations = translations?.[currentLanguage] || translations?.en;
  const options = educationOptions?.[currentLanguage] || educationOptions?.en;

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="GraduationCap" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {currentTranslations?.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {currentTranslations?.description}
          </p>
        </div>
      </div>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={currentTranslations?.placeholder}
        error={error}
        required
        className="w-full"
      />
    </div>
  );
};

export default EducationSelector;