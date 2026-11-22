# En-Route: Blitzkrieg — three-mode source, FX and publication audit
_2026-11-22 · Unpublished 0.2.22 candidate, verified against prior game-design decisions_

## Disposition
**DO NOT confuse a passed unit suite or signed package with launch certification.** The new game candidate, account API and site changes are staged. The public game update feed remains 0.2.21, and GitHub Pages is not enabled. Owner identity and distinct GM account have not been registered or bound to real database roles.

## Canonical gameplay / presentation requirements
The campaign is a chess-legal real-time survival roguelike with a protected King. Main player class chosen Pawn, Knight, Bishop, Rook or Queen; the King is manually movable only while in check. Opponents use Violet Court/Equinox factions. Levels reach 100, with three timed tactical checkmate challenges at boss checkpoints every 10 levels. Keep early difficulty meaningful, upgrades less frequent, rewards earned rather than automatically showered. The battlefield must remain readable when full, with hazards telegraphed and no unavoidable enemy spawn.

Each of the three modes must have its own clear identity. **Blitzkrieg** is direct chess survival; **Ulti** is a hex auto-battle with eight creator-themed factions, a final boss and real board-side reserve Pawns; **Board-Cr-ft** is a navigable 3D court RTS with tangible miners and hero abilities, not a flat website or side panel simulation.

## Main-player class ability audit

| Class | Rules and distinguishing gameplay | FX and outstanding validation |
|---|---|---|
| Pawn | Direct survival move options include four straight movement directions, diagonal captures; recruited colour Pawns preserve ordinary chess forward moves, diagonals and initial double-step. Pawn captures award double base XP. Up to nine Pawns total as specified. | Piece travel, capture, promotion/evolution, water-gap leap; validate touch versus keyboard parity, colour orientation, no reclassifying recruited pawns |
| Knight | Actual L-shaped jumps; Forked Fate requires two still-threatened targets **after an enemy reply**, not automatic on timer alone. Outpost tactical positioning persists through legal move rules. | `fork` beam/spokes animation; test fork failure when target escapes, no line-of-sight error, post-move capture clarity |
| Bishop | Diagonal chess movement; Consecrated Ground/Conflagration effects along its path after actual captures; diagonal defensive/fusion relationships. | `flame`, `beam`, `mimic` and area cues; test warning contrast over Kaspagrove foliage, no hidden untelegraphed damage |
| Rook | Rank/file legal movement; discovered attack and Castling Strike require actual King-aligned line. Avoid claiming free passive King blocking ability. | `castle`, `beam` and travel cues; verify occupied lines, terrain blocking, camera-scaled effects |
| Queen | Queen legal rays; copied captured-piece technique via Queen Mimic, including Pawn XP, Knight fork, Bishop and Rook-like patterns. Royal Sacrifice requires its separately approved risk/benefit rules. | `mimic`, `fork`, `beam`; verify copied cooldown and one-capture/one-effect constraints |
| King | Manual movement only while in check, emergency evacuation and King colour/set interactions, sacred protection and safe portal landings. No rejected automatic Interposition skill. | Royal urgency, portal, check telemetry; verify no instant unsafe respawn, robust check-control transition |

All main class skills and creature artwork remain separate from a generic auto-trigger ability: avoid redundant "powerup" copy, and never let a visual FX substitute for a legal chess attack.

## Distinct defensive mechanics
1. **Ivory Double Guard:** existing set-bond ward (special-purpose once/run protection).
2. **Hot Streak Risk Shield:** earned after its specific kill/Notes sequence, protects a threatened entry under its own consumption rule.
3. **Formation Guard (new 0.2.22):** only when the main piece enters a collectible square **actually protected by a recruited allied chess piece**. Pawn directional diagonals, Knight leap, Bishop/Rook/Queen rays with physical blockers are checked. On a valid pickup, a golden guard pulse plus board-shield appears; one incoming hit is absorbed within **0.85 seconds** and the skill recharges for **55 seconds**. The same rule blocks immediate enemy entry into the shielded player's tile. Guarded pickups are visually highlighted and a cooldown indicator is shown. No free passive invincibility outside qualifying positioning; recruited Pawn moves remain exposed to capture.

**Evidence:** 3/3 pure chess-guard tests, six real Chrome campaign combat scenarios (guarded, uncovered, still cooling down, ray blocked, follow-up strike, expiration), zero JS errors. 249/249 existing game regressions and Vite production build/TypeScript check passed. Production bundle excludes development-only QA methods.

## Stages / environmental FX audit
- **Fisher:** missing-square water, currents, fair staged water emergence and prelanding telegraph, water-gap Pawn vault, per-phase audio cue and splash. Prior lane validation requires at least three-square King separation, occupied landing cancellation and nine-Pawn fairness. A source-level deterministic terrain audit exists; **real low-end GPU and multi-piece visibility remain to certify**.
- **Kaspagrove:** moving canopy and grass concealment actually hides units, with rustling and directional wind cues. `kaspa-canopy-wind`, `am-grass`, `conceal` effects exist. Check high-contrast silhouette leakage behind rustling grass and reduced-motion fallback in actual gameplay.
- **Hicargu:** the legacy internal ID remains `hikarru` for save compatibility, but all player-facing labels should say Hicargu. Fixed one portal feedback message. Portal geometry and cooldown, Eternal Snail windup/shell/trail animation, and Equinox/Violet telegraphs exist; **full cycle and cross-restart QA remain**.
- **Puzzle Rush:** three timed checkmates per boss checkpoint, tactical themes and adaptive difficulty, with actual Stockfish replies and no unavoidable start. Need exhaustive live boss fixture QA and safe companion placement under full board density.

Animation-layer source defines named `travel`, `flame`, `beam`, `fork`, `mimic`, `castle`, `spawn`, `capture`, `armor`, `guard`, `loss`, `fusion`, `ability`, `selection`, `conceal`, `portal`; source call sites are present, with canvas effects and reduced-motion alternatives. This is a **source/coverage inventory, not a frame-by-frame visual certification of every move**.

## Other-mode UX and gameplay
- **Ulti:** perspective Three.js board, camera orbit/zoom/reset, board-side visual reserve Pawn dock, combat-first view with optional TACTICS panel. Browser verification passed at three desktop/mobile widths, including real Pawn selection, drag and 3D camera changes.
- **Board-Cr-ft:** 3D court maps, fog, resource mining, king bases and lobby. Verified canvas/overlay alignment at four widths; mining seat reservations and movement rules covered by prior tests. Still requires real two-machine cross-NAT, varied GPUs and full-time simulated game economics/performance review.
- **Presentation redundancy:** website repeat of "three modes" wording was reduced in the unpublished GitHub branch. The launcher's marketing, preview badges and scene semantics must always refer to **actual** release provenance, not an unreleased screenshot or feature.

## Server accounts / owner and Game Master (GM)
- Additive migration `009_staff_roles.sql` defines two server-only roles (`owner`, `gm`) and an audit table. No ordinary signup, client request, account ID or locally saved profile can self-promote.
- `GET /api/account/staff` requires a valid active-user Bearer session, then reads the DB role; denied to unassigned or anonymous accounts. Owner can perform future account/release administration; GM has all *game-facing* GM capabilities, not payment or role administration.
- Both roles and deny cases pass 3 unit tests and isolated MariaDB HTTP end-to-end tests, including 001–009 migrations. **The real owner's verified account and distinct GM account do not yet exist from this workflow; do not represent synthetic fixture IDs as real accounts or grant roles before verified ownership.**

## Payment/backend and website release gates
- Separate Live/Test Stripe catalog, $1.99 monthly and $2.99 once, customer portals configured, **webhook destinations remain disabled**. A simulated monthly test purchase and cancellation succeeded; Support Pack one-time provider-side test still incomplete. Staged backend tests pass with signed mock webhook handling.
- The staged account service now has exact-origin public signup CORS for `https://niqsaturn.github.io` on only POST/OPTIONS register/verify/resend. Unprivileged/foreign origins are rejected. **This was tested only with disposable account DB and HTTP ingress**, not deployed to production.
- Account suite **56/56 passed**; complete disposable MariaDB integration with migrations 001–009 passed, including CORS, account email, GM authorization, simulated billing, save integrity and multiplayer ownership.
- Public live account service still rejects GitHub Pages signup preflight (previously HTTP 403). Secure encrypted production backup, restore proof and non-destructive migration **005–009** remain unperformed; neither new account API nor production billing should be enabled until proven safe.
- GitHub-hosted site currently has disabled launcher CTA, old 0.2.20 gameplay captures and a legacy trailer, although current public signed patch is 0.2.21. Site source remains `prelaunch/github-pages-signup`, with no Pages deployment.
- **0.2.22 candidate** ZIP is built and signed locally (~165MB). Independent verification: manifest signature matches pinned patcher public key, archive SHA256 `0eadf8815ce7968d0624ee1314560ac9ac3ca21ad370503e3f7af1c40d2a0e0f`, bundled application version 0.2.22, Formation Guard in production JS, QA hooks excluded. It has **not** been promoted publicly or clean-install/cross-GPU certified. Private signing material stays outside the repository.

## Publication verdict
Owner has now expressly requested publication, which resolves the former explicit-approval gate. **Technical gates are not resolved**: verified owner/GM real identities, production signup CORS, secure DB migration and billing webhook deployment, installer download verification, real latest-build trailer approval, fresh accessibility/performance tests and GitHub Pages host configuration. Do not claim that the public site is published or registration works just because the source is on a publicly readable GitHub branch.

Next: complete verified account enrollment and offline bootstrap, migrate production with encrypted backup/recovery and rollback, run test event delivery against isolated backend, verify authenticated GM calls and login, release the signed installer/update only after first-install/rollback QA, ensure signup CORS returns 204 on live GitHub-origin OPTIONS, update footage and site CTA, and only then enable GitHub Pages.
