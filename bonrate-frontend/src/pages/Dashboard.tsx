import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SetupWizard from '../components/SetupWizard';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showSetupWizard, setShowSetupWizard] = useState(false);

  
  // Mock data for dashboard
  const stats = {
    totalReviews: 124,
    averageRating: 4.7,
    pendingRequests: 15,
    completionRate: 68
  };

  const recentReviews = [
    { id: 1, name: 'John Doe', rating: 5, comment: 'Excellent service, highly recommended!', date: '2023-11-15' },
    { id: 2, name: 'Jane Smith', rating: 4, comment: 'Good experience overall.', date: '2023-11-14' },
    { id: 3, name: 'Mike Johnson', rating: 5, comment: 'Very professional and quick service.', date: '2023-11-12' }
  ];

  const handleCloseWelcomeModal = () => setShowWelcomeModal(false);
  const handleStartSetup = () => {
    setShowWelcomeModal(false);
    setShowSetupWizard(true);
  };
  
  const handleCloseSetupWizard = () => setShowSetupWizard(false);

  const headerActions = (
    <>
      <Button variant="success" className="d-flex align-items-center" onClick={() => setShowSetupWizard(true)} size="sm">
        <i className="fa-solid fa-rocket me-1 d-none d-sm-inline"></i>
        <span className="d-none d-sm-inline">Quick Setup</span>
        <i className="fa-solid fa-rocket d-sm-none"></i>
      </Button>
      <Button variant="primary" className="d-flex align-items-center" size="sm">
        <i className="fa-solid fa-plus me-1 d-none d-sm-inline"></i>
        <span className="d-none d-sm-inline">Create Campaign</span>
        <i className="fa-solid fa-plus d-sm-none"></i>
      </Button>
     
    </>
  );

  return (
    <Layout 
      title="Welcome to Bonrate Pro" 
      subtitle="Your complete review management & customer engagement platform"
      headerActions={headerActions}
    >
          <div className="platform-overview mb-4">
            <div className="overview-card">
              <div className="d-flex justify-content-between">
                <div className="flex-grow-1">
                  <h2 className="fs-1 fw-bold mb-3">🌟 What is Bonrate Pro?</h2>
                  <p className="fs-5 mb-4 opacity-75">Your all-in-one platform to collect more customer reviews, boost online reputation, and grow your business through smart automation.</p>
                  <Row className="mt-4">
                    <Col md={4} className="mb-3">
                      <div className="feature-card">
                        <div className="feature-title">
                          <i className="fa-solid fa-paper-plane text-warning"></i>
                          <span className="fw-semibold">Send Review Requests</span>
                        </div>
                        <p className="small opacity-75">Automatically send SMS, email & WhatsApp messages to customers asking for reviews</p>
                      </div>
                    </Col>
                    <Col md={4} className="mb-3">
                      <div className="feature-card">
                        <div className="feature-title">
                          <i className="fa-solid fa-star text-warning"></i>
                          <span className="fw-semibold">Collect Reviews</span>
                        </div>
                        <p className="small opacity-75">Guide customers to leave reviews on Google, Yelp, Facebook & other platforms</p>
                      </div>
                    </Col>
                    <Col md={4} className="mb-3">
                      <div className="feature-card">
                        <div className="feature-title">
                          <i className="fa-solid fa-chart-line text-success"></i>
                          <span className="fw-semibold">Track Performance</span>
                        </div>
                        <p className="small opacity-75">Monitor campaign success, response rates, and reputation growth</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="d-none d-md-block ms-4">
                  <div className="bg-white bg-opacity-25 rounded-circle p-4">
                    <i className="fa-solid fa-bullhorn fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="how-it-works mb-4">
            <h2 className="fs-5 fw-semibold mb-3">🔄 How Bonrate Pro Works</h2>
            <Row>
              <Col md={3} className="mb-3">
                <div className="step-card">
                  <div className="step-icon step-1">
                    <i className="fa-solid fa-users"></i>
                  </div>
                  <h3 className="fw-semibold mb-2">1. Add Customers</h3>
                  <p className="small text-muted">Import your customer contacts or add them manually</p>
                </div>
              </Col>
              <Col md={3} className="mb-3">
                <div className="step-card">
                  <div className="step-icon step-2">
                    <i className="fa-solid fa-edit"></i>
                  </div>
                  <h3 className="fw-semibold mb-2">2. Create Messages</h3>
                  <p className="small text-muted">Use templates or AI to craft personalized review requests</p>
                </div>
              </Col>
              <Col md={3} className="mb-3">
                <div className="step-card">
                  <div className="step-icon step-3">
                    <i className="fa-solid fa-paper-plane"></i>
                  </div>
                  <h3 className="fw-semibold mb-2">3. Send Campaigns</h3>
                  <p className="small text-muted">Automatically send via SMS, email, or WhatsApp</p>
                </div>
              </Col>
              <Col md={3} className="mb-3">
                <div className="step-card">
                  <div className="step-icon step-4">
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <h3 className="fw-semibold mb-2">4. Get Reviews</h3>
                  <p className="small text-muted">Customers click your link and leave reviews on your chosen platforms</p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="setup-cards mb-4">
            <h2 className="fs-5 fw-semibold mb-3">🚀 Get Started in 3 Easy Steps</h2>
            <Row>
              <Col md={4} className="mb-3">
                <div className="setup-card step-1">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="setup-step-icon step-1">
                      <i className="fa-solid fa-building"></i>
                    </div>
                    <span className="setup-step-badge step-1">Step 1</span>
                  </div>
                  <h3 className="fw-semibold mb-2">Setup Business Profile</h3>
                  <p className="small text-muted mb-3">Add your business name, logo, and review platform links (Google, Yelp, Facebook)</p>
                  <Button variant="primary" className="w-100">
                    Complete Setup
                  </Button>
                </div>
              </Col>
              
              <Col md={4} className="mb-3">
                <div className="setup-card step-2">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="setup-step-icon step-2">
                      <i className="fa-solid fa-users"></i>
                    </div>
                    <span className="setup-step-badge step-2">Step 2</span>
                  </div>
                  <h3 className="fw-semibold mb-2">Add Customers</h3>
                  <p className="small text-muted mb-3">Import contacts from CSV or add them manually to start sending review requests</p>
                  <Button variant="success" className="w-100">
                    Add Contacts
                  </Button>
                </div>
              </Col>
              
              <Col md={4} className="mb-3">
                <div className="setup-card step-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="setup-step-icon step-3">
                      <i className="fa-solid fa-paper-plane"></i>
                    </div>
                    <span className="setup-step-badge step-3">Step 3</span>
                  </div>
                  <h3 className="fw-semibold mb-2">Launch Campaign</h3>
                  <p className="small text-muted mb-3">Create and send your first review request campaign to start collecting reviews</p>
                  <Button variant="secondary" className="w-100">
                    Create Campaign
                  </Button>
                </div>
              </Col>
            </Row>
          </div>

          {/* Stats Cards */}
          <div className="mb-4">
            <h2 className="fs-5 fw-semibold mb-3">📊 Dashboard Overview</h2>
            <Row className="g-3">
              <Col lg={3} md={6} className="mb-3">
                <Card className="stats-card h-100">
                  <Card.Body className="text-center">
                    <div className="mb-2">
                      <i className="fa-solid fa-star fs-2 text-warning"></i>
                    </div>
                    <Card.Title className="small text-muted mb-1">Total Reviews</Card.Title>
                    <h2 className="mb-0">{stats.totalReviews}</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} className="mb-3">
                <Card className="stats-card h-100">
                  <Card.Body className="text-center">
                    <div className="mb-2">
                      <i className="fa-solid fa-chart-line fs-2 text-success"></i>
                    </div>
                    <Card.Title className="small text-muted mb-1">Average Rating</Card.Title>
                    <h2 className="mb-0">{stats.averageRating}/5</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} className="mb-3">
                <Card className="stats-card h-100">
                  <Card.Body className="text-center">
                    <div className="mb-2">
                      <i className="fa-solid fa-clock fs-2 text-primary"></i>
                    </div>
                    <Card.Title className="small text-muted mb-1">Pending Requests</Card.Title>
                    <h2 className="mb-0">{stats.pendingRequests}</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} className="mb-3">
                <Card className="stats-card h-100">
                  <Card.Body className="text-center">
                    <div className="mb-2">
                      <i className="fa-solid fa-percentage fs-2 text-secondary"></i>
                    </div>
                    <Card.Title className="small text-muted mb-1">Completion Rate</Card.Title>
                    <h2 className="mb-0">{stats.completionRate}%</h2>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
          
          {/* Quick Actions */}
          <div className="mb-4">
            <h2 className="fs-5 fw-semibold mb-3">⚡ Quick Actions</h2>
            <Card>
              <Card.Body className="quick-actions">
                <Button variant="primary" onClick={() => navigate('/campaigns')} className="me-2">
                  <i className="fa-solid fa-bullhorn me-2"></i>
                  New Campaign
                </Button>
                <Button variant="outline-primary" onClick={() => navigate('/template-editor')} className="me-2">
                  <i className="fa-solid fa-file-lines me-2"></i>
                  Create Template
                </Button>
                <Button variant="outline-primary" onClick={() => navigate('/drip-automation')}>
                  <i className="fa-solid fa-robot me-2"></i>
                  Setup Automation
                </Button>
              </Card.Body>
            </Card>
          </div>
          
          {/* Recent Reviews */}
          <div>
            <h2 className="fs-5 fw-semibold mb-3">🌟 Recent Reviews</h2>
            <Card>
              <Card.Body>
                {recentReviews.map(review => (
                  <Card key={review.id} className="review-card">
                    <Card.Body>
                      <div className="review-header">
                        <h5 className="mb-0">{review.name}</h5>
                        <div className="review-rating">
                          Rating: {review.rating}/5 • {review.date}
                        </div>
                      </div>
                      <p className="review-comment mb-0">{review.comment}</p>
                    </Card.Body>
                  </Card>
                ))}
                <Button variant="outline-primary" className="mt-3">
                  <i className="fa-solid fa-list me-2"></i>
                  View All Reviews
                </Button>
              </Card.Body>
            </Card>
          </div>
      {/* Welcome Modal */}
      <Modal 
        show={showWelcomeModal} 
        onHide={handleCloseWelcomeModal}
        centered
        size="lg"
        className="welcome-modal"
        fullscreen="sm-down"
      >
        <Modal.Body className="p-4">
          <div className="text-center mb-4">
            <div className="welcome-icon mb-3">
              <i className="fa-solid fa-star-half-stroke fs-3"></i>
            </div>
            <h1 className="text-primary fs-2 fw-bold mb-2">Welcome to Bonrate Pro!</h1>
            <p className="fs-5 text-muted">Your Complete Review Management & Customer Engagement Platform</p>
          </div>

          <div className="feature-gradient mb-4">
            <h2 className="fs-5 fw-bold mb-3 text-center">🎯 What You Can Do With Bonrate Pro</h2>
            <Row>
              <Col md={6} className="mb-3">
                <div className="d-flex">
                  <div className="feature-icon primary me-2 mt-1">
                    <i className="fa-solid fa-paper-plane small"></i>
                  </div>
                  <div>
                    <h3 className="fw-semibold small">Send Review Requests</h3>
                    <p className="small text-muted">Automatically send SMS, email & WhatsApp messages to customers</p>
                  </div>
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div className="d-flex">
                  <div className="feature-icon success me-2 mt-1">
                    <i className="fa-solid fa-star small"></i>
                  </div>
                  <div>
                    <h3 className="fw-semibold small">Collect More Reviews</h3>
                    <p className="small text-muted">Guide customers to Google, Yelp, Facebook & other platforms</p>
                  </div>
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div className="d-flex">
                  <div className="feature-icon secondary me-2 mt-1">
                    <i className="fa-solid fa-robot small"></i>
                  </div>
                  <div>
                    <h3 className="fw-semibold small">AI-Powered Automation</h3>
                    <p className="small text-muted">Smart message generation and timing optimization</p>
                  </div>
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div className="d-flex">
                  <div className="feature-icon warning me-2 mt-1">
                    <i className="fa-solid fa-chart-line small"></i>
                  </div>
                  <div>
                    <h3 className="fw-semibold small">Track Performance</h3>
                    <p className="small text-muted">Monitor campaigns, response rates & reputation growth</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small fw-medium">Quick Setup Progress</span>
              <span className="small text-muted">Ready to start in 3 steps</span>
            </div>
            <ProgressBar now={0} className="mb-3" />
            <Row>
              <Col xs={4}>
                <div className="bg-primary bg-opacity-10 p-3 rounded text-center">
                  <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle mx-auto mb-2" style={{width: '2rem', height: '2rem'}}>1</div>
                  <span className="small fw-medium">Setup Business</span>
                </div>
              </Col>
              <Col xs={4}>
                <div className="bg-light p-3 rounded text-center">
                  <div className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25 text-muted rounded-circle mx-auto mb-2" style={{width: '2rem', height: '2rem'}}>2</div>
                  <span className="small text-muted">Add Customers</span>
                </div>
              </Col>
              <Col xs={4}>
                <div className="bg-light p-3 rounded text-center">
                  <div className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25 text-muted rounded-circle mx-auto mb-2" style={{width: '2rem', height: '2rem'}}>3</div>
                  <span className="small text-muted">Launch Campaign</span>
                </div>
              </Col>
            </Row>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
            <Button variant="link" className="text-muted order-2 order-sm-1" onClick={handleCloseWelcomeModal}>
              Skip for now
            </Button>
            <Button variant="primary" className="order-1 order-sm-2" onClick={handleStartSetup}>
              <i className="fa-solid fa-rocket me-2"></i>
              Start Quick Setup
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      
      {/* Setup Wizard Modal */}
      <SetupWizard show={showSetupWizard} onHide={handleCloseSetupWizard} />
    </Layout>
  );
};

export default Dashboard;