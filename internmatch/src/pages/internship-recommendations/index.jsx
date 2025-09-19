import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '../../components/ui/Header';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import Breadcrumb from '../../components/ui/Breadcrumb';

import Button from '../../components/ui/Button';
import RecommendationHeader from './components/RecommendationHeader';
import InternshipCard from './components/InternshipCard';
import FilterSidebar from './components/FilterSidebar';
import EmptyState from './components/EmptyState';

const InternshipRecommendationsContent = () => {
  const { currentLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    stipendRange: [],
    location: [],
    sector: [],
    duration: [],
    workType: [],
  });

  const mockInternships = [
    {
      id: 1,
      role: "Frontend Developer Intern",
      company: "TechCorp Solutions",
      location: "Mumbai",
      locationType: "Hybrid",
      stipend: 15000,
      duration: 6,
      sector: "Technology",
      requiredSkills: ["React", "JavaScript", "HTML", "CSS", "Git", "Responsive Design"],
      matchScore: 95,
      description:
        `Join our dynamic frontend team to build modern web applications using React and JavaScript. You'll work on real projects that impact thousands of users while learning industry best practices.\n\nThis internship offers hands-on experience with cutting-edge technologies and mentorship from senior developers.`,
      applicants: 45,
      postedDaysAgo: 3,
      deadline: "2025-10-15",
      applyUrl: "https://techcorp.com/apply/frontend-intern"
    },
    // ... add other internships as needed for mock data
  ];

  const [filteredInternships, setFilteredInternships] = useState(mockInternships);

  // Filter and sort internships
  useEffect(() => {
    let filtered = [...mockInternships];

    // Apply various filters
    if (filters?.stipendRange?.length > 0) {
      filtered = filtered.filter(internship => filters.stipendRange.some(range => {
        switch (range) {
          case 'unpaid': return internship.stipend === 0;
          case 'upTo5k': return internship.stipend > 0 && internship.stipend <= 5000;
          case 'upTo10k': return internship.stipend > 5000 && internship.stipend <= 10000;
          case 'upTo20k': return internship.stipend > 10000 && internship.stipend <= 20000;
          case 'above20k': return internship.stipend > 20000;
          default: return true;
        }
      }));
    }
    if (filters?.location?.length > 0) {
      filtered = filtered.filter(internship => filters.location.includes(internship.location));
    }
    if (filters?.sector?.length > 0) {
      filtered = filtered.filter(internship => filters.sector.includes(internship.sector));
    }
    if (filters?.workType?.length > 0) {
      filtered = filtered.filter(internship => filters.workType.includes(internship.locationType.toLowerCase()));
    }
    if (filters?.duration?.length > 0) {
      filtered = filtered.filter(internship => filters.duration.some(range => {
        switch (range) {
          case '1-3': return internship.duration >= 1 && internship.duration <= 3;
          case '3-6': return internship.duration > 3 && internship.duration <= 6;
          case '6+': return internship.duration > 6;
          default: return true;
        }
      }));
    }

    // Sorting
    switch (sortBy) {
      case 'relevance':
        filtered.sort((a, b) => b.matchScore - a.matchScore);
        break;
      case 'stipend':
        filtered.sort((a, b) => b.stipend - a.stipend);
        break;
      case 'deadline':
        filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        break;
      case 'posted':
        filtered.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        break;
      default:
        break;
    }

    setFilteredInternships(filtered);
  }, [filters, sortBy]);

  const handleRefineSearch = () => {
    navigate('/career-pathway');
  };

  const handleApply = (internship) => {
    window.open(internship.applyUrl, '_blank');
  };

  const handleClearFilters = () => {
    setFilters({
      stipendRange: [],
      location: [],
      sector: [],
      duration: [],
      workType: [],
    });
  };

  const sortOptions = [
    { value: 'relevance', label: t('relevance') },
    { value: 'stipend', label: t('stipend') },
    { value: 'deadline', label: t('deadline') },
    { value: 'posted', label: t('posted') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <ProgressIndicator />
      <main className="pt-28 sm:pt-32 lg:pt-36">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <Breadcrumb />

          <RecommendationHeader
            matchCount={filteredInternships.length}
            onRefineSearch={handleRefineSearch}
          />

          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-80 flex-shrink-0">
              <FilterSidebar
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                onFiltersChange={setFilters}
              />
            </aside>

            <section className="flex-1">
              {/* Controls */}
              <div className="flex items-center justify-between mb-6 p-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFilterOpen(true)}
                    iconName="Filter"
                    iconPosition="left"
                    className="lg:hidden min-h-44"
                  >
                    {t('showFilters')}
                  </Button>

                  <div className="text-sm text-gray-600">
                    {t('showing')} {filteredInternships.length} {t('of')} {mockInternships.length} {t('results')}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="sortSelect" className="sr-only">{t('sortBy')}</label>
                  <select
                    id="sortSelect"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 min-h-44 shadow-sm"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results */}
              {filteredInternships.length > 0 ? (
                <div className="space-y-6">
                  {filteredInternships.map(internship => (
                    <InternshipCard
                      key={internship.id}
                      internship={internship}
                      onApply={handleApply}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  onRefineSearch={handleRefineSearch}
                  onClearFilters={handleClearFilters}
                />
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

const InternshipRecommendations = () => {
  return (
    <LanguageProvider>
      <InternshipRecommendationsContent />
    </LanguageProvider>
  );
};

export default InternshipRecommendations;
