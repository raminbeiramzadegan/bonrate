import React, { useState, useEffect } from 'react';
import ContactCard from '../../components/ContactCard';
import BusinessSearch from '../../components/BusinessSearch';
import { Contact, CreateContactRequest } from '../../types/Contact';
import { Business } from '../../types/Business';

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState<CreateContactRequest>({
    name: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingContact ? `/api/contacts/${editingContact.id}` : '/api/contacts';
      const method = editingContact ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        await fetchContacts();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      await fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleSendEmail = async (contact: Contact) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: contact.email,
          contactId: contact.id,
          reviewUrl: contact.reviewUrl || generateReviewUrl(contact.id)
        })
      });
      
      if (response.ok) {
        alert('Email sent successfully!');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  const generateReviewUrl = (contactId: string): string => {
    return `${window.location.origin}/review/${contactId}`;
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', email: '' });
    setEditingContact(null);
    setShowAddForm(false);
  };

  const handleBusinessSelect = (business: Business) => {
    // Auto-fill business name if form is open
    if (showAddForm) {
      setFormData(prev => ({ ...prev, name: business.name }));
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Contacts</h2>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddForm(true)}
            >
              <i className="fas fa-plus me-2"></i>Add Contact
            </button>
          </div>

          <BusinessSearch onBusinessSelect={handleBusinessSelect} />

          {showAddForm && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  {editingContact ? 'Edit Contact' : 'Add New Contact'}
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      {editingContact ? 'Update' : 'Add'} Contact
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-4">
              <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
          ) : (
            <div className="row">
              {contacts.map(contact => (
                <div key={contact.id} className="col-md-6 col-lg-4 mb-4">
                  <ContactCard
                    contact={contact}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onSendEmail={handleSendEmail}
                  />
                </div>
              ))}
              {contacts.length === 0 && (
                <div className="col-12 text-center py-5">
                  <i className="fas fa-users fa-3x text-muted mb-3"></i>
                  <h4 className="text-muted">No contacts yet</h4>
                  <p className="text-muted">Add your first contact to get started</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;