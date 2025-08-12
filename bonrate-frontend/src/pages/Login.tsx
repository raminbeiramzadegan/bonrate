import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface Errors {
  email?: string;
  password?: string;
  general?: string;
}

interface LoginResponse {
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

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const { login } = useAuth();

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
      
      if (name === 'email' && /\S+@\S+\.\S+/.test(newValue as string)) {
        delete newErrors.email;
      } else if (name === 'password' && (newValue as string).length >= 6) {
        delete newErrors.password;
      }
      
      setErrors(newErrors);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data: LoginResponse = await response.json();
      
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
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      setErrors({ general: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#F9FAFB', color: '#111827', minHeight: '100vh' }}>
      <div className="min-vh-100 d-flex">
        {/* Left Side - Branding & Info */}
        <div className="d-none d-lg-flex col-lg-6 p-5 text-white position-relative overflow-hidden" style={{ 
          background: 'linear-gradient(135deg, #1D4ED8 0%, #9333EA 100%)' 
        }}>
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'rgba(0,0,0,0.1)' }}></div>
          <div className="position-relative d-flex flex-column justify-content-center" style={{ maxWidth: '400px', zIndex: 10 }}>
            <div className="mb-5">
              <div className="d-flex align-items-center mb-4">
                <div className="bg-white rounded p-3 me-4 d-flex align-items-center justify-content-center text-primary" style={{ width: '48px', height: '48px' }}>
                  <i className="fas fa-star-half-stroke fs-4"></i>
                </div>
                <span className="fs-2 fw-bold">Bonrate Pro</span>
              </div>
              <h1 className="display-5 fw-bold mb-3">Welcome back!</h1>
              <p className="fs-5 mb-5" style={{ opacity: 0.9 }}>Continue growing your business reputation with our AI-powered review management platform.</p>
            </div>
            
            <div className="d-flex flex-column gap-4 mb-5">
              <div className="d-flex align-items-center">
                <div>
                  <h6 className="fw-semibold mb-1">
                    <i className="fas fa-chart-trending-up me-2"></i>
                    Real-time Dashboard
                  </h6>
                  <small style={{ opacity: 0.8 }}>Monitor your review campaigns and performance</small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <h6 className="fw-semibold mb-1">
                    <i className="fas fa-users me-2"></i>
                    Customer Management
                  </h6>
                  <small style={{ opacity: 0.8 }}>Organize contacts and track engagement</small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <h6 className="fw-semibold mb-1">
                    <i className="fas fa-magic-wand-sparkles me-2"></i>
                    Smart Automation
                  </h6>
                  <small style={{ opacity: 0.8 }}>Set and forget review collection workflows</small>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-top border-white border-opacity-20">
              <div className="bg-white bg-opacity-10 rounded p-3">
                <div className="d-flex align-items-center mb-2">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" className="rounded-circle me-3" style={{ width: '40px', height: '40px' }} alt="User" />
                  <div>
                    <div className="fw-medium small">Sarah Johnson</div>
                    <small style={{ opacity: 0.8 }}>Restaurant Owner</small>
                  </div>
                </div>
                <p className="small mb-0" style={{ opacity: 0.9 }}>"Bonrate Pro helped us increase our Google reviews by 300% in just 2 months!"</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Login Form */}
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4" style={{ background: 'white' }}>
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <div className="text-center mb-4">
              <div className="d-lg-none d-flex align-items-center justify-content-center mb-4">
                <div className="rounded p-2 me-3" style={{ background: '#1D4ED8', width: '40px', height: '40px' }}>
                  <i className="fas fa-star-half-stroke text-white"></i>
                </div>
                <span className="fs-4 fw-bold" style={{ color: '#1D4ED8' }}>Bonrate Pro</span>
              </div>
              <h2 className="fw-bold mb-2" style={{ fontSize: '1.875rem', color: '#111827' }}>Sign in to your account</h2>
              <p style={{ color: '#6B7280' }}>Access your review management dashboard</p>
            </div>
            
            {errors.general && (
              <div className="alert alert-danger py-2" style={{ fontSize: '0.875rem' }}>
                <i className="fas fa-exclamation-circle me-2"></i>
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-4" noValidate>
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
                <label className="form-label fw-medium mb-2" style={{ color: '#111827', fontSize: '0.875rem' }}>Password</label>
                <div className="position-relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control py-3 pe-5 ${errors.password ? 'is-invalid' : ''}`}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
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
                {errors.password && (
                  <div className="text-danger mt-1" style={{ fontSize: '0.75rem' }}>
                    <i className="fas fa-exclamation-circle me-1"></i>
                    {errors.password}
                  </div>
                )}
              </div>
              
              <div className="d-flex align-items-center justify-content-between">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    style={{ width: '16px', height: '16px' }}
                  />
                  <label className="form-check-label ms-2" style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    Remember me
                  </label>
                </div>
                <span style={{ fontSize: '0.875rem', color: '#1D4ED8', cursor: 'pointer' }}>Forgot password?</span>
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
                  <><i className="fas fa-spinner fa-spin me-2"></i>Signing In...</>
                ) : (
                  'Sign In'
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
                Don't have an account? 
                <Link to="/register" style={{ color: '#1D4ED8', fontWeight: '500', textDecoration: 'none' }}> Create account</Link>
              </p>
            </div>
            
            <div className="text-center mt-5">
              <div className="d-flex align-items-center justify-content-center gap-4" style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                <span className="d-flex align-items-center">
                  <i className="fas fa-shield-halved me-1" style={{ color: '#22C55E' }}></i>
                  SSL Secured
                </span>
                <span className="d-flex align-items-center">
                  <i className="fas fa-clock me-1" style={{ color: '#22C55E' }}></i>
                  24/7 Support
                </span>
                <span className="d-flex align-items-center">
                  <i className="fas fa-mobile-screen me-1" style={{ color: '#22C55E' }}></i>
                  Mobile Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;