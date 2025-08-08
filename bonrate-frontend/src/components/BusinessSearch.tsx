import React, { useState } from 'react';
import { Business, GooglePlacesResult } from '../types/Business';

interface BusinessSearchProps {
  onBusinessSelect: (business: Business) => void;
}

const BusinessSearch: React.FC<BusinessSearchProps> = ({ onBusinessSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchBusinesses = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      // TODO: Replace with actual Google Places API call
      const response = await fetch(`/api/search-businesses?q=${encodeURIComponent(query)}`);
      const data: GooglePlacesResult[] = await response.json();
      
      const businesses: Business[] = data.map(place => ({
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        rating: place.rating,
        placeId: place.place_id
      }));
      
      setResults(businesses);
    } catch (error) {
      console.error('Error searching businesses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search businesses by name and location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchBusinesses()}
        />
        <button 
          className="btn btn-primary"
          onClick={searchBusinesses}
          disabled={isLoading}
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <i className="fas fa-search"></i>
          )}
        </button>
      </div>
      
      {results.length > 0 && (
        <div className="mt-3">
          <h6>Search Results:</h6>
          <div className="list-group">
            {results.map(business => (
              <button
                key={business.id}
                className="list-group-item list-group-item-action"
                onClick={() => onBusinessSelect(business)}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="mb-1">{business.name}</h6>
                    <p className="mb-1 text-muted">{business.address}</p>
                  </div>
                  {business.rating && (
                    <div className="text-warning">
                      <i className="fas fa-star"></i> {business.rating}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessSearch;