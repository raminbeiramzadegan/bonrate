import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRedirect from './components/AuthRedirect';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Home from './pages/Home.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Campaign from './pages/Campaign.tsx';
import Templates from './pages/Templates.tsx';
import Automation from './pages/Automation.tsx';
import Contacts from './pages/Contacts.tsx';
import Analytics from './pages/Analytics.tsx';
import BusinessProfile from './pages/BusinessProfile.tsx';
import Billing from './pages/Billing.tsx';
import UpgradePlan from './pages/UpgradePlan.tsx';
import Settings from './pages/Settings.tsx';
import HelpSupport from './pages/HelpSupport.tsx';
import PhoneSupport from './pages/PhoneSupport.tsx';
import EmailSupport from './pages/EmailSupport.tsx';
import LiveChat from './pages/LiveChat.tsx';
import TemplateEditor from './pages/TemplateEditor.tsx';
import CampaignWizard from './pages/CampaignWizard.tsx';
import DripAutomation from './pages/DripAutomation.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/campaigns" element={<ProtectedRoute><Campaign /></ProtectedRoute>} />
          <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
          <Route path="/automation" element={<ProtectedRoute><Automation /></ProtectedRoute>} />
          <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/business-profile" element={<ProtectedRoute><BusinessProfile /></ProtectedRoute>} />
          <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
          <Route path="/upgrade-plan" element={<ProtectedRoute><UpgradePlan /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/help-support" element={<ProtectedRoute><HelpSupport /></ProtectedRoute>} />
          <Route path="/phone-support" element={<ProtectedRoute><PhoneSupport /></ProtectedRoute>} />
          <Route path="/email-support" element={<ProtectedRoute><EmailSupport /></ProtectedRoute>} />
          <Route path="/live-chat" element={<ProtectedRoute><LiveChat /></ProtectedRoute>} />
          <Route path="/template-editor" element={<ProtectedRoute><TemplateEditor /></ProtectedRoute>} />
          <Route path="/campaign-wizard" element={<ProtectedRoute><CampaignWizard /></ProtectedRoute>} />
          <Route path="/drip-automation" element={<ProtectedRoute><DripAutomation /></ProtectedRoute>} />
          <Route path="/login" element={<AuthRedirect><Login /></AuthRedirect>} />
          <Route path="/register" element={<AuthRedirect><Register /></AuthRedirect>} />
          <Route path="/forgot-password" element={<AuthRedirect><ForgotPassword /></AuthRedirect>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/*" element={
            <div className="App d-flex flex-column min-vh-100">
              <Navigation />
              <main className="flex-grow-1">
                <Home />
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
