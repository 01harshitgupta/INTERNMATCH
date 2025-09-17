import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <Header />
      <main role="main" tabIndex={-1} aria-label="Page Not Found">
        <div className="text-center max-w-md" >
          <div className="flex justify-center mb-6" aria-hidden="true">
            <h1 className="text-9xl font-bold text-primary opacity-20 select-none">404</h1>
          </div>
          <h2 tabIndex={0} className="text-2xl font-medium text-onBackground mb-2" id="notfound-message">
            Page Not Found
          </h2>
          <p className="text-onBackground/70 mb-8">
            The page you're looking for doesn't exist. Let's get you back!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              icon={<Icon name="ArrowLeft" aria-hidden="true" />}
              iconPosition="left"
              onClick={() => window.history.back()}
              aria-label="Go back"
            >
              Go Back
            </Button>
            <Button
              variant="outline"
              icon={<Icon name="Home" aria-hidden="true" />}
              iconPosition="left"
              onClick={handleGoHome}
              aria-label="Back to Home"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
