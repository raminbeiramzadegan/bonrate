from django.db import migrations

def update_google_review_urls(apps, schema_editor):
    Contact = apps.get_model('contacts', 'Contact')
    for contact in Contact.objects.filter(business_place_id__isnull=False):
        if contact.business_place_id:
            contact.google_review_url = f"https://www.google.com/maps/search/?api=1&query=Google&query_place_id={contact.business_place_id}"
            contact.save()

class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0002_contact_business_name_contact_business_place_id_and_more'),
    ]

    operations = [
        migrations.RunPython(update_google_review_urls),
    ]