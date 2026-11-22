# En-Route Stripe configuration — operational handoff
_2026-11-22 · Prelaunch / staging branch · No production payment activation_

## Stripe catalog verified

| Environment | Product | Product ID | Price ID | Billing |
|---|---|---|---|---|
| **Live** | Royal Pass Membership | `prod_VfwYxBbMztIDqt` | `price_1Ueag0GH2tFr2xezsfw6is9n` | **$1.99 USD / month** |
| **Live** | Developer Support Pack | `prod_VfwZXhLRRlg9Fy` | `price_1Ueag4GH2tFr2xezu8iFFT4b` | **$2.99 USD one time** |
| **Test** | Royal Pass Membership | `prod_VfwJtETCDI51uA` | `price_1UeaQhGH2tFr2xezrPi3WRmA` | $1.99 / month |
| **Test** | Developer Support Pack | `prod_VfwJXlVmWl0r0H` | `price_1UeaQmGH2tFr2xezg96TsuY1` | $2.99 once |

Each Stripe product's default price matches its above ID; all prices are USD, all renewals apply only to the monthly plan. Customer-facing purchases belong **inside the En-Route game**, not the static website. Both plans are entirely optional and may not advantage PvP combat.

### Tax setting

The owner states En-Route will **not collect sales tax, VAT, or GST** for these purchases. The staged account backend explicitly sends `automatic_tax[enabled]=false`; test Checkout sessions confirmed `automatic_tax.enabled=false`. No tax registrations, tax rates, or automatic tax were configured. This is a technical setting, not a tax-compliance determination.

## Hosted Customer Portal configurations

- Live portal: `bpc_1UeajBGH2tFr2xezt2XRkupX`
- Test portal: `bpc_1Ueaj7GH2tFr2xeznZBz6ZdV`

Both permit updating payment methods, viewing invoice history, and cancelling a paid subscription at the **end of its current term**. Plan switching is disabled. The hosted login page is disabled; the En-Route account backend must create authenticated portal sessions.

Staged `stripe-billing.mjs` supports `ENROUTE_STRIPE_PORTAL_CONFIGURATION` to pin En-Route's specific portal, rather than relying on an account-wide default.

## Webhook event destinations — intentionally disabled

- Live webhook: `we_1UealSGH2tFr2xezpUHm83Yy`, **disabled**
- Test webhook: `we_1UealLGH2tFr2xezfJewb3LQ`, **disabled**
- Destination path: `https://en-route.ringtail-anoles.ts.net:8443/enroute-account/api/billing/webhook`
- Events: `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `charge.refunded`, `charge.dispute.created`.

Do **not enable** these event destinations until the correct updated account backend, matching database schema, and end-to-end signed-event handling are online. Both statuses were reread from Stripe after creation and confirmed **disabled**. No credential material is stored in this document or source repository.

## Test-mode purchase / lifecycle evidence

1. Two hosted test Checkout sessions were created. Their modes, amounts, and disabled automatic tax were verified.
2. A real **sandbox Checkout UI** for the monthly membership was exercised with Stripe's synthetic payment method. Stripe confirmed session `complete`, payment `paid`, a successful sandbox PaymentIntent and an `active` test subscription.
3. A test customer portal session was successfully created using the correct Test portal configuration.
4. The test subscription accepted `cancel_at_period_end=true`. Then it was canceled immediately to avoid recurring test activity; Stripe subsequently confirmed `status=canceled`.
5. The one-time Support Pack Checkout remains **open and unpaid**. Do not claim that a successful provider-side one-time payment was executed.
6. These provider-side tests were **not** issued by the game's private account backend, so they do not establish live entitlement delivery. All events were held by disabled webhook destinations.

## Staged backend and SQL evidence

Current candidate:
`C:\Users\rac\AppData\Local\EnRouteRelease\EnRoutePresentation-20261122\Account`

Changes:
- Server-side Checkout sends `automatic_tax[enabled]=false`.
- Specific portal configuration ID is supported.
- Payment amounts, authenticated account ID, checkout ownership, signed events, replay/out-of-order handling and refund/dispute revocation are checked.
- Test/live billing modes cannot be interchanged.

**49/49 account-service unit tests passed**. A full isolated disposable MariaDB integration test **passed** after applying all additive migrations **001–008**, including the new verified-achievements migration. The prior fixture initially stopped at migration 007, which is insufficient for the current account service. It was updated and rerun against an isolated local database. Integration checks included signup, login, signed payment events, subscription lifecycle, refund revocation, complimentary-gift scheduling, encrypted saves, and multiplayer account authorization.

## Production release gate — NOT ACTIVATED

The production account service and existing player database have **not** been replaced or migrated. Live purchases and entitlement delivery are not yet active. Release requires verified encrypted database backup + recovery, migration 005–008, deploying the new server process with the correct environment-specific configuration and secure webhook verification, a **server-issued test payment with a valid signed webhook** against an isolated environment, end-to-end permanent unlock verification, owner-approved rollback, and a no-live-charge production smoke test before enabling webhooks or customer checkout.

The website remains on its unpublished GitHub branch. The GitHub Pages signup origin is still blocked by CORS at production account ingress (HTTP 403 in preceding audit). Neither this Stripe catalog work nor the passing tests authorizes website publication.
