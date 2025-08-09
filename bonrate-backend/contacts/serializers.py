from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'phone', 'email', 'review_url', 'review_status', 'last_contact', 'created_at']
        read_only_fields = ['id', 'review_url', 'last_contact', 'created_at']

class CreateContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['name', 'phone', 'email']
    
    def validate_email(self, value):
        user = self.context['request'].user
        if Contact.objects.filter(user=user, email=value).exists():
            raise serializers.ValidationError("Contact with this email already exists.")
        return value