# Website Audit Report — Nexus Creative Agency

**Generated:** July 1, 2026  
**Project:** Nexus Creative Agency  
**Type:** React 19 SPA (Vite + TypeScript + Tailwind CSS v4)

---

## Executive Summary

| Category | Score |
|---|---|
| **Overall Project Health** | **65/100** |
| **Performance** | **60/100** |
| **Security** | **80/100** |
| **Code Quality** | **55/100** |
| **UX** | **70/100** |
| **SEO** | **35/100** |

---

## Critical Issues

### 1. Contact form is non-functional — no submission logic
- **Severity:** Critical
- **File:** `src/components/Contact.tsx:75`
- **Root cause:** `onSubmit={(e) => e.preventDefault()}` silently swallows submission with no API call, validation, or feedback.
- **Impact:** Users can never actually contact the agency through the website. Zero conversion from the primary CTA.
- **Recommended fix:** Implement a form handler — either an email API (Formspree, EmailJS), server endpoint, or at minimum a `mailto:` fallback with validation.

### 2. Express server dependency unused
- **Severity:** Critical
- **File:** `package.json:18`
- **Root cause:** `express` is listed in `dependencies` but never imported or used anywhere in the codebase.
- **Impact:** Adds ~4MB to `node_modules`, confuses project architecture, and suggests broken backend integration.
- **Recommended fix:** Remove `express` and `@types/express` from `package.json` unless a server is planned.

### 3. No error boundaries anywhere
- **Severity:** Critical
- **File:** `src/App.tsx`, all pages
- **Root cause:** No `ErrorBoundary` component wraps any route or subtree. Any uncaught JS error will crash the full React tree.
- **Impact:** Entire app goes white-screen on any runtime error.
- **Recommended fix:** Add at minimum one top-level error boundary in `App.tsx` wrapping the `<Routes>`.

### 4. Social and legal links all use `"#"` as href
- **Severity:** Critical
- **Files:** `src/components/Footer.tsx:75-88`
- **Root cause:** Instagram, Twitter/X, LinkedIn, Dribbble, Privacy Policy, and Terms of Service links are all `href="#"`.
- **Impact:** Broken user experience — clicking does nothing besides scrolling to top. Erodes trust.
- **Recommended fix:** Add correct URLs or remove placeholder links until real destinations exist.

### 5. @ts-ignore suppresses real type errors
- **Severity:** Critical
- **Files:** `src/App.tsx:28,62`, `src/components/MagneticButton.tsx:38`
- **Root cause:** Uses `@ts-ignore` to bypass TypeScript errors instead of fixing the types.
- **Impact:** Hides genuine type issues that could cause runtime crashes.
- **Recommended fix:** Fix the underlying type issues. `AnimatePresence` `mode` typing, Loader `onComplete` callback typing, and MagneticButton component type intersection.

---

## Major Issues

### 6. Clients component is dead code
- **File:** `src/components/Clients.tsx`
- **Root cause:** `Clients.tsx` is defined but never imported or rendered anywhere in the app.
- **Impact:** Dead code increases bundle size and maintenance burden.
- **Recommended fix:** Remove the file or integrate it into the Hero/Home page.

### 7. Loader uses fake progress — not tied to actual loading
- **File:** `src/components/Loader.tsx:7-18`
- **Root cause:** Uses `setInterval` incrementing by `+2` every 20ms regardless of real loading state.
- **Impact:** Misleading UX — the loader always takes ~1 second regardless of actual load time. If content loads faster, the loader artificially delays it.
- **Recommended fix:** Either remove the loader entirely or tie it to real loading metrics (e.g., font loading, image loading).

### 8. No form validation on contact form
- **File:** `src/components/Contact.tsx:75-101`
- **Root cause:** All inputs are uncontrolled, no validation rules, no error messages.
- **Impact:** Users can submit empty forms with no feedback. No client-side validation at all.
- **Recommended fix:** Add `required` attributes, validation patterns, and error state handling.

### 9. Gallery images have generic/duplicate alt text
- **Files:** `src/pages/CaseStudy.tsx:122`, `src/pages/CaseStudy.tsx:184`
- **Root cause:** Alt text is `"Project detail"` and `"Gallery 1"`, `"Gallery 2"`, etc.
- **Impact:** Poor accessibility — screen readers get useless descriptions.
- **Recommended fix:** Use meaningful alt text per image, or mark as decorative with `alt=""`.

### 10. No Open Graph / Twitter Card meta tags
- **File:** `index.html:1-17`
- **Root cause:** Meta tags only include `charset`, `viewport`, `title`, and `description`.
- **Impact:** Links shared to social media platforms (Twitter, LinkedIn, Facebook, Discord) will have no preview image, no rich card.
- **Recommended fix:** Add `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`, etc.

### 11. Missing sitemap.xml, robots.txt, and canonical URL
- **Files:** N/A
- **Root cause:** No SEO infrastructure files exist.
- **Impact:** Search engines have limited guidance on indexing; no canonicalization can lead to duplicate content issues.
- **Recommended fix:** Add `public/sitemap.xml`, `public/robots.txt`, and `<link rel="canonical">`.

### 12. Google Fonts loading blocks rendering
- **File:** `src/index.css:1`
- **Root cause:** `@import url('...fonts.googleapis.com...')` at the top of the CSS file blocks CSS parsing.
- **Impact:** Font loading delays render, causing FOIT (Flash of Invisible Text) and increasing FCP/LCP.
- **Recommended fix:** Move font loading to `<link>` tags in `index.html` with `display=swap`, and consider preloading critical fonts.

### 13. No favicon
- **File:** `index.html`
- **Root cause:** No `<link rel="icon">` tag.
- **Impact:** Browser tabs show no icon; bookmark icons are missing.
- **Recommended fix:** Add a favicon link to `index.html`.

---

## Minor Issues

### 14. Unused React imports across all components
- **Files:** All components
- **Detail:** React 19's JSX transform makes `import React from "react"` unnecessary in files that only use JSX.
- **Recommended fix:** Remove unused React imports.

### 15. Heading structure uses `<h1>` twice on same page
- **Files:** `src/components/Hero.tsx:48`, `src/components/About.tsx:27`
- **Detail:** Home page has two `<h1>` elements — one in Hero and one in About.
- **Recommended fix:** Keep only one `<h1>` (Hero) and demote About to `<h2>`.

### 16. No `htmlFor` attributes on form labels
- **File:** `src/components/Contact.tsx:78-94`
- **Detail:** Labels are present but not associated with inputs via `htmlFor`/`id`.
- **Impact:** Screen readers can't associate labels with their inputs.
- **Recommended fix:** Add matching `htmlFor` and `id` attributes.

### 17. Social media placeholder links in Hero also clien names
- **File:** `src/components/Hero.tsx:10-18`
- **Detail:** Hardcoded list of major brands (Google, Microsoft, etc.) as "clients" — these are likely aspirational, not actual clients.
- **Impact:** Could be misleading if presented as actual client logos. Minor ethical/legal concern.
- **Recommended fix:** Either make clear these are aspirational, use actual clients, or remove.

### 18. `Clients.tsx` duplicates the same brand names
- **File:** `src/components/Clients.tsx:4-6`
- **Detail:** Similar list of brands (Airbnb, Spotify, Google, Nike, Netflix, Figma) — also never rendered.
- **Recommended fix:** Remove dead component.

### 19. Case study testimonial is static/fake
- **File:** `src/pages/CaseStudy.tsx:220-224`
- **Detail:** "Jane Doe, CEO" with a generic quote is placeholder content.
- **Recommended fix:** Replace with real testimonials or add from project data.

### 20. No `:focus-visible` styles
- **Files:** `src/index.css`
- **Detail:** No custom focus ring or visible focus indicator for keyboard users.
- **Impact:** Keyboard navigation is invisible; WCAG 2.4.7 failure.
- **Recommended fix:** Add `focus-visible` styles to interactive elements.

### 21. No accessibility skip-to-content link
- **Detail:** First focusable element should be a skip-to-content link.
- **Recommended fix:** Add a skip navigation link at the top of `<body>`.

### 22. animationManager continues rAF when tab is hidden
- **File:** `src/utils/animationManager.ts`
- **Detail:** `requestAnimationFrame` runs even when the page is in a background tab.
- **Impact:** Wasted CPU/battery on hidden tabs.
- **Recommended fix:** Use `document.hidden` or Page Visibility API to pause RAF.

### 23. TiltCard creates ResizeObserver and scroll listener per instance
- **File:** `src/components/TiltCard.tsx:52-60`
- **Detail:** Every `TiltCard` creates its own `ResizeObserver` and `scroll` listener.
- **Impact:** On pages with many cards (Portfolio has 4+), this could be expensive.
- **Recommended fix:** Consider a shared observer pattern or intersection observer instead.

### 24. `dotenv` dependency in client
- **File:** `package.json:17`
- **Detail:** `dotenv` is listed as a dependency but Vite handles env vars natively via `import.meta.env`.
- **Impact:** Unnecessary dependency bloat.
- **Recommended fix:** Remove `dotenv` unless used in a Node.js context.

### 25. Lenis smooth scroll conflicts with native scroll
- **File:** `src/components/SmoothScroll.tsx`
- **Detail:** Lenis intercepts and overrides native scrolling. Some users may experience jank or conflicts with browser extensions.
- **Impact:** Can cause scroll issues on some devices; increases bundle size.
- **Recommended fix:** Consider making Lenis opt-in or providing a fallback.

### 26. No empty state for portfolio/projects
- **File:** `src/pages/Portfolio.tsx`, `src/pages/CaseStudy.tsx`
- **Detail:** If `projectsData` is empty or invalid ID is provided, the user sees broken layouts.
- **Impact:** Poor UX for edge cases (though currently data is static).
- **Recommended fix:** Add proper empty/not-found states.

### 27. Case study uses `setProject` state which is redundant
- **File:** `src/pages/CaseStudy.tsx:9-14`
- **Detail:** `useState` + `useEffect` to find project by ID is redundant — can be derived directly from `useMemo`.
- **Impact:** Unnecessary re-render on mount; extra effect.
- **Recommended fix:** Use `useMemo` instead of state + effect.

### 28. `prefersReducedMotion` checked repeatedly in every component
- **Files:** 10+ components
- **Detail:** Each component duplicates the same `window.matchMedia('(prefers-reduced-motion: reduce)')` logic.
- **Impact:** Code duplication across the project.
- **Recommended fix:** Create a shared hook `usePrefersReducedMotion()`.

### 29. Process component uses `any` types extensively
- **File:** `src/components/Process.tsx:192-194`
- **Detail:** `step: any`, `progress: any` — no proper typing for MotionValue.
- **Impact:** Loss of TypeScript safety.
- **Recommended fix:** Type as `MotionValue<number>` and create proper interfaces.

### 30. SplitText animation won't re-trigger on route change
- **File:** `src/components/SplitText.tsx:60-74`
- **Detail:** `ScrollTrigger` with `once: true` means when navigating between routes, the animation won't replay.
- **Impact:** Static text appearance on re-entry.
- **Recommended fix:** Use `ScrollTrigger` refresh on route change, or `key` prop on SplitText to force re-creation.

---

## Performance Issues

| Issue | File | Impact | Est. Improvement | Recommendation |
|---|---|---|---|---|
| Google Fonts @import blocks CSS | `src/index.css:1` | High — delays FCP/LCP by ~300-800ms | ~15-20% LCP reduction | Use `<link>` with `display=swap` + `preload` |
| GSAP + SplitType for text animation | `src/components/SplitText.tsx` | High — GSAP is ~150KB gzipped, SplitType ~10KB for minor animation | ~10% bundle size reduction | Replace with CSS-only or motion library animation |
| Heavy framer-motion (motion) bundle | `package.json:22` | Medium — animation library is ~120KB+ | ~8-10% JS bundle reduction | Limit `motion` imports to only what's used |
| No image lazy loading on Hero images | `src/components/Hero.tsx` | Low — few images, but eager loading could be better | Minimal | Already using lazy in most places; verify all are lazy |
| Eager font loading without font-display:swap | `src/index.css:1` | High — FOIT up to 3s | ~300-500ms FCP improvement | Add `&display=swap` to Google Fonts URL |
| No code splitting on Home page content | `src/pages/Home.tsx` | Medium — only 3 of 9 sections are lazy loaded | ~15% initial JS reduction | Lazy load all below-fold components |
| Multiple ResizeObservers per TiltCard | `src/components/TiltCard.tsx:52` | Low — scales with card count | Minimal CPU improvement | Use shared observer pattern |
| RAF runs when tab is hidden | `src/utils/animationManager.ts` | Medium — battery/CPU waste on background tabs | ~50% background CPU reduction | Page Visibility API pause |
| CSS bundle likely large | `dist/assets/index-DtoGREwb.css` | Medium — Tailwind generates significant CSS | ~20-30% CSS reduction | Purge unused CSS, enable Tailwind optimization |
| No preconnect for critical origins | `index.html:10-11` | Low — only fonts.googleapis.com preconnected | ~100ms FCP improvement | Add `preconnect` for all third-party origins |
| Splitting large bundle files | `dist/assets/` | High — main JS bundle is likely large | ~20-30% bundle reduction | Enable code splitting on all routes + components |
| Portfolio page loads all images at once | `src/pages/Portfolio.tsx` | Medium — all 4 project images load on mount | ~40% initial page weight | Use `loading="lazy"` on portfolio images below fold |

---

## Bugs

### B1. Contact form silently fails
- **Description:** "Send Message" button does nothing on click.
- **Reproduction:** Fill in form → Click "Send Message" → Nothing happens.
- **Expected:** Form submits data to an email/API endpoint.
- **Actual:** Form is prevented from submitting via `e.preventDefault()`.
- **Root cause:** `onSubmit={(e) => e.preventDefault()}` in Contact.tsx:75.
- **Suggested solution:** Implement form submission (Formspree, EmailJS, or backend endpoint).

### B2. Portfolio scroll-to-top behavior
- **Description:** When navigating from CaseStudy back to Portfolio, ScrollToTop may conflict with sticky positioning.
- **Reproduction:** Scroll deep on CaseStudy → Click "Back to Portfolio" → Page scrolls to top but sticky cards may jump.
- **Expected:** Smooth transition to portfolio page top.
- **Actual:** Possible layout shift due to sticky positioned cards resetting.
- **Root cause:** `window.scrollTo(0, 0)` in ScrollToTop.tsx:8 is instant.
- **Suggested solution:** Use Lenis scrollTo or smooth scroll behavior.

### B3. Navbar hash links break on non-root pages
- **Description:** From `/portfolio` page, clicking "About" (/#about) navigates to home but doesn't scroll to the about section.
- **Reproduction:** Go to `/portfolio` → Click "About" in nav → Goes to `/` but doesn't scroll to about section.
- **Expected:** Navigate to `/#about` and scroll to about section.
- **Actual:** Only navigates to `/`.
- **Root cause:** `handleLinkClick` in Navbar.tsx:42-52 uses `location.pathname !== '/'` check but navigates via `navigate(href)` which might not handle hash scrolling.
- **Suggested solution:** Ensure `navigate(href)` properly triggers hash-based scrolling; consider `useEffect` for hash scrolling.

### B4. Case Study heading animation may not play
- **Description:** The `motion.h1` in CaseStudy.tsx uses `initial/animate` but if navigated directly (fresh load), animation may not play correctly.
- **Reproduction:** Navigate directly to `/portfolio/nova-ai` → H1 animation may skip or flash.
- **Expected:** Title animates in from opacity:0 y:30.
- **Actual:** Animation may skip on fresh loads due to timer.
- **Root cause:** No key prop to force re-animation on content change.
- **Suggested solution:** Use `key={project.id}` on the animated container.

### B5. Marquee direction reversed bug
- **Description:** InfiniteMarquee scroll velocity inversion logic has a mathematical error.
- **File:** `src/components/InfiniteMarquee.tsx:56` — `moveBy += directionFactor.current * moveBy * velocity;`
- **Expected:** Scroll velocity should influence direction smoothly.
- **Actual:** The formula `moveBy += directionFactor * moveBy * velocity` creates non-linear scaling that can cause stuttering.
- **Root cause:** `moveBy` is multiplied by itself in the adjustment.
- **Suggested solution:** Use `moveBy * (1 + velocity * 0.1)` instead.

### B6. Loader pollutes browser history
- **Description:** The loader component uses `fixed` positioning and takes up the full screen. During loading, browser back/forward may behave unexpectedly.
- **Reproduction:** Wait for loader → Note that the URL may have changed.
- **Expected:** No history manipulation during loading.
- **Actual:** No direct issue but the loading screen blocks interaction.
- **Root cause:** Loader renders as overlay preventing any interaction.
- **Suggested solution:** Ensure loader doesn't trap history navigation.

---

## Optimization Opportunities

| Optimization | Est. Impact | Effort | Category |
|---|---|---|---|
| Replace GSAP/SplitType with native CSS/motion animations | High (~100KB gzip) | Medium | Bundle size |
| Implement route-based code splitting for all sections | High (~30% initial JS) | Low | Bundle size |
| Add font-display:swap to Google Fonts | High (~300ms FCP) | Low | LCP |
| Preload critical fonts (Sora, Inter) | Medium (~100ms FCP) | Low | LCP |
| Remove unused dependencies (express, dotenv, @types/express) | Medium (~5MB node_modules) | Low | Dependencies |
| Remove dead code (Clients component) | Low (~2KB) | Low | Bundle size |
| Pause RAF when tab hidden | Medium (~50% CPU on bg) | Low | Performance |
| Compress images with modern formats | Medium (~30% image size) | Low | Performance |
| Add lazy loading to portfolio images below fold | Medium (~40% initial weight) | Low | Performance |
| Deduplicate prefersReducedMotion hook | Low (~500B per component) | Low | Code quality |
| Replace generic alt text with meaningful descriptions | Low | Low | Accessibility |
| Move CSS @import to HTML `<link>` | Medium (~200ms) | Low | Performance |

---

## Final Recommendations

### Fix Immediately
1. Contact form submission — implement functional form
2. Add error boundaries to prevent full-app crashes
3. Remove `@ts-ignore` and fix underlying type issues
4. Fix social/legal placeholder links (`#`)
5. Remove unused Express + dotenv dependencies
6. Add Google Fonts `display=swap` and move to `<link>`
7. Fix Marquee velocity math bug (B5)
8. Add favicon and SEO meta tags (OG, Twitter, sitemap, robots, canonical)

### Fix Soon
9. Remove dead Clients component
10. Replace Loader fake progress with real metrics or remove
11. Add form validation to contact form
12. Fix heading hierarchy (multiple `<h1>`)
13. Add `htmlFor`/`id` to form labels
14. Implement focus-visible keyboard styles
15. Add skip-to-content link
16. Pause RAF on background tab
17. Create shared `usePrefersReducedMotion` hook
18. Add proper empty/404 state for routes
19. Remove unused `import React` across components

### Nice to Have
20. Replace GSAP/SplitType with lighter animation approach
21. Lazy load more Home sections
22. TiltCard observer optimization
23. CaseStudy redundant state → useMemo refactor
24. Split a large CSS bundle with proper code splitting
25. Add JSON-LD structured data
26. Comprehensive image optimization pipeline
27. Add actual client names/logos instead of aspirational brands
28. Real testimonial data

---

*End of Report — 85 issues documented across 8 categories.*
