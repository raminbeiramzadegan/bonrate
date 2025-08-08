import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import '../styles/Dashboard.css';
import '../styles/Mobile.css';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  headerActions?: React.ReactNode;
}

const Layout = ({ children, title, subtitle, headerActions }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex h-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="position-fixed w-100 h-100" 
          style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040}} 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Button 
                variant="link" 
                className="d-md-none p-0 me-3 text-dark"
                onClick={() => setSidebarOpen(true)}
              >
                <i className="fa-solid fa-bars fs-4"></i>
              </Button>
              <div>
                <h1 className="header-title mb-1">{title}</h1>
                {subtitle && (
                  <p className="header-subtitle mb-0 d-none d-sm-block">{subtitle}</p>
                )}
              </div>
            </div>
            {headerActions && (
              <div className="d-flex align-items-center gap-2">
                {headerActions}
              </div>
            )}
          </div>
        </header>
        
        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;