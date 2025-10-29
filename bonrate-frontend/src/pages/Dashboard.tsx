import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SetupWizard from '../components/SetupWizard';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

interface Stats {
  totalReviews: number;
  averageRating: number;
  pendingRequests: number;
  completionRate: number;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showSetupWizard, setShowSetupWizard] = useState(false);

  // Mock data for dashboard
  const stats: Stats = {
    totalReviews: 124,
    averageRating: 4.7,
    pendingRequests: 15,
    completionRate: 68
  };

  const recentReviews: Review[] = [
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

      {/* Welcome Modal */}
      <Modal 
        show={showWelcomeModal} 
        onHide={handleCloseWelcomeModal}
        centered
        size="lg"
        className="welcome-modal"
      >
        <Modal.Body className="p-4">
          <div className="text-center mb-4">
            <div className="welcome-icon mb-3">
              <i className="fa-solid fa-star-half-stroke fs-3"></i>
            </div>
            <h1 className="text-primary fs-2 fw-bold mb-2">Welcome to Bonrate Pro!</h1>
            <p className="fs-5 text-muted">Your Complete Review Management & Customer Engagement Platform</p>
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