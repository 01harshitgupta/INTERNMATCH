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

  const getText = (key) => translations?.[currentLanguage]?.[key] || translations?.en?.[key];

  const formatStipend = (amount) => {
    if (amount === 0) return getText('unpaid');
    if (currentLanguage === 'hi') {
      return `₹${amount?.toLocaleString('hi-IN')}${getText('perMonth')}`;
    }
    return `₹${amount?.toLocaleString('en-IN')}${getText('perMonth')}`;
  };

  const getSectorIcon = (sector) => {
    const iconMap = {
      'Technology': 'Code',
      'Marketing': 'Megaphone',
      'Finance': 'DollarSign',
      'Healthcare': 'Heart',
      'Education': 'BookOpen',
      'Design': 'Palette',
      'Sales': 'TrendingUp',
      'HR': 'Users',
      'Operations': 'Settings',
      'Research': 'Search'
    };
    return iconMap?.[sector] || 'Briefcase';
  };

  const getLocationTypeIcon = (type) => {
    const iconMap = {
      'Remote': 'Wifi',
      'Hybrid': 'MapPin',
      'On-site': 'Building'
    };
    return iconMap?.[type] || 'MapPin';
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 75) return 'text-warning bg-warning/10';
    return 'text-accent bg-accent/10';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft hover:shadow-prominent transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={getSectorIcon(internship?.sector)} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth">
                {internship?.role}
              </h3>
              <p className="text-sm text-muted-foreground">{internship?.company}</p>
            </div>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(internship?.matchScore)}`}>
          {internship?.matchScore}% {getText('matchScore')}
        </div>
      </div>
      {/* Key Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Location */}
        <div className="flex items-center gap-2">
          <Icon name={getLocationTypeIcon(internship?.locationType)} size={16} className="text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">{getText('location')}</p>
            <p className="text-xs text-muted-foreground">
              {internship?.location} • {getText(internship?.locationType?.toLowerCase())}
            </p>
          </div>
        </div>

        {/* Stipend */}
        <div className="flex items-center gap-2">
          <Icon name="IndianRupee" size={16} className="text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">{getText('stipend')}</p>
            <p className="text-xs text-success font-semibold">
              {formatStipend(internship?.stipend)}
            </p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">{getText('duration')}</p>
            <p className="text-xs text-muted-foreground">
              {internship?.duration} {getText('months')}
            </p>
          </div>
        </div>

        {/* Application Deadline */}
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Deadline</p>
            <p className="text-xs text-muted-foreground">
              {new Date(internship.deadline)?.toLocaleDateString(
                currentLanguage === 'hi' ? 'hi-IN' : 'en-IN',
                { day: '2-digit', month: '2-digit', year: 'numeric' }
              )}
            </p>
          </div>
        </div>
      </div>
      {/* Required Skills */}
      <div className="mb-4">
        <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
          <Icon name="Zap" size={14} />
          {getText('requiredSkills')}
        </p>
        <div className="flex flex-wrap gap-2">
          {internship?.requiredSkills?.slice(0, 6)?.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md border"
            >
              {skill}
            </span>
          ))}
          {internship?.requiredSkills?.length > 6 && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
              +{internship?.requiredSkills?.length - 6} more
            </span>
          )}
        </div>
      </div>
      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {internship?.description}
      </p>
      {/* Apply Button */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Icon name="Users" size={12} />
            {internship?.applicants} applied
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Eye" size={12} />
            Posted {internship?.postedDaysAgo} days ago
          </span>
        </div>
        
        <Button
          variant="default"
          size="sm"
          onClick={() => onApply(internship)}
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={14}
          className="min-h-44"
        >
          {getText('applyNow')}
        </Button>
      </div>
    </div>
  );
};

export default InternshipCard;