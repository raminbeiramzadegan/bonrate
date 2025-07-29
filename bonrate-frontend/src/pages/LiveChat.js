import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import Layout from '../components/Layout';

const LiveChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: "Hi John! 👋 Welcome to Bonrate Pro support. I'm Sarah and I'm here to help you with any questions you might have.",
      time: '2:34 PM',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
    },
    {
      id: 2,
      sender: 'agent',
      text: 'What can I help you with today?',
      time: '2:34 PM',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
    },
    {
      id: 3,
      sender: 'user',
      text: "Hi Sarah! I'm having trouble setting up my first campaign. The template selection seems to be stuck loading.",
      time: '2:35 PM',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
    },
    {
      id: 4,
      sender: 'agent',
      text: "I can definitely help you with that! Let me walk you through a few quick troubleshooting steps:\n\n1. Try refreshing your browser\n2. Clear your browser cache\n3. Check if you have any ad blockers enabled\n\nCan you try these steps and let me know if the issue persists?",
      time: '2:36 PM',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
    }
  ]);
  const [isTyping, setIsTyping] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: message,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleQuickAction = (action) => {
    setMessage(`I need help with: ${action}`);
  };

  const headerActions = (
    <div className="d-flex align-items-center gap-3">
      <Button variant="outline-primary" size="sm" onClick={() => window.history.back()}>
        <i className="fa-solid fa-arrow-left me-1"></i>
        Back to Help
      </Button>
      <div className="d-flex align-items-center text-sm">
        <div className="bg-success rounded-circle me-2" style={{width: '8px', height: '8px'}}></div>
        <span className="text-muted">Support Online</span>
      </div>
    </div>
  );

  return (
    <Layout 
      title="Live Chat Support" 
      subtitle="Chat with our support team in real-time"
      headerActions={headerActions}
    >
      <div className="d-flex flex-column" style={{ height: 'calc(100vh - 200px)' }}>
        {/* Chat Header */}
        <Card className="mb-0 border-0 shadow-sm">
          <Card.Body className="py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                  alt="Support Agent" 
                  className="rounded-circle me-3"
                  style={{width: '40px', height: '40px'}}
                />
                <div>
                  <h6 className="mb-0 fw-medium">Sarah Johnson</h6>
                  <div className="d-flex align-items-center text-success small">
                    <div className="bg-success rounded-circle me-2" style={{width: '6px', height: '6px'}}></div>
                    Online - Support Specialist
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <Button variant="outline-secondary" size="sm" className="rounded-circle p-2">
                  <i className="fa-solid fa-phone"></i>
                </Button>
                <Button variant="outline-secondary" size="sm" className="rounded-circle p-2">
                  <i className="fa-solid fa-video"></i>
                </Button>
                <Button variant="outline-secondary" size="sm" className="rounded-circle p-2">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Chat Messages */}
        <div className="flex-grow-1 overflow-auto p-4 bg-light">
          <div className="d-flex flex-column gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                {msg.sender === 'agent' && (
                  <img 
                    src={msg.avatar} 
                    alt="Agent" 
                    className="rounded-circle me-3 mt-1"
                    style={{width: '32px', height: '32px'}}
                  />
                )}
                <div className={`${msg.sender === 'user' ? 'text-end' : ''}`} style={{maxWidth: '70%'}}>
                  <div 
                    className={`p-3 rounded-3 shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-white border'
                    }`}
                  >
                    <p className="mb-0 small" style={{whiteSpace: 'pre-line'}}>{msg.text}</p>
                  </div>
                  <small className="text-muted mt-1 d-block">{msg.time}</small>
                </div>
                {msg.sender === 'user' && (
                  <img 
                    src={msg.avatar} 
                    alt="User" 
                    className="rounded-circle ms-3 mt-1"
                    style={{width: '32px', height: '32px'}}
                  />
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="d-flex justify-content-start">
                <img 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
                  alt="User" 
                  className="rounded-circle me-3 mt-1"
                  style={{width: '32px', height: '32px'}}
                />
                <div>
                  <div className="bg-secondary bg-opacity-25 p-3 rounded-3" style={{maxWidth: '200px'}}>
                    <div className="d-flex gap-1">
                      <div className="bg-secondary rounded-circle" style={{width: '6px', height: '6px', animation: 'bounce 1.4s infinite'}}></div>
                      <div className="bg-secondary rounded-circle" style={{width: '6px', height: '6px', animation: 'bounce 1.4s infinite 0.2s'}}></div>
                      <div className="bg-secondary rounded-circle" style={{width: '6px', height: '6px', animation: 'bounce 1.4s infinite 0.4s'}}></div>
                    </div>
                  </div>
                  <small className="text-muted mt-1 d-block">John is typing...</small>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 border-top">
          <Card.Body className="py-3">
            <div className="mb-2">
              <small className="text-muted">Quick actions:</small>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {['Account Setup', 'Campaign Issues', 'Billing Questions', 'Technical Support'].map((action) => (
                <Button 
                  key={action}
                  variant="outline-secondary" 
                  size="sm" 
                  className="rounded-pill"
                  onClick={() => handleQuickAction(action)}
                >
                  {action}
                </Button>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* Message Input */}
        <Card className="border-0 border-top">
          <Card.Body className="py-3">
            <div className="d-flex align-items-end gap-3">
              <Button variant="outline-secondary" size="sm" className="rounded-circle p-2">
                <i className="fa-solid fa-paperclip"></i>
              </Button>
              <div className="flex-grow-1">
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  style={{resize: 'none'}}
                />
              </div>
              <Button variant="outline-secondary" size="sm" className="rounded-circle p-2">
                <i className="fa-solid fa-face-smile"></i>
              </Button>
              <Button variant="primary" onClick={handleSendMessage}>
                <i className="fa-solid fa-paper-plane me-2"></i>
                Send
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
        }
      `}</style>
    </Layout>
  );
};

export default LiveChat;