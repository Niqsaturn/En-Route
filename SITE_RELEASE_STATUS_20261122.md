# En-Route: Blitzkrieg — live site release status

**Published:** November 22, 2026  
**Website:** https://niqsaturn.github.io/En-Route/  
**Publishing source:** `gh-pages` branch, root directory, with `.nojekyll`  
**Latest public game:** Windows portable version **0.2.21**  
**In-development candidate:** 0.2.22 (not on the public channel)

## Public website

The static promotional website is now hosted by GitHub Pages. It includes the three game-mode sections, genuine gameplay stills from 0.2.20, a 68-second real-gameplay trailer with original music, email verification signup, a public privacy notice, and a large Windows download link.

The Windows file is an approximately 156 MiB portable ZIP, not a signed Windows installer. Extract the full archive and launch `En-Route.exe`. The game's update manifest is cryptographically signed; that **does not** imply the Windows executable has an Authenticode publisher signature.

## Signup service

Website signup, verification and resend call a separate HTTPS account API. Production CORS now allows the exact GitHub Pages origin on those three registration endpoints only. An unauthorized origin and cross-origin login remain disallowed. Public DNS resolves the account host through Funnel servers.

Browser smoke tests passed at 1440, 1280, 768 and 390 pixels. Trailer metadata loaded with a duration of 68 seconds and no JavaScript errors. A deliberately invalid browser registration request reached the live account API through public routing and returned the expected HTTP 400. This does **not** establish a real account email-delivery and verification success test.

On the Windows machine running Tailscale, private split DNS can cause Chrome to classify the same account hostname as a local address and deny the browser request. Avoid changing global network security settings to bypass that protection; use another device or network when testing registration.

## Unpublished game/administration work

The staged 0.2.22 candidate includes the Formation Guard combo, additional campaign achievements, and Ulti board/UX improvements. It passed its scoped automated and browser tests, and its signed local package hash was checked. It remains unpublished pending game client installation/update qualification.

Owner/GM privileges and account-level paid entitlements are **not live**. The owner/GM database role schema has been tested in an isolated environment, but production staff roles have not been provisioned. No live Stripe checkout or subscription entitlement activation is claimed.

## Publishing maintenance

Publish website updates to `gh-pages`. The `prelaunch/github-pages-signup` branch documents the earlier staging history; it is not the live Pages publishing source. Preserve truthfully labeled screenshot and trailer build provenance, and verify live HTTPS, link targets, signup and video after every material change.
