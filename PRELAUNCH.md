# Release gates — hold deployment

## Current status
PRELAUNCH SOURCE ONLY. Public GitHub branch is viewable; no GitHub Pages site, DNS update, Vercel deployment, or production URL has been created.

## Media provenance
- Website patch badge: signed Windows build **0.2.21** (2026-11-22). The trailer and screenshots are authentic build **0.2.20** captures; 0.2.21 subsequently shipped a Board-Cr-ft camera/selection hotfix. Never relabel older media as newly captured.
- `assets/hero-gameplay.webp`: actual Campaign gameplay screenshot, captured from the 0.2.20 `Game/dist` browser build with a temporary consented local guest.
- `assets/blitzkrieg.webp`, `ulti.webp`, `boardcraft.webp`: genuine screen captures from that local build.
- `assets/enroute-blitzkrieg-trailer-v0.2.20.mp4`: 68-second edited gameplay trailer composed from two sessions per mode, kinetic typography and original synthesized stereo music. Video and music are original to this project; no third-party commercial track or concept-art video is represented as gameplay.
- All capture sessions used a fresh isolated browser and no player data.

## Publication gates
1. Confirm fresh release channel version, recapture if newer than 0.2.20.
2. Produce a first-time Windows installer that installs the launcher and current game; verify full clean setup, upgrade, rollback and uninstall on an isolated Windows machine.
3. Authenticode-sign installer/launcher if possible and document publisher/SmartScreen status. Do not mistake the signed game-update feed for a signed EXE.
4. Create a trusted installer download URL and replace local `./downloads/EnRoutePatcher.exe` in both buttons. Verify checksum and user flow end-to-end.
5. Verify desktop/mobile/accessibility, video playback, link checks, security headers, caching, HTTPS and social metadata on the chosen host.
6. Only after explicit owner approval: merge/publish/deploy and remove `noindex,nofollow`.

No production account, SQL, payment, media-hosting or game service should be changed by this site-review process.
- GitHub transport note: the full MP4 is represented by `assets/trailer-parts/manifest.json` plus eight `.bin` chunks and verified in the browser before playback. Do not delete parts or the loader unless replacing with a verified direct MP4 URL.

## GitHub Pages registration gate (2026-11-22)

- The `prelaunch/github-pages-signup` branch contains the new registration + verification form and absolute HTTPS API calls. The page address remains unchanged during calls.
- Live GitHub-origin preflight currently returns HTTP 403. The account server's three-route exact-origin CORS patch is tested only in the owner's staging area; no production account service has been modified.
- Mock browser CORS, registration and verification flow passed at 1440, 1280, 768 and 390 pixels. These tests do not establish live email delivery, live CORS, first-time launcher sign-in or public GitHub Pages availability.
- Check the latest signed update feed before changing the version label; the observed published version was 0.2.21.
- Preserve the original publication hold: enable Pages, merge, update DNS and promote the installer only with the owner's explicit approval.
