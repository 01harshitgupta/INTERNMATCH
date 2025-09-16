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
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    stipendRange: [],
    location: [],
    sector: [],
    duration: [],
    workType: []
  });

  // Mock internship data
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
      description: `Join our dynamic frontend team to build modern web applications using React and JavaScript. You'll work on real projects that impact thousands of users while learning industry best practices.\n\nThis internship offers hands-on experience with cutting-edge technologies and mentorship from senior developers.`,
      applicants: 45,
      postedDaysAgo: 3,
      deadline: "2025-10-15",
      applyUrl: "https://techcorp.com/apply/frontend-intern"
    },
    {
      id: 2,
      role: "Digital Marketing Intern",
      company: "Creative Agency Hub",
      location: "Delhi",
      locationType: "Remote",
      stipend: 12000,
      duration: 4,
      sector: "Marketing",
      requiredSkills: ["Social Media", "Content Writing", "SEO", "Analytics", "Canva"],
      matchScore: 88,
      description: `Work with our marketing team to create engaging campaigns across digital platforms. Learn about social media strategy, content creation, and performance analytics.\n\nPerfect opportunity for creative minds who want to understand modern digital marketing.`,
      applicants: 67,
      postedDaysAgo: 5,
      deadline: "2025-10-20",
      applyUrl: "https://creativeagency.com/careers/marketing-intern"
    },
    {
      id: 3,
      role: "Data Science Intern",
      company: "Analytics Pro",
      location: "Bangalore",
      locationType: "On-site",
      stipend: 20000,
      duration: 6,
      sector: "Technology",
      requiredSkills: ["Python", "Machine Learning", "SQL", "Statistics", "Pandas", "Jupyter"],
      matchScore: 82,
      description: `Dive into the world of data science with real-world projects involving machine learning and statistical analysis. Work with large datasets and build predictive models.\n\nIdeal for students with strong analytical skills and programming background.`,
      applicants: 89,
      postedDaysAgo: 2,
      deadline: "2025-10-25",
      applyUrl: "https://analyticspro.com/internships/data-science"
    },
    {
      id: 4,
      role: "Graphic Design Intern",
      company: "Design Studio Plus",
      location: "Pune",
      locationType: "Hybrid",
      stipend: 8000,
      duration: 3,
      sector: "Design",
      requiredSkills: ["Adobe Photoshop", "Illustrator", "Figma", "Typography", "Branding"],
      matchScore: 79,
      description: `Create stunning visual designs for various clients including logos, brochures, and digital assets. Learn from experienced designers and build an impressive portfolio.\n\nGreat opportunity to develop creative skills in a professional environment.`,
      applicants: 34,
      postedDaysAgo: 7,
      deadline: "2025-11-01",
      applyUrl: "https://designstudioplus.com/join-us/intern"
    },
    {
      id: 5,
      role: "Finance Analyst Intern",
      company: "FinTech Innovations",
      location: "Hyderabad",
      locationType: "On-site",
      stipend: 18000,
      duration: 5,
      sector: "Finance",
      requiredSkills: ["Excel", "Financial Modeling", "SQL", "PowerBI", "Accounting"],
      matchScore: 76,
      description: `Support our finance team with data analysis, financial modeling, and reporting. Gain exposure to fintech operations and learn about financial markets.\n\nPerfect for commerce and economics students interested in finance careers.`,
      applicants: 52,
      postedDaysAgo: 4,
      deadline: "2025-10-30",
      applyUrl: "https://fintechinnovations.com/careers/finance-intern"
    }
  ];

  const [filteredInternships, setFilteredInternships] = useState(mockInternships);

  const translations = {
    en: {
      sortBy: "Sort by",
      relevance: "Relevance",
      stipend: "Stipend",
      deadline: "Deadline",
      posted: "Recently Posted",
      showFilters: "Filters",
      hideFilters: "Hide Filters",
      results: "results",
      showing: "Showing",
      of: "of"
    },
    hi: {
      sortBy: "इसके अनुसार क्रमबद्ध करें",
      relevance: "प्रासंगिकता",
      stipend: "वेतन",
      deadline: "समय सीमा",
      posted: "हाल ही में पोस्ट किया गया",
      showFilters: "फिल्टर",
      hideFilters: "फिल्टर छुपाएं",
      results: "परिणाम",
      showing: "दिखा रहे हैं",
      of: "का"
    }
  };

  const getText = (key) => translations?.[currentLanguage]?.[key] || translations?.en?.[key];

  // Load language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('internmatch-language');
    if (savedLanguage && savedLanguage !== currentLanguage) {
      // Language will be handled by the LanguageProvider
    }
  }, [currentLanguage]);

  // Filter and sort internships
  useEffect(() => {
    let filtered = [...mockInternships];

    // Apply filters
    if (filters?.stipendRange?.length > 0) {
      filtered = filtered?.filter(internship => {
        return filters?.stipendRange?.some(range => {
          switch (range) {
            case 'unpaid': return internship?.stipend === 0;
            case 'upTo5k': return internship?.stipend > 0 && internship?.stipend <= 5000;
            case 'upTo10k': return internship?.stipend > 5000 && internship?.stipend <= 10000;
            case 'upTo20k': return internship?.stipend > 10000 && internship?.stipend <= 20000;
            case 'above20k': return internship?.stipend > 20000;
            default: return true;
          }
        });
      });
    }

    if (filters?.location?.length > 0) {
      filtered = filtered?.filter(internship => 
        filters?.location?.includes(internship?.location)
      );
    }

    if (filters?.sector?.length > 0) {
      filtered = filtered?.filter(internship => 
        filters?.sector?.includes(internship?.sector)
      );
    }

    if (filters?.workType?.length > 0) {
      filtered = filtered?.filter(internship => 
        filters?.workType?.includes(internship?.locationType?.toLowerCase())
      );
    }

    if (filters?.duration?.length > 0) {
      filtered = filtered?.filter(internship => {
        return filters?.duration?.some(range => {
          switch (range) {
            case '1-3': return internship?.duration >= 1 && internship?.duration <= 3;
            case '3-6': return internship?.duration > 3 && internship?.duration <= 6;
            case '6+': return internship?.duration > 6;
            default: return true;
          }
        });
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'relevance':
        filtered?.sort((a, b) => b?.matchScore - a?.matchScore);
        break;
      case 'stipend':
        filtered?.sort((a, b) => b?.stipend - a?.stipend);
        break;
      case 'deadline':
        filtered?.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        break;
      case 'posted':
        filtered?.sort((a, b) => a?.postedDaysAgo - b?.postedDaysAgo);
        break;
      default:
        break;
    }

    setFilteredInternships(filtered);
  }, [filters, sortBy]);

  const handleRefineSearch = () => {
    navigate('/profile-creation-form');
  };

  const handleApply = (internship) => {
    // In a real app, this would handle the application process
    window.open(internship?.applyUrl, '_blank');
  };

  const handleClearFilters = () => {
    setFilters({
      stipendRange: [],
      location: [],
      sector: [],
      duration: [],
      workType: []
    });
  };

  const sortOptions = [
    { value: 'relevance', label: getText('relevance') },
    { value: 'stipend', label: getText('stipend') },
    { value: 'deadline', label: getText('deadline') },
    { value: 'posted', label: getText('posted') }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressIndicator />
      <main className="pt-32 lg:pt-36">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <Breadcrumb />
          
          <RecommendationHeader 
            matchCount={filteredInternships?.length}
            onRefineSearch={handleRefineSearch}
          />

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <FilterSidebar
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Controls */}
              <div className="flex items-center justify-between mb-6 p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFilterOpen(true)}
                    iconName="Filter"
                    iconPosition="left"
                    className="lg:hidden min-h-44"
                  >
                    {getText('showFilters')}
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    {getText('showing')} {filteredInternships?.length} {getText('of')} {mockInternships?.length} {getText('results')}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {getText('sortBy')}:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e?.target?.value)}
                    className="text-sm bg-background border border-border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary min-h-44"
                  >
                    {sortOptions?.map(option => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results */}
              {filteredInternships?.length > 0 ? (
                <div className="space-y-6">
                  {filteredInternships?.map(internship => (
                    <InternshipCard
                      key={internship?.id}
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
            </div>
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