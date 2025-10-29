#!/bin/bash

# Bonrate Server Update Script
echo "🚀 Updating Bonrate server with latest changes..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if SERVER_IP is provided
if [ -z "$1" ]; then
    print_error "Please provide server IP address"
    echo "Usage: ./update_server.sh YOUR_SERVER_IP"
    exit 1
fi

SERVER_IP=$1
SERVER_USER="root"  # Change if different
SERVER_PATH="/var/www/bonrate"

print_status "Building React frontend..."
cd bonrate-frontend
npm run build

if [ $? -ne 0 ]; then
    print_error "Frontend build failed!"
    exit 1
fi

print_status "Copying frontend build to server..."
scp -r build/* ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/frontend/

print_status "Updating backend on server..."
ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
cd /var/www/bonrate/backend
git pull origin main
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
systemctl restart bonrate
systemctl restart nginx
EOF

print_status "Server update completed! 🎉"
print_warning "Please test the following:"
echo "1. Visit your server URL and check contacts page"
echo "2. Try adding a new contact"
echo "3. Test Google Places search in the contact modal"
echo "4. Verify existing contacts load properly"