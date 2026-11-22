# En-Route: Blitzkrieg — Live website

**Published November 22, 2026:** [Visit the En-Route website](https://niqsaturn.github.io/En-Route/). GitHub Pages serves the `gh-pages` branch. The free Windows 0.2.21 portable ZIP, gameplay trailer and verified-email signup are linked on the site. The Windows executable itself is not Authenticode-signed; optional purchases, owner/GM privileges and staged 0.2.22 gameplay changes are not live.

See [current site release status](SITE_RELEASE_STATUS_20261122.md) for the verified publishing, browser and backend checks.

## Archived prepublication design notes

*The material below records the earlier staging phase and is not the current deployment status.*

This branch holds a **review-only** static promotional website. The source is on a public GitHub branch, but **the website is not deployed**, and no GitHub Pages publishing has been configured.

Browse `index.html` locally with its `assets` directory to review the new responsive design, current 0.2.20 screenshots, and gameplay montage. This prelaunch branch includes an **unpublished signup and email-verification form**. Its JavaScript submits to the existing Tailscale Funnel account API without navigating away from the GitHub Pages URL. The API's exact-origin CORS support is not deployed, so **live GitHub Pages signup is not ready**. No trackers or payment flow are included.

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


## GitHub Pages signup staging (2026-11-22)

The review-only integration is on `prelaunch/github-pages-signup`, with `SIGNUP_INTEGRATION.md` describing the origin allowlist, service boundary, verification and publication checks. Four local browser viewport tests passed, including mocked cross-origin preflight and signup/verify while preserving the page URL. A preflight to the live account API from `https://niqsaturn.github.io` still returns HTTP 403; backend changes remain isolated in the owner's local staging area. **Do not enable GitHub Pages or merge until approval.**
