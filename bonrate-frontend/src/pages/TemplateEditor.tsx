import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const TemplateEditor = () => {
  const [template, setTemplate] = useState({
    name: '',
    subject: 'We value your feedback!',
    content: 'Dear {{customer_name}},\n\nThank you for choosing {{business_name}}. We hope you enjoyed our service.\n\nWe would appreciate if you could take a moment to leave us a review.\n\n{{review_link}}\n\nThank you,\n{{business_name}} Team'
  });
  
  const [previewData, setPreviewData] = useState({
    customer_name: 'John Doe',
    business_name: 'Bonrate Pro',
    review_link: 'https://review.bonrate.com/abc123'
  });

  const handleTemplateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTemplate(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreviewDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreviewData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderPreview = () => {
    let preview = template.content;
    Object.entries(previewData).forEach(([key, value]) => {
      preview = preview.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    return preview;
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving template:', template);
    alert('Template saved successfully!');
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Template Editor</h1>
      
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Edit Template</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Template Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={template.name}
                    onChange={handleTemplateChange}
                    placeholder="My Review Request Template"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={template.subject}
                    onChange={handleTemplateChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    name="content"
                    value={template.content}
                    onChange={handleTemplateChange}
                  />
                  <Form.Text className="text-muted">
                    Use {'{{'}{previewData.customer_name}{'}}'},
                    {'{{'}{previewData.business_name}{'}}'},
                    and {'{{'}{previewData.review_link}{'}}'} as variables.
                  </Form.Text>
                </Form.Group>
                
                <Button variant="primary" onClick={handleSave}>
                  Save Template
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Preview</Card.Title>
              <div className="border p-3 mb-3" style={{ whiteSpace: 'pre-wrap' }}>
                {renderPreview()}
              </div>
              
              <Card.Title>Preview Data</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer_name"
                    value={previewData.customer_name}
                    onChange={handlePreviewDataChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Business Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="business_name"
                    value={previewData.business_name}
                    onChange={handlePreviewDataChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Review Link</Form.Label>
                  <Form.Control
                    type="text"
                    name="review_link"
                    value={previewData.review_link}
                    onChange={handlePreviewDataChange}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TemplateEditor;