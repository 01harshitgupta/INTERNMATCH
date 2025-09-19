import React from 'react';
import { MapPin, Clock, Users, ExternalLink, TrendingUp, Lightbulb, Star } from 'lucide-react';

const RecommendationCard = ({ recommendation, userSkills = [] }) => {
  const {
    InternshipID,
    Title,
    Company,
    Location,
    Stipend,
    Duration,
    MatchScore,
    RequiredSkills = [],
    Description,
    ApplyUrl,
    SkillGaps = []
  } = recommendation;

  // Calculate match percentage
  const matchPercentage = Math.round(MatchScore || 0);
  
  // Determine match quality
  const getMatchQuality = (score) => {
    if (score >= 90) return { label: 'Perfect Match', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 75) return { label: 'Great Match', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (score >= 60) return { label: 'Good Match', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { label: 'Fair Match', color: 'text-orange-600', bgColor: 'bg-orange-100' };
  };

  const matchQuality = getMatchQuality(matchPercentage);

  // Format stipend
  const formatStipend = (stipend) => {
    if (!stipend || stipend === 0) return 'Unpaid';
    if (stipend >= 100000) return `₹${(stipend / 100000).toFixed(1)}L`;
    if (stipend >= 1000) return `₹${(stipend / 1000).toFixed(0)}K`;
    return `₹${stipend}`;
  };

  // Find skill gaps
  const findSkillGaps = () => {
    if (!userSkills || userSkills.length === 0) return RequiredSkills.slice(0, 2);
    return RequiredSkills.filter(skill => !userSkills.includes(skill)).slice(0, 2);
  };

  const skillGaps = findSkillGaps();

  const handleApply = () => {
    if (ApplyUrl) {
      window.open(ApplyUrl, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header with Match Score */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {Title}
            </h3>
            <p className="text-lg font-semibold text-blue-600 mb-1">
              {Company}
            </p>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{Location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{Duration} months</span>
              </div>
            </div>
          </div>
          
          {/* Match Score */}
          <div className="text-right">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${matchQuality.bgColor} ${matchQuality.color}`}>
              <Star className="w-4 h-4" />
              {matchQuality.label}
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-gray-900">{matchPercentage}%</div>
              <div className="text-xs text-gray-500">Match Score</div>
            </div>
          </div>
        </div>

        {/* Match Score Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              matchPercentage >= 90 ? 'bg-gradient-to-r from-green-400 to-green-500' :
              matchPercentage >= 75 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
              matchPercentage >= 60 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
              'bg-gradient-to-r from-orange-400 to-orange-500'
            }`}
            style={{ width: `${matchPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stipend */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">Stipend</p>
            <p className="text-2xl font-bold text-gray-900">{formatStipend(Stipend)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Duration</p>
            <p className="text-lg font-semibold text-gray-900">{Duration} months</p>
          </div>
        </div>

        {/* Description */}
        {Description && (
          <div className="mb-4">
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
              {Description}
            </p>
          </div>
        )}

        {/* Required Skills */}
        {RequiredSkills && RequiredSkills.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Required Skills</p>
            <div className="flex flex-wrap gap-2">
              {RequiredSkills.slice(0, 6).map((skill, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    userSkills && userSkills.includes(skill)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {skill}
                </span>
              ))}
              {RequiredSkills.length > 6 && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                  +{RequiredSkills.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Skill Gap Advisor */}
        {skillGaps.length > 0 && matchPercentage < 90 && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800 mb-1">
                  💡 Skill Gap Advisor
                </p>
                <p className="text-sm text-yellow-700 mb-2">
                  Learn these skills to become a perfect fit:
                </p>
                <div className="flex flex-wrap gap-2">
                  {skillGaps.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <button className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium underline">
                  Find free courses →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleApply}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Apply Now
          </button>
          <button className="px-4 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-xl transition-colors duration-200">
            Save
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>Multiple openings</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>High demand</span>
            </div>
          </div>
          <span>ID: {InternshipID}</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
