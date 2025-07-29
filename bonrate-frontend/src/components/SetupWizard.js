import React, { useState } from 'react';
import { Modal, Button, ProgressBar, Row, Col, Form } from 'react-bootstrap';
import BusinessProfileSetup from './BusinessProfileSetup';

const SetupWizard = ({ show, onHide }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showBusinessSetup, setShowBusinessSetup] = useState(false);
  const [showReviewPlatforms, setShowReviewPlatforms] = useState(false);
  const [showMessagingSetup, setShowMessagingSetup] = useState(false);
  
  const handleNext = () => {
    // Show the business profile setup page
    setShowBusinessSetup(true);
  };
  
  const handleBusinessSetupClose = () => {
    setShowBusinessSetup(false);
  };
  
  const handleBusinessSetupNext = () => {
    // Navigate to the next step (review platforms)
    setShowBusinessSetup(false);
    setCurrentStep(2);
    setShowReviewPlatforms(true);
  };
  
  const handleReviewPlatformsClose = () => {
    setShowReviewPlatforms(false);
  };
  
  const handleReviewPlatformsNext = () => {
    // Navigate to the next step (messaging setup)
    setShowReviewPlatforms(false);
    setCurrentStep(3);
    setShowMessagingSetup(true);
  };
  
  const handleMessagingSetupClose = () => {
    setShowMessagingSetup(false);
  };
  
  const handleMessagingSetupNext = () => {
    // Complete the setup process
    setShowMessagingSetup(false);
    onHide();
    // Here you would typically save all the setup data and redirect to the dashboard
  };
  
  return (
    <>
      <Modal 
        show={show && !showBusinessSetup} 
        onHide={onHide}
        centered
        size="lg"
        className="setup-wizard-modal"
        fullscreen="sm-down"
      >
        <Modal.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fs-4 fw-bold text-primary mb-0">Welcome to Bonrate Pro!</h2>
            <Button variant="link" className="p-0 text-muted" onClick={onHide}>
              <i className="fa-solid fa-times"></i>
            </Button>
          </div>
          
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small fw-medium">Setup Progress</span>
              <span className="small text-muted">Step 1 of 3</span>
            </div>
            <ProgressBar now={33} className="mb-3" />
          </div>
          
          <div className="mb-4">
            <div className="bg-primary bg-opacity-10 p-4 rounded mb-4">
              <h3 className="fw-semibold mb-2 text-primary">🎯 Let's Get You Started!</h3>
              <p className="small text-muted mb-0">We'll guide you through setting up your first review campaign in just 3 simple steps.</p>
            </div>
            
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle me-3" style={{width: '1.5rem', height: '1.5rem'}}>
                  <span className="small">1</span>
                </div>
                <span className="small fw-medium">Connect your business profile</span>
              </div>
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25 text-muted rounded-circle me-3" style={{width: '1.5rem', height: '1.5rem'}}>
                  <span className="small">2</span>
                </div>
                <span className="small text-muted">Import your first contacts</span>
              </div>
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25 text-muted rounded-circle me-3" style={{width: '1.5rem', height: '1.5rem'}}>
                  <span className="small">3</span>
                </div>
                <span className="small text-muted">Send your first campaign</span>
              </div>
            </div>
          </div>
          
          <div className="d-flex justify-content-between">
            <Button variant="link" className="text-muted" onClick={onHide}>
              Skip for now
            </Button>
            <Button variant="primary" onClick={handleNext}>
              Let's Start!
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      
      {/* Business Profile Setup Modal */}
      <BusinessProfileSetup 
        show={showBusinessSetup} 
        onHide={handleBusinessSetupClose} 
        onNext={handleBusinessSetupNext} 
      />
      
      {/* Review Platforms Modal */}
      <Modal 
        show={showReviewPlatforms} 
        onHide={handleReviewPlatformsClose}
        centered
        size="lg"
        className="review-platforms-modal"
        fullscreen="sm-down"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Connect Review Platforms</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small fw-medium">Setup Progress</span>
              <span className="small text-muted">Step 2 of 3</span>
            </div>
            <div className="progress">
              <div 
                className="progress-bar bg-primary" 
                role="progressbar" 
                style={{ width: '66%' }} 
                aria-valuenow="66" 
                aria-valuemin="0" 
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          
          <div className="bg-success bg-opacity-10 p-3 rounded mb-4">
            <h5 className="text-success mb-2">⭐ Connect Review Platforms</h5>
            <p className="small text-muted mb-0">
              Add links to your review profiles so customers can easily leave reviews
            </p>
          </div>
          
          <div className="mb-4">
            <div className="mb-3 border border-light rounded p-3">
              <div className="d-flex align-items-center mb-2">
                <div className="d-flex align-items-center justify-content-center bg-danger text-white rounded-circle me-2" style={{width: '2rem', height: '2rem'}}>
                  <i className="fa-brands fa-google"></i>
                </div>
                <div>
                  <h5 className="mb-0">Google Business Profile</h5>
                  <p className="small text-muted mb-0">Most important for local businesses</p>
                </div>
              </div>
              <Form.Control 
                type="url" 
                placeholder="https://g.page/your-business" 
                className="mt-2" 
              />
              <Form.Text className="text-muted">
                Find your Google review link in Google My Business
              </Form.Text>
            </div>
            
            <div className="mb-3 border border-light rounded p-3">
              <div className="d-flex align-items-center mb-2">
                <div className="d-flex align-items-center justify-content-center bg-danger text-white rounded-circle me-2" style={{width: '2rem', height: '2rem'}}>
                  <i className="fa-brands fa-yelp"></i>
                </div>
                <div>
                  <h5 className="mb-0">Yelp</h5>
                  <p className="small text-muted mb-0">Great for restaurants & local services</p>
                </div>
              </div>
              <Form.Control 
                type="url" 
                placeholder="https://www.yelp.com/biz/your-business" 
                className="mt-2" 
              />
            </div>
            
            <div className="mb-3 border border-light rounded p-3">
              <div className="d-flex align-items-center mb-2">
                <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle me-2" style={{width: '2rem', height: '2rem'}}>
                  <i className="fa-brands fa-facebook"></i>
                </div>
                <div>
                  <h5 className="mb-0">Facebook</h5>
                  <p className="small text-muted mb-0">Social proof for your business</p>
                </div>
              </div>
              <Form.Control 
                type="url" 
                placeholder="https://www.facebook.com/your-business" 
                className="mt-2" 
              />
            </div>
          </div>
          
          <div className="d-flex justify-content-between mt-4">
            <Button variant="link" className="text-muted" onClick={handleReviewPlatformsClose}>
              Skip for now
            </Button>
            <div>
              <Button variant="outline-secondary" className="me-2" onClick={() => {
                setShowReviewPlatforms(false);
                setShowBusinessSetup(true);
                setCurrentStep(1);
              }}>
                Previous
              </Button>
              <Button variant="primary" onClick={handleReviewPlatformsNext}>
                Next Step
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      
      {/* Messaging Setup Modal */}
      <Modal 
        show={showMessagingSetup} 
        onHide={handleMessagingSetupClose}
        centered
        size="lg"
        className="messaging-setup-modal"
        fullscreen="sm-down"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Configure Messaging</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small fw-medium">Setup Progress</span>
              <span className="small text-muted">Step 3 of 3</span>
            </div>
            <div className="progress">
              <div 
                className="progress-bar bg-primary" 
                role="progressbar" 
                style={{ width: '100%' }} 
                aria-valuenow="100" 
                aria-valuemin="0" 
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          
          <div className="bg-secondary bg-opacity-10 p-3 rounded mb-4">
            <h5 className="text-secondary mb-2">✉️ Configure Messaging</h5>
            <p className="small text-muted mb-0">
              Choose how you want to send review requests to customers
            </p>
          </div>
          
          <div className="mb-4">
            <h5 className="mb-3">Select Messaging Channels</h5>
            
            <div className="mb-3">
              <Form.Check 
                type="checkbox" 
                id="sms-channel"
                label={
                  <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center justify-content-center bg-success text-white rounded-circle me-2" style={{width: '2rem', height: '2rem'}}>
                      <i className="fa-solid fa-sms"></i>
                    </div>
                    <div>
                      <span className="fw-medium">SMS Text Messages</span>
                      <p className="small text-muted mb-0">Highest open rates (98%)</p>
                    </div>
                  </div>
                }
                defaultChecked
                className="border border-light rounded p-2"
              />
            </div>
            
            <div className="mb-3">
              <Form.Check 
                type="checkbox" 
                id="email-channel"
                label={
                  <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle me-2" style={{width: '2rem', height: '2rem'}}>
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div>
                      <span className="fw-medium">Email</span>
                      <p className="small text-muted mb-0">Professional and detailed</p>
                    </div>
                  </div>
                }
                defaultChecked
                className="border border-light rounded p-2"
              />
            </div>
            
            <div className="mb-3">
              <Form.Check 
                type="checkbox" 
                id="whatsapp-channel"
                label={
                  <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center justify-content-center bg-success text-white rounded-circle me-2" style={{width: '2rem', height: '2rem'}}>
                      <i className="fa-brands fa-whatsapp"></i>
                    </div>
                    <div>
                      <span className="fw-medium">WhatsApp</span>
                      <p className="small text-muted mb-0">Popular internationally</p>
                    </div>
                  </div>
                }
                className="border border-light rounded p-2"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <h5 className="mb-3">Default Message Template</h5>
            
            <div className="border border-light rounded p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-medium">SMS Template</span>
                <Button variant="link" className="p-0 text-primary">
                  <i className="fa-solid fa-edit me-1"></i>
                  Customize
                </Button>
              </div>
              
              <div className="bg-light p-3 rounded">
                <p className="mb-2">Hi {'{customer_name}'}! 👋</p>
                <p className="mb-2">Thanks for choosing {'{business_name}'}! We'd love to hear about your experience.</p>
                <p className="mb-2">Could you take 30 seconds to leave us a review?</p>
                <p className="text-primary">{'{review_link}'}</p>
                <p className="mt-2 small text-muted">- {'{business_name}'} Team</p>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h5 className="mb-3">Timing Settings</h5>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Send delay after service</Form.Label>
                  <Form.Select>
                    <option>Immediately</option>
                    <option>1 hour later</option>
                    <option>1 day later</option>
                    <option>3 days later</option>
                    <option>1 week later</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Follow-up reminder</Form.Label>
                  <Form.Select>
                    <option>No follow-up</option>
                    <option>3 days later</option>
                    <option>1 week later</option>
                    <option>2 weeks later</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>
          
          <div className="d-flex justify-content-between mt-4">
            <Button variant="link" className="text-muted" onClick={handleMessagingSetupClose}>
              Skip for now
            </Button>
            <div>
              <Button variant="outline-secondary" className="me-2" onClick={() => {
                setShowMessagingSetup(false);
                setShowReviewPlatforms(true);
                setCurrentStep(2);
              }}>
                Previous
              </Button>
              <Button variant="primary" onClick={handleMessagingSetupNext}>
                Complete Setup
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SetupWizard;