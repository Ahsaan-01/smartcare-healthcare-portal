import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { PatientLayout } from './layouts/PatientLayout';
import { ProtectedRoute } from './layouts/ProtectedRoute';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';

// Discovery & Doctor Profile
import { DoctorDiscoveryPage } from './pages/patient/DoctorDiscoveryPage';
import { DoctorProfilePage } from './pages/patient/DoctorProfilePage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Patient Portal Pages
import { PatientDashboard } from './pages/patient/PatientDashboard';
import { FavouriteDoctorsPage } from './pages/patient/FavouriteDoctorsPage';

// Error Pages
import { NotFoundPage } from './pages/errors/NotFoundPage';
import { UnauthorizedPage } from './pages/errors/UnauthorizedPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/find-doctors" element={<DoctorDiscoveryPage />} />
          <Route path="/doctors/:id" element={<DoctorProfilePage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Route>

        {/* Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Protected Patient Portal Routes */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute allowedRoles={['patient', 'doctor', 'admin']}>
              <PatientLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/patient/dashboard" replace />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="favourites" element={<FavouriteDoctorsPage />} />
        </Route>

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
