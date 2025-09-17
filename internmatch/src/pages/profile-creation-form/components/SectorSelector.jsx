import React from 'react';
import { useId } from 'react';
import { useLanguage } from '../../../components/ui/Header';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SectorSelector = ({ value, onChange, error }) => {
  const { currentLanguage } = useLanguage();
  const selectId = useId();

  const sectorOptions = {
    en: [
      { value: 'technology', label: 'Information Technology', description: 'Software, IT Services, Tech Startups' },
      { value: 'finance', label: 'Banking & Finance', description: 'Banks, Insurance, Financial Services' },
      { value: 'healthcare', label: 'Healthcare & Pharmaceuticals', description: 'Hospitals, Pharma, Medical Devices' },
      { value: 'education', label: 'Education & Training', description: 'Schools, Colleges, EdTech' },
      { value: 'manufacturing', label: 'Manufacturing & Engineering', description: 'Automotive, Textiles, Heavy Industries' },
      { value: 'retail', label: 'Retail & E-commerce', description: 'Online/Offline Retail, Consumer Goods' },
      { value: 'media', label: 'Media & Entertainment', description: 'TV, Films, Digital Content, Advertising' },
      { value: 'consulting', label: 'Consulting & Professional Services', description: 'Management, Legal, Accounting' },
      { value: 'government', label: 'Government & Public Sector', description: 'PSUs, Government Departments, NGOs' },
      { value: 'agriculture', label: 'Agriculture & Food Processing', description: 'Farming, Food Tech, Rural Development' },
      { value: 'real-estate', label: 'Real Estate & Construction', description: 'Property, Infrastructure, Architecture' },
      { value: 'logistics', label: 'Logistics & Transportation', description: 'Supply Chain, Delivery, Travel' },
    ],
    hi: [
      { value: 'technology', label: 'सूचना प्रौद्योगिकी', description: 'सॉफ्टवेयर, आईटी सेवाएं, टेक स्टार्टअप' },
      { value: 'finance', label: 'बैंकिंग और वित्त', description: 'बैंक, बीमा, वित्तीय सेवाएं' },
      { value: 'healthcare', label: 'स्वास्थ्य सेवा और फार्मास्यूटिकल्स', description: 'अस्पताल, फार्मा, चिकित्सा उपकरण' },
      { value: 'education', label: 'शिक्षा और प्रशिक्षण', description: 'स्कूल, कॉलेज, एडटेक' },
      { value: 'manufacturing', label: 'विनिर्माण और इंजीनियरिंग', description: 'ऑटोमोटिव, वस्त्र, भारी उद्योग' },
      { value: 'retail', label: 'खुदरा और ई-कॉमर्स', description: 'ऑनलाइन/ऑफलाइन खुदरा, उपभोक्ता वस्तुएं' },
      { value: 'media', label: 'मीडिया और मनोरंजन', description: 'टीवी, फिल्में, डिजिटल सामग्री, विज्ञापन' },
      { value: 'consulting', label: 'परामर्श और व्यावसायिक सेवाएं', description: 'प्रबंधन, कानूनी, लेखांकन' },
      { value: 'government', label: 'सरकार और सार्वजनिक क्षेत्र', description: 'पीएसयू, सरकारी विभाग, एनजीओ' },
      { value: 'agriculture', label: 'कृषि और खाद्य प्रसंस्करण', description: 'खेती, फूड टेक, ग्रामीण विकास' },
      { value: 'real-estate', label: 'रियल एस्टेट और निर्माण', description: 'संपत्ति, बुनियादी ढांचा, वास्तुकला' },
      { value: 'logistics', label: 'लॉजिस्टिक्स और परिवहन', description: 'आपूर्ति श्रृंखला, डिलीवरी, यात्रा' },
    ],
  };

  const translations = {
    en: {
      title: 'Preferred Sectors',
      description: "Choose industries you're interested in",
      placeholder: 'Select your preferred sector',
    },
    hi: {
      title: 'पसंदीदा क्षेत्र',
      description: 'उन उद्योगों को चुनें जिनमें आप रुचि रखते हैं',
      placeholder: 'अपना पसंदीदा क्षेत्र चुनें',
    },
  };

  const currentTranslations = translations[currentLanguage] || translations.en;
  const options = sectorOptions[currentLanguage] || sectorOptions.en;

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Building2" size={20} color="var(--color-accent)" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{currentTranslations.title}</h3>
          <p className="text-sm text-muted-foreground">{currentTranslations.description}</p>
        </div>
      </div>
      <Select
        id={selectId}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={currentTranslations.placeholder}
        error={error}
        required
        searchable
        className="w-full"
      />
    </div>
  );
};

export default SectorSelector;
