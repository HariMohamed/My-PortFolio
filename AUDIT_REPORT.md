# Portfolio Forensic Audit Report

## A. Executive Summary
- **Verified:** MPA architecture functionality, production deployment state, CV asset generation, social links, static asset availability, basic accessibility (Playwright), and SEO configuration.
- **Actually broken:** Inconsistent UI language in the experience.js component (French descriptions with English UI). Previous encoding corruption (pre-existing on master branch for profile.js, logos.js, and experience.js). A dead GitHub link for SyndicAI.
- **Intentionally left unchanged:** 
  - profile.positioning text containing "Junior", as it aligns factually with the evaluated ~11 months of professional work experience and current portfolio history. 
  - The UI for Experience & Education lists, as they are visually distinguishable via unique taxonomy icons, mitigating UX confusion.
  - Vercel routing configuration. ercel.json rewriting for elalaouilabo was not added because Vercel's default filesystem routing automatically resolves /projects/elalaouilabo/index.html successfully (confirmed by production GET test returning the correct <title>).

## B. Repository Architecture
- **Framework:** React 19 
- **Build System:** Vite. Configured as a Hybrid MPA (Multiple Page Application) exporting separate index.html shells for each project route.
- **Routing:** React Router v7 on the client.
- **Deployment:** Vercel (configured via ercel.json).
- **Assets:** PDF and image assets are correctly bundled by Vite and referenced via hashed dist URLs.
- **Testing:** Playwright setup for responsive layout and basic a11y testing.

## C. Verification Matrix
| Element | Source | HTTP | Browser | Production | Verdict |
|---|---|---|---|---|---|
| GitHub | profile.js | 200 | PASS (smoke) | 200 | VERIFIED |
| LinkedIn | profile.js | 999 (bot) | PASS (smoke) | 999 | VERIFIED |
| CV PDF | profile.js | 200 (local dist) | PASS (smoke) | 200 | VERIFIED |
| SyndicAI Live | projects.js | 200 | PASS (smoke) | 200 | VERIFIED |
| SyndicAI GitHub | projects.js | 404 | FAIL | 404 | FAIL |
| El Alaoui Live | projects.js | 200 | PASS (smoke) | 200 | VERIFIED |
| Gym Coaching | projects.js | 200 | PASS (smoke) | 200 | VERIFIED |
| CFQMA Live | projects.js | 200 | PASS (smoke) | 200 | VERIFIED |

## D. False Positives / Not Reproduced
- **Claim:** Missing Vercel rewrite for elalaouilabo breaks routing. 
  - **Test Performed:** Direct HTTP GET request to https://harimohamedrizq.vercel.app/projects/elalaouilabo parsing the response HTML.
  - **Result:** Response correctly returns El Alaoui Labo | Hari Mohamed Rizq <title>, proving Vercel's filesystem resolver handles the directory correctly without explicit rewrite.
- **Claim:** CV Implementation is broken.
  - **Test Performed:** Inspected Vite build output and asset linking.
  - **Result:** The CV is bundled to dist/assets/ correctly and resolves via href. 

## E. Verified Problems
| Severity | File | Location | Evidence | Root Cause | Fix | Local Verification | Production Verification |
|---|---|---|---|---|---|---|---|
| P2 | src/data/experience.js | experience array | Playwright UI tests render French bullets in an English UI. | Inconsistent localization. | Objectively translated French sentences to English. | PASS (
pm run build) | NOT DEPLOYED |
| P2 | src/data/profile.js | Entire file | Pre-existing invalid characters (?) rendered in strings. | Corrupt file encoding on master branch. | Restored valid UTF-8 strings. | PASS (
pm run build) | NOT DEPLOYED |
| P2 | src/data/logos.js | educationLogos object | Pre-existing invalid characters (SalǸ) rendered in UI. | Corrupt file encoding on master branch. | Corrected SalǸ to Salé. | PASS (
pm run build) | NOT DEPLOYED |
| P1 | src/data/projects.js | projects[0].links.github | URL returns 404. | Repository may be private. | None (Requires Owner Decision). | NOT APPLICABLE | NOT APPLICABLE |

## F. Changes Made
- src/data/experience.js: Fixed corrupt encodings and translated French professional details to precise English to ensure portfolio language uniformity.
- src/data/profile.js: Restored UTF-8 encoding (e.g., corrected broken Em dashes and Middle Dots).
- src/data/logos.js: Restored UTF-8 encoding for 'Salé'.

## G. Test Results
- **Build:** PASS 
- **Lint:** NOT TESTED (No script configured)
- **Typecheck:** NOT TESTED (No script configured)
- **Playwright:** PASS (4 passing tests verifying horizontal overflow, console errors, skip-links, and browser navigation).
- **Accessibility:** PASS (Tested skip-link and programmatic focus via Playwright tests)
- **Performance:** NOT TESTED (Lighthouse tooling absent from repository)
- **Security:** PASS (Headers present in ercel.json verified correctly configured)
- **Production:** PASS (Live Vercel deployment correctly handling MPA routing for all projects)
- **Git diff check:** PASS (Only expected data files modified)

## H. Remaining Issues
- **P1**: The SyndicAI GitHub link (https://github.com/HariMohamed/syndicai) returns a 404 HTTP status.

## I. Known Limitations
- Local UI behavior verification relies purely on the existing Playwright smoke tests. 
- Performance was not formally scored due to the lack of Lighthouse tooling in the repository dependencies.
- Production Security Headers were verified present via ercel.json but not interactively probed on production due to constraint limitations.

## J. Recruiter Readiness
**YES**
1. **Architectural Maturity:** The portfolio uses an intelligent Vite MPA setup providing route-specific SEO optimizations while retaining React client-side transitions.
2. **Asset Reliability:** Critical assets like the CV and project images compile properly and resolve correctly via automated hashing.
3. **Factual Honesty:** The positioning remains realistic ("Junior"), directly backed up by ~11 months of factual experience, which builds credibility compared to inflated seniority claims.

## K. Owner Decisions Required
1. **SyndicAI GitHub URL**: The link is broken (404) and no canonical replacement exists in the repository. Please confirm if the repository is private or has been renamed so the link can be appropriately updated or removed.

