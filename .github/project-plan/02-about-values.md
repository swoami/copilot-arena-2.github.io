# 📖 About & Values Sections - Implementation Specification

## Overview
This document specifies the implementation of the About.js and Values.js components, which introduce the personal trainer and communicate core business values.

---

## Component: About.js

### File Location
`src/components/About.js`

### Purpose
Introduce the personal trainer, establish credibility, and build trust with potential clients through:
- Personal story and background
- Credentials and certifications
- Professional experience
- Mission statement

---

## About Component Implementation

### Component Structure

```javascript
import React, { useEffect, useRef, useState } from 'react';
import '../styles.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className={`about-section ${isVisible ? 'visible' : ''}`}
    >
      {/* Content here */}
    </div>
  );
};

export default About;
```

### HTML Structure

```html
<div className="about-section">
  <div className="container">
    <div className="about-grid">
      
      {/* Left Side - Image */}
      <div className="about-image-wrapper">
        <div className="about-image">
          <img 
            src="/public/trainer-photo.jpg" 
            alt="Ania Matusik - Trener Personalny"
            loading="lazy"
          />
          <div className="image-decoration"></div>
        </div>
        <div className="credentials-badge">
          <span className="badge-icon">🏆</span>
          <span className="badge-text">Certyfikowany Trener</span>
        </div>
      </div>
      
      {/* Right Side - Content */}
      <div className="about-content">
        <h2 className="section-heading">
          O Mnie
          <span className="heading-decoration"></span>
        </h2>
        
        <p className="about-intro">
          Jestem <strong>Ania Matusik</strong> - certyfikowanym trenerem 
          personalnym z pasją do pomagania ludziom w osiąganiu ich celów fitness.
        </p>
        
        <p className="about-text">
          Od ponad 8 lat pomagam klientom transformować swoje ciała i życie 
          poprzez spersonalizowane programy treningowe i wsparcie żywieniowe. 
          Wierzę, że każdy zasługuje na najlepszą wersję siebie.
        </p>
        
        <div className="about-highlights">
          <div className="highlight-item">
            <div className="highlight-icon">💪</div>
            <div className="highlight-content">
              <h3>500+</h3>
              <p>Zadowolonych Klientów</p>
            </div>
          </div>
          
          <div className="highlight-item">
            <div className="highlight-icon">⭐</div>
            <div className="highlight-content">
              <h3>8 Lat</h3>
              <p>Doświadczenia</p>
            </div>
          </div>
          
          <div className="highlight-item">
            <div className="highlight-icon">🎓</div>
            <div className="highlight-content">
              <h3>15+</h3>
              <p>Certyfikatów</p>
            </div>
          </div>
        </div>
        
        <div className="certifications">
          <h3 className="certifications-title">Certyfikaty i Kwalifikacje</h3>
          <ul className="certifications-list">
            <li>Certyfikowany Trener Personalny (ACE)</li>
            <li>Specjalista ds. Żywienia Sportowego</li>
            <li>Instruktor Funkcjonalnego Treningu</li>
            <li>Trener Rehabilitacji Sportowej</li>
          </ul>
        </div>
        
        <div className="about-cta">
          <a href="#contact" className="btn btn-primary">
            Zacznij Swoją Transformację
          </a>
        </div>
      </div>
      
    </div>
  </div>
</div>
```

### CSS Styling

```css
.about-section {
  padding: 6rem 0;
  background: #ffffff;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 800ms ease-out, transform 800ms ease-out;
}

.about-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

/* Left Side - Image */
.about-image-wrapper {
  position: relative;
}

.about-image {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(58, 60, 74, 0.15);
}

.about-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 500ms ease;
}

.about-image:hover img {
  transform: scale(1.05);
}

.image-decoration {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #ff6e61, #d9c2a6);
  border-radius: 12px;
  z-index: -1;
  opacity: 0.3;
}

.credentials-badge {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: #ffffff;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(58, 60, 74, 0.2);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.badge-icon {
  font-size: 1.5rem;
}

.badge-text {
  font-weight: 600;
  color: #3a3c4a;
  font-size: 0.95rem;
}

/* Right Side - Content */
.about-content {
  padding: 2rem 0;
}

.section-heading {
  font-size: 2.5rem;
  font-weight: 700;
  color: #3a3c4a;
  margin-bottom: 1.5rem;
  position: relative;
}

.heading-decoration {
  display: block;
  width: 60px;
  height: 4px;
  background: #ff6e61;
  margin-top: 1rem;
  border-radius: 2px;
}

.about-intro {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #3a3c4a;
  margin-bottom: 1.5rem;
}

.about-intro strong {
  color: #8c9bc0;
  font-weight: 600;
}

.about-text {
  font-size: 1rem;
  line-height: 1.8;
  color: #5f626d;
  margin-bottom: 2rem;
}

/* Highlights */
.about-highlights {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2.5rem 0;
}

.highlight-item {
  background: linear-gradient(135deg, #f8f8f8, #ffffff);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(140, 155, 192, 0.2);
  transition: all 250ms ease;
}

.highlight-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(140, 155, 192, 0.2);
}

.highlight-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.highlight-content h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #ff6e61;
  margin-bottom: 0.25rem;
}

.highlight-content p {
  font-size: 0.9rem;
  color: #5f626d;
  margin: 0;
}

/* Certifications */
.certifications {
  background: #f8f8f8;
  padding: 2rem;
  border-radius: 8px;
  border-left: 4px solid #8c9bc0;
  margin: 2rem 0;
}

.certifications-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #3a3c4a;
  margin-bottom: 1rem;
}

.certifications-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.certifications-list li {
  padding: 0.5rem 0;
  color: #5f626d;
  position: relative;
  padding-left: 1.5rem;
}

.certifications-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #8c9bc0;
  font-weight: bold;
}

/* CTA */
.about-cta {
  margin-top: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .about-image-wrapper {
    order: -1;
  }
  
  .section-heading {
    font-size: 2rem;
  }
  
  .about-highlights {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .highlight-item {
    padding: 1rem;
  }
  
  .highlight-content h3 {
    font-size: 1.5rem;
  }
}
```

---

## Component: Values.js

### File Location
`src/components/Values.js`

### Purpose
Communicate core business values and differentiators that set the trainer apart from competitors.

---

## Values Component Implementation

### Component Structure

```javascript
import React, { useEffect, useRef, useState } from 'react';
import '../styles.css';

const Values = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      id: 1,
      icon: '🎯',
      title: 'Indywidualne Podejście',
      description: 'Każdy plan treningowy jest stworzony specjalnie dla Ciebie, uwzględniając Twoje cele, możliwości i ograniczenia.'
    },
    {
      id: 2,
      icon: '💡',
      title: 'Edukacja',
      description: 'Uczę nie tylko jak ćwiczyć, ale dlaczego. Zdobędziesz wiedzę, która pozwoli Ci na długotrwałe rezultaty.'
    },
    {
      id: 3,
      icon: '🤝',
      title: 'Wsparcie',
      description: 'Jestem z Tobą na każdym kroku - od pierwszego treningu po osiągnięcie wymarzonej sylwetki.'
    },
    {
      id: 4,
      icon: '📈',
      title: 'Mierzalne Rezultaty',
      description: 'Regularnie monitorujemy postępy i dostosowujemy plan, aby maksymalizować efekty.'
    },
    {
      id: 5,
      icon: '❤️',
      title: 'Zdrowie Przede Wszystkim',
      description: 'Nie chodzi tylko o wygląd - priorytetem jest Twoje zdrowie i dobre samopoczucie.'
    },
    {
      id: 6,
      icon: '⚡',
      title: 'Motywacja',
      description: 'Zapewniam nieustanne wsparcie motywacyjne i pomoc w przełamywaniu barier psychicznych.'
    }
  ];

  return (
    <div 
      ref={sectionRef} 
      className={`values-section ${isVisible ? 'visible' : ''}`}
    >
      {/* Content */}
    </div>
  );
};

export default Values;
```

### HTML Structure

```html
<div className="values-section">
  <div className="container">
    <div className="values-header">
      <h2 className="section-heading centered">
        Dlaczego Warto Ze Mną Trenować
        <span className="heading-decoration-center"></span>
      </h2>
      <p className="values-subtitle">
        Moja filozofia pracy opiera się na wartościach, które gwarantują 
        najlepsze rezultaty i satysfakcję z procesu transformacji
      </p>
    </div>
    
    <div className="values-grid">
      {values.map((value, index) => (
        <div 
          key={value.id}
          className={`value-card ${activeCard === value.id ? 'active' : ''}`}
          onMouseEnter={() => setActiveCard(value.id)}
          onMouseLeave={() => setActiveCard(null)}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="value-icon">{value.icon}</div>
          <h3 className="value-title">{value.title}</h3>
          <p className="value-description">{value.description}</p>
          <div className="value-decoration"></div>
        </div>
      ))}
    </div>
    
    <div className="values-footer">
      <div className="mission-statement">
        <h3>Moja Misja</h3>
        <p>
          „Pomagam ludziom odkryć ich potencjał i osiągnąć cele, 
          które wcześniej wydawały się niemożliwe. Wierzę, że z odpowiednim 
          wsparciem i planem każdy może dokonać niesamowitej transformacji."
        </p>
        <div className="signature">- Ania Matusik</div>
      </div>
    </div>
  </div>
</div>
```

### CSS Styling

```css
.values-section {
  padding: 6rem 0;
  background: #f8f8f8;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 800ms ease-out, transform 800ms ease-out;
}

.values-section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Header */
.values-header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.section-heading.centered {
  text-align: center;
}

.heading-decoration-center {
  display: block;
  width: 60px;
  height: 4px;
  background: #ff6e61;
  margin: 1rem auto 0;
  border-radius: 2px;
}

.values-subtitle {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #5f626d;
  margin-top: 1.5rem;
}

/* Values Grid */
.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.value-card {
  background: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 350ms ease;
  opacity: 0;
  animation: fadeInUp 600ms ease-out forwards;
  box-shadow: 0 2px 8px rgba(58, 60, 74, 0.08);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}

.value-card:hover,
.value-card.active {
  transform: translateY(-10px);
  box-shadow: 0 12px 32px rgba(140, 155, 192, 0.25);
}

.value-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #8c9bc0, #ff6e61);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 350ms ease;
}

.value-card:hover .value-decoration,
.value-card.active .value-decoration {
  transform: scaleX(1);
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: inline-block;
  transition: transform 250ms ease;
}

.value-card:hover .value-icon,
.value-card.active .value-icon {
  transform: scale(1.2) rotate(5deg);
}

.value-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #3a3c4a;
  margin-bottom: 1rem;
}

.value-description {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #5f626d;
  margin: 0;
}

/* Mission Statement */
.values-footer {
  display: flex;
  justify-content: center;
}

.mission-statement {
  background: linear-gradient(135deg, #8c9bc0, #5f626d);
  color: #ffffff;
  padding: 3rem;
  border-radius: 12px;
  max-width: 800px;
  text-align: center;
  position: relative;
  box-shadow: 0 8px 24px rgba(58, 60, 74, 0.2);
}

.mission-statement::before {
  content: '"';
  position: absolute;
  top: -20px;
  left: 30px;
  font-size: 6rem;
  color: rgba(255, 255, 255, 0.2);
  font-family: Georgia, serif;
  line-height: 1;
}

.mission-statement h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #d9c2a6;
}

.mission-statement p {
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.signature {
  font-size: 1.125rem;
  font-weight: 600;
  color: #d9c2a6;
  margin-top: 1rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .values-section {
    padding: 4rem 0;
  }
  
  .values-header {
    margin-bottom: 3rem;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .value-card {
    padding: 2rem 1.5rem;
  }
  
  .mission-statement {
    padding: 2rem 1.5rem;
  }
  
  .mission-statement::before {
    font-size: 4rem;
    top: -10px;
    left: 20px;
  }
  
  .mission-statement p {
    font-size: 1rem;
  }
}
```

---

## Animation Specifications

### Fade In on Scroll
- **Trigger:** Section enters viewport (20% visible)
- **Duration:** 800ms
- **Easing:** ease-out
- **Effect:** Opacity 0→1, translateY(30px)→0

### Card Stagger Animation
- **Effect:** Cards fade in sequentially
- **Delay:** 100ms per card
- **Duration:** 600ms per card

### Hover Effects
- **Card Lift:** translateY(0)→translateY(-10px), 350ms
- **Shadow Increase:** Subtle to prominent
- **Icon Animation:** Scale 1→1.2 + rotate 5deg
- **Top Border:** Scale from 0→1

### Floating Badge
- **Animation:** Continuous up-down motion
- **Duration:** 3s infinite
- **Range:** 10px vertical movement

---

## Content Guidelines

### About Section Content
- **Tone:** Professional but approachable
- **Length:** 150-250 words
- **Focus:** Credentials, experience, client results
- **Language:** Polish (formal "you")

### Values Section Content
- **Number of Values:** 6 (displayed in 3x2 grid)
- **Each Value:** Icon + Title + 1-2 sentences
- **Mission Statement:** 2-3 sentences, inspiring
- **Language:** Polish

---

## Accessibility Requirements

1. **Images:**
   - Alt text: "Ania Matusik - Trener Personalny"
   - Lazy loading for performance

2. **Headings:**
   - H2 for main section titles
   - H3 for subsections
   - Logical hierarchy

3. **Focus States:**
   - Visible focus indicators on interactive elements
   - Keyboard navigation support

4. **Color Contrast:**
   - Text on white background: #3a3c4a (12.6:1 ratio)
   - Text on colored background: #ffffff (verified contrast)

---

## Data Requirements

### About Section
- Trainer photo (high-quality, professional)
- Certifications list (from client)
- Experience metrics (years, clients, etc.)

### Values Section
- 6 core values with descriptions
- Mission statement quote
- Icons (emoji or custom SVG)

---

## Testing Checklist

- [ ] Sections appear with scroll animation
- [ ] Images load correctly
- [ ] Hover effects work smoothly
- [ ] Value cards animate in sequence
- [ ] Mission statement displays correctly
- [ ] Mobile layout switches properly
- [ ] All text is readable
- [ ] No console errors
- [ ] Accessibility: keyboard navigation works
- [ ] Accessibility: screen reader compatible

---

**Implementation Priority:** HIGH  
**Dependencies:** None  
**Estimated Time:** 6-8 hours  
**Assets Needed:** Trainer photo, certification logos (optional)
