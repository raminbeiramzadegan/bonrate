from django.urls import path
from .views import ContactListCreateView, ContactDetailView, BulkEmailView, GooglePlacesSearchView
from .business_profile_api import GooglePlacesSearchView as BusinessGooglePlacesSearchView, GooglePlaceDetailsView

urlpatterns = [
    path('', ContactListCreateView.as_view(), name='contact-list-create'),
    path('bulk-email/', BulkEmailView.as_view(), name='bulk-email'),
    path('search-places/', GooglePlacesSearchView.as_view(), name='search-places'),
    path('business/google-places/search/', BusinessGooglePlacesSearchView.as_view(), name='business-google-places-search'),
    path('business/google-places/details/<str:place_id>/', GooglePlaceDetailsView.as_view(), name='business-google-place-details'),
    path('<uuid:contact_id>/', ContactDetailView.as_view(), name='contact-detail'),
]