import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from './Header';
import Icon from '../AppIcon';

const ProgressIndicator = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const steps = [
    {
      id: 'profile-setup',
      path: '/profile-creation-form',
      title: t('profileSetup'),
      icon: 'User',
    },
    {
      id: 'matches',
      path: '/internship-recommendations',
      title: t('yourMatches'),
      icon: 'Heart',
    },
  ];

  const currentStepIndex = steps.findIndex(
    (step) => step.path === location.pathname
  );

  const isCompleted = (stepIndex) => stepIndex < currentStepIndex;
  const isCurrent = (stepIndex) => stepIndex === currentStepIndex;

  const handleStepClick = (step, stepIndex) => {
    if (stepIndex <= currentStepIndex) {
      navigate(step.path);
    }
  };

  return (
    <div className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-center flex-1"
              aria-current={isCurrent(index) ? 'step' : undefined}
            >
              {/* Step Circle */}
              <button
                onClick={() => handleStepClick(step, index)}
                disabled={index > currentStepIndex}
                aria-disabled={index > currentStepIndex}
                className={`flex items-center justify-center w-14 h-14 rounded-full border-4 transition-all duration-300
                  ${
                    isCompleted(index)
                      ? 'bg-green-500 border-green-500 text-white'
                      : isCurrent(index)
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-110 ring-4 ring-blue-200'
                      : 'bg-gray-200 border-gray-300 text-gray-500'
                  }`}
              >
                {isCompleted(index) ? (
                  <Icon name="Check" size={22} strokeWidth={2.5} />
                ) : (
                  <Icon name={step.icon} size={22} strokeWidth={2} />
                )}
              </button>

              {/* Step Label */}
              <div className="ml-3">
                <p
                  className={`text-base font-bold ${
                    isCompleted(index)
                      ? 'text-green-600'
                      : isCurrent(index)
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`hidden sm:block w-full h-1.5 mx-4 rounded-full ${
                    isCompleted(index)
                      ? 'bg-green-500'
                      : isCurrent(index)
                      ? 'bg-blue-300'
                      : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Progress Bar removed as requested */}
      </div>
    </div>
  );
};

export default ProgressIndicator;
