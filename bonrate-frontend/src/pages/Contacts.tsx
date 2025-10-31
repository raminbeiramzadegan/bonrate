import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Card, Button, Modal, Form, Table, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import Layout from '../components/Layout';
import '../styles/Campaign.css';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  business_name?: string;
  business_place_id?: string;
  business_address?: string;
  google_review_url?: string;
  review_url?: string;
  created_at?: string;
  review_status?: 'pending' | 'sent' | 'completed' | 'not_sent';
}

interface BusinessSearchResult {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number;
  user_ratings_total?: number;
}

const API_BASE_URL = 'http://localhost:8000';

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [businessSearchResults, setBusinessSearchResults] = useState<BusinessSearchResult[]>([]);
  const [searchingBusiness, setSearchingBusiness] = useState(false);
  const [businessQuery, setBusinessQuery] = useState('');
  const [businessLocation, setBusinessLocation] = useState('');
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    business_name: '',
    business_place_id: '',
    business_address: ''
  });

  useEffect(() => {
    loadContacts();
  }, []);



  const loadContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/contacts/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        try {
          const data = await response.json();
          setContacts(Array.isArray(data) ? data : []);
        } catch (e) {
          console.error('Failed to parse contacts JSON:', e);
          setContacts([]);
        }
      } else {
        console.error('Failed to load contacts, status:', response.status);
        setContacts([]);
      }
    } catch (error) {
      console.error('Load contacts error:', error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleContactChange = (field: string, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveContact = async () => {
    try {
      console.log('=== SAVE CONTACT DEBUG ===');
      console.log('Contact data:', contactData);
      console.log('Business being saved:', {
        name: contactData.business_name,
        place_id: contactData.business_place_id,
        address: contactData.business_address
      });
      console.log('Expected review URL:', contactData.business_place_id ? 
        `https://search.google.com/local/writereview?placeid=${contactData.business_place_id}` : 'No place_id');
      console.log('Editing contact:', editingContact);
      
      if (!contactData.name || !contactData.phone || !contactData.email) {
        showNotification('error', 'Please fill in all required fields');
        return;
      }

      const isUpdate = !!editingContact;
      const url = isUpdate 
        ? `${API_BASE_URL}/api/contacts/${editingContact.id}/`
        : `${API_BASE_URL}/api/contacts/`;
      
      const method = isUpdate ? 'PUT' : 'POST';
      
      console.log('Request details:', { isUpdate, url, method });

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });

      console.log('Response status:', response.status);
      
      let data;
      try {
        data = await response.json();
        console.log('Response data:', data);
      } catch (e) {
        console.error('Failed to parse JSON response:', e);
        const text = await response.text();
        console.error('Response text:', text);
        throw new Error('Server returned invalid response');
      }

      if (response.ok) {
        showNotification('success', data.message);
        loadContacts();
        resetModal();
      } else {
        if (data.details && data.details.email) {
          showNotification('error', data.details.email[0]);
        } else {
          showNotification('error', data.error || 'Failed to save contact');
        }
      }
    } catch (error) {
      console.error('Save contact error:', error);
      showNotification('error', 'Failed to save contact');
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setContactData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      business_name: contact.business_name || '',
      business_place_id: contact.business_place_id || '',
      business_address: contact.business_address || ''
    });
    setShowContactModal(true);
  };

  const handleDeleteContact = async (contactId: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/contacts/${contactId}/`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
        
        if (response.ok) {
          const data = await response.json();
          showNotification('success', data.message);
          loadContacts();
        } else {
          showNotification('error', 'Failed to delete contact');
        }
      } catch (error) {
        showNotification('error', 'Failed to delete contact');
      }
    }
  };

  const handleSendEmail = async (contact: Contact) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts/${contact.id}/`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showNotification('success', data.message);
        loadContacts();
      } else {
        showNotification('error', data.error || 'Failed to send email');
      }
    } catch (error) {
      showNotification('error', 'Failed to send email');
    }
  };

  const copyReviewUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showNotification('success', 'Review URL copied to clipboard!');
  };

  const searchBusinesses = useCallback(async (query: string, location: string) => {
    if (!query.trim()) {
      setBusinessSearchResults([]);
      return;
    }

    try {
      setSearchingBusiness(true);
      const params = new URLSearchParams({ query });
      
      if (location.trim()) {
        params.append('location', location);
      }
      
      const response = await fetch(`${API_BASE_URL}/api/contacts/search-places/?${params}`, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        setBusinessSearchResults(data.results || []);
      } else {
        setBusinessSearchResults([]);
      }
    } catch (error) {
      setBusinessSearchResults([]);
    } finally {
      setSearchingBusiness(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchBusinesses(businessQuery, businessLocation);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [businessQuery, businessLocation, searchBusinesses]);

  const resetModal = () => {
    setShowContactModal(false);
    setEditingContact(null);
    setContactData({ name: '', phone: '', email: '', business_name: '', business_place_id: '', business_address: '' });
    setBusinessSearchResults([]);
    setBusinessQuery('');
    setBusinessLocation('');
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  if (loading) {
    return (
      <Layout title="Contacts" subtitle="Loading..." headerActions={null}>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="text-center">
            <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
            <p className="mt-3 text-muted fs-5">Loading your contacts...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Contacts" 
      subtitle={`Manage your ${contacts.length} contacts`}
      headerActions={
        <Button 
          variant="primary" 
          onClick={() => setShowContactModal(true)}
          className="d-flex align-items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          Add Contact
        </Button>
      }
    >
      <ToastContainer position="top-end" className="p-3">
        {notification && (
          <Toast 
            show={!!notification} 
            onClose={() => setNotification(null)} 
            bg={notification.type === 'success' ? 'success' : 'danger'}
            delay={4000}
            autohide
          >
            <Toast.Body className="text-white d-flex align-items-center">
              <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2`}></i>
              {notification.message}
            </Toast.Body>
          </Toast>
        )}
      </ToastContainer>

      {/* Hero Section */}
      <div className="mb-5" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '3rem 2rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="position-absolute" style={{
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%'
        }}></div>
        <div className="position-absolute" style={{
          bottom: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%'
        }}></div>
        
        <Row className="align-items-center position-relative">
          <Col lg={8}>
            <div className="d-flex align-items-center mb-3">
              <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3" style={{ width: '60px', height: '60px' }}>
                <i className="fas fa-users fs-3 text-white"></i>
              </div>
              <div>
                <h1 className="mb-1 fw-bold">Contact Management</h1>
                <p className="mb-0 opacity-90">Manage your customer relationships and boost reviews</p>
              </div>
            </div>
          </Col>
          <Col lg={4} className="text-lg-end">
            <div className="bg-white bg-opacity-20 rounded-4 p-3">
              <div className="fw-bold fs-2">{contacts.length}</div>
              <small className="opacity-90">Total Contacts</small>
            </div>
          </Col>
        </Row>
      </div>

      {/* Search Bar */}
      <Card className="mb-4 border-0 shadow-lg" style={{ borderRadius: '16px' }}>
        <Card.Body className="p-4">
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder="🔍 Search contacts by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-5 py-4 border-0 bg-light"
              style={{ 
                borderRadius: '12px', 
                fontSize: '16px',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            <i className="fas fa-search position-absolute start-0 top-50 translate-middle-y ms-4 text-primary"></i>
          </div>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-lg" style={{ borderRadius: '16px' }}>
        <Card.Header className="border-0 py-4" style={{
          background: 'linear-gradient(90deg, #f8f9ff 0%, #e3f2fd 100%)',
          borderRadius: '16px 16px 0 0'
        }}>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0 fw-bold text-dark">
              <i className="fas fa-address-book me-2 text-primary"></i>
              Your Contacts ({filteredContacts.length})
            </h4>
            <div className="d-flex gap-2">
              <Button variant="outline-primary" size="sm" className="rounded-pill">
                <i className="fas fa-download me-1"></i>
                Export
              </Button>
              <Button variant="outline-success" size="sm" className="rounded-pill">
                <i className="fas fa-file-import me-1"></i>
                Import
              </Button>
            </div>
          </div>
        </Card.Header>
        
        <Card.Body className="p-0">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-users text-muted" style={{ fontSize: '4rem' }}></i>
              <h5 className="text-muted mb-3 mt-3">No contacts found</h5>
              <p className="text-muted mb-4">
                {searchQuery ? 'Try adjusting your search terms' : 'Add your first contact to get started'}
              </p>
              <Button 
                variant="primary" 
                onClick={() => setShowContactModal(true)}
                className="px-4 py-2"
              >
                <i className="fas fa-plus me-2"></i>
                Add First Contact
              </Button>
            </div>
          ) : (
            <Table className="mb-0" style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
              <thead>
                <tr style={{ background: 'transparent' }}>
                  <th className="border-0 py-3 ps-4 fw-semibold text-muted" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>CONTACT</th>
                  <th className="border-0 py-3 fw-semibold text-muted" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>PHONE</th>
                  <th className="border-0 py-3 fw-semibold text-muted" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>EMAIL</th>
                  <th className="border-0 py-3 fw-semibold text-muted" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>STATUS</th>
                  <th className="border-0 py-3 fw-semibold text-muted" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>REVIEW URL</th>
                  <th className="border-0 py-3 fw-semibold text-muted text-center" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="align-middle" style={{
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                  }}>
                    <td className="ps-4 py-4" style={{ borderRadius: '12px 0 0 12px' }}>
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{ 
                            width: '48px', 
                            height: '48px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            fontSize: '18px'
                          }}
                        >
                          {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="fw-bold text-dark mb-1" style={{ fontSize: '16px' }}>{contact.name}</div>
                          <small className="text-muted d-flex align-items-center">
                            <i className="fas fa-calendar-plus me-1" style={{ fontSize: '10px' }}></i>
                            Added {contact.created_at ? new Date(contact.created_at).toLocaleDateString() : 'Recently'}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-phone me-2 text-success" style={{ fontSize: '14px' }}></i>
                        <span className="fw-medium text-dark">{contact.phone}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-envelope me-2 text-primary" style={{ fontSize: '14px' }}></i>
                        <span className="fw-medium text-dark">{contact.email}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span 
                        className={`badge rounded-pill px-3 py-2 fw-medium`}
                        style={{
                          backgroundColor: 
                            contact.review_status === 'completed' ? '#d4edda' :
                            contact.review_status === 'sent' ? '#fff3cd' :
                            contact.review_status === 'pending' ? '#cce5ff' : '#f8f9fa',
                          color:
                            contact.review_status === 'completed' ? '#155724' :
                            contact.review_status === 'sent' ? '#856404' :
                            contact.review_status === 'pending' ? '#004085' : '#6c757d',
                          border: '1px solid ' + (
                            contact.review_status === 'completed' ? '#c3e6cb' :
                            contact.review_status === 'sent' ? '#ffeaa7' :
                            contact.review_status === 'pending' ? '#b3d7ff' : '#dee2e6'
                          )
                        }}
                      >
                        <i className={`fas me-1 ${
                          contact.review_status === 'completed' ? 'fa-check-circle' :
                          contact.review_status === 'sent' ? 'fa-paper-plane' :
                          contact.review_status === 'pending' ? 'fa-clock' : 'fa-circle'
                        }`} style={{ fontSize: '12px' }}></i>
                        {contact.review_status === 'not_sent' ? 'Not Sent' :
                         contact.review_status === 'sent' ? 'Sent' :
                         contact.review_status === 'pending' ? 'Pending' :
                         contact.review_status === 'completed' ? 'Completed' : 'Unknown'}
                      </span>
                    </td>
                    <td className="py-4">
                      {contact.google_review_url ? (
                        <div className="d-flex gap-2">
                          <Button
                            variant="light"
                            size="sm"
                            onClick={() => copyReviewUrl(contact.google_review_url!)}
                            title="Copy Google review URL"
                            className="rounded-pill border-0"
                            style={{ background: '#e3f2fd', color: '#1976d2' }}
                          >
                            <i className="fas fa-copy"></i>
                          </Button>
                          <Button
                            variant="light"
                            size="sm"
                            onClick={() => window.open(contact.google_review_url, '_blank')}
                            title="Open Google review URL"
                            className="rounded-pill border-0"
                            style={{ background: '#e8f5e8', color: '#2e7d32' }}
                          >
                            <i className="fab fa-google"></i>
                          </Button>
                        </div>
                      ) : contact.review_url ? (
                        <div className="d-flex gap-2">
                          <Button
                            variant="light"
                            size="sm"
                            onClick={() => copyReviewUrl(contact.review_url!)}
                            title="Copy review URL"
                            className="rounded-pill border-0"
                            style={{ background: '#fff3e0', color: '#f57c00' }}
                          >
                            <i className="fas fa-copy"></i>
                          </Button>
                          <Button
                            variant="light"
                            size="sm"
                            onClick={() => window.open(contact.review_url, '_blank')}
                            title="Open review URL"
                            className="rounded-pill border-0"
                            style={{ background: '#e8f5e8', color: '#2e7d32' }}
                          >
                            <i className="fas fa-external-link-alt"></i>
                          </Button>
                        </div>
                      ) : (
                        <span className="text-muted small">No URL</span>
                      )}
                    </td>
                    <td className="py-4" style={{ borderRadius: '0 12px 12px 0' }}>
                      <div className="d-flex justify-content-center gap-1">
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => handleEditContact(contact)}
                          title="Edit contact"
                          className="rounded-pill border-0"
                          style={{ background: '#fff3e0', color: '#f57c00' }}
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => handleSendEmail(contact)}
                          title="Send review email"
                          className="rounded-pill border-0"
                          style={{ background: '#e8f5e8', color: '#2e7d32' }}
                        >
                          <i className="fas fa-paper-plane"></i>
                        </Button>
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => handleDeleteContact(contact.id)}
                          title="Delete contact"
                          className="rounded-pill border-0"
                          style={{ background: '#ffebee', color: '#d32f2f' }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal 
        show={showContactModal} 
        onHide={resetModal}
        centered
        size="xl"
        className="contact-modal"
      >
        <Modal.Header className="border-0 pb-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px 12px 0 0' }}>
          <Modal.Title className="text-white fw-bold d-flex align-items-center w-100">
            <div className="bg-white bg-opacity-20 rounded-circle p-2 me-3" style={{ width: '40px', height: '40px' }}>
              <i className={`fas ${editingContact ? 'fa-user-edit' : 'fa-user-plus'} text-white`} style={{ fontSize: '16px' }}></i>
            </div>
            <div>
              <div style={{ fontSize: '20px' }}>{editingContact ? 'Edit Contact' : 'Add New Contact'}</div>
              <small className="opacity-90" style={{ fontSize: '14px' }}>Manage your customer information</small>
            </div>
          </Modal.Title>
          <Button variant="link" onClick={resetModal} className="text-white p-0 border-0" style={{ fontSize: '24px' }}>
            <i className="fas fa-times"></i>
          </Button>
        </Modal.Header>
        
        <Modal.Body className="p-4">


          <div className="p-4 rounded-4" style={{ background: '#f8f9ff', border: '1px solid #e3f2fd' }}>
            <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: '#1565c0' }}>
              <i className="fas fa-user-circle me-2"></i>
              Contact Information
            </h5>
            <Form>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold mb-2" style={{ color: '#424242' }}>
                      <i className="fas fa-user me-2 text-primary"></i>
                      Full Name *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="John Smith"
                      value={contactData.name}
                      onChange={(e) => handleContactChange('name', e.target.value)}
                      className="py-3 border-0 shadow-sm"
                      style={{ borderRadius: '12px', fontSize: '16px' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold mb-2" style={{ color: '#424242' }}>
                      <i className="fas fa-phone me-2 text-success"></i>
                      Phone Number *
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={contactData.phone}
                      onChange={(e) => handleContactChange('phone', e.target.value)}
                      className="py-3 border-0 shadow-sm"
                      style={{ borderRadius: '12px', fontSize: '16px' }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold mb-2" style={{ color: '#424242' }}>
                  <i className="fas fa-envelope me-2 text-warning"></i>
                  Email Address *
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="john@example.com"
                  value={contactData.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  className="py-3 border-0 shadow-sm"
                  style={{ borderRadius: '12px', fontSize: '16px' }}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        
        <Modal.Footer className="border-0 pt-0">
          <div className="d-flex justify-content-between w-100">
            <Button 
              variant="light" 
              onClick={resetModal}
              className="px-4 py-2 rounded-pill"
              style={{ color: '#666', border: '1px solid #ddd' }}
            >
              <i className="fas fa-times me-2"></i>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveContact}
              className="px-4 py-2 rounded-pill border-0 fw-semibold"
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}
            >
              <i className="fas fa-save me-2"></i>
              {editingContact ? 'Update Contact' : 'Add Contact'}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Contacts;