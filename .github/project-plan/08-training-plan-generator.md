# 🏋️ Training Plan Generator - Implementation Specification

## Overview
AI-powered training plan generator based on user's BMI, BMR, fitness goals, and preferences.

---

## Component: TrainingPlanGenerator.js

### File Location
`src/components/TrainingPlanGenerator.js`

### Purpose
Generate personalized weekly training plans based on:
- BMI and BMR data
- Fitness goals (weight loss, muscle gain, maintenance)
- Experience level (beginner, intermediate, advanced)
- Available equipment
- Time constraints

---

## Training Plan Logic

### Plan Parameters

```javascript
const trainingParameters = {
  goals: [
    { id: 'weight_loss', name: 'Redukcja wagi', cardioRatio: 0.6, strengthRatio: 0.4 },
    { id: 'muscle_gain', name: 'Budowa mięśni', cardioRatio: 0.3, strengthRatio: 0.7 },
    { id: 'endurance', name: 'Wytrzymałość', cardioRatio: 0.7, strengthRatio: 0.3 },
    { id: 'general', name: 'Ogólna kondycja', cardioRatio: 0.5, strengthRatio: 0.5 }
  ],
  
  experience: [
    { id: 'beginner', name: 'Początkujący', sessionsPerWeek: 3, intensity: 'low' },
    { id: 'intermediate', name: 'Średniozaawansowany', sessionsPerWeek: 4, intensity: 'medium' },
    { id: 'advanced', name: 'Zaawansowany', sessionsPerWeek: 5, intensity: 'high' }
  ],
  
  equipment: [
    { id: 'gym', name: 'Siłownia', exercises: ['all'] },
    { id: 'home', name: 'Dom (podstawowy sprzęt)', exercises: ['bodyweight', 'dumbbells', 'resistance_bands'] },
    { id: 'bodyweight', name: 'Bez sprzętu', exercises: ['bodyweight'] }
  ]
};
```

### Exercise Database (Sample)

```javascript
const exerciseDatabase = {
  strength: {
    beginner: [
      { name: 'Przysiady', sets: 3, reps: '12-15', equipment: ['gym', 'home', 'bodyweight'] },
      { name: 'Pompki', sets: 3, reps: '8-12', equipment: ['gym', 'home', 'bodyweight'] },
      { name: 'Martwy ciąg', sets: 3, reps: '10-12', equipment: ['gym', 'home'] },
      { name: 'Wiosłowanie hantlami', sets: 3, reps: '12-15', equipment: ['gym', 'home'] }
    ],
    intermediate: [
      { name: 'Przysiady ze sztangą', sets: 4, reps: '8-10', equipment: ['gym'] },
      { name: 'Wyciskanie sztangi', sets: 4, reps: '8-10', equipment: ['gym'] },
      { name: 'Podciąganie', sets: 3, reps: '6-10', equipment: ['gym', 'home'] }
    ],
    advanced: [
      { name: 'Przysiad bułgarski', sets: 4, reps: '8-12', equipment: ['gym', 'home'] },
      { name: 'Wyciskanie hantli na skos', sets: 4, reps: '8-10', equipment: ['gym', 'home'] },
      { name: 'Martwy ciąg rumuński', sets: 4, reps: '8-10', equipment: ['gym', 'home'] }
    ]
  },
  
  cardio: {
    beginner: [
      { name: 'Marsz szybki', duration: '20-30 min', intensity: 'low' },
      { name: 'Rower stacjonarny', duration: '20 min', intensity: 'low' }
    ],
    intermediate: [
      { name: 'Bieg interwałowy', duration: '25-30 min', intensity: 'medium' },
      { name: 'Rowing', duration: '20-25 min', intensity: 'medium' }
    ],
    advanced: [
      { name: 'HIIT', duration: '20 min', intensity: 'high' },
      { name: 'Sprinty', duration: '15-20 min', intensity: 'high' }
    ]
  }
};
```

---

## Implementation (Condensed)

```javascript
import React, { useState } from 'react';
import { generateTrainingPlan } from '../utils/trainingPlan';

const TrainingPlanGenerator = () => {
  const [formData, setFormData] = useState({
    goal: '',
    experience: '',
    equipment: '',
    daysPerWeek: 3,
    sessionDuration: 60
  });
  
  const [plan, setPlan] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    const generatedPlan = generateTrainingPlan(formData);
    setPlan(generatedPlan);
  };

  return (
    <div className="training-plan-generator">
      <h3>Generator Planów Treningowych</h3>
      
      <form onSubmit={handleGenerate}>
        {/* Goal Selection */}
        <div className="form-group">
          <label>Cel treningowy</label>
          <select name="goal" value={formData.goal} onChange={handleInputChange} required>
            <option value="">Wybierz cel</option>
            <option value="weight_loss">Redukcja wagi</option>
            <option value="muscle_gain">Budowa mięśni</option>
            <option value="endurance">Wytrzymałość</option>
            <option value="general">Ogólna kondycja</option>
          </select>
        </div>
        
        {/* Experience Level */}
        <div className="form-group">
          <label>Poziom zaawansowania</label>
          <select name="experience" value={formData.experience} onChange={handleInputChange} required>
            <option value="">Wybierz poziom</option>
            <option value="beginner">Początkujący</option>
            <option value="intermediate">Średniozaawansowany</option>
            <option value="advanced">Zaawansowany</option>
          </select>
        </div>
        
        {/* Equipment */}
        <div className="form-group">
          <label>Dostępny sprzęt</label>
          <select name="equipment" value={formData.equipment} onChange={handleInputChange} required>
            <option value="">Wybierz sprzęt</option>
            <option value="gym">Siłownia</option>
            <option value="home">Dom (podstawowy sprzęt)</option>
            <option value="bodyweight">Bez sprzętu</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary">Wygeneruj Plan</button>
      </form>
      
      {/* Generated Plan Display */}
      {plan && (
        <div className="plan-result">
          <h4>Twój Spersonalizowany Plan Treningowy</h4>
          
          {plan.weeklySchedule.map((day, index) => (
            <div key={index} className="day-card">
              <h5>{day.dayName}</h5>
              
              {day.isRestDay ? (
                <p className="rest-day">🛌 Dzień odpoczynku</p>
              ) : (
                <>
                  <div className="workout-type">{day.workoutType}</div>
                  
                  <div className="exercises-list">
                    {day.exercises.map((exercise, idx) => (
                      <div key={idx} className="exercise-item">
                        <span className="exercise-name">{exercise.name}</span>
                        <span className="exercise-details">
                          {exercise.sets && `${exercise.sets} x ${exercise.reps}`}
                          {exercise.duration && exercise.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="workout-notes">
                    <strong>Wskazówki:</strong>
                    <ul>
                      {day.notes.map((note, idx) => <li key={idx}>{note}</li>)}
                    </ul>
                  </div>
                </>
              )}
            </div>
          ))}
          
          <div className="plan-actions">
            <button className="btn btn-primary">Wyślij Plan Mailem</button>
            <button className="btn btn-secondary">Pobierz PDF</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingPlanGenerator;
```

---

## Utility: trainingPlan.js

```javascript
/**
 * Generate personalized training plan
 */
export const generateTrainingPlan = (params) => {
  const { goal, experience, equipment, daysPerWeek } = params;
  
  const goalConfig = trainingParameters.goals.find(g => g.id === goal);
  const expConfig = trainingParameters.experience.find(e => e.id === experience);
  
  const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
  const workoutDays = Math.min(daysPerWeek, expConfig.sessionsPerWeek);
  
  const weeklySchedule = days.map((dayName, index) => {
    const isWorkoutDay = index < workoutDays || (index === 6 && workoutDays > 5);
    
    if (!isWorkoutDay) {
      return { dayName, isRestDay: true };
    }
    
    // Determine workout type
    const isStrengthDay = Math.random() < goalConfig.strengthRatio;
    const workoutType = isStrengthDay ? 'Trening Siłowy' : 'Trening Cardio';
    
    // Get exercises
    const exercises = isStrengthDay
      ? getStrengthExercises(experience, equipment, 5)
      : getCardioExercises(experience, 2);
    
    return {
      dayName,
      isRestDay: false,
      workoutType,
      exercises,
      notes: getWorkoutNotes(workoutType, experience)
    };
  });
  
  return {
    goal: goalConfig.name,
    experience: expConfig.name,
    weeklySchedule
  };
};

const getStrengthExercises = (level, equipment, count) => {
  const available = exerciseDatabase.strength[level].filter(
    ex => ex.equipment.includes(equipment)
  );
  return available.slice(0, count);
};

const getCardioExercises = (level, count) => {
  return exerciseDatabase.cardio[level].slice(0, count);
};

const getWorkoutNotes = (type, level) => {
  const notes = {
    strength: [
      'Rozgrzewka: 5-10 minut lekkiego cardio',
      'Odpoczynek między seriami: 60-90 sekund',
      'Kontroluj tempo wykonywania ćwiczeń',
      'Rozciąganie po treningu'
    ],
    cardio: [
      'Rozgrzewka: 5 minut w łagodnym tempie',
      'Monitoruj tętno',
      'Utrzymuj odpowiednie tempo oddychania',
      'Schłodzenie: 5 minut spaceru'
    ]
  };
  
  return type.includes('Siłowy') ? notes.strength : notes.cardio;
};
```

---

## CSS (Key Styles)

```css
.training-plan-generator {
  background: #ffffff;
  padding: 3rem;
  border-radius: 12px;
  margin: 2rem 0;
}

.plan-result {
  margin-top: 3rem;
}

.day-card {
  background: #f8f8f8;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #8c9bc0;
}

.day-card h5 {
  color: #3a3c4a;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.rest-day {
  text-align: center;
  font-size: 1.125rem;
  color: #5f626d;
  padding: 1rem;
}

.workout-type {
  display: inline-block;
  background: #8c9bc0;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.exercises-list {
  margin: 1.5rem 0;
}

.exercise-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #ffffff;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.exercise-name {
  font-weight: 600;
  color: #3a3c4a;
}

.exercise-details {
  color: #5f626d;
}

.workout-notes {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(140, 155, 192, 0.1);
  border-radius: 8px;
}

.workout-notes ul {
  margin: 0.5rem 0 0 1.5rem;
  color: #5f626d;
}

.plan-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
```

---

## Testing Checklist

- [ ] Plan generates for all goal types
- [ ] Experience level affects exercise difficulty
- [ ] Equipment filter works correctly
- [ ] Rest days distributed properly
- [ ] Exercise variety is good
- [ ] Notes are relevant
- [ ] Email/PDF export buttons present
- [ ] Responsive design
- [ ] No errors in console

---

**Implementation Priority:** MEDIUM-LOW  
**Dependencies:** BMI/BMR calculator data (optional)  
**Estimated Time:** 8-10 hours
