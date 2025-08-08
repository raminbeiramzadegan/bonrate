import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal, Form, Badge, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/Campaign.css';

const Automation = () => {
  const navigate = useNavigate();
  const [showAutomationModal, setShowAutomationModal] = useState(false);
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false);
  const [currentWizardStep, setCurrentWizardStep] = useState(1);
  const [automationData, setAutomationData] = useState({
    name: '',
    type: '',
    trigger: '',
    delay: 'immediately',
    sendTime: 'any',
    days: 'all',
    template: '',
    channel: 'sms',
    conditions: []
  });
  
  const handleAutomationChange = (field, value) => {
    setAutomationData(prev => ({ ...prev, [field]: value }));
  };
  
  const nextStep = () => {
    if (currentWizardStep < 4) {
      setCurrentWizardStep(currentWizardStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentWizardStep > 1) {
      setCurrentWizardStep(currentWizardStep - 1);
    }
  };

  // Mock data
  const automations = [
    {
      id: 1,
      name: 'New Customer Welcome Series',
      type: 'Drip Campaign',
      status: 'Active',
      trigger: 'New Customer',
      steps: 3,
      contacts: 1247,
      completionRate: '78%',
      created: 'Mar 15, 2024'
    },
    {
      id: 2,
      name: 'Post-Service Follow-up',
      type: 'Trigger-based',
      status: 'Active',
      trigger: 'Service Complete',
      steps: 2,
      contacts: 856,
      completionRate: '85%',
      created: 'Mar 10, 2024'
    },
    {
      id: 3,
      name: 'Review Reminder Sequence',
      type: 'Time-based',
      status: 'Paused',
      trigger: 'No Review After 7 Days',
      steps: 4,
      contacts: 423,
      completionRate: '62%',
      created: 'Mar 5, 2024'
    }
  ];

  const stats = {
    totalAutomations: 12,
    activeAutomations: 8,
    contactsInFlow: 3526,
    avgCompletionRate: 75
  };

  const headerActions = (
    <>
      <Button variant="outline-primary" className="d-flex align-items-center" size="sm">
        <i className="fa-solid fa-chart-line me-1 d-none d-sm-inline"></i>
        <span className="d-none d-sm-inline">Analytics</span>
        <i className="fa-solid fa-chart-line d-sm-none"></i>
      </Button>
      <Button variant="primary" className="d-flex align-items-center" onClick={() => setShowAutomationModal(true)} size="sm">
        <i className="fa-solid fa-plus me-1 d-none d-sm-inline"></i>
        <span className="d-none d-sm-inline">New Automation</span>
        <i className="fa-solid fa-plus d-sm-none"></i>
      </Button>
    </>
  );

  return (
    <Layout 
      title="Review Automation" 
      subtitle="Create smart workflows to automate your review collection process"
      headerActions={headerActions}
    >
      {/* Automation Overview */}
      <div className="platform-overview mb-4">
        <div className="overview-card">
          <div className="d-flex justify-content-between">
            <div className="flex-grow-1">
              <h2 className="fs-1 fw-bold mb-3">🤖 Smart Automation Hub</h2>
              <p className="fs-5 mb-4 opacity-75">Set up intelligent workflows that automatically send review requests based on customer behavior, timing, and engagement patterns.</p>
              <Row className="mt-4">
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-bolt text-warning"></i>
                      <span className="fw-semibold">Trigger-Based Flows</span>
                    </div>
                    <p className="small opacity-75">Automatically trigger campaigns based on customer actions and events</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-clock text-success"></i>
                      <span className="fw-semibold">Time-Based Sequences</span>
                    </div>
                    <p className="small opacity-75">Schedule follow-ups and reminders at optimal times</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-brain text-primary"></i>
                      <span className="fw-semibold">AI Optimization</span>
                    </div>
                    <p className="small opacity-75">Machine learning optimizes send times and message selection</p>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="d-none d-md-block ms-4">
              <div className="bg-white bg-opacity-25 rounded-circle p-4">
                <i className="fa-solid fa-robot fs-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-4">
        <h2 className="fs-5 fw-semibold mb-3">📊 Automation Performance</h2>
        <Row className="g-3">
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-robot fs-2 text-primary"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Total Automations</Card.Title>
                <h2 className="mb-0">{stats.totalAutomations}</h2>
                <div className="mt-2">
                  <Badge bg="success" className="small">+2 this month</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-play fs-2 text-success"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Active Flows</Card.Title>
                <h2 className="mb-0">{stats.activeAutomations}</h2>
                <div className="mt-2">
                  <Badge bg="primary" className="small">Running now</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-users fs-2 text-warning"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Contacts in Flow</Card.Title>
                <h2 className="mb-0">{stats.contactsInFlow.toLocaleString()}</h2>
                <div className="mt-2">
                  <Badge bg="warning" className="small">+15% this week</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-percentage fs-2 text-secondary"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Avg Completion</Card.Title>
                <h2 className="mb-0">{stats.avgCompletionRate}%</h2>
                <div className="mt-2">
                  <Badge bg="success" className="small">+8% improvement</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Quick Start Templates */}
      <div className="mb-4">
        <h2 className="fs-5 fw-semibold mb-3">🚀 Quick Start Templates</h2>
        <Row className="g-3">
          <Col md={4} className="mb-3">
            <Card className="h-100 border-start border-success border-4">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="d-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-circle me-3" style={{width: '3rem', height: '3rem'}}>
                    <i className="fa-solid fa-heart text-success fs-4"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Welcome Series</h5>
                    <Badge bg="success" className="small">HIGH CONVERSION</Badge>
                  </div>
                </div>
                <p className="small text-muted mb-3">3-step welcome sequence for new customers with personalized follow-ups</p>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="small text-muted">📊 85% completion rate</span>
                  <span className="small text-muted">⏱️ 7-day sequence</span>
                </div>
                <Button variant="success" size="sm" className="w-100">
                  <i className="fa-solid fa-magic-wand-sparkles me-2"></i>
                  Use Template
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 border-start border-primary border-4">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle me-3" style={{width: '3rem', height: '3rem'}}>
                    <i className="fa-solid fa-clock text-primary fs-4"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Follow-up Flow</h5>
                    <Badge bg="primary" className="small">MOST POPULAR</Badge>
                  </div>
                </div>
                <p className="small text-muted mb-3">Automated follow-up after service completion with smart timing</p>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="small text-muted">📊 78% completion rate</span>
                  <span className="small text-muted">⏱️ 3-day sequence</span>
                </div>
                <Button variant="primary" size="sm" className="w-100">
                  <i className="fa-solid fa-magic-wand-sparkles me-2"></i>
                  Use Template
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 border-start border-warning border-4">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="d-flex align-items-center justify-content-center bg-warning bg-opacity-10 rounded-circle me-3" style={{width: '3rem', height: '3rem'}}>
                    <i className="fa-solid fa-bell text-warning fs-4"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Review Reminders</h5>
                    <Badge bg="warning" className="small">RECOVERY FOCUSED</Badge>
                  </div>
                </div>
                <p className="small text-muted mb-3">Gentle reminders for customers who haven't left reviews yet</p>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="small text-muted">📊 62% completion rate</span>
                  <span className="small text-muted">⏱️ 14-day sequence</span>
                </div>
                <Button variant="warning" size="sm" className="w-100">
                  <i className="fa-solid fa-magic-wand-sparkles me-2"></i>
                  Use Template
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Active Automations */}
      <div className="mb-4">
        <h2 className="fs-5 fw-semibold mb-3">⚡ Your Automations</h2>
        <Card>
          <Card.Body className="p-0">
            {/* Desktop View */}
            <div className="d-none d-md-block">
              <div className="p-3 border-bottom bg-light">
                <Row className="align-items-center">
                  <Col md={4}><strong>Automation Name</strong></Col>
                  <Col md={2}><strong>Status</strong></Col>
                  <Col md={2}><strong>Contacts</strong></Col>
                  <Col md={2}><strong>Completion</strong></Col>
                  <Col md={2}><strong>Actions</strong></Col>
                </Row>
              </div>
              {automations.map(automation => (
                <div key={automation.id} className="p-3 border-bottom">
                  <Row className="align-items-center">
                    <Col md={4}>
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded me-3" style={{width: '2.5rem', height: '2.5rem'}}>
                          <i className="fa-solid fa-robot text-primary"></i>
                        </div>
                        <div>
                          <h6 className="mb-1">{automation.name}</h6>
                          <div className="small text-muted">{automation.type} • {automation.steps} steps</div>
                        </div>
                      </div>
                    </Col>
                    <Col md={2}>
                      <Badge bg={automation.status === 'Active' ? 'success' : 'warning'}>
                        {automation.status}
                      </Badge>
                    </Col>
                    <Col md={2}>
                      <span className="fw-medium">{automation.contacts.toLocaleString()}</span>
                    </Col>
                    <Col md={2}>
                      <div className="d-flex align-items-center">
                        <span className="fw-medium me-2">{automation.completionRate}</span>
                        <ProgressBar 
                          now={parseInt(automation.completionRate)} 
                          style={{width: '60px', height: '6px'}}
                          variant="success"
                        />
                      </div>
                    </Col>
                    <Col md={2}>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm">
                          <i className="fa-solid fa-edit"></i>
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          <i className="fa-solid fa-chart-line"></i>
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          <i className="fa-solid fa-pause"></i>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>

            {/* Mobile View */}
            <div className="d-md-none p-3">
              {automations.map(automation => (
                <Card key={automation.id} className="campaign-card mb-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded me-3" style={{width: '2.5rem', height: '2.5rem'}}>
                          <i className="fa-solid fa-robot text-primary"></i>
                        </div>
                        <div>
                          <h6 className="mb-1">{automation.name}</h6>
                          <div className="d-flex gap-2 mb-2">
                            <Badge bg={automation.status === 'Active' ? 'success' : 'warning'} className="small">
                              {automation.status}
                            </Badge>
                            <Badge bg="light" text="dark" className="small">{automation.type}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Row className="text-center small mb-3">
                      <Col xs={4}>
                        <div className="text-muted">Steps</div>
                        <div className="fw-bold">{automation.steps}</div>
                      </Col>
                      <Col xs={4}>
                        <div className="text-muted">Contacts</div>
                        <div className="fw-bold text-primary">{automation.contacts.toLocaleString()}</div>
                      </Col>
                      <Col xs={4}>
                        <div className="text-muted">Completion</div>
                        <div className="fw-bold text-success">{automation.completionRate}</div>
                      </Col>
                    </Row>
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="small text-muted">Created: {automation.created}</span>
                      <div className="d-flex gap-1">
                        <Button variant="outline-primary" size="sm">
                          <i className="fa-solid fa-edit"></i>
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          <i className="fa-solid fa-chart-line"></i>
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          <i className="fa-solid fa-pause"></i>
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

      {/* Automation Wizard Modal */}
      <Modal 
        show={showAutomationModal} 
        onHide={() => {
          setShowAutomationModal(false);
          setCurrentWizardStep(1);
        }}
        centered
        size="xl"
        className="setup-wizard-modal"
        fullscreen="sm-down"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            <i className="fa-solid fa-robot me-2"></i>
            Automation Wizard - Step {currentWizardStep} of 4
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small fw-medium">Setup Progress</span>
              <span className="small text-muted">Step {currentWizardStep} of 4</span>
            </div>
            <ProgressBar now={currentWizardStep * 25} />
          </div>
          
          {/* Step 1: Basic Info */}
          {currentWizardStep === 1 && (
            <div>
              <div className="bg-primary bg-opacity-10 p-4 rounded mb-4">
                <h5 className="text-primary mb-2">📋 Basic Information</h5>
                <p className="small text-muted mb-0">
                  Let's start with the basics of your automation workflow.
                </p>
              </div>
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Automation Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="e.g., Post-Service Review Request" 
                    value={automationData.name}
                    onChange={(e) => handleAutomationChange('name', e.target.value)}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Automation Type</Form.Label>
                  <Form.Select 
                    value={automationData.type}
                    onChange={(e) => handleAutomationChange('type', e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="welcome">Welcome Series</option>
                    <option value="follow-up">Post-Service Follow-up</option>
                    <option value="reminder">Review Reminder</option>
                    <option value="winback">Win-back Campaign</option>
                    <option value="custom">Custom Workflow</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Brief description of this automation..." />
                </Form.Group>
              </Form>
            </div>
          )}
          
          {/* Step 2: Trigger Setup */}
          {currentWizardStep === 2 && (
            <div>
              <div className="bg-warning bg-opacity-10 p-4 rounded mb-4">
                <h5 className="text-warning mb-2">⚡ Trigger Configuration</h5>
                <p className="small text-muted mb-0">
                  Define when this automation should be activated.
                </p>
              </div>
              
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label>Trigger Event</Form.Label>
                  <Row className="g-3">
                    <Col md={6}>
                      <div className={`border rounded p-3 cursor-pointer ${automationData.trigger === 'service' ? 'border-primary bg-primary bg-opacity-10' : 'border-light'}`}
                           onClick={() => handleAutomationChange('trigger', 'service')}>
                        <div className="d-flex align-items-center mb-2">
                          <div className="bg-primary bg-opacity-20 rounded-circle p-2 me-3">
                            <i className="fa-solid fa-wrench text-primary"></i>
                          </div>
                          <span className="fw-medium">Service Completed</span>
                        </div>
                        <p className="small text-muted mb-0">After a service is marked complete</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={`border rounded p-3 cursor-pointer ${automationData.trigger === 'visit' ? 'border-primary bg-primary bg-opacity-10' : 'border-light'}`}
                           onClick={() => handleAutomationChange('trigger', 'visit')}>
                        <div className="d-flex align-items-center mb-2">
                          <div className="bg-success bg-opacity-20 rounded-circle p-2 me-3">
                            <i className="fa-solid fa-location-dot text-success"></i>
                          </div>
                          <span className="fw-medium">Customer Visit</span>
                        </div>
                        <p className="small text-muted mb-0">When customer visits your location</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={`border rounded p-3 cursor-pointer ${automationData.trigger === 'purchase' ? 'border-primary bg-primary bg-opacity-10' : 'border-light'}`}
                           onClick={() => handleAutomationChange('trigger', 'purchase')}>
                        <div className="d-flex align-items-center mb-2">
                          <div className="bg-warning bg-opacity-20 rounded-circle p-2 me-3">
                            <i className="fa-solid fa-shopping-cart text-warning"></i>
                          </div>
                          <span className="fw-medium">Purchase Made</span>
                        </div>
                        <p className="small text-muted mb-0">After customer makes a purchase</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={`border rounded p-3 cursor-pointer ${automationData.trigger === 'manual' ? 'border-primary bg-primary bg-opacity-10' : 'border-light'}`}
                           onClick={() => handleAutomationChange('trigger', 'manual')}>
                        <div className="d-flex align-items-center mb-2">
                          <div className="bg-secondary bg-opacity-20 rounded-circle p-2 me-3">
                            <i className="fa-solid fa-hand-pointer text-secondary"></i>
                          </div>
                          <span className="fw-medium">Manual Trigger</span>
                        </div>
                        <p className="small text-muted mb-0">Manually activate for specific customers</p>
                      </div>
                    </Col>
                  </Row>
                </Form.Group>
                
                <h6 className="fw-semibold mb-3">Timing Settings</h6>
                <Row className="g-3">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="small">Delay</Form.Label>
                      <Form.Select 
                        size="sm"
                        value={automationData.delay}
                        onChange={(e) => handleAutomationChange('delay', e.target.value)}
                      >
                        <option value="immediately">Immediately</option>
                        <option value="15min">15 minutes</option>
                        <option value="1hour">1 hour</option>
                        <option value="2hours">2 hours</option>
                        <option value="24hours">24 hours</option>
                        <option value="48hours">48 hours</option>
                        <option value="1week">1 week</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="small">Send Time</Form.Label>
                      <Form.Select 
                        size="sm"
                        value={automationData.sendTime}
                        onChange={(e) => handleAutomationChange('sendTime', e.target.value)}
                      >
                        <option value="any">Any time</option>
                        <option value="business">Business hours</option>
                        <option value="morning">Morning (9AM-12PM)</option>
                        <option value="afternoon">Afternoon (12PM-5PM)</option>
                        <option value="evening">Evening (5PM-8PM)</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="small">Days</Form.Label>
                      <Form.Select 
                        size="sm"
                        value={automationData.days}
                        onChange={(e) => handleAutomationChange('days', e.target.value)}
                      >
                        <option value="all">All days</option>
                        <option value="weekdays">Weekdays only</option>
                        <option value="weekends">Weekends only</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </div>
          )}
          
          {/* Step 3: Message & Template */}
          {currentWizardStep === 3 && (
            <div>
              <div className="bg-success bg-opacity-10 p-4 rounded mb-4">
                <h5 className="text-success mb-2">💬 Message Configuration</h5>
                <p className="small text-muted mb-0">
                  Choose your message template and channel.
                </p>
              </div>
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Message Channel</Form.Label>
                  <div className="d-flex gap-3">
                    <Form.Check 
                      type="radio" 
                      name="channel" 
                      label="SMS" 
                      value="sms"
                      checked={automationData.channel === 'sms'}
                      onChange={(e) => handleAutomationChange('channel', e.target.value)}
                    />
                    <Form.Check 
                      type="radio" 
                      name="channel" 
                      label="Email" 
                      value="email"
                      checked={automationData.channel === 'email'}
                      onChange={(e) => handleAutomationChange('channel', e.target.value)}
                    />
                    <Form.Check 
                      type="radio" 
                      name="channel" 
                      label="WhatsApp" 
                      value="whatsapp"
                      checked={automationData.channel === 'whatsapp'}
                      onChange={(e) => handleAutomationChange('channel', e.target.value)}
                    />
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Select Template</Form.Label>
                  <Form.Select 
                    value={automationData.template}
                    onChange={(e) => handleAutomationChange('template', e.target.value)}
                  >
                    <option value="">Choose a template</option>
                    <option value="friendly">Friendly Follow-up</option>
                    <option value="professional">Professional Request</option>
                    <option value="incentive">Incentive-Based</option>
                    <option value="custom">Create Custom Template</option>
                  </Form.Select>
                </Form.Group>
                
                {automationData.template && (
                  <div className="border rounded p-3 bg-light">
                    <h6 className="small fw-semibold mb-2">Template Preview:</h6>
                    <div className="small text-muted">
                      {automationData.template === 'friendly' && "Hi {customer_name}! 😊 Thank you for choosing {business_name}. We'd love to hear about your experience!"}
                      {automationData.template === 'professional' && "Dear {customer_name}, Thank you for your recent visit to {business_name}. Your feedback is valuable to us."}
                      {automationData.template === 'incentive' && "Hi {customer_name}! 🎁 Leave us a review and get 10% off your next visit to {business_name}!"}
                    </div>
                  </div>
                )}
              </Form>
            </div>
          )}
          
          {/* Step 4: Review */}
          {currentWizardStep === 4 && (
            <div>
              <div className="bg-secondary bg-opacity-10 p-4 rounded mb-4">
                <h5 className="text-secondary mb-2">🔍 Review & Launch</h5>
                <p className="small text-muted mb-0">
                  Review your automation settings before activation.
                </p>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <Card.Body>
                    <h6 className="fw-semibold mb-3">Automation Summary</h6>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <span className="small text-muted d-block">Name:</span>
                          <span className="fw-medium">{automationData.name || 'Untitled Automation'}</span>
                        </div>
                        <div className="mb-3">
                          <span className="small text-muted d-block">Type:</span>
                          <span className="fw-medium">{automationData.type || 'Not selected'}</span>
                        </div>
                        <div className="mb-3">
                          <span className="small text-muted d-block">Trigger:</span>
                          <span className="fw-medium">{automationData.trigger || 'Not selected'}</span>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <span className="small text-muted d-block">Delay:</span>
                          <span className="fw-medium">{automationData.delay}</span>
                        </div>
                        <div className="mb-3">
                          <span className="small text-muted d-block">Channel:</span>
                          <span className="fw-medium">{automationData.channel.toUpperCase()}</span>
                        </div>
                        <div className="mb-3">
                          <span className="small text-muted d-block">Template:</span>
                          <span className="fw-medium">{automationData.template || 'Not selected'}</span>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}
          
          <div className="d-flex flex-column flex-sm-row justify-content-between mt-4 gap-2">
            <Button 
              variant="link" 
              className="text-muted order-3 order-sm-1" 
              onClick={() => {
                setShowAutomationModal(false);
                setCurrentWizardStep(1);
              }}
            >
              Cancel
            </Button>
            <div className="d-flex gap-2 order-1 order-sm-2">
              {currentWizardStep > 1 && (
                <Button variant="outline-secondary" onClick={prevStep}>
                  <i className="fa-solid fa-arrow-left me-2"></i>
                  Previous
                </Button>
              )}
              <Button 
                variant="primary" 
                onClick={currentWizardStep < 4 ? nextStep : () => {
                  setShowAutomationModal(false);
                  setCurrentWizardStep(1);
                }}
              >
                {currentWizardStep < 4 ? (
                  <>
                    Next Step
                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-rocket me-2"></i>
                    Create Automation
                  </>
                )}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default Automation;