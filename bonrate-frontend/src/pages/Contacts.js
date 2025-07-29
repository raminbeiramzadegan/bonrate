import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal, Form, Badge, Table, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/Campaign.css';

const Contacts = () => {
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tags: '',
    source: 'manual'
  });
  
  const handleContactChange = (field, value) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  // Mock data
  const contacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      tags: ['VIP', 'Repeat Customer'],
      source: 'Website',
      lastVisit: '2024-03-15',
      totalVisits: 8,
      reviewsLeft: 3,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      tags: ['New Customer'],
      source: 'Referral',
      lastVisit: '2024-03-14',
      totalVisits: 2,
      reviewsLeft: 1,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 345-6789',
      tags: ['Premium', 'Loyal'],
      source: 'Social Media',
      lastVisit: '2024-03-12',
      totalVisits: 15,
      reviewsLeft: 5,
      status: 'Active'
    }
  ];

  const stats = {
    totalContacts: 1247,
    activeContacts: 1156,
    newThisMonth: 89,
    avgReviewRate: 42
  };

  const headerActions = (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="outline-primary" size="sm" className="d-flex align-items-center">
          <i className="fa-solid fa-download me-1 d-none d-sm-inline"></i>
          <span className="d-none d-sm-inline">Export</span>
          <i className="fa-solid fa-download d-sm-none"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Export as CSV</Dropdown.Item>
          <Dropdown.Item>Export as Excel</Dropdown.Item>
          <Dropdown.Item>Export Selected</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button variant="outline-secondary" size="sm" onClick={() => setShowImportModal(true)}>
        <i className="fa-solid fa-upload me-1 d-none d-sm-inline"></i>
        <span className="d-none d-sm-inline">Import</span>
        <i className="fa-solid fa-upload d-sm-none"></i>
      </Button>
      <Button variant="primary" size="sm" onClick={() => setShowContactModal(true)}>
        <i className="fa-solid fa-plus me-1 d-none d-sm-inline"></i>
        <span className="d-none d-sm-inline">Add Contact</span>
        <i className="fa-solid fa-plus d-sm-none"></i>
      </Button>
    </>
  );

  return (
    <Layout 
      title="Contacts" 
      subtitle="Manage your customer database and contact information"
      headerActions={headerActions}
    >
      {/* Contact Overview */}
      <div className="platform-overview mb-4">
        <div className="overview-card">
          <div className="d-flex justify-content-between">
            <div className="flex-grow-1">
              <h2 className="fs-1 fw-bold mb-3">👥 Contact Management</h2>
              <p className="fs-5 mb-4 opacity-75">Organize and manage your customer database with advanced segmentation, tagging, and engagement tracking.</p>
              <Row className="mt-4">
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-tags text-warning"></i>
                      <span className="fw-semibold">Smart Segmentation</span>
                    </div>
                    <p className="small opacity-75">Automatically segment contacts based on behavior and preferences</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-file-import text-success"></i>
                      <span className="fw-semibold">Bulk Import/Export</span>
                    </div>
                    <p className="small opacity-75">Import contacts from CSV, Excel, or integrate with your existing systems</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-chart-line text-primary"></i>
                      <span className="fw-semibold">Engagement Tracking</span>
                    </div>
                    <p className="small opacity-75">Track customer interactions, visits, and review history</p>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="d-none d-md-block ms-4">
              <div className="bg-white bg-opacity-25 rounded-circle p-4">
                <i className="fa-solid fa-address-book fs-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-4">
        <h2 className="fs-5 fw-semibold mb-3">📊 Contact Statistics</h2>
        <Row className="g-3">
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-users fs-2 text-primary"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Total Contacts</Card.Title>
                <h2 className="mb-0">{stats.totalContacts.toLocaleString()}</h2>
                <div className="mt-2">
                  <Badge bg="success" className="small">+{stats.newThisMonth} this month</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-user-check fs-2 text-success"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Active Contacts</Card.Title>
                <h2 className="mb-0">{stats.activeContacts.toLocaleString()}</h2>
                <div className="mt-2">
                  <Badge bg="success" className="small">{Math.round((stats.activeContacts/stats.totalContacts)*100)}% active rate</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-user-plus fs-2 text-warning"></i>
                </div>
                <Card.Title className="small text-muted mb-1">New This Month</Card.Title>
                <h2 className="mb-0">{stats.newThisMonth}</h2>
                <div className="mt-2">
                  <Badge bg="success" className="small">+15.2% growth</Badge>
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
                <Card.Title className="small text-muted mb-1">Avg Review Rate</Card.Title>
                <h2 className="mb-0">{stats.avgReviewRate}%</h2>
                <div className="mt-2">
                  <Badge bg="success" className="small">+3.1% improvement</Badge>
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
                <div className="position-relative">
                  <Form.Control 
                    type="text" 
                    placeholder="Search contacts..." 
                    className="ps-4"
                  />
                  <i className="fa-solid fa-magnifying-glass position-absolute start-0 top-50 translate-middle-y ms-3 text-muted"></i>
                </div>
              </Col>
              <Col md={2}>
                <Form.Select>
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Unsubscribed</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Form.Select>
                  <option>All Sources</option>
                  <option>Website</option>
                  <option>Referral</option>
                  <option>Social Media</option>
                  <option>Manual</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Form.Select>
                  <option>All Tags</option>
                  <option>VIP</option>
                  <option>New Customer</option>
                  <option>Repeat Customer</option>
                  <option>Premium</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Button variant="outline-secondary" className="w-100">
                  <i className="fa-solid fa-filter me-1"></i>
                  More Filters
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      {/* Contacts Table - Desktop */}
      <div className="d-none d-md-block">
        <Card>
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th className="border-0 ps-3">
                    <Form.Check type="checkbox" />
                  </th>
                  <th className="border-0">Contact</th>
                  <th className="border-0">Tags</th>
                  <th className="border-0">Source</th>
                  <th className="border-0">Last Visit</th>
                  <th className="border-0">Visits</th>
                  <th className="border-0">Reviews</th>
                  <th className="border-0">Status</th>
                  <th className="border-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td className="ps-3">
                      <Form.Check type="checkbox" />
                    </td>
                    <td>
                      <div>
                        <div className="fw-semibold">{contact.name}</div>
                        <div className="small text-muted">{contact.email}</div>
                        <div className="small text-muted">{contact.phone}</div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {contact.tags.map((tag, index) => (
                          <Badge key={index} bg="light" text="dark" className="small">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td>
                      <Badge bg="outline-primary" className="small">
                        {contact.source}
                      </Badge>
                    </td>
                    <td className="small">{contact.lastVisit}</td>
                    <td>
                      <Badge bg="info" className="small">
                        {contact.totalVisits}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg="success" className="small">
                        {contact.reviewsLeft}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={contact.status === 'Active' ? 'success' : 'secondary'} className="small">
                        {contact.status}
                      </Badge>
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="link" size="sm" className="text-muted">
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <i className="fa-solid fa-eye me-2"></i>View Details
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <i className="fa-solid fa-edit me-2"></i>Edit Contact
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <i className="fa-solid fa-paper-plane me-2"></i>Send Message
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item className="text-danger">
                            <i className="fa-solid fa-trash me-2"></i>Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>

      {/* Contacts Cards - Mobile */}
      <div className="d-md-none">
        <Row className="g-3">
          {contacts.map((contact) => (
            <Col xs={12} key={contact.id}>
              <Card className="contact-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-semibold">{contact.name}</h6>
                      <div className="small text-muted mb-1">{contact.email}</div>
                      <div className="small text-muted">{contact.phone}</div>
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle variant="link" size="sm" className="text-muted">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>View Details</Dropdown.Item>
                        <Dropdown.Item>Edit Contact</Dropdown.Item>
                        <Dropdown.Item>Send Message</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  
                  <div className="d-flex flex-wrap gap-1 mb-2">
                    {contact.tags.map((tag, index) => (
                      <Badge key={index} bg="light" text="dark" className="small">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Row className="g-2 small">
                    <Col xs={6}>
                      <div className="text-muted">Source:</div>
                      <Badge bg="outline-primary" className="small">{contact.source}</Badge>
                    </Col>
                    <Col xs={6}>
                      <div className="text-muted">Status:</div>
                      <Badge bg={contact.status === 'Active' ? 'success' : 'secondary'} className="small">
                        {contact.status}
                      </Badge>
                    </Col>
                    <Col xs={4}>
                      <div className="text-muted">Visits:</div>
                      <Badge bg="info" className="small">{contact.totalVisits}</Badge>
                    </Col>
                    <Col xs={4}>
                      <div className="text-muted">Reviews:</div>
                      <Badge bg="success" className="small">{contact.reviewsLeft}</Badge>
                    </Col>
                    <Col xs={4}>
                      <div className="text-muted">Last Visit:</div>
                      <div className="small">{contact.lastVisit}</div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Add Contact Modal */}
      <Modal show={showContactModal} onHide={() => setShowContactModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={contactData.firstName}
                    onChange={(e) => handleContactChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={contactData.lastName}
                    onChange={(e) => handleContactChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    value={contactData.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={contactData.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control
                    type="text"
                    value={contactData.tags}
                    onChange={(e) => handleContactChange('tags', e.target.value)}
                    placeholder="Enter tags (comma separated)"
                  />
                  <Form.Text className="text-muted">
                    Separate multiple tags with commas
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Source</Form.Label>
                  <Form.Select
                    value={contactData.source}
                    onChange={(e) => handleContactChange('source', e.target.value)}
                  >
                    <option value="manual">Manual Entry</option>
                    <option value="website">Website</option>
                    <option value="referral">Referral</option>
                    <option value="social">Social Media</option>
                    <option value="import">Import</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowContactModal(false)}>
            Cancel
          </Button>
          <Button variant="primary">
            Add Contact
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Import Modal */}
      <Modal show={showImportModal} onHide={() => setShowImportModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Import Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
              <i className="fa-solid fa-file-import fs-2 text-primary"></i>
            </div>
          </div>
          
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" accept=".csv,.xlsx,.xls" />
              <Form.Text className="text-muted">
                Supported formats: CSV, Excel (.xlsx, .xls)
              </Form.Text>
            </Form.Group>
            
            <div className="bg-light p-3 rounded mb-3">
              <h6 className="mb-2">Required Columns:</h6>
              <ul className="small mb-0">
                <li>First Name</li>
                <li>Last Name</li>
                <li>Email Address</li>
                <li>Phone Number (optional)</li>
              </ul>
            </div>
            
            <div className="d-flex align-items-center">
              <Button variant="link" className="p-0 me-2">
                <i className="fa-solid fa-download me-1"></i>
                Download Template
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImportModal(false)}>
            Cancel
          </Button>
          <Button variant="primary">
            Import Contacts
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Contacts;