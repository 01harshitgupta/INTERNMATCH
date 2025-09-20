import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
import NotFound from "pages/NotFound";
import Login from "pages/Login";
import Signup from "pages/Signup";
import Home from "pages/Home";
import InternshipRecommendations from "./pages/internship-recommendations";
import ProfileCreationForm from "./pages/profile-creation-form";
import Chatbot from "./components/Chatbot";


const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        {/* ScrollToTop ensures window scrolls to top on route change */}
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/chatbot" element={<Chatbot />} />
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes require authentication */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internship-recommendations"
            element={
              <ProtectedRoute>
                <InternshipRecommendations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile-creation-form"
            element={
              <ProtectedRoute>
                <ProfileCreationForm />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route for 404 NotFound */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
