import requests
from django.conf import settings

def get_place_details(place_id):
    """Get detailed place information including review URL"""
    url = "https://maps.googleapis.com/maps/api/place/details/json"
    
    params = {
        'place_id': place_id,
        'key': settings.GOOGLE_PLACES_API_KEY,
        'fields': 'name,formatted_address,rating,user_ratings_total,url,website'
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        data = response.json()
        
        if data.get('status') == 'OK':
            result = data.get('result', {})
            return {
                'name': result.get('name'),
                'formatted_address': result.get('formatted_address'),
                'rating': result.get('rating'),
                'user_ratings_total': result.get('user_ratings_total'),
                'google_maps_url': result.get('url'),  # This is the Google Maps URL
                'website': result.get('website')
            }
        else:
            print(f"Google Places Details API error: {data.get('status')}")
            return None
            
    except Exception as e:
        print(f"Error getting place details: {e}")
        return None

def search_places(query, location=None):
    """Search for places using Google Places API with name + location"""
    if not query.strip():
        return []
    
    # Google Places API endpoint
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    
    # Combine query with location if provided
    search_query = query
    if location and location.strip():
        search_query = f"{query} in {location}"
    
    params = {
        'query': search_query,
        'key': settings.GOOGLE_PLACES_API_KEY,
        'type': 'establishment'
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        data = response.json()
        
        if data.get('status') == 'OK':
            results = []
            for place in data.get('results', [])[:15]:  # Show up to 15 locations for franchises
                results.append({
                    'place_id': place.get('place_id'),
                    'name': place.get('name'),
                    'formatted_address': place.get('formatted_address'),
                    'rating': place.get('rating'),
                    'user_ratings_total': place.get('user_ratings_total'),
                    'review_url': f"https://search.google.com/local/writereview?placeid={place.get('place_id')}"
                })
            return results
        else:
            print(f"Google Places API error: {data.get('status')}")
            return []
            
    except Exception as e:
        print(f"Error searching places: {e}")
        return []