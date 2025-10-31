# 💰 Pricing Calculator - Implementation Specification

## Overview
This document specifies the implementation of the PricingCalculator.js component, which helps potential clients estimate the cost of personal training services.

---

## Component: PricingCalculator.js

### File Location
`src/components/PricingCalculator.js`

### Purpose
Interactive pricing calculator that:
- Shows available service packages
- Calculates total cost based on selections
- Displays pricing transparency
- Encourages contact for custom packages

---

## Pricing Structure

### Service Packages

```javascript
const pricingOptions = {
  packageType: [
    { id: 'single', name: 'Pojedyncza Sesja', price: 150 },
    { id: 'monthly-4', name: 'Pakiet Miesięczny (4 sesje)', price: 550 },
    { id: 'monthly-8', name: 'Pakiet Miesięczny (8 sesji)', price: 1000 },
    { id: 'monthly-12', name: 'Pakiet Miesięczny (12 sesji)', price: 1400 },
    { id: 'quarterly', name: 'Pakiet Kwartalny (36 sesji)', price: 3900 }
  ],
  
  sessionType: [
    { id: 'personal', name: 'Indywidualne', multiplier: 1.0 },
    { id: 'pair', name: 'Dla Dwojga', multiplier: 0.75 },
    { id: 'group', name: 'Grupowe (3-5 osób)', multiplier: 0.6 }
  ],
  
  extras: [
    { id: 'nutrition', name: 'Plan Żywieniowy', price: 200 },
    { id: 'online', name: 'Wsparcie Online', price: 150 },
    { id: 'measurements', name: 'Analiza Składu Ciała', price: 100 }
  ]
};
```

---

## Implementation Details

### Component Structure

```javascript
import React, { useState } from 'react';
import '../styles.css';

const PricingCalculator = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedType, setSelectedType] = useState('personal');
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const calculateTotal = () => {
    if (!selectedPackage) return 0;
    
    const packagePrice = selectedPackage.price;
    const typeMultiplier = pricingOptions.sessionType.find(
      t => t.id === selectedType
    ).multiplier;
    const sessionCost = packagePrice * typeMultiplier;
    
    const extrasTotal = selectedExtras.reduce((sum, extraId) => {
      const extra = pricingOptions.extras.find(e => e.id === extraId);
      return sum + (extra?.price || 0);
    }, 0);
    
    return sessionCost + extrasTotal;
  };

  const toggleExtra = (extraId) => {
    setSelectedExtras(prev => 
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const total = calculateTotal();
  const savings = selectedPackage && selectedPackage.id !== 'single'
    ? (150 * getSessionCount(selectedPackage.id)) - selectedPackage.price
    : 0;

  return (
    <div className="pricing-calculator">
      {/* Calculator content */}
    </div>
  );
};

export default PricingCalculator;
```

---

## HTML Structure

```html
<div className="pricing-calculator">
  <div className="calculator-container">
    
    {/* Calculator Header */}
    <div className="calculator-header">
      <h3>Kalkulator Cenowy</h3>
      <p>Dopasuj pakiet do swoich potrzeb i zobacz szacunkową cenę</p>
    </div>
    
    {/* Step 1: Package Selection */}
    <div className="calculator-step">
      <label className="step-label">
        1. Wybierz Pakiet
        <span className="step-hint">Im większy pakiet, tym większe oszczędności</span>
      </label>
      
      <div className="package-grid">
        {pricingOptions.packageType.map(pkg => (
          <div 
            key={pkg.id}
            className={`package-card ${selectedPackage?.id === pkg.id ? 'selected' : ''}`}
            onClick={() => setSelectedPackage(pkg)}
          >
            {pkg.id !== 'single' && getSavingsPercent(pkg) > 0 && (
              <div className="package-badge">
                Oszczędzasz {getSavingsPercent(pkg)}%
              </div>
            )}
            
            <h4>{pkg.name}</h4>
            <div className="package-price">
              <span className="price-amount">{pkg.price}</span>
              <span className="price-currency">PLN</span>
            </div>
            
            {pkg.id !== 'single' && (
              <div className="price-per-session">
                {(pkg.price / getSessionCount(pkg.id)).toFixed(0)} PLN / sesja
              </div>
            )}
            
            <div className="package-features">
              <span>✓ {getSessionCount(pkg.id)} sesji treningowych</span>
              {pkg.id !== 'single' && <span>✓ Elastyczny harmonogram</span>}
              {pkg.id === 'quarterly' && <span>✓ Dodatkowe korzyści</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {selectedPackage && (
      <>
        {/* Step 2: Session Type */}
        <div className="calculator-step">
          <label className="step-label">
            2. Typ Treningu
            <span className="step-hint">Trenuj sam lub ze znajomymi</span>
          </label>
          
          <div className="session-type-grid">
            {pricingOptions.sessionType.map(type => (
              <div 
                key={type.id}
                className={`type-card ${selectedType === type.id ? 'selected' : ''}`}
                onClick={() => setSelectedType(type.id)}
              >
                <div className="type-icon">
                  {getTypeIcon(type.id)}
                </div>
                <h4>{type.name}</h4>
                {type.multiplier < 1 && (
                  <div className="type-discount">
                    -{Math.round((1 - type.multiplier) * 100)}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Step 3: Extras */}
        <div className="calculator-step">
          <label className="step-label">
            3. Dodatki (opcjonalne)
            <span className="step-hint">Zwiększ efektywność swojego planu</span>
          </label>
          
          <div className="extras-grid">
            {pricingOptions.extras.map(extra => (
              <label 
                key={extra.id}
                className={`extra-card ${selectedExtras.includes(extra.id) ? 'selected' : ''}`}
              >
                <input 
                  type="checkbox"
                  checked={selectedExtras.includes(extra.id)}
                  onChange={() => toggleExtra(extra.id)}
                />
                <div className="extra-content">
                  <span className="extra-icon">{getExtraIcon(extra.id)}</span>
                  <div className="extra-info">
                    <h4>{extra.name}</h4>
                    <p className="extra-price">+{extra.price} PLN</p>
                  </div>
                </div>
                <div className="extra-checkmark">✓</div>
              </label>
            ))}
          </div>
        </div>
        
        {/* Price Summary */}
        <div className="price-summary">
          <button 
            className="breakdown-toggle"
            onClick={() => setShowBreakdown(!showBreakdown)}
          >
            {showBreakdown ? 'Ukryj' : 'Pokaż'} szczegóły
          </button>
          
          {showBreakdown && (
            <div className="price-breakdown">
              <div className="breakdown-item">
                <span>Pakiet: {selectedPackage.name}</span>
                <span>{selectedPackage.price} PLN</span>
              </div>
              
              {selectedType !== 'personal' && (
                <div className="breakdown-item discount">
                  <span>
                    Typ treningu: {
                      pricingOptions.sessionType.find(t => t.id === selectedType).name
                    }
                  </span>
                  <span>
                    {Math.round((1 - pricingOptions.sessionType.find(t => t.id === selectedType).multiplier) * selectedPackage.price)} PLN
                  </span>
                </div>
              )}
              
              {selectedExtras.map(extraId => {
                const extra = pricingOptions.extras.find(e => e.id === extraId);
                return (
                  <div key={extraId} className="breakdown-item">
                    <span>{extra.name}</span>
                    <span>+{extra.price} PLN</span>
                  </div>
                );
              })}
              
              <div className="breakdown-divider"></div>
            </div>
          )}
          
          <div className="total-price">
            <span className="total-label">Razem:</span>
            <span className="total-amount">
              {total.toFixed(0)} <span className="total-currency">PLN</span>
            </span>
          </div>
          
          {savings > 0 && (
            <div className="savings-badge">
              🎉 Oszczędzasz {savings} PLN w porównaniu z pojedynczymi sesjami!
            </div>
          )}
          
          <button className="cta-button" onClick={() => handleContact()}>
            Umów Konsultację
          </button>
          
          <p className="pricing-note">
            * Ceny orientacyjne. Skontaktuj się, aby ustalić indywidualną ofertę.
          </p>
        </div>
      </>
    )}
    
    {!selectedPackage && (
      <div className="calculator-empty">
        <p>👆 Wybierz pakiet, aby zobaczyć cenę</p>
      </div>
    )}
    
  </div>
</div>
```

---

## CSS Styling

```css
.pricing-calculator {
  width: 100%;
  margin: 3rem 0;
}

.calculator-container {
  background: #ffffff;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 4px 16px rgba(58, 60, 74, 0.1);
}

/* Header */
.calculator-header {
  text-align: center;
  margin-bottom: 3rem;
}

.calculator-header h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #3a3c4a;
  margin-bottom: 0.75rem;
}

.calculator-header p {
  font-size: 1.125rem;
  color: #5f626d;
}

/* Steps */
.calculator-step {
  margin-bottom: 3rem;
}

.step-label {
  display: block;
  font-size: 1.25rem;
  font-weight: 600;
  color: #3a3c4a;
  margin-bottom: 1.5rem;
}

.step-hint {
  display: block;
  font-size: 0.95rem;
  font-weight: 400;
  color: #5f626d;
  margin-top: 0.5rem;
}

/* Package Grid */
.package-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.package-card {
  background: #f8f8f8;
  border: 3px solid transparent;
  border-radius: 12px;
  padding: 2rem 1.5rem;
  cursor: pointer;
  transition: all 250ms ease;
  position: relative;
  text-align: center;
}

.package-card:hover {
  border-color: #8c9bc0;
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(140, 155, 192, 0.2);
}

.package-card.selected {
  background: linear-gradient(135deg, #8c9bc0, #5f626d);
  color: #ffffff;
  border-color: #8c9bc0;
  box-shadow: 0 8px 24px rgba(140, 155, 192, 0.4);
}

.package-badge {
  position: absolute;
  top: -12px;
  right: 10px;
  background: #ff6e61;
  color: #ffffff;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.package-card h4 {
  font-size: 1.125rem;
  margin-bottom: 1rem;
}

.package-card.selected h4 {
  color: #d9c2a6;
}

.package-price {
  margin: 1.5rem 0;
}

.price-amount {
  font-size: 2.5rem;
  font-weight: 700;
}

.price-currency {
  font-size: 1.25rem;
  margin-left: 0.5rem;
}

.price-per-session {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 1rem;
}

.package-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
  text-align: left;
}

.package-card.selected .package-features {
  opacity: 0.9;
}

/* Session Type Grid */
.session-type-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.type-card {
  background: #f8f8f8;
  border: 3px solid transparent;
  border-radius: 12px;
  padding: 2rem 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 250ms ease;
  position: relative;
}

.type-card:hover {
  border-color: #8c9bc0;
  transform: translateY(-3px);
}

.type-card.selected {
  background: #8c9bc0;
  color: #ffffff;
  border-color: #8c9bc0;
}

.type-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.type-card h4 {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.type-discount {
  display: inline-block;
  background: #ff6e61;
  color: #ffffff;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

/* Extras Grid */
.extras-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.extra-card {
  background: #f8f8f8;
  border: 3px solid transparent;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 250ms ease;
  position: relative;
  display: flex;
  align-items: center;
}

.extra-card input[type="checkbox"] {
  display: none;
}

.extra-card:hover {
  border-color: #8c9bc0;
  transform: translateY(-2px);
}

.extra-card.selected {
  background: #8c9bc0;
  color: #ffffff;
  border-color: #8c9bc0;
}

.extra-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.extra-icon {
  font-size: 2rem;
}

.extra-info h4 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.extra-price {
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
}

.extra-checkmark {
  font-size: 1.5rem;
  opacity: 0;
  transition: opacity 250ms ease;
}

.extra-card.selected .extra-checkmark {
  opacity: 1;
}

/* Price Summary */
.price-summary {
  background: linear-gradient(135deg, #8c9bc0, #5f626d);
  color: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  margin-top: 3rem;
}

.breakdown-toggle {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #ffffff;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  transition: background 250ms ease;
}

.breakdown-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
}

.price-breakdown {
  margin-bottom: 2rem;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.breakdown-item.discount {
  color: #d9c2a6;
}

.breakdown-divider {
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  margin: 1rem 0;
}

.total-price {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.5rem;
}

.total-label {
  font-size: 1.5rem;
  font-weight: 600;
}

.total-amount {
  font-size: 3rem;
  font-weight: 700;
  color: #d9c2a6;
}

.total-currency {
  font-size: 1.5rem;
  margin-left: 0.5rem;
}

.savings-badge {
  background: #ff6e61;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.cta-button {
  width: 100%;
  background: #ff6e61;
  color: #ffffff;
  border: none;
  padding: 1.25rem 2rem;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 250ms ease;
}

.cta-button:hover {
  background: #ff5647;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 110, 97, 0.4);
}

.pricing-note {
  text-align: center;
  font-size: 0.85rem;
  margin-top: 1rem;
  opacity: 0.8;
}

/* Empty State */
.calculator-empty {
  text-align: center;
  padding: 4rem 2rem;
  color: #5f626d;
  font-size: 1.25rem;
}

/* Responsive */
@media (max-width: 768px) {
  .calculator-container {
    padding: 2rem 1.5rem;
  }
  
  .package-grid {
    grid-template-columns: 1fr;
  }
  
  .session-type-grid {
    grid-template-columns: 1fr;
  }
  
  .extras-grid {
    grid-template-columns: 1fr;
  }
  
  .price-summary {
    padding: 2rem 1.5rem;
  }
  
  .total-amount {
    font-size: 2.5rem;
  }
}
```

---

## Helper Functions

```javascript
const getSessionCount = (packageId) => {
  const counts = {
    'single': 1,
    'monthly-4': 4,
    'monthly-8': 8,
    'monthly-12': 12,
    'quarterly': 36
  };
  return counts[packageId] || 0;
};

const getSavingsPercent = (pkg) => {
  if (pkg.id === 'single') return 0;
  const sessionCount = getSessionCount(pkg.id);
  const regularPrice = 150 * sessionCount;
  return Math.round(((regularPrice - pkg.price) / regularPrice) * 100);
};

const getTypeIcon = (typeId) => {
  const icons = {
    'personal': '👤',
    'pair': '👥',
    'group': '👨‍👩‍👧‍👦'
  };
  return icons[typeId] || '👤';
};

const getExtraIcon = (extraId) => {
  const icons = {
    'nutrition': '🥗',
    'online': '💻',
    'measurements': '📊'
  };
  return icons[extraId] || '✨';
};

const handleContact = () => {
  // Scroll to contact section
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};
```

---

## Testing Checklist

- [ ] All package options display correctly
- [ ] Package selection works
- [ ] Session type selection works
- [ ] Extras checkboxes toggle correctly
- [ ] Price calculates correctly
- [ ] Savings calculation is accurate
- [ ] Price breakdown shows/hides
- [ ] CTA button scrolls to contact
- [ ] Responsive on all devices
- [ ] Animations are smooth
- [ ] Empty state shows initially
- [ ] No calculation errors

---

**Implementation Priority:** MEDIUM  
**Dependencies:** None  
**Estimated Time:** 6-8 hours
