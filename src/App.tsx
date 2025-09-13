import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import EventsPage from './pages/EventsPage';
import MembersPage from './pages/MembersPage';
import CoreTeamPage from './pages/CoreTeamPage';
import VolunteerPage from './pages/VolunteerPage';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import FAQPage from './pages/faq';
import PrivacyPolicy from './pages/privacy_policy';
import TermsAndConditions from './pages/terms_&_conditions';
import ScrollToTop from './components/Scroll_To_Top';
import { Toaster } from 'react-hot-toast';
import AuthProvider from "./components/AuthContext";





// ✅ Admin imports
import AdminRoute from './components/AdminRoute';
import Dashboard from './pages/admin/Dashboard';
import EventsAdmin from './pages/admin/EventsAdmin';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import MembersAdmin from './pages/admin/MembersAdmin';
import CoreTeamAdmin from './pages/admin/CoreTeamAdmin';
import PendingUsers from "./pages/admin/PendingUsers"; // ✅ new page
import ApprovedMembers from './pages/admin/ApprovedMembers';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <Router>
        <ScrollToTop />

        {/* ✅ Global toaster for notifications */}
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

        <Routes>
          {/* Auth Routes (without Layout) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* ✅ Admin Routes (protected, no Layout) */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <AdminRoute>
                <EventsAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <AdminRoute>
                <GalleryAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/members"
            element={
              <AdminRoute>
                <MembersAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/core-team"
            element={
              <AdminRoute>
                <CoreTeamAdmin />
              </AdminRoute>
            }
          />

          <Route
          path="/admin/pending-users" // ✅ NEW ROUTE
          element={
            <AdminRoute>
              <PendingUsers />
            </AdminRoute>
          }
        />


        <Route
  path="/admin/approved-members"
  element={
    <AdminRoute>
      <ApprovedMembers />
    </AdminRoute>
  }
/>


          {/* Main Routes (with Layout) */}
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/members" element={<MembersPage />} />
                  <Route path="/core-team" element={<CoreTeamPage />} />
                  <Route path="/volunteer" element={<VolunteerPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/donate" element={<DonatePage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
