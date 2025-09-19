import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class RecommendationService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for logging
    this.api.interceptors.request.use(
      (config) => {
        console.log('Making API request:', config.method?.toUpperCase(), config.url);
        return config;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => {
        console.log('API response received:', response.status, response.config.url);
        return response;
      },
      (error) => {
        console.error('API error:', error.response?.status, error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get internship recommendations based on skills and location
   * @param {Object} params - Recommendation parameters
   * @param {string} params.skills - Comma-separated skills string
   * @param {string} params.location - Preferred location
   * @returns {Promise<Object>} API response with recommendations
   */
  async getRecommendations({ skills, location }) {
    try {
      const requestData = {
        Skills: skills,
        LocationPreference: location,
      };

      console.log('Requesting recommendations with data:', requestData);

      const response = await this.api.post('/recommend/', requestData);
      
      // Transform the response to match our expected format
      const recommendations = response.data.recommendations || [];
      
      // Add additional fields for better UI display
      const enhancedRecommendations = recommendations.map((rec, index) => ({
        ...rec,
        InternshipID: rec.InternshipID || index + 1,
        Title: rec.Title || rec.InternshipTitle || 'Internship Position',
        Company: rec.Company || rec.CompanyName || 'Company',
        Location: rec.Location || rec.City || location,
        Stipend: rec.Stipend || rec.Salary || 0,
        Duration: rec.Duration || rec.InternshipDuration || 3,
        MatchScore: rec.MatchScore || rec.Score || Math.floor(Math.random() * 40) + 60, // Fallback score
        RequiredSkills: rec.RequiredSkills || rec.Skills || [],
        Description: rec.Description || rec.JobDescription || 'Great opportunity to gain hands-on experience.',
        ApplyUrl: rec.ApplyUrl || rec.ApplicationLink || '#',
        SkillGaps: rec.SkillGaps || [],
      }));

      return {
        success: true,
        data: enhancedRecommendations,
        count: enhancedRecommendations.length,
      };
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      
      // Return mock data in case of API failure for development
      const mockRecommendations = this.getMockRecommendations(skills, location);
      
      return {
        success: false,
        error: error.message || 'Failed to fetch recommendations',
        data: mockRecommendations,
        count: mockRecommendations.length,
        isMockData: true,
      };
    }
  }

  /**
   * Get mock recommendations for development/fallback
   * @param {string} skills - Skills string
   * @param {string} location - Location string
   * @returns {Array} Mock recommendations
   */
  getMockRecommendations(skills, location) {
    const skillList = skills ? skills.split(',').map(s => s.trim()) : [];
    
    return [
      {
        InternshipID: 1,
        Title: 'Frontend Development Intern',
        Company: 'TechCorp Solutions',
        Location: location || 'Mumbai',
        Stipend: 15000,
        Duration: 6,
        MatchScore: 92,
        RequiredSkills: ['React', 'JavaScript', 'HTML', 'CSS', ...skillList.slice(0, 2)],
        Description: 'Join our dynamic frontend team to build modern web applications using React and JavaScript. You\'ll work on real projects that impact thousands of users while learning industry best practices.',
        ApplyUrl: 'https://techcorp.com/apply/frontend-intern',
        SkillGaps: skillList.length > 0 ? [] : ['React', 'JavaScript'],
      },
      {
        InternshipID: 2,
        Title: 'Data Analysis Intern',
        Company: 'DataViz Inc',
        Location: location || 'Bangalore',
        Stipend: 12000,
        Duration: 4,
        MatchScore: 85,
        RequiredSkills: ['Python', 'Excel', 'Data Analysis', ...skillList.slice(0, 2)],
        Description: 'Work with real datasets to create insights and visualizations. Perfect for students interested in data science and analytics.',
        ApplyUrl: 'https://dataviz.com/apply/data-analysis-intern',
        SkillGaps: skillList.length > 0 ? [] : ['Python', 'Excel'],
      },
      {
        InternshipID: 3,
        Title: 'Digital Marketing Intern',
        Company: 'Growth Marketing Co',
        Location: location || 'Delhi',
        Stipend: 10000,
        Duration: 3,
        MatchScore: 78,
        RequiredSkills: ['Social Media', 'Content Writing', 'Marketing', ...skillList.slice(0, 2)],
        Description: 'Learn digital marketing strategies and work on real campaigns. Great opportunity to understand modern marketing techniques.',
        ApplyUrl: 'https://growthmarketing.com/apply/digital-marketing-intern',
        SkillGaps: skillList.length > 0 ? [] : ['Social Media', 'Content Writing'],
      },
      {
        InternshipID: 4,
        Title: 'Business Development Intern',
        Company: 'StartupHub',
        Location: location || 'Pune',
        Stipend: 8000,
        Duration: 5,
        MatchScore: 70,
        RequiredSkills: ['Communication', 'Sales', 'Business', ...skillList.slice(0, 2)],
        Description: 'Work with the business development team to identify new opportunities and build client relationships.',
        ApplyUrl: 'https://startuphub.com/apply/business-dev-intern',
        SkillGaps: skillList.length > 0 ? [] : ['Communication', 'Sales'],
      },
      {
        InternshipID: 5,
        Title: 'Content Writing Intern',
        Company: 'Content Creators',
        Location: location || 'Chennai',
        Stipend: 6000,
        Duration: 4,
        MatchScore: 65,
        RequiredSkills: ['Content Writing', 'English', 'Creative Writing', ...skillList.slice(0, 2)],
        Description: 'Create engaging content for various platforms. Perfect for students with strong writing skills.',
        ApplyUrl: 'https://contentcreators.com/apply/content-writing-intern',
        SkillGaps: skillList.length > 0 ? [] : ['Content Writing', 'English'],
      },
    ];
  }

  /**
   * Test API connectivity
   * @returns {Promise<boolean>} Connection status
   */
  async testConnection() {
    try {
      const response = await this.api.get('/health');
      return response.status === 200;
    } catch (error) {
      console.warn('API health check failed:', error.message);
      return false;
    }
  }
}

// Create and export a singleton instance
const recommendationService = new RecommendationService();
export default recommendationService;
