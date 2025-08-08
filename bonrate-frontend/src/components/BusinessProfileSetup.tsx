import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

interface BusinessProfileSetupProps {
  show: boolean;
  onHide: () => void;
  onNext: () => void;
}

const BusinessProfileSetup = ({ show, onHide, onNext }: BusinessProfileSetupProps) => {
  const [businessData, setBusinessData] = useState({
    name: '',
    website: '',
    industry: '',
    logo: null as File | null,
    googlePlaceId: '',
    yelpBusinessId: '',
    facebookPageId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessData(prev => ({
      ...prev,
      logo: e.target.files?.[0] || null
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the business profile data
    console.log('Business profile data:', businessData);
    
    // Move to the next step
    if (onNext) onNext();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="business-profile-modal"
      fullscreen="sm-down"
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">Business Profile Setup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="small fw-medium">Setup Progress</span>
            <span className="small text-muted">Step 1 of 3</span>
          </div>
          <div className="progress">
            <div 
              className="progress-bar bg-primary" 
              role="progressbar" 
              style={{ width: '33%' }} 
              aria-valuenow={33} 
              aria-valuemin={0} 
              aria-valuemax={100}
            ></div>
          </div>
        </div>

        <Form onSubmit={handleSubmit}>
          <div className="bg-primary bg-opacity-10 p-3 rounded mb-4">
            <h5 className="text-primary mb-2">🏢 Business Information</h5>
            <p className="small text-muted mb-0">
              This information will be used to customize your review requests and connect to review platforms.
            </p>
          </div>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Business Name*</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={businessData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Business Name"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="url"
                  name="website"
                  value={businessData.website}
                  onChange={handleChange}
                  placeholder="https://yourbusiness.com"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Industry</Form.Label>
                <Form.Select
                  name="industry"
                  value={businessData.industry}
                  onChange={handleChange}
                >
                  <option value="">Select Industry</option>
                  <option value="retail">Retail</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="professional_services">Professional Services</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Business Logo</Form.Label>
                <Form.Control
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <Form.Text className="text-muted">
                  Recommended size: 200x200px
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <div className="bg-primary bg-opacity-10 p-3 rounded mb-4 mt-4">
            <h5 className="text-primary mb-2">🌐 Review Platforms</h5>
            <p className="small text-muted mb-0">
              Connect your business profiles on review platforms to collect reviews in one place.
            </p>
          </div>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="fa-brands fa-google text-danger me-2"></i>
                  Google Business ID
                </Form.Label>
                <Form.Control
                  type="text"
                  name="googlePlaceId"
                  value={businessData.googlePlaceId}
                  onChange={handleChange}
                  placeholder="Google Place ID"
                />
                <Form.Text className="text-muted">
                  Find your Place ID on Google Maps Platform
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="fa-brands fa-yelp text-danger me-2"></i>
                  Yelp Business ID
                </Form.Label>
                <Form.Control
                  type="text"
                  name="yelpBusinessId"
                  value={businessData.yelpBusinessId}
                  onChange={handleChange}
                  placeholder="Yelp Business ID"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="fa-brands fa-facebook text-primary me-2"></i>
                  Facebook Page ID
                </Form.Label>
                <Form.Control
                  type="text"
                  name="facebookPageId"
                  value={businessData.facebookPageId}
                  onChange={handleChange}
                  placeholder="Facebook Page ID"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex flex-column flex-sm-row justify-content-between mt-4 gap-2">
            <Button variant="link" className="text-muted order-3 order-sm-1" onClick={onHide}>
              Skip for now
            </Button>
            <div className="d-flex flex-column flex-sm-row gap-2 order-1 order-sm-2">
              <Button variant="outline-secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                <i className="fa-solid fa-arrow-right me-2"></i>
                Save & Continue
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BusinessProfileSetup;