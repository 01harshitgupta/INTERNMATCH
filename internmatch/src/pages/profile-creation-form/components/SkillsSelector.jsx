import React from 'react';
import { useLanguage } from '../../../components/ui/Header';
import { CheckboxGroup, Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SkillsSelector = ({ value, onChange, error }) => {
  const { currentLanguage } = useLanguage();

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
        category: 'व्यावसायिक कौशल',
        icon: 'Briefcase',
        skills: [
          { id: 'sales', label: 'बिक्री और ग्राहक सेवा' },
          { id: 'marketing', label: 'मार्केटिंग और ब्रांड प्रबंधन' },
          { id: 'finance', label: 'वित्त और लेखांकन' },
          { id: 'hr', label: 'मानव संसाधन' },
          { id: 'project-mgmt', label: 'परियोजना प्रबंधन' },
          { id: 'business-analysis', label: 'व्यावसायिक विश्लेषण' }
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
      description: 'Select all skills that apply to you',
      selectAll: 'Select All',
      clearAll: 'Clear All'
    },
    hi: {
      title: 'कौशल और विशेषज्ञता',
      description: 'अपने सभी कौशल चुनें',
      selectAll: 'सभी चुनें',
      clearAll: 'सभी साफ़ करें'
    }
  };

  const currentTranslations = translations?.[currentLanguage] || translations?.en;
  const categories = skillCategories?.[currentLanguage] || skillCategories?.en;

  const handleSkillChange = (skillId, checked) => {
    if (checked) {
      onChange([...value, skillId]);
    } else {
      onChange(value?.filter(id => id !== skillId));
    }
  };

  const handleSelectAll = () => {
    const allSkills = categories?.flatMap(cat => cat?.skills?.map(skill => skill?.id));
    onChange(allSkills);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} color="var(--color-secondary)" />
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
        
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-xs text-primary hover:text-primary/80 transition-smooth px-2 py-1 rounded min-h-44"
          >
            {currentTranslations?.selectAll}
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-muted-foreground hover:text-foreground transition-smooth px-2 py-1 rounded min-h-44"
          >
            {currentTranslations?.clearAll}
          </button>
        </div>
      </div>
      {error && (
        <div className="text-sm text-error bg-error/10 px-3 py-2 rounded-md">
          {error}
        </div>
      )}
      <div className="space-y-6">
        {categories?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name={category?.icon} size={18} color="var(--color-primary)" />
              <h4 className="font-medium text-foreground">{category?.category}</h4>
            </div>
            
            <CheckboxGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category?.skills?.map((skill) => (
                  <Checkbox
                    key={skill?.id}
                    label={skill?.label}
                    checked={value?.includes(skill?.id)}
                    onChange={(e) => handleSkillChange(skill?.id, e?.target?.checked)}
                    className="text-sm"
                  />
                ))}
              </div>
            </CheckboxGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSelector;