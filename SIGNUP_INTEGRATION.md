# GitHub Pages signup integration — prelaunch only

The website is staged, not published or merged to main. Do not enable GitHub Pages, remove noindex, promote builds, or send real registrations without owner approval.

## Architecture
Static website form uses assets/account-signup.js with asynchronous fetch, credentials omitted and JSON. It calls the public API https://en-route.ringtail-anoles.ts.net:8443/enroute-account/api/auth/register and its /verify and /resend endpoints. The browser stays on the GitHub Pages URL. The API hostname is not secret, but no passwords, keys, account tokens, SMTP/database secrets or local console ports belong in public source.

## Required backend gate
Current account server rejects foreign Origin headers. Allow exactly the HTTPS Origin https://niqsaturn.github.io for exactly three public paths:
- POST /enroute-account/api/auth/register
- POST /enroute-account/api/auth/register/verify
- POST /enroute-account/api/auth/register/resend

Reply to OPTIONS on only these paths with Access-Control-Allow-Origin: https://niqsaturn.github.io; Access-Control-Allow-Methods: POST, OPTIONS; Access-Control-Allow-Headers: content-type; Vary: Origin; no Allow-Credentials. All success and error responses on these paths must carry the exact allow-origin. No wildcard and no CORS for login, account data or administrative endpoints. Preserve the account API rate limits, email verification binding and password validation.

A future custom domain needs a separately reviewed exact HTTPS Origin. Front-end JavaScript cannot bypass CORS or make a private Tailscale route publicly accessible.

## Tests before release
1. Browser QA at desktop/tablet/mobile widths, mocked signup/verify/resend, no page navigation.
2. Confirm real OPTIONS preflight and negative-origin tests.
3. Test registered mail delivery, verification expiry, duplicate prevention, resend throttling and launcher login using authorized test data.
4. Confirm CSP connect-src permits the API origin when headers are set, and verify installer checksum and live HTTPS.
5. Obtain explicit approval before publishing GitHub Pages or promoting the website and installer.

## Verified staging receipt (2026-11-22)

- Source committed to GitHub review branch and downloaded into isolated local preview; Node syntax check passed.
- Four browser viewports tested against a **local mock API server on a separate origin**, with real browser CORS preflight behavior: 2 OPTIONS + 2 POST requests, signup and verification transitions passed, address unchanged, no page JavaScript errors.
- Four backend CORS unit tests passed; separately staged account API passed Node syntax check.
- The existing public endpoint was tested with OPTIONS only and returned HTTP 403 (no Access-Control-Allow-Origin). **This blocks live GitHub-origin registration until a reviewed backend release is deployed.** No live signup or account creation was attempted.
- All testing leaves production account services and GitHub Pages publication unchanged.
