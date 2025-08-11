from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

class Contact(models.Model):
    REVIEW_STATUS_CHOICES = [
        ('not_sent', 'Not Sent'),
        ('sent', 'Sent'),
        ('pending', 'Pending'),
        ('completed', 'Completed'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='contacts')
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    business_name = models.CharField(max_length=200, blank=True, null=True)
    business_place_id = models.CharField(max_length=200, blank=True, null=True)
    business_address = models.TextField(blank=True, null=True)
    google_review_url = models.URLField(blank=True, null=True)
    review_url = models.URLField(blank=True, null=True)
    review_status = models.CharField(max_length=20, choices=REVIEW_STATUS_CHOICES, default='not_sent')
    last_contact = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ['user', 'email']
    
    def __str__(self):
        return f"{self.name} - {self.email}"
    
    def save(self, *args, **kwargs):
        if not self.review_url:
            self.review_url = f"https://bonrate.pro/review/{self.id}"
        
        # Generate Google review URL if business_place_id exists
        if self.business_place_id and not self.google_review_url:
            self.google_review_url = f"https://search.google.com/local/writereview?placeid={self.business_place_id}"
        
        super().save(*args, **kwargs)