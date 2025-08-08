import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal, Form, Badge, Table, Alert, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import Layout from '../components/Layout';

import '../styles/Campaign.css';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  reviewUrl?: string;
  createdAt?: string;
  lastContact?: string;
  reviewStatus?: 'pending' | 'sent' | 'completed' | 'not_sent';
}

interface BusinessSearchResult {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number;
  user_ratings_total?: number;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [businessSearchResults, setBusinessSearchResults] = useState<BusinessSearchResult[]>([]);
  const [searchingBusiness, setSearchingBusiness] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Load contacts on component mount
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/contacts/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        showNotification('error', 'Failed to load contacts');
      }
    } catch (error) {
      showNotification('error', 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleContactChange = (field: string, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveContact = async () => {
    try {
      console.log('Saving contact:', contactData);
      
      if (!contactData.name || !contactData.phone || !contactData.email) {
        showNotification('error', 'Please fill in all required fields');
        return;
      }

      const token = localStorage.getItem('token');
      console.log('Token:', token ? 'Present' : 'Missing');

      const response = await fetch('http://127.0.0.1:8000/api/contacts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: contactData.name,
          phone: contactData.phone,
          email: contactData.email
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        showNotification('success', data.message);
        loadContacts(); // Reload contacts from server
        resetModal();
      } else {
        // Handle validation errors
        if (data.details && data.details.email) {
          showNotification('error', data.details.email[0]);
        } else {
          showNotification('error', data.error || 'Failed to save contact');
        }
      }
    } catch (error) {
      console.error('Error saving contact:', error);
      showNotification('error', 'Failed to save contact');
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setContactData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email

    });
    setShowContactModal(true);
  };

  const handleDeleteContact = async (contactId: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        console.log('Deleting contact:', contactId);
        
        const response = await fetch(`http://127.0.0.1:8000/api/contacts/${contactId}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        console.log('Delete response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          showNotification('success', data.message);
          loadContacts(); // Reload contacts from server
        } else {
          showNotification('error', 'Failed to delete contact');
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        showNotification('error', 'Failed to delete contact');
      }
    }
  };

  const handleSendEmail = async (contact: Contact) => {
    try {
      // Mock email sending - replace with actual API call
      setContacts(prev => prev.map(c => 
        c.id === contact.id ? { ...c, reviewStatus: 'sent' as const, lastContact: new Date().toLocaleDateString() } : c
      ));
      showNotification('success', `Review email sent to ${contact.name}!`);
    } catch (error) {
      showNotification('error', 'Failed to send email');
    }
  };

  const copyReviewUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showNotification('success', 'Review URL copied to clipboard!');
  };

  const searchBusinesses = async (query: string) => {
    if (!query.trim()) {
      setBusinessSearchResults([]);
      return;
    }

    try {
      setSearchingBusiness(true);
      // Mock Google Places API search - replace with actual API call
      const mockResults: BusinessSearchResult[] = [
        {
          place_id: 'place1',
          name: `${query} Restaurant`,
          formatted_address: '123 Main St, City, State 12345',
          rating: 4.5,
          user_ratings_total: 127
        },
        {
          place_id: 'place2',
          name: `${query} Cafe`,
          formatted_address: '456 Oak Ave, City, State 12345',
          rating: 4.2,
          user_ratings_total: 89
        }
      ];
      setBusinessSearchResults(mockResults);
    } catch (error) {
      showNotification('error', 'Failed to search businesses');
    } finally {
      setSearchingBusiness(false);
    }
  };

  const resetModal = () => {
    setShowContactModal(false);
    setEditingContact(null);
    setContactData({ name: '', phone: '', email: '' });
    setBusinessSearchResults([]);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  const getStatusBadgeColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'sent': case 'pending': return 'warning';
      case 'not_sent': return 'secondary';
      default: return 'secondary';
    }
  };

  const stats = {
    totalContacts: contacts.length,
    activeContacts: contacts.filter(c => c.reviewStatus !== 'not_sent').length,
    reviewsPending: contacts.filter(c => c.reviewStatus === 'pending' || c.reviewStatus === 'sent').length,
    reviewsCompleted: contacts.filter(c => c.reviewStatus === 'completed').length
  };

  const headerActions = (
    <>
      <Button variant="outline-primary" className="d-flex align-items-center" size="sm">
        <i className="fa-solid fa-download me-1 d-none d-sm-inline"></i>
        <span className="d-none d-sm-inline">Import CSV</span>
        <i className="fa-solid fa-download d-sm-none"></i>
      </Button>
      <Button variant="primary" className="d-flex align-items-center" onClick={() => setShowContactModal(true)} size="sm">
        <i className="fa-solid fa-plus me-1 d-none d-sm-inline"></i>
        <span className="d-none d-sm-inline">Add Contact</span>
        <i className="fa-solid fa-plus d-sm-none"></i>
      </Button>
    </>
  );

  if (loading) {
    return (
      <Layout title="Contact Management" subtitle="Loading contacts..." headerActions={null}>
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Loading your contacts...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Contact Management" 
      subtitle="Manage your customer contacts and review requests"
      headerActions={headerActions}
    >
      {/* Notifications */}
      <ToastContainer position="top-end" className="p-3">
        {notification && (
          <Toast show={!!notification} onClose={() => setNotification(null)} bg={notification.type === 'success' ? 'success' : 'danger'}>
            <Toast.Body className="text-white">
              <i className={`fa-solid ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
              {notification.message}
            </Toast.Body>
          </Toast>
        )}
      </ToastContainer>

      {/* Contact Overview */}
      <div className="platform-overview mb-4">
        <div className="overview-card">
          <div className="d-flex justify-content-between">
            <div className="flex-grow-1">
              <h2 className="fs-1 fw-bold mb-3">👥 Contact Hub</h2>
              <p className="fs-5 mb-4 text-white">Manage your customer database and track review engagement with powerful contact management tools.</p>
              <Row className="mt-4">
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-users-gear text-warning"></i>
                      <span className="fw-semibold">Smart Organization</span>
                    </div>
                    <p className="small text-white-50">Tag and categorize contacts for targeted campaigns</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-chart-line text-success"></i>
                      <span className="fw-semibold">Review Tracking</span>
                    </div>
                    <p className="small text-white-50">Monitor review request status and completion rates</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-file-import text-info"></i>
                      <span className="fw-semibold">Bulk Import</span>
                    </div>
                    <p className="small text-white-50">Import contacts from CSV, CRM systems, and more</p>
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
          <Col lg={3} md={6}>
            <Card className="stats-card h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-users fs-2 text-primary"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Total Contacts</Card.Title>
                <h2 className="mb-0 text-primary">{stats.totalContacts}</h2>
                <div className="mt-2">
                  <Badge bg="success" className="small">Active database</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6}>
            <Card className="stats-card h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-user-check fs-2 text-success"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Active Contacts</Card.Title>
                <h2 className="mb-0 text-success">{stats.activeContacts}</h2>
                <div className="mt-2">
                  <Badge bg="success" className="small">Engaged users</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6}>
            <Card className="stats-card h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-clock fs-2 text-warning"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Reviews Pending</Card.Title>
                <h2 className="mb-0 text-warning">{stats.reviewsPending}</h2>
                <div className="mt-2">
                  <Badge bg="warning" className="small">Awaiting response</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6}>
            <Card className="stats-card h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-star fs-2 text-info"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Reviews Completed</Card.Title>
                <h2 className="mb-0 text-info">{stats.reviewsCompleted}</h2>
                <div className="mt-2">
                  <Badge bg="info" className="small">Success rate</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Search and Filters */}
      <div className="mb-4">
        <Card className="border-0 shadow-sm">
          <Card.Body>
            <Row className="g-3 align-items-center">
              <Col md={6}>
                <div className="position-relative">
                  <Form.Control 
                    type="text" 
                    placeholder="Search contacts by name, email, or phone..." 
                    className="ps-5 py-3 border-0 bg-light"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ borderRadius: '12px' }}
                  />
                  <i className="fa-solid fa-magnifying-glass position-absolute start-0 top-50 translate-middle-y ms-4 text-muted"></i>
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex gap-2">
                  <Button variant="outline-primary" className="flex-fill">
                    <i className="fa-solid fa-filter me-2"></i>
                    Filter
                  </Button>
                  <Button variant="outline-secondary" className="flex-fill">
                    <i className="fa-solid fa-sort me-2"></i>
                    Sort
                  </Button>
                  <Button variant="outline-success" className="flex-fill">
                    <i className="fa-solid fa-download me-2"></i>
                    Export
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      {/* Contacts Table */}
      <div className="mb-4">
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white border-0 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">
                <i className="fa-solid fa-address-book me-2 text-primary"></i>
                Your Contacts ({filteredContacts.length})
              </h5>
              <div className="d-flex gap-2">
                <Button variant="outline-primary" size="sm">
                  <i className="fa-solid fa-envelope me-1"></i>
                  Bulk Email
                </Button>
                <Button variant="outline-danger" size="sm">
                  <i className="fa-solid fa-trash me-1"></i>
                  Delete Selected
                </Button>
              </div>
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            {filteredContacts.length === 0 ? (
              <div className="text-center py-5">
                <i className="fa-solid fa-users fs-1 text-muted mb-3"></i>
                <h5 className="text-muted">No contacts found</h5>
                <p className="text-muted">Add your first contact to get started with review collection.</p>
                <Button variant="primary" onClick={() => setShowContactModal(true)}>
                  <i className="fa-solid fa-plus me-2"></i>
                  Add First Contact
                </Button>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="d-none d-lg-block">
                  <Table responsive hover className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 py-3 ps-4">
                          <Form.Check type="checkbox" />
                        </th>
                        <th className="border-0 py-3 fw-semibold">Contact</th>
                        <th className="border-0 py-3 fw-semibold">Phone</th>
                        <th className="border-0 py-3 fw-semibold">Email</th>
                        <th className="border-0 py-3 fw-semibold">Review URL</th>
                        <th className="border-0 py-3 fw-semibold">Status</th>
                        <th className="border-0 py-3 fw-semibold text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.map(contact => (
                        <tr key={contact.id} className="align-middle">
                          <td className="ps-4">
                            <Form.Check type="checkbox" />
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle me-3" style={{width: '3rem', height: '3rem'}}>
                                <i className="fa-solid fa-user text-primary fs-5"></i>
                              </div>
                              <div>
                                <div className="fw-semibold text-dark">{contact.name}</div>
                                <div className="small text-muted">Contact</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="fw-medium text-dark">{contact.phone}</div>
                          </td>
                          <td>
                            <div className="fw-medium text-dark">{contact.email}</div>
                            <div className="small text-muted">{contact.lastContact}</div>
                          </td>
                          <td>
                            {contact.reviewUrl && (
                              <div className="d-flex align-items-center gap-2">
                                <Button 
                                  variant="outline-primary" 
                                  size="sm"
                                  onClick={() => copyReviewUrl(contact.reviewUrl!)}
                                  title="Copy review URL"
                                >
                                  <i className="fa-solid fa-copy"></i>
                                </Button>
                                <Button 
                                  variant="outline-success" 
                                  size="sm"
                                  onClick={() => window.open(contact.reviewUrl, '_blank')}
                                  title="Open review URL"
                                >
                                  <i className="fa-solid fa-external-link-alt"></i>
                                </Button>
                              </div>
                            )}
                          </td>
                          <td>
                            <Badge bg={getStatusBadgeColor(contact.reviewStatus)} className="px-3 py-2">
                              <i className={`fa-solid ${
                                contact.reviewStatus === 'completed' ? 'fa-check-circle' :
                                contact.reviewStatus === 'sent' ? 'fa-paper-plane' :
                                contact.reviewStatus === 'pending' ? 'fa-clock' :
                                'fa-circle'
                              } me-1`}></i>
                              {contact.reviewStatus?.replace('_', ' ').toUpperCase() || 'NOT SENT'}
                            </Badge>
                          </td>
                          <td>
                            <div className="d-flex justify-content-center gap-1">
                              <Button 
                                variant="outline-primary" 
                                size="sm" 
                                onClick={() => handleEditContact(contact)}
                                title="Edit contact"
                              >
                                <i className="fa-solid fa-edit"></i>
                              </Button>
                              <Button 
                                variant="outline-success" 
                                size="sm" 
                                onClick={() => handleSendEmail(contact)}
                                title="Send review email"
                              >
                                <i className="fa-solid fa-envelope"></i>
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm" 
                                onClick={() => handleDeleteContact(contact.id)}
                                title="Delete contact"
                              >
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
                <div className="d-lg-none p-3">
                  {filteredContacts.map(contact => (
                    <Card key={contact.id} className="mb-3 border-0 shadow-sm">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle me-3" style={{width: '3rem', height: '3rem'}}>
                              <i className="fa-solid fa-user text-primary"></i>
                            </div>
                            <div>
                              <h6 className="mb-1 fw-semibold">{contact.name}</h6>
                              <Badge bg={getStatusBadgeColor(contact.reviewStatus)} className="small">
                                {contact.reviewStatus?.replace('_', ' ').toUpperCase() || 'NOT SENT'}
                              </Badge>
                            </div>
                          </div>
                          <Form.Check type="checkbox" />
                        </div>
                        
                        <div className="mb-3">
                          <div className="d-flex align-items-center mb-2">
                            <i className="fa-solid fa-phone me-2 text-muted"></i>
                            <span className="fw-medium">{contact.phone}</span>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <i className="fa-solid fa-envelope me-2 text-muted"></i>
                            <span className="fw-medium">{contact.email}</span>
                          </div>
                          {contact.reviewUrl && (
                            <div className="d-flex align-items-center gap-2">
                              <i className="fa-solid fa-link me-2 text-muted"></i>
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => copyReviewUrl(contact.reviewUrl!)}
                              >
                                <i className="fa-solid fa-copy me-1"></i>
                                Copy URL
                              </Button>
                              <Button 
                                variant="outline-success" 
                                size="sm"
                                onClick={() => window.open(contact.reviewUrl, '_blank')}
                              >
                                <i className="fa-solid fa-external-link-alt me-1"></i>
                                Open
                              </Button>
                            </div>
                          )}
                        </div>
                        

                        
                        <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                          <span className="small text-muted">Last contact: {contact.lastContact}</span>
                          <div className="d-flex gap-1">
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              onClick={() => handleEditContact(contact)}
                            >
                              <i className="fa-solid fa-edit"></i>
                            </Button>
                            <Button 
                              variant="outline-success" 
                              size="sm" 
                              onClick={() => handleSendEmail(contact)}
                            >
                              <i className="fa-solid fa-envelope"></i>
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm" 
                              onClick={() => handleDeleteContact(contact.id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* Contact Modal */}
      <Modal 
        show={showContactModal} 
        onHide={resetModal}
        centered
        size="lg"
        className="contact-modal"
        fullscreen="sm-down"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="text-primary">
            <i className={`fa-solid ${editingContact ? 'fa-user-edit' : 'fa-user-plus'} me-2`}></i>
            {editingContact ? 'Edit Contact' : 'Add New Contact'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="bg-primary bg-opacity-10 p-4 rounded mb-4">
            <h5 className="text-primary mb-2">
              <i className="fa-solid fa-info-circle me-2"></i>
              Contact Information
            </h5>
            <p className="small text-muted mb-0">
              {editingContact ? 'Update contact details and manage review status.' : 'Add a new contact to your database and start collecting reviews.'}
            </p>
          </div>
          
          {/* Business Search */}
          <div className="mb-4">
            <Form.Group>
              <Form.Label className="fw-semibold">
                <i className="fa-solid fa-search me-2"></i>
                Search Business (Google Places)
              </Form.Label>
              <div className="position-relative">
                <Form.Control 
                  type="text" 
                  placeholder="Search for business name..." 
                  onChange={(e) => searchBusinesses(e.target.value)}
                  className="ps-5"
                />
                <i className="fa-solid fa-search position-absolute start-0 top-50 translate-middle-y ms-3 text-muted"></i>
                {searchingBusiness && (
                  <Spinner size="sm" className="position-absolute end-0 top-50 translate-middle-y me-3" />
                )}
              </div>
            </Form.Group>
            
            {businessSearchResults.length > 0 && (
              <div className="mt-2">
                <div className="small text-muted mb-2">Search Results:</div>
                {businessSearchResults.map(result => (
                  <Card key={result.place_id} className="mb-2 cursor-pointer" style={{cursor: 'pointer'}}>
                    <Card.Body className="py-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-medium">{result.name}</div>
                          <div className="small text-muted">{result.formatted_address}</div>
                        </div>
                        <div className="text-end">
                          {result.rating && (
                            <div className="small">
                              <i className="fa-solid fa-star text-warning"></i> {result.rating} ({result.user_ratings_total})
                            </div>
                          )}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Full Name *</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="John Smith" 
                    value={contactData.name}
                    onChange={(e) => handleContactChange('name', e.target.value)}
                    required
                    className="py-3"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Phone Number *</Form.Label>
                  <Form.Control 
                    type="tel" 
                    placeholder="+1 (555) 123-4567" 
                    value={contactData.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    required
                    className="py-3"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Email Address *</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="john@example.com" 
                    value={contactData.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    required
                    className="py-3"
                  />
                </Form.Group>
              </Col>
            </Row>
            

          </Form>
          
          <div className="d-flex flex-column flex-sm-row justify-content-between mt-4 gap-2">
            <Button variant="link" className="text-muted order-2 order-sm-1" onClick={resetModal}>
              Cancel
            </Button>
            <div className="d-flex gap-2 order-1 order-sm-2">
              <Button variant="outline-primary" onClick={handleSaveContact}>
                <i className="fa-solid fa-plus me-2"></i>
                {editingContact ? 'Update & Send Review' : 'Add & Send Review'}
              </Button>
              <Button variant="primary" onClick={handleSaveContact}>
                {editingContact ? 'Update Contact' : 'Add Contact'}
                <i className="fa-solid fa-arrow-right ms-2"></i>
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default Contacts;