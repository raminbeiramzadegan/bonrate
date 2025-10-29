import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import Layout from '../components/Layout';

interface NotificationSettings {
  emailReviews: boolean;
  smsAlerts: boolean;
  weeklyReports: boolean;
  securityAlerts: boolean;
}

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface Integration {
  name: string;
  status: 'Connected' | 'Disconnected' | 'Available';
  icon: string;
  color: 'success' | 'secondary' | 'warning';
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('account');
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailReviews: true,
    smsAlerts: false,
    weeklyReports: true,
    securityAlerts: true
  });

  const tabs: Tab[] = [
    { id: 'account', label: 'Account Settings', icon: 'fa-user' },
    { id: 'notifications', label: 'Notifications', icon: 'fa-bell' },
    { id: 'security', label: 'Security', icon: 'fa-shield-halved' },
    { id: 'integrations', label: 'Integrations', icon: 'fa-plug' }
  ];

  const integrations: Integration[] = [
    { name: 'Google My Business', status: 'Connected', icon: 'fa-google', color: 'success' },
    { name: 'Facebook Reviews', status: 'Connected', icon: 'fa-facebook', color: 'success' },
    { name: 'Yelp Business', status: 'Disconnected', icon: 'fa-yelp', color: 'secondary' },
    { name: 'Zapier', status: 'Available', icon: 'fa-bolt', color: 'warning' }
  ];

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-primary text-white border-0">
                <div className="d-flex align-items-center">
                  <div className="bg-white bg-opacity-20 rounded-circle p-2 me-3">
                    <i className="fa-solid fa-user fs-5 text-white"></i>
                  </div>
                  <h5 className="mb-0 text-white fw-bold" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>Profile Information</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" defaultValue="John" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" defaultValue="Smith" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" defaultValue="john@example.com" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" defaultValue="+1 (555) 123-4567" />
                </Form.Group>
                <Button variant="primary">Save Changes</Button>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm border-danger border-opacity-25">
              <Card.Header className="bg-danger bg-opacity-10 border-0">
                <div className="d-flex align-items-center">
                  <div className="bg-danger bg-opacity-20 rounded-circle p-2 me-3">
                    <i className="fa-solid fa-exclamation-triangle text-danger fs-5"></i>
                  </div>
                  <h5 className="mb-0 text-danger fw-bold">Danger Zone</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-danger mb-1">Delete Account</h6>
                    <p className="text-muted small mb-0">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="outline-danger" size="sm">Delete Account</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        );

      case 'notifications':
        return (
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-warning text-white border-0">
              <div className="d-flex align-items-center">
                <div className="bg-white bg-opacity-20 rounded-circle p-2 me-3">
                  <i className="fa-solid fa-bell fs-5 text-white"></i>
                </div>
                <h5 className="mb-0 text-white fw-bold" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>Notification Preferences</h5>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-1">Email Notifications for New Reviews</h6>
                    <p className="text-muted small mb-0">Get notified when customers leave new reviews</p>
                  </div>
                  <Form.Check 
                    type="switch" 
                    checked={notifications.emailReviews}
                    onChange={(e) => handleNotificationChange('emailReviews', e.target.checked)}
                  />
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-1">SMS Alerts</h6>
                    <p className="text-muted small mb-0">Receive SMS alerts for urgent notifications</p>
                  </div>
                  <Form.Check 
                    type="switch" 
                    checked={notifications.smsAlerts}
                    onChange={(e) => handleNotificationChange('smsAlerts', e.target.checked)}
                  />
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-1">Weekly Reports</h6>
                    <p className="text-muted small mb-0">Get weekly summary of your review performance</p>
                  </div>
                  <Form.Check 
                    type="switch" 
                    checked={notifications.weeklyReports}
                    onChange={(e) => handleNotificationChange('weeklyReports', e.target.checked)}
                  />
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Security Alerts</h6>
                    <p className="text-muted small mb-0">Important security and account notifications</p>
                  </div>
                  <Form.Check 
                    type="switch" 
                    checked={notifications.securityAlerts}
                    onChange={(e) => handleNotificationChange('securityAlerts', e.target.checked)}
                  />
                </div>
              </div>
              <Button variant="primary">Save Preferences</Button>
            </Card.Body>
          </Card>
        );

      case 'security':
        return (
          <div>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-success text-white border-0">
                <div className="d-flex align-items-center">
                  <div className="bg-white bg-opacity-20 rounded-circle p-2 me-3">
                    <i className="fa-solid fa-key fs-5 text-white"></i>
                  </div>
                  <h5 className="mb-0 text-white fw-bold" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>Change Password</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
                <Button variant="primary">Update Password</Button>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-info text-white border-0">
                <div className="d-flex align-items-center">
                  <div className="bg-white bg-opacity-20 rounded-circle p-2 me-3">
                    <i className="fa-solid fa-mobile-screen-button fs-5 text-white"></i>
                  </div>
                  <h5 className="mb-0 text-white fw-bold" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>Two-Factor Authentication</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Two-Factor Authentication</h6>
                    <p className="text-muted small mb-0">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline-primary" size="sm">Enable 2FA</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        );

      case 'integrations':
        return (
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-success text-white border-0">
              <div className="d-flex align-items-center">
                <div className="bg-white bg-opacity-20 rounded-circle p-2 me-3">
                  <i className="fa-solid fa-plug fs-5 text-white"></i>
                </div>
                <h5 className="mb-0 text-white fw-bold" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>Connected Services</h5>
              </div>
            </Card.Header>
            <Card.Body>
              <Row className="g-4">
                {integrations.map((integration, index) => (
                  <Col md={6} key={index}>
                    <Card className={`h-100 border-0 shadow-sm position-relative overflow-hidden ${
                      integration.status === 'Connected' ? 'bg-success bg-opacity-5' : 'bg-light'
                    }`}>
                      <div className="position-absolute top-0 end-0 opacity-10">
                        <i className={`fa-brands ${integration.icon}`} style={{fontSize: '4rem'}}></i>
                      </div>
                      <Card.Body className="text-center position-relative">
                        <div className="mb-3">
                          <div className={`rounded-circle d-inline-flex align-items-center justify-content-center ${
                            integration.status === 'Connected' ? 'bg-success' : 'bg-primary'
                          } bg-opacity-10`} style={{width: '60px', height: '60px'}}>
                            <i className={`fa-brands ${integration.icon} fs-2 ${
                              integration.status === 'Connected' ? 'text-success' : 'text-primary'
                            }`}></i>
                          </div>
                        </div>
                        <h6 className="mb-2 fw-bold">{integration.name}</h6>
                        <Badge bg={integration.color} className="mb-3 px-3 py-2">{integration.status}</Badge>
                        <div>
                          {integration.status === 'Connected' ? (
                            <Button variant="outline-danger" size="sm" className="px-4">Disconnect</Button>
                          ) : (
                            <Button variant="primary" size="sm" className="px-4">Connect</Button>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Layout 
      title="⚙️ Settings" 
      subtitle="Manage your account settings and preferences"
    >
      {/* Settings Overview */}
      <div className="platform-overview mb-4">
        <div className="overview-card">
          <div className="d-flex justify-content-between">
            <div className="flex-grow-1">
              <h2 className="fs-1 fw-bold mb-3">⚙️ Account Settings</h2>
              <p className="fs-5 mb-4 text-white">Customize your account preferences, security settings, and integrations to optimize your Bonrate Pro experience.</p>
            </div>
            <div className="d-none d-md-block ms-4">
              <div className="bg-white bg-opacity-25 rounded-circle p-4">
                <i className="fa-solid fa-cogs fs-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Row>
        <Col md={3}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-primary text-white border-0">
              <h6 className="mb-0">
                <i className="fa-solid fa-list me-2"></i>
                Settings Menu
              </h6>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="list-group list-group-flush">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`list-group-item list-group-item-action border-0 d-flex align-items-center py-3 ${
                      activeTab === tab.id ? 'bg-primary text-white' : 'text-dark'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <div className={`rounded-circle p-2 me-3 ${
                      activeTab === tab.id ? 'bg-white bg-opacity-20' : 'bg-primary bg-opacity-10'
                    }`}>
                      <i className={`fa-solid ${tab.icon} ${
                        activeTab === tab.id ? 'text-white' : 'text-primary'
                      }`}></i>
                    </div>
                    <div>
                      <div className="fw-semibold">{tab.label}</div>
                      <div className={`small ${
                        activeTab === tab.id ? 'text-white-50' : 'text-muted'
                      }`}>
                        {tab.id === 'account' && 'Profile & Personal Info'}
                        {tab.id === 'notifications' && 'Alerts & Preferences'}
                        {tab.id === 'security' && 'Password & 2FA'}
                        {tab.id === 'integrations' && 'Connected Services'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={9}>
          {renderTabContent()}
        </Col>
      </Row>
    </Layout>
  );
};

export default Settings;