# AI-Powered Career Pathway Feature

## Overview
The Career Pathway is a guided, mobile-first interface designed to help users discover personalized internship recommendations through a simple, step-by-step process.

## Key Features

### 🎯 Mobile-First Design
- Optimized for single-column layout on small screens
- Large, easily tappable buttons and form elements
- High contrast colors for accessibility

### 🚀 Guided User Experience
- **Step 1: Skill Selection** - Interactive skill tags with search functionality
- **Step 2: Location Selection** - Categorized location options (Metro, Tier 2, Regional, Remote)
- **Step 3: Recommendations** - AI-powered personalized internship matches

### 📊 Progress Tracking
- Visual progress meter showing completion status
- Milestone-based approach with encouraging messages
- Real-time validation and error handling

### 🎨 Visual Design
- Government-appropriate color scheme (blues, greys, whites)
- Universal icons for better comprehension
- Clean, professional interface
- High contrast for accessibility

## Components

### Core Components
- `SkillSelector.jsx` - Interactive skill selection with tags and search
- `LocationSelector.jsx` - Location selection with categories
- `RecommendationCard.jsx` - Display internship matches with skill-gap advisor
- `ProgressMeter.jsx` - Visual progress tracking

### Service Layer
- `recommendationService.js` - API integration with fallback to mock data

## API Integration

### Endpoint
- **URL**: `http://localhost:8000/recommend/`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "Skills": "python data science",
    "LocationPreference": "delhi"
  }
  ```

### Response Format
```json
{
  "recommendations": [
    {
      "InternshipID": 1,
      "Title": "Frontend Developer Intern",
      "Company": "TechCorp Solutions",
      "Location": "Mumbai",
      "Stipend": 15000,
      "Duration": 6,
      "MatchScore": 92,
      "RequiredSkills": ["React", "JavaScript", "HTML"],
      "Description": "Great opportunity...",
      "ApplyUrl": "https://example.com/apply"
    }
  ]
}
```

## Usage

### Starting the Career Pathway
```jsx
import CareerPathway from './pages/CareerPathway';

// Navigate to /career-pathway
<CareerPathway />
```

### Environment Variables
```env
VITE_API_URL=http://localhost:8000
```

## Accessibility Features

- **High Contrast**: Meets WCAG guidelines
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels
- **Mobile Optimized**: Touch-friendly interface
- **Language Support**: Ready for i18n implementation

## Mobile Optimization

- Single-column layout for small screens
- Large touch targets (minimum 44px)
- Optimized typography for readability
- Responsive grid layouts
- Touch-friendly form controls

## Error Handling

- API connection fallback to mock data
- Form validation with clear error messages
- Loading states and retry mechanisms
- Graceful degradation for offline scenarios

## Future Enhancements

- Multi-language support
- Advanced filtering options
- Skill gap learning recommendations
- Application tracking
- Social sharing features
