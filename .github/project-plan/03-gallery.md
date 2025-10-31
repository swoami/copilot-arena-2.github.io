# 🖼 Gallery Component - Implementation Specification

## Overview
This document specifies the implementation of the Gallery.js component, which displays a portfolio of images showcasing the trainer's work, facilities, and client transformations.

---

## Component: Gallery.js

### File Location
`src/components/Gallery.js`

### Purpose
Display an attractive image gallery featuring:
- Training facility photos
- Training session photos
- Before/after client transformations (with consent)
- Equipment and amenities
- Group training sessions

---

## Implementation Details

### Component Structure

```javascript
import React, { useState, useEffect, useRef } from 'react';
import '../styles.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Load images from public folder
    loadImages();
    
    // Intersection Observer for scroll animation
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

  const loadImages = () => {
    // Array of image objects with metadata
    const galleryImages = [
      { id: 1, src: '/gallery/image1.jpg', category: 'facility', alt: 'Siłownia - widok główny' },
      { id: 2, src: '/gallery/image2.jpg', category: 'training', alt: 'Sesja treningowa' },
      { id: 3, src: '/gallery/image3.jpg', category: 'transformation', alt: 'Transformacja klienta' },
      // ... more images
    ];
    setImages(galleryImages);
  };

  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div ref={sectionRef} className={`gallery-section ${isVisible ? 'visible' : ''}`}>
      {/* Gallery content */}
      {selectedImage && <Lightbox />}
    </div>
  );
};

export default Gallery;
```

---

## HTML Structure

```html
<div className="gallery-section">
  <div className="container">
    
    {/* Header */}
    <div className="gallery-header">
      <h2 className="section-heading centered">
        Galeria
        <span className="heading-decoration-center"></span>
      </h2>
      <p className="gallery-subtitle">
        Zobacz naszą siłownię, zaplecze treningowe i efekty pracy z klientami
      </p>
    </div>
    
    {/* Filter Tabs */}
    <div className="gallery-filters">
      <button 
        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        onClick={() => setFilter('all')}
      >
        Wszystkie
      </button>
      <button 
        className={`filter-btn ${filter === 'facility' ? 'active' : ''}`}
        onClick={() => setFilter('facility')}
      >
        Siłownia
      </button>
      <button 
        className={`filter-btn ${filter === 'training' ? 'active' : ''}`}
        onClick={() => setFilter('training')}
      >
        Treningi
      </button>
      <button 
        className={`filter-btn ${filter === 'transformation' ? 'active' : ''}`}
        onClick={() => setFilter('transformation')}
      >
        Transformacje
      </button>
    </div>
    
    {/* Image Grid */}
    <div className="gallery-grid">
      {filteredImages.map((image, index) => (
        <div 
          key={image.id}
          className="gallery-item"
          style={{ animationDelay: `${index * 50}ms` }}
          onClick={() => openLightbox(image)}
        >
          <img 
            src={image.src} 
            alt={image.alt}
            loading="lazy"
          />
          <div className="gallery-overlay">
            <span className="overlay-icon">🔍</span>
            <span className="overlay-text">Zobacz pełny rozmiar</span>
          </div>
        </div>
      ))}
    </div>
    
    {/* Empty State */}
    {filteredImages.length === 0 && (
      <div className="gallery-empty">
        <p>Brak zdjęć w tej kategorii</p>
      </div>
    )}
    
  </div>
</div>

{/* Lightbox Modal */}
{selectedImage && (
  <div className="lightbox" onClick={closeLightbox}>
    <button className="lightbox-close" onClick={closeLightbox}>×</button>
    
    <button 
      className="lightbox-nav lightbox-prev" 
      onClick={(e) => {
        e.stopPropagation();
        navigateImage('prev');
      }}
    >
      ‹
    </button>
    
    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
      <img 
        src={selectedImage.src} 
        alt={selectedImage.alt}
      />
      <p className="lightbox-caption">{selectedImage.alt}</p>
    </div>
    
    <button 
      className="lightbox-nav lightbox-next" 
      onClick={(e) => {
        e.stopPropagation();
        navigateImage('next');
      }}
    >
      ›
    </button>
  </div>
)}
```

---

## CSS Styling

```css
.gallery-section {
  padding: 6rem 0;
  background: #ffffff;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 800ms ease-out, transform 800ms ease-out;
}

.gallery-section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Header */
.gallery-header {
  text-align: center;
  margin-bottom: 3rem;
}

.gallery-subtitle {
  font-size: 1.125rem;
  color: #5f626d;
  margin-top: 1rem;
}

/* Filters */
.gallery-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #8c9bc0;
  background: transparent;
  color: #3a3c4a;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 250ms ease;
}

.filter-btn:hover {
  background: rgba(140, 155, 192, 0.1);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: #8c9bc0;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(140, 155, 192, 0.3);
}

/* Gallery Grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  aspect-ratio: 1 / 1;
  opacity: 0;
  animation: fadeInScale 500ms ease-out forwards;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 500ms ease;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(58, 60, 74, 0) 0%,
    rgba(58, 60, 74, 0.8) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 2rem;
  opacity: 0;
  transition: opacity 350ms ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.overlay-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  transform: translateY(20px);
  transition: transform 350ms ease;
}

.gallery-item:hover .overlay-icon {
  transform: translateY(0);
}

.overlay-text {
  color: #ffffff;
  font-weight: 500;
  font-size: 0.95rem;
  transform: translateY(20px);
  transition: transform 350ms ease 50ms;
}

.gallery-item:hover .overlay-text {
  transform: translateY(0);
}

/* Empty State */
.gallery-empty {
  text-align: center;
  padding: 4rem 2rem;
  color: #5f626d;
  font-size: 1.125rem;
}

/* Lightbox */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(58, 60, 74, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 300ms ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.lightbox-content {
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: zoomIn 350ms ease-out;
}

@keyframes zoomIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.lightbox-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.lightbox-caption {
  color: #ffffff;
  margin-top: 1rem;
  font-size: 1rem;
  text-align: center;
}

.lightbox-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #ffffff;
  color: #ffffff;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 250ms ease;
  z-index: 10000;
}

.lightbox-close:hover {
  background: #ffffff;
  color: #3a3c4a;
  transform: rotate(90deg);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #ffffff;
  color: #ffffff;
  font-size: 3rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 250ms ease;
  z-index: 10000;
}

.lightbox-prev {
  left: 2rem;
}

.lightbox-next {
  right: 2rem;
}

.lightbox-nav:hover {
  background: #ffffff;
  color: #3a3c4a;
  transform: translateY(-50%) scale(1.1);
}

/* Keyboard Support */
.lightbox-nav:focus,
.lightbox-close:focus {
  outline: 2px solid #ff6e61;
  outline-offset: 4px;
}

/* Responsive */
@media (max-width: 768px) {
  .gallery-section {
    padding: 4rem 0;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .gallery-filters {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }
  
  .lightbox {
    padding: 1rem;
  }
  
  .lightbox-close {
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
  
  .lightbox-nav {
    width: 50px;
    height: 50px;
    font-size: 2rem;
  }
  
  .lightbox-prev {
    left: 1rem;
  }
  
  .lightbox-next {
    right: 1rem;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Additional JavaScript Features

### Keyboard Navigation

```javascript
useEffect(() => {
  if (!selectedImage) return;
  
  const handleKeyPress = (e) => {
    switch(e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigateImage('prev');
        break;
      case 'ArrowRight':
        navigateImage('next');
        break;
      default:
        break;
    }
  };
  
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [selectedImage]);
```

### Touch/Swipe Support (Optional Enhancement)

```javascript
// Add to component for mobile swipe
const [touchStart, setTouchStart] = useState(null);
const [touchEnd, setTouchEnd] = useState(null);

const minSwipeDistance = 50;

const onTouchStart = (e) => {
  setTouchEnd(null);
  setTouchStart(e.targetTouches[0].clientX);
};

const onTouchMove = (e) => {
  setTouchEnd(e.targetTouches[0].clientX);
};

const onTouchEnd = () => {
  if (!touchStart || !touchEnd) return;
  
  const distance = touchStart - touchEnd;
  const isLeftSwipe = distance > minSwipeDistance;
  const isRightSwipe = distance < -minSwipeDistance;
  
  if (isLeftSwipe) {
    navigateImage('next');
  }
  if (isRightSwipe) {
    navigateImage('prev');
  }
};
```

---

## Image Organization

### Folder Structure
```
public/
  gallery/
    facility/
      gym-main.jpg
      equipment-1.jpg
      equipment-2.jpg
    training/
      session-1.jpg
      session-2.jpg
      group-training.jpg
    transformations/
      before-after-1.jpg
      before-after-2.jpg
```

### Image Requirements
- **Format:** JPG or WebP
- **Size:** Max 1920px width
- **Optimization:** Compressed (under 500KB per image)
- **Aspect Ratio:** 1:1 (square) preferred
- **File Naming:** Descriptive, lowercase, hyphenated

### Sample Image Array
```javascript
const galleryImages = [
  // Facility
  { id: 1, src: '/gallery/facility/gym-main.jpg', category: 'facility', alt: 'Główna strefa treningowa' },
  { id: 2, src: '/gallery/facility/equipment-1.jpg', category: 'facility', alt: 'Nowoczesny sprzęt treningowy' },
  { id: 3, src: '/gallery/facility/cardio-zone.jpg', category: 'facility', alt: 'Strefa cardio' },
  
  // Training
  { id: 4, src: '/gallery/training/personal-session.jpg', category: 'training', alt: 'Sesja treningowa 1 na 1' },
  { id: 5, src: '/gallery/training/group-class.jpg', category: 'training', alt: 'Trening grupowy' },
  { id: 6, src: '/gallery/training/functional.jpg', category: 'training', alt: 'Trening funkcjonalny' },
  
  // Transformations
  { id: 7, src: '/gallery/transformations/client-1.jpg', category: 'transformation', alt: 'Transformacja - 3 miesiące' },
  { id: 8, src: '/gallery/transformations/client-2.jpg', category: 'transformation', alt: 'Transformacja - 6 miesięcy' },
];
```

---

## Animation Specifications

### Gallery Items
- **Entry Animation:** fadeInScale, 500ms
- **Stagger:** 50ms delay per item
- **Hover Scale:** Image scales to 1.1, 500ms
- **Overlay Fade:** Opacity 0→1, 350ms

### Lightbox
- **Open:** fadeIn background + zoomIn content, 300-350ms
- **Navigation:** Smooth image swap
- **Close:** Reverse of open animation

### Filter Change
- **Effect:** Current items fade out, new items fade in
- **Duration:** 300ms fade out, 500ms fade in
- **Stagger:** Maintained on new items

---

## Accessibility Requirements

1. **ARIA Labels:**
```html
<div role="region" aria-label="Galeria zdjęć">
<button aria-label="Zamknij podgląd">×</button>
<button aria-label="Poprzednie zdjęcie">‹</button>
<button aria-label="Następne zdjęcie">›</button>
```

2. **Keyboard Support:**
   - Tab: Navigate through images
   - Enter/Space: Open lightbox
   - Escape: Close lightbox
   - Arrow keys: Navigate in lightbox

3. **Alt Text:**
   - Descriptive alt text for every image
   - Polish language

4. **Focus Management:**
   - Trap focus in lightbox when open
   - Return focus to trigger element on close

---

## Performance Optimization

1. **Lazy Loading:**
   - Use `loading="lazy"` on all images
   - Only load visible images

2. **Image Optimization:**
   - Use WebP with JPG fallback
   - Responsive images with srcset
   - Proper compression

3. **Virtual Scrolling (if many images):**
   - Only render visible images
   - Unload off-screen images

---

## Testing Checklist

- [ ] Images load correctly from public folder
- [ ] Filter buttons work and filter images
- [ ] Gallery grid is responsive
- [ ] Lightbox opens on image click
- [ ] Lightbox close button works
- [ ] Arrow navigation works in lightbox
- [ ] Keyboard navigation works (arrows, escape)
- [ ] Touch/swipe works on mobile (if implemented)
- [ ] Animations are smooth (60fps)
- [ ] Empty state shows when no images match filter
- [ ] Images are lazy-loaded
- [ ] Alt text is present and descriptive
- [ ] No layout shift on image load
- [ ] Works on mobile, tablet, desktop

---

**Implementation Priority:** MEDIUM  
**Dependencies:** Images in public/gallery folder  
**Estimated Time:** 8-10 hours  
**Assets Needed:** 9-15 high-quality images
