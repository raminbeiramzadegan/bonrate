from django.core.mail import send_mail
from django.conf import settings
from .models import Contact

def send_review_email(contact, user):
    """Send review request email to a single contact using Django send_mail"""
    business_name = getattr(user, 'business_name', None) or 'Our Business'
    subject = f"We'd love your feedback - {business_name}"
    
    # Email content
    message = f"""
Hi {contact.name},

Thank you for choosing {business_name}! We hope you had a great experience.

We'd really appreciate if you could take a moment to leave us a review:
{contact.review_url}

Your feedback helps us improve and helps other customers make informed decisions.

Thank you!
{business_name} Team
    """
    
    try:
        print(f"=== EMAIL SERVICE DEBUG ===")
        print(f"Contact: {contact.name} ({contact.email})")
        print(f"User: {user.email}")
        print(f"Business name: {business_name}")
        print(f"Review URL: {contact.review_url}")
        print(f"From email: {settings.DEFAULT_FROM_EMAIL}")
        print(f"Subject: {subject}")
        
        # Send email using Django's send_mail
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[contact.email],
            fail_silently=False,
        )
        
        print(f"Email sent successfully to {contact.email}")
        
        # Update contact status
        contact.review_status = 'sent'
        contact.save()
        
        return True
            
    except Exception as e:
        print(f"ERROR: Failed to send email to {contact.email}")
        print(f"Error type: {type(e).__name__}")
        print(f"Error message: {str(e)}")
        import traceback
        print(f"Full traceback: {traceback.format_exc()}")
        return False

def send_bulk_review_emails(contact_ids, user):
    """Send review emails to multiple contacts"""
    contacts = Contact.objects.filter(id__in=contact_ids, user=user)
    success_count = 0
    failed_count = 0
    
    for contact in contacts:
        if send_review_email(contact, user):
            success_count += 1
        else:
            failed_count += 1
    
    return {
        'success_count': success_count,
        'failed_count': failed_count,
        'total_sent': success_count
    }