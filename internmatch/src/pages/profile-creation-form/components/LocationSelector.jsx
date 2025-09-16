import React, { useState } from 'react';
import { useLanguage } from '../../../components/ui/Header';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LocationSelector = ({ value, onChange, error }) => {
  const { currentLanguage } = useLanguage();
  const [inputMode, setInputMode] = useState('dropdown');

  const cityOptions = {
    en: [
      { value: 'mumbai', label: 'Mumbai', description: 'Maharashtra' },
      { value: 'delhi', label: 'Delhi', description: 'National Capital Territory' },
      { value: 'bangalore', label: 'Bangalore', description: 'Karnataka' },
      { value: 'hyderabad', label: 'Hyderabad', description: 'Telangana' },
      { value: 'chennai', label: 'Chennai', description: 'Tamil Nadu' },
      { value: 'kolkata', label: 'Kolkata', description: 'West Bengal' },
      { value: 'pune', label: 'Pune', description: 'Maharashtra' },
      { value: 'ahmedabad', label: 'Ahmedabad', description: 'Gujarat' },
      { value: 'jaipur', label: 'Jaipur', description: 'Rajasthan' },
      { value: 'surat', label: 'Surat', description: 'Gujarat' },
      { value: 'lucknow', label: 'Lucknow', description: 'Uttar Pradesh' },
      { value: 'kanpur', label: 'Kanpur', description: 'Uttar Pradesh' },
      { value: 'nagpur', label: 'Nagpur', description: 'Maharashtra' },
      { value: 'indore', label: 'Indore', description: 'Madhya Pradesh' },
      { value: 'thane', label: 'Thane', description: 'Maharashtra' },
      { value: 'bhopal', label: 'Bhopal', description: 'Madhya Pradesh' },
      { value: 'visakhapatnam', label: 'Visakhapatnam', description: 'Andhra Pradesh' },
      { value: 'pimpri', label: 'Pimpri-Chinchwad', description: 'Maharashtra' },
      { value: 'patna', label: 'Patna', description: 'Bihar' },
      { value: 'vadodara', label: 'Vadodara', description: 'Gujarat' },
      { value: 'remote', label: 'Remote/Work from Home', description: 'Any location' },
      { value: 'other', label: 'Other Location', description: 'Specify manually' }
    ],
    hi: [
      { value: 'mumbai', label: 'मुंबई', description: 'महाराष्ट्र' },
      { value: 'delhi', label: 'दिल्ली', description: 'राष्ट्रीय राजधानी क्षेत्र' },
      { value: 'bangalore', label: 'बैंगलोर', description: 'कर्नाटक' },
      { value: 'hyderabad', label: 'हैदराबाद', description: 'तेलंगाना' },
      { value: 'chennai', label: 'चेन्नई', description: 'तमिल नाडु' },
      { value: 'kolkata', label: 'कोलकाता', description: 'पश्चिम बंगाल' },
      { value: 'pune', label: 'पुणे', description: 'महाराष्ट्र' },
      { value: 'ahmedabad', label: 'अहमदाबाद', description: 'गुजरात' },
      { value: 'jaipur', label: 'जयपुर', description: 'राजस्थान' },
      { value: 'surat', label: 'सूरत', description: 'गुजरात' },
      { value: 'lucknow', label: 'लखनऊ', description: 'उत्तर प्रदेश' },
      { value: 'kanpur', label: 'कानपुर', description: 'उत्तर प्रदेश' },
      { value: 'nagpur', label: 'नागपुर', description: 'महाराष्ट्र' },
      { value: 'indore', label: 'इंदौर', description: 'मध्य प्रदेश' },
      { value: 'thane', label: 'ठाणे', description: 'महाराष्ट्र' },
      { value: 'bhopal', label: 'भोपाल', description: 'मध्य प्रदेश' },
      { value: 'visakhapatnam', label: 'विशाखापत्तनम', description: 'आंध्र प्रदेश' },
      { value: 'pimpri', label: 'पिंपरी-चिंचवड', description: 'महाराष्ट्र' },
      { value: 'patna', label: 'पटना', description: 'बिहार' },
      { value: 'vadodara', label: 'वडोदरा', description: 'गुजरात' },
      { value: 'remote', label: 'रिमोट/घर से काम', description: 'कोई भी स्थान' },
      { value: 'other', label: 'अन्य स्थान', description: 'मैन्युअल रूप से निर्दिष्ट करें' }
    ]
  };

  const translations = {
    en: {
      title: 'Location Preference',
      description: 'Where would you like to work?',
      placeholder: 'Select your preferred location',
      customPlaceholder: 'Enter your city/location',
      switchToCustom: 'Enter custom location',
      switchToDropdown: 'Choose from list'
    },
    hi: {
      title: 'स्थान प्राथमिकता',
      description: 'आप कहाँ काम करना चाहेंगे?',
      placeholder: 'अपना पसंदीदा स्थान चुनें',
      customPlaceholder: 'अपना शहर/स्थान दर्ज करें',
      switchToCustom: 'कस्टम स्थान दर्ज करें',
      switchToDropdown: 'सूची से चुनें'
    }
  };

  const currentTranslations = translations?.[currentLanguage] || translations?.en;
  const options = cityOptions?.[currentLanguage] || cityOptions?.en;

  const handleLocationChange = (newValue) => {
    if (newValue === 'other') {
      setInputMode('custom');
      onChange('');
    } else {
      onChange(newValue);
    }
  };

  const handleCustomLocationChange = (e) => {
    onChange(e?.target?.value);
  };

  const switchToDropdown = () => {
    setInputMode('dropdown');
    onChange('');
  };

  const switchToCustom = () => {
    setInputMode('custom');
    onChange('');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="MapPin" size={20} color="var(--color-success)" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">
            {currentTranslations?.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {currentTranslations?.description}
          </p>
        </div>
        <button
          type="button"
          onClick={inputMode === 'dropdown' ? switchToCustom : switchToDropdown}
          className="text-xs text-primary hover:text-primary/80 transition-smooth px-2 py-1 rounded min-h-44 flex items-center space-x-1"
        >
          <Icon name={inputMode === 'dropdown' ? 'Edit3' : 'List'} size={14} />
          <span>
            {inputMode === 'dropdown' 
              ? currentTranslations?.switchToCustom 
              : currentTranslations?.switchToDropdown
            }
          </span>
        </button>
      </div>
      {inputMode === 'dropdown' ? (
        <Select
          options={options}
          value={value}
          onChange={handleLocationChange}
          placeholder={currentTranslations?.placeholder}
          error={error}
          required
          searchable
          className="w-full"
        />
      ) : (
        <Input
          type="text"
          value={value}
          onChange={handleCustomLocationChange}
          placeholder={currentTranslations?.customPlaceholder}
          error={error}
          required
          className="w-full"
        />
      )}
    </div>
  );
};

export default LocationSelector;