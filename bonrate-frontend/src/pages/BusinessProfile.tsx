import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Button, Form, Badge, Spinner, Alert, Carousel } from 'react-bootstrap';
import Layout from '../components/Layout';
import axios from 'axios';
import '../styles/Campaign.css';
import '../styles/BusinessProfile.css';

interface BusinessData {
  name: string;
  type: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  website: string;
  facebook: string;
  instagram: string;
  googleBusiness: string;
  place_id?: string;
  rating?: number;
  user_ratings_total?: number;
  google_maps_url?: string;
  photos?: Array<{url: string; width: number; height: number}>;
  reviews?: Array<{author_name: string; rating: number; text: string; time: number; profile_photo_url: string}>;
  opening_hours?: {open_now: boolean; weekday_text: string[]};
}

interface PlaceSuggestion {
  place_id: string;
  description: string;
  name: string;
  address: string;
}

interface BusinessHours {
  enabled: boolean;
  open: string;
  close: string;
}

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

const BusinessProfile: React.FC = () => {
  const [businessData, setBusinessData] = useState<BusinessData>({
    name: '',
    type: 'Restaurant',
    phone: '',
    email: '',
    address: '',
    description: '',
    website: '',
    facebook: '',
    instagram: '',
    googleBusiness: ''
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [showReviews, setShowReviews] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const [businessHours, setBusinessHours] = useState<Record<DayOfWeek, BusinessHours>>({
    monday: { enabled: true, open: '09:00', close: '22:00' },
    tuesday: { enabled: true, open: '09:00', close: '22:00' },
    wednesday: { enabled: true, open: '09:00', close: '22:00' },
    thursday: { enabled: true, open: '09:00', close: '22:00' },
    friday: { enabled: true, open: '09:00', close: '23:00' },
    saturday: { enabled: true, open: '10:00', close: '23:00' },
    sunday: { enabled: false, open: '10:00', close: '21:00' }
  });

  const handleBusinessChange = (field: keyof BusinessData, value: string): void => {
    setBusinessData(prev => ({ ...prev, [field]: value }));
  };

  const handleHoursChange = (day: DayOfWeek, field: keyof BusinessHours, value: string | boolean): void => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  // Google Places search functionality
  const searchPlaces = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    console.log('🔍 Searching for:', query);
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      console.log('🔑 Token:', token ? 'Present' : 'Missing');
      
      const url = `http://localhost:8000/api/contacts/business/google-places/search/?query=${encodeURIComponent(query)}`;
      console.log('🌐 API URL:', url);
      
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(url, { headers });
      
      console.log('📊 API Response:', response.data);
      console.log('📋 Suggestions count:', response.data.results?.length || 0);
      
      const results = response.data.results || [];
      setSuggestions(results);
      
      if (results.length > 0) {
        console.log('✅ Setting showSuggestions to true');
        setShowSuggestions(true);
      } else {
        console.log('❌ No results found');
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('❌ Error searching places:', error);
      console.error('Error details:', error.response?.data);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setLoading(false);
    }
  };

  const selectPlace = async (place: PlaceSuggestion) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`http://localhost:8000/api/contacts/business/google-places/details/${place.place_id}/`, {
        headers
      });
      
      const placeData = response.data;
      setBusinessData(prev => ({
        ...prev,
        name: placeData.name || prev.name,
        address: placeData.address || prev.address,
        phone: placeData.phone || prev.phone,
        website: placeData.website || prev.website,
        googleBusiness: placeData.google_maps_url || prev.googleBusiness,
        place_id: placeData.place_id,
        rating: placeData.rating,
        user_ratings_total: placeData.user_ratings_total,
        google_maps_url: placeData.google_maps_url,
        photos: placeData.photos,
        reviews: placeData.reviews,
        opening_hours: placeData.opening_hours
      }));
      
      setSelectedPlace(place.place_id);
      setSearchQuery(place.name);
      setShowSuggestions(false);
    } catch (error) {
      console.error('Error fetching place details:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-warning"></i>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-muted"></i>);
    }
    
    return stars;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        searchPlaces(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Load saved business profile data on component mount
  useEffect(() => {
    const loadBusinessProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/business-profile/');
        const data = response.data;
        
        if (data.name) {
          setBusinessData({
            name: data.name || '',
            type: data.type || 'Restaurant',
            phone: data.phone || '',
            email: data.email || '',
            address: data.address || '',
            description: data.description || '',
            website: data.website || '',
            facebook: data.facebook || '',
            instagram: data.instagram || '',
            googleBusiness: data.googleBusiness || ''
          });
          
          if (data.business_hours) {
            setBusinessHours(data.business_hours);
          }
        }
      } catch (error) {
        console.log('No saved business profile found or error loading:', error);
      }
    };
    
    loadBusinessProfile();
  }, []);

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const saveBusinessProfile = async () => {
    // Validate that business name is filled
    if (!businessData.name.trim()) {
      setSaveMessage('Please search and select your business first.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    setSaving(true);
    try {
      let token = localStorage.getItem('access_token');
      
      // Try to refresh token if it's expired
      if (token) {
        try {
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
            const refreshResponse = await axios.post('http://localhost:8000/api/users/token/refresh/', {
              refresh: refreshToken
            });
            token = refreshResponse.data.access;
            localStorage.setItem('access_token', token);
          }
        } catch (refreshError) {
          console.log('Token refresh failed, using existing token');
        }
      }
      
      const response = await axios.post('http://localhost:8000/api/users/business-profile/', {
        name: businessData.name,
        type: businessData.type,
        phone: businessData.phone,
        email: businessData.email,
        address: businessData.address,
        description: businessData.description,
        website: businessData.website,
        facebook: businessData.facebook,
        instagram: businessData.instagram,
        googleBusiness: businessData.googleBusiness,
        business_hours: businessHours
      });
      
      setSaveMessage('Business profile saved successfully!');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error('Save error:', error);
      if (error.response?.status === 401) {
        setSaveMessage('Session expired. Please log in again.');
      } else {
        const errorMsg = error.response?.data?.message || error.response?.data?.error || 'Failed to save business profile. Please try again.';
        setSaveMessage(errorMsg);
      }
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const headerActions = (
    <Button variant="primary" size="sm" onClick={saveBusinessProfile} disabled={saving}>
      {saving ? (
        <>
          <Spinner animation="border" size="sm" className="me-1" />
          <span className="d-none d-sm-inline">Saving...</span>
        </>
      ) : (
        <>
          <i className="fa-solid fa-save me-1 d-none d-sm-inline"></i>
          <span className="d-none d-sm-inline">Save Changes</span>
          <i className="fa-solid fa-save d-sm-none"></i>
        </>
      )}
    </Button>
  );

  return (
    <Layout 
      title="Business Profile" 
      subtitle="Manage your business information and settings"
      headerActions={headerActions}
    >
      {showAlert && (
        <Alert variant={saveMessage.includes('successfully') ? 'success' : 'danger'} className="mb-4">
          <i className={`fas ${saveMessage.includes('successfully') ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2`}></i>
          {saveMessage}
        </Alert>
      )}
      {/* Google Places Search */}
      <Card className="google-search-card mb-4">
        <Card.Body className="p-0">
          <div className="google-search-header">
            <div className="d-flex align-items-center justify-content-center py-4">
              <div className="google-logo me-3">
                <i className="fab fa-google"></i>
              </div>
              <div>
                <h4 className="mb-1 text-white fw-bold">Find Your Business</h4>
                <p className="mb-0 text-white-50">Connect with Google My Business for enhanced features</p>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="search-container" style={{ position: 'relative', zIndex: 1 }}>
              <div className="search-input-wrapper">
                <i className="fas fa-search search-icon"></i>
                <Form.Control
                  ref={searchRef}
                  type="text"
                  placeholder="Search for your business (e.g., 'Pizza Palace New York')..."
                  value={searchQuery}
                  onChange={(e) => {
                    console.log('📝 Input changed:', e.target.value);
                    setSearchQuery(e.target.value);
                  }}
                  onFocus={() => {
                    console.log('🔍 Input focused, suggestions:', suggestions.length);
                    if (suggestions.length > 0) setShowSuggestions(true);
                  }}
                  className="search-input"
                />
                {loading && (
                  <div className="search-spinner">
                    <Spinner animation="border" size="sm" className="text-primary" />
                  </div>
                )}
              </div>
            

              
            </div>
            
            {showSuggestions && suggestions.length > 0 && (
              <div 
                ref={suggestionsRef}
                className="mt-2"
                style={{
                  position: 'relative',
                  zIndex: 1000,
                  maxHeight: '250px',
                  overflowY: 'auto',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  background: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                {suggestions.map((place, index) => (
                  <div
                    key={place.place_id}
                    className="p-3 border-bottom"
                    style={{
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onClick={() => {
                      console.log('👆 Clicked place:', place.name);
                      selectPlace(place);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <i className="fas fa-building text-primary"></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-bold">{place.name}</div>
                        <div className="text-muted small">
                          <i className="fas fa-map-marker-alt me-1"></i>
                          {place.address}
                        </div>
                      </div>
                      <div>
                        <i className="fas fa-chevron-right text-muted"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!selectedPlace && (
              <div className="search-tips mt-4">
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="tip-card text-center p-3">
                      <i className="fas fa-lightbulb text-warning mb-2"></i>
                      <div className="small fw-medium">Pro Tip</div>
                      <div className="small text-muted">Include your city for better results</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="tip-card text-center p-3">
                      <i className="fas fa-shield-alt text-success mb-2"></i>
                      <div className="small fw-medium">Verified</div>
                      <div className="small text-muted">Get Google verified badge</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="tip-card text-center p-3">
                      <i className="fas fa-sync text-info mb-2"></i>
                      <div className="small fw-medium">Auto-Fill</div>
                      <div className="small text-muted">Business info filled automatically</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Business Photos Slideshow */}
      {businessData.photos && businessData.photos.length > 0 && (
        <Card className="mb-4">
          <Card.Header className="bg-white">
            <h5 className="mb-0">
              <i className="fas fa-images me-2"></i>
              Business Photos
            </h5>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="photo-slideshow">
              <Carousel>
                {businessData.photos.map((photo, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={photo.url}
                      alt={`Business photo ${index + 1}`}
                      style={{ height: '400px', objectFit: 'cover' }}
                    />
                    <Carousel.Caption className="bg-dark bg-opacity-50 rounded">
                      <p>Photo {index + 1} of {businessData.photos.length}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Business Rating & Reviews */}
      {businessData.rating && (
        <Card className="mb-4">
          <Card.Header className="bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="fas fa-star me-2 text-warning"></i>
                Customer Reviews
              </h5>
              {businessData.google_maps_url && (
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => window.open(businessData.google_maps_url, '_blank')}
                >
                  <i className="fab fa-google me-1"></i>
                  View on Google
                </Button>
              )}
            </div>
          </Card.Header>
          <Card.Body>
            <div className="rating-section d-flex align-items-center mb-4 p-4">
              <div className="me-4 text-center">
                <div className="rating-display">{businessData.rating?.toFixed(1)}</div>
                <div className="rating-stars mb-2">{renderStars(businessData.rating)}</div>
                <Badge className="open-status">
                  <i className="fas fa-trophy me-1"></i>
                  Top Rated
                </Badge>
              </div>
              <div className="flex-grow-1">
                <div className="h5 mb-2 text-primary fw-bold">Customer Rating</div>
                <div className="text-muted mb-2">
                  <i className="fas fa-users me-2"></i>
                  Based on <strong>{businessData.user_ratings_total?.toLocaleString()}</strong> reviews
                </div>
              </div>
            </div>
            
            {businessData.reviews && businessData.reviews.length > 0 && (
              <div>
                {showReviews && (
                  <div 
                    className="reviews-container"
                    style={{ 
                      maxHeight: '500px', 
                      overflowY: 'auto',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      padding: '1rem'
                    }}
                  >
                    {businessData.reviews.map((review, index) => (
                      <div key={index} className="review-card p-3 mb-3 rounded">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div className="fw-bold text-primary">{review.author_name}</div>
                          <div className="rating-stars">{renderStars(review.rating)}</div>
                        </div>
                        <div className="text-muted small mb-2">
                          <i className="fas fa-calendar-alt me-1"></i>
                          {new Date(review.time * 1000).toLocaleDateString()}
                        </div>
                        <p className="mb-0">{review.text}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="text-center mt-3">
                  <Button 
                    variant="outline-primary" 
                    onClick={() => setShowReviews(!showReviews)}
                    className="reviews-toggle-btn"
                  >
                    <i className={`fas ${showReviews ? 'fa-chevron-up' : 'fa-chevron-down'} me-2`}></i>
                    {showReviews ? 'Hide Reviews' : `View All Reviews (${businessData.reviews.length} total)`}
                  </Button>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      )}

      {/* Business Information */}
      <Card className="business-info-card mb-4">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="business-icon-wrapper me-3">
                <i className="fas fa-building"></i>
              </div>
              <div>
                <h5 className="mb-0">Business Information</h5>
                <small className="text-muted">Manage your business details and contact information</small>
              </div>
            </div>
            {selectedPlace && (
              <Badge className="google-verified-badge">
                <i className="fab fa-google me-1"></i>
                Google Verified
              </Badge>
            )}
          </div>
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="g-4">
            <Col md={6}>
              <div className="form-group-enhanced">
                <Form.Label className="form-label-enhanced">
                  <i className="fas fa-store me-2 text-primary"></i>
                  Business Name
                </Form.Label>
                <Form.Control
                  type="text"
                  value={businessData.name}
                  onChange={(e) => handleBusinessChange('name', e.target.value)}
                  className="form-control-enhanced"
                  placeholder="Enter your business name"
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group-enhanced">
                <Form.Label className="form-label-enhanced">
                  <i className="fas fa-tags me-2 text-success"></i>
                  Business Type
                </Form.Label>
                <Form.Select
                  value={businessData.type}
                  onChange={(e) => handleBusinessChange('type', e.target.value)}
                  className="form-control-enhanced"
                >
                  <option>Restaurant</option>
                  <option>Retail</option>
                  <option>Service</option>
                  <option>Healthcare</option>
                  <option>Technology</option>
                  <option>Consulting</option>
                </Form.Select>
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group-enhanced">
                <Form.Label className="form-label-enhanced">
                  <i className="fas fa-phone me-2 text-info"></i>
                  Phone Number
                </Form.Label>
                <Form.Control
                  type="tel"
                  value={businessData.phone}
                  onChange={(e) => handleBusinessChange('phone', e.target.value)}
                  className="form-control-enhanced"
                  placeholder="(555) 123-4567"
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group-enhanced">
                <Form.Label className="form-label-enhanced">
                  <i className="fas fa-envelope me-2 text-warning"></i>
                  Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  value={businessData.email}
                  onChange={(e) => handleBusinessChange('email', e.target.value)}
                  className="form-control-enhanced"
                  placeholder="contact@yourbusiness.com"
                />
              </div>
            </Col>
            <Col xs={12}>
              <div className="form-group-enhanced">
                <Form.Label className="form-label-enhanced">
                  <i className="fas fa-map-marker-alt me-2 text-danger"></i>
                  Business Address
                </Form.Label>
                <Form.Control
                  type="text"
                  value={businessData.address}
                  onChange={(e) => handleBusinessChange('address', e.target.value)}
                  className="form-control-enhanced"
                  placeholder="123 Main Street, City, State 12345"
                />
              </div>
            </Col>
            <Col xs={12}>
              <div className="form-group-enhanced">
                <Form.Label className="form-label-enhanced">
                  <i className="fas fa-align-left me-2 text-secondary"></i>
                  Business Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={businessData.description}
                  onChange={(e) => handleBusinessChange('description', e.target.value)}
                  className="form-control-enhanced"
                  placeholder="Tell customers about your business, services, and what makes you unique..."
                />
                <div className="character-count mt-1">
                  <small className="text-muted">{businessData.description.length}/500 characters</small>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Business Hours */}
      <Card className="business-hours-card mb-4">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="hours-icon-wrapper me-3">
                <i className="fas fa-clock"></i>
              </div>
              <div>
                <h5 className="mb-0">Business Hours</h5>
                <small className="text-muted">Set your operating hours and availability</small>
              </div>
            </div>
            {businessData.opening_hours && (
              <Badge className={`status-badge ${businessData.opening_hours.open_now ? 'open' : 'closed'}`}>
                <i className={`fas ${businessData.opening_hours.open_now ? 'fa-unlock' : 'fa-lock'} me-1`}></i>
                {businessData.opening_hours.open_now ? 'Open Now' : 'Closed'}
              </Badge>
            )}
          </div>
        </Card.Header>
        <Card.Body className="p-4">
          {businessData.opening_hours?.weekday_text ? (
            <div className="google-hours-section mb-4">
              <div className="d-flex align-items-center mb-3">
                <i className="fab fa-google me-2 text-primary"></i>
                <h6 className="mb-0">Google Business Hours</h6>
              </div>
              <div className="google-hours-list">
                {businessData.opening_hours.weekday_text.map((dayText, index) => (
                  <div key={index} className="google-hour-item">
                    <span className="fw-medium">{dayText}</span>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="d-flex align-items-center mb-3">
                <i className="fas fa-edit me-2 text-warning"></i>
                <h6 className="mb-0">Custom Hours Override</h6>
              </div>
            </div>
          ) : null}
          
          <div className="hours-grid">
            {Object.entries(businessHours).map(([day, hours]) => (
              <div key={day} className="hour-row">
                <div className="day-section">
                  <Form.Check
                    type="switch"
                    checked={hours.enabled}
                    onChange={(e) => handleHoursChange(day as DayOfWeek, 'enabled', e.target.checked)}
                    className="day-toggle"
                  />
                  <span className="day-name">{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                </div>
                <div className="time-section">
                  {hours.enabled ? (
                    <div className="time-inputs">
                      <Form.Control
                        type="time"
                        value={hours.open}
                        onChange={(e) => handleHoursChange(day as DayOfWeek, 'open', e.target.value)}
                        className="time-input"
                      />
                      <span className="time-separator">to</span>
                      <Form.Control
                        type="time"
                        value={hours.close}
                        onChange={(e) => handleHoursChange(day as DayOfWeek, 'close', e.target.value)}
                        className="time-input"
                      />
                    </div>
                  ) : (
                    <span className="closed-text">Closed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Social Media */}
      <Card className="social-media-card mb-4">
        <Card.Header>
          <div className="d-flex align-items-center">
            <div className="social-icon-wrapper me-3">
              <i className="fas fa-share-alt"></i>
            </div>
            <div>
              <h5 className="mb-0">Social Media & Online Presence</h5>
              <small className="text-muted">Connect your social accounts and online profiles</small>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="g-4">
            <Col md={6}>
              <div className="social-input-group">
                <Form.Label className="social-label">
                  <div className="social-platform-icon website">
                    <i className="fas fa-globe"></i>
                  </div>
                  Website URL
                </Form.Label>
                <Form.Control
                  type="url"
                  value={businessData.website}
                  onChange={(e) => handleBusinessChange('website', e.target.value)}
                  className="social-input"
                  placeholder="https://www.yourbusiness.com"
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="social-input-group">
                <Form.Label className="social-label">
                  <div className="social-platform-icon facebook">
                    <i className="fab fa-facebook-f"></i>
                  </div>
                  Facebook Page
                </Form.Label>
                <Form.Control
                  type="url"
                  value={businessData.facebook}
                  onChange={(e) => handleBusinessChange('facebook', e.target.value)}
                  className="social-input"
                  placeholder="https://facebook.com/yourbusiness"
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="social-input-group">
                <Form.Label className="social-label">
                  <div className="social-platform-icon instagram">
                    <i className="fab fa-instagram"></i>
                  </div>
                  Instagram
                </Form.Label>
                <Form.Control
                  type="url"
                  value={businessData.instagram}
                  onChange={(e) => handleBusinessChange('instagram', e.target.value)}
                  className="social-input"
                  placeholder="https://instagram.com/yourbusiness"
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="social-input-group">
                <Form.Label className="social-label">
                  <div className="social-platform-icon google">
                    <i className="fab fa-google"></i>
                  </div>
                  Google My Business
                </Form.Label>
                <Form.Control
                  type="url"
                  value={businessData.googleBusiness}
                  onChange={(e) => handleBusinessChange('googleBusiness', e.target.value)}
                  className="social-input"
                  placeholder="Google Business Profile URL"
                />
              </div>
            </Col>
          </Row>
          
          <div className="social-preview mt-4">
            <h6 className="mb-3">
              <i className="fas fa-eye me-2"></i>
              Social Links Preview
            </h6>
            <div className="social-links-preview">
              {businessData.website && (
                <a href={businessData.website} target="_blank" rel="noopener noreferrer" className="social-link-preview website">
                  <i className="fas fa-globe"></i>
                  <span>Website</span>
                </a>
              )}
              {businessData.facebook && (
                <a href={businessData.facebook} target="_blank" rel="noopener noreferrer" className="social-link-preview facebook">
                  <i className="fab fa-facebook-f"></i>
                  <span>Facebook</span>
                </a>
              )}
              {businessData.instagram && (
                <a href={businessData.instagram} target="_blank" rel="noopener noreferrer" className="social-link-preview instagram">
                  <i className="fab fa-instagram"></i>
                  <span>Instagram</span>
                </a>
              )}
              {businessData.googleBusiness && (
                <a href={businessData.googleBusiness} target="_blank" rel="noopener noreferrer" className="social-link-preview google">
                  <i className="fab fa-google"></i>
                  <span>Google</span>
                </a>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Review Settings */}
      <Card>
        <Card.Header className="bg-white">
          <h5 className="mb-0">
            <i className="fas fa-cog me-2"></i>
            Review Collection Settings
          </h5>
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="mb-1">Auto-send review requests</h6>
              <p className="text-muted small mb-0">Automatically send review requests after customer interactions</p>
            </div>
            <Form.Check type="switch" defaultChecked />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="mb-1">Follow-up reminders</h6>
              <p className="text-muted small mb-0">Send reminder messages to customers who haven't left reviews</p>
            </div>
            <Form.Check type="switch" defaultChecked />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">Review response notifications</h6>
              <p className="text-muted small mb-0">Get notified when customers leave new reviews</p>
            </div>
            <Form.Check type="switch" defaultChecked />
          </div>
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default BusinessProfile;