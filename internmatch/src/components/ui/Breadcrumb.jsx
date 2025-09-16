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
      parent: null
    },
    '/internship-recommendations': {
      title: t('yourMatches'),
      parent: {
        path: '/profile-creation-form',
        title: t('profileSetup')
      }
    }
  };

  const currentBreadcrumb = breadcrumbMap?.[location?.pathname];

  if (!currentBreadcrumb) {
    return null;
  }

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {/* Home/Root */}
      <button
        onClick={() => handleNavigate('/profile-creation-form')}
        className="flex items-center hover:text-foreground transition-smooth min-h-44 px-2 py-1 rounded"
      >
        <Icon name="Home" size={16} className="mr-1" />
        <span className="hidden sm:inline">{t('brandName')}</span>
      </button>
      {/* Parent Breadcrumb */}
      {currentBreadcrumb?.parent && (
        <>
          <Icon name="ChevronRight" size={14} className="text-border" />
          <button
            onClick={() => handleNavigate(currentBreadcrumb?.parent?.path)}
            className="hover:text-foreground transition-smooth min-h-44 px-2 py-1 rounded"
          >
            {currentBreadcrumb?.parent?.title}
          </button>
        </>
      )}
      {/* Current Page */}
      <Icon name="ChevronRight" size={14} className="text-border" />
      <span className="text-foreground font-medium">
        {currentBreadcrumb?.title}
      </span>
    </nav>
  );
};

export default Breadcrumb;