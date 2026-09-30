# Design QA — Product banner carousel

- Source visual truth: `C:\Users\PA\AppData\Local\Temp\codex-clipboard-bb1434ef-38f3-4904-9e08-a6ab30fe3d16.png`
- Implementation evidence: `codex-iab://tab/5` at `http://localhost:3000/` (desktop left/right states and mobile capture in the current Codex session)
- Source pixels: 1657 × 722
- Desktop implementation: 1464 × 877 CSS px, device scale factor 1
- Mobile implementation: 390 × 844 CSS px, device scale factor 1
- State: homepage after the scroll-triggered lazy bundle loads and `/api/products?limit=12` resolves
- Density normalization: comparison performed at CSS-pixel scale; browser chrome and surrounding homepage sections excluded from component judgments

## Full-view comparison evidence

The implementation retains the reference composition: a tall promotional banner beside a heading, right-aligned view-all action, horizontally swipeable product cards, and pagination. The desktop left state follows the source; the controlled right state mirrors the grid without changing product-card dimensions or content hierarchy.

The live catalog currently contains one published product, so the production browser correctly renders one database-backed card rather than fabricating store inventory. When more products are published, the same Swiper progressively shows up to three cards in the available desktop width.

## Focused region comparison evidence

- Fonts and typography: bold sans-serif section heading, compact view-all action, product metadata, name, price, and CTA use the existing storefront hierarchy and match the source density.
- Spacing and layout rhythm: the banner uses a fixed 280 px desktop track; the product region takes the remaining width. A 24 px column gap and equal-height stretch preserve the source proportions.
- Colors and visual tokens: white canvas, pale neutral image surfaces, black copy, low-contrast borders, and monochrome controls match the requested white/black storefront theme.
- Image quality and asset fidelity: a dedicated portrait speaker asset was generated for this slot, then resized and encoded as an 84 KB WebP. The speaker remains fully visible with clean upper negative space; no placeholder, CSS drawing, or text baked into the image is used.
- Copy and content: section and banner copy are localized for a Vietnamese speaker shop. All text remains editable UI content.

## Interaction and browser checks

- `bannerPosition` accepts `"left" | "right"`; both states were rendered and visually checked at desktop width.
- Products load through AJAX from a configurable `productsEndpoint`.
- Swiper touch/drag, clickable pagination, product links, wishlist, and add-to-cart controls remain interactive.
- Mobile stacks banner and carousel without horizontal page overflow.
- Loading, empty, and error states are implemented.
- Browser console errors and warnings checked after desktop and mobile rendering: none.
- Production build completed successfully before browser QA.

## Findings

No actionable P0, P1, or P2 differences remain.

## Comparison history

- Initial pass: the existing horizontal banner asset cropped to an indistinct fabric close-up in the portrait slot (P2 image-fidelity issue).
- Fix: generated a dedicated portrait speaker asset with a complete product and upper text-safe area, resized it to 900 px, and encoded it as WebP.
- Post-fix evidence: desktop and mobile browser captures show the full speaker subject, sharp product detail, and readable overlaid copy.

## Follow-up polish

- P3: recheck the final pagination density when the production catalog contains more than three published products.

final result: passed
