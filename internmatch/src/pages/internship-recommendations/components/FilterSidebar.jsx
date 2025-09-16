import React, { useState } from 'react';
import { useLanguage } from '../../../components/ui/Header';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const { currentLanguage } = useLanguage();
  const [localFilters, setLocalFilters] = useState(filters);

  const translations = {
    en: {
      filters: "Filters",
      clearAll: "Clear All",
      apply: "Apply Filters",
      stipendRange: "Stipend Range",
      location: "Location",
      sector: "Sector",
      duration: "Duration",
      workType: "Work Type",
      remote: "Remote",
      hybrid: "Hybrid",
      onsite: "On-site",
      unpaid: "Unpaid",
      upTo5k: "Up to ₹5,000",
      upTo10k: "₹5,001 - ₹10,000",
      upTo20k: "₹10,001 - ₹20,000",
      above20k: "Above ₹20,000",
      months1to3: "1-3 months",
      months3to6: "3-6 months",
      months6plus: "6+ months"
    },
    hi: {
      filters: "फिल्टर",
      clearAll: "सभी साफ़ करें",
      apply: "फिल्टर लागू करें",
      stipendRange: "वेतन सीमा",
      location: "स्थान",
      sector: "क्षेत्र",
      duration: "अवधि",
      workType: "कार्य प्रकार",
      remote: "रिमोट",
      hybrid: "हाइब्रिड",
      onsite: "ऑन-साइट",
      unpaid: "अवैतनिक",
      upTo5k: "₹5,000 तक",
      upTo10k: "₹5,001 - ₹10,000",
      upTo20k: "₹10,001 - ₹20,000",
      above20k: "₹20,000 से अधिक",
      months1to3: "1-3 महीने",
      months3to6: "3-6 महीने",
      months6plus: "6+ महीने"
    }
  };

  const getText = (key) => translations?.[currentLanguage]?.[key] || translations?.en?.[key];

  const stipendRanges = [
    { id: 'unpaid', label: getText('unpaid') },
    { id: 'upTo5k', label: getText('upTo5k') },
    { id: 'upTo10k', label: getText('upTo10k') },
    { id: 'upTo20k', label: getText('upTo20k') },
    { id: 'above20k', label: getText('above20k') }
  ];

  const workTypes = [
    { id: 'remote', label: getText('remote') },
    { id: 'hybrid', label: getText('hybrid') },
    { id: 'onsite', label: getText('onsite') }
  ];

  const durations = [
    { id: '1-3', label: getText('months1to3') },
    { id: '3-6', label: getText('months3to6') },
    { id: '6+', label: getText('months6plus') }
  ];

  const sectors = [
    'Technology', 'Marketing', 'Finance', 'Healthcare', 
    'Education', 'Design', 'Sales', 'HR', 'Operations', 'Research'
  ];

  const locations = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
    'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow'
  ];

  const handleFilterChange = (category, value, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...(prev?.[category] || []), value]
        : (prev?.[category] || [])?.filter(item => item !== value)
    }));
  };

  const handleClearAll = () => {
    setLocalFilters({
      stipendRange: [],
      location: [],
      sector: [],
      duration: [],
      workType: []
    });
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      {/* Sidebar */}
      <div className={`fixed lg:sticky top-0 right-0 lg:right-auto h-full lg:h-auto w-80 bg-card border-l lg:border-l-0 lg:border border-border z-50 lg:z-auto rounded-none lg:rounded-lg shadow-prominent lg:shadow-soft overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} transition-transform duration-300`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Icon name="Filter" size={20} />
              {getText('filters')}
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-xs"
              >
                {getText('clearAll')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="lg:hidden"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>

          {/* Stipend Range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3">
              {getText('stipendRange')}
            </h3>
            <div className="space-y-2">
              {stipendRanges?.map(range => (
                <Checkbox
                  key={range?.id}
                  label={range?.label}
                  checked={localFilters?.stipendRange?.includes(range?.id) || false}
                  onChange={(e) => handleFilterChange('stipendRange', range?.id, e?.target?.checked)}
                  size="sm"
                />
              ))}
            </div>
          </div>

          {/* Work Type */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3">
              {getText('workType')}
            </h3>
            <div className="space-y-2">
              {workTypes?.map(type => (
                <Checkbox
                  key={type?.id}
                  label={type?.label}
                  checked={localFilters?.workType?.includes(type?.id) || false}
                  onChange={(e) => handleFilterChange('workType', type?.id, e?.target?.checked)}
                  size="sm"
                />
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3">
              {getText('duration')}
            </h3>
            <div className="space-y-2">
              {durations?.map(duration => (
                <Checkbox
                  key={duration?.id}
                  label={duration?.label}
                  checked={localFilters?.duration?.includes(duration?.id) || false}
                  onChange={(e) => handleFilterChange('duration', duration?.id, e?.target?.checked)}
                  size="sm"
                />
              ))}
            </div>
          </div>

          {/* Sector */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3">
              {getText('sector')}
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {sectors?.map(sector => (
                <Checkbox
                  key={sector}
                  label={sector}
                  checked={localFilters?.sector?.includes(sector) || false}
                  onChange={(e) => handleFilterChange('sector', sector, e?.target?.checked)}
                  size="sm"
                />
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3">
              {getText('location')}
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {locations?.map(location => (
                <Checkbox
                  key={location}
                  label={location}
                  checked={localFilters?.location?.includes(location) || false}
                  onChange={(e) => handleFilterChange('location', location, e?.target?.checked)}
                  size="sm"
                />
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <Button
            variant="default"
            fullWidth
            onClick={handleApply}
            className="mt-6"
          >
            {getText('apply')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;