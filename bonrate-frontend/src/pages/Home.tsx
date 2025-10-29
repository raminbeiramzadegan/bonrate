import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-3">
        <Container style={{maxWidth: '600px'}}>
          <Row className="align-items-center">
            <Col md={6}>
              <h1>Boost Your Business with Customer Reviews</h1>
              <p className="lead">
                Bonrate Pro helps you collect, manage, and leverage customer reviews to grow your business.
              </p>
              <Button 
                variant="light" 
                size="lg" 
                className="me-3"
                onClick={() => navigate('/register')}
              >
                Get Started
              </Button>
              <Button 
                variant="outline-light" 
                size="lg"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </Col>
            <Col md={6}>
              <img 
                src="https://via.placeholder.com/600x400" 
                alt="Bonrate Pro Dashboard" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-3" style={{maxWidth: '600px'}}>
        <h2 className="text-center mb-3">Key Features</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Template Editor</Card.Title>
                <Card.Text>
                  Create beautiful, customized review request templates with our easy-to-use editor.
                </Card.Text>
                <Button 
                  variant="outline-primary" 
                  className="mt-auto"
                  onClick={() => navigate('/register')}
                >
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Campaign Wizard</Card.Title>
                <Card.Text>
                  Set up review campaigns in minutes with our 4-step wizard. Reach customers via email, SMS, and more.
                </Card.Text>
                <Button 
                  variant="outline-primary" 
                  className="mt-auto"
                  onClick={() => navigate('/register')}
                >
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Drip Automation</Card.Title>
                <Card.Text>
                  Build automated follow-up sequences with our drag-and-drop automation builder.
                </Card.Text>
                <Button 
                  variant="outline-primary" 
                  className="mt-auto"
                  onClick={() => navigate('/register')}
                >
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Call to Action */}
      <div className="bg-light py-3">
        <Container className="text-center" style={{maxWidth: '600px'}}>
          <h2>Ready to grow your business with customer reviews?</h2>
          <p className="lead mb-4">
            Join thousands of businesses using Bonrate Pro to boost their online reputation.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => navigate('/register')}
          >
            Start Your Free Trial
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default Home;