# ArtisanConnect Lubumbashi

Mobile-first web application connecting artisans and clients in Lubumbashi, Democratic Republic of Congo.

## Overview

ArtisanConnect is designed specifically for the Lubumbashi market, where smartphones are the primary access point. The app prioritizes simplicity, speed, and trust to connect skilled artisans with clients who need their services.

## Key Features

### For Clients (e.g., Jean-Paul Kabeya)
- **Fast Search**: Find artisans in 2-3 taps maximum
- **Clear Information**: See price, skills, availability, location, and ratings instantly
- **Direct Contact**: One-tap WhatsApp or call functionality
- **Trust Indicators**: Verified badges and authentic client reviews
- **Smart Filters**: Search by category, proximity, price, and rating

### For Artisans (e.g., Patrick Mbuyi)
- **Professional Profile**: Showcase skills, experience, and pricing
- **Visibility**: Get discovered by local clients
- **Availability Management**: Simple ON/OFF toggle
- **Client Requests**: Track and respond to inquiries
- **Reputation Building**: Collect and display client reviews

## Application Structure

### 📱 Client Screens

1. **Client Home** (`/components/ClientHomeScreen.tsx`)
   - Category selection
   - Quick search access
   - Trust indicators

2. **Search & Filters** (`/components/SearchFilterScreen.tsx`)
   - Category input
   - Proximity, price, rating filters
   - Apply and search

3. **Artisan List** (`/components/ArtisanListScreen.tsx`)
   - Vertical scrolling cards
   - Key info at a glance
   - Quick WhatsApp/Call buttons

4. **Artisan Profile** (`/components/ArtisanProfileScreen.tsx`)
   - Full artisan details
   - Skills and experience
   - Reviews and ratings
   - Large contact buttons

5. **Contact Screen** (`/components/ContactScreen.tsx`)
   - Choose WhatsApp or Call
   - Confirmation feedback
   - Contact tips

### 🔧 Artisan Screens

6. **Login/Signup** (`/components/ArtisanLoginScreen.tsx`)
   - Simple authentication
   - Professional profile creation
   - Category and skills setup

7. **Dashboard** (`/components/ArtisanDashboard.tsx`)
   - Profile summary
   - Statistics (views, contacts, rating)
   - Availability toggle
   - Recent client requests

8. **Profile Management** (`/components/ProfileManagementScreen.tsx`)
   - Edit personal info
   - Update skills
   - Change pricing tier
   - Photo management

9. **Availability Management** (`/components/AvailabilityScreen.tsx`)
   - Large ON/OFF toggle
   - Visual feedback
   - Explanation of impact

10. **Client Requests** (`/components/ClientRequestsScreen.tsx`)
    - List of inquiries
    - Request details
    - Quick WhatsApp/Call response
    - Status tracking

## Design Principles

### 🎨 Visual Design
- **Warm Colors**: Amber/gold primary, dark blue for trust
- **High Contrast**: Readable in various lighting conditions
- **Rounded Elements**: Friendly, approachable feel
- **Large Touch Targets**: Easy interaction on mobile

### 🚀 UX Principles
- **Speed**: Critical info accessible within 2-3 taps
- **Simplicity**: Clear, uncluttered interfaces
- **Trust**: Verification badges, reviews, professional presentation
- **Mobile-First**: Optimized for smartphone usage
- **Direct Communication**: WhatsApp and call integration

### ♿ Accessibility
- Touch targets minimum 44x44px
- High color contrast (WCAG AA)
- Clear visual feedback
- Simple, readable typography

## Technical Stack

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Images**: Unsplash integration
- **State Management**: React hooks (useState)

## User Personas

### Jean-Paul Kabeya (Client)
- Age: 34
- Occupation: Accountant
- Needs: Speed, trust, clear pricing
- Goals: Find reliable artisans quickly
- Pain Points: Time constraints, quality concerns

### Patrick Mbuyi (Artisan)
- Age: 27
- Occupation: Electrician
- Needs: Visibility, credibility, simple tools
- Goals: Get more clients, build reputation
- Pain Points: Limited tech skills, competition

## Navigation Flow

```
Client Flow:
Home → Search/Filter → Artisan List → Profile → Contact → [WhatsApp/Call]

Artisan Flow:
Login/Signup → Dashboard → Profile/Availability/Requests → Edit/Update
```

## Color System

- **Primary**: Amber (#F59E0B) - Main actions, highlights
- **Secondary**: Dark Blue (#1E3A8A) - Trust, headers
- **Success**: Green (#16A34A) - WhatsApp, available
- **Warning**: Orange (#F97316) - Busy, caution
- **Action**: Blue (#1D4ED8) - Calls, secondary actions

## Key Components

### Reusable Elements
- **Button Variants**: Primary, WhatsApp, Call, Secondary
- **Cards**: Standard, Interactive, Profile
- **Badges**: Available, Busy, Verified
- **Input Fields**: Text, Select, Textarea
- **Toggles**: Availability switch

### Patterns
- **Back Navigation**: Consistent top-left arrow
- **Contact Actions**: Green WhatsApp + Blue Call
- **Status Indicators**: Color-coded badges
- **Trust Signals**: Checkmarks, shields, stars

## Mobile Optimization

- **Container**: Max 428px width (centered on desktop)
- **Responsive Images**: Optimized for mobile bandwidth
- **Touch Feedback**: Scale animations on tap
- **Fast Transitions**: Under 300ms
- **Progressive Enhancement**: Works on slower connections

## External Integrations

### WhatsApp
- Opens native WhatsApp app
- Pre-formatted phone number
- Direct messaging capability

### Phone
- Initiates native phone call
- Uses tel: protocol
- Works on all mobile devices

## File Structure

```
/
├── App.tsx                          # Main app with routing logic
├── components/
│   ├── ClientHomeScreen.tsx         # Client entry point
│   ├── SearchFilterScreen.tsx       # Search with filters
│   ├── ArtisanListScreen.tsx        # Browse artisans
│   ├── ArtisanProfileScreen.tsx     # Artisan details
│   ├── ContactScreen.tsx            # Contact method selection
│   ├── ArtisanLoginScreen.tsx       # Artisan auth
│   ├── ArtisanDashboard.tsx         # Artisan home
│   ├── ProfileManagementScreen.tsx  # Edit profile
│   ├── AvailabilityScreen.tsx       # Manage availability
│   └── ClientRequestsScreen.tsx     # View client requests
├── styles/
│   └── globals.css                  # Global styles and tokens
├── DESIGN_SYSTEM.md                 # Complete design documentation
└── README.md                        # This file
```

## Data Model

### Artisan
```typescript
{
  id: string;
  name: string;
  photo: string;
  category: string;
  skills: string[];
  location: string;
  distance: string;
  priceRange: 'Économique' | 'Moyen' | 'Premium';
  rating: number;
  reviewCount: number;
  availability: 'Disponible' | 'Occupé';
  phone: string;
  whatsapp: string;
  experience: string;
  description: string;
  verified: boolean;
}
```

### Client Request
```typescript
{
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  date: string;
  time: string;
  status: 'new' | 'contacted' | 'completed';
  message?: string;
}
```

## Future Enhancements

- [ ] Real-time availability updates
- [ ] In-app messaging
- [ ] Photo galleries for artisan work
- [ ] Booking calendar
- [ ] Payment integration
- [ ] GPS-based distance calculation
- [ ] Push notifications
- [ ] Multilingual support (Swahili, Lingala)

## Local Context

### Lubumbashi Specifics
- Quartier-based location system (Kampemba, Kenya, Katuba, etc.)
- Phone format: +243 (DRC country code)
- French primary language
- Mobile-first internet usage
- WhatsApp as primary communication tool

### Cultural Considerations
- Trust is paramount
- Personal recommendations valued
- Price transparency important
- Visual verification preferred
- Simple, direct communication

## Performance

- **First Load**: Optimized for 3G connections
- **Images**: Lazy loaded, compressed
- **Animations**: Hardware-accelerated (transform, opacity)
- **Code Splitting**: On-demand component loading
- **Caching**: Service worker ready

## Browser Support

- iOS Safari 12+
- Chrome Mobile
- Firefox Mobile
- Samsung Internet
- Opera Mobile

## Development

### Running Locally
The app runs in a sandboxed Figma environment. Components are hot-reloaded automatically.

### Design System
See `DESIGN_SYSTEM.md` for complete design guidelines, color palette, typography, and component patterns.

## Credits

- **Icons**: Lucide React
- **Images**: Unsplash
- **Framework**: React + Tailwind CSS

---

**Version**: 1.0.0  
**Last Updated**: December 7, 2025  
**Location**: Lubumbashi, Democratic Republic of Congo
