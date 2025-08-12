import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface FormData {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  businessName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  general?: string;
}

interface RegisterResponse {
  tokens: {
    access: string;
    refresh: string;
  };
  user: {
    email: string;
    first_name: string;
    last_name: string;
    business_name: string;
  };
  error?: string;
}

interface GoogleCredentialResponse {
  credential: string;
}

interface DecodedGoogleToken {
  email?: string;
  given_name?: string;
  family_name?: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    businessName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [animatedElements, setAnimatedElements] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const { login } = useAuth();

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setAnimatedElements(prev => [...prev, 'header']), 300),
      setTimeout(() => setAnimatedElements(prev => [...prev, 'feature1']), 800),
      setTimeout(() => setAnimatedElements(prev => [...prev, 'feature2']), 1300),
      setTimeout(() => setAnimatedElements(prev => [...prev, 'feature3']), 1800),
      setTimeout(() => setAnimatedElements(prev => [...prev, 'testimonial']), 2300)
    ];
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear specific field error when user starts typing correct data
    if (errors[name as keyof Errors]) {
      const newErrors = { ...errors };
      
      // Validate the specific field in real-time
      if (name === 'firstName' && (newValue as string).trim()) {
        delete newErrors.firstName;
      } else if (name === 'lastName' && (newValue as string).trim()) {
        delete newErrors.lastName;
      } else if (name === 'businessName' && (newValue as string).trim()) {
        delete newErrors.businessName;
      } else if (name === 'email' && /\S+@\S+\.\S+/.test(newValue as string)) {
        delete newErrors.email;
      } else if (name === 'phone' && (newValue as string).trim()) {
        delete newErrors.phone;
      } else if (name === 'password') {
        const passwordValue = newValue as string;
        if (passwordValue.length >= 8 && 
            /(?=.*[a-z])/.test(passwordValue) && 
            /(?=.*[A-Z])/.test(passwordValue) && 
            /(?=.*\d)/.test(passwordValue) && 
            /(?=.*[!@#$%^&*(),.?":{}|<>])/.test(passwordValue) &&
            (!formData.firstName || !passwordValue.toLowerCase().includes(formData.firstName.toLowerCase())) &&
            (!formData.lastName || !passwordValue.toLowerCase().includes(formData.lastName.toLowerCase()))) {
          delete newErrors.password;
        }
      } else if (name === 'confirmPassword' && newValue === formData.password) {
        delete newErrors.confirmPassword;
      } else if (name === 'agreeToTerms' && checked) {
        delete newErrors.agreeToTerms;
      }
      
      setErrors(newErrors);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = 'Password must contain lowercase letters';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase letters';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain numbers';
    } else if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(formData.password)) {
      newErrors.password = 'Password must contain special characters';
    } else if (formData.firstName && formData.password.toLowerCase().includes(formData.firstName.toLowerCase())) {
      newErrors.password = 'Password cannot contain your first name';
    } else if (formData.lastName && formData.password.toLowerCase().includes(formData.lastName.toLowerCase())) {
      newErrors.password = 'Password cannot contain your last name';
    }
    
    // Also check confirm password when password changes
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await fetch('http://146.190.249.229/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
          first_name: formData.firstName,
          last_name: formData.lastName,
          business_name: formData.businessName,
          phone: formData.phone
        })
      });
      
      const data: RegisterResponse = await response.json();
      
      if (response.ok) {
        const tokenData = {
          access_token: data.tokens.access,
          refresh_token: data.tokens.refresh
        };
        const userData = {
          email: data.user.email,
          name: `${data.user.first_name} ${data.user.last_name}`,
          businessName: data.user.business_name
        };
        
        login(tokenData, userData);
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('email')) {
        setErrors({ email: 'This email is already registered' });
      } else {
        setErrors({ general: errorMessage || 'Registration failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = (credentialResponse: GoogleCredentialResponse) => {
    const decoded = jwtDecode<DecodedGoogleToken>(credentialResponse.credential);
    setFormData(prev => ({
      ...prev,
      email: decoded.email || '',
      firstName: decoded.given_name || '',
      lastName: decoded.family_name || ''
    }));
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#F9FAFB', color: '#111827', minHeight: '100vh' }}>
    <div className="min-vh-100 d-flex">
      {/* Left Side - Branding & Info */}
      <div className="d-none d-lg-flex col-lg-6 p-5 text-white position-relative overflow-hidden" style={{ 
        background: 'linear-gradient(135deg, #1D4ED8 0%, #9333EA 100%)' 
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'rgba(0,0,0,0.1)' }}></div>
        
        {/* Floating Review Stars */}
        <div className="position-absolute" style={{ 
          top: '10%', 
          right: '10%', 
          animation: 'floatStar 4s ease-in-out infinite',
          opacity: 0.7
        }}>
          <i className="fas fa-star text-warning" style={{ fontSize: '20px' }}></i>
        </div>
        <div className="position-absolute" style={{ 
          top: '20%', 
          right: '25%', 
          animation: 'floatStar 5s ease-in-out infinite 1s',
          opacity: 0.6
        }}>
          <i className="fas fa-star text-warning" style={{ fontSize: '16px' }}></i>
        </div>
        
        {/* Growth Arrow */}
        <div className="position-absolute" style={{ 
          bottom: '15%', 
          right: '20%', 
          animation: 'growthPulse 3s ease-in-out infinite',
          opacity: 0.4
        }}>
          <i className="fas fa-arrow-trend-up text-white" style={{ fontSize: '24px' }}></i>
        </div>
        <div className="position-relative d-flex flex-column justify-content-center" style={{ maxWidth: '400px', zIndex: 10 }}>
          <div className="mb-5" style={{
            opacity: animatedElements.includes('header') ? 1 : 0,
            transform: animatedElements.includes('header') ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out'
          }}>
            <div className="d-flex align-items-center mb-4">
              <div className="bg-white rounded p-3 me-4 d-flex align-items-center justify-content-center text-primary" style={{ 
                width: '48px', 
                height: '48px',
                animation: animatedElements.includes('header') ? 'iconPulse 2s ease-in-out infinite' : 'none'
              }}>
                <i className="fas fa-star-half-stroke fs-4"></i>
              </div>
              <span className="fs-2 fw-bold">Bonrate Pro</span>
            </div>
            <h1 className="display-5 fw-bold mb-3">Join thousands of businesses</h1>
            <p className="fs-5 mb-5" style={{ opacity: 0.9 }}>Collect more reviews, boost your online reputation, and grow your business with AI-powered automation.</p>
          </div>
          
          <div className="d-flex flex-column gap-4 mb-5">
            <div className="d-flex align-items-center">
              <div>
                <h6 className="fw-semibold mb-1">
                  <i className="fas fa-envelope me-2"></i>
                  Automated Review Requests
                </h6>
                <small style={{ opacity: 0.8 }}>Send SMS, email & WhatsApp messages automatically</small>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div>
                <h6 className="fw-semibold mb-1">
                  <i className="fas fa-chart-bar me-2"></i>
                  Performance Analytics
                </h6>
                <small style={{ opacity: 0.8 }}>Track campaign success and reputation growth</small>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div>
                <h6 className="fw-semibold mb-1">
                  <i className="fas fa-brain me-2"></i>
                  AI-Powered Messages
                </h6>
                <small style={{ opacity: 0.8 }}>Smart templates and timing optimization</small>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-top border-white border-opacity-20" style={{
            opacity: animatedElements.includes('testimonial') ? 1 : 0,
            transform: animatedElements.includes('testimonial') ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out 0.8s'
          }}>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" className="rounded-circle border border-white border-2" style={{ 
                  width: '32px', 
                  height: '32px', 
                  marginLeft: '-8px',
                  animation: animatedElements.includes('testimonial') ? 'avatarBounce 2s ease-in-out infinite' : 'none'
                }} alt="User" />
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="rounded-circle border border-white border-2" style={{ 
                  width: '32px', 
                  height: '32px', 
                  marginLeft: '-8px',
                  animation: animatedElements.includes('testimonial') ? 'avatarBounce 2s ease-in-out infinite 0.3s' : 'none'
                }} alt="User" />
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="rounded-circle border border-white border-2" style={{ 
                  width: '32px', 
                  height: '32px', 
                  marginLeft: '-8px',
                  animation: animatedElements.includes('testimonial') ? 'avatarBounce 2s ease-in-out infinite 0.6s' : 'none'
                }} alt="User" />
              </div>
              <div>
                <div className="fw-medium small">Join 2,500+ businesses</div>
                <div className="d-flex align-items-center">
                  <div className="d-flex text-warning me-2">
                    {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star" style={{ 
                      fontSize: '10px',
                      animation: animatedElements.includes('testimonial') ? `starTwinkle 1.5s ease-in-out infinite ${i * 0.2}s` : 'none'
                    }}></i>)}
                  </div>
                  <small style={{ opacity: 0.8 }}>4.9/5 rating</small>
                </div>
              </div>
            </div>
          </div>
          
          <style jsx>{`
            @keyframes floatStar {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-15px) rotate(180deg); }
            }
            @keyframes growthPulse {
              0%, 100% { transform: scale(1); opacity: 0.4; }
              50% { transform: scale(1.2); opacity: 0.8; }
            }
            @keyframes iconPulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
            @keyframes avatarBounce {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
            @keyframes starTwinkle {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.7; transform: scale(1.2); }
            }
          `}</style>
        </div>
      </div>
      

      {/* Right Side - Registration Form */}
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4" style={{ background: 'white' }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <div className="text-center mb-4">
            <div className="d-lg-none d-flex align-items-center justify-content-center mb-4">
              <div className="rounded p-2 me-3" style={{ background: '#1D4ED8', width: '40px', height: '40px' }}>
                <i className="fas fa-star-half-stroke text-white"></i>
              </div>
              <span className="fs-4 fw-bold" style={{ color: '#1D4ED8' }}>Bonrate Pro</span>
            </div>
            <h2 className="fw-bold mb-2" style={{ fontSize: '1.875rem', color: '#111827' }}>Create your account</h2>
            <p style={{ color: '#6B7280' }}>Start collecting more reviews today</p>
          </div>
          
          {errors.general && (
            <div className="alert alert-danger py-2" style={{ fontSize: '0.875rem' }}>
              <i className="fas fa-exclamation-circle me-2"></i>
              {errors.general}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-4" noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-medium mb-2" style={{ color: '#111827', fontSize: '0.875rem' }}>First Name</label>
                <input
                  type="text"
                  className={`form-control py-3 ${errors.firstName ? 'is-invalid' : ''}`}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  style={{
                    border: errors.firstName ? '1px solid #DC2626' : '1px solid #D1D5DB',
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                />
                {errors.firstName && (
                  <div className="text-danger mt-1" style={{ fontSize: '0.75rem' }}>
                    <i className="fas fa-exclamation-circle me-1"></i>
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-medium mb-2" style={{ color: '#111827', fontSize: '0.875rem' }}>Last Name</label>
                <input
                  type="text"
                  className={`form-control py-3 ${errors.lastName ? 'is-invalid' : ''}`}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Smith"
                  style={{
                    border: errors.lastName ? '1px solid #DC2626' : '1px solid #D1D5DB',
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                />
                {errors.lastName && (
                  <div className="text-danger mt-1" style={{ fontSize: '0.75rem' }}>
                    <i className="fas fa-exclamation-circle me-1"></i>
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="form-label fw-medium mb-2" style={{ color: '#111827', fontSize: '0.875rem' }}>Business Name</label>
              <input
                type="text"
                className={`form-control py-3 ${errors.businessName ? 'is-invalid' : ''}`}
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="Your Business Name"
                style={{
                  border: errors.businessName ? '1px solid #DC2626' : '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  fontSize: '1rem'
                }}
              />
              {errors.businessName && (
                <div className="text-danger mt-1" style={{ fontSize: '0.75rem' }}>
                  <i className="fas fa-exclamation-circle me-1"></i>
                  {errors.businessName}
                </div>
              )}
            </div>
            
            <div>
              <label className="form-label fw-medium mb-2" style={{ color: '#111827', fontSize: '0.875rem' }}>Email Address</label>
              <input
                type="text"
                className={`form-control py-3 ${errors.email ? 'is-invalid' : ''}`}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                style={{
                  border: errors.email ? '1px solid #DC2626' : '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  fontSize: '1rem'
                }}
              />
              {errors.email && (
                <div className="text-danger mt-1" style={{ fontSize: '0.75rem' }}>
                  <i className="fas fa-exclamation-circle me-1"></i>
                  {errors.email}
                </div>
              )}
            </div>
            
            <div>
              <label className="form-label fw-medium mb-2" style={{ color: '#111827', fontSize: '0.875rem' }}>Phone Number</label>
              <input
                type="text"
                className={`form-control py-3 ${errors.phone ? 'is-invalid' : ''}`}
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                style={{
                  border: errors.phone ? '1px solid #DC2626' : '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  fontSize: '1rem'
                }}
              />
              {errors.phone && (
                <div className="text-danger mt-1" style={{ fontSize: '0.75rem' }}>
                  <i className="fas fa-exclamation-circle me-1"></i>
                  {errors.phone}
                </div>
              )}
            </div>
            
            <div>
              <label className="form-label fw-medium mb-2" style={{ color: '#111827', fontSize: '0.875rem' }}>Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control py-3 pe-5 ${errors.password ? 'is-invalid' : ''}`}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                  style={{
                    border: errors.password ? '1px solid #DC2626' : '1px solid #D1D5DB',
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                />
                <button
                  type="button"
                  className="btn position-absolute end-0 top-50 translate-middle-y pe-3 border-0"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'transparent', color: '#6B7280' }}
                >
                  <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                </button>
              </div>
              {errors.password ? (
                <div className="text-danger mt-1" style={{ fontSize: '0.75rem' }}>
                  <i className="fas fa-exclamation-circle me-1"></i>
                  {errors.password}
                </div>
              ) : (
                <p className="mt-1" style={{ fontSize: '0.75rem', color: '#6B7280' }}>Must be at least 8 characters with uppercase, lowercase, numbers and special characters</p>
              )}
            </div>
            
            <div>
              <label className="form-label fw-medium mb-2" style={{ color: '#111827', fontSize: '0.875rem' }}>Confirm Password</label>
              <div className="position-relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`form-control py-3 pe-5 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  style={{
                    border: errors.confirmPassword ? '1px solid #DC2626' : '1px solid #D1D5DB',
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                />
                <button
                  type="button"
                  className="btn position-absolute end-0 top-50 translate-middle-y pe-3 border-0"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ background: 'transparent', color: '#6B7280' }}
                >
                  <i className={`fas fa-${showConfirmPassword ? 'eye-slash' : 'eye'}`}></i>
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="text-danger mt-1" style={{ fontSize: '0.75rem' }}>
                  <i className="fas fa-exclamation-circle me-1"></i>
                  {errors.confirmPassword}
                </div>
              )}
            </div>
            
            <div className="d-flex align-items-start">
              <input
                type="checkbox"
                className="me-3 mt-1"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                style={{ width: '16px', height: '16px' }}
              />
              <div>
                <label style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  I agree to the <span style={{ color: '#1D4ED8', cursor: 'pointer' }}>Terms of Service</span> and <span style={{ color: '#1D4ED8', cursor: 'pointer' }}>Privacy Policy</span>
                </label>
                {errors.agreeToTerms && (
                  <div className="text-danger mt-1" style={{ fontSize: '0.75rem' }}>
                    <i className="fas fa-exclamation-circle me-1"></i>
                    {errors.agreeToTerms}
                  </div>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              className="btn w-100 py-3 fw-medium text-white border-0"
              disabled={isLoading}
              style={{
                background: '#1D4ED8',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            >
              {isLoading ? (
                <><i className="fas fa-spinner fa-spin me-2"></i>Creating Account...</>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <div className="mt-4">
            <div className="position-relative">
              <hr style={{ borderColor: '#D1D5DB' }} />
              <span className="position-absolute top-50 start-50 translate-middle px-2" style={{ 
                background: '#F9FAFB', 
                color: '#6B7280',
                fontSize: '0.875rem'
              }}>Or continue with</span>
            </div>
            
            <div className="row g-3 mt-4">
              <div className="col">
                <button className="btn w-100 py-3 d-flex align-items-center justify-content-center border" style={{
                  borderColor: '#D1D5DB',
                  background: 'white',
                  color: '#6B7280',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  <i className="fab fa-google text-danger me-2"></i>
                  Google
                </button>
              </div>
              <div className="col">
                <button className="btn w-100 py-3 d-flex align-items-center justify-content-center border" style={{
                  borderColor: '#D1D5DB',
                  background: 'white',
                  color: '#6B7280',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  <i className="fab fa-microsoft text-primary me-2"></i>
                  Microsoft
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
              Already have an account? 
              <Link to="/login" style={{ color: '#1D4ED8', fontWeight: '500', textDecoration: 'none' }}> Sign in here</Link>
            </p>
          </div>
          
          <div className="text-center mt-5">
            <div className="d-flex align-items-center justify-content-center gap-4" style={{ fontSize: '0.75rem', color: '#6B7280' }}>
              <span className="d-flex align-items-center">
                <i className="fas fa-shield-halved me-1" style={{ color: '#22C55E' }}></i>
                SSL Secured
              </span>
              <span className="d-flex align-items-center">
                <i className="fas fa-lock me-1" style={{ color: '#22C55E' }}></i>
                GDPR Compliant
              </span>
              <span className="d-flex align-items-center">
                <i className="fas fa-clock me-1" style={{ color: '#22C55E' }}></i>
                Setup in less than a min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;