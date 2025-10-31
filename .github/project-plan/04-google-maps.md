# 🗺 Google Maps Integration - Implementation Specification

## Overview
This document specifies the implementation of the GoogleMap.js component, which displays the trainer's location using Google Maps JavaScript API.

---

## Component: GoogleMap.js

### File Location
`src/components/GoogleMap.js`

### Purpose
Display an interactive map showing:
- Business location
- Address information
- Directions link
- Optional: Nearby landmarks

---

## Google Maps API Setup

### API Key Configuration

1. **Get API Key:**
   - Go to Google Cloud Console
   - Enable Maps JavaScript API
   - Enable Places API (for business info)
   - Create API key
   - Restrict key to your domain

2. **Environment Variable:**
```env
# .env
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
```

3. **Load Script:**
Install package:
```bash
npm install @react-google-maps/api
```

---

## Implementation Details

### Component Structure

```javascript
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import '../styles.css';

const GoogleMapComponent = () => {
  const [map, setMap] = useState(null);
  const [showInfo, setShowInfo] = useState(true);

  // Business location coordinates
  const center = {
    lat: 52.2385934,
    lng: 20.9260454
  };

  const mapContainerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '12px'
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: false,
    fullscreenControl: true,
    styles: customMapStyles, // Custom styling
  };

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <div className="map-section">
      {/* Component content */}
    </div>
  );
};

export default GoogleMapComponent;
```

---

## HTML Structure

```html
<div className="map-section">
  <div className="container">
    
    {/* Header */}
    <div className="map-header">
      <h2 className="section-heading centered">
        Lokalizacja
        <span className="heading-decoration-center"></span>
      </h2>
      <p className="map-subtitle">
        Znajdź nas w sercu Warszawy
      </p>
    </div>
    
    {/* Map and Info Grid */}
    <div className="map-grid">
      
      {/* Map Container */}
      <div className="map-container">
        <LoadScript 
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          loadingElement={<div className="map-loading">Ładowanie mapy...</div>}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            options={mapOptions}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker
              position={center}
              title="Ania Matusik Personal Trainer"
              animation={window.google?.maps?.Animation?.DROP}
            />
            
            {showInfo && (
              <InfoWindow
                position={center}
                onCloseClick={() => setShowInfo(false)}
              >
                <div className="map-info-window">
                  <h3>Ania Matusik Personal Trainer</h3>
                  <p>Twój trener personalny w Warszawie</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      
      {/* Location Info Card */}
      <div className="location-info">
        <div className="info-card">
          <div className="info-icon">📍</div>
          <h3>Adres</h3>
          <p className="info-address">
            Ania Matusik Personal Trainer<br />
            Warszawa, Polska
          </p>
        </div>
        
        <div className="info-card">
          <div className="info-icon">🕒</div>
          <h3>Godziny Otwarcia</h3>
          <ul className="info-hours">
            <li><span>Pon - Pt:</span> 06:00 - 21:00</li>
            <li><span>Sobota:</span> 08:00 - 18:00</li>
            <li><span>Niedziela:</span> 09:00 - 15:00</li>
          </ul>
        </div>
        
        <div className="info-card">
          <div className="info-icon">📞</div>
          <h3>Kontakt</h3>
          <p className="info-contact">
            <a href="tel:+48123456789">+48 123 456 789</a><br />
            <a href="mailto:kontakt@trener.pl">kontakt@trener.pl</a>
          </p>
        </div>
        
        <div className="info-actions">
          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Wyznacz Trasę
          </a>
          <a 
            href="https://www.google.com/maps/place/Ania+Matusik+Personal+Trainer/@52.2416541,20.9296597"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Zobacz na Google Maps
          </a>
        </div>
      </div>
      
    </div>
    
    {/* Transport Info */}
    <div className="transport-info">
      <h3>Jak do Nas Dojechać</h3>
      <div className="transport-grid">
        <div className="transport-item">
          <span className="transport-icon">🚇</span>
          <div>
            <strong>Metro:</strong> Linia M1, przystanek Centrum (5 min pieszo)
          </div>
        </div>
        <div className="transport-item">
          <span className="transport-icon">🚌</span>
          <div>
            <strong>Autobus:</strong> Linie 175, 180, 503 (przystanek Marszałkowska)
          </div>
        </div>
        <div className="transport-item">
          <span className="transport-icon">🅿️</span>
          <div>
            <strong>Parking:</strong> Bezpłatny parking dla klientów
          </div>
        </div>
      </div>
    </div>
    
  </div>
</div>
```

---

## CSS Styling

```css
.map-section {
  padding: 6rem 0;
  background: #f8f8f8;
}

/* Header */
.map-header {
  text-align: center;
  margin-bottom: 4rem;
}

.map-subtitle {
  font-size: 1.125rem;
  color: #5f626d;
  margin-top: 1rem;
}

/* Map Grid */
.map-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Map Container */
.map-container {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(58, 60, 74, 0.1);
  position: relative;
}

.map-loading {
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  color: #5f626d;
  font-size: 1.125rem;
}

/* Custom Info Window */
.map-info-window {
  padding: 0.5rem;
}

.map-info-window h3 {
  font-size: 1.125rem;
  color: #3a3c4a;
  margin-bottom: 0.5rem;
}

.map-info-window p {
  font-size: 0.95rem;
  color: #5f626d;
  margin: 0;
}

/* Location Info */
.location-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(58, 60, 74, 0.08);
  transition: all 250ms ease;
}

.info-card:hover {
  box-shadow: 0 4px 16px rgba(58, 60, 74, 0.15);
  transform: translateY(-2px);
}

.info-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.info-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #3a3c4a;
  margin-bottom: 0.75rem;
}

.info-address,
.info-contact {
  color: #5f626d;
  line-height: 1.7;
  margin: 0;
}

.info-contact a {
  color: #8c9bc0;
  text-decoration: none;
  transition: color 250ms ease;
}

.info-contact a:hover {
  color: #ff6e61;
}

.info-hours {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-hours li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f8f8f8;
  color: #5f626d;
}

.info-hours li:last-child {
  border-bottom: none;
}

.info-hours li span {
  font-weight: 600;
  color: #3a3c4a;
}

.info-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.info-actions .btn {
  width: 100%;
  text-align: center;
}

/* Transport Info */
.transport-info {
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(58, 60, 74, 0.08);
}

.transport-info h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #3a3c4a;
  margin-bottom: 1.5rem;
  text-align: center;
}

.transport-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.transport-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.transport-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.transport-item div {
  color: #5f626d;
  line-height: 1.6;
}

.transport-item strong {
  color: #3a3c4a;
  display: block;
  margin-bottom: 0.25rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .map-grid {
    grid-template-columns: 1fr;
  }
  
  .location-info {
    grid-template-columns: repeat(2, 1fr);
    display: grid;
  }
  
  .info-actions {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .map-section {
    padding: 4rem 0;
  }
  
  .map-header {
    margin-bottom: 3rem;
  }
  
  .location-info {
    grid-template-columns: 1fr;
    display: flex;
  }
  
  .transport-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .map-container {
    height: 400px;
  }
}

@media (max-width: 480px) {
  .info-actions {
    flex-direction: column;
  }
  
  .map-container {
    height: 350px;
  }
}
```

---

## Custom Map Styling

```javascript
const customMapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ color: '#f8f8f8' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#8c9bc0' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5f626d' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#3a3c4a' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#d9c2a6' }, { lightness: 70 }]
  }
];
```

---

## Business Information

### Coordinates
```javascript
const businessLocation = {
  name: 'Ania Matusik Personal Trainer',
  lat: 52.2385934,
  lng: 20.9260454,
  address: 'Warsaw, Poland',
  phone: '+48 123 456 789',
  email: 'kontakt@trener.pl',
  googleMapsUrl: 'https://www.google.com/maps/place/Ania+Matusik+Personal+Trainer/@52.2416541,20.9296597'
};
```

### Hours
```javascript
const businessHours = {
  monday: { open: '06:00', close: '21:00' },
  tuesday: { open: '06:00', close: '21:00' },
  wednesday: { open: '06:00', close: '21:00' },
  thursday: { open: '06:00', close: '21:00' },
  friday: { open: '06:00', close: '21:00' },
  saturday: { open: '08:00', close: '18:00' },
  sunday: { open: '09:00', close: '15:00' }
};
```

---

## Advanced Features (Optional)

### 1. Multiple Locations
```javascript
const locations = [
  { id: 1, lat: 52.2385934, lng: 20.9260454, name: 'Lokalizacja 1' },
  { id: 2, lat: 52.2300000, lng: 20.9350000, name: 'Lokalizacja 2' }
];

// Render multiple markers
{locations.map(location => (
  <Marker
    key={location.id}
    position={{ lat: location.lat, lng: location.lng }}
    title={location.name}
  />
))}
```

### 2. Directions Service
```javascript
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const [directions, setDirections] = useState(null);

const directionsCallback = (response) => {
  if (response !== null && response.status === 'OK') {
    setDirections(response);
  }
};

<DirectionsService
  options={{
    destination: center,
    origin: userLocation,
    travelMode: 'DRIVING'
  }}
  callback={directionsCallback}
/>

{directions && <DirectionsRenderer directions={directions} />}
```

### 3. Nearby Places
```javascript
// Show nearby parking, public transport, etc.
const nearbyPlaces = [
  { type: 'parking', lat: 52.2380000, lng: 20.9255000, name: 'Parking' },
  { type: 'metro', lat: 52.2390000, lng: 20.9265000, name: 'Metro Centrum' }
];
```

---

## Error Handling

```javascript
const [mapError, setMapError] = useState(null);

<LoadScript 
  googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
  onError={() => setMapError('Nie udało się załadować mapy')}
>
  {mapError ? (
    <div className="map-error">
      <p>{mapError}</p>
      <a href={businessLocation.googleMapsUrl} target="_blank" rel="noopener noreferrer">
        Zobacz na Google Maps
      </a>
    </div>
  ) : (
    <GoogleMap ... />
  )}
</LoadScript>
```

---

## Performance Optimization

1. **Lazy Load Map:**
```javascript
import { lazy, Suspense } from 'react';

const GoogleMapComponent = lazy(() => import('./components/GoogleMap'));

<Suspense fallback={<div className="map-loading">Ładowanie mapy...</div>}>
  <GoogleMapComponent />
</Suspense>
```

2. **Load Only When Visible:**
```javascript
const [shouldLoadMap, setShouldLoadMap] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoadMap(true);
      }
    },
    { threshold: 0.1 }
  );
  
  // Observer logic
}, []);
```

---

## Accessibility Requirements

1. **ARIA Labels:**
```html
<div role="region" aria-label="Mapa lokalizacji">
```

2. **Keyboard Navigation:**
   - Map is keyboard accessible by default
   - Ensure custom controls are focusable

3. **Alternative Content:**
   - Provide address text for screen readers
   - Include directions link as fallback

---

## Testing Checklist

- [ ] Map loads correctly with API key
- [ ] Marker appears at correct location
- [ ] Info window displays business info
- [ ] Info window can be closed
- [ ] Map controls work (zoom, street view)
- [ ] Custom styling applied
- [ ] Location info cards display correctly
- [ ] "Get Directions" link works
- [ ] "View on Google Maps" link works
- [ ] Transport info displays correctly
- [ ] Responsive on mobile, tablet, desktop
- [ ] Error handling works (invalid API key)
- [ ] Loading state shows while map loads
- [ ] No console errors

---

**Implementation Priority:** HIGH  
**Dependencies:** Google Maps API key, @react-google-maps/api package  
**Estimated Time:** 4-6 hours  
**API Cost:** Free tier (up to $200 credit/month)
