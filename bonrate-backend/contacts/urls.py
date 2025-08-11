from django.urls import path
from .views import ContactListCreateView, ContactDetailView, BulkEmailView, GooglePlacesSearchView

urlpatterns = [
    path('', ContactListCreateView.as_view(), name='contact-list-create'),
    path('bulk-email/', BulkEmailView.as_view(), name='bulk-email'),
    path('search-places/', GooglePlacesSearchView.as_view(), name='search-places'),
    path('<uuid:contact_id>/', ContactDetailView.as_view(), name='contact-detail'),
]