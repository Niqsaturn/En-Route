# En-Route: Blitzkrieg — Prelaunch website design

This branch holds a **review-only** static promotional website. The source is on a public GitHub branch, but **the website is not deployed**, and no GitHub Pages publishing has been configured.

Browse `index.html` locally with its `assets` directory to review the new responsive design, current 0.2.20 screenshots, and gameplay montage. No website account forms, trackers, or payment flow are used.

The production download link is not ready: `downloads/EnRoutePatcher.exe` exists in the owner's *local* draft but is deliberately excluded from GitHub. The portable patcher was not Authenticode signed; produce and validate a current signed installer and replace the download URL before making the website public.

The game's release/update infrastructure operates independently of this repository. Version 0.2.20 was the latest verified build when the media was captured on November 22, 2026.

**Do not deploy or enable Pages until explicit owner approval.**

## Screenshot previews

[View full desktop layout](assets/preview-desktop.webp) · [View full mobile layout](assets/preview-mobile.webp)


## Original gameplay trailer (68 seconds)

- Main website video: `assets/enroute-blitzkrieg-trailer-v0.2.20.mp4`.
- This is an actual edited promotional trailer, not the original silent 36-second reference montage.
- Includes authentic 0.2.20 game captures from Blitzkrieg, Ulti, Board-Cr-ft, animated title cards and original stereo instrumental music composed for the cut.
- Poster: `assets/trailer-poster.webp`; native playback controls, sound enabled by user interaction, no autoplay.
- Original music source and frame-by-frame rendering scripts remain in private local production audit; no commercial music is incorporated.

GitHub stores the large trailer as eight verified binary chunks under `assets/trailer-parts/` due the connected upload transport limit. The small, same-origin `assets/trailer-loader.js` reconstructs and SHA-256-checks the exact MP4 on a hosted site. The full MP4 is retained only in the local offline draft and production audit. **No public site has been deployed.**

The build badge was refreshed to **0.2.21** after the November 22 camera/selection hotfix. Media retains its truthful **0.2.20** capture provenance.
