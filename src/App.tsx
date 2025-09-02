
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

import ProtectedRoute from "./components/ProtectedRoute"; // ✅ ProtectedRoute









function App() {
  return (
    <ThemeProvider>
      <Router>
         <ScrollToTop /> {/* 👈 Add this line */}


         {/* ✅ Global toaster for notifications */}
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />


        <Routes>
          {/* Auth Routes (without Layout) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Main Routes (with Layout) */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route
  path="/members"
  element={
    <ProtectedRoute>
      <MembersPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/gallery"
  element={
    <ProtectedRoute>
      <GalleryPage />
    </ProtectedRoute>
  }
/>








                {/* <Route path="/gallery" element={<GalleryPage />} /> */}
                <Route path="/events" element={<EventsPage />} />
               {/* <Route path="/members" element={<MembersPage />} />  */}
                <Route path="/core-team" element={<CoreTeamPage />} />
                <Route path="/volunteer" element={<VolunteerPage />} />
                <Route path="/contact" element={<ContactPage />} /> 
                <Route path="/donate" element={<DonatePage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;