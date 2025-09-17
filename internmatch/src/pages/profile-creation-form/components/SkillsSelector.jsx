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
    const allSkillIds = categories.flatMap(category => category.skills.map(skill => skill.id));
    onChange(allSkillIds);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <section aria-labelledby={`${groupId}-label`} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center rounded-lg">
            <Icon name="Zap" size={20} aria-hidden="true" />
          </div>
          <div>
            <h3 id={`${groupId}-label`} className="text-lg font-semibold text-foreground">{currentStrings.title}</h3>
            <p className="text-sm text-muted-foreground">{currentStrings.description}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-xs text-primary hover:text-primary/80 px-2 py-1 rounded"
          >
            {currentStrings.selectAll}
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded"
          >
            {currentStrings.clearAll}
          </button>
        </div>
      </div>
      {error && <div className="text-sm text-error bg-error/10 p-3 rounded">{error}</div>}
      {categories.map((category, idx) => (
        <div key={category.category} className="bg-card border border-border p-4 rounded mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name={category.icon} size={18} aria-hidden="true" />
            <h4 className="font-medium text-foreground">{category.category}</h4>
          </div>
          <CheckboxGroup>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.skills.map(skill => (
                <Checkbox
                  key={skill.id}
                  label={skill.label}
                  checked={value.includes(skill.id)}
                  onChange={e => handleSkillChange(skill.id, e.target.checked)}
                  className="text-sm"
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
