import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const signup = readFileSync(new URL('../assets/account-signup.js', import.meta.url), 'utf8');
const trailer = readFileSync(new URL('../assets/trailer-loader.js', import.meta.url), 'utf8');

test('prelaunch publishing remains disabled', () => {
  assert.match(html, /name="robots" content="noindex,nofollow"/);
  assert.doesNotMatch(html, /href="\.\/downloads\/EnRoutePatcher\.exe"/);
  assert.match(html, /primary-cta--pending[^"]*" disabled/);
  assert.match(html, /GAME BUILD 0\.2\.21/);
});

test('website has no subscription or purchase storefront', () => {
  assert.doesNotMatch(html, /subscription|developer pack|support pack|checkout|monthly plan|exp boost|note boost|pricing/i);
  assert.match(html, /id="signup"/);
  assert.ok(html.indexOf('id="modes"') < html.indexOf('id="signup"'));
  assert.equal((html.match(/class="mode-card"/g) || []).length, 3);
});

test('signups stay on-page, use the correct cross-origin API only', () => {
  assert.match(html, /src="\.\/assets\/account-signup\.js"/);
  assert.match(signup, /event\.preventDefault\(\)/);
  assert.match(signup, /mode: 'cors'/);
  assert.match(signup, /credentials: 'omit'/);
  assert.match(signup, /referrerPolicy: 'no-referrer'/);
  assert.match(signup, /https:\/\/en-route\.ringtail-anoles\.ts\.net:8443/);
  assert.match(signup, /\/api\/auth\/register\/verify/);
  assert.match(signup, /\/api\/auth\/register\/resend/);
  assert.doesNotMatch(signup, /location\.(href|assign|replace)\s*=/);
});

test('trailer is truthful and optimized for user-initiated playback', () => {
  assert.match(html, /CAPTURED FROM BUILD 0\.2\.20/);
  assert.match(html, /data-trailer-player controls preload="none"/);
  assert.doesNotMatch(html, /<video[^>]*autoplay/);
  assert.match(trailer, /manifest\.sha256/);
  assert.match(styles, /prefers-reduced-motion/);
});
