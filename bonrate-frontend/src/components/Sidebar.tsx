import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    if (setSidebarOpen) setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <i className="fa-solid fa-star-half-stroke"></i>
          </div>
          <span className="fw-semibold fs-5">Bonrate Pro</span>
        </div>
      </div>
      
      <div className="sidebar-search">
        <div className="position-relative">
          <Form.Control 
            type="text" 
            placeholder="Search..." 
            className="ps-4"
          />
          <i className="fa-solid fa-magnifying-glass position-absolute start-0 top-50 translate-middle-y ms-2 text-muted"></i>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="list-unstyled">
          <li>
            <div 
              className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
              onClick={() => handleNavigation('/dashboard')}
            >
              <i className="fa-solid fa-gauge-high nav-icon"></i>
              Dashboard
            </div>
          </li>
          
          <li className="nav-section">
            <div className="nav-section-title">Marketing</div>
            <ul className="list-unstyled">
              <li>
                <div 
                  className={`nav-item ${isActive('/campaigns') ? 'active' : ''}`}
                  onClick={() => handleNavigation('/campaigns')}
                >
                  <i className="fa-solid fa-bullhorn nav-icon"></i>
                  Campaigns
                </div>
              </li>
              <li>
                <div 
                  className={`nav-item ${isActive('/templates') ? 'active' : ''}`}
                  onClick={() => handleNavigation('/templates')}
                >
                  <i className="fa-solid fa-file-lines nav-icon"></i>
                  Templates
                </div>
              </li>
              <li>
                <div 
                  className={`nav-item ${isActive('/automation') ? 'active' : ''}`}
                  onClick={() => handleNavigation('/automation')}
                >
                  <i className="fa-solid fa-robot nav-icon"></i>
                  Automation
                </div>
              </li>
            </ul>
          </li>
          
          <li className="nav-section">
            <div className="nav-section-title">Data</div>
            <ul className="list-unstyled">
              <li>
                <div 
                  className={`nav-item ${isActive('/contacts') ? 'active' : ''}`}
                  onClick={() => handleNavigation('/contacts')}
                >
                  <i className="fa-solid fa-address-book nav-icon"></i>
                  Contacts
                </div>
              </li>
              <li>
                <div 
                  className={`nav-item ${isActive('/analytics') ? 'active' : ''}`}
                  onClick={() => handleNavigation('/analytics')}
                >
                  <i className="fa-solid fa-chart-line nav-icon"></i>
                  Analytics
                </div>
              </li>
            </ul>
          </li>
          
          <li className="nav-section">
            <div className="nav-section-title">Settings</div>
            <ul className="list-unstyled">
              <li>
                <div 
                  className={`nav-item ${isActive('/business-profile') ? 'active' : ''}`}
                  onClick={() => handleNavigation('/business-profile')}
                >
                  <i className="fa-solid fa-building nav-icon"></i>
                  Business Profile
                </div>
              </li>
              <li>
                <div 
                  className={`nav-item ${isActive('/billing') ? 'active' : ''}`}
                  onClick={() => handleNavigation('/billing')}
                >
                  <i className="fa-solid fa-credit-card nav-icon"></i>
                  Billing
                </div>
              </li>
              <li>
                <div 
                  className={`nav-item ${isActive('/settings') ? 'active' : ''}`}
                  onClick={() => handleNavigation('/settings')}
                >
                  <i className="fa-solid fa-gear nav-icon"></i>
                  Settings
                </div>
              </li>
            </ul>
          </li>
        </ul>
        
        <div className="mt-4 pt-3 border-top border-light">
          <div 
            className={`nav-item ${isActive('/help-support') ? 'active' : ''}`}
            onClick={() => handleNavigation('/help-support')}
          >
            <i className="fa-solid fa-circle-question nav-icon"></i>
            Help & Support
          </div>
        </div>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="User" className="user-avatar" />
          <div className="user-info">
            <p className="user-name mb-0">{user?.name || 'User'}</p>
            <p className="user-email mb-0">{user?.email}</p>
          </div>
          <Button variant="link" className="text-danger p-0" onClick={logout} title="Logout">
            <i className="fa-solid fa-sign-out-alt"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
   