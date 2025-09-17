import React from 'react';
import { useLanguage } from '../../../components/ui/Header';
import Icon from '../../../components/AppIcon';

const RecommendationHeader = ({ matchCount, onRefineSearch }) => {
  const { t, currentLanguage } = useLanguage();

  const translations = {
    en: {
      title: "Your Personalized Internship Matches",
      subtitle: "Based on your profile, location, skills, and sector preferences",
      matchesFound: "matches found for you",
      refineSearch: "Refine Search",
      howMatching: "How we match you:",
      locationMatch: "Location preference alignment",
      skillsMatch: "Skills and experience match",
      educationMatch: "Education level compatibility",
      sectorMatch: "Sector interest alignment",
    },
    hi: {
      title: "आपके व्यक्तिगत इंटर्नशिप मैच",
      subtitle: "आपकी प्रोफाइल, स्थान, कौशल और क्षेत्र की प्राथमिकताओं के आधार पर",
      matchesFound: "मैच आपके लिए मिले",
      refineSearch: "खोज सुधारें",
      howMatching: "हम आपको कैसे मैच करते हैं:",
      locationMatch: "स्थान प्राथमिकता संरेखण",
      skillsMatch: "कौशल और अनुभव मैच",
      educationMatch: "शिक्षा स्तर संगतता",
      sectorMatch: "क्षेत्र रुचि संरेखण",
    }
  };

  const getText = (key) =>
    translations?.[currentLanguage]?.[key] || translations.en[key];

  return (
    <section
      className="bg-card rounded-lg border border-border p-6 mb-6 shadow-soft"
      aria-label={getText('title')}
    >
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            {getText('title')}
          </h1>
          <p className="text-muted-foreground text-sm lg:text-base">{getText('subtitle')}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center" aria-live="polite">
            <div className="text-2xl font-bold text-primary">{matchCount}</div>
            <div className="text-xs text-muted-foreground">{getText('matchesFound')}</div>
          </div>

          <button
            onClick={onRefineSearch}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors min-h-44"
            aria-label={getText('refineSearch')}
          >
            <Icon name="Settings" size={16} aria-hidden="true" />
            <span className="text-sm font-medium">{getText('refineSearch')}</span>
          </button>
        </div>
      </header>

      {/* Matching Criteria Explanation */}
      <div className="bg-muted/50 rounded-lg p-4" aria-label={getText('howMatching')}>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="Target" size={16} className="text-primary" aria-hidden="true" />
          {getText('howMatching')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="MapPin" size={14} className="text-accent" aria-hidden="true" />
            <span>{getText('locationMatch')}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="Zap" size={14} className="text-warning" aria-hidden="true" />
            <span>{getText('skillsMatch')}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="GraduationCap" size={14} className="text-success" aria-hidden="true" />
            <span>{getText('educationMatch')}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="Building" size={14} className="text-secondary" aria-hidden="true" />
            <span>{getText('sectorMatch')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationHeader;
