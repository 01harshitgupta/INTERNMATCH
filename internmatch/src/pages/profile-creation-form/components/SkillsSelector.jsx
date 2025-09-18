import React from 'react';
import { useId } from 'react';
import { useLanguage } from '../../../components/ui/Header';
import { CheckboxGroup, Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SkillsSelector = ({ value, onChange, error }) => {
  const { currentLanguage, t } = useLanguage();
  const groupId = useId();

  const skillCategories = {
    en: [
      {
        category: 'Technical Skills',
        icon: 'Code',
        skills: [
          { id: 'programming', label: 'Programming (Python, Java, C++)' },
          { id: 'web-dev', label: 'Web Development (HTML, CSS, JavaScript)' },
          { id: 'mobile-dev', label: 'Mobile App Development' },
          { id: 'data-analysis', label: 'Data Analysis & Excel' },
          { id: 'digital-marketing', label: 'Digital Marketing & SEO' },
          { id: 'graphic-design', label: 'Graphic Design & Photoshop' }
        ]
      },
      {
        category: 'Business Skills',
        icon: 'Briefcase',
        skills: [
          { id: 'sales', label: 'Sales & Customer Service' },
          { id: 'marketing', label: 'Marketing & Brand Management' },
          { id: 'finance', label: 'Finance & Accounting' },
          { id: 'hr', label: 'Human Resources' },
          { id: 'project-mgmt', label: 'Project Management' },
          { id: 'business-analysis', label: 'Business Analysis' }
        ]
      },
      {
        category: 'Communication Skills',
        icon: 'MessageCircle',
        skills: [
          { id: 'english', label: 'English Communication' },
          { id: 'hindi', label: 'Hindi Communication' },
          { id: 'content-writing', label: 'Content Writing' },
          { id: 'presentation', label: 'Presentation Skills' },
          { id: 'social-media', label: 'Social Media Management' },
          { id: 'translation', label: 'Translation Services' }
        ]
      }
    ],
    hi: [
      {
        category: 'तकनीकी कौशल',
        icon: 'Code',
        skills: [
          { id: 'programming', label: 'प्रोग्रामिंग (Python, Java, C++)' },
          { id: 'web-dev', label: 'वेब डेवलपमेंट (HTML, CSS, JavaScript)' },
          { id: 'mobile-dev', label: 'मोबाइल ऐप डेवलपमेंट' },
          { id: 'data-analysis', label: 'डेटा विश्लेषण और एक्सेल' },
          { id: 'digital-marketing', label: 'डिजिटल मार्केटिंग और SEO' },
          { id: 'graphic-design', label: 'ग्राफिक डिज़ाइन और फोटोशॉप' }
        ]
      },
      {
        category: 'व्यवसायिक कौशल',
        icon: 'Briefcase',
        skills: [
          { id: 'sales', label: 'बिक्री और ग्राहक सेवा' },
          { id: 'marketing', label: 'मार्केटिंग और ब्रांड प्रबंधन' },
          { id: 'finance', label: 'वित्त और लेखा' },
          { id: 'hr', label: 'मानव संसाधन' },
          { id: 'project-mgmt', label: 'परियोजना प्रबंधन' },
          { id: 'business-analysis', label: 'व्यवसाय विश्लेषण' }
        ]
      },
      {
        category: 'संचार कौशल',
        icon: 'MessageCircle',
        skills: [
          { id: 'english', label: 'अंग्रेजी संचार' },
          { id: 'hindi', label: 'हिंदी संचार' },
          { id: 'content-writing', label: 'सामग्री लेखन' },
          { id: 'presentation', label: 'प्रस्तुति कौशल' },
          { id: 'social-media', label: 'सोशल मीडिया प्रबंधन' },
          { id: 'translation', label: 'अनुवाद सेवाएं' }
        ]
      }
    ]
  };

  const translations = {
    en: {
      title: 'Skills & Expertise',
      description: 'Select all skills applicable to you',
      selectAll: 'Select All',
      clearAll: 'Clear All'
    },
    hi: {
      title: 'कौशल और विशेषज्ञता',
      description: 'सभी उपयुक्त कौशल चुनें',
      selectAll: 'सभी चुनें',
      clearAll: 'सभी साफ़ करें'
    }
  };

  const currentStrings = translations[currentLanguage] || translations.en;
  const categories = skillCategories[currentLanguage] || skillCategories.en;

  const handleSkillChange = (skillId, checked) => {
    if (checked) {
      if (!value.includes(skillId)) {
        onChange([...value, skillId]);
      }
    } else {
      onChange(value.filter(id => id !== skillId));
    }
  };

  const handleSelectAll = () => {
    const allSkillIds = categories.flatMap(category =>
      category.skills.map(skill => skill.id)
    );
    onChange(allSkillIds);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <section aria-labelledby={`${groupId}-label`} className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-xl">
            <Icon name="Zap" size={22} aria-hidden="true" className="text-blue-600" />
          </div>
          <div>
            <h3 id={`${groupId}-label`} className="text-xl font-semibold text-gray-900">
              {currentStrings.title}
            </h3>
            <p className="text-sm text-gray-600">{currentStrings.description}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            {currentStrings.selectAll}
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            {currentStrings.clearAll}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      {/* Skill Categories */}
      {categories.map(category => (
        <div
          key={category.category}
          className="bg-white border border-gray-200 shadow-sm p-6 rounded-lg space-y-4"
        >
          <div className="flex items-center space-x-2">
            <Icon name={category.icon} size={20} className="text-gray-700" />
            <h4 className="text-lg font-medium text-gray-900">{category.category}</h4>
          </div>

          <CheckboxGroup>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.skills.map(skill => (
                <Checkbox
                  key={skill.id}
                  label={skill.label}
                  checked={value.includes(skill.id)}
                  onChange={e => handleSkillChange(skill.id, e.target.checked)}
                  className="text-base font-normal"
                />
              ))}
            </div>
          </CheckboxGroup>
        </div>
      ))}
    </section>
  );
};

export default SkillsSelector;
