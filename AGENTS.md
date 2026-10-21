<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

- Keep catalogue outage snapshots in source-scoped, validated, 24-hour session storage; this temporary public browsing cache must never stand in for live price or stock validation.
- Resolve the public site origin from public build configuration, never browser location or module-scope server environment reads, so SSR and client metadata agree.
- Keep the branded social preview in a CDN asset pointer and the small favicon in public; use leaf-route sharing metadata so previews stay crawlable without sitewide image inheritance.
- Keep the server entry free of import-time network requests and recurring timers; Workers prohibit startup I/O, and public page availability must not depend on marketplace syncing.
- Share marketplace navigation and seller presentation across public marketplace detail pages to keep shopping controls and responsive layouts consistent.
- Validate marketplace search with the TanStack Zod adapter and defaulted input fields so ordinary navigation does not require a search term.
- Keep marketplace campaigns and direct-sponsor placement configuration separate from catalogue data; reserve labelled ad inventory without implying an ad network or revenue collection is active.
