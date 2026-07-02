# Fix Plan — Nexus Creative Agency

## Batch 1: Dependency & Dead Code Cleanup (Zero Risk)
| # | Issue | Action | Files | Risk |
|---|-------|--------|-------|------|
| 1 | Unused Express + @types/express | Remove from package.json deps | package.json | None |
| 2 | Unused dotenv | Remove from package.json deps | package.json | None |
| 3 | Clients.tsx dead code | Delete file | src/components/Clients.tsx | Verify no imports |

## Batch 2: Error Resilience (Low Risk)
| # | Issue | Action | Files | Risk |
|---|-------|--------|-------|------|
| 4 | No error boundary | Wrap Routes in ErrorBoundary | src/components/ErrorBoundary.tsx (new), src/App.tsx | Low |
| 5 | @ts-ignore in App.tsx | Fix AnimatePresence mode typing | src/App.tsx | Low |
| 6 | @ts-ignore in MagneticButton | Fix component type | src/components/MagneticButton.tsx | Low |
| 7 | No 404 route | Add catch-all route | src/App.tsx | Low |

## Batch 3: Contact Form Fix (Low Risk)
| # | Issue | Action | Files | Risk |
|---|-------|--------|-------|------|
| 8 | Form does nothing | Add mailto: action + validation + feedback | src/components/Contact.tsx | Low |
| 9 | No form validation | Add required attrs + validation | src/components/Contact.tsx | Low |
| 10 | No htmlFor on labels | Add htmlFor/id pairs | src/components/Contact.tsx | Low |

## Batch 4: SEO & Meta Tags (Very Low Risk)
| # | Issue | Action | Files | Risk |
|---|-------|--------|-------|------|
| 11 | No OG/Twitter tags | Add to index.html | index.html | Very Low |
| 12 | No favicon | Add favicon link | index.html | Very Low |
| 13 | No canonical | Add canonical URL | index.html | Very Low |
| 14 | No sitemap/robots | Create public/ files | public/sitemap.xml, public/robots.txt (new) | Very Low |

## Batch 5: Font & Performance (Low Risk)
| # | Issue | Action | Files | Risk |
|---|-------|--------|-------|------|
| 15 | @import font blocks render | Move to HTML link with display=swap | index.html, src/index.css | Low |
| 16 | RAF runs on hidden tab | Add Page Visibility check | src/utils/animationManager.ts | Low |

## Batch 6: UI/Code Quality (Low Risk)
| # | Issue | Action | Files | Risk |
|---|-------|--------|-------|------|
| 17 | Social/legal links href="#" | Update to valid placeholders | src/components/Footer.tsx | Very Low |
| 18 | Duplicate h1 (About) | Change to h2 | src/components/About.tsx | Very Low |
| 19 | Unused React imports | Remove from all components | All .tsx files | Very Low |
| 20 | No focus-visible styles | Add to CSS | src/index.css | Very Low |
| 21 | Gallery alt text generic | Improve alt text | src/pages/CaseStudy.tsx | Very Low |
| 22 | Redundant useState → useMemo | Refactor | src/pages/CaseStudy.tsx | Low |
| 23 | Process any types | Add proper types | src/components/Process.tsx | Low |
| 24 | Marquee velocity bug | Fix formula | src/components/InfiniteMarquee.tsx | Low |
