# En-Route deep game & billing release audit — 2026-11-22

**Disposition: PRELAUNCH / DO NOT PUBLISH.** This report describes staging and verified tests; it does not claim that the published game or account server has been upgraded.

## Creative vision lock
- **Blitzkrieg:** 100-level real-time chess survival; King protection is paramount; chess-legal player movement, meaningful captures, Fair Fisher water telegraphs, Kaspagrove concealment, Hicargu teleports, Violet Court and Equinox Dynasty encounters, timed tactical boss-puzzle trios every 10 levels. Keep unit limits, Royal Convergence, and early-game difficulty/reward restraint consistent.
- **Ulti:** autonomous chess-inspired hex-board strategy, eight distinct creator-themed factions and the eventual final boss, real physical Pawn placement and fusion, camera-native 3D board, meaningful unit selection, private and CPU rooms. Never replace actual Pawns with a numeric sidebar proxy.
- **Board-Cr-ft:** real-time four-court chess RTS on a large, freely navigable 3D world, tangible Pawn labor at resources, King bases, real Time/Elo economy, four courts and multiplayer visibility/fog boundaries.
- **Across modes:** battlefield-first UI, clear legal actions and attack tells, accessible optional details, tactile audiovisual feedback, no clutter during combat, configurable motion/graphics, trustworthy save integrity, no paid PvP advantage.

## Completed in unpublished candidate
- Stripe account connector now has **Test Mode**. The test catalog was empty at first inspection; two sandbox products and their prices were subsequently created (see update below). Live Mode is a distinct option and must not be used for testing.
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
## Later verification (same day)
- Full three-mode automated game suite rerun after Ulti combat-focus and payment test-label changes: **249/249 passed**.
- All account unit tests rerun including the new Stripe signed-refund/reversal and test-mode assertions: **45/45 passed**.
- TypeScript noEmit and Vite production build both passed.
- Browser Ulti combat-focused UI passed at 390, 900 and 1280 px; TACTICS reveal/re-hide and WebGL initialization validated.
- Board-Cr-ft canvas/overlay resize checks passed at 390, 900, 1280 and 1440 px after guest-profile persistence was allowed to complete.
- Fresh live HTTPS ingress checks: GitHub-origin registration preflight **403** (not ready), account health **200**, signed updates **200**, retired legacy website **404**.
- Site remains a staging-only branch, with no payment checkout embedded in website and no GitHub Pages deployment.

## Stripe sandbox configuration — no tax collection

On 2026-11-22 the owner confirmed **they will not collect sales tax, VAT, or GST** for En-Route purchases. Accordingly, the unpublished account backend now explicitly sends `automatic_tax[enabled]=false`; Stripe Tax is not activated. This describes a payment setting and does not determine legal tax obligations.

Two Stripe Test Mode products were created with default prices:
- Royal Pass Membership — `prod_VfwJtETCDI51uA`, `price_1UeaQhGH2tFr2xezrPi3WRmA`, **199 USD cents per month**.
- Developer Support Pack — `prod_VfwJXlVmWl0r0H`, `price_1UeaQmGH2tFr2xezg96TsuY1`, **299 USD cents one-time**, no auto-renewal.

Verified through Stripe Test Mode only: two unpaid Checkout sessions, correct recurring/one-time modes and USD amounts, `automatic_tax.enabled=false`, zero charges, zero PaymentIntents, zero subscriptions. The test sessions alone do **not** exercise account webhook delivery or grant in-game entitlements.

Local account environment names: `ENROUTE_STRIPE_MODE=test`, `ENROUTE_STRIPE_PRICE_MONTHLY`, `ENROUTE_STRIPE_PRICE_DEV_PACK`, `ENROUTE_STRIPE_SECRET_KEY` (an owner-managed `sk_test_` secret), and `ENROUTE_STRIPE_WEBHOOK_SECRET` (test-only destination secret). Never put API keys or signing secrets in this repository or the game client. Keep test webhook handling and MariaDB isolated from live accounts until full end-to-end validation.

The completed code test run now passes **47/47 account tests**, including backend no-tax Checkout fields, signed webhook reversal protection and sandbox/live-mode separation. Existing game suite was **249/249**. The production account backend still has checkout disabled, and GitHub Pages is not enabled. Remaining gates: isolated test backend with real Stripe test keys, signed webhooks, test card lifecycle, production GitHub-origin signup CORS and installer/trailer creative approval. **Publication stays blocked.**
