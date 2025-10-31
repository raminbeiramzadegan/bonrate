# Bonrate Pro

Customer Review and Engagement Platform

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd bonrate-backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Copy the environment file and add your API keys:
   ```bash
   cp .env.example .env
   ```

5. Edit `.env` file and add your actual API keys:
   ```
   SECRET_KEY=your-django-secret-key
   GOOGLE_PLACES_API_KEY=your-google-places-api-key
   SENDGRID_API_KEY=your-sendgrid-api-key
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=your-app-password
   ```

6. Run migrations:
   ```bash
   python manage.py migrate
   ```

7. Start the backend server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd bonrate-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm start
   ```

## Environment Variables

### Required API Keys

- **Google Places API Key**: Get from [Google Cloud Console](https://console.cloud.google.com/)
- **SendGrid API Key**: Get from [SendGrid Dashboard](https://app.sendgrid.com/)

### Security Notes

- Never commit `.env` files to version control
- Use strong, unique secret keys for production
- Enable 2FA on all API provider accounts
- Regularly rotate API keys

## Deployment

See deployment documentation for production setup instructions.