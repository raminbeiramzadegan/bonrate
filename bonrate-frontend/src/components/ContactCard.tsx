import React from 'react';
import { Contact } from '../types/Contact';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
  onSendEmail: (contact: Contact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ 
  contact, 
  onEdit, 
  onDelete, 
  onSendEmail 
}) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title mb-0">{contact.name}</h5>
          <div className="dropdown">
            <button 
              className="btn btn-sm btn-outline-secondary"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i className="fas fa-ellipsis-v"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button 
                  className="dropdown-item"
                  onClick={() => onEdit(contact)}
                >
                  <i className="fas fa-edit me-2"></i>Edit
                </button>
              </li>
              <li>
                <button 
                  className="dropdown-item"
                  onClick={() => onSendEmail(contact)}
                >
                  <i className="fas fa-envelope me-2"></i>Send Email
                </button>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button 
                  className="dropdown-item text-danger"
                  onClick={() => onDelete(contact.id)}
                >
                  <i className="fas fa-trash me-2"></i>Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mb-2">
          <small className="text-muted">Email:</small>
          <div>{contact.email}</div>
        </div>
        
        <div className="mb-3">
          <small className="text-muted">Phone:</small>
          <div>{contact.phone}</div>
        </div>
        
        {contact.reviewUrl && (
          <div className="mb-3">
            <small className="text-muted">Review URL:</small>
            <div className="text-truncate">
              <a 
                href={contact.reviewUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary"
              >
                {contact.reviewUrl}
              </a>
            </div>
          </div>
        )}
        
        <div className="d-flex justify-content-between">
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => onSendEmail(contact)}
          >
            <i className="fas fa-envelope me-1"></i>
            Send Email
          </button>
          <small className="text-muted align-self-center">
            Added {new Date(contact.createdAt).toLocaleDateString()}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;