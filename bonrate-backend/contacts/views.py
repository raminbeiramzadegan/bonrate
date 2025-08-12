from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Contact
from .serializers import ContactSerializer, CreateContactSerializer
from .email_service import send_review_email, send_bulk_review_emails
from .google_places import search_places

class ContactListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Get all contacts for the authenticated user"""
        try:
            print(f"=== CONTACTS GET DEBUG ===")
            print(f"User: {request.user}")
            print(f"User ID: {request.user.id}")
            print(f"User authenticated: {request.user.is_authenticated}")
            
            contacts = Contact.objects.filter(user=request.user)
            print(f"Found {contacts.count()} contacts")
            
            serializer = ContactSerializer(contacts, many=True)
            print(f"Serialized data: {serializer.data}")
            
            return Response(serializer.data)
        except Exception as e:
            print(f"ERROR in contacts GET: {str(e)}")
            import traceback
            print(f"Traceback: {traceback.format_exc()}")
            return Response({"error": str(e)}, status=500)
    
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
    
    def put(self, request, contact_id):
        """Update a contact"""
        print(f"PUT /api/contacts/{contact_id}/ - User: {request.user}")
        print(f"Request data: {request.data}")
        
        contact = get_object_or_404(Contact, id=contact_id, user=request.user)
        serializer = CreateContactSerializer(contact, data=request.data, partial=True, context={'request': request})
        
        if serializer.is_valid():
            contact = serializer.save()
            response_serializer = ContactSerializer(contact)
            print(f"Contact updated: {contact}")
            return Response({
                "message": "Contact updated successfully!",
                "contact": response_serializer.data
            }, status=status.HTTP_200_OK)
        
        print(f"Validation errors: {serializer.errors}")
        return Response({
            "error": "Failed to update contact",
            "details": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, contact_id):
        """Delete a contact"""
        print(f"DELETE /api/contacts/{contact_id}/ - User: {request.user}")
        
        contact = get_object_or_404(Contact, id=contact_id, user=request.user)
        contact.delete()
        
        print(f"Contact deleted: {contact_id}")
        return Response({
            "message": "Contact deleted successfully!"
        }, status=status.HTTP_200_OK)
    
    def post(self, request, contact_id):
        """Send email to a single contact"""
        print(f"POST /api/contacts/{contact_id}/ - Send email - User: {request.user}")
        
        contact = get_object_or_404(Contact, id=contact_id, user=request.user)
        
        if send_review_email(contact, request.user):
            return Response({
                "message": f"Review email sent to {contact.name} successfully!"
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "error": "Failed to send email"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BulkEmailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """Send emails to multiple contacts"""
        contact_ids = request.data.get('contact_ids', [])
        
        if not contact_ids:
            return Response({
                "error": "No contacts selected"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        print(f"POST /api/contacts/bulk-email/ - User: {request.user} - Contacts: {contact_ids}")
        
        result = send_bulk_review_emails(contact_ids, request.user)
        
        return Response({
            "message": f"Emails sent successfully to {result['success_count']} contacts",
            "details": result
        }, status=status.HTTP_200_OK)

class GooglePlacesSearchView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Search Google Places API with name + location"""
        query = request.GET.get('query', '').strip()
        location = request.GET.get('location', '').strip()
        
        if not query:
            return Response({
                "error": "Query parameter is required"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        search_text = f"{query} in {location}" if location else query
        print(f"Searching Google Places for: {search_text}")
        
        results = search_places(query, location)
        
        return Response({
            "results": results
        }, status=status.HTTP_200_OK)