# WCAG 2.1 AA Accessibility & Responsive Design Audit

## 1. Accessibility Features (WCAG 2.1 AA Compliance)

- **Semantic HTML5:** Native elements (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<form>`, `<button>`) used throughout.
- **ARIA Attributes:**
  - `aria-label` on all icon buttons, search inputs, close buttons, and drawers.
  - `aria-live="polite"` on notification toasts and dynamic search status updates.
- **Keyboard Navigation:**
  - TAB order across interactive controls.
  - ESC key listener on modals and drawers.
  - Visible focus indicators (`outline`, `border-color`) on inputs and buttons.
- **Color Contrast:**
  - Meets WCAG AA contrast ratio (>= 4.5:1 for body text, >= 3:1 for large text).
  - High contrast Dark Navy (`#001f3f`) header/footer with white text.

## 2. Responsive Design Standards
- Mobile-first flexible layouts using CSS Grid and Flexbox.
- Breakpoints supporting Mobile (320px+), Tablet (768px+), Laptop (1024px+), and Desktop (1440px+).
- Touch-friendly tap targets (minimum 44x44px for buttons).
