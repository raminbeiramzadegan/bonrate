import React, { useState } from 'react';
import { Row, Col, Card, Button, Badge, Alert, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/Campaign.css';

const UpgradePlan = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      price: { monthly: 29, yearly: 232 },
      description: 'Perfect for small businesses',
      features: [
        '1,000 Monthly Reviews',
        '2,500 SMS/Email Credits',
        '3 Team Members',
        'Basic Analytics',
        'Email Support'
      ],
      current: false,
      buttonText: 'Downgrade to Starter',
      buttonVariant: 'outline-secondary',
      icon: 'fa-rocket'
    },
    {
      name: 'Professional',
      price: { monthly: 49, yearly: 392 },
      description: 'Perfect for growing businesses',
      features: [
        '5,000 Monthly Reviews',
        '10,000 SMS/Email Credits',
        'Unlimited Team Members',
        'Advanced Analytics',
        'Priority Support',
        'AI-Powered Insights'
      ],
      current: true,
      buttonText: 'Current Plan',
      buttonVariant: 'primary',
      popular: true,
      icon: 'fa-star'
    },
    {
      name: 'Enterprise',
      price: { monthly: 99, yearly: 792 },
      description: 'For large-scale operations',
      features: [
        'Unlimited Reviews',
        '50,000 SMS/Email Credits',
        'Unlimited Team Members',
        'Custom Analytics',
        '24/7 Phone Support',
        'White-label Options',
        'API Access'
      ],
      current: false,
      buttonText: 'Upgrade to Enterprise',
      buttonVariant: 'secondary',
      icon: 'fa-crown'
    }
  ];

  const comparisonFeatures = [
    { name: 'Monthly Reviews', starter: '1,000', professional: '5,000', enterprise: 'Unlimited' },
    { name: 'SMS/Email Credits', starter: '2,500', professional: '10,000', enterprise: '50,000' },
    { name: 'Team Members', starter: '3', professional: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'AI-Powered Insights', starter: false, professional: true, enterprise: true },
    { name: 'API Access', starter: false, professional: false, enterprise: true },
    { name: 'White-label Options', starter: false, professional: false, enterprise: true }
  ];

  const headerActions = (
    <Button variant="outline-secondary" size="sm" onClick={() => navigate('/billing')}>
      <i className="fa-solid fa-arrow-left me-1 d-none d-sm-inline"></i>
      <span className="d-none d-sm-inline">Back to Billing</span>
      <i className="fa-solid fa-arrow-left d-sm-none"></i>
    </Button>
  );

  return (
    <Layout 
      title="Upgrade Your Plan" 
      subtitle="Choose the perfect plan for your business needs"
      headerActions={headerActions}
    >
      {/* Current Plan Alert */}
      <Alert variant="info" className="mb-4">
        <div className="d-flex align-items-center">
          <i className="fa-solid fa-info-circle me-3"></i>
          <div>
            <div className="fw-medium">You're currently on the Professional Plan</div>
            <div className="small">Your next billing date is January 15, 2025</div>
          </div>
        </div>
      </Alert>

      {/* Billing Toggle */}
      <div className="text-center mb-5">
        <div className="d-inline-flex bg-light rounded-pill p-1">
          <Button
            variant={billingCycle === 'monthly' ? 'primary' : 'light'}
            size="sm"
            className="rounded-pill px-4"
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </Button>
          <Button
            variant={billingCycle === 'yearly' ? 'primary' : 'light'}
            size="sm"
            className="rounded-pill px-4"
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly
            <Badge bg="success" className="ms-2">20% OFF</Badge>
          </Button>
        </div>
      </div>

      {/* Plans Grid */}
      <Row className="g-4 mb-5">
        {plans.map((plan, index) => (
          <Col lg={4} key={index}>
            <Card className={`h-100 position-relative ${plan.current ? 'border-primary border-2' : ''} ${plan.popular ? 'shadow' : ''}`}>
              {plan.current && (
                <div className="position-absolute top-0 start-50 translate-middle">
                  <Badge bg="primary" className="px-3 py-2 rounded-pill">Current Plan</Badge>
                </div>
              )}
              
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <div className={`rounded-circle d-inline-flex align-items-center justify-content-center ${plan.current ? 'bg-primary text-white' : 'bg-light text-primary'}`} style={{width: '60px', height: '60px'}}>
                    <i className={`fa-solid ${plan.icon} fs-4`}></i>
                  </div>
                </div>
                
                <h4 className="fw-bold mb-2">{plan.name}</h4>
                <p className="text-muted small mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="fs-1 fw-bold text-primary">
                    ${plan.price[billingCycle as keyof typeof plan.price]}
                  </span>
                  <span className="text-muted">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                  {billingCycle === 'yearly' && (
                    <div className="small text-success mt-1">
                      Save ${(plan.price.monthly * 12) - plan.price.yearly}/year
                    </div>
                  )}
                </div>
                
                <ul className="list-unstyled mb-4 text-start">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="mb-2 d-flex align-items-center">
                      <i className="fa-solid fa-check-circle text-success me-2 flex-shrink-0"></i>
                      <span className="small">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant}
                  className="w-100 py-2 fw-semibold"
                  disabled={plan.current}
                >
                  {plan.current && <i className="fa-solid fa-check me-2"></i>}
                  {!plan.current && plan.name === 'Enterprise' && <i className="fa-solid fa-arrow-up me-2"></i>}
                  {!plan.current && plan.name === 'Starter' && <i className="fa-solid fa-arrow-down me-2"></i>}
                  {plan.buttonText}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Features Comparison */}
      <Card>
        <Card.Header className="bg-white">
          <h5 className="mb-0">
            <i className="fa-solid fa-table-columns text-primary me-2"></i>
            Feature Comparison
          </h5>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table className="mb-0">
              <thead className="table-light">
                <tr>
                  <th className="border-0 ps-4">Feature</th>
                  <th className="border-0 text-center">Starter</th>
                  <th className="border-0 text-center">Professional</th>
                  <th className="border-0 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index}>
                    <td className="ps-4 fw-medium">{feature.name}</td>
                    <td className="text-center">
                      {typeof feature.starter === 'boolean' ? (
                        <i className={`fa-solid ${feature.starter ? 'fa-check text-success' : 'fa-times text-danger'}`}></i>
                      ) : (
                        feature.starter
                      )}
                    </td>
                    <td className="text-center">
                      {typeof feature.professional === 'boolean' ? (
                        <i className={`fa-solid ${feature.professional ? 'fa-check text-success' : 'fa-times text-danger'}`}></i>
                      ) : (
                        <span className="fw-semibold text-primary">{feature.professional}</span>
                      )}
                    </td>
                    <td className="text-center">
                      {typeof feature.enterprise === 'boolean' ? (
                        <i className={`fa-solid ${feature.enterprise ? 'fa-check text-success' : 'fa-times text-danger'}`}></i>
                      ) : (
                        feature.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default UpgradePlan;