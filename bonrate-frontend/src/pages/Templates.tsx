import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal, Form, Badge, Table } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/Campaign.css';

const Templates = () => {
  // const navigate = useNavigate();
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateData, setTemplateData] = useState({
    name: '',
    category: '',
    channel: 'sms',
    content: 'Hi {customer_name}! 👋\n\nThanks for choosing {business_name}! We\'d love to hear about your experience.\n\nCould you take 30 seconds to leave us a review?\n\n{review_link}\n\n- {business_name} Team'
  });
  
  const handleTemplateChange = (field: string, value: string) => {
    setTemplateData(prev => ({ ...prev, [field]: value }));
  };
  
  const renderLivePreview = () => {
    const sampleData = {
      customer_name: 'John Smith',
      business_name: 'Bonrate Pro',
      review_link: 'https://bonrate.pro/review/abc123'
    };
    
    let preview = templateData.content;
    Object.keys(sampleData).forEach(key => {
      preview = preview.replace(new RegExp(`{${key}}`, 'g'), sampleData[key as keyof typeof sampleData]);
    });
    
    return preview.split('\n').map((line, index) => (
      <div key={index}>{line || '\u00A0'}</div>
    ));
  };

  // Mock data
  const templates = [
    {
      id: 1,
      name: 'Spring Promo Review Request',
      type: 'Email + SMS',
      category: 'Promotional',
      usage: 542,
      openRate: '73%',
      clickRate: '54%',
      reviewRate: '40%',
      created: 'Mar 15, 2024',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Customer Appreciation Campaign',
      type: 'WhatsApp',
      category: 'Appreciation',
      usage: 234,
      openRate: '81%',
      clickRate: '75%',
      reviewRate: '45%',
      created: 'Mar 10, 2024',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Post-Service Follow-up',
      type: 'SMS',
      category: 'Follow-up',
      usage: 156,
      openRate: '68%',
      clickRate: '42%',
      reviewRate: '35%',
      created: 'Mar 5, 2024',
      status: 'Draft'
    }
  ];

  const stats = {
    totalTemplates: 24,
    messagesSent: 8547,
    openRate: 74,
    reviewsGenerated: 342
  };

  const headerActions = (
    <>
      <Button variant="outline-primary" className="d-flex align-items-center" size="sm">
        <i className="fa-solid fa-download me-1 d-none d-sm-inline"></i>
        <span className="d-none d-sm-inline">Export</span>
        <i className="fa-solid fa-download d-sm-none"></i>
      </Button>
      <Button variant="primary" className="d-flex align-items-center" onClick={() => setShowTemplateModal(true)} size="sm">
        <i className="fa-solid fa-plus me-1 d-none d-sm-inline"></i>
        <span className="d-none d-sm-inline">New Template</span>
        <i className="fa-solid fa-plus d-sm-none"></i>
      </Button>
    </>
  );

  return (
    <Layout 
      title="Message Templates" 
      subtitle="Create and manage your review request templates"
      headerActions={headerActions}
    >
      {/* Template Overview */}
      <div className="platform-overview mb-4">
        <div className="overview-card">
          <div className="d-flex justify-content-between">
            <div className="flex-grow-1">
              <h2 className="fs-1 fw-bold mb-3">📝 Template Library</h2>
              <p className="fs-5 mb-4 opacity-75">Create personalized message templates for different customer segments and campaign types with AI-powered optimization.</p>
              <Row className="mt-4">
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-magic-wand-sparkles text-warning"></i>
                      <span className="fw-semibold">AI-Powered Templates</span>
                    </div>
                    <p className="small opacity-75">Generate personalized messages using AI based on customer data</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-language text-success"></i>
                      <span className="fw-semibold">Multi-Channel Support</span>
                    </div>
                    <p className="small opacity-75">Create templates for SMS, Email, and WhatsApp with channel-specific optimization</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-chart-line text-primary"></i>
                      <span className="fw-semibold">Performance Tracking</span>
                    </div>
                    <p className="small opacity-75">Monitor template performance and optimize based on real data</p>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="d-none d-md-block ms-4">
              <div className="bg-white bg-opacity-25 rounded-circle p-4">
                <i className="fa-solid fa-file-lines fs-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-4">
        <h2 className="fs-5 fw-semibold mb-3">📊 Template Performance</h2>
        <Row className="g-3">
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-file-lines fs-2 text-primary"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Total Templates</Card.Title>
                <h2 className="mb-0">{stats.totalTemplates}</h2>
                <div className="mt-2">
                  <Badge bg="success" className="small">+3 this month</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-paper-plane fs-2 text-success"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Messages Sent</Card.Title>
                <h2 className="mb-0">{stats.messagesSent.toLocaleString()}</h2>
                <div className="mt-2">
                  <Badge bg="success" className="small">+12.5% vs last month</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-envelope-open fs-2 text-warning"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Open Rate</Card.Title>
                <h2 className="mb-0">{stats.openRate}%</h2>
                <div className="mt-2">
                  <Badge bg="success" className="small">+5.2% improvement</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-star fs-2 text-secondary"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Reviews Generated</Card.Title>
                <h2 className="mb-0">{stats.reviewsGenerated}</h2>
                <div className="mt-2">
                  <Badge bg="success" className="small">+18.3% this month</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Filters */}
      <div className="mb-4">
        <Card>
          <Card.Body>
            <Row className="g-3">
              <Col md={4}>
                <Form.Control 
                  type="text" 
                  placeholder="Search templates..." 
                  className="ps-4"
                />
                <i className="fa-solid fa-magnifying-glass position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" style={{marginTop: '-12px'}}></i>
              </Col>
              <Col md={2}>
                <Form.Select>
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Archived</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Form.Select>
                  <option>All Channels</option>
                  <option>Email</option>
                  <option>SMS</option>
                  <option>WhatsApp</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Form.Select>
                  <option>All Categories</option>
                  <option>Promotional</option>
                  <option>Follow-up</option>
                  <option>Appreciation</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Button variant="outline-secondary" className="w-100">
                  <i className="fa-solid fa-filter me-2"></i>
                  Clear
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      {/* Templates Table */}
      <div className="mb-4">
        <h2 className="fs-5 fw-semibold mb-3">📋 Your Templates</h2>
        <Card>
          <Card.Body className="p-0">
            <div className="d-none d-md-block">
              <Table responsive hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 py-3">
                      <Form.Check type="checkbox" />
                    </th>
                    <th className="border-0 py-3">Template Name</th>
                    <th className="border-0 py-3">Status</th>
                    <th className="border-0 py-3">Channel</th>
                    <th className="border-0 py-3">Usage</th>
                    <th className="border-0 py-3">Open Rate</th>
                    <th className="border-0 py-3">Click Rate</th>
                    <th className="border-0 py-3">Review Rate</th>
                    <th className="border-0 py-3">Created</th>
                    <th className="border-0 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map(template => (
                    <tr key={template.id}>
                      <td>
                        <Form.Check type="checkbox" />
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded me-3" style={{width: '2rem', height: '2rem'}}>
                            <i className="fa-solid fa-star text-primary"></i>
                          </div>
                          <div>
                            <div className="fw-medium">{template.name}</div>
                            <div className="small text-muted">{template.category}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Badge bg={template.status === 'Active' ? 'success' : 'secondary'}>
                          {template.status}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg="light" text="dark">{template.type}</Badge>
                      </td>
                      <td className="fw-medium">{template.usage}</td>
                      <td>
                        <span className="fw-medium">{template.openRate}</span>
                      </td>
                      <td>
                        <span className="fw-medium">{template.clickRate}</span>
                      </td>
                      <td>
                        <span className="fw-medium">{template.reviewRate}</span>
                      </td>
                      <td className="text-muted">{template.created}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button variant="outline-primary" size="sm">
                            <i className="fa-solid fa-eye"></i>
                          </Button>
                          <Button variant="outline-secondary" size="sm">
                            <i className="fa-solid fa-copy"></i>
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            <i className="fa-solid fa-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="d-md-none p-3">
              {templates.map(template => (
                <Card key={template.id} className="campaign-card mb-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded me-3" style={{width: '2.5rem', height: '2.5rem'}}>
                          <i className="fa-solid fa-star text-primary"></i>
                        </div>
                        <div>
                          <h6 className="mb-1">{template.name}</h6>
                          <div className="d-flex gap-2 mb-2">
                            <Badge bg={template.status === 'Active' ? 'success' : 'secondary'} className="small">
                              {template.status}
                            </Badge>
                            <Badge bg="light" text="dark" className="small">{template.type}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex gap-1">
                        <Button variant="outline-primary" size="sm">
                          <i className="fa-solid fa-eye"></i>
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          <i className="fa-solid fa-copy"></i>
                        </Button>
                      </div>
                    </div>
                    
                    <Row className="text-center small">
                      <Col xs={3}>
                        <div className="text-muted">Usage</div>
                        <div className="fw-bold">{template.usage}</div>
                      </Col>
                      <Col xs={3}>
                        <div className="text-muted">Open</div>
                        <div className="fw-bold text-success">{template.openRate}</div>
                      </Col>
                      <Col xs={3}>
                        <div className="text-muted">Click</div>
                        <div className="fw-bold text-primary">{template.clickRate}</div>
                      </Col>
                      <Col xs={3}>
                        <div className="text-muted">Review</div>
                        <div className="fw-bold text-warning">{template.reviewRate}</div>
                      </Col>
                    </Row>
                    
                    <div className="mt-3 pt-3 border-top">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="small text-muted">Created: {template.created}</span>
                        <Button variant="outline-danger" size="sm">
                          <i className="fa-solid fa-trash"></i>
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Template Modal */}
      <Modal 
        show={showTemplateModal} 
        onHide={() => setShowTemplateModal(false)}
        centered
        size="lg"
        className="setup-wizard-modal"
        fullscreen="sm-down"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            <i className="fa-solid fa-file-lines me-2"></i>
            Create New Template
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-primary bg-opacity-10 p-4 rounded mb-4">
            <h5 className="text-primary mb-2">✨ Template Builder</h5>
            <p className="small text-muted mb-0">
              Create personalized message templates with AI assistance and variable placeholders.
            </p>
          </div>
          
          <Row>
            <Col md={6}>
              <Form>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Template Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="e.g., Welcome New Customers" 
                        value={templateData.name}
                        onChange={(e) => handleTemplateChange('name', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Select 
                        value={templateData.category}
                        onChange={(e) => handleTemplateChange('category', e.target.value)}
                      >
                        <option value="">Select Category</option>
                        <option value="welcome">Welcome</option>
                        <option value="follow-up">Follow-up</option>
                        <option value="promotional">Promotional</option>
                        <option value="appreciation">Appreciation</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Channel Type</Form.Label>
                  <div className="d-flex gap-3">
                    <Form.Check 
                      type="radio" 
                      name="channel" 
                      label="SMS" 
                      value="sms"
                      checked={templateData.channel === 'sms'}
                      onChange={(e) => handleTemplateChange('channel', e.target.value)}
                    />
                    <Form.Check 
                      type="radio" 
                      name="channel" 
                      label="Email" 
                      value="email"
                      checked={templateData.channel === 'email'}
                      onChange={(e) => handleTemplateChange('channel', e.target.value)}
                    />
                    <Form.Check 
                      type="radio" 
                      name="channel" 
                      label="WhatsApp" 
                      value="whatsapp"
                      checked={templateData.channel === 'whatsapp'}
                      onChange={(e) => handleTemplateChange('channel', e.target.value)}
                    />
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Message Content</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={6} 
                    placeholder="Hi {customer_name}! Thanks for choosing {business_name}..."
                    value={templateData.content}
                    onChange={(e) => handleTemplateChange('content', e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Use variables: {'{customer_name}'}, {'{business_name}'}, {'{review_link}'}
                  </Form.Text>
                </Form.Group>
              </Form>
            </Col>
            
            <Col md={6}>
              <div className="mb-3">
                <h6 className="fw-semibold mb-3">
                  <i className="fa-solid fa-eye me-2 text-primary"></i>
                  Live Preview
                </h6>
                
                <div className="border rounded p-3 bg-light" style={{minHeight: '300px'}}>
                  <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
                    <div className="d-flex align-items-center justify-content-center bg-success text-white rounded-circle me-2" style={{width: '1.5rem', height: '1.5rem'}}>
                      <i className={`fa-solid ${
                        templateData.channel === 'sms' ? 'fa-sms' : 
                        templateData.channel === 'email' ? 'fa-envelope' : 
                        'fa-brands fa-whatsapp'
                      }`} style={{fontSize: '0.7rem'}}></i>
                    </div>
                    <div>
                      <div className="small fw-medium">
                        {templateData.channel === 'sms' ? 'SMS Message' : 
                         templateData.channel === 'email' ? 'Email Message' : 
                         'WhatsApp Message'}
                      </div>
                      <div className="small text-muted">Preview with sample data</div>
                    </div>
                  </div>
                  
                  <div className="preview-content" style={{fontSize: '0.9rem', lineHeight: '1.4'}}>
                    {renderLivePreview()}
                  </div>
                  
                  <div className="mt-3 pt-2 border-top">
                    <div className="small text-muted">
                      <i className="fa-solid fa-info-circle me-1"></i>
                      Variables will be replaced with actual customer data
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <h6 className="small fw-semibold mb-2">Available Variables:</h6>
                  <div className="d-flex flex-wrap gap-1">
                    <Badge bg="light" text="dark" className="small">{'{customer_name}'}</Badge>
                    <Badge bg="light" text="dark" className="small">{'{business_name}'}</Badge>
                    <Badge bg="light" text="dark" className="small">{'{review_link}'}</Badge>
                    <Badge bg="light" text="dark" className="small">{'{service_date}'}</Badge>
                    <Badge bg="light" text="dark" className="small">{'{customer_email}'}</Badge>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          
          <div className="d-flex flex-column flex-sm-row justify-content-between mt-4 gap-2">
            <Button variant="link" className="text-muted order-2 order-sm-1" onClick={() => setShowTemplateModal(false)}>
              Cancel
            </Button>
            <div className="d-flex gap-2 order-1 order-sm-2">
              <Button variant="outline-primary">
                <i className="fa-solid fa-magic-wand-sparkles me-2"></i>
                AI Generate
              </Button>
              <Button variant="primary" onClick={() => setShowTemplateModal(false)}>
                Create Template
                <i className="fa-solid fa-arrow-right ms-2"></i>
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default Templates;