import React, { useState, useContext, useEffect, useRef } from 'react';
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

  useEffect(() => {
    localStorage.setItem('internmatch-language', currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  const translations = {
    en: {
      brandName: 'InternMatch',
      profileSetup: 'Profile Setup',
      yourMatches: 'Your Matches',
      language: 'Language',
      english: 'English',
      hindi: 'हिंदी',
      menu: 'Menu',
    },
    hi: {
      brandName: 'इंटर्नमैच',
      profileSetup: 'प्रोफ़ाइल सेटअप',
      yourMatches: 'आपके मैच',
      language: 'भाषा',
      english: 'English',
      hindi: 'हिंदी',
      menu: 'मेन्यू',
    },
  };

  const t = (key) => translations[currentLanguage]?.[key] || key;

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
  const languageToggleRef = useRef(null);
  const userMenuRef = useRef(null);

  const languages = [
    { code: 'en', name: t('english'), flag: '🇺🇸' },
    { code: 'hi', name: t('hindi'), flag: '🇮🇳' },
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

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        languageToggleRef.current && !languageToggleRef.current.contains(event.target)
      ) {
        setIsLanguageOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-blue-600 shadow-lg">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Government Logo */}
        <div
          className="flex items-center cursor-pointer transition-opacity hover:opacity-80"
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter') handleLogoClick(); }}
          aria-label="Go to home page"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center" aria-hidden="true">
              <Icon name="Shield" size={24} color="white" strokeWidth={2} />
            </div>
            <div>
              <span className="text-lg font-bold text-blue-900">
                Government of India
              </span>
              <p className="text-xs text-blue-700">Ministry of Corporate Affairs</p>
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Primary">
          <button
            onClick={() => navigate('/profile-creation-form')}
            className={`text-sm font-semibold transition-colors px-4 py-2 rounded-md ${
              location?.pathname === '/profile-creation-form'
                ? 'text-blue-600 bg-blue-50 border border-blue-200'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
            aria-current={location?.pathname === '/profile-creation-form' ? 'page' : undefined}
          >
            {t('profileSetup')}
          </button>
          <button
            onClick={() => navigate('/internship-recommendations')}
            className={`text-sm font-semibold transition-colors px-4 py-2 rounded-md ${
              location?.pathname === '/internship-recommendations'
                ? 'text-blue-600 bg-blue-50 border border-blue-200'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
            aria-current={location?.pathname === '/internship-recommendations' ? 'page' : undefined}
          >
            {t('yourMatches')}
          </button>
        </nav>

        {/* User Menu & Language Toggle */}
        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <div className="relative" ref={languageToggleRef}>
            <Button
              variant="ghost"
              size="sm"
              aria-haspopup="true"
              aria-expanded={isLanguageOpen}
              onClick={() => setIsLanguageOpen(prev => !prev)}
              className="flex items-center space-x-2 min-h-44"
            >
              <Icon name="Globe" size={16} aria-hidden="true" />
              <span className="hidden sm:inline text-sm">
                {languages.find(lang => lang.code === currentLanguage)?.name}
              </span>
              <Icon name="ChevronDown" size={14} aria-hidden="true" />
            </Button>

            {isLanguageOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-prominent z-50"
                role="menu"
                aria-label="Select Language"
              >
                <div className="py-2">
                  {languages.map(language => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors min-h-44 ${
                        currentLanguage === language.code
                          ? 'bg-primary/10 text-primary'
                          : 'text-popover-foreground hover:bg-muted'
                      }`}
                      role="menuitemradio"
                      aria-checked={currentLanguage === language.code}
                    >
                      <span className="text-lg" aria-hidden="true">{language.flag}</span>
                      <span>{language.name}</span>
                      {currentLanguage === language.code && (
                        <Icon name="Check" size={16} className="ml-auto" aria-hidden="true" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <Button
              variant="ghost"
              size="sm"
              aria-haspopup="true"
              aria-expanded={isUserMenuOpen}
              onClick={() => setIsUserMenuOpen(prev => !prev)}
              className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-md"
            >
              <div
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
                aria-hidden="true"
              >
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden sm:inline text-sm font-semibold">
                {user?.name || 'User'}
              </span>
              <Icon name="ChevronDown" size={14} aria-hidden="true" />
            </Button>

            {isUserMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                role="menu"
                aria-label="User menu"
              >
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
                    role="menuitem"
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
            onClick={() => {
              // Mobile menu toggle logic
            }}
            aria-label="Toggle menu"
          >
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border bg-card" role="navigation" aria-label="Mobile Navigation">
        <button
          onClick={() => navigate('/profile-creation-form')}
          className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors min-h-44 ${
            location?.pathname === '/profile-creation-form'
              ? 'text-primary bg-primary/10'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-current={location?.pathname === '/profile-creation-form' ? 'page' : undefined}
        >
          <Icon name="User" size={20} className="mb-1" aria-hidden="true" />
          {t('profileSetup')}
        </button>
        <button
          onClick={() => navigate('/internship-recommendations')}
          className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors min-h-44 ${
            location?.pathname === '/internship-recommendations'
              ? 'text-primary bg-primary/10'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-current={location?.pathname === '/internship-recommendations' ? 'page' : undefined}
        >
          <Icon name="Heart" size={20} className="mb-1" aria-hidden="true" />
          {t('yourMatches')}
        </button>
      </div>
    </header>
  );
};

export default Header;
