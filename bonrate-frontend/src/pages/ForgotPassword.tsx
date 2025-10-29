import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
  email: string;
}

interface Errors {
  email?: string;
  general?: string;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://146.190.249.229:8000';

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear email error when user starts typing correct data
    if (errors.email && /\S+@\S+\.\S+/.test(value)) {
      const newErrors = { ...errors };
      delete newErrors.email;
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
      const response = await fetch(`${API_BASE_URL}/api/forgot-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        })
      });
      
      if (response.ok) {
        setIsSuccess(true);
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send reset email');
      }
    } catch (error) {
      setErrors({ general: 'Failed to send reset email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
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
                <h1 className="display-5 fw-bold mb-3">Check your email!</h1>
                <p className="fs-5 mb-5" style={{ opacity: 0.9 }}>We've sent password reset instructions to your email address.</p>
              </div>
              
              <div className="d-flex flex-column gap-4 mb-5">
                <div className="d-flex align-items-center">
                  <div>
                    <h6 className="fw-semibold mb-1">
                      <i className="fas fa-envelope me-2"></i>
                      Email Sent
                    </h6>
                    <small style={{ opacity: 0.8 }}>Check your inbox and spam folder</small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <h6 className="fw-semibold mb-1">
                      <i className="fas fa-clock me-2"></i>
                      Valid for 24 Hours
                    </h6>
                    <small style={{ opacity: 0.8 }}>Reset link expires in 24 hours</small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <h6 className="fw-semibold mb-1">
                      <i className="fas fa-shield-check me-2"></i>
                      Secure Process
                    </h6>
                    <small style={{ opacity: 0.8 }}>Your account security is our priority</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Success Message */}
          <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4" style={{ background: 'white' }}>
            <div className="w-100 text-center" style={{ maxWidth: '400px' }}>
              <div className="d-lg-none d-flex align-items-center justify-content-center mb-4">
                <div className="rounded p-2 me-3" style={{ background: '#1D4ED8', width: '40px', height: '40px' }}>
                  <i className="fas fa-star-half-stroke text-white"></i>
                </div>
                <span className="fs-4 fw-bold" style={{ color: '#1D4ED8' }}>Bonrate Pro</span>
              </div>
              
              <div className="mb-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: '#22C55E' 
                }}>
                  <i className="fas fa-check text-white" style={{ fontSize: '2rem' }}></i>
                </div>
                <h2 className="fw-bold mb-2" style={{ fontSize: '1.875rem', color: '#111827' }}>Email sent successfully!</h2>
                <p style={{ color: '#6B7280' }}>We've sent password reset instructions to <strong>{formData.email}</strong></p>
              </div>
              
              <div className="alert alert-info py-3 mb-4" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1E40AF' }}>
                <i className="fas fa-info-circle me-2"></i>
                <strong>Didn't receive the email?</strong> Check your spam folder or wait a few minutes for delivery.
              </div>
              
              <div className="d-flex flex-column gap-3">
                <Link 
                  to="/login" 
                  className="btn w-100 py-3 fw-medium text-white border-0"
                  style={{
                    background: '#1D4ED8',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    textDecoration: 'none'
                  }}
                >
                  Back to Sign In
                </Link>
                
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({ email: '' });
                  }}
                  className="btn w-100 py-3 fw-medium border"
                  style={{
                    borderColor: '#D1D5DB',
                    background: 'white',
                    color: '#6B7280',
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                >
                  Try Different Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <h1 className="display-5 fw-bold mb-3">Forgot your password?</h1>
              <p className="fs-5 mb-5" style={{ opacity: 0.9 }}>No worries! Enter your email and we'll send you reset instructions.</p>
            </div>
            
            <div className="d-flex flex-column gap-4 mb-5">
              <div className="d-flex align-items-center">
                <div>
                  <h6 className="fw-semibold mb-1">
                    <i className="fas fa-envelope me-2"></i>
                    Email Reset Link
                  </h6>
                  <small style={{ opacity: 0.8 }}>Secure password reset via email</small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <h6 className="fw-semibold mb-1">
                    <i className="fas fa-clock me-2"></i>
                    Quick Process
                  </h6>
                  <small style={{ opacity: 0.8 }}>Reset your password in under 2 minutes</small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <h6 className="fw-semibold mb-1">
                    <i className="fas fa-shield-check me-2"></i>
                    Secure & Safe
                  </h6>
                  <small style={{ opacity: 0.8 }}>Your account data remains protected</small>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-top border-white border-opacity-20">
              <div className="bg-white bg-opacity-10 rounded p-3">
                <div className="d-flex align-items-center mb-2">
                  <div className="rounded-circle bg-white bg-opacity-20 d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                    <i className="fas fa-question text-white"></i>
                  </div>
                  <div>
                    <div className="fw-medium small">Need Help?</div>
                    <small style={{ opacity: 0.8 }}>Contact Support</small>
                  </div>
                </div>
                <p className="small mb-0" style={{ opacity: 0.9 }}>Can't access your email? Contact our support team for assistance.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Forgot Password Form */}
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4" style={{ background: 'white' }}>
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <div className="text-center mb-4">
              <div className="d-lg-none d-flex align-items-center justify-content-center mb-4">
                <div className="rounded p-2 me-3" style={{ background: '#1D4ED8', width: '40px', height: '40px' }}>
                  <i className="fas fa-star-half-stroke text-white"></i>
                </div>
                <span className="fs-4 fw-bold" style={{ color: '#1D4ED8' }}>Bonrate Pro</span>
              </div>
              <h2 className="fw-bold mb-2" style={{ fontSize: '1.875rem', color: '#111827' }}>Reset your password</h2>
              <p style={{ color: '#6B7280' }}>Enter your email address and we'll send you a link to reset your password</p>
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
                  <><i className="fas fa-spinner fa-spin me-2"></i>Sending Reset Link...</>
                ) : (
                  <>
                    <i className="fas fa-paper-plane me-2"></i>
                    Send Reset Link
                  </>
                )}
              </button>
            </form>
            
            <div className="text-center mt-4">
              <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                Remember your password? 
                <Link to="/login" style={{ color: '#1D4ED8', fontWeight: '500', textDecoration: 'none' }}> Sign in</Link>
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

export default ForgotPassword;