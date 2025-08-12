#!/bin/bash

# Bonrate Server Deployment Script
echo "🚀 Starting Bonrate deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "manage.py" ]; then
    print_error "Please run this script from the bonrate-backend directory"
    exit 1
fi

print_status "Pulling latest changes from Git..."
git pull origin main

print_status "Installing/updating Python dependencies..."
pip install -r requirements.txt

print_status "Running database migrations..."
python manage.py makemigrations
python manage.py migrate

print_status "Creating superuser (if needed)..."
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(is_superuser=True).exists():
    User.objects.create_superuser('admin', 'admin@bonrate.com', 'admin123')
    print('Superuser created: admin/admin123')
else:
    print('Superuser already exists')
"

print_status "Collecting static files..."
python manage.py collectstatic --noinput

print_status "Checking contacts app installation..."
python manage.py shell -c "
import sys
try:
    from contacts.models import Contact
    print('✅ Contacts app is properly installed')
    print(f'Contact model fields: {[f.name for f in Contact._meta.fields]}')
except ImportError as e:
    print(f'❌ Contacts app import error: {e}')
    sys.exit(1)
"

print_status "Checking Google Places API configuration..."
python manage.py shell -c "
import os
from dotenv import load_dotenv
load_dotenv()

api_key = os.getenv('GOOGLE_PLACES_API_KEY')
if api_key:
    print(f'✅ Google Places API key found: {api_key[:10]}...')
else:
    print('❌ Google Places API key not found in .env file')
"

print_status "Testing contacts API endpoint..."
python manage.py shell -c "
from django.test import Client
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()
client = Client()

# Create test user if doesn't exist
user, created = User.objects.get_or_create(
    email='test@bonrate.com',
    defaults={
        'first_name': 'Test',
        'last_name': 'User',
        'business_name': 'Test Business'
    }
)

# Generate JWT token
refresh = RefreshToken.for_user(user)
access_token = str(refresh.access_token)

# Test contacts endpoint
response = client.get('/api/contacts/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
print(f'Contacts API status: {response.status_code}')
if response.status_code == 200:
    print('✅ Contacts API is working')
else:
    print(f'❌ Contacts API error: {response.content}')
"

print_status "Deployment completed! 🎉"
print_warning "Don't forget to:"
echo "1. Restart your web server (nginx/apache)"
echo "2. Restart your Django application server"
echo "3. Check server logs for any errors"