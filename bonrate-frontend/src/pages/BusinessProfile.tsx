import React, { useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import Layout from '../components/Layout';
import '../styles/Campaign.css';

const BusinessProfile = () => {
  const [businessData, setBusinessData] = useState({
    name: 'Bella Vista Restaurant',
    type: 'Restaurant',
    phone: '+1 (555) 123-4567',
    email: 'contact@bellavista.com',
    address: '123 Main Street, Downtown, CA 90210',
    description: 'Bella Vista Restaurant offers authentic Italian cuisine in a warm, family-friendly atmosphere.',
    website: 'https://bellavista.com',
    facebook: 'https://facebook.com/bellavista',
    instagram: 'https://instagram.com/bellavista',
    googleBusiness: ''
  });

  const [businessHours, setBusinessHours] = useState({
    monday: { enabled: true, open: '09:00', close: '22:00' },
    tuesday: { enabled: true, open: '09:00', close: '22:00' },
    wednesday: { enabled: true, open: '09:00', close: '22:00' },
    thursday: { enabled: true, open: '09:00', close: '22:00' },
    friday: { enabled: true, open: '09:00', close: '23:00' },
    saturday: { enabled: true, open: '10:00', close: '23:00' },
    sunday: { enabled: false, open: '10:00', close: '21:00' }
  });

  const handleBusinessChange = (field: string, value: any) => {
    setBusinessData(prev => ({ ...prev, [field]: value }));
  };

  const handleHoursChange = (day: string, field: string, value: any) => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: { ...prev[day as keyof typeof prev], [field]: value }
    }));
  };

  const headerActions = (
    <Button variant="primary" size="sm">
      <i className="fa-solid fa-save me-1 d-none d-sm-inline"></i>
      <span className="d-none d-sm-inline">Save Changes</span>
      <i className="fa-solid fa-save d-sm-none"></i>
    </Button>
  );

  return (
    <Layout 
      title="Business Profile" 
      subtitle="Manage your business information and settings"
      headerActions={headerActions}
    >
      {/* Business Information */}
      <Card className="mb-4">
        <Card.Header className="bg-white">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Business Information</h5>
            <Button variant="link" className="p-0 text-primary">
              <i className="fa-solid fa-pen me-1"></i>Edit
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Business Name</Form.Label>
                <Form.Control
                  type="text"
                  value={businessData.name}
                  onChange={(e) => handleBusinessChange('name', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Business Type</Form.Label>
                <Form.Select
                  value={businessData.type}
                  onChange={(e) => handleBusinessChange('type', e.target.value)}
                >
                  <option>Restaurant</option>
                  <option>Retail</option>
                  <option>Service</option>
                  <option>Healthcare</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  value={businessData.phone}
                  onChange={(e) => handleBusinessChange('phone', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={businessData.email}
                  onChange={(e) => handleBusinessChange('email', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Business Address</Form.Label>
                <Form.Control
                  type="text"
                  value={businessData.address}
                  onChange={(e) => handleBusinessChange('address', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Business Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={businessData.description}
                  onChange={(e) => handleBusinessChange('description', e.target.value)}
                  placeholder="Tell customers about your business..."
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Business Hours */}
      <Card className="mb-4">
        <Card.Header className="bg-white">
          <h5 className="mb-0">Business Hours</h5>
        </Card.Header>
        <Card.Body>
          {Object.entries(businessHours).map(([day, hours]) => (
            <Row key={day} className="align-items-center mb-3">
              <Col xs={3}>
                <Form.Check
                  type="checkbox"
                  checked={hours.enabled}
                  onChange={(e) => handleHoursChange(day, 'enabled', e.target.checked)}
                  label={day.charAt(0).toUpperCase() + day.slice(1)}
                />
              </Col>
              <Col xs={9}>
                <Row className="g-2">
                  <Col xs={5}>
                    <Form.Control
                      type="time"
                      value={hours.open}
                      disabled={!hours.enabled}
                      onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                      size="sm"
                    />
                  </Col>
                  <Col xs={2} className="text-center">
                    <span className="text-muted">to</span>
                  </Col>
                  <Col xs={5}>
                    <Form.Control
                      type="time"
                      value={hours.close}
                      disabled={!hours.enabled}
                      onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                      size="sm"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
        </Card.Body>
      </Card>

      {/* Social Media */}
      <Card className="mb-4">
        <Card.Header className="bg-white">
          <h5 className="mb-0">Social Media & Online Presence</h5>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Website URL</Form.Label>
                <Form.Control
                  type="url"
                  value={businessData.website}
                  onChange={(e) => handleBusinessChange('website', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Facebook Page</Form.Label>
                <Form.Control
                  type="url"
                  value={businessData.facebook}
                  onChange={(e) => handleBusinessChange('facebook', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Instagram</Form.Label>
                <Form.Control
                  type="url"
                  value={businessData.instagram}
                  onChange={(e) => handleBusinessChange('instagram', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Google My Business</Form.Label>
                <Form.Control
                  type="url"
                  value={businessData.googleBusiness}
                  onChange={(e) => handleBusinessChange('googleBusiness', e.target.value)}
                  placeholder="Google Business Profile URL"
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Review Settings */}
      <Card>
        <Card.Header className="bg-white">
          <h5 className="mb-0">Review Collection Settings</h5>
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="mb-1">Auto-send review requests</h6>
              <p className="text-muted small mb-0">Automatically send review requests after customer interactions</p>
            </div>
            <Form.Check type="switch" defaultChecked />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="mb-1">Follow-up reminders</h6>
              <p className="text-muted small mb-0">Send reminder messages to customers who haven't left reviews</p>
            </div>
            <Form.Check type="switch" defaultChecked />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">Review response notifications</h6>
              <p className="text-muted small mb-0">Get notified when customers leave new reviews</p>
            </div>
            <Form.Check type="switch" defaultChecked />
          </div>
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default BusinessProfile;