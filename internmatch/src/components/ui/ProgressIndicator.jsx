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
      icon: 'User'
    },
    {
      id: 'matches',
      path: '/internship-recommendations',
      title: t('yourMatches'),
      icon: 'Heart'
    }
  ];

  const currentStepIndex = steps?.findIndex(step => step?.path === location?.pathname);
  const isCompleted = (stepIndex) => stepIndex < currentStepIndex;
  const isCurrent = (stepIndex) => stepIndex === currentStepIndex;

  const handleStepClick = (step, stepIndex) => {
    // Allow navigation to previous steps or current step
    if (stepIndex <= currentStepIndex) {
      navigate(step?.path);
    }
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => (
            <div key={step?.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <button
                onClick={() => handleStepClick(step, index)}
                disabled={index > currentStepIndex}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-smooth min-h-44 ${
                  isCompleted(index)
                    ? 'bg-success border-success text-success-foreground cursor-pointer hover:bg-success/90'
                    : isCurrent(index)
                    ? 'bg-primary border-primary text-primary-foreground cursor-pointer'
                    : 'bg-muted border-border text-muted-foreground cursor-not-allowed'
                }`}
              >
                {isCompleted(index) ? (
                  <Icon name="Check" size={16} strokeWidth={2.5} />
                ) : (
                  <Icon name={step?.icon} size={16} strokeWidth={2} />
                )}
              </button>

              {/* Step Label */}
              <div className="ml-3 flex-1">
                <button
                  onClick={() => handleStepClick(step, index)}
                  disabled={index > currentStepIndex}
                  className={`text-left transition-smooth ${
                    index <= currentStepIndex
                      ? 'cursor-pointer hover:text-primary' :'cursor-not-allowed'
                  }`}
                >
                  <p className={`text-sm font-medium ${
                    isCompleted(index)
                      ? 'text-success'
                      : isCurrent(index)
                      ? 'text-primary' :'text-muted-foreground'
                  }`}>
                    {step?.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isCompleted(index) 
                      ? 'Completed' 
                      : isCurrent(index) 
                      ? 'Current' :'Pending'
                    }
                  </p>
                </button>
              </div>

              {/* Connector Line */}
              {index < steps?.length - 1 && (
                <div className={`hidden sm:block w-full h-0.5 mx-4 ${
                  isCompleted(index) ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Progress Bar */}
        <div className="sm:hidden mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Step {currentStepIndex + 1} of {steps?.length}</span>
            <span>{Math.round(((currentStepIndex + 1) / steps?.length) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((currentStepIndex + 1) / steps?.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;