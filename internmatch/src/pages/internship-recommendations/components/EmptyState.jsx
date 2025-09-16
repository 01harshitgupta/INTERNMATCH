import React from 'react';
import { useLanguage } from '../../../components/ui/Header';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onRefineSearch, onClearFilters }) => {
  const { currentLanguage } = useLanguage();

  const translations = {
    en: {
      noMatches: "No Internships Found",
      noMatchesDesc: "We couldn\'t find any internships matching your current criteria. Try adjusting your preferences or clearing some filters.",
      suggestions: "Suggestions:",
      expandLocation: "Expand your location preferences",
      adjustSkills: "Consider related skills or broader categories",
      increaseStipend: "Adjust stipend expectations",
      tryDifferentSector: "Explore different sectors",
      refineProfile: "Refine Your Profile",
      clearFilters: "Clear All Filters",
      browseAll: "Browse All Internships"
    },
    hi: {
      noMatches: "कोई इंटर्नशिप नहीं मिली",
      noMatchesDesc: "हमें आपके वर्तमान मानदंडों से मेल खाने वाली कोई इंटर्नशिप नहीं मिली। अपनी प्राथमिकताओं को समायोजित करने या कुछ फिल्टर साफ़ करने का प्रयास करें।",
      suggestions: "सुझाव:",
      expandLocation: "अपनी स्थान प्राथमिकताओं का विस्तार करें",
      adjustSkills: "संबंधित कौशल या व्यापक श्रेणियों पर विचार करें",
      increaseStipend: "वेतन अपेक्षाओं को समायोजित करें",
      tryDifferentSector: "विभिन्न क्षेत्रों का अन्वेषण करें",
      refineProfile: "अपनी प्रोफाइल सुधारें",
      clearFilters: "सभी फिल्टर साफ़ करें",
      browseAll: "सभी इंटर्नशिप ब्राउज़ करें"
    }
  };

  const getText = (key) => translations?.[currentLanguage]?.[key] || translations?.en?.[key];

  const suggestions = [
    { icon: 'MapPin', text: getText('expandLocation') },
    { icon: 'Zap', text: getText('adjustSkills') },
    { icon: 'IndianRupee', text: getText('increaseStipend') },
    { icon: 'Building', text: getText('tryDifferentSector') }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Illustration */}
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="Search" size={40} className="text-muted-foreground" />
      </div>
      {/* Title and Description */}
      <h2 className="text-2xl font-semibold text-foreground mb-3">
        {getText('noMatches')}
      </h2>
      <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
        {getText('noMatchesDesc')}
      </p>
      {/* Suggestions */}
      <div className="w-full max-w-lg mb-8">
        <h3 className="text-sm font-medium text-foreground mb-4 text-left">
          {getText('suggestions')}
        </h3>
        <div className="space-y-3">
          {suggestions?.map((suggestion, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={suggestion?.icon} size={16} className="text-primary" />
              </div>
              <span className="text-sm text-muted-foreground text-left">
                {suggestion?.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <Button
          variant="default"
          onClick={onRefineSearch}
          iconName="Settings"
          iconPosition="left"
          fullWidth
          className="min-h-44"
        >
          {getText('refineProfile')}
        </Button>
        <Button
          variant="outline"
          onClick={onClearFilters}
          iconName="X"
          iconPosition="left"
          fullWidth
          className="min-h-44"
        >
          {getText('clearFilters')}
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;