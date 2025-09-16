import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const LanguageContext = React.createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('internmatch-language') || 'en';
  });

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('internmatch-language', language);
  };

  const translations = {
    en: {
      brandName: 'InternMatch',
      profileSetup: 'Profile Setup',
      yourMatches: 'Your Matches',
      language: 'Language',
      english: 'English',
      hindi: 'हिंदी',
      menu: 'Menu'
    },
    hi: {
      brandName: 'इंटर्नमैच',
      profileSetup: 'प्रोफाइल सेटअप',
      yourMatches: 'आपके मैच',
      language: 'भाषा',
      english: 'English',
      hindi: 'हिंदी',
      menu: 'मेन्यू'
    }
  };

  const t = (key) => translations?.[currentLanguage]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const Header = () => {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const languages = [
    { code: 'en', name: t('english'), flag: '🇺🇸' },
    { code: 'hi', name: t('hindi'), flag: '🇮🇳' }
  ];

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    setIsLanguageOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/profile-creation-form');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer transition-smooth hover:opacity-80"
          onClick={handleLogoClick}
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Briefcase" size={20} color="white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-foreground">
              {t('brandName')}
            </span>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => navigate('/profile-creation-form')}
            className={`text-sm font-medium transition-smooth px-3 py-2 rounded-md min-h-44 ${
              location?.pathname === '/profile-creation-form'
                ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {t('profileSetup')}
          </button>
          <button
            onClick={() => navigate('/internship-recommendations')}
            className={`text-sm font-medium transition-smooth px-3 py-2 rounded-md min-h-44 ${
              location?.pathname === '/internship-recommendations' ?'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {t('yourMatches')}
          </button>
        </nav>

        {/* Language Toggle */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="flex items-center space-x-2 min-h-44"
          >
            <Icon name="Globe" size={16} />
            <span className="hidden sm:inline text-sm">
              {languages?.find(lang => lang?.code === currentLanguage)?.name}
            </span>
            <Icon name="ChevronDown" size={14} />
          </Button>

          {/* Language Dropdown */}
          {isLanguageOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-prominent z-50">
              <div className="py-2">
                {languages?.map((language) => (
                  <button
                    key={language?.code}
                    onClick={() => handleLanguageChange(language?.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-smooth min-h-44 ${
                      currentLanguage === language?.code
                        ? 'bg-primary/10 text-primary' :'text-popover-foreground hover:bg-muted'
                    }`}
                  >
                    <span className="text-lg">{language?.flag}</span>
                    <span>{language?.name}</span>
                    {currentLanguage === language?.code && (
                      <Icon name="Check" size={16} className="ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="min-h-44"
            onClick={() => {/* Mobile menu toggle logic */}}
          >
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border bg-card">
        <nav className="flex">
          <button
            onClick={() => navigate('/profile-creation-form')}
            className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-smooth min-h-44 ${
              location?.pathname === '/profile-creation-form'
                ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="User" size={20} className="mb-1" />
            {t('profileSetup')}
          </button>
          <button
            onClick={() => navigate('/internship-recommendations')}
            className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-smooth min-h-44 ${
              location?.pathname === '/internship-recommendations' ?'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Heart" size={20} className="mb-1" />
            {t('yourMatches')}
          </button>
        </nav>
      </div>
      {/* Click outside to close language dropdown */}
      {isLanguageOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsLanguageOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;