import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../contexts/AuthContext';

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
  const { user, logout } = useAuth();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
    navigate('/');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-blue-600 shadow-lg">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Government Logo */}
        <div 
          className="flex items-center cursor-pointer transition-smooth hover:opacity-80"
          onClick={handleLogoClick}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
              <Icon name="Shield" size={24} color="white" strokeWidth={2} />
            </div>
            <div>
              <span className="text-lg font-bold text-blue-900">
                Government of India
              </span>
              <p className="text-xs text-blue-700">Ministry of Education</p>
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => navigate('/profile-creation-form')}
            className={`text-sm font-semibold transition-smooth px-4 py-2 rounded-md ${
              location?.pathname === '/profile-creation-form'
                ? 'text-blue-600 bg-blue-50 border border-blue-200' :'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            {t('profileSetup')}
          </button>
          <button
            onClick={() => navigate('/internship-recommendations')}
            className={`text-sm font-semibold transition-smooth px-4 py-2 rounded-md ${
              location?.pathname === '/internship-recommendations' ?'text-blue-600 bg-blue-50 border border-blue-200' :'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            {t('yourMatches')}
          </button>
        </nav>

        {/* User Menu & Language Toggle */}
        <div className="flex items-center space-x-2">
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

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-md"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden sm:inline text-sm font-semibold">
                {user?.name || 'User'}
              </span>
              <Icon name="ChevronDown" size={14} />
            </Button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <div className="px-4 py-3 border-b border-gray-200 bg-blue-50">
                    <p className="text-sm font-semibold text-blue-900">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-blue-700">
                      {user?.role || 'Government Official'}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
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
      {/* Click outside to close dropdowns */}
      {(isLanguageOpen || isUserMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsLanguageOpen(false);
            setIsUserMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;