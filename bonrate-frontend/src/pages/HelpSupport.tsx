import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import Layout from '../components/Layout';

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const quickActions = [
    { icon: 'fa-rocket', title: 'Getting Started', desc: 'Learn the basics' },
    { icon: 'fa-video', title: 'Video Tutorials', desc: 'Watch and learn' },
    { icon: 'fa-headset', title: 'Live Chat', desc: 'Chat with support' },
    { icon: 'fa-envelope', title: 'Email Support', desc: 'Send us a message' }
  ];

  const helpCategories = [
    { icon: 'fa-rocket', title: 'Getting Started', count: 12 },
    { icon: 'fa-envelope', title: 'Campaigns & Templates', count: 18 },
    { icon: 'fa-robot', title: 'Automation', count: 15 },
    { icon: 'fa-users', title: 'Contact Management', count: 10 },
    { icon: 'fa-chart-line', title: 'Analytics & Reports', count: 8 },
    { icon: 'fa-credit-card', title: 'Billing & Plans', count: 6 }
  ];

  const faqItems = [
    {
      icon: 'fa-play-circle',
      question: 'How do I create my first campaign?',
      answer: 'Navigate to the Campaigns page and click "Create Campaign". Follow the 4-step wizard to set up your campaign with templates, contacts, and scheduling.'
    },
    {
      icon: 'fa-edit',
      question: 'Can I customize email templates?',
      answer: 'Yes! Use our Template Editor to create custom templates with variables, preview functionality, and mobile-responsive designs.'
    },
    {
      icon: 'fa-cogs',
      question: 'How does the automation system work?',
      answer: 'Our drag-and-drop automation builder lets you create drip campaigns with triggers, conditions, and actions to engage customers automatically.'
    },
    {
      icon: 'fa-credit-card',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through Stripe.'
    },
    {
      icon: 'fa-upload',
      question: 'How can I import my existing contacts?',
      answer: 'Use the Import feature on the Contacts page to upload CSV files or connect with popular CRM systems and email platforms.'
    }
  ];

  const headerActions = (
    <div className="d-flex gap-2">
      <Button variant="outline-primary" size="sm">
        <i className="fa-solid fa-book me-1 d-none d-sm-inline"></i>
        <span className="d-none d-sm-inline">Documentation</span>
        <i className="fa-solid fa-book d-sm-none"></i>
      </Button>
      <Button variant="primary" size="sm" onClick={() => window.location.href = '/email-support'}>
        <i className="fa-solid fa-headset me-1 d-none d-sm-inline"></i>
        <span className="d-none d-sm-inline">Contact Support</span>
        <i className="fa-solid fa-headset d-sm-none"></i>
      </Button>
    </div>
  );

  return (
    <Layout 
      title="Help & Support" 
      subtitle="Find answers, tutorials, and get help when you need it"
      headerActions={headerActions}
    >
      {/* Header Overview */}
      <div className="platform-overview mb-4">
        <div className="overview-card">
          <div className="d-flex justify-content-between">
            <div className="flex-grow-1">
              <h2 className="fs-1 fw-bold mb-3">🆘 Get Help & Support</h2>
              <p className="fs-5 mb-4 text-white">Our dedicated support team is here to help you succeed with Bonrate Pro. Get instant answers or connect with our experts.</p>
              <Row className="mt-4">
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-clock text-success"></i>
                      <span className="fw-semibold">24/7 Support</span>
                    </div>
                    <p className="small text-white-50">Round-the-clock assistance when you need it most</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-bolt text-warning"></i>
                      <span className="fw-semibold">Instant Answers</span>
                    </div>
                    <p className="small text-white-50">Comprehensive knowledge base with quick solutions</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-users text-info"></i>
                      <span className="fw-semibold">Expert Team</span>
                    </div>
                    <p className="small text-white-50">Experienced professionals ready to assist you</p>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="d-none d-md-block ms-4">
              <div className="bg-white bg-opacity-25 rounded-circle p-4">
                <i className="fa-solid fa-headset fs-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <Card className="mb-4 border-0 shadow-lg position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e8d5ff 0%, #f3e8ff 50%, #fce7f3 100%)' }}>
        <Card.Body className="text-center py-5 position-relative">
          <div className="bg-white bg-opacity-50 rounded-circle d-inline-flex align-items-center justify-content-center mb-4 shadow-sm" style={{width: '80px', height: '80px'}}>
            <i className="fa-solid fa-search fs-2" style={{ color: '#8b5cf6' }}></i>
          </div>
          <h2 className="mb-3 fw-bold" style={{ color: '#6b46c1' }}>How can we help you?</h2>
          <p className="mb-4 fs-5" style={{ color: '#7c3aed', opacity: 0.8 }}>Search our knowledge base or browse categories below</p>
          <div className="position-relative mx-auto" style={{maxWidth: '600px'}}>
            <Form.Control
              type="text"
              placeholder="Search for help articles, guides, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-5 pe-5 py-3 border-0 shadow"
              style={{borderRadius: '50px', backgroundColor: 'rgba(255,255,255,0.9)'}}
            />
            <i className="fa-solid fa-magnifying-glass position-absolute start-0 top-50 translate-middle-y ms-4" style={{ color: '#a855f7' }}></i>
            <Button 
              className="position-absolute end-0 top-50 translate-middle-y me-1 px-4 py-2 border-0 fw-semibold"
              style={{borderRadius: '50px', background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)', color: 'white'}}
            >
              <i className="fa-solid fa-search me-2"></i>Search
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Quick Actions */}
      <div className="mb-4">
        <h3 className="mb-3 fw-bold">
          <i className="fa-solid fa-rocket me-2" style={{ color: '#f59e0b' }}></i>
          Quick Actions
        </h3>
        <Row className="g-4">
          {quickActions.map((action, index) => {
            const colors = [
              { bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', icon: '#f59e0b', button: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
              { bg: 'linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)', icon: '#8b5cf6', button: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' },
              { bg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', icon: '#ec4899', button: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' },
              { bg: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', icon: '#10b981', button: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }
            ];
            const color = colors[index % colors.length];
            return (
              <Col md={6} lg={3} key={index}>
                <Card className="h-100 border-0 shadow-lg text-center position-relative overflow-hidden" style={{ cursor: 'pointer', transition: 'transform 0.2s', background: color.bg }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <Card.Body className="p-4 position-relative">
                    <div className="bg-white bg-opacity-50 rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" style={{width: '70px', height: '70px'}}>
                      <i className={`fa-solid fa-${action.icon} fs-3`} style={{ color: color.icon }}></i>
                    </div>
                    <h5 className="mb-2 fw-bold" style={{ color: '#374151' }}>{action.title}</h5>
                    <p className="small mb-3" style={{ color: '#6b7280' }}>{action.desc}</p>
                    <Button className="w-100 fw-semibold border-0 text-white" style={{borderRadius: '25px', background: color.button}}>
                      <i className={`fa-solid fa-${action.icon} me-2`}></i>Get Help
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>

      {/* Help Categories */}
      <div className="mb-4">
        <h3 className="mb-3 fw-bold">
          <i className="fa-solid fa-layer-group me-2" style={{ color: '#06b6d4' }}></i>
          Browse Help Categories
        </h3>
        <Row className="g-4">
          {helpCategories.map((category, index) => {
            const colors = [
              { bg: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)', icon: '#f59e0b', badge: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
              { bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', icon: '#22c55e', badge: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' },
              { bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', icon: '#3b82f6', badge: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
              { bg: 'linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)', icon: '#ec4899', badge: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' },
              { bg: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', icon: '#6366f1', badge: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' },
              { bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', icon: '#10b981', badge: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }
            ];
            const color = colors[index % colors.length];
            return (
              <Col md={6} key={index}>
                <Card className="border-0 shadow-lg h-100 position-relative overflow-hidden" style={{ cursor: 'pointer', transition: 'transform 0.2s', background: color.bg }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <Card.Body className="p-4 position-relative">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="bg-white bg-opacity-60 rounded-circle p-3 shadow-sm">
                        <i className={`fa-solid fa-${category.icon} fs-5`} style={{ color: color.icon }}></i>
                      </div>
                      <span className="text-white px-3 py-1 rounded-pill fw-bold shadow-sm" style={{ background: color.badge, fontSize: '0.875rem' }}>{category.count}</span>
                    </div>
                    <h5 className="mb-2 fw-bold" style={{ color: '#374151' }}>{category.title}</h5>
                    <p className="mb-0" style={{ color: '#6b7280' }}>
                      Find help articles for {category.title.toLowerCase()}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>

      {/* FAQ Section */}
      <div className="mb-4">
        <h3 className="mb-3 fw-bold">
          <i className="fa-solid fa-circle-question me-2" style={{ color: '#8b5cf6' }}></i>
          Frequently Asked Questions
        </h3>
        <Card className="border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)' }}>
          <Card.Header className="border-0" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
            <div className="d-flex align-items-center text-white">
              <div className="bg-white bg-opacity-20 rounded-circle p-2 me-3">
                <i className="fa-solid fa-lightbulb fs-5"></i>
              </div>
              <h5 className="mb-0 fw-bold">Quick Answers to Common Questions</h5>
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            {faqItems.map((faq, index) => {
              const colors = [
                { border: '#f59e0b', icon: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
                { border: '#22c55e', icon: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
                { border: '#3b82f6', icon: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
                { border: '#ec4899', icon: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' },
                { border: '#8b5cf6', icon: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' }
              ];
              const color = colors[index % colors.length];
              return (
                <div key={index} className={`${index < faqItems.length - 1 ? 'border-bottom border-white border-opacity-50' : ''} position-relative overflow-hidden`} style={{ background: 'rgba(255,255,255,0.3)' }}>
                  <div className="position-absolute start-0 top-0 bottom-0" style={{width: '4px', background: color.border}}></div>
                  <div className="p-4 ps-5">
                    <Button
                      variant="link"
                      className="w-100 text-start p-0 text-decoration-none text-dark d-flex justify-content-between align-items-center"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <div className="d-flex align-items-center">
                        <div className="bg-white rounded-circle p-2 me-3 shadow-sm">
                          <i className={`fa-solid fa-${faq.icon}`} style={{ color: color.icon }}></i>
                        </div>
                        <h6 className="mb-0 fw-semibold" style={{ color: '#374151' }}>{faq.question}</h6>
                      </div>
                      <div className={`rounded-circle p-2 ${expandedFaq === index ? 'text-white' : ''}`} style={{ background: expandedFaq === index ? color.border : color.bg }}>
                        <i className={`fa-solid fa-chevron-${expandedFaq === index ? 'up' : 'down'}`} style={{ color: expandedFaq === index ? 'white' : color.icon }}></i>
                      </div>
                    </Button>
                    {expandedFaq === index && (
                      <div className="mt-3 p-3 rounded-3" style={{ background: color.bg }}>
                        <p className="mb-0" style={{ color: '#374151' }}>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </Card.Body>
        </Card>
      </div>

      {/* Contact Section */}
      <Row className="g-4">
        <Col lg={4}>
          <Card className="h-100 text-center border-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Card.Body className="py-5 text-white">
              <i className="fa-solid fa-headset mb-3" style={{ fontSize: '2.5rem' }}></i>
              <h5 className="mb-3">Live Chat Support</h5>
              <p className="mb-4 opacity-75">Get instant help from our support team</p>
              <Button variant="light" className="rounded-pill px-4" onClick={() => window.location.href = '/live-chat'}>
                <i className="fa-solid fa-comments me-2"></i>Start Chat
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="h-100 text-center border-0" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <Card.Body className="py-5 text-white">
              <i className="fa-solid fa-envelope mb-3" style={{ fontSize: '2.5rem' }}></i>
              <h5 className="mb-3">Email Support</h5>
              <p className="mb-4 opacity-75">Send us a detailed message</p>
              <Button variant="light" className="rounded-pill px-4" onClick={() => window.location.href = '/email-support'}>
                <i className="fa-solid fa-paper-plane me-2"></i>Send Email
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="h-100 text-center border-0" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <Card.Body className="py-5 text-white">
              <i className="fa-solid fa-phone mb-3" style={{ fontSize: '2.5rem' }}></i>
              <h5 className="mb-3">Phone Support</h5>
              <p className="mb-4 opacity-75">Call us during business hours</p>
              <Button variant="light" className="rounded-pill px-4" onClick={() => window.location.href = '/phone-support'}>
                <i className="fa-solid fa-phone-alt me-2"></i>Call Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default HelpSupport;