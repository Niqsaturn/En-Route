# En-Route website and release-review continuation — 2026-11-22

## Decisions
- The GitHub website stays a small, accessible promotional site with authentic gameplay, launcher information and **free account registration**.
- **All subscription details, paid plans, Developer Pack/Support Pack, Notes purchases, XP boosts, Notes boosts, payment flow and subscription management remain inside the installed En-Route game.** No website storefront or checkout.
- The homepage and signup form stay at the GitHub Pages URL. Browser registration and verification calls use the secured HTTPS Tailscale Funnel API with a narrowly scoped CORS allowlist.
- **Do not enable GitHub Pages, merge to main, turn on DNS, remove noindex, or advertise/download an unverified installer.** Owner approval required for publication.

## Verified changes to this branch
- Layout sequence: centered promotional hero, existing authentic 0.2.20 gameplay trailer, three game-mode cards, then free account creation, then closing CTA.
- Responsive mobile signup link in the header; sign-up status remains on the page.
- Removed web copy about Notes, rewards, subscriptions and other monetization.
- Kept the large launcher CTA in the layout but deliberately **disabled** its destination until an installable verified artifact and checksum are available. The previous local patcher path was not a valid GitHub-hosted download.
- Trailer remains correctly marked as footage captured from 0.2.20; signed published game update feed was observed at 0.2.21. No misleading recapture claim.
- Four desktop/tablet/mobile browser sizes and mock cross-origin signup and verification passed after layout changes, with the page URL unchanged and no JS errors. CI-free reproducible source checks are in qa/static-prelaunch.test.mjs.

## Latest account integration staging
- Live account ingress still rejects the GitHub Pages Origin preflight (previous observed HTTP 403). Do not register test users against production until carefully staged.
- A **separate** candidate patch for the more recent 0.2.22 account source has been staged to D:\En-Route\WebsiteService-20261122\AccountCorsStaging\account-0.2.22-github-pages-staged.mjs. It passed Node syntax validation and all 4 CORS scope tests.
- No live account backend, database, email provider, keys or hosting settings were changed here. Production restricted-Origin CORS, authorized-mailbox registration, and security regression tests remain.

## Game changes separately observed (not yet published)
- C:\Users\rac\AppData\Local\EnRouteRelease\EnRoutePresentation-20261122\Game\src\progressionCatalog.ts contains Free, Member and Support Pack cards and a separate extras/boosts area. Purchase actions are disabled pending authenticated billing support; avoid treating these as live purchasable products.
- Game/src/styles.css includes larger viewport-aware versus-screen presentation.
- Board-Cr-ft resizing and the full VS-screen play-through still require independent interactive regression checks; a later resizing QA command timed out and yielded no completed result.

## New gameplay trailer candidate — local, not on the site
- D:\En-Route\WebsiteService-20261122\TrailerCandidate-0.2.22\EN_ROUTE_NEW_GAMEPLAY_TRAILER_CANDIDATE_0.2.22.mp4
- SHA-256: BA1F0F8AC5F70140E2315C711003A3A920B2C51787C2F4B5C94F2DE126E2A2CD
- 68 seconds, 1280x720 at 24fps, H.264 and stereo 48kHz AAC. Uses the staged 1920x1080 NiqSaturn intro, genuine isolated-browser 0.2.22 gameplay captures for all three modes, original project soundtrack and a reused ending brand card.
- Browser playback subsequently passed: 68s metadata, frame size 1280x720, playhead advancement beyond 2 seconds, no page errors. However editor still needs a **visual edit review**, audio loudness QA and a fully new ending graphic before this should replace the verified 0.2.20 website trailer.
- Candidate footage comes from an **unpublished 0.2.22 build**, not a current production capture. Do not label it as a released 0.2.22 gameplay trailer until the corresponding build is qualified.

## Remaining release gates
1. Verify candidate trailer visually and finalize branding/audio; audit current build and camera angles. Replace site media only after authenticity and browser playback checks.
2. Complete Board-Cr-ft window resize, King-base UI/camera and enlarged VS-screen runtime QA at multiple resolutions.
3. Verify in-client packages, extras and billing gating; purchases must not alter competitive PvP fairness.
4. Finish restricted CORS backend deployment and approved real-mail signup checks.
5. Replace disabled installer CTAs only with an audited, preferably Authenticode-signed first-install Windows launcher; test clean install, upgrade, rollback and uninstall.
6. Check site accessibility, CSP for cross-origin API, download integrity, mobile performance and metadata.
7. Owner signs off public GitHub Pages publication separately.

## Legacy Tailscale website retirement — verified 2026-11-22

The outdated public **website-only** `/enroute` handler on the existing 8443 Tailscale ingress was removed by exact-path configuration, leaving the root handler byte-for-byte unchanged. Post-change HTTP checks: old `/enroute/` returns **404**, account `/enroute-account/healthz` returns **200**, and signed updates `/enroute-updates/latest.signed.json` returns **200**. The public API Funnel remains intentionally available for the future JavaScript signup integration. GitHub Pages remains unpublished; do not confuse retirement of the old handler with the removal of account or patch infrastructure.
