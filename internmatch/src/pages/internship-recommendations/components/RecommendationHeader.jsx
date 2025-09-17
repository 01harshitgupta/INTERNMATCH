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
      className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 p-6 sm:p-8 mb-6 shadow-xl"
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
            <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">{matchCount}</div>
            <div className="text-xs text-gray-600">{getText('matchesFound')}</div>
          </div>

          <button
            onClick={onRefineSearch}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 min-h-44 shadow-lg hover:shadow-xl"
            aria-label={getText('refineSearch')}
          >
            <Icon name="Settings" size={16} aria-hidden="true" />
            <span className="text-sm font-semibold">{getText('refineSearch')}</span>
          </button>
        </div>
      </header>

      {/* Matching Criteria Explanation */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/30" aria-label={getText('howMatching')}>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="Target" size={16} className="text-indigo-600" aria-hidden="true" />
          {getText('howMatching')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Icon name="MapPin" size={14} className="text-purple-600" aria-hidden="true" />
            <span>{getText('locationMatch')}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Icon name="Zap" size={14} className="text-yellow-500" aria-hidden="true" />
            <span>{getText('skillsMatch')}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Icon name="GraduationCap" size={14} className="text-green-600" aria-hidden="true" />
            <span>{getText('educationMatch')}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Icon name="Building" size={14} className="text-indigo-600" aria-hidden="true" />
            <span>{getText('sectorMatch')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationHeader;
