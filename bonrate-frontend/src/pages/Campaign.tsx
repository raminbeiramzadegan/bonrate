import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal, Form, Badge, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Campaign.css';
import Layout from '../components/Layout';

interface CampaignData {
  id: number;
  name: string;
  status: 'Active' | 'Paused' | 'Draft';
  sent: number;
  responses: number;
  rate: string;
  type: 'SMS' | 'Email' | 'WhatsApp';
  created: string;
}

interface CampaignStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalSent: number;
  responseRate: number;
}

const Campaign: React.FC = () => {
  const navigate = useNavigate();
  const [showCampaignWizard, setShowCampaignWizard] = useState(false);
  const [currentWizardStep, setCurrentWizardStep] = useState(1);

  // Mock data
  const campaigns: CampaignData[] = [
    { 
      id: 1, 
      name: 'New Customer Welcome', 
      status: 'Active', 
      sent: 245, 
      responses: 89, 
      rate: '36%',
      type: 'SMS',
      created: '2023-11-15'
    },
    { 
      id: 2, 
      name: 'Post-Service Follow-up', 
      status: 'Paused', 
      sent: 156, 
      responses: 42, 
      rate: '27%',
      type: 'Email',
      created: '2023-11-10'
    },
    { 
      id: 3, 
      name: 'Monthly Check-in', 
      status: 'Draft', 
      sent: 0, 
      responses: 0, 
      rate: '0%',
      type: 'SMS',
      created: '2023-11-08'
    }
  ];

  const stats: CampaignStats = {
    totalCampaigns: 12,
    activeCampaigns: 5,
    totalSent: 2847,
    responseRate: 32
  };

  const headerActions = (
    <>
      <Button variant="success" className="d-flex align-items-center" onClick={() => setShowCampaignWizard(true)} size="sm">
        <i className="fa-solid fa-plus me-1 d-none d-sm-inline"></i>
        <span className="d-none d-sm-inline">New Campaign</span>
        <i className="fa-solid fa-plus d-sm-none"></i>
      </Button>
      <Button variant="outline-primary" className="d-flex align-items-center" size="sm">
        <i className="fa-solid fa-download me-1 d-none d-sm-inline"></i>
        <span className="d-none d-sm-inline">Export</span>
        <i className="fa-solid fa-download d-sm-none"></i>
      </Button>
    </>
  );

  return (
    <Layout 
      title="Campaign Management" 
      subtitle="Create, manage, and track your review request campaigns"
      headerActions={headerActions}
    >
      {/* Campaign Overview */}
      <div className="platform-overview mb-4">
        <div className="overview-card">
          <div className="d-flex justify-content-between">
            <div className="flex-grow-1">
              <h2 className="fs-1 fw-bold mb-3">🚀 Campaign Hub</h2>
              <p className="fs-5 mb-4 opacity-75">Create targeted review request campaigns, track performance, and boost your online reputation with smart automation.</p>
            </div>
            <div className="d-none d-md-block ms-4">
              <div className="bg-white bg-opacity-25 rounded-circle p-4">
                <i className="fa-solid fa-rocket fs-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-4">
        <h2 className="fs-5 fw-semibold mb-3">📊 Campaign Performance</h2>
        <Row className="g-3">
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-bullhorn fs-2 text-primary"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Total Campaigns</Card.Title>
                <h2 className="mb-0">{stats.totalCampaigns}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-play fs-2 text-success"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Active Campaigns</Card.Title>
                <h2 className="mb-0">{stats.activeCampaigns}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-paper-plane fs-2 text-warning"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Messages Sent</Card.Title>
                <h2 className="mb-0">{stats.totalSent.toLocaleString()}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-percentage fs-2 text-secondary"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Response Rate</Card.Title>
                <h2 className="mb-0">{stats.responseRate}%</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Campaign List */}
      <div>
        <h2 className="fs-5 fw-semibold mb-3">📋 Your Campaigns</h2>
        <Card>
          <Card.Body>
            {campaigns.map(campaign => (
              <Card key={campaign.id} className="campaign-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="mb-1">{campaign.name}</h5>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <Badge bg={campaign.status === 'Active' ? 'success' : campaign.status === 'Paused' ? 'warning' : 'secondary'}>
                          {campaign.status}
                        </Badge>
                        <Badge bg="light" text="dark">{campaign.type}</Badge>
                        <span className="small text-muted">Created: {campaign.created}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Row className="text-center campaign-stats">
                    <Col xs={4}>
                      <div className="small text-muted mb-1">Sent</div>
                      <div className="fw-bold fs-5 campaign-stat">{campaign.sent}</div>
                    </Col>
                    <Col xs={4}>
                      <div className="small text-muted mb-1">Responses</div>
                      <div className="fw-bold fs-5 text-success campaign-stat">{campaign.responses}</div>
                    </Col>
                    <Col xs={4}>
                      <div className="small text-muted mb-1">Rate</div>
                      <div className="fw-bold fs-5 text-primary campaign-stat">{campaign.rate}</div>
                    </Col>
                  </Row>
                  
                  <div className="mt-3">
                    <div className="d-flex justify-content-between small text-muted mb-1">
                      <span>Response Progress</span>
                      <span>{campaign.rate}</span>
                    </div>
                    <ProgressBar 
                      now={parseInt(campaign.rate)} 
                      variant={parseInt(campaign.rate) > 30 ? 'success' : parseInt(campaign.rate) > 15 ? 'warning' : 'danger'}
                    />
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Card.Body>
        </Card>
      </div>

      {/* Campaign Wizard Modal */}
      <Modal 
        show={showCampaignWizard} 
        onHide={() => setShowCampaignWizard(false)}
        centered
        size="lg"
        className="setup-wizard-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            <i className="fa-solid fa-rocket me-2"></i>
            Campaign Wizard
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small fw-medium">Campaign Setup</span>
              <span className="small text-muted">Step {currentWizardStep} of 4</span>
            </div>
            <ProgressBar now={currentWizardStep * 25} />
          </div>
          
          {currentWizardStep === 1 && (
            <div>
              <h5 className="mb-3">Campaign Details</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Campaign Name</Form.Label>
                  <Form.Control type="text" placeholder="e.g., New Customer Welcome" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Campaign Type</Form.Label>
                  <Form.Select>
                    <option>Welcome Campaign</option>
                    <option>Post-Service Follow-up</option>
                    <option>Monthly Check-in</option>
                    <option>Win-back Campaign</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>
          )}
          
          <div className="d-flex flex-column flex-sm-row justify-content-between mt-4 gap-2">
            <Button variant="link" className="text-muted order-2 order-sm-1" onClick={() => setShowCampaignWizard(false)}>
              Cancel
            </Button>
            <div className="d-flex gap-2 order-1 order-sm-2">
              {currentWizardStep > 1 && (
                <Button variant="outline-secondary" onClick={() => setCurrentWizardStep(currentWizardStep - 1)}>
                  Previous
                </Button>
              )}
              <Button variant="primary" onClick={() => currentWizardStep < 4 ? setCurrentWizardStep(currentWizardStep + 1) : setShowCampaignWizard(false)}>
                {currentWizardStep < 4 ? 'Next Step' : 'Create Campaign'}
                <i className="fa-solid fa-arrow-right ms-2"></i>
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default Campaign;