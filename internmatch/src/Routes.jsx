import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import InternshipRecommendations from './pages/internship-recommendations';
import ProfileCreationForm from './pages/profile-creation-form';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<InternshipRecommendations />} />
        <Route path="/internship-recommendations" element={<InternshipRecommendations />} />
        <Route path="/profile-creation-form" element={<ProfileCreationForm />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
