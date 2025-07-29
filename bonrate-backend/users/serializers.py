from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email as django_validate_email
from django.core.exceptions import ValidationError as DjangoValidationError
import re

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'business_name', 'email', 'phone', 'password', 'confirm_password']

    def validate_first_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("First name is required")
        if len(value.strip()) < 2:
            raise serializers.ValidationError("First name must be at least 2 characters")
        return value.strip()

    def validate_last_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Last name is required")
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Last name must be at least 2 characters")
        return value.strip()

    def validate_business_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Business name is required")
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Business name must be at least 2 characters")
        return value.strip()

    def validate_email(self, value):
        # Check if email format is valid
        try:
            django_validate_email(value)
        except DjangoValidationError:
            raise serializers.ValidationError("Enter a valid email address")
        
        # Additional email format validation
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, value):
            raise serializers.ValidationError("Enter a valid email address")
        
        # Check if email already exists
        if User.objects.filter(email=value.lower()).exists():
            raise serializers.ValidationError("An account with this email already exists")
        
        return value.lower()

    def validate_phone(self, value):
        if value:
            # Remove spaces, dashes, parentheses
            cleaned_phone = re.sub(r'[\s\-\(\)\+]', '', value)
            if not re.match(r'^\d{10,15}$', cleaned_phone):
                raise serializers.ValidationError("Enter a valid phone number (10-15 digits)")
        return value

    def validate_password(self, value):
        # Check minimum length
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long")
        
        # Check for at least one uppercase letter
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter")
        
        # Check for at least one lowercase letter
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError("Password must contain at least one lowercase letter")
        
        # Check for at least one digit
        if not re.search(r'\d', value):
            raise serializers.ValidationError("Password must contain at least one number")
        
        # Check for at least one special character
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError("Password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)")
        
        # Check for common weak passwords
        weak_passwords = ['password', '12345678', 'qwerty123', 'abc123456']
        if value.lower() in weak_passwords:
            raise serializers.ValidationError("This password is too common. Choose a stronger password")
        
        return value

    def validate(self, data):
        # Check if passwords match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match"})
        
        # Check if password contains email or name
        email_local = data['email'].split('@')[0].lower()
        first_name = data['first_name'].lower()
        last_name = data['last_name'].lower()
        password_lower = data['password'].lower()
        
        if email_local in password_lower or first_name in password_lower or last_name in password_lower:
            raise serializers.ValidationError({"password": "Password should not contain your email or name"})
        
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user
