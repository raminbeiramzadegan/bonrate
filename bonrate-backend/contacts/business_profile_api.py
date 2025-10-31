import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class GooglePlacesSearchView(APIView):
    permission_classes = []  # Temporarily remove auth for testing
    
    def get(self, request):
        query = request.GET.get('query', '').strip()
        if not query:
            return Response({'results': []})
        
        url = "https://maps.googleapis.com/maps/api/place/autocomplete/json"
        params = {
            'input': query,
            'key': settings.GOOGLE_PLACES_API_KEY,
            'types': 'establishment'
        }
        
        try:
            response = requests.get(url, params=params)
            data = response.json()
            
            if data.get('status') == 'OK':
                results = []
                for prediction in data.get('predictions', [])[:10]:
                    results.append({
                        'place_id': prediction.get('place_id'),
                        'description': prediction.get('description'),
                        'name': prediction.get('structured_formatting', {}).get('main_text', ''),
                        'address': prediction.get('structured_formatting', {}).get('secondary_text', '')
                    })
                return Response({'results': results})
            
            return Response({'results': []})
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GooglePlaceDetailsView(APIView):
    permission_classes = []  # Temporarily remove auth for testing
    
    def get(self, request, place_id):
        url = "https://maps.googleapis.com/maps/api/place/details/json"
        params = {
            'place_id': place_id,
            'key': settings.GOOGLE_PLACES_API_KEY,
            'fields': 'name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,reviews,photos,opening_hours,url,business_status,types'
        }
        
        try:
            response = requests.get(url, params=params)
            data = response.json()
            
            if data.get('status') == 'OK':
                result = data.get('result', {})
                
                # Process photos
                photos = []
                if result.get('photos'):
                    for photo in result.get('photos', [])[:10]:
                        photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference={photo.get('photo_reference')}&key={settings.GOOGLE_PLACES_API_KEY}"
                        photos.append({
                            'url': photo_url,
                            'width': photo.get('width'),
                            'height': photo.get('height')
                        })
                
                # Process reviews
                reviews = []
                if result.get('reviews'):
                    for review in result.get('reviews', [])[:3]:
                        reviews.append({
                            'author_name': review.get('author_name'),
                            'rating': review.get('rating'),
                            'text': review.get('text'),
                            'time': review.get('time'),
                            'profile_photo_url': review.get('profile_photo_url')
                        })
                
                # Process opening hours
                opening_hours = None
                if result.get('opening_hours'):
                    opening_hours = {
                        'open_now': result.get('opening_hours', {}).get('open_now'),
                        'weekday_text': result.get('opening_hours', {}).get('weekday_text', [])
                    }
                
                business_data = {
                    'place_id': place_id,
                    'name': result.get('name'),
                    'address': result.get('formatted_address'),
                    'phone': result.get('formatted_phone_number'),
                    'website': result.get('website'),
                    'rating': result.get('rating'),
                    'user_ratings_total': result.get('user_ratings_total'),
                    'google_maps_url': result.get('url'),
                    'business_status': result.get('business_status'),
                    'types': result.get('types', []),
                    'photos': photos,
                    'reviews': reviews,
                    'opening_hours': opening_hours
                }
                
                return Response(business_data)
            
            return Response({'error': 'Place not found'}, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)