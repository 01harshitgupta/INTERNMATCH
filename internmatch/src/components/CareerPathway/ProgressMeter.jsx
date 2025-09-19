import React from 'react';
import { Check, Circle } from 'lucide-react';

const ProgressMeter = ({ currentStep, totalSteps, milestones }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Career Readiness Pathway 🚀
        </h2>
        <p className="text-gray-600">
          Complete your profile to unlock personalized internship recommendations
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-bold text-blue-600">
            {currentStep}/{totalSteps} Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-center mt-2">
          <span className="text-lg font-bold text-gray-900">
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>

      {/* Milestones */}
      <div className="space-y-4">
        {milestones.map((milestone, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep - 1;
          const isUpcoming = index > currentStep - 1;

          return (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                isCompleted
                  ? 'bg-green-50 border border-green-200'
                  : isCurrent
                  ? 'bg-blue-50 border border-blue-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              {/* Step Icon */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <h3
                  className={`font-semibold ${
                    isCompleted
                      ? 'text-green-800'
                      : isCurrent
                      ? 'text-blue-800'
                      : 'text-gray-600'
                  }`}
                >
                  {milestone.title}
                </h3>
                <p
                  className={`text-sm ${
                    isCompleted
                      ? 'text-green-600'
                      : isCurrent
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  }`}
                >
                  {milestone.description}
                </p>
                {milestone.emoji && (
                  <span className="text-lg ml-2">{milestone.emoji}</span>
                )}
              </div>

              {/* Status Badge */}
              <div className="flex-shrink-0">
                {isCompleted && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Completed
                  </span>
                )}
                {isCurrent && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    🔄 In Progress
                  </span>
                )}
                {isUpcoming && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    ⏳ Upcoming
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Encouragement Message */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="text-center">
          {currentStep === 0 && (
            <p className="text-blue-800 font-medium">
              🎯 Let's start building your career profile!
            </p>
          )}
          {currentStep > 0 && currentStep < totalSteps && (
            <p className="text-blue-800 font-medium">
              🚀 Great progress! You're {Math.round(progressPercentage)}% complete.
            </p>
          )}
          {currentStep === totalSteps && (
            <p className="text-green-800 font-medium">
              🎉 Congratulations! Your profile is complete and ready for recommendations!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressMeter;
