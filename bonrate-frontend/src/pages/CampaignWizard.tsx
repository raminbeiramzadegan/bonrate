import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ProgressBar } from 'react-bootstrap';

interface Template {
  id: number;
  name: string;
}

interface Audience {
  id: number;
  name: string;
  count: number;
}

interface Schedule {
  startDate: string;
  sendTime: string;
  timezone: string;
}

interface Campaign {
  name: string;
  description: string;
  template: string;
  channels: string[];
  audience: number[];
  schedule: Schedule;
}

const CampaignWizard: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [campaign, setCampaign] = useState<Campaign>({
    name: '',
    description: '',
    template: '',
    channels: [],
    audience: [],
    schedule: {
      startDate: '',
      sendTime: '',
      timezone: 'UTC'
    }
  });

  // Mock data
  const templates: Template[] = [
    { id: 1, name: 'Standard Review Request' },
    { id: 2, name: 'Follow-up Template' },
    { id: 3, name: 'Thank You Template' }
  ];

  const audiences: Audience[] = [
    { id: 1, name: 'All Customers', count: 1250 },
    { id: 2, name: 'Recent Customers', count: 450 },
    { id: 3, name: 'Repeat Customers', count: 320 }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setCampaign(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChannelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e.target;
    setCampaign(prev => {
      if (checked) {
        return { ...prev, channels: [...prev.channels, value] };
      } else {
        return { ...prev, channels: prev.channels.filter(channel => channel !== value) };
      }
    });
  };

  const handleAudienceChange = (audienceId: string): void => {
    setCampaign(prev => ({
      ...prev,
      audience: [parseInt(audienceId)]
    }));
  };

  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setCampaign(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [name]: value
      }
    }));
  };

  const nextStep = (): void => {
    setStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = (): void => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (): void => {
    console.log('Campaign created:', campaign);
    alert('Campaign created successfully!');
    // Reset form or redirect
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Campaign Wizard</h1>
      
      <Card className="mb-4">
        <Card.Body>
          <ProgressBar now={(step / 4) * 100} className="mb-4" />
          
          <h4>Step {step} of 4: {
            step === 1 ? 'Campaign Details' :
            step === 2 ? 'Select Template' :
            step === 3 ? 'Choose Audience' :
            'Schedule Campaign'
          }</h4>
          
          {step === 1 && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Campaign Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={campaign.name}
                  onChange={handleChange}
                  placeholder="November Review Campaign"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={campaign.description}
                  onChange={handleChange}
                  placeholder="Campaign description..."
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Communication Channels</Form.Label>
                <div>
                  <Form.Check
                    type="checkbox"
                    label="Email"
                    value="email"
                    checked={campaign.channels.includes('email')}
                    onChange={handleChannelChange}
                    inline
                  />
                  <Form.Check
                    type="checkbox"
                    label="SMS"
                    value="sms"
                    checked={campaign.channels.includes('sms')}
                    onChange={handleChannelChange}
                    inline
                  />
                  <Form.Check
                    type="checkbox"
                    label="WhatsApp"
                    value="whatsapp"
                    checked={campaign.channels.includes('whatsapp')}
                    onChange={handleChannelChange}
                    inline
                  />
                </div>
              </Form.Group>
            </Form>
          )}
          
          {step === 2 && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Select Template</Form.Label>
                <Form.Select
                  name="template"
                  value={campaign.template}
                  onChange={handleChange}
                >
                  <option value="">Select a template...</option>
                  {templates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              
              {campaign.template && (
                <Card className="mt-3">
                  <Card.Body>
                    <Card.Title>Template Preview</Card.Title>
                    <p>This is a preview of the selected template.</p>
                    <Button variant="outline-secondary" size="sm">
                      Edit Template
                    </Button>
                  </Card.Body>
                </Card>
              )}
            </Form>
          )}
          
          {step === 3 && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Select Audience</Form.Label>
                {audiences.map(audience => (
                  <Card 
                    key={audience.id} 
                    className={`mb-2 ${campaign.audience.includes(audience.id) ? 'border-primary' : ''}`}
                    onClick={() => handleAudienceChange(audience.id.toString())}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Body>
                      <Form.Check
                        type="radio"
                        name="audience"
                        id={`audience-${audience.id}`}
                        label={`${audience.name} (${audience.count} contacts)`}
                        checked={campaign.audience.includes(audience.id)}
                        onChange={() => {}}
                      />
                    </Card.Body>
                  </Card>
                ))}
              </Form.Group>
            </Form>
          )}
          
          {step === 4 && (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={campaign.schedule.startDate}
                      onChange={handleScheduleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Send Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="sendTime"
                      value={campaign.schedule.sendTime}
                      onChange={handleScheduleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Timezone</Form.Label>
                <Form.Select
                  name="timezone"
                  value={campaign.schedule.timezone}
                  onChange={handleScheduleChange}
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </Form.Select>
              </Form.Group>
              
              <Card className="mt-4 bg-light">
                <Card.Body>
                  <Card.Title>Campaign Summary</Card.Title>
                  <p><strong>Name:</strong> {campaign.name}</p>
                  <p><strong>Channels:</strong> {campaign.channels.join(', ')}</p>
                  <p><strong>Template:</strong> {templates.find(t => t.id === parseInt(campaign.template))?.name || 'None selected'}</p>
                  <p><strong>Audience:</strong> {audiences.find(a => campaign.audience.includes(a.id))?.name || 'None selected'}</p>
                  <p><strong>Schedule:</strong> {campaign.schedule.startDate} at {campaign.schedule.sendTime}</p>
                </Card.Body>
              </Card>
            </Form>
          )}
          
          <div className="d-flex justify-content-between mt-4">
            {step > 1 && (
              <Button variant="outline-secondary" onClick={prevStep}>
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button variant="primary" onClick={nextStep} className="ms-auto">
                Next
              </Button>
            ) : (
              <Button variant="success" onClick={handleSubmit} className="ms-auto">
                Create Campaign
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CampaignWizard;