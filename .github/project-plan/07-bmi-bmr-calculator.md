# 📊 BMI & BMR Calculator - Implementation Specification

## Overview
Implementation of BMI_BMRCalculator.js component for calculating Body Mass Index and Basal Metabolic Rate.

---

## Component: BMI_BMRCalculator.js

### File Location
`src/components/BMI_BMRCalculator.js`

### Purpose
- Calculate BMI (Body Mass Index)
- Calculate BMR (Basal Metabolic Rate)
- Provide health insights
- Recommend calorie intake

---

## Formulas

### BMI Calculation
```javascript
BMI = weight (kg) / (height (m))²
```

**Categories:**
- < 18.5: Underweight
- 18.5 - 24.9: Normal
- 25 - 29.9: Overweight
- ≥ 30: Obese

### BMR Calculation (Mifflin-St Jeor Equation)

**For Men:**
```javascript
BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5
```

**For Women:**
```javascript
BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161
```

### TDEE (Total Daily Energy Expenditure)
```javascript
TDEE = BMR × Activity Multiplier
```

**Activity Levels:**
- Sedentary (little/no exercise): 1.2
- Lightly active (1-3 days/week): 1.375
- Moderately active (3-5 days/week): 1.55
- Very active (6-7 days/week): 1.725
- Extremely active (physical job + exercise): 1.9

---

## Implementation

### Component Structure

```javascript
import React, { useState } from 'react';
import { calculateBMI, calculateBMR, getBMICategory, getRecommendations } from '../utils/bmiBmr';
import '../styles.css';

const BMI_BMRCalculator = () => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activityLevel: '1.2'
  });
  
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = parseInt(formData.age);
    
    const bmi = calculateBMI(weight, height);
    const bmr = calculateBMR(weight, height, age, formData.gender);
    const tdee = bmr * parseFloat(formData.activityLevel);
    const category = getBMICategory(bmi);
    const recommendations = getRecommendations(bmi, bmr, tdee);
    
    setResults({
      bmi,
      bmr,
      tdee,
      category,
      recommendations
    });
  };

  const handleReset = () => {
    setFormData({
      weight: '',
      height: '',
      age: '',
      gender: 'male',
      activityLevel: '1.2'
    });
    setResults(null);
  };

  return (
    <div className="bmi-bmr-calculator">
      {/* Calculator content */}
    </div>
  );
};

export default BMI_BMRCalculator;
```

---

## HTML Structure (Condensed)

```html
<div className="bmi-bmr-calculator">
  <div className="calculator-wrapper">
    
    <h3>Kalkulator BMI i BMR</h3>
    
    <form onSubmit={handleCalculate} className="calculator-form">
      {/* Weight Input */}
      <div className="form-group">
        <label>Waga (kg)</label>
        <input 
          type="number" 
          name="weight" 
          value={formData.weight}
          onChange={handleInputChange}
          required
          min="20"
          max="300"
          step="0.1"
        />
      </div>
      
      {/* Height Input */}
      <div className="form-group">
        <label>Wzrost (cm)</label>
        <input 
          type="number" 
          name="height" 
          value={formData.height}
          onChange={handleInputChange}
          required
          min="100"
          max="250"
        />
      </div>
      
      {/* Age Input */}
      <div className="form-group">
        <label>Wiek (lata)</label>
        <input 
          type="number" 
          name="age" 
          value={formData.age}
          onChange={handleInputChange}
          required
          min="15"
          max="100"
        />
      </div>
      
      {/* Gender Select */}
      <div className="form-group">
        <label>Płeć</label>
        <select name="gender" value={formData.gender} onChange={handleInputChange}>
          <option value="male">Mężczyzna</option>
          <option value="female">Kobieta</option>
        </select>
      </div>
      
      {/* Activity Level */}
      <div className="form-group">
        <label>Poziom Aktywności</label>
        <select name="activityLevel" value={formData.activityLevel} onChange={handleInputChange}>
          <option value="1.2">Siedzący tryb życia</option>
          <option value="1.375">Lekka aktywność (1-3 dni/tydzień)</option>
          <option value="1.55">Umiarkowana aktywność (3-5 dni/tydzień)</option>
          <option value="1.725">Wysoka aktywność (6-7 dni/tydzień)</option>
          <option value="1.9">Bardzo wysoka aktywność</option>
        </select>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Oblicz</button>
        <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
      </div>
    </form>
    
    {/* Results */}
    {results && (
      <div className="results-panel">
        <h4>Twoje Wyniki</h4>
        
        <div className="results-grid">
          <div className="result-card">
            <span className="result-label">BMI</span>
            <span className="result-value">{results.bmi.toFixed(1)}</span>
            <span className={`result-category ${results.category.class}`}>
              {results.category.label}
            </span>
          </div>
          
          <div className="result-card">
            <span className="result-label">BMR</span>
            <span className="result-value">{Math.round(results.bmr)}</span>
            <span className="result-unit">kcal/dzień</span>
          </div>
          
          <div className="result-card">
            <span className="result-label">TDEE</span>
            <span className="result-value">{Math.round(results.tdee)}</span>
            <span className="result-unit">kcal/dzień</span>
          </div>
        </div>
        
        <div className="recommendations">
          <h5>Rekomendacje</h5>
          {results.recommendations.map((rec, index) => (
            <div key={index} className="recommendation-item">
              <span className="rec-icon">{rec.icon}</span>
              <p>{rec.text}</p>
            </div>
          ))}
        </div>
      </div>
    )}
    
  </div>
</div>
```

---

## Utility File: bmiBmr.js

### File Location
`src/utils/bmiBmr.js`

```javascript
/**
 * Calculate BMI (Body Mass Index)
 */
export const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
 */
export const calculateBMR = (weight, height, age, gender) => {
  const base = (10 * weight) + (6.25 * height) - (5 * age);
  return gender === 'male' ? base + 5 : base - 161;
};

/**
 * Get BMI category and classification
 */
export const getBMICategory = (bmi) => {
  if (bmi < 18.5) {
    return { label: 'Niedowaga', class: 'underweight', color: '#8c9bc0' };
  } else if (bmi < 25) {
    return { label: 'Waga prawidłowa', class: 'normal', color: '#5cb85c' };
  } else if (bmi < 30) {
    return { label: 'Nadwaga', class: 'overweight', color: '#f0ad4e' };
  } else {
    return { label: 'Otyłość', class: 'obese', color: '#d9534f' };
  }
};

/**
 * Get personalized recommendations
 */
export const getRecommendations = (bmi, bmr, tdee) => {
  const recommendations = [];
  
  // BMI-based recommendations
  if (bmi < 18.5) {
    recommendations.push({
      icon: '🍽️',
      text: 'Rozważ zwiększenie spożycia kalorii i treningi siłowe pod nadzorem trenera.'
    });
  } else if (bmi >= 25 && bmi < 30) {
    recommendations.push({
      icon: '🏃',
      text: 'Regularna aktywność fizyczna i zbilansowana dieta pomogą w redukcji wagi.'
    });
  } else if (bmi >= 30) {
    recommendations.push({
      icon: '👨‍⚕️',
      text: 'Zalecana konsultacja z trenerem i dietetykiem dla bezpiecznej redukcji wagi.'
    });
  } else {
    recommendations.push({
      icon: '✅',
      text: 'Twoje BMI jest w normie! Kontynuuj zdrowy tryb życia.'
    });
  }
  
  // Calorie recommendations
  recommendations.push({
    icon: '🔥',
    text: `Aby utrzymać wagę, spożywaj około ${Math.round(tdee)} kcal dziennie.`
  });
  
  recommendations.push({
    icon: '📉',
    text: `Aby schudnąć, spożywaj około ${Math.round(tdee - 500)} kcal dziennie (redukcja 500 kcal).`
  });
  
  recommendations.push({
    icon: '📈',
    text: `Aby przybrać na wadze, spożywaj około ${Math.round(tdee + 300)} kcal dziennie.`
  });
  
  return recommendations;
};
```

---

## CSS Styling (Key Styles)

```css
.bmi-bmr-calculator {
  background: #f8f8f8;
  padding: 3rem;
  border-radius: 12px;
  margin: 2rem 0;
}

.calculator-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #3a3c4a;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select {
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 250ms ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #8c9bc0;
}

.results-panel {
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  margin-top: 2rem;
  box-shadow: 0 4px 12px rgba(58, 60, 74, 0.1);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
}

.result-card {
  background: linear-gradient(135deg, #8c9bc0, #5f626d);
  color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
}

.result-value {
  display: block;
  font-size: 3rem;
  font-weight: 700;
  color: #d9c2a6;
  margin: 0.5rem 0;
}

.result-category {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 0.5rem;
}

.recommendations {
  margin-top: 2rem;
}

.recommendation-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  align-items: flex-start;
}

.rec-icon {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .calculator-form {
    grid-template-columns: 1fr;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Testing Checklist

- [ ] BMI calculates correctly
- [ ] BMR calculates correctly for both genders
- [ ] TDEE calculates with activity multiplier
- [ ] BMI category displays correctly
- [ ] Recommendations are relevant
- [ ] Form validation works
- [ ] Reset button clears form and results
- [ ] Responsive on mobile
- [ ] No calculation errors
- [ ] All edge cases handled (min/max values)

---

**Implementation Priority:** MEDIUM  
**Dependencies:** None  
**Estimated Time:** 4-6 hours
