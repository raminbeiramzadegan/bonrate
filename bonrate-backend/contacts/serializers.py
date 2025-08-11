from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'phone', 'email', 'business_name', 'business_place_id', 'business_address', 'google_review_url', 'review_url', 'review_status', 'last_contact', 'created_at']
        read_only_fields = ['id', 'google_review_url', 'review_url', 'last_contact', 'created_at']

class CreateContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['name', 'phone', 'email', 'business_name', 'business_place_id', 'business_address']
    
    def validate_email(self, value):
        user = self.context['request'].user
        
        # For updates, exclude the current instance
        queryset = Contact.objects.filter(user=user, email=value)
        if self.instance:
            queryset = queryset.exclude(id=self.instance.id)
        
        if queryset.exists():
            raise serializers.ValidationError("Contact with this email already exists.")
        return value