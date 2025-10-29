#!/bin/bash
# Start Django server in a persistent screen session

# Kill any existing Django processes
pkill -f "python manage.py runserver"

# Start Django in a detached screen session
screen -dmS django-server bash -c "cd /root/bonrate/bonrate-backend && source venv/bin/activate && python manage.py runserver 0.0.0.0:8000"

echo "Django server started in screen session 'django-server'"
echo "To view: screen -r django-server"
echo "To detach: Ctrl+A then D"