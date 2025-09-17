import React from 'react';
import { useLanguage } from '../../../components/ui/Header';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InternshipCard = ({ internship, onApply }) => {
  const { currentLanguage } = useLanguage();

  const translations = {
    en: {
      applyNow: "Apply Now",
      stipend: "Stipend",
      duration: "Duration",
      location: "Location",
      requiredSkills: "Required Skills",
      matchScore: "Match Score",
      remote: "Remote",
      hybrid: "Hybrid",
      onsite: "On-site",
      months: "months",
      perMonth: "/month",
      unpaid: "Unpaid"
    },
    hi: {
      applyNow: "अभी आवेदन करें",
      stipend: "वेतन",
      duration: "अवधि",
      location: "स्थान",
      requiredSkills: "आवश्यक कौशल",
      matchScore: "मैच स्कोर",
      remote: "रिमोट",
      hybrid: "हाइब्रिड",
      onsite: "ऑन-साइट",
      months: "महीने",
      perMonth: "/महीना",
      unpaid: "अवैतनिक"
    }
  };

  const getText = (key) =>
    translations?.[currentLanguage]?.[key] ?? translations.en[key];

  const formatStipend = (amount) => {
    if (amount === 0) return getText('unpaid');
    const locale = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    return `₹${amount.toLocaleString(locale)}${getText('perMonth')}`;
  };

  const sectorIconMap = {
    Technology: 'Code',
    Marketing: 'Megaphone',
    Finance: 'DollarSign',
    Healthcare: 'Heart',
    Education: 'BookOpen',
    Design: 'Palette',
    Sales: 'TrendingUp',
    HR: 'Users',
    Operations: 'Settings',
    Research: 'Search'
  };

  const locationTypeIconMap = {
    Remote: 'Wifi',
    Hybrid: 'MapPin',
    Onsite: 'Building'
  };

  const getSectorIcon = (sector) => sectorIconMap[sector] || 'Briefcase';
  const getLocationTypeIcon = (type) => locationTypeIconMap[type] || 'MapPin';

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 75) return 'text-warning bg-warning/10';
    return 'text-accent bg-accent/10';
  };

  return (
    <article className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 p-6 shadow-xl hover:shadow-2xl transition-shadow" tabIndex={0} aria-label={`${internship.role} at ${internship.company}`}>
      {/* Header */}
      <header className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={getSectorIcon(internship.sector)} size={20} className="text-primary" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{internship.role}</h3>
              <p className="text-sm text-muted-foreground">{internship.company}</p>
            </div>
          </div>
        </div>
        <div className={`rounded-full px-3 py-1 text-xs font-medium ${getMatchScoreColor(internship.matchScore)}`}>
          {internship.matchScore}% {getText('matchScore')}
        </div>
      </header>

      {/* Details */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Location */}
          <div className="flex items-center gap-2">
          <Icon name={getLocationTypeIcon(internship.locationType)} size={16} className="text-muted-foreground" aria-hidden="true"/>
          <div>
            <p className="text-sm font-medium text-foreground">{getText('location')}</p>
            <p className="text-xs text-muted-foreground">{internship.location} • {getText(internship.locationType.toLowerCase())}</p>
          </div>
        </div>

        {/* Stipend */}
        <div className="flex items-center gap-2">
          <Icon name="IndianRupee" size={16} className="text-muted-foreground" aria-hidden="true"/>
          <div>
            <p className="text-sm font-medium text-foreground">{getText('stipend')}</p>
            <p className="text-xs text-success font-semibold">{formatStipend(internship.stipend)}</p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" aria-hidden="true"/>
          <div>
            <p className="text-sm font-medium text-foreground">{getText('duration')}</p>
            <p className="text-xs text-muted-foreground">{internship.duration} {getText('months')}</p>
          </div>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" aria-hidden="true"/>
          <div>
            <p className="text-sm font-medium text-foreground">Deadline</p>
            <p className="text-xs text-muted-foreground">
              {new Date(internship.deadline).toLocaleDateString(currentLanguage === 'hi' ? 'hi-IN' : 'en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-4">
        <p className="text-sm font-semibold flex items-center gap-2">
          <Icon name="Zap" size={14} aria-hidden="true" />
          {getText('requiredSkills')}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {internship.requiredSkills.slice(0, 6).map((skill, idx) => (
            <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded border border-indigo-100">
              {skill}
            </span>
          ))}
          {internship.requiredSkills.length > 6 && (
            <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded border border-purple-100">
              +{internship.requiredSkills.length - 6} more
            </span>
          )}
        </div>
      </section>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{internship.description}</p>

      {/* Footer */}
      <footer className="flex items-center justify-between pt-4 border-t border-white/30">
        <div className="text-xs text-muted-foreground flex gap-4">
          <span className="flex items-center gap-1">
            <Icon name="Users" size={12} aria-hidden="true" /> {internship.applicants} applied
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Eye" size={12} aria-hidden="true" /> Posted {internship.postedDaysAgo} days ago
          </span>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={() => onApply(internship)}
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={14}
          className="min-h-44 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg hover:shadow-xl"
        >
          {getText('applyNow')}
        </Button>
      </footer>
    </article>
  );
};

export default InternshipCard;
