import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from './Header';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const breadcrumbMap = {
    '/profile-creation-form': {
      title: t('profileSetup'),
      parent: null,
    },
    '/internship-recommendations': {
      title: t('yourMatches'),
      parent: {
        path: '/profile-creation-form',
        title: t('profileSetup'),
      },
    },
  };

  const currentBreadcrumb = breadcrumbMap?.[location?.pathname];

  if (!currentBreadcrumb) {
    return null;
  }

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav
      className="flex items-center space-x-2 text-sm text-muted-foreground mb-6"
      aria-label="Breadcrumb"
    >
      {/* Home/Root */}
      <button
        onClick={() => handleNavigate('/profile-creation-form')}
        className="flex items-center hover:text-foreground transition-colors duration-200 min-h-44 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
      >
        <Icon name="Home" size={16} className="mr-1" aria-hidden="true" />
        <span className="hidden sm:inline">{t('brandName')}</span>
      </button>

      {/* Parent Breadcrumb */}
      {currentBreadcrumb?.parent && (
        <>
          <Icon
            name="ChevronRight"
            size={14}
            className="text-border"
            aria-hidden="true"
          />
          <button
            onClick={() => handleNavigate(currentBreadcrumb.parent.path)}
            className="hover:text-foreground transition-colors duration-200 min-h-44 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
          >
            {currentBreadcrumb.parent.title}
          </button>
        </>
      )}

      {/* Current Page */}
      <Icon
        name="ChevronRight"
        size={14}
        className="text-border"
        aria-hidden="true"
      />
      <span
        className="text-foreground font-medium"
        aria-current="page"
      >
        {currentBreadcrumb.title}
      </span>
    </nav>
  );
};

export default Breadcrumb;
