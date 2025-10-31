# 🏋️ Personal Trainer Website - Master Project Plan

## 📋 Project Overview

**Project Name:** Trener Personalny Website  
**Purpose:** Professional website for a personal trainer to increase online visibility, attract new clients, and build personal brand  
**Target Audience:** Fitness enthusiasts, people looking for personal training services in Warsaw area

---

## 🎨 Design System

### Color Palette

```css
Primary Dark:     #3a3c4a  /* rgb(58, 60, 74)   - Main text, headers */
Secondary Dark:   #5f626d  /* rgb(95, 98, 109)  - Secondary text, borders */
Primary Blue:     #8c9bc0  /* rgb(140, 155, 192) - Interactive elements, links */
Accent Gold:      #d9c2a6  /* rgb(217, 194, 166) - Highlights, buttons */
Accent Coral:     #ff6e61  /* rgb(255, 110, 97)  - CTAs, important actions */
Background:       #f8f8f8  /* Light gray background */
White:            #ffffff  /* Cards, sections */
```

### Typography

```css
Primary Font: 'Segoe UI', 'Roboto', Arial, sans-serif
Heading Font: 'Montserrat', 'Segoe UI', sans-serif (bold weights)

Font Sizes:
- H1: 2.5rem (40px) - Hero sections
- H2: 2rem (32px) - Section headings
- H3: 1.5rem (24px) - Subsection headings
- Body: 1rem (16px) - Regular text
- Small: 0.875rem (14px) - Captions, labels
```

### Spacing System

```css
--spacing-xs: 0.5rem (8px)
--spacing-sm: 1rem (16px)
--spacing-md: 1.5rem (24px)
--spacing-lg: 2rem (32px)
--spacing-xl: 3rem (48px)
--spacing-xxl: 4rem (64px)
```

### Border Radius

```css
--radius-sm: 4px  /* Buttons, inputs */
--radius-md: 8px  /* Cards */
--radius-lg: 12px /* Modals, large sections */
--radius-xl: 20px /* Hero sections */
```

### Shadows

```css
--shadow-sm: 0 2px 4px rgba(58, 60, 74, 0.1)
--shadow-md: 0 4px 12px rgba(58, 60, 74, 0.15)
--shadow-lg: 0 8px 24px rgba(58, 60, 74, 0.2)
--shadow-hover: 0 12px 32px rgba(58, 60, 74, 0.25)
```

---

## 🎭 Animation Guidelines

### Transition Timings

```css
--transition-fast: 150ms
--transition-base: 250ms
--transition-slow: 350ms
--transition-slower: 500ms

/* Easing functions */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-out: cubic-bezier(0.0, 0, 0.2, 1)
--ease-in: cubic-bezier(0.4, 0, 1, 1)
```

### Common Animations

1. **Fade In on Scroll**
   - Trigger: Element enters viewport
   - Duration: 500ms
   - Easing: ease-out
   - Effect: opacity 0 → 1, translateY(20px) → 0

2. **Hover Scale**
   - Duration: 250ms
   - Scale: 1 → 1.05
   - Used on: Cards, images, buttons

3. **Button Hover**
   - Duration: 250ms
   - Effect: Background color shift + shadow increase

4. **Skeleton Loading**
   - Duration: 1500ms infinite
   - Effect: Linear gradient shimmer

5. **Slide In from Side**
   - Used for: Side panels, mobile menu
   - Duration: 350ms
   - Effect: translateX(-100%) → 0 or translateX(100%) → 0

---

## 🛠 Technical Stack

### Frontend
- **Framework:** React.js 18.x
- **Language:** JavaScript (ES6+)
- **Styling:** CSS3 (vanilla, no preprocessor required)
- **HTTP Client:** Fetch API
- **State Management:** React Hooks (useState, useEffect, useContext)
- **Routing:** React Router DOM v6
- **Google Maps:** @react-google-maps/api
- **Build Tool:** Create React App / Vite

### Backend
- **Runtime:** Node.js 18.x+
- **Framework:** Express.js 4.x
- **Email Service:** emailjs
- **CORS:** cors middleware
- **Environment Variables:** dotenv

### APIs & Integrations
- **Google Maps JavaScript API** - For location map
- **Google Places API** - For reviews fetching
- **Email Service** - For contact form and newsletter

### Development Tools
- **Version Control:** Git
- **Package Manager:** npm or yarn
- **Code Editor:** VS Code
- **Linting:** ESLint
- **Formatting:** Prettier

---

## 📐 Architecture Overview

### Frontend Structure
```
src/
├── App.js                    # Main app component with routing
├── index.js                  # React entry point
├── styles.css                # Global styles
├── components/
│   ├── About.js              # Company description section
│   ├── Values.js             # Company values section
│   ├── Gallery.js            # Image portfolio
│   ├── GoogleMap.js          # Location map
│   ├── Reviews.js            # Google reviews display
│   ├── PricingCalculator.js  # Service pricing calculator
│   ├── BMI_BMRCalculator.js  # Health metrics calculator
│   ├── TrainingPlanGenerator.js # AI training plan generation
│   ├── Contact.js            # Contact form
│   └── NewsletterSignup.js   # Newsletter subscription
└── utils/
    ├── bmiBmr.js             # BMI/BMR calculation logic
    ├── trainingPlan.js       # Training plan generation logic
    ├── email.js              # Email helper functions
    └── googleReviews.js      # Reviews fetching logic
```

### Backend Structure
```
server/
├── index.js                  # Express app setup
├── routes/
│   ├── contact.js            # Contact form endpoint
│   └── newsletter.js         # Newsletter subscription endpoint
└── services/
    ├── emailService.js       # Email sending service
    └── googleReviewsService.js # Google reviews fetching
```

---

## 🗺 Site Map & Navigation

### Main Sections (Single Page Application)

1. **Hero Section** (Top of page)
   - Compelling headline
   - Call-to-action button
   - Background image/video

2. **About** (#about)
   - Trainer introduction
   - Credentials
   - Mission statement

3. **Values** (#values)
   - Core company values
   - Why choose us

4. **Services** (#services)
   - Service offerings
   - Pricing calculator

5. **Calculators** (#calculators)
   - BMI/BMR Calculator
   - Training Plan Generator

6. **Gallery** (#gallery)
   - Portfolio photos
   - Before/after transformations

7. **Reviews** (#reviews)
   - Google reviews integration
   - Testimonials

8. **Location** (#location)
   - Google Maps
   - Address information

9. **Contact** (#contact)
   - Contact form
   - Newsletter signup
   - Social media links

### Navigation Pattern
- **Desktop:** Fixed top navigation bar with smooth scroll
- **Mobile:** Hamburger menu with slide-in drawer
- **Sticky behavior:** Nav bar stays visible on scroll

---

## 🔄 Data Flow

### Client-Side Flow
```
User Interaction → React Component → State Update → UI Re-render
                                   ↓
                          API Call (if needed)
                                   ↓
                          Backend Service
```

### Contact Form Flow
```
User fills form → Validation → POST /api/contact → Email Service → Send email → Success/Error response
```

### Newsletter Flow
```
User enters email → Validation → POST /api/newsletter → Save to list → Send confirmation email → Success response
```

### Reviews Flow
```
Component mount → Fetch /api/reviews (or client-side API call) → Parse data → Display in UI
```

### Training Plan Flow
```
User inputs data → Calculate BMI/BMR → Generate training plan → Display plan → Option to email/download
```

---

## 🌐 API Endpoints

### Backend Endpoints

#### POST /api/contact
**Purpose:** Handle contact form submissions  
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "message": "string"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

#### POST /api/newsletter
**Purpose:** Newsletter subscription  
**Request Body:**
```json
{
  "email": "string",
  "name": "string (optional)"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Subscribed successfully"
}
```

#### GET /api/reviews (optional backend endpoint)
**Purpose:** Fetch Google reviews  
**Response:**
```json
{
  "reviews": [
    {
      "author": "string",
      "rating": "number",
      "text": "string",
      "date": "string"
    }
  ]
}
```

---

## 📱 Responsive Design Breakpoints

```css
/* Mobile First Approach */
--breakpoint-xs: 320px   /* Small phones */
--breakpoint-sm: 640px   /* Large phones */
--breakpoint-md: 768px   /* Tablets */
--breakpoint-lg: 1024px  /* Small laptops */
--breakpoint-xl: 1280px  /* Desktops */
--breakpoint-2xl: 1536px /* Large desktops */
```

### Layout Behavior
- **Mobile (< 768px):** Single column, stacked sections, hamburger menu
- **Tablet (768px - 1024px):** Two columns where appropriate, expanded menu
- **Desktop (> 1024px):** Full multi-column layouts, max-width container

---

## 🔒 Security Considerations

1. **Environment Variables**
   - Store API keys in `.env` file
   - Never commit `.env` to version control
   - Use `.env.example` for documentation

2. **Input Validation**
   - Validate all form inputs on frontend
   - Sanitize all inputs on backend
   - Use proper email validation regex

3. **CORS**
   - Configure CORS to allow only frontend domain
   - Restrict in production environment

4. **Rate Limiting**
   - Implement rate limiting on API endpoints
   - Prevent spam on contact and newsletter forms

5. **Email Security**
   - Use app-specific passwords for Gmail
   - Consider OAuth2 for production
   - Validate recipient addresses

---

## 📦 Environment Variables

### Frontend (.env)
```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_maps_api_key
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
PORT=5000
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:3000
GOOGLE_PLACES_API_KEY=your_places_api_key
```

---

## 🚀 Deployment Strategy

### Frontend Deployment
- **Platform:** GitHub Pages (static hosting)
- **Build Command:** `npm run build`
- **Deploy:** Push to `gh-pages` branch
- **Custom Domain:** Optional

### Backend Deployment
- **Options:** 
  - Heroku (free tier)
  - Railway
  - Vercel (serverless functions)
  - DigitalOcean
- **Environment:** Production environment variables
- **HTTPS:** Required for production

---

## ✅ Acceptance Criteria

### Functionality
- ✓ All sections render correctly
- ✓ Contact form sends emails successfully
- ✓ Newsletter signup works and sends confirmation
- ✓ BMI/BMR calculator produces accurate results
- ✓ Training plan generates based on user input
- ✓ Gallery displays images from public folder
- ✓ Google Maps shows correct location
- ✓ Reviews display from Google Places API

### Performance
- ✓ Initial load time < 3 seconds
- ✓ Images optimized and lazy-loaded
- ✓ Smooth animations (60fps)
- ✓ No console errors

### Accessibility
- ✓ Keyboard navigation works
- ✓ ARIA labels on interactive elements
- ✓ Color contrast meets WCAG AA standards
- ✓ Form labels properly associated

### Responsive Design
- ✓ Works on mobile (320px+)
- ✓ Works on tablet (768px+)
- ✓ Works on desktop (1024px+)
- ✓ No horizontal scroll on any device

---

## 📚 Feature Implementation Files

Each feature has a detailed implementation document:

1. `01-layout-navigation.md` - Main app structure and navigation
2. `02-about-values.md` - About and Values sections
3. `03-gallery.md` - Image gallery component
4. `04-google-maps.md` - Maps integration
5. `05-reviews.md` - Google reviews component
6. `06-pricing-calculator.md` - Service pricing calculator
7. `07-bmi-bmr-calculator.md` - Health metrics calculator
8. `08-training-plan-generator.md` - AI training plan generation
9. `09-contact-form.md` - Contact form component
10. `10-newsletter.md` - Newsletter signup
11. `11-backend-services.md` - Express backend implementation

---

## 🔧 Development Workflow

### Setup
1. Clone repository
2. Install dependencies: `npm install` (frontend and backend)
3. Create `.env` files with required variables
4. Start backend: `cd server && npm start`
5. Start frontend: `npm start`

### Development
1. Create feature branch
2. Implement feature per specification
3. Test locally
4. Commit with descriptive message
5. Push and create pull request

### Testing Checklist
- [ ] Component renders without errors
- [ ] Responsive design verified
- [ ] Accessibility tested
- [ ] Form validation works
- [ ] API calls succeed
- [ ] Error states handled
- [ ] Loading states shown

---

## 📞 Support & Documentation

**Google Maps Integration:**
- Location: Ania Matusik Personal Trainer, Warsaw
- URL: https://www.google.com/maps/place/Ania+Matusik+Personal+Trainer/@52.2416541,20.9296597

**Key Coordinates:**
- Latitude: 52.2385934
- Longitude: 20.9260454

---

## 🎯 Success Metrics

1. **User Engagement**
   - Average session duration > 2 minutes
   - Bounce rate < 50%
   - Multiple sections visited per session

2. **Conversions**
   - Contact form submissions
   - Newsletter signups
   - Calculator usage

3. **Technical Performance**
   - Lighthouse score > 90
   - No critical accessibility issues
   - Fast load times on mobile

---

**Document Version:** 1.0  
**Last Updated:** October 31, 2025  
**Project Status:** Implementation Phase
