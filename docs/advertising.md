# Marketplace advertising

## Merchant sponsorships

Merchants sign in with Google at `/marketplace/advertise`, submit an HTTPS image and destination, choose banner or sidebar, and set UTC start/end dates. Submissions are pending until reviewed. The same page shows an administrator review queue only for database-authorized advertising administrators. Approval, rejection, and pause are persisted; only approved adverts within their dates are delivered publicly. Merchant submissions do not collect payment or guarantee delivery. The latest eligible merchant advert fills each direct-sponsor space; configured sponsor images remain a fallback.

Administrator access must be assigned explicitly to a selected Cloud auth user in `public.user_roles` with role `admin`; there is no signup-based elevation or client-side grant. This advertising role does not replace the existing CMS accounts.

## Google AdSense activation

1. Obtain approval for the actual published domain in Google AdSense.
2. Create two display ad units and supply `VITE_PAYROXA_ADSENSE_CLIENT`, `VITE_PAYROXA_ADSENSE_SIDEBAR_SLOT`, and `VITE_PAYROXA_ADSENSE_BANNER_SLOT` from the generated code.
3. Publish a Google-certified consent message through Google Privacy & messaging, then supply `VITE_PAYROXA_GOOGLE_CMP_PUBLISHER`. Verify that the message is configured for the domain, TCF 2.3 and every applicable visitor region. Without a completed CMP signal, no AdSense script or unit is loaded. Unknown regional applicability fails closed.
4. Add the exact seller line supplied by AdSense to `public/ads.txt` and publish. No seller ID is fabricated or added before the real account is supplied.
5. Verify on the published domain that the CMP appears, consent allows a unit request, refusal makes no unit request, and genuine no-fill removes only network inventory. Ad blockers and provider approval can prevent delivery.

Direct sponsorship and network inventory are separate, labelled spaces. No arbitrary scripts or merchant HTML are accepted. A missing or unavailable network never replaces the merchant sponsorship slot. Consent withdrawal removes the unit; a page reload ensures already loaded provider code is discarded.

## Remaining launch requirements

Provide the approved AdSense account/unit IDs and identify the account that should review adverts. No advertising administrator is automatically assigned. Paid sponsorship pricing, payment collection, delivery guarantees, and billing are not enabled.
