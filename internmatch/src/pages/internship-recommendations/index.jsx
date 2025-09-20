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

  // Auto-use profile data from localStorage (set on profile setup)
  const [userProfile, setUserProfile] = useState({ Skills: '', LocationPreference: '' });
  const [hasSearched, setHasSearched] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  // On mount, load profile from localStorage and auto-search
  useEffect(() => {
    const stored = localStorage.getItem('internmatch-profile');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const skills = Array.isArray(parsed.skills) ? parsed.skills.join(' ') : '';
        setUserProfile({
          Skills: skills,
          LocationPreference: parsed.location || '',
        });
        // Only auto-search if skills are present
        if (skills && skills.trim().length > 0) {
          setHasSearched(true);
          setShowPrompt(false);
        } else {
          setHasSearched(false);
          setShowPrompt(true);
        }
      } catch {
        setShowPrompt(true);
      }
    } else {
      setShowPrompt(true);
    }
  }, []);

  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch recommendations from backend
  useEffect(() => {
    if (!hasSearched || !userProfile.Skills) return;
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userProfile),
        });
        if (!response.ok) throw new Error('Failed to fetch recommendations');
        const data = await response.json();
        // Map backend fields to frontend format
        const mapped = (data.recommendations || []).map((item, idx) => ({
          id: item.InternshipID || idx,
          role: item.Title,
          company: item.Company,
          location: item.Location,
          stipend: item.Stipend,
          matchScore: Math.round(item.Score * 100),
          description: item.Reason,
          applyUrl: '#', // Placeholder, update if available
        }));
        setInternships(mapped);
        setFilteredInternships(mapped);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [userProfile, hasSearched]);

  // Filter and sort internships (keep this logic, but use real data)
  useEffect(() => {
    let filtered = [...internships];
    // Apply various filters (same as before, but only if the field exists)
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
    // sector, workType, duration filters can be added if those fields are available in the backend response
    // Sorting
    switch (sortBy) {
      case 'relevance':
        filtered.sort((a, b) => b.matchScore - a.matchScore);
        break;
      case 'stipend':
        filtered.sort((a, b) => b.stipend - a.stipend);
        break;
      default:
        break;
    }
    setFilteredInternships(filtered);
  }, [filters, sortBy, internships]);

  // Remove form and recommend button, just show recommendations for profile
  const handleRefineSearch = () => {
    navigate('/profile-creation-form');
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-indigo-100">
      <Header />
      <ProgressIndicator />
      <main className="pt-28 sm:pt-32 lg:pt-36">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <Breadcrumb />
          <RecommendationHeader
            matchCount={filteredInternships.length}
            onRefineSearch={handleRefineSearch}
          />
          {showPrompt ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-2xl font-semibold text-gray-700 mb-4">Select your skills to see internship recommendations</div>
              <Button onClick={() => navigate('/profile-creation-form')} variant="primary">
                Go to Profile Setup
              </Button>
            </div>
          ) : (
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
                      {t('showing')} {filteredInternships.length} {t('of')} {internships.length} {t('results')}
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
                {/* Loading/Error States */}
                {loading ? (
                  <div className="text-center py-10 text-lg text-gray-500">Loading recommendations...</div>
                ) : error ? (
                  <div className="text-center py-10 text-lg text-red-500">{error}</div>
                ) : filteredInternships.length > 0 ? (
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
          )}
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
