# ArtisanConnect Lubumbashi - Design System

## Overview
Mobile-first design system for connecting artisans and clients in Lubumbashi, DRC.
Focus: Simplicity, trust, speed, and mobile optimization.

---

## Color Palette

### Primary Colors
- **Amber/Gold**: `bg-amber-500` (#F59E0B) - Primary CTA, highlights
- **Dark Blue**: `bg-blue-900` (#1E3A8A) - Headers, trust elements
- **Blue**: `bg-blue-700` (#1D4ED8) - Call buttons, secondary actions

### Semantic Colors
- **Green**: `bg-green-600` (#16A34A) - WhatsApp, available status
- **Orange**: `bg-orange-500` (#F97316) - Busy status, warnings
- **Red**: `bg-red-500` (#EF4444) - Notifications, alerts

### Neutral Colors
- **White**: `#FFFFFF` - Backgrounds, cards
- **Gray 50**: `bg-gray-50` (#F9FAFB) - Page backgrounds
- **Gray 100**: `bg-gray-100` (#F3F4F6) - Subtle backgrounds
- **Gray 600**: `text-gray-600` (#4B5563) - Secondary text
- **Gray 900**: `text-gray-900` (#111827) - Primary text

---

## Typography

### Headings
- **H1**: 2xl size, medium weight - Main titles
- **H2**: xl size, medium weight - Section titles
- **H3**: lg size, medium weight - Card titles
- **H4**: base size, medium weight - Subsections

### Body
- **Paragraph**: base size, normal weight
- **Label**: base size, medium weight
- **Button**: base size, medium weight

### Font Stack
System fonts optimized for mobile readability

---

## Components

### Buttons

#### Primary CTA
```tsx
className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 
hover:to-amber-700 text-white py-5 rounded-2xl shadow-xl transition-all active:scale-95"
```

#### WhatsApp Button
```tsx
className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl 
transition-all active:scale-95 flex items-center justify-center gap-2"
```

#### Call Button
```tsx
className="bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-2xl 
transition-all active:scale-95 flex items-center justify-center gap-2"
```

#### Secondary Button
```tsx
className="bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-2xl 
hover:bg-gray-50 transition-all active:scale-95"
```

### Cards

#### Standard Card
```tsx
className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all"
```

#### Interactive Card
```tsx
className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all 
active:scale-[0.98] cursor-pointer border-2 border-transparent hover:border-amber-200"
```

### Input Fields
```tsx
className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl 
focus:outline-none focus:border-amber-500 transition-colors"
```

### Badges

#### Available
```tsx
className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
```

#### Busy
```tsx
className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full"
```

#### Verified
```tsx
<CheckCircle className="text-blue-700" /> + "bg-blue-50 text-blue-700"
```

---

## Layout Principles

### Mobile Container
- Max width: 428px (iPhone 14 Pro Max)
- Centered on larger screens
- Full viewport on mobile

### Spacing
- Section padding: `px-6 py-6` (24px)
- Card padding: `p-5` or `p-6` (20-24px)
- Element gaps: `gap-3` to `gap-6` (12-24px)

### Touch Targets
- Minimum size: 44x44px (iOS guideline)
- Large buttons: `py-5` or `py-6` (60-72px total height)
- Adequate spacing between interactive elements

---

## Radius System
- Small: `rounded-xl` (12px)
- Medium: `rounded-2xl` (16px)
- Large: `rounded-3xl` (24px)
- Full: `rounded-full` (9999px)

---

## Shadows
- Light: `shadow-sm`
- Default: `shadow-md`
- Elevated: `shadow-lg`
- Prominent: `shadow-xl`
- Maximum: `shadow-2xl`

---

## Icons
Library: Lucide React
- Standard size: 20-24px
- Large size: 28-32px
- In buttons: 18-20px

### Common Icons
- Search: `<Search />`
- WhatsApp: `<MessageCircle />`
- Call: `<Phone />`
- Location: `<MapPin />`
- Star: `<Star />`
- Back: `<ArrowLeft />`
- User: `<User />`
- Clock: `<Clock />`
- Verified: `<CheckCircle />`

---

## Interactions

### Hover States
- Buttons: Darker shade
- Cards: Enhanced shadow + border color

### Active States
- All clickable elements: `active:scale-95` or `active:scale-[0.98]`
- Provides tactile feedback

### Transitions
- Standard: `transition-all`
- Colors only: `transition-colors`

---

## Trust Elements

### Verification Badge
- Blue checkmark with circle
- Positioned on avatar (absolute bottom-right)
- White background, blue icon

### Ratings
- Amber stars (filled)
- Gray stars (empty)
- Always show count: "(87)"

### Trust Indicators
- "Vérifié" badge
- Shield icon for security
- Client testimonials

---

## Responsive Behavior

### Mobile First
- All designs optimized for 375px-428px width
- Single column layouts
- Large touch targets

### Tablet/Desktop
- Center content with max-width
- Maintain mobile experience
- Add shadows for depth

---

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Important actions have high contrast

### Touch Targets
- Minimum 44x44px
- Adequate spacing (8-12px minimum)

### Feedback
- Visual feedback on all interactions
- Clear loading/success states
- Error messages in context

---

## User Flows

### Client Flow (2-3 taps)
1. Home → Search/Category
2. List → Profile
3. Contact (WhatsApp/Call)

### Artisan Flow (2-3 taps)
1. Dashboard → Profile/Availability/Requests
2. Edit/Toggle
3. Save

---

## Performance Guidelines

### Images
- Use ImageWithFallback component
- Lazy loading by default
- Optimize for mobile bandwidth

### Animations
- Use CSS transforms (scale, translate)
- Avoid layout thrashing
- Keep animations under 300ms

---

## Localization

### Language
- French primary
- Simple, clear language
- Action-oriented labels

### Context
- Lubumbashi-specific locations
- DRC phone format: +243
- Local trust indicators

---

## Best Practices

### Do's
✓ Keep navigation under 3 taps
✓ Use large, clear buttons
✓ Provide immediate visual feedback
✓ Show status clearly (available/busy)
✓ Use familiar patterns (WhatsApp green)
✓ Prioritize essential information
✓ Design for poor connectivity

### Don'ts
✗ Small touch targets
✗ Complex multi-step processes
✗ Hidden important actions
✗ Unclear status indicators
✗ Too much text
✗ Unfamiliar UI patterns
✗ Heavy animations/images
