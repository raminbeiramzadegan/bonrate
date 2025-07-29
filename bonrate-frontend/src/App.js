import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Campaign from './pages/Campaign';
import Templates from './pages/Templates';
import Automation from './pages/Automation';
import Contacts from './pages/Contacts';
import Analytics from './pages/Analytics';
import BusinessProfile from './pages/BusinessProfile';
import Billing from './pages/Billing';
import UpgradePlan from './pages/UpgradePlan';
import Settings from './pages/Settings';
import HelpSupport from './pages/HelpSupport';
import PhoneSupport from './pages/PhoneSupport';
import EmailSupport from './pages/EmailSupport';
import LiveChat from './pages/LiveChat';
import TemplateEditor from './pages/TemplateEditor';
import CampaignWizard from './pages/CampaignWizard';
import DripAutomation from './pages/DripAutomation';
import Login from './pages/Login';
import Register from './pages/Register';

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
