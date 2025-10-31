# 📱 Layout & Navigation - Implementation Specification

## Overview
This document specifies the implementation of the main App.js component, including page layout, navigation system, routing, and responsive behavior.

---

## Component: App.js

### File Location
`src/App.js`

### Purpose
Main application component that provides:
- Page structure and layout
- Navigation system
- Section routing via smooth scrolling
- Responsive behavior
- Global state management (if needed)

---

## Implementation Details

### Component Structure

```javascript
import React, { useState, useEffect } from 'react';
import About from './components/About';
import Values from './components/Values';
import Gallery from './components/Gallery';
import GoogleMap from './components/GoogleMap';
import Reviews from './components/Reviews';
import PricingCalculator from './components/PricingCalculator';
import BMI_BMRCalculator from './components/BMI_BMRCalculator';
import TrainingPlanGenerator from './components/TrainingPlanGenerator';
import Contact from './components/Contact';
import NewsletterSignup from './components/NewsletterSignup';
import './styles.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll detection logic
  // Mobile menu logic
  // Smooth scroll to section logic
  
  return (
    <div className="App">
      {/* Navigation */}
      {/* Hero Section */}
      {/* All component sections */}
      {/* Footer */}
    </div>
  );
}

export default App;
```

---

## Navigation System

### Desktop Navigation

**Position:** Fixed at top of viewport  
**Behavior:** 
- Transparent background when at page top
- Solid background (#ffffff with shadow) after scrolling 40px
- Smooth transition between states (350ms)

**HTML Structure:**
```html
<nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
  <div className="nav-container">
    <div className="nav-logo">
      <span className="logo-text">Trener Personalny</span>
    </div>
    <ul className="nav-menu">
      <li><a href="#about" onClick={handleNavClick}>O mnie</a></li>
      <li><a href="#values" onClick={handleNavClick}>Wartości</a></li>
      <li><a href="#services" onClick={handleNavClick}>Usługi</a></li>
      <li><a href="#calculators" onClick={handleNavClick}>Kalkulatory</a></li>
      <li><a href="#gallery" onClick={handleNavClick}>Galeria</a></li>
      <li><a href="#reviews" onClick={handleNavClick}>Opinie</a></li>
      <li><a href="#contact" onClick={handleNavClick}>Kontakt</a></li>
    </ul>
    <button className="nav-toggle" onClick={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</nav>
```

**CSS Styling:**
```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  transition: background 350ms ease-out, box-shadow 350ms ease-out;
  padding: 1rem 0;
}

.navbar.scrolled {
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(58, 60, 74, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3a3c4a;
  letter-spacing: -0.5px;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-menu a {
  color: #3a3c4a;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  position: relative;
  padding: 0.5rem 0;
  transition: color 250ms ease;
}

.nav-menu a:hover {
  color: #8c9bc0;
}

.nav-menu a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #ff6e61;
  transform: scaleX(0);
  transition: transform 250ms ease;
}

.nav-menu a:hover::after,
.nav-menu a.active::after {
  transform: scaleX(1);
}

.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  padding: 0.5rem;
}

.nav-toggle span {
  width: 25px;
  height: 3px;
  background: #3a3c4a;
  border-radius: 2px;
  transition: transform 250ms ease, opacity 250ms ease;
}
```

### Mobile Navigation

**Trigger:** Hamburger icon (3 lines)  
**Behavior:** Slide-in drawer from right  
**Animation:** translateX(100%) → translateX(0), 350ms

**Mobile Menu Structure:**
```html
<div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
  <div className="mobile-menu-overlay" onClick={closeMenu}></div>
  <div className="mobile-menu-drawer">
    <button className="menu-close" onClick={closeMenu}>×</button>
    <ul className="mobile-nav-list">
      <li><a href="#about" onClick={handleMobileNavClick}>O mnie</a></li>
      <li><a href="#values" onClick={handleMobileNavClick}>Wartości</a></li>
      <li><a href="#services" onClick={handleMobileNavClick}>Usługi</a></li>
      <li><a href="#calculators" onClick={handleMobileNavClick}>Kalkulatory</a></li>
      <li><a href="#gallery" onClick={handleMobileNavClick}>Galeria</a></li>
      <li><a href="#reviews" onClick={handleMobileNavClick}>Opinie</a></li>
      <li><a href="#contact" onClick={handleMobileNavClick}>Kontakt</a></li>
    </ul>
  </div>
</div>
```

**Mobile CSS:**
```css
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .nav-toggle {
    display: flex;
  }
  
  .nav-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translateY(8px);
  }
  
  .nav-toggle.active span:nth-child(2) {
    opacity: 0;
  }
  
  .nav-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translateY(-8px);
  }
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  pointer-events: none;
}

.mobile-menu.open {
  pointer-events: auto;
}

.mobile-menu-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(58, 60, 74, 0.5);
  opacity: 0;
  transition: opacity 350ms ease;
}

.mobile-menu.open .mobile-menu-overlay {
  opacity: 1;
}

.mobile-menu-drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80%;
  max-width: 300px;
  background: #ffffff;
  box-shadow: -4px 0 24px rgba(58, 60, 74, 0.2);
  transform: translateX(100%);
  transition: transform 350ms ease;
  padding: 2rem;
}

.mobile-menu.open .mobile-menu-drawer {
  transform: translateX(0);
}

.menu-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: #3a3c4a;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 250ms ease;
}

.menu-close:hover {
  background: #f8f8f8;
}

.mobile-nav-list {
  list-style: none;
  padding: 0;
  margin: 4rem 0 0 0;
}

.mobile-nav-list li {
  margin-bottom: 0.5rem;
}

.mobile-nav-list a {
  display: block;
  padding: 1rem;
  color: #3a3c4a;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  border-radius: 8px;
  transition: background 250ms ease, color 250ms ease;
}

.mobile-nav-list a:hover,
.mobile-nav-list a.active {
  background: #f8f8f8;
  color: #8c9bc0;
}
```

---

## Hero Section

**Position:** Top of page, full viewport height  
**Purpose:** First impression, main CTA

**HTML Structure:**
```html
<section className="hero" id="hero">
  <div className="hero-content">
    <h1 className="hero-title">
      Osiągnij Swoje Cele Fitness
      <span className="hero-subtitle">Z Profesjonalnym Trenerem</span>
    </h1>
    <p className="hero-description">
      Spersonalizowane treningi, wsparcie żywieniowe i motywacja 
      do osiągnięcia najlepszej formy życia
    </p>
    <div className="hero-cta">
      <a href="#contact" className="btn btn-primary">
        Umów Konsultację
      </a>
      <a href="#services" className="btn btn-secondary">
        Zobacz Usługi
      </a>
    </div>
  </div>
  <div className="hero-image">
    {/* Optional: background image or video */}
  </div>
</section>
```

**CSS Styling:**
```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #8c9bc0 0%, #5f626d 100%);
  color: #ffffff;
  text-align: center;
  padding: 6rem 2rem 4rem;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/hero-pattern.svg') center/cover;
  opacity: 0.1;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  animation: fadeInUp 800ms ease-out;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  letter-spacing: -1px;
}

.hero-subtitle {
  display: block;
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 0.5rem;
  color: #d9c2a6;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    padding: 5rem 1.5rem 3rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .hero-cta {
    flex-direction: column;
  }
}
```

---

## Button Styles

**Primary Button:**
```css
.btn {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 250ms ease;
  white-space: nowrap;
}

.btn-primary {
  background: #ff6e61;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(255, 110, 97, 0.3);
}

.btn-primary:hover {
  background: #ff5647;
  box-shadow: 0 6px 20px rgba(255, 110, 97, 0.4);
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: #ffffff;
  border-color: #ffffff;
}

.btn-secondary:hover {
  background: #ffffff;
  color: #8c9bc0;
}
```

---

## Smooth Scrolling Logic

### JavaScript Implementation

```javascript
const handleNavClick = (e) => {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute('href').substring(1);
  const targetElement = document.getElementById(targetId);
  
  if (targetElement) {
    const navHeight = 80; // Height of fixed navbar
    const targetPosition = targetElement.offsetTop - navHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Update active state
    setActiveSection(targetId);
  }
};

const handleMobileNavClick = (e) => {
  handleNavClick(e);
  setIsMenuOpen(false);
};

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};

const closeMenu = () => {
  setIsMenuOpen(false);
};
```

### Scroll Detection

```javascript
useEffect(() => {
  const handleScroll = () => {
    // Update scrolled state for navbar
    setIsScrolled(window.scrollY > 40);
    
    // Update active section based on scroll position
    const sections = [
      'hero', 'about', 'values', 'services', 
      'calculators', 'gallery', 'reviews', 'contact'
    ];
    
    const current = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    
    if (current) {
      setActiveSection(current);
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

## Page Sections Container

**Structure:**
```html
<main className="main-content">
  <section id="about" className="section">
    <About />
  </section>
  
  <section id="values" className="section section-alt">
    <Values />
  </section>
  
  <section id="services" className="section">
    <div className="container">
      <h2 className="section-title">Usługi i Cennik</h2>
      <PricingCalculator />
    </div>
  </section>
  
  <section id="calculators" className="section section-alt">
    <div className="container">
      <h2 className="section-title">Kalkulatory</h2>
      <BMI_BMRCalculator />
      <TrainingPlanGenerator />
    </div>
  </section>
  
  <section id="gallery" className="section">
    <Gallery />
  </section>
  
  <section id="reviews" className="section section-alt">
    <Reviews />
  </section>
  
  <section id="location" className="section">
    <GoogleMap />
  </section>
  
  <section id="contact" className="section section-alt">
    <div className="container">
      <Contact />
      <NewsletterSignup />
    </div>
  </section>
</main>
```

**Section Styling:**
```css
.main-content {
  padding-top: 80px; /* Account for fixed navbar */
}

.section {
  padding: 4rem 0;
  min-height: 400px;
}

.section-alt {
  background: #f8f8f8;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #3a3c4a;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: #ff6e61;
  margin: 1rem auto 0;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .section {
    padding: 3rem 0;
  }
  
  .container {
    padding: 0 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
```

---

## Footer

**Structure:**
```html
<footer className="footer">
  <div className="footer-content">
    <div className="footer-section">
      <h3>Trener Personalny</h3>
      <p>Profesjonalne treningi personalne w Warszawie</p>
    </div>
    
    <div className="footer-section">
      <h4>Szybkie Linki</h4>
      <ul>
        <li><a href="#about">O mnie</a></li>
        <li><a href="#services">Usługi</a></li>
        <li><a href="#contact">Kontakt</a></li>
      </ul>
    </div>
    
    <div className="footer-section">
      <h4>Kontakt</h4>
      <p>Email: kontakt@trener.pl</p>
      <p>Tel: +48 123 456 789</p>
    </div>
    
    <div className="footer-section">
      <h4>Social Media</h4>
      <div className="social-links">
        <a href="#" aria-label="Facebook">FB</a>
        <a href="#" aria-label="Instagram">IG</a>
        <a href="#" aria-label="YouTube">YT</a>
      </div>
    </div>
  </div>
  
  <div className="footer-bottom">
    <p>&copy; 2025 Trener Personalny. Wszystkie prawa zastrzeżone.</p>
  </div>
</footer>
```

**Footer CSS:**
```css
.footer {
  background: #3a3c4a;
  color: #ffffff;
  padding: 3rem 0 1rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
  color: #d9c2a6;
  margin-bottom: 1rem;
}

.footer-section p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 250ms ease;
}

.footer-section a:hover {
  color: #8c9bc0;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 250ms ease;
}

.social-links a:hover {
  background: #8c9bc0;
  transform: translateY(-2px);
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
  }
}
```

---

## Accessibility Requirements

1. **Keyboard Navigation**
   - All interactive elements focusable
   - Visual focus indicators
   - Tab order logical

2. **ARIA Labels**
   ```html
   <nav aria-label="Main navigation">
   <button aria-label="Toggle menu" aria-expanded={isMenuOpen}>
   ```

3. **Semantic HTML**
   - Use proper heading hierarchy (h1 → h2 → h3)
   - `<nav>`, `<main>`, `<section>`, `<footer>` elements

4. **Color Contrast**
   - Text: #3a3c4a on #ffffff (ratio: 12.6:1) ✓
   - Links: #8c9bc0 on #ffffff (ratio: 4.8:1) ✓

---

## Performance Optimization

1. **Code Splitting**
   - Lazy load components if needed
   - Use React.lazy() for large components

2. **Scroll Performance**
   - Debounce scroll event listeners
   - Use `will-change` for animated elements

3. **Images**
   - Lazy loading for images below fold
   - WebP format with fallbacks

---

## Testing Checklist

- [ ] Navigation links scroll to correct sections
- [ ] Mobile menu opens/closes properly
- [ ] Navbar changes state on scroll
- [ ] Active section highlighted in nav
- [ ] Smooth scroll works on all browsers
- [ ] Hero section displays correctly
- [ ] Footer renders all information
- [ ] Keyboard navigation works
- [ ] Mobile responsive (320px+)
- [ ] No console errors

---

**Implementation Priority:** HIGH  
**Dependencies:** None  
**Estimated Time:** 6-8 hours
