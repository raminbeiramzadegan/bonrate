import React, { useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import Layout from '../components/Layout';

const EmailSupport = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@example.com',
    priority: 'medium',
    category: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const headerActions = (
    <Button variant="outline-primary" size="sm" onClick={() => window.history.back()}>
      <i className="fa-solid fa-arrow-left me-1"></i>
      Back to Help
    </Button>
  );

  const tickets = [
    { id: 'SP-2024-001', title: 'Campaign not sending emails', date: 'Dec 28, 2024', status: 'Resolved', statusColor: 'success' },
    { id: 'SP-2024-002', title: 'Integration with Google Reviews', date: 'Dec 30, 2024', status: 'In Progress', statusColor: 'warning' },
    { id: 'SP-2024-003', title: 'Billing question about upgrade', date: 'Jan 2, 2025', status: 'New', statusColor: 'primary' }
  ];

  return (
    <Layout 
      title="Email Support" 
      subtitle="Send us a detailed message and we'll get back to you within 24 hours"
      headerActions={headerActions}
    >
      <div className="mx-auto" style={{ maxWidth: '800px' }}>
        {/* Email Support Form */}
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Body className="p-4">
            <Form>
              <Row className="g-3 mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Priority Level</Form.Label>
                <Form.Select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                >
                  <option value="low">Low - General inquiry</option>
                  <option value="medium">Medium - Account or feature question</option>
                  <option value="high">High - Technical issue affecting work</option>
                  <option value="urgent">Urgent - Critical system problem</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  <option value="">Select a category</option>
                  <option value="account">Account & Billing</option>
                  <option value="campaigns">Campaigns & Templates</option>
                  <option value="automation">Automation & Workflows</option>
                  <option value="analytics">Analytics & Reports</option>
                  <option value="integrations">Integrations & APIs</option>
                  <option value="technical">Technical Issues</option>
                  <option value="feature">Feature Request</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Brief description of your issue"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Detailed Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Please provide as much detail as possible about your question or issue. Include any error messages, steps you've taken, and what you expected to happen."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                />
                <Form.Text className="text-muted">Minimum 20 characters required</Form.Text>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Attachments (Optional)</Form.Label>
                <div className="border-2 border-dashed rounded p-4 text-center" style={{ borderColor: '#dee2e6', cursor: 'pointer' }}>
                  <i className="fa-solid fa-cloud-arrow-up fs-1 text-muted mb-2"></i>
                  <p className="text-muted mb-1">Drag and drop files here, or click to browse</p>
                  <small className="text-muted">Supported formats: JPG, PNG, PDF, DOC (Max 10MB)</small>
                  <Form.Control type="file" multiple className="d-none" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" />
                </div>
              </Form.Group>

              <div className="bg-light rounded p-3 mb-4">
                <div className="d-flex align-items-start">
                  <i className="fa-solid fa-info-circle text-primary me-3 mt-1"></i>
                  <div>
                    <h6 className="mb-1">Response Time</h6>
                    <p className="text-muted small mb-0">We typically respond to support emails within 24 hours during business days. For urgent issues, please use our live chat or phone support.</p>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <Button variant="outline-secondary">
                  Save as Draft
                </Button>
                <Button variant="primary">
                  <i className="fa-solid fa-paper-plane me-2"></i>
                  Send Message
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* Previous Tickets */}
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white border-0">
            <h5 className="mb-0">Your Recent Support Tickets</h5>
          </Card.Header>
          <Card.Body className="p-0">
            {tickets.map((ticket, index) => (
              <div key={ticket.id} className={`p-4 ${index < tickets.length - 1 ? 'border-bottom' : ''}`}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">#{ticket.id} - {ticket.title}</h6>
                    <small className="text-muted">Created on {ticket.date}</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className={`badge bg-${ticket.statusColor} me-3`}>{ticket.status}</span>
                    <Button variant="link" size="sm" className="p-0">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export default EmailSupport;