# Bonrate Pro

Customer Review and Engagement Platform

## Project Overview

Bonrate Pro is a comprehensive customer review and engagement platform that helps businesses collect, manage, and leverage customer reviews to grow their business. The platform includes features such as template editing, campaign management, drip automation, and more.

## Technical Stack

### Frontend
- React.js with Create React App
- React Router for navigation
- Bootstrap for UI components
- Axios for API requests
- Framer Motion for animations
- Recharts for data visualization

### Backend
- FastAPI (Python) for the API
- PostgreSQL for database
- Redis for caching and task queuing
- Celery for background jobs
- JWT for authentication

## Project Structure

```
bonrate/
├── bonrate-frontend/       # React frontend
│   ├── public/             # Public assets
│   ├── src/                # Source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── App.js          # Main application component
│   │   └── index.js        # Entry point
│   ├── Dockerfile          # Frontend Docker configuration
│   └── package.json        # NPM dependencies
│
├── bonrate-backend/        # FastAPI backend
│   ├── app/                # Application code
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Core functionality
│   │   ├── db/             # Database models and connection
│   │   ├── models/         # Data models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── main.py         # Main application file
│   ├── Dockerfile          # Backend Docker configuration
│   └── requirements.txt    # Python dependencies
│
└── docker-compose.yml      # Docker Compose configuration
```

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js (for local development)
- Python 3.11+ (for local development)

### Running with Docker Compose

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/bonrate.git
   cd bonrate
   ```

2. Start the services:
   ```
   docker-compose up
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Running Locally (Development)

#### Frontend
```
cd bonrate-frontend
npm install
npm start
```

#### Backend
```
cd bonrate-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

## Deployment

### BitBucket CI/CD Pipeline

1. Create a `bitbucket-pipelines.yml` file in the root directory
2. Configure the pipeline to build and push Docker images to a registry
3. Set up deployment to Digital Ocean

### Digital Ocean Deployment

1. Create a Digital Ocean Droplet or Kubernetes cluster
2. Configure the deployment using Docker Compose or Kubernetes manifests
3. Set up a domain and SSL certificate using Cloudflare

## Features

- Template Editor with variable preview
- Campaign Wizard (4-step UX flow)
- Drip Automation Drag-and-Drop Builder
- Role-based dashboards
- Fully responsive (mobile-first)
- Accessibility compliance (WCAG 2.1)

## Development Phases

1. **Phase 1: MVP** (1-3 weeks)
   - Contacts, Campaigns (Email/SMS), Simple Dashboard, Review URLs

2. **Phase 2: Core Features** (4-6 weeks)
   - Template Editor, AI Assistant, Stripe Payments

3. **Phase 3: Automation & Reports** (7-9 weeks)
   - Drip Campaigns, Analytics, Social Media Metrics

4. **Phase 4: Physical + API** (10-12 weeks)
   - RFID/NFC Pages, Public API, Zapier Integration# bonrate
