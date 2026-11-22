# Layout research and design decisions

The design's goal is *one action*: download the Windows launcher.

## Visual hierarchy
An oversized central headline establishes the product, followed immediately by one high-contrast gold primary button. Supporting "Watch gameplay" is a small text link, not a competing CTA. Adequate surrounding negative space separates the conversion decision from the game-media proof.
- Nielsen Norman Group, "Visual Hierarchy in UX": https://www.nngroup.com/articles/visual-hierarchy-ux-definition/
- Baymard, "Ecommerce UX Audit": https://baymard.com/blog/ecommerce-ux-audit

## Alignment and trust
The first media is actual *gameplay*, not a distorted screenshot of the menu. The image container and image centers are aligned with the primary CTA and viewport center, using fixed intrinsic aspect ratio 8:5 and `object-fit:contain`; no unexplained cropping or ornamental offset.
- Liferay Design, "Measured vs Optical Alignment": https://design.liferay.com/articles/best-practices/measured-vs-optical-alignment/

## Media agency
The gameplay montage has visible native Play/pause controls, a poster, no autoplay, and no background motion competing with the launcher download. Alt text and chapter captions describe the footage.
- Nielsen Norman Group, "Homepage Design: 5 Fundamental Principles": https://www.nngroup.com/articles/homepage-design-principles/
- Nielsen Norman Group, "Video Usability": https://www.nngroup.com/articles/video-usability/

## Performance/accessibility
Static HTML/CSS; no third-party fonts, scripts, cookies, or trackers. Compressed WebP images, compressed MP4, lazy loading below the fold, `prefers-reduced-motion` support, visible focus states and responsive content. The large site CTA has a meaningful accessible name.

This is UX-informed design, not a claim that it has been A/B tested on real players.