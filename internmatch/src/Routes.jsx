import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
import NotFound from "pages/NotFound";
import Login from "pages/Login";
import Signup from "pages/Signup";
import Home from "pages/Home";
import InternshipRecommendations from './pages/internship-recommendations';
import ProfileCreationForm from './pages/profile-creation-form';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/internship-recommendations" element={
          <ProtectedRoute>
            <InternshipRecommendations />
          </ProtectedRoute>
        } />
        <Route path="/profile-creation-form" element={
          <ProtectedRoute>
            <ProfileCreationForm />
          </ProtectedRoute>
        } />
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
