import React, { useState } from 'react';
import { Row, Col, Card, Button, Badge, Table, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/Campaign.css';

interface CurrentPlan {
  name: string;
  price: number;
  renewDate: string;
  features: {
    reviews: number;
    smsCredits: number;
    emailCredits: number;
    teamMembers: string;
  };
}

interface Usage {
  reviewsSent: number;
  smsUsed: number;
  emailUsed: number;
}

interface BillingHistoryItem {
  date: string;
  description: string;
  amount: number;
  status: string;
}

interface Plan {
  name: string;
  price: number;
  features: string[];
  current: boolean;
  popular?: boolean;
}

const Billing: React.FC = () => {
  const navigate = useNavigate();
  const [currentPlan] = useState<CurrentPlan>({
    name: 'Professional Plan',
    price: 49,
    renewDate: 'Jan 15, 2025',
    features: {
      reviews: 5000,
      smsCredits: 10000,
      emailCredits: 10000,
      teamMembers: 'Unlimited'
    }
  });

  const [usage] = useState<Usage>({
    reviewsSent: 2347,
    smsUsed: 1256,
    emailUsed: 3421
  });

  const billingHistory: BillingHistoryItem[] = [
    { date: 'Dec 15, 2024', description: 'Professional Plan - Monthly', amount: 49.00, status: 'Paid' },
    { date: 'Nov 15, 2024', description: 'Professional Plan - Monthly', amount: 49.00, status: 'Paid' },
    { date: 'Oct 15, 2024', description: 'Professional Plan - Monthly', amount: 49.00, status: 'Paid' },
    { date: 'Sep 15, 2024', description: 'Starter Plan - Monthly', amount: 29.00, status: 'Paid' }
  ];

  const plans: Plan[] = [
    {
      name: 'Starter',
      price: 29,
      features: ['1,000 Reviews/month', '2,000 SMS Credits', '5,000 Email Credits', '3 Team Members'],
      current: false
    },
    {
      name: 'Professional',
      price: 49,
      features: ['5,000 Reviews/month', '10,000 SMS Credits', '10,000 Email Credits', 'Unlimited Team Members'],
      current: true,
      popular: true
    },
    {
      name: 'Enterprise',
      price: 99,
      features: ['Unlimited Reviews', 'Unlimited SMS Credits', 'Unlimited Email Credits', 'Priority Support'],
      current: false
    }
  ];

  const headerActions = (
    <Button variant="primary" size="sm" onClick={() => navigate('/upgrade-plan')}>
      <i className="fa-solid fa-upgrade me-1 d-none d-sm-inline"></i>
      <span className="d-none d-sm-inline">Upgrade Plan</span>
      <i className="fa-solid fa-upgrade d-sm-none"></i>
    </Button>
  );

  return (
    <Layout 
      title="Billing & Subscription" 
      subtitle="Manage your subscription, payment methods, and billing history"
      headerActions={headerActions}
    >
      {/* Billing Overview */}
      <div className="platform-overview mb-4">
        <div className="overview-card">
          <div className="d-flex justify-content-between">
            <div className="flex-grow-1">
              <h2 className="fs-1 fw-bold mb-3">💳 Billing Management</h2>
              <p className="fs-5 mb-4 opacity-75">Manage your subscription plans, track usage, and view billing history with transparent pricing and flexible payment options.</p>
              <Row className="mt-4">
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-chart-pie text-success"></i>
                      <span className="fw-semibold">Usage Tracking</span>
                    </div>
                    <p className="small opacity-75">Monitor your monthly usage and optimize your plan</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-shield-halved text-primary"></i>
                      <span className="fw-semibold">Secure Payments</span>
                    </div>
                    <p className="small opacity-75">Bank-level security for all your payment transactions</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-arrows-up-down text-warning"></i>
                      <span className="fw-semibold">Flexible Plans</span>
                    </div>
                    <p className="small opacity-75">Upgrade, downgrade, or cancel anytime with no hidden fees</p>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="d-none d-md-block ms-4">
              <div className="bg-white bg-opacity-25 rounded-circle p-4">
                <i className="fa-solid fa-credit-card fs-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Current Plan */}
      <div className="mb-4">
        <h2 className="fs-5 fw-semibold mb-3">🎯 Current Subscription</h2>
        <Card className="border-0 shadow-lg">
          <Card.Body className="p-0">
            <div className="bg-gradient-primary text-white p-5 rounded-top position-relative overflow-hidden">
              <div className="position-absolute top-0 end-0 opacity-10">
                <i className="fa-solid fa-crown" style={{fontSize: '6rem'}}></i>
              </div>
              <div className="position-absolute" style={{top: '10px', right: '20px'}}>
                <div className="bg-warning text-dark px-3 py-1 rounded-pill small fw-bold">
                  <i className="fa-solid fa-fire me-1"></i>POPULAR
                </div>
              </div>
              <Row className="align-items-center position-relative">
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
                      <i className="fa-solid fa-star fs-3 text-warning"></i>
                    </div>
                    <div>
                      <h3 className="mb-0 fw-bold">{currentPlan.name}</h3>
                      <p className="mb-0 opacity-75">Perfect for growing businesses</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-baseline mb-2">
                    <span className="display-4 fw-bold">${currentPlan.price}</span>
                    <span className="ms-2 fs-5 opacity-75">/month</span>
                  </div>
                  <div className="small opacity-75">
                    <i className="fa-solid fa-shield-check me-1"></i>
                    Billed monthly • Cancel anytime
                  </div>
                </Col>
                <Col xs="auto" className="text-end">
                  <div className="mb-3">
                    <Badge bg="success" className="px-4 py-2 fs-6">
                      <i className="fa-solid fa-check-circle me-2"></i>ACTIVE
                    </Badge>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-3 p-3">
                    <div className="small opacity-75 mb-1">Next billing date</div>
                    <div className="fw-bold">
                      <i className="fa-solid fa-calendar-days me-2"></i>
                      {currentPlan.renewDate}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="bg-white bg-opacity-90 p-2">
              <Row className="g-2">
                <Col md={3}>
                  <div className="d-flex align-items-center p-2 rounded-3 bg-primary bg-opacity-10 border-start border-primary border-3">
                    <div className="me-2">
                      <i className="fa-solid fa-star fs-5 text-primary"></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="fs-5 fw-bold text-primary mb-0">{currentPlan.features.reviews.toLocaleString()}</div>
                      <div className="small text-muted">Reviews</div>
                      <div className="progress mt-1" style={{height: '2px'}}>
                        <div className="progress-bar bg-primary" style={{width: '47%'}}></div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="d-flex align-items-center p-2 rounded-3 bg-success bg-opacity-10 border-start border-success border-3">
                    <div className="me-2">
                      <i className="fa-solid fa-mobile-screen-button fs-5 text-success"></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="fs-5 fw-bold text-success mb-0">{currentPlan.features.smsCredits.toLocaleString()}</div>
                      <div className="small text-muted">SMS Credits</div>
                      <div className="progress mt-1" style={{height: '2px'}}>
                        <div className="progress-bar bg-success" style={{width: '13%'}}></div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="d-flex align-items-center p-2 rounded-3 bg-warning bg-opacity-10 border-start border-warning border-3">
                    <div className="me-2">
                      <i className="fa-solid fa-envelope fs-5 text-warning"></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="fs-5 fw-bold text-warning mb-0">{currentPlan.features.emailCredits.toLocaleString()}</div>
                      <div className="small text-muted">Email Credits</div>
                      <div className="progress mt-1" style={{height: '2px'}}>
                        <div className="progress-bar bg-warning" style={{width: '34%'}}></div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="d-flex align-items-center p-2 rounded-3 bg-info bg-opacity-10 border-start border-info border-3">
                    <div className="me-2">
                      <i className="fa-solid fa-users fs-5 text-info"></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="fs-5 fw-bold text-info mb-0">∞</div>
                      <div className="small text-muted">Team Members</div>
                      <Badge bg="info" className="small mt-1">5 active</Badge>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Usage This Month */}
      <div className="mb-4">
        <h2 className="fs-5 fw-semibold mb-3">📊 Usage This Month</h2>
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white border-0">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-chart-line text-primary me-2"></i>
              <h5 className="mb-0">Monthly Usage Overview</h5>
            </div>
          </Card.Header>
          <Card.Body>
          <div className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-medium">Review Requests Sent</span>
              <span className="text-muted">{usage.reviewsSent.toLocaleString()} / {currentPlan.features.reviews.toLocaleString()}</span>
            </div>
            <ProgressBar now={(usage.reviewsSent / currentPlan.features.reviews) * 100} variant="primary" />
          </div>
          
          <div className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-medium">SMS Credits Used</span>
              <span className="text-muted">{usage.smsUsed.toLocaleString()} / {currentPlan.features.smsCredits.toLocaleString()}</span>
            </div>
            <ProgressBar now={(usage.smsUsed / currentPlan.features.smsCredits) * 100} variant="success" />
          </div>
          
          <div className="mb-0">
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-medium">Email Credits Used</span>
              <span className="text-muted">{usage.emailUsed.toLocaleString()} / {currentPlan.features.emailCredits.toLocaleString()}</span>
            </div>
            <ProgressBar now={(usage.emailUsed / currentPlan.features.emailCredits) * 100} variant="warning" />
          </div>
          </Card.Body>
        </Card>
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <h2 className="fs-5 fw-semibold mb-3">💳 Payment Methods</h2>
        <Card className="border-0 shadow-lg">
          <Card.Header className="bg-gradient-primary text-white border-0 position-relative overflow-hidden">
            <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
              <div className="d-flex justify-content-around align-items-center h-100">
                <i className="fa-brands fa-cc-visa" style={{fontSize: '3rem'}}></i>
                <i className="fa-brands fa-cc-mastercard" style={{fontSize: '3rem'}}></i>
                <i className="fa-brands fa-cc-amex" style={{fontSize: '3rem'}}></i>
                <i className="fa-brands fa-cc-paypal" style={{fontSize: '3rem'}}></i>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center position-relative">
              <div className="d-flex align-items-center">
                <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
                  <i className="fa-solid fa-shield-check fs-3"></i>
                </div>
                <div>
                  <h5 className="mb-1 fw-bold">Secure Payment Methods</h5>
                  <div className="d-flex align-items-center opacity-90">
                    <i className="fa-solid fa-lock me-2"></i>
                    <small>256-bit SSL encryption • PCI DSS compliant</small>
                  </div>
                </div>
              </div>
              <Button variant="warning" size="sm" className="fw-bold text-dark px-4">
                <i className="fa-solid fa-plus me-2"></i>Add Card
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            {/* Credit Card Display */}
            <div className="p-4">
              <div className="position-relative">
                {/* Credit Card */}
                <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 rounded-4 p-4 text-white position-relative overflow-hidden shadow-lg" style={{background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #7c3aed 100%)', minHeight: '200px'}}>
                  {/* Card Background Pattern */}
                  <div className="position-absolute top-0 end-0 opacity-10">
                    <i className="fa-solid fa-circle" style={{fontSize: '15rem', transform: 'translate(50%, -50%)'}}></i>
                  </div>

                  
                  {/* Card Content */}
                  <div className="position-relative h-100 d-flex flex-column justify-content-between">
                    {/* Card Header */}
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <div className="fw-bold mb-1">BONRATE PRO</div>
                        <div className="small opacity-75">Business Account</div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-3 px-3 py-2">
                        <i className="fa-brands fa-cc-visa fs-2"></i>
                      </div>
                    </div>
                    
                    {/* Card Number */}
                    <div className="my-4">
                      <div className="fs-3 fw-bold letter-spacing-wide mb-2">
                        •••• •••• •••• 4532
                      </div>
                      <div className="small opacity-75">VALID THRU 12/27</div>
                    </div>
                    
                    {/* Card Footer */}
                    <div className="d-flex justify-content-between align-items-end">
                      <div>
                        <div className="small opacity-75 mb-1">CARDHOLDER NAME</div>
                        <div className="fw-semibold">JOHN SMITH</div>
                      </div>
                      <div className="text-end">
                        <div className="bg-white bg-opacity-20 rounded-circle p-2">
                          <i className="fa-solid fa-wifi fs-5"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Card Status Badges */}
                <div className="position-absolute" style={{top: '-10px', right: '20px'}}>
                  <div className="d-flex gap-2">
                    <Badge bg="success" className="px-3 py-2 rounded-pill shadow">
                      <i className="fa-solid fa-check-circle me-1"></i>PRIMARY
                    </Badge>
                    <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill shadow">
                      <i className="fa-solid fa-shield-check me-1"></i>VERIFIED
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Card Actions */}
              <div className="mt-4">
                <Row className="g-3">
                  <Col md={6}>
                    <div className="bg-light rounded-3 p-3 text-center">
                      <i className="fa-solid fa-edit text-primary fs-4 mb-2"></i>
                      <div className="fw-semibold mb-1">Edit Card</div>
                      <div className="small text-muted">Update card details</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="bg-light rounded-3 p-3 text-center">
                      <i className="fa-solid fa-trash text-danger fs-4 mb-2"></i>
                      <div className="fw-semibold mb-1">Remove Card</div>
                      <div className="small text-muted">Delete this payment method</div>
                    </div>
                  </Col>
                </Row>
              </div>
              
              {/* Next Billing Info */}
              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-4 border border-success border-opacity-25">
                <div className="d-flex align-items-center">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                    <i className="fa-solid fa-calendar-check text-success fs-4"></i>
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-bold text-success mb-1">Next Billing Cycle</div>
                    <div className="text-muted">Your card will be charged <strong className="text-dark">${currentPlan.price}.00</strong> on <strong className="text-dark">{currentPlan.renewDate}</strong></div>
                  </div>
                  <Badge bg="success" className="px-3 py-2">
                    <i className="fa-solid fa-clock me-1"></i>Auto-pay ON
                  </Badge>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Billing History */}
      <div className="mb-4">
        <h2 className="fs-5 fw-semibold mb-3">📋 Billing History</h2>
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-primary text-white border-0">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="fa-solid fa-receipt me-2"></i>
                Recent Transactions
              </h5>
              <Button variant="light" size="sm">
                <i className="fa-solid fa-download me-1"></i>Export
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="d-none d-md-block">
              {billingHistory.map((item, index) => (
                <div key={index} className="p-4 border-bottom d-flex align-items-center justify-content-between hover-bg-light">
                  <div className="d-flex align-items-center">
                    <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                      <i className="fa-solid fa-check text-success"></i>
                    </div>
                    <div>
                      <div className="fw-semibold">{item.description}</div>
                      <div className="small text-muted">{item.date}</div>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold fs-5">${item.amount.toFixed(2)}</div>
                    <Badge bg="success" className="small">{item.status}</Badge>
                  </div>
                  <Button variant="outline-primary" size="sm" className="ms-3">
                    <i className="fa-solid fa-download"></i>
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="d-md-none">
              {billingHistory.map((item, index) => (
                <div key={index} className="p-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center">
                      <div className="bg-success bg-opacity-10 rounded-circle p-2 me-2">
                        <i className="fa-solid fa-check text-success fs-6"></i>
                      </div>
                      <div>
                        <div className="fw-medium">{item.description}</div>
                        <div className="small text-muted">{item.date}</div>
                      </div>
                    </div>
                    <Badge bg="success" className="small">{item.status}</Badge>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="fw-bold">${item.amount.toFixed(2)}</div>
                    <Button variant="outline-primary" size="sm">
                      <i className="fa-solid fa-download"></i>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Available Plans */}
      <div>
        <h2 className="fs-5 fw-semibold mb-3">🚀 Available Plans</h2>
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-primary text-white border-0">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h5 className="mb-1">
                  <i className="fa-solid fa-layer-group me-2"></i>
                  Choose Your Perfect Plan
                </h5>
                <small className="opacity-75">Upgrade or downgrade anytime with no hidden fees</small>
              </div>
              <i className="fa-solid fa-rocket fs-2 opacity-25"></i>
            </div>
          </Card.Header>
          <Card.Body className="p-4">
            <Row className="g-4">
              {plans.map((plan, index) => (
                <Col lg={4} key={index}>
                  <Card className={`h-100 position-relative ${plan.current ? 'border-primary border-2 shadow-sm' : 'border-0 shadow-sm'} ${plan.popular ? 'bg-warning bg-opacity-5' : ''}`}>
                    {plan.popular && (
                      <div className="position-absolute top-0 start-50 translate-middle">
                        <Badge bg="warning" className="px-3 py-2 rounded-pill text-dark fw-bold">
                          <i className="fa-solid fa-crown me-1"></i>POPULAR
                        </Badge>
                      </div>
                    )}
                    <Card.Body className="text-center pt-4">
                      <div className="mb-3">
                        <div className={`rounded-circle d-inline-flex align-items-center justify-content-center ${plan.current ? 'bg-primary text-white' : plan.popular ? 'bg-warning text-dark' : 'bg-light text-primary'}`} style={{width: '60px', height: '60px'}}>
                          <i className={`fa-solid ${plan.name === 'Starter' ? 'fa-rocket' : plan.name === 'Professional' ? 'fa-star' : 'fa-crown'} fs-4`}></i>
                        </div>
                      </div>
                      <h5 className="mb-2 fw-bold">{plan.name}</h5>
                      <div className="mb-4">
                        <span className="display-6 fw-bold text-primary">${plan.price}</span>
                        <span className="text-muted">/month</span>
                      </div>
                      <ul className="list-unstyled mb-4">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="mb-2 d-flex align-items-center text-start">
                            <i className="fa-solid fa-check text-success me-2 flex-shrink-0"></i>
                            <span className="small">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        variant={plan.current ? "success" : plan.popular ? "warning" : "outline-primary"} 
                        className={`w-100 py-2 fw-semibold ${plan.popular ? 'text-dark' : ''}`}
                        disabled={plan.current}
                        onClick={() => plan.name === 'Enterprise' && navigate('/upgrade-plan')}
                      >
                        {plan.current ? (
                          <><i className="fa-solid fa-check me-2"></i>Current Plan</>
                        ) : plan.name === 'Enterprise' ? (
                          <><i className="fa-solid fa-arrow-up me-2"></i>Upgrade Now</>
                        ) : (
                          <><i className="fa-solid fa-arrow-down me-2"></i>Downgrade</>
                        )}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export default Billing;