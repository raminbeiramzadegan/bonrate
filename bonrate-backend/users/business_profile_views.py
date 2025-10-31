from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import User
import json

class BusinessProfileView(APIView):
    permission_classes = []  # Temporarily removed for testing
    
    def get(self, request):
        # For testing, return saved data from a simple storage
        # In production, this would get data from authenticated user
        saved_data = getattr(self, '_saved_data', {})
        return Response(saved_data)
    
    def post(self, request):
        data = request.data
        print(f"Received data: {data}")
        
        # For testing, save data to class attribute
        # In production, this would save to authenticated user's profile
        BusinessProfileView._saved_data = {
            'name': data.get('name', ''),
            'type': data.get('type', 'Restaurant'),
            'phone': data.get('phone', ''),
            'email': data.get('email', ''),
            'address': data.get('address', ''),
            'description': data.get('description', ''),
            'website': data.get('website', ''),
            'facebook': data.get('facebook', ''),
            'instagram': data.get('instagram', ''),
            'googleBusiness': data.get('googleBusiness', ''),
            'business_hours': data.get('business_hours', {})
        }
        
        return Response({
            'message': 'Business profile updated successfully!',
            'success': True
        }, status=status.HTTP_200_OK)