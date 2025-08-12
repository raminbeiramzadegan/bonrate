#!/usr/bin/env python
"""
Server Diagnostic Script for Bonrate
Run this on your server to check what's missing
"""

import os
import sys
import django
from pathlib import Path

# Add the project directory to Python path
project_dir = Path(__file__).parent / 'bonrate-backend'
sys.path.insert(0, str(project_dir))

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bonratepro.settings')

try:
    django.setup()
    print("✅ Django setup successful")
except Exception as e:
    print(f"❌ Django setup failed: {e}")
    sys.exit(1)

def check_apps():
    """Check if all required apps are installed"""
    print("\n🔍 Checking installed apps...")
    
    from django.conf import settings
    required_apps = [
        'contacts.apps.ContactsConfig',
        'users.apps.UsersConfig',
        'rest_framework',
        'rest_framework_simplejwt',
        'corsheaders'
    ]
    
    for app in required_apps:
        if app in settings.INSTALLED_APPS:
            print(f"✅ {app}")
        else:
            print(f"❌ {app} - MISSING!")

def check_database():
    """Check database and migrations"""
    print("\n🔍 Checking database...")
    
    try:
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = [row[0] for row in cursor.fetchall()]
            
        required_tables = ['contacts_contact', 'users_user']
        for table in required_tables:
            if table in tables:
                print(f"✅ Table {table} exists")
            else:
                print(f"❌ Table {table} - MISSING!")
                
    except Exception as e:
        print(f"❌ Database error: {e}")

def check_contacts_model():
    """Check if contacts model is working"""
    print("\n🔍 Checking contacts model...")
    
    try:
        from contacts.models import Contact
        count = Contact.objects.count()
        print(f"✅ Contacts model working - {count} contacts in database")
        
        # Check model fields
        fields = [f.name for f in Contact._meta.fields]
        print(f"✅ Contact fields: {fields}")
        
    except Exception as e:
        print(f"❌ Contacts model error: {e}")

def check_api_urls():
    """Check if API URLs are configured"""
    print("\n🔍 Checking API URLs...")
    
    try:
        from django.urls import reverse
        
        # Test contacts URL
        try:
            url = reverse('contact-list-create')
            print(f"✅ Contacts API URL: {url}")
        except:
            print("❌ Contacts API URL not found")
            
    except Exception as e:
        print(f"❌ URL check error: {e}")

def check_environment():
    """Check environment variables"""
    print("\n🔍 Checking environment variables...")
    
    from dotenv import load_dotenv
    load_dotenv()
    
    env_vars = {
        'SENDGRID_API_KEY': os.getenv('SENDGRID_API_KEY'),
        'GOOGLE_PLACES_API_KEY': os.getenv('GOOGLE_PLACES_API_KEY'),
        'DEFAULT_FROM_EMAIL': os.getenv('DEFAULT_FROM_EMAIL')
    }
    
    for var, value in env_vars.items():
        if value:
            print(f"✅ {var}: {value[:10]}...")
        else:
            print(f"❌ {var}: Not set")

def check_permissions():
    """Check file permissions"""
    print("\n🔍 Checking file permissions...")
    
    important_files = [
        'bonrate-backend/manage.py',
        'bonrate-backend/db.sqlite3',
        'bonrate-backend/.env'
    ]
    
    for file_path in important_files:
        if os.path.exists(file_path):
            if os.access(file_path, os.R_OK):
                print(f"✅ {file_path} - readable")
            else:
                print(f"❌ {file_path} - not readable")
        else:
            print(f"❌ {file_path} - doesn't exist")

if __name__ == "__main__":
    print("🚀 Bonrate Server Diagnostic")
    print("=" * 50)
    
    check_apps()
    check_database()
    check_contacts_model()
    check_api_urls()
    check_environment()
    check_permissions()
    
    print("\n" + "=" * 50)
    print("🏁 Diagnostic complete!")