# Payroxa Connect

PAYROXA STANDALONE MARKETING WEBSITE — DEPLOYMENT & LINK ARCHITECTURE



Build the Payroxa public marketing website as a completely standalone production website.



IMPORTANT:



This is NOT the authenticated Payroxa application.



This website must be independently deployable and independently hosted.



The marketing website should contain NO dependency on the authenticated application's source code, backend, database, wallet logic, transfer logic, authentication logic, or API.



The website's only relationship with the Payroxa application is through configurable external URLs.



==================================================

1. HOSTING ARCHITECTURE

==================================================



The finished website must be capable of being deployed directly to a hosting provider such as:



Vercel

Netlify

Cloudflare Pages

or another standard static/frontend hosting platform.



Do not require the Payroxa backend to run the marketing website.



The website must work independently after deployment.



The production marketing domain will be:



https://payroxa.com.ng/



The authenticated application is:



https://app.payroxa.com.ng/



These are two separate deployments.



==================================================

2. CRITICAL LINK CONFIGURATION

==================================================



DO NOT hard-code application URLs directly inside UI components.



Create a centralized configuration file:



src/config/siteConfig.ts



or an equivalent configuration structure appropriate for the existing framework.



Example:



export const PAYROXA_LINKS = {

  app: "https://app.payroxa.com.ng",

  login: "https://app.payroxa.com.ng/login",

  register: "https://app.payroxa.com.ng/register",



  wallet: "https://app.payroxa.com.ng/wallet",

  transfers: "https://app.payroxa.com.ng/transfers",

  payments: "https://app.payroxa.com.ng/payments",

  store: "https://app.payroxa.com.ng/store",

  cards: "https://app.payroxa.com.ng/cards",

  business: "https://app.payroxa.com.ng/business",

  delivery: "https://app.payroxa.com.ng/delivery",

  ride: "https://app.payroxa.com.ng/ride"

};



Use placeholders or the currently known routes only where routes have actually been established.



DO NOT invent routes.



==================================================

3. ENVIRONMENT CONFIGURATION

==================================================



Where appropriate, support environment variables.



Example:



VITE_PAYROXA_APP_URL

VITE_PAYROXA_LOGIN_URL

VITE_PAYROXA_REGISTER_URL

VITE_PAYROXA_BUSINESS_URL

VITE_PAYROXA_STORE_URL

VITE_PAYROXA_PAYMENTS_URL

VITE_PAYROXA_CARDS_URL



If the framework uses a different environment-variable convention, follow that framework's standard.



Create a safe fallback configuration.



The application must not crash if an optional URL is missing.



==================================================

4. CENTRAL LINK HELPER

==================================================



Create a reusable link system.



For example:



getPayroxaLink("login")

getPayroxaLink("register")

getPayroxaLink("store")



or use the centralized configuration object directly.



All CTA components should use this system.



Examples:



Navbar Sign In

→ PAYROXA_LINKS.login



Navbar Get Started

→ PAYROXA_LINKS.register



Store CTA

→ PAYROXA_LINKS.store



Cards CTA

→ PAYROXA_LINKS.cards



Business CTA

→ PAYROXA_LINKS.business



Do not duplicate URLs throughout the project.



==================================================

5. EXTERNAL VS INTERNAL LINKS

==================================================



The marketing website may have its own public pages.



Example:



/

 /business

 /payments

 /store

 /cards

 /pricing

 /about

 /contact



These are marketing pages and should use the website's own router.



However, when a CTA is intended to take the user into the actual Payroxa product, it must redirect to the configured external application URL.



Example:



"Sign In"

→ configured login URL



"Get Started"

→ configured registration URL



"Create Your Store"

→ configured store/onboarding URL



"Open Payroxa"

→ configured application URL



==================================================

6. DO NOT DUPLICATE APP FUNCTIONALITY

==================================================



The marketing website must NOT implement:



- authentication

- login processing

- registration processing

- wallet balances

- bank transfers

- transaction processing

- payment processing

- KYC processing

- ledger logic

- account creation

- card issuing

- financial API calls

- backend financial operations



Those belong to the existing Payroxa application.



The website only explains these products and redirects users to the appropriate configured destination.



==================================================

7. DEPLOYMENT INDEPENDENCE

==================================================



The marketing website must be deployable without:



- Supabase

- Paystack

- Strowallet

- Monnify

- Paga

- payment APIs

- financial APIs

- Payroxa backend

- database credentials



Do not place secret API keys in the frontend.



The only external configuration required for normal operation should be public website configuration and destination URLs.



==================================================

8. DOMAIN CONFIGURATION

==================================================



Prepare the application for:



https://payroxa.com.ng/



Do not assume that the application itself will be hosted at:



app.payroxa.com.ng



The marketing website is:



payroxa.com.ng



The product application is:



app.payroxa.com.ng



Never confuse these domains.



==================================================

9. SEO

==================================================



Configure the marketing website specifically for:



https://payroxa.com.ng/



Canonical URL:



https://payroxa.com.ng/



Do not set the canonical URL to app.payroxa.com.ng.



Add:



- title

- meta description

- Open Graph

- social preview metadata

- favicon

- robots configuration

- sitemap

- semantic headings



==================================================

10. FOOTER LINKS

==================================================



All footer product links must use the same centralized link configuration.



Do not duplicate URLs.



Example:



Products

Payments

Wallet

Cards

Store

Business



Company

About

Contact



Support

FAQ

Help



Legal

Privacy Policy

Terms



Only create internal routes where those pages actually exist.



==================================================

11. CONFIGURATION STRUCTURE

==================================================



Create a clean structure such as:



src/

  config/

    siteConfig.ts

    links.ts



  components/

    Navbar.tsx

    Footer.tsx

    CTAButton.tsx

    ProductCard.tsx

    ...



The exact file naming may follow the existing framework.



Create a single source of truth for:



- brand information

- website URL

- application URL

- CTA destinations

- social links

- contact information



Example:



const siteConfig = {

  name: "Payroxa",

  tagline: "More than payments.",

  websiteUrl: "https://payroxa.com.ng",

  appUrl: "https://app.payroxa.com.ng",



  links: {

    login: "...",

    register: "...",

    business: "...",

    store: "...",

    payments: "...",

    cards: "..."

  }

};



==================================================

12. CTA COMPONENT

==================================================



Create a reusable CTA component.



Example:



<PayroxaButton

  href={PAYROXA_LINKS.register}

>

  Get Started

</PayroxaButton>



Support:



primary

secondary

outline

text



Do not create separate hard-coded CTA implementations for every section.



==================================================

13. LINK VALIDATION

==================================================



Before finalizing:



Search the entire project for:



"app.payroxa.com.ng"



and any other hard-coded application URL.



The only permitted occurrences should be inside the centralized configuration/environment documentation.



No UI component should contain hard-coded application destinations.



==================================================

14. DESIGN

==================================================



Maintain the previously defined Payroxa visual architecture:



WHITE

+

DEEP NAVY

+

PAYROXA PURPLE

+

SOFT LAVENDER



Use:



- rounded cards

- thin borders

- premium spacing

- modern typography

- clean icons

- subtle shadows

- restrained gradients

- professional fintech presentation



Use the uploaded Payroxa payment graphic as the visual brand reference.



Do not copy the graphic literally.



Use it to establish the visual language.



==================================================

15. HOMEPAGE STRUCTURE

==================================================



Build:



1. Navbar



2. Hero



"Everything your business needs to move, sell and grow."



3. Trust strip



Secure

Fast

Reliable

Built for African businesses



4. More Than Payments



Move Money

Get Paid

Sell

Run Your Business

Move Your Business



5. Payroxa Store



6. Payment ecosystem



7. Wallet



8. Business dashboard / analytics



9. Business types



10. Security



11. How Payroxa works



12. Cards



13. FAQ



14. Final CTA



15. Footer



==================================================

16. FINAL CTA BEHAVIOUR

==================================================



Primary:



"Get Started"



must use:



PAYROXA_LINKS.register



Secondary:



"Sign In"



must use:



PAYROXA_LINKS.login



Never hard-code the destination inside the component.



==================================================

17. PRODUCTION REQUIREMENTS

==================================================



Before completing the implementation:



- run the build

- resolve all build errors

- resolve all TypeScript errors

- verify all internal routes

- verify all external CTA links

- verify mobile responsiveness

- verify desktop responsiveness

- verify navigation

- verify accessibility

- verify SEO metadata

- verify no secrets are exposed

- verify no backend dependency exists

- verify the authenticated application code was not modified



==================================================

18. IMPORTANT SCOPE RULE

==================================================



This task is ONLY for the standalone Payroxa marketing website.



Do not modify:



- Payroxa backend

- Payroxa database

- wallet

- ledger

- transfers

- authentication

- notifications

- payment providers

- business application

- admin panel



unless absolutely required by the marketing website itself.



The final architecture must allow:



Marketing Website

payroxa.com.ng



to be deployed independently while users can seamlessly move into:



Payroxa Application

app.payroxa.com.ng



through configurable links.



START BY INSPECTING THE EXISTING PROJECT.



Do not immediately rewrite the project.



First identify:



1. framework

2. entry point

3. routing

4. styling system

5. existing components

6. current build configuration

7. deployment configuration



Then implement the standalone marketing website without breaking unrelated code.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e2ebe819-4dc8-4e32-a9d4-e0946c69ed0c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
