# Design QA — Storefront footer

- Source visual truth: `C:\Users\PA\AppData\Local\Temp\codex-clipboard-b58d9192-21ca-42f3-ab4a-6936812d5b34.png`
- Implementation evidence: `codex-iab://tab/6` at `http://localhost:3000/`
- Source pixels: 1575 × 386
- Desktop implementation: 1265 × 711 CSS px, device scale factor 1; footer region inspected at the end of the homepage
- Mobile implementation: 390 × 844 CSS px, device scale factor 1
- Density normalization: comparison performed at CSS-pixel scale; browser chrome and the preceding storefront sections were excluded from footer judgments
- State: homepage scrolled to the footer, light theme, live local catalog data

## Full-view comparison evidence

The desktop implementation preserves the reference composition: a broad pale-gray footer, a larger brand/contact column on the left, and four evenly spaced link columns. The mobile implementation intentionally reflows to a readable two-column grid, with the brand/contact block spanning the full width.

## Focused region comparison evidence

- Fonts and typography: bold black brand and group headings establish the same hierarchy as the reference; secondary copy uses smaller, low-contrast text with comfortable line height.
- Spacing and layout rhythm: the 1400 px maximum content width, generous vertical padding, wider brand track, and consistent list gaps closely match the source proportions. Mobile spacing remains even without horizontal overflow.
- Colors and visual tokens: `#f5f5f7` footer background, black primary text, muted secondary text, and low-contrast top border match the requested white/black storefront direction.
- Image quality and asset fidelity: the source footer contains no photographic assets. Contact and brand marks use crisp Lucide vector icons from the existing icon system rather than raster placeholders.
- Copy and content: the structure from the reference is retained and localized for Âm Thanh Việt, including contact details, product categories, information, support, and social links.

## Interaction and browser checks

- Footer links are keyboard-accessible anchors and point to existing storefront routes or appropriate external/contact destinations.
- Desktop five-column and mobile two-column layouts were rendered and checked.
- Mobile viewport has no visible horizontal page overflow.
- Browser console errors and warnings checked after desktop and mobile rendering: none.

## Findings

No actionable P0, P1, or P2 differences remain.

## Comparison history

- First comparison pass: passed with no P0/P1/P2 findings; no visual remediation iteration was required.

## Follow-up polish

- P3: replace the generic social destinations with the store's official profile URLs when they are available.

final result: passed
