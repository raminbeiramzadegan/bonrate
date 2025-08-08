import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const DripAutomation = () => {
  const [automation, setAutomation] = useState({
    name: '',
    description: '',
    steps: [
      {
        id: 1,
        type: 'email',
        template: '',
        delay: 0,
        condition: 'always'
      }
    ]
  });

  // Mock data
  const templates = [
    { id: 1, name: 'Initial Review Request', type: 'email' },
    { id: 2, name: 'SMS Reminder', type: 'sms' },
    { id: 3, name: 'Thank You Email', type: 'email' },
    { id: 4, name: 'Follow-up SMS', type: 'sms' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAutomation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStepChange = (stepId: number, field: string, value: any) => {
    setAutomation(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId ? { ...step, [field]: value } : step
      )
    }));
  };

  const addStep = () => {
    const newStepId = Math.max(...automation.steps.map(s => s.id)) + 1;
    setAutomation(prev => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          id: newStepId,
          type: 'email',
          template: '',
          delay: 3,
          condition: 'no_response'
        }
      ]
    }));
  };

  const removeStep = (stepId: number) => {
    if (automation.steps.length <= 1) return;
    
    setAutomation(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId)
    }));
  };

  const handleSave = () => {
    console.log('Saving automation:', automation);
    alert('Automation saved successfully!');
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Drip Automation Builder</h1>
      
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Automation Details</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={automation.name}
                    onChange={handleChange}
                    placeholder="Review Follow-up Sequence"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={automation.description}
                    onChange={handleChange}
                    placeholder="Describe your automation..."
                  />
                </Form.Group>
                
                <Button variant="primary" onClick={handleSave}>
                  Save Automation
                </Button>
              </Form>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <Card.Title>Tips</Card.Title>
              <ul>
                <li>Start with an initial review request</li>
                <li>Add follow-ups based on customer actions</li>
                <li>Mix channels for better engagement</li>
                <li>Keep sequences under 3-4 steps</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Automation Flow</Card.Title>
              <div className="automation-builder">
                {automation.steps.map((step, index) => (
                  <div key={step.id} className="mb-4">
                    <Card className="border-primary">
                      <Card.Header className="d-flex justify-content-between align-items-center">
                        <div>Step {index + 1}: {step.type === 'email' ? 'Email' : 'SMS'}</div>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => removeStep(step.id)}
                          disabled={automation.steps.length <= 1}
                        >
                          Remove
                        </Button>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Channel</Form.Label>
                              <Form.Select
                                value={step.type}
                                onChange={(e) => handleStepChange(step.id, 'type', e.target.value)}
                              >
                                <option value="email">Email</option>
                                <option value="sms">SMS</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Template</Form.Label>
                              <Form.Select
                                value={step.template}
                                onChange={(e) => handleStepChange(step.id, 'template', e.target.value)}
                              >
                                <option value="">Select template...</option>
                                {templates
                                  .filter(t => t.type === step.type)
                                  .map(template => (
                                    <option key={template.id} value={template.id}>
                                      {template.name}
                                    </option>
                                  ))
                                }
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        {index > 0 && (
                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Wait</Form.Label>
                                <div className="d-flex align-items-center">
                                  <Form.Control
                                    type="number"
                                    value={step.delay}
                                    onChange={(e) => handleStepChange(step.id, 'delay', parseInt(e.target.value))}
                                    min={0}
                                    style={{ width: '80px' }}
                                  />
                                  <span className="ms-2">days</span>
                                </div>
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Condition</Form.Label>
                                <Form.Select
                                  value={step.condition}
                                  onChange={(e) => handleStepChange(step.id, 'condition', e.target.value)}
                                >
                                  <option value="always">Always send</option>
                                  <option value="no_response">If no response</option>
                                  <option value="no_review">If no review left</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          </Row>
                        )}
                      </Card.Body>
                    </Card>
                    
                    {index < automation.steps.length - 1 && (
                      <div className="text-center my-2">
                        <i className="bi bi-arrow-down"></i>
                        <div>Wait {automation.steps[index + 1].delay} days</div>
                      </div>
                    )}
                  </div>
                ))}
                
                <Button 
                  variant="outline-primary" 
                  className="w-100 mt-3"
                  onClick={addStep}
                >
                  + Add Step
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DripAutomation;