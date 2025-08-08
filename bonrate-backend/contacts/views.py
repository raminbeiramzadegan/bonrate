from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Contact
from .serializers import ContactSerializer, CreateContactSerializer

class ContactListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Get all contacts for the authenticated user"""
        contacts = Contact.objects.filter(user=request.user)
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        """Create a new contact"""
        print(f"POST /api/contacts/ - User: {request.user}")
        print(f"Request data: {request.data}")
        
        serializer = CreateContactSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            contact = serializer.save(user=request.user)
            response_serializer = ContactSerializer(contact)
            print(f"Contact created: {contact}")
            return Response({
                "message": "Contact created successfully!",
                "contact": response_serializer.data
            }, status=status.HTTP_201_CREATED)
        
        print(f"Validation errors: {serializer.errors}")
        return Response({
            "error": "Failed to create contact",
            "details": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class ContactDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, contact_id):
        """Delete a contact"""
        print(f"DELETE /api/contacts/{contact_id}/ - User: {request.user}")
        
        contact = get_object_or_404(Contact, id=contact_id, user=request.user)
        contact.delete()
        
        print(f"Contact deleted: {contact_id}")
        return Response({
            "message": "Contact deleted successfully!"
        }, status=status.HTTP_200_OK)