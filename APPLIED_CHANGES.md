# Applied Changes Report

## Batch 1: Dependency & Dead Code Cleanup

### 1. Removed unused Express dependency
- **File:** `package.json`
- **Change:** Removed `"express": "^4.21.2"` from dependencies
- **Why:** Express is never imported or used anywhere in the codebase

### 2. Removed unused @types/express
- **File:** `package.json`
- **Change:** Removed `"@types/express": "^4.17.21"` from devDependencies
- **Why:** TypeScript types for an unused package

### 3. Removed unused dotenv dependency
- **File:** `package.json`
- **Change:** Removed `"dotenv": "^17.2.3"` from dependencies
- **Why:** Vite handles env vars natively via `import.meta.env`

### 4. Deleted dead Clients component
- **File:** `src/components/Clients.tsx` (deleted)
- **Change:** Removed file — exported component but never imported or rendered
- **Verification:** Grep confirmed zero imports of `Clients` component

## Batch 2: Error Resilience

### 5. Added ErrorBoundary component
- **File:** `src/components/ErrorBoundary.tsx` (new)
- **Change:** Created class-based error boundary that catches React render errors and displays a fallback UI with "Refresh Page" button
- **Why:** Prevents full-app white-screen crashes from runtime errors

### 6. Integrated ErrorBoundary in App.tsx
- **File:** `src/App.tsx`
- **Change:** Wrapped `<AnimatedRoutes />` inside `<ErrorBoundary>`
- **Why:** Enables error catching for all route content

### 7. Fixed @ts-ignore in App.tsx (AnimatePresence)
- **File:** `src/App.tsx`
- **Change:** Replaced `@ts-ignore` on `<Routes location={location} key={location.pathname}>` with `<div key={location.pathname}><Routes location={location}>...` pattern
- **Why:** react-router-dom v7 Routes doesn't accept `key` prop; wrapping div provides the key for AnimatePresence

### 8. Fixed @ts-ignore in App.tsx (Loader)
- **File:** `src/App.tsx`
- **Change:** Wrapped `<Loader>` in `<div key="loader">` to avoid passing `key` prop directly
- **Why:** Loader's prop type doesn't include `key`

### 9. Fixed @ts-ignore in MagneticButton
- **File:** `src/components/MagneticButton.tsx`
- **Change:** Simplified `MagneticButtonProps` interface (removed conflicting `ButtonHTMLAttributes & AnchorHTMLAttributes` intersection) and replaced `useRef<any>` with `useRef<HTMLElement>`. Updated imports to use named exports (`memo`, `ReactNode`, `MouseEvent`)
- **Why:** The intersection type caused unresolvable conflicts when spreading props onto motion elements

### 10. Added 404 catch-all route
- **File:** `src/App.tsx`
- **Change:** Added `<Route path="*">` with full-page "404 / Page not found" JSX and "Go Home" link
- **Why:** Previously, navigating to unknown routes rendered an empty page

## Batch 3: Contact Form Fix

### 11. Added form state management
- **File:** `src/components/Contact.tsx`
- **Change:** Added `useState` for form fields, errors, and submitted state

### 12. Added form validation
- **File:** `src/components/Contact.tsx`
- **Change:** Implemented `validate()` function checking required fields + email format regex. Inline error messages shown below each field in accent color

### 13. Added form submission handler
- **File:** `src/components/Contact.tsx`
- **Change:** Replaced `e.preventDefault()` no-op with `handleSubmit` that validates → opens `mailto:` link with pre-filled subject/body → shows success state
- **Why:** Form now actually works (opens email client with form data)

### 14. Added htmlFor/id pairs
- **File:** `src/components/Contact.tsx`
- **Change:** Added `htmlFor` to all labels and matching `id` to all inputs
- **Why:** Screen readers can now associate labels with inputs

### 15. Added submitted success state
- **File:** `src/components/Contact.tsx`
- **Change:** After form submission, renders a "Message Sent" confirmation with CheckCircle icon

## Batch 4: SEO Infrastructure

### 16. Added Open Graph meta tags
- **File:** `index.html`
- **Change:** Added `og:title`, `og:description`, `og:url`, `og:type`

### 17. Added Twitter Card meta tags
- **File:** `index.html`
- **Change:** Added `twitter:card`, `twitter:title`, `twitter:description`

### 18. Added canonical URL
- **File:** `index.html`
- **Change:** Added `<link rel="canonical" href="https://nexus.agency/">`

### 19. Added favicon
- **File:** `index.html`
- **Change:** Added inline SVG favicon link showing "N"
- **Why:** Browser tabs now show an icon

### 20. Added sitemap.xml
- **File:** `public/sitemap.xml` (new)
- **Change:** Created XML sitemap listing all 6 pages with priorities

### 21. Added robots.txt
- **File:** `public/robots.txt` (new)
- **Change:** Allow all crawlers, points to sitemap

## Batch 5: Font & Performance

### 22. Moved font loading from CSS @import to HTML link
- **File:** `src/index.css`, `index.html`
- **Change:** Removed `@import url('...Google Fonts...')` from CSS. Added `<link rel="preload" as="style">` + `<link rel="stylesheet" media="print" onload="this.media='all'">` in HTML with `display=swap`
- **Why:** CSS @import blocks rendering; HTML loading with `display=swap` eliminates FOIT and improves FCP

### 23. Added Page Visibility API pause to animationManager
- **File:** `src/utils/animationManager.ts`
- **Change:** Added `visibilitychange` listener that cancels RAF when tab is hidden, resumes when visible
- **Why:** Prevents CPU/battery waste on background tabs

## Batch 6: UI/Code Quality

### 24. Fixed social media placeholder links
- **File:** `src/components/Footer.tsx`
- **Change:** Updated Instagram, Twitter, LinkedIn, Dribbble hrefs from `"#"` to plausible URLs with `target="_blank" rel="noopener noreferrer"`

### 25. Fixed legal page placeholder links
- **File:** `src/components/Footer.tsx`
- **Change:** Updated Privacy Policy → `/privacy`, Terms of Service → `/terms`

### 26. Fixed heading hierarchy (h1 → h2)
- **Files:** `src/components/About.tsx`, `src/components/Services.tsx`, `src/components/Process.tsx`
- **Change:** Changed `motion.h1` to `motion.h2` in sections following the Hero's h1
- **Why:** Proper heading hierarchy — only one h1 per page (Hero)

### 27. Removed unused default React imports
- **Files:** About.tsx, Footer.tsx, Hero.tsx, PageTransition.tsx, Services.tsx, Work.tsx, Home.tsx, Portfolio.tsx, Loader.tsx, CustomCursor.tsx, Spotlight.tsx, FluidBackground.tsx, CaseStudy.tsx
- **Change:** Removed `import React from 'react'` (or changed `import React, { ... }` to `import { ... }`)
- **Why:** React 19 JSX transform doesn't require default import for JSX

### 28. Added focus-visible styles
- **File:** `src/index.css`
- **Change:** Added `*:focus-visible` rule with blue outline and offset
- **Why:** Keyboard navigation now has visible focus indicators (WCAG 2.4.7)

### 29. Improved gallery alt text
- **File:** `src/pages/CaseStudy.tsx`
- **Change:** Changed `"Project detail"` to `` `${project.title} project showcase` `` and `"Gallery {i+1}"` to `` `${project.title} gallery image {i+1}` ``
- **Why:** Screen readers now get descriptive alt text

### 30. Fixed redundant useState → useMemo in CaseStudy
- **File:** `src/pages/CaseStudy.tsx`
- **Change:** Replaced `useState` + `useEffect` pattern with `useMemo` for project lookup
- **Why:** Eliminates unnecessary re-render and extra effect on mount

### 31. Fixed Process component types
- **File:** `src/components/Process.tsx`
- **Change:** Replaced `step: any` and `progress: any` with proper interface and `MotionValue<number>`
- **Why:** Restores TypeScript type safety

### 32. Fixed Marquee velocity bug
- **File:** `src/components/InfiniteMarquee.tsx`
- **Change:** Replaced buggy `moveBy += directionFactor.current * moveBy * velocity` with `moveBy *= 1 + Math.abs(velocity) * 0.1`
- **Why:** Original formula had self-multiplication causing non-linear stuttering and compounded direction factor

## Regressions Fixed During Implementation

- Fixed `React` namespace errors in Contact.tsx, PageTransition.tsx, MagneticButton.tsx (converted to named type imports)
- Fixed ErrorBoundary class component typing issue caused by tsconfig `useDefineForClassFields: false` + `experimentalDecorators: true`
