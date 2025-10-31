# ⭐ Google Reviews Component - Implementation Specification

## Overview
This document specifies the implementation of the Reviews.js component, which fetches and displays Google reviews for the personal trainer's business.

---

## Component: Reviews.js

### File Location
`src/components/Reviews.js`

### Purpose
Display authentic client testimonials from Google reviews:
- Star ratings
- Review text
- Reviewer names and photos
- Review dates
- Overall rating summary

---

## Google Places API Setup

### API Configuration

1. **Enable APIs:**
   - Google Places API
   - Places API (New) - for reviews

2. **Place ID:**
   - Get Place ID from Google Maps URL
   - For "Ania Matusik Personal Trainer"
   - Extract from: https://www.google.com/maps/place/...

3. **Environment Variable:**
```env
REACT_APP_GOOGLE_PLACES_API_KEY=your_places_api_key
REACT_APP_PLACE_ID=ChIJd... (your place ID)
```

---

## Implementation Details

### Component Structure

```javascript
import React, { useState, useEffect, useRef } from 'react';
import { fetchGoogleReviews } from '../utils/googleReviews';
import '../styles.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    loadReviews();
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await fetchGoogleReviews();
      setReviews(data.reviews);
      setAverageRating(data.rating);
      setTotalReviews(data.user_ratings_total);
    } catch (err) {
      setError('Nie udało się załadować opinii');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`star ${index < rating ? 'filled' : ''}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div ref={sectionRef} className={`reviews-section ${isVisible ? 'visible' : ''}`}>
      {/* Component content */}
    </div>
  );
};

export default Reviews;
```

---

## HTML Structure

```html
<div className="reviews-section">
  <div className="container">
    
    {/* Header */}
    <div className="reviews-header">
      <h2 className="section-heading centered">
        Opinie Klientów
        <span className="heading-decoration-center"></span>
      </h2>
      <p className="reviews-subtitle">
        Zobacz co mówią o mnie moi klienci
      </p>
    </div>
    
    {/* Rating Summary */}
    <div className="rating-summary">
      <div className="rating-number">{averageRating.toFixed(1)}</div>
      <div className="rating-stars">
        {renderStars(Math.round(averageRating))}
      </div>
      <div className="rating-count">
        Na podstawie {totalReviews} opinii
      </div>
      <a 
        href="https://www.google.com/maps/place/Ania+Matusik+Personal+Trainer"
        target="_blank"
        rel="noopener noreferrer"
        className="google-badge"
      >
        <img src="/google-logo.png" alt="Google" />
        <span>Zobacz wszystkie opinie</span>
      </a>
    </div>
    
    {/* Reviews Grid */}
    {loading ? (
      <div className="reviews-loading">
        <div className="loading-spinner"></div>
        <p>Ładowanie opinii...</p>
      </div>
    ) : error ? (
      <div className="reviews-error">
        <p>{error}</p>
        <a 
          href="https://www.google.com/maps/place/Ania+Matusik+Personal+Trainer"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Zobacz opinie na Google
        </a>
      </div>
    ) : (
      <div className="reviews-grid">
        {reviews.slice(0, 6).map((review, index) => (
          <div 
            key={index}
            className="review-card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="review-header">
              <div className="reviewer-info">
                {review.profile_photo_url && (
                  <img 
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    className="reviewer-photo"
                  />
                )}
                <div className="reviewer-details">
                  <h3 className="reviewer-name">{review.author_name}</h3>
                  <p className="review-date">{formatDate(review.time)}</p>
                </div>
              </div>
              <div className="review-rating">
                {renderStars(review.rating)}
              </div>
            </div>
            
            <div className="review-text">
              {review.text}
            </div>
            
            {review.text.length > 200 && (
              <button 
                className="review-expand"
                onClick={() => toggleReview(index)}
              >
                Czytaj więcej
              </button>
            )}
          </div>
        ))}
      </div>
    )}
    
    {/* CTA */}
    <div className="reviews-cta">
      <p>Zostań kolejną osobą z sukcesem!</p>
      <a href="#contact" className="btn btn-primary btn-lg">
        Umów Bezpłatną Konsultację
      </a>
    </div>
    
  </div>
</div>
```

---

## CSS Styling

```css
.reviews-section {
  padding: 6rem 0;
  background: #ffffff;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 800ms ease-out, transform 800ms ease-out;
}

.reviews-section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Header */
.reviews-header {
  text-align: center;
  margin-bottom: 3rem;
}

.reviews-subtitle {
  font-size: 1.125rem;
  color: #5f626d;
  margin-top: 1rem;
}

/* Rating Summary */
.rating-summary {
  background: linear-gradient(135deg, #8c9bc0, #5f626d);
  color: #ffffff;
  padding: 3rem 2rem;
  border-radius: 16px;
  text-align: center;
  margin-bottom: 4rem;
  box-shadow: 0 8px 24px rgba(140, 155, 192, 0.3);
}

.rating-number {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #d9c2a6;
}

.rating-stars {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.star {
  color: rgba(255, 255, 255, 0.3);
  margin: 0 0.1rem;
}

.star.filled {
  color: #ff6e61;
}

.rating-count {
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
}

.google-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: #ffffff;
  color: #3a3c4a;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 250ms ease;
}

.google-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.google-badge img {
  height: 20px;
}

/* Reviews Grid */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.review-card {
  background: #f8f8f8;
  border-radius: 12px;
  padding: 2rem;
  border-left: 4px solid #8c9bc0;
  transition: all 350ms ease;
  opacity: 0;
  animation: fadeInUp 600ms ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(58, 60, 74, 0.15);
  background: #ffffff;
}

/* Review Header */
.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.reviewer-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.reviewer-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #8c9bc0;
}

.reviewer-details {
  flex: 1;
}

.reviewer-name {
  font-size: 1rem;
  font-weight: 600;
  color: #3a3c4a;
  margin-bottom: 0.25rem;
}

.review-date {
  font-size: 0.85rem;
  color: #5f626d;
  margin: 0;
}

.review-rating {
  font-size: 1.25rem;
}

.review-rating .star {
  color: #e0e0e0;
  margin: 0 0.05rem;
}

.review-rating .star.filled {
  color: #ff6e61;
}

/* Review Text */
.review-text {
  color: #5f626d;
  line-height: 1.7;
  font-size: 0.95rem;
  position: relative;
}

.review-text::before {
  content: '"';
  font-size: 3rem;
  color: rgba(140, 155, 192, 0.2);
  position: absolute;
  top: -15px;
  left: -10px;
  font-family: Georgia, serif;
}

.review-expand {
  background: none;
  border: none;
  color: #8c9bc0;
  font-weight: 500;
  cursor: pointer;
  margin-top: 0.75rem;
  padding: 0.5rem 0;
  transition: color 250ms ease;
}

.review-expand:hover {
  color: #ff6e61;
  text-decoration: underline;
}

/* Loading State */
.reviews-loading {
  text-align: center;
  padding: 4rem 2rem;
  color: #5f626d;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f8f8f8;
  border-top-color: #8c9bc0;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error State */
.reviews-error {
  text-align: center;
  padding: 3rem 2rem;
  background: #f8f8f8;
  border-radius: 12px;
}

.reviews-error p {
  color: #5f626d;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
}

/* CTA */
.reviews-cta {
  text-align: center;
  background: #f8f8f8;
  padding: 3rem 2rem;
  border-radius: 12px;
}

.reviews-cta p {
  font-size: 1.25rem;
  font-weight: 600;
  color: #3a3c4a;
  margin-bottom: 1.5rem;
}

.btn-lg {
  padding: 1.25rem 2.5rem;
  font-size: 1.125rem;
}

/* Responsive */
@media (max-width: 768px) {
  .reviews-section {
    padding: 4rem 0;
  }
  
  .rating-summary {
    padding: 2.5rem 1.5rem;
  }
  
  .rating-number {
    font-size: 3rem;
  }
  
  .reviews-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .review-card {
    padding: 1.5rem;
  }
  
  .review-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
```

---

## Utility Function: googleReviews.js

### File Location
`src/utils/googleReviews.js`

```javascript
/**
 * Fetch Google Reviews using Places API
 */
export const fetchGoogleReviews = async () => {
  const placeId = process.env.REACT_APP_PLACE_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

  try {
    // Option 1: Client-side fetch (may have CORS issues)
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(data.error_message || 'Unknown error');
    }

    return {
      reviews: data.result.reviews || [],
      rating: data.result.rating || 0,
      user_ratings_total: data.result.user_ratings_total || 0
    };

  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    throw error;
  }
};

/**
 * Format Unix timestamp to readable date
 */
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'wczoraj';
  if (diffDays < 7) return `${diffDays} dni temu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tygodni temu`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} miesięcy temu`;
  
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long'
  });
};
```

---

## Backend Service (Alternative Approach)

### File Location
`server/services/googleReviewsService.js`

```javascript
const axios = require('axios');

/**
 * Fetch reviews from Google Places API (server-side)
 */
const fetchGoogleReviews = async () => {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/details/json`;

  try {
    const response = await axios.get(url, {
      params: {
        place_id: placeId,
        fields: 'name,rating,reviews,user_ratings_total',
        key: apiKey,
        language: 'pl'
      }
    });

    if (response.data.status !== 'OK') {
      throw new Error(response.data.error_message);
    }

    return {
      reviews: response.data.result.reviews || [],
      rating: response.data.result.rating || 0,
      user_ratings_total: response.data.result.user_ratings_total || 0
    };

  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    throw error;
  }
};

module.exports = { fetchGoogleReviews };
```

### API Endpoint
`server/routes/reviews.js`

```javascript
const express = require('express');
const router = express.Router();
const { fetchGoogleReviews } = require('../services/googleReviewsService');

router.get('/', async (req, res) => {
  try {
    const data = await fetchGoogleReviews();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;
```

---

## Mock Data (For Testing)

```javascript
const mockReviews = {
  reviews: [
    {
      author_name: 'Anna Kowalska',
      rating: 5,
      text: 'Najlepszy trener jaki mogłam wybrać! Dzięki Ani schudłam 15kg i czuję się wspaniale. Polecam każdemu!',
      time: 1698768000,
      profile_photo_url: 'https://via.placeholder.com/50'
    },
    {
      author_name: 'Jan Nowak',
      rating: 5,
      text: 'Profesjonalne podejście, świetna atmosfera i widoczne efekty już po miesiącu. Ania to prawdziwy ekspert!',
      time: 1696176000,
      profile_photo_url: 'https://via.placeholder.com/50'
    },
    // ... more reviews
  ],
  rating: 4.9,
  user_ratings_total: 127
};
```

---

## Testing Checklist

- [ ] Reviews load from Google Places API
- [ ] Star ratings display correctly
- [ ] Average rating calculated correctly
- [ ] Review cards display with proper formatting
- [ ] Reviewer photos load (if available)
- [ ] Date formatting works correctly
- [ ] Loading state shows while fetching
- [ ] Error state displays if API fails
- [ ] "View all reviews" link works
- [ ] Responsive on all devices
- [ ] Animation on scroll works
- [ ] No API key exposed in frontend
- [ ] CORS issues resolved (if using backend)

---

**Implementation Priority:** MEDIUM  
**Dependencies:** Google Places API key, Place ID  
**Estimated Time:** 6-8 hours  
**Alternative:** Use backend proxy to avoid CORS
