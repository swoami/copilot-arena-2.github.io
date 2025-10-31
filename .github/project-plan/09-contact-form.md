# 📧 Contact Form - Implementation Specification

## Overview
Contact form component with email integration for client inquiries.

---

## Component: Contact.js

### File Location
`src/components/Contact.js`

### Purpose
- Collect client inquiries
- Send emails to business email
- Provide confirmation to user
- Validate form data

---

## Implementation

```javascript
import React, { useState } from 'react';
import '../styles.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Wiadomość wysłana! Odpowiemy wkrótce.'
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Błąd wysyłania');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-section">
      <div className="contact-wrapper">
        
        <div className="contact-info">
          <h3>Skontaktuj Się</h3>
          <p>Masz pytania? Chcesz umówić konsultację? Napisz!</p>
          
          <div className="contact-details">
            <div className="detail-item">
              <span className="detail-icon">📧</span>
              <div>
                <strong>Email</strong>
                <p>kontakt@trener.pl</p>
              </div>
            </div>
            
            <div className="detail-item">
              <span className="detail-icon">📞</span>
              <div>
                <strong>Telefon</strong>
                <p>+48 123 456 789</p>
              </div>
            </div>
            
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <div>
                <strong>Lokalizacja</strong>
                <p>Warszawa, Polska</p>
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Imię i Nazwisko *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Jan Kowalski"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="jan@example.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Telefon</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+48 123 456 789"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Wiadomość *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Opisz swoje pytanie lub cele treningowe..."
            ></textarea>
          </div>
          
          {status.message && (
            <div className={`form-status ${status.type}`}>
              {status.message}
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary btn-large"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Wysyłanie...' : 'Wyślij Wiadomość'}
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Contact;
```

---

## Backend Route: contact.js

### File Location
`server/routes/contact.js`

```javascript
const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../services/emailService');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Brakuje wymaganych pól' });
    }
    
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Nieprawidłowy format email' });
    }
    
    // Send email
    await sendContactEmail({ name, email, phone, message });
    
    res.json({ success: true, message: 'Email wysłany' });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

module.exports = router;
```

---

## Email Service: emailService.js

### File Location
`server/services/emailService.js`

```javascript
const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send contact form email
 */
const sendContactEmail = async ({ name, email, phone, message }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Your business email
    replyTo: email,
    subject: `Nowa wiadomość od ${name}`,
    html: `
      <h2>Nowe zapytanie z formularza kontaktowego</h2>
      <p><strong>Imię:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone || 'Nie podano'}</p>
      <p><strong>Wiadomość:</strong></p>
      <p>${message}</p>
    `
  };
  
  return transporter.sendMail(mailOptions);
};

module.exports = { sendContactEmail };
```

---

## CSS

```css
.contact-section {
  padding: 4rem 0;
}

.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  background: #ffffff;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(58, 60, 74, 0.1);
}

.contact-info h3 {
  font-size: 2rem;
  color: #3a3c4a;
  margin-bottom: 1rem;
}

.contact-details {
  margin-top: 2rem;
}

.detail-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.detail-icon {
  font-size: 1.5rem;
}

.contact-form .form-group {
  margin-bottom: 1.5rem;
}

.contact-form label {
  display: block;
  font-weight: 600;
  color: #3a3c4a;
  margin-bottom: 0.5rem;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 250ms ease;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: #8c9bc0;
}

.form-status {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
}

.form-status.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.form-status.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.btn-large {
  width: 100%;
  padding: 1.25rem 2rem;
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .contact-wrapper {
    grid-template-columns: 1fr;
    padding: 2rem;
  }
}
```

---

## Environment Variables

```env
# Backend .env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

---

## Testing Checklist

- [ ] Form validation works
- [ ] Email sends successfully
- [ ] Success message displays
- [ ] Error handling works
- [ ] Form clears after submission
- [ ] Email format validated
- [ ] Phone field optional
- [ ] Responsive design
- [ ] Submit button disabled during send
- [ ] Received email formatted correctly

---

**Implementation Priority:** HIGH  
**Dependencies:** Nodemailer, Express backend  
**Estimated Time:** 4-6 hours
