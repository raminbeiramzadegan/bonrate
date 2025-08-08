import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Badge, Table, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/Campaign.css';

const Analytics = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('30');

  // Mock data
  const keyMetrics = {
    totalReviews: 1234,
    averageRating: 4.8,
    responseRate: 68,
    activeCampaigns: 12,
    reviewGrowth: 12.5,
    ratingChange: 0.2,
    responseGrowth: 5.2
  };

  const reviewTrendsData = [
    { month: 'Jan', reviews: 65, rating: 4.5 },
    { month: 'Feb', reviews: 89, rating: 4.6 },
    { month: 'Mar', reviews: 134, rating: 4.7 },
    { month: 'Apr', reviews: 156, rating: 4.8 },
    { month: 'May', reviews: 178, rating: 4.8 },
    { month: 'Jun', reviews: 195, rating: 4.9 },
    { month: 'Jul', reviews: 234, rating: 4.8 }
  ];

  const ratingDistribution = [
    { rating: '5 Stars', count: 767, percentage: 62.1 },
    { rating: '4 Stars', count: 345, percentage: 28.0 },
    { rating: '3 Stars', count: 87, percentage: 7.1 },
    { rating: '2 Stars', count: 23, percentage: 1.9 },
    { rating: '1 Star', count: 12, percentage: 0.9 }
  ];

  const campaignPerformance = [
    {
      id: 1,
      name: 'Holiday Special Follow-up',
      type: 'Email',
      status: 'Active',
      sent: 2450,
      responses: 1680,
      rate: 68.6,
      reviews: 245
    },
    {
      id: 2,
      name: 'New Customer Welcome',
      type: 'SMS',
      status: 'Active',
      sent: 1890,
      responses: 1322,
      rate: 70.0,
      reviews: 189
    },
    {
      id: 3,
      name: 'Service Reminder',
      type: 'Email',
      status: 'Paused',
      sent: 3200,
      responses: 1984,
      rate: 62.0,
      reviews: 298
    }
  ];

  const reviewSources = [
    { platform: 'Google Reviews', count: 785, percentage: 63.6, color: '#4285F4', icon: 'fa-brands fa-google' },
    { platform: 'Yelp', count: 234, percentage: 19.0, color: '#FF1A1A', icon: 'fa-brands fa-yelp' },
    { platform: 'Facebook', count: 156, percentage: 12.6, color: '#1877F2', icon: 'fa-brands fa-facebook' },
    { platform: 'Other', count: 59, percentage: 4.8, color: '#6B7280', icon: 'fa-solid fa-globe' }
  ];

  const COLORS = ['#22C55E', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

  const headerActions = (
    <>
      <Form.Select 
        value={dateRange} 
        onChange={(e) => setDateRange(e.target.value)}
        size="sm"
        style={{ width: 'auto' }}
      >
        <option value="7">Last 7 days</option>
        <option value="30">Last 30 days</option>
        <option value="90">Last 90 days</option>
        <option value="custom">Custom range</option>
      </Form.Select>
      <Button variant="primary" size="sm">
        <i className="fa-solid fa-download me-1 d-none d-sm-inline"></i>
        <span className="d-none d-sm-inline">Export Report</span>
        <i className="fa-solid fa-download d-sm-none"></i>
      </Button>
    </>
  );

  return (
    <Layout 
      title="Analytics Dashboard" 
      subtitle="Monitor your review campaigns and business performance"
      headerActions={headerActions}
    >
      {/* Analytics Overview */}
      <div className="platform-overview mb-4">
        <div className="overview-card">
          <div className="d-flex justify-content-between">
            <div className="flex-grow-1">
              <h2 className="fs-1 fw-bold mb-3">📊 Performance Analytics</h2>
              <p className="fs-5 mb-4 opacity-75">Track your review campaigns, customer engagement, and business growth with comprehensive analytics and insights.</p>
              <Row className="mt-4">
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-chart-line text-success"></i>
                      <span className="fw-semibold">Real-time Tracking</span>
                    </div>
                    <p className="small opacity-75">Monitor campaign performance and customer engagement in real-time</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-target text-warning"></i>
                      <span className="fw-semibold">Goal Tracking</span>
                    </div>
                    <p className="small opacity-75">Set and track review goals with automated progress monitoring</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="feature-card">
                    <div className="feature-title">
                      <i className="fa-solid fa-file-export text-primary"></i>
                      <span className="fw-semibold">Custom Reports</span>
                    </div>
                    <p className="small opacity-75">Generate detailed reports and export data for further analysis</p>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="d-none d-md-block ms-4">
              <div className="bg-white bg-opacity-25 rounded-circle p-4">
                <i className="fa-solid fa-chart-line fs-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="mb-4">
        <h2 className="fs-5 fw-semibold mb-3">📈 Key Performance Metrics</h2>
        <Row className="g-3">
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-star fs-2 text-primary"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Total Reviews</Card.Title>
                <h2 className="mb-0">{keyMetrics.totalReviews.toLocaleString()}</h2>
                <div className="mt-2">
                  <Badge bg="success" className="small">
                    <i className="fa-solid fa-arrow-up me-1"></i>
                    +{keyMetrics.reviewGrowth}% from last month
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-star-half-stroke fs-2 text-warning"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Average Rating</Card.Title>
                <h2 className="mb-0">{keyMetrics.averageRating}</h2>
                <div className="mt-2">
                  <Badge bg="success" className="small">
                    <i className="fa-solid fa-arrow-up me-1"></i>
                    +{keyMetrics.ratingChange} from last month
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-chart-line fs-2 text-success"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Response Rate</Card.Title>
                <h2 className="mb-0">{keyMetrics.responseRate}%</h2>
                <div className="mt-2">
                  <Badge bg="success" className="small">
                    <i className="fa-solid fa-arrow-up me-1"></i>
                    +{keyMetrics.responseGrowth}% from last month
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <i className="fa-solid fa-bullhorn fs-2 text-secondary"></i>
                </div>
                <Card.Title className="small text-muted mb-1">Active Campaigns</Card.Title>
                <h2 className="mb-0">{keyMetrics.activeCampaigns}</h2>
                <div className="mt-2">
                  <Badge bg="secondary" className="small">
                    <i className="fa-solid fa-minus me-1"></i>
                    No change
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Charts Section */}
      <div className="mb-4">
        <Row className="g-4">
          <Col lg={8}>
            <Card className="h-100">
              <Card.Header className="bg-white">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Review Trends</h5>
                  <Form.Select size="sm" style={{ width: 'auto' }}>
                    <option>Reviews</option>
                    <option>Rating</option>
                    <option>Both</option>
                  </Form.Select>
                </div>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={reviewTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="reviews" 
                      stroke="#1D4ED8" 
                      strokeWidth={3}
                      dot={{ fill: '#1D4ED8', strokeWidth: 2, r: 4 }}
                      name="Reviews"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="h-100">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Rating Distribution</h5>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ratingDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {ratingDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Campaign Performance Table */}
      <div className="mb-4">
        <Card>
          <Card.Header className="bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Campaign Performance</h5>
              <Button variant="link" className="p-0 text-primary">
                View All Campaigns
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            {/* Desktop Table */}
            <div className="d-none d-md-block">
              <Table responsive hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="border-0">Campaign</th>
                    <th className="border-0">Status</th>
                    <th className="border-0">Sent</th>
                    <th className="border-0">Responses</th>
                    <th className="border-0">Rate</th>
                    <th className="border-0">Reviews</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignPerformance.map((campaign) => (
                    <tr key={campaign.id}>
                      <td>
                        <div>
                          <div className="fw-semibold">{campaign.name}</div>
                          <div className="small text-muted">{campaign.type} Campaign</div>
                        </div>
                      </td>
                      <td>
                        <Badge bg={campaign.status === 'Active' ? 'success' : 'warning'} className="small">
                          {campaign.status}
                        </Badge>
                      </td>
                      <td>{campaign.sent.toLocaleString()}</td>
                      <td>{campaign.responses.toLocaleString()}</td>
                      <td>{campaign.rate}%</td>
                      <td>{campaign.reviews}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="d-md-none p-3">
              <Row className="g-3">
                {campaignPerformance.map((campaign) => (
                  <Col xs={12} key={campaign.id}>
                    <Card className="border">
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="mb-1 fw-semibold">{campaign.name}</h6>
                            <div className="small text-muted">{campaign.type} Campaign</div>
                          </div>
                          <Badge bg={campaign.status === 'Active' ? 'success' : 'warning'} className="small">
                            {campaign.status}
                          </Badge>
                        </div>
                        <Row className="g-2 small">
                          <Col xs={6}>
                            <div className="text-muted">Sent:</div>
                            <div className="fw-semibold">{campaign.sent.toLocaleString()}</div>
                          </Col>
                          <Col xs={6}>
                            <div className="text-muted">Responses:</div>
                            <div className="fw-semibold">{campaign.responses.toLocaleString()}</div>
                          </Col>
                          <Col xs={6}>
                            <div className="text-muted">Rate:</div>
                            <div className="fw-semibold">{campaign.rate}%</div>
                          </Col>
                          <Col xs={6}>
                            <div className="text-muted">Reviews:</div>
                            <div className="fw-semibold">{campaign.reviews}</div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Review Sources and Additional Analytics */}
      <Row className="g-4">
        <Col lg={6}>
          <Card className="h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Review Sources</h5>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                {reviewSources.map((source, index) => (
                  <div key={index} className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          backgroundColor: `${source.color}15`,
                          color: source.color 
                        }}
                      >
                        <i className={source.icon}></i>
                      </div>
                      <span className="fw-medium">{source.platform}</span>
                    </div>
                    <div className="text-end">
                      <div className="fw-semibold">{source.count}</div>
                      <div className="small text-muted">{source.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6}>
          <Card className="h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Monthly Goals</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-medium">Reviews Goal</span>
                  <span className="text-muted">234 / 300</span>
                </div>
                <div className="progress mb-1" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar bg-primary" 
                    style={{ width: '78%' }}
                  ></div>
                </div>
                <div className="small text-muted">78% complete</div>
              </div>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-medium">Rating Goal</span>
                  <span className="text-muted">4.8 / 4.5</span>
                </div>
                <div className="progress mb-1" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar bg-success" 
                    style={{ width: '100%' }}
                  ></div>
                </div>
                <div className="small text-success">Goal exceeded!</div>
              </div>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-medium">Response Rate Goal</span>
                  <span className="text-muted">68% / 70%</span>
                </div>
                <div className="progress mb-1" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar bg-warning" 
                    style={{ width: '97%' }}
                  ></div>
                </div>
                <div className="small text-muted">97% complete</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Analytics;