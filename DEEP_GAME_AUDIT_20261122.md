# En-Route deep game & billing release audit — 2026-11-22

**Disposition: PRELAUNCH / DO NOT PUBLISH.** This report describes staging and verified tests; it does not claim that the published game or account server has been upgraded.

## Creative vision lock
- **Blitzkrieg:** 100-level real-time chess survival; King protection is paramount; chess-legal player movement, meaningful captures, Fair Fisher water telegraphs, Kaspagrove concealment, Hicargu teleports, Violet Court and Equinox Dynasty encounters, timed tactical boss-puzzle trios every 10 levels. Keep unit limits, Royal Convergence, and early-game difficulty/reward restraint consistent.
- **Ulti:** autonomous chess-inspired hex-board strategy, eight distinct creator-themed factions and the eventual final boss, real physical Pawn placement and fusion, camera-native 3D board, meaningful unit selection, private and CPU rooms. Never replace actual Pawns with a numeric sidebar proxy.
- **Board-Cr-ft:** real-time four-court chess RTS on a large, freely navigable 3D world, tangible Pawn labor at resources, King bases, real Time/Elo economy, four courts and multiplayer visibility/fog boundaries.
- **Across modes:** battlefield-first UI, clear legal actions and attack tells, accessible optional details, tactile audiovisual feedback, no clutter during combat, configurable motion/graphics, trustworthy save integrity, no paid PvP advantage.

## Completed in unpublished candidate
- Stripe account connector now has **Test Mode**. Test catalog has **no products, prices, subscriptions, checkout sessions or webhook endpoints** as inspected. Live Mode is a distinct option and must not be used for testing.
- Stripe Tax test settings are **pending** (missing head-office address); tax registrations absent. No test pricing, checkout sessions or tax assumptions created until merchant tax decision.
- Billing backend validates signed webhooks, idempotency and session ownership. Fixed a **reversed-checkout replay defect**: independently delivered later completion webhooks no longer restore a refunded or disputed Developer Support Pack. Added tests for refund/dispute and incorrect signature/mode, all passing.
- Billing status now explicitly identifies test mode; in-game membership UI labels sandbox checkout and portal as test transactions.
- Expanded encrypted local Campaign achievements from 4 to 15, retaining existing skill unlocks. Earned milestones are grouped in collapsible reference categories, never placed over the battlefield.
- Ulti 3D improved with perspective camera, orbit by right drag, scroll zoom, double-click reset, antialiasing and tone mapping. Reserve Pawns are represented with chess-piece art in a board-adjacent dock, selected and placed by the existing gameplay actions rather than an unrelated sidebar.
- In Ulti combat, non-essential shop/bench/detail panels automatically hide, enlarging the board. TACTICS reveals details on demand. Preparation controls remain in prep phase.
- Board-Cr-ft guest flow QA corrected to wait for an actual encrypted profile save before navigating between modes. Canvas and overlay aligned without horizontal overflow at 390x844, 900x600, 1280x720 and 1440x900.
- Verified game test suite 249/249 and account-service unit suite 44/44 in initial pass; focused achievement/Ulti tests 15/15. Further candidate updates passed TypeScript, Vite, 3 viewport Ulti 3D input tests, and 3 viewport combat-focus tests. Rerun full tests before release.

## Pending or blocked
1. **Stripe real end-to-end sandbox:** merchant must confirm whether they collect sales tax/VAT/GST; account tax settings lack a head-office address. Create test-only Product/Price objects, test webhook endpoint, secure test secret configuration, two purchase types, renewal/cancel/refund/dispute/chargeback cases with test clock, SQL rollback and entitlement idempotency. Do not confuse connector authorization with an application server secret.
2. **Competitive achievements security:** existing server card accepts allowlisted client-submitted IDs. That alone does *not* prove an Ulti PvP round, Board-Cr-ft victory, or Campaign boss; do not give ranked or paid rewards without server-verified outcomes. New 11 achievements remain local Campaign accomplishments.
3. **3D acceptance:** test real Windows GPUs, fps, camera picking after orbit/zoom, pointer and keyboard accessibility, WebGL context restore, dynamic resolution, and full CPU/peer match completion. Check achievement triggers across Ulti and Board-Cr-ft against authoritative events before expanding online account badges.
4. **UX quality:** user walkthrough of first-run flow, enlarged VS screen, campaign resizing and input, tournament feedback, board density, readability, accessibility and clutter on low-end resolutions; check actual scene rather than only code assertions.
5. **Website signup:** GitHub Pages staging frontend holds page address during HTTPS fetch, but live account Funnel still rejects GitHub-origin CORS preflight with HTTP 403. Deploy reviewed exact-origin, exact-signup-path CORS only after production account regression and rollback.
6. **Website media/downloads:** new 68-second trailer candidate exists locally from unpublished 0.2.22 captures. Final creative verification, branded end card, latest-build provenance and 1% playback error baseline remain. Disabled launcher CTA must point to a verified and preferably signed Windows installer with a working checksum/upgrade path.
7. **Publication:** site is on the prelaunch GitHub branch; never enable Pages or move public entry point until all gates pass. Legacy site-only Funnel handler was removed; account health and signed updates remained HTTP 200.

## Inspiration and research applied
- Teamfight Tactics: board/bench placement, contextual selection, unobstructed battlefield and discoverable optional details; avoid copying identity or game art.
- Dota Underlords: camera/bench collision and mobile aspect-ratio handling show why reserve pieces must remain accessible with the tactical board; integrate native input and visibility tests.
- Stripe Billing docs: use test clocks for subscription lifecycles; keep test subscriptions lean; sign and idempotently process asynchronous webhooks and do not rely on event order.

**Outcome:** no live Stripe charges; no public website deployment; staged edits and code/test evidence preserved.