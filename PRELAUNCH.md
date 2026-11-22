# Release gates — hold deployment

## Current status
PRELAUNCH SOURCE ONLY. Public GitHub branch is viewable; no GitHub Pages site, DNS update, Vercel deployment, or production URL has been created.

## Media provenance
- Version: En-Route Windows game 0.2.20 signed update channel.
- `assets/hero-gameplay.webp`: actual Campaign gameplay screenshot, captured from the 0.2.20 `Game/dist` browser build with a temporary consented local guest.
- `assets/blitzkrieg.webp`, `ulti.webp`, `boardcraft.webp`: genuine screen captures from that local build.
- `assets/enroute-0.2.20-gameplay.mp4`: 36-second montage assembled from three live game sessions, showing campaign moves, an Ulti fight and Board-Cr-ft. The video is a silent in-engine recording, not a cinematic trailer.
- All capture sessions used a fresh isolated browser and no player data.

## Publication gates
1. Confirm fresh release channel version, recapture if newer than 0.2.20.
2. Produce a first-time Windows installer that installs the launcher and current game; verify full clean setup, upgrade, rollback and uninstall on an isolated Windows machine.
3. Authenticode-sign installer/launcher if possible and document publisher/SmartScreen status. Do not mistake the signed game-update feed for a signed EXE.
4. Create a trusted installer download URL and replace local `./downloads/EnRoutePatcher.exe` in both buttons. Verify checksum and user flow end-to-end.
5. Verify desktop/mobile/accessibility, video playback, link checks, security headers, caching, HTTPS and social metadata on the chosen host.
6. Only after explicit owner approval: merge/publish/deploy and remove `noindex,nofollow`.

No production account, SQL, payment, media-hosting or game service should be changed by this site-review process.