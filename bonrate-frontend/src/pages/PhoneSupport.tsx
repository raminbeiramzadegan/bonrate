import React, { useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import Layout from '../components/Layout';

type CallStatus = 'ready' | 'calling' | 'connected';

const PhoneSupport: React.FC = () => {
  const [callStatus, setCallStatus] = useState<CallStatus>('ready');

  const headerActions = (
    <div className="d-flex gap-2">
      <Button variant="outline-primary" size="sm" onClick={() => window.history.back()}>
        <i className="fa-solid fa-arrow-left me-1"></i>
        Back to Help
      </Button>
      <div className="d-flex align-items-center text-sm">
        <div className="w-2 h-2 bg-success rounded-circle me-2"></div>
        <span className="text-muted">Support Available</span>
      </div>
    </div>
  );

  return (
    <Layout 
      title="Phone Support" 
      subtitle="Call our support team for immediate assistance"
      headerActions={headerActions}
    >
      {/* Call Interface */}
      <Card className="mb-4 border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Card.Body className="text-center py-5 text-white">
          <div className="bg-white bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '100px', height: '100px'}}>
            <i className="fa-solid fa-phone" style={{ fontSize: '2.5rem' }}></i>
          </div>
          <h2 className="mb-3 fw-bold">Call Support Now</h2>
          <p className="mb-4 fs-5 opacity-90">Speak directly with our support specialists</p>
          <div className="mb-4">
            <h3 className="fw-bold mb-2">+1 (555) 123-4567</h3>
            <p className="opacity-75">Available Mon-Fri 9AM-6PM EST</p>
          </div>
          <Button 
            variant="light" 
            size="lg" 
            className="px-5 py-3 fw-bold"
            style={{borderRadius: '50px'}}
            onClick={() => window.open('tel:+15551234567')}
          >
            <i className="fa-solid fa-phone me-2"></i>
            Call Now
          </Button>
        </Card.Body>
      </Card>

      {/* Support Hours */}
      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                  <i className="fa-solid fa-clock text-success fs-5"></i>
                </div>
                <h5 className="mb-0 fw-bold">Business Hours</h5>
              </div>
              <div className="space-y-2">
                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span>Monday - Friday</span>
                  <span className="fw-medium">9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span>Saturday</span>
                  <span className="fw-medium">10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <span>Sunday</span>
                  <span className="text-muted">Closed</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-info bg-opacity-10 rounded-circle p-3 me-3">
                  <i className="fa-solid fa-headset text-info fs-5"></i>
                </div>
                <h5 className="mb-0 fw-bold">What to Expect</h5>
              </div>
              <ul className="list-unstyled mb-0">
                <li className="d-flex align-items-center mb-2">
                  <i className="fa-solid fa-check text-success me-2"></i>
                  <span>Immediate assistance</span>
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="fa-solid fa-check text-success me-2"></i>
                  <span>Expert technical support</span>
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="fa-solid fa-check text-success me-2"></i>
                  <span>Account-specific help</span>
                </li>
                <li className="d-flex align-items-center">
                  <i className="fa-solid fa-check text-success me-2"></i>
                  <span>Follow-up if needed</span>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Prepare for Your Call */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Header className="bg-primary text-white border-0">
          <h5 className="mb-0 fw-bold">
            <i className="fa-solid fa-clipboard-list me-2"></i>
            Prepare for Your Call
          </h5>
        </Card.Header>
        <Card.Body>
          <p className="mb-3">To help us assist you more efficiently, please have the following ready:</p>
          <Row className="g-3">
            <Col md={6}>
              <div className="d-flex align-items-start">
                <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3 mt-1">
                  <i className="fa-solid fa-user text-primary"></i>
                </div>
                <div>
                  <h6 className="mb-1">Account Information</h6>
                  <p className="text-muted small mb-0">Your email address and account details</p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex align-items-start">
                <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3 mt-1">
                  <i className="fa-solid fa-exclamation-triangle text-primary"></i>
                </div>
                <div>
                  <h6 className="mb-1">Issue Description</h6>
                  <p className="text-muted small mb-0">Clear description of the problem you're experiencing</p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex align-items-start">
                <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3 mt-1">
                  <i className="fa-solid fa-desktop text-primary"></i>
                </div>
                <div>
                  <h6 className="mb-1">Screen Access</h6>
                  <p className="text-muted small mb-0">Be ready to share your screen if needed</p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex align-items-start">
                <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3 mt-1">
                  <i className="fa-solid fa-list text-primary"></i>
                </div>
                <div>
                  <h6 className="mb-1">Steps Taken</h6>
                  <p className="text-muted small mb-0">Any troubleshooting steps you've already tried</p>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Alternative Contact Methods */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0">
          <h5 className="mb-0 fw-bold">Other Ways to Get Help</h5>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <div className="text-center p-3 border rounded-3 h-100">
                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                  <i className="fa-solid fa-comments text-success fs-4"></i>
                </div>
                <h6 className="mb-2">Live Chat</h6>
                <p className="text-muted small mb-3">Chat with support online</p>
                <Button variant="outline-success" size="sm" className="w-100">
                  Start Chat
                </Button>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-3 border rounded-3 h-100">
                <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                  <i className="fa-solid fa-envelope text-info fs-4"></i>
                </div>
                <h6 className="mb-2">Email Support</h6>
                <p className="text-muted small mb-3">Send us a detailed message</p>
                <Button variant="outline-info" size="sm" className="w-100">
                  Send Email
                </Button>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-3 border rounded-3 h-100">
                <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                  <i className="fa-solid fa-ticket text-warning fs-4"></i>
                </div>
                <h6 className="mb-2">Support Ticket</h6>
                <p className="text-muted small mb-3">Create a support request</p>
                <Button variant="outline-warning" size="sm" className="w-100">
                  Create Ticket
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default PhoneSupport;