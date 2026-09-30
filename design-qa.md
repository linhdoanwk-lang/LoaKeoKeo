# Design QA — Lazy homepage commerce sections

- Source visual truth: `C:\Users\PA\AppData\Local\Temp\codex-clipboard-f0d6c868-d305-4fbd-a350-cbf5e46dafce.png`
- Implementation evidence: `codex-iab://tab/2` (browser-rendered desktop and mobile captures in the current Codex session)
- Source pixels: 1570 × 958
- Desktop viewport: 1464 × 884 CSS px, device scale factor 1
- Mobile viewport: 390 × 844 CSS px, device scale factor 1
- State: homepage after the lazy boundary intersects and `/api/products?featured=true&limit=12` resolves
- Density normalization: comparison made at CSS-pixel scale; browser chrome excluded from component judgments

## Full-view comparison evidence

The implementation preserves the reference's two-section structure: a three-tile promotional row with a wide center tile, followed by a featured-product heading, category filters, and horizontally scrollable product cards. The layout uses the storefront's existing monochrome palette and speaker-specific photography instead of the reference store's unrelated electronics.

Desktop capture confirms the asymmetric 1–2–1 promotional rhythm, generous vertical spacing, right-aligned filters, bordered white product card, image-first hierarchy, wishlist control, price row, and full-width add-to-cart action. Mobile capture confirms the sections stack cleanly without horizontal page overflow; the product rail remains swipeable.

## Focused region comparison evidence

- Fonts and typography: strong sans-serif headings, compact category labels, and medium-weight card copy preserve the hierarchy and density of the reference.
- Spacing and layout rhythm: three promo tiles use the same asymmetric proportions; product content uses consistent internal padding and a reserved two-line title area.
- Colors and tokens: white canvas, pale neutral tile/card backgrounds, black text, subtle borders, and black selected filter follow the requested white/black system.
- Image quality and fidelity: promotional cards reuse high-resolution store banner assets; product cards render uploaded product media with `object-contain` and use a real speaker asset when media is absent.
- Copy and content: all copy is localized for a Vietnamese speaker store and remains editable HTML.

## Loading, interaction, and browser checks

- Initial browser state showed only the lightweight showcase skeleton.
- The dynamic component loaded after the first downward scroll and entered the IntersectionObserver preload range.
- Browser/server evidence confirmed an AJAX request to `/api/products?featured=true&limit=12` only after activation.
- Category filters, Swiper navigation/swipe configuration, product links, and wishlist controls are interactive.
- Add-to-cart was tested on the 390 px viewport: the button changed to “Đã thêm vào giỏ” and the header cart count changed from 0 to 1.
- Desktop and 390 × 844 mobile layouts were visually inspected.
- Production build completed successfully.
- Console warning about smooth-scroll metadata was fixed by declaring `data-scroll-behavior="smooth"` on the root element.

## Findings

No actionable P0, P1, or P2 differences remain. The live database currently contains one published featured product, so the rail correctly shows one real card instead of inventing catalog data; additional products will automatically populate the shared carousel.

## Comparison history

- Initial pass: Swiper click prevention could interfere with buttons nested in slides (P2 risk).
- Fix: explicitly disabled `preventClicks` and `preventClicksPropagation` for the featured-products Swiper.
- Post-fix evidence: mobile browser interaction successfully added the real database product to the cart and updated both button and header states.

## Follow-up polish

- P3: when the catalog contains at least four products, recheck desktop arrow placement against real card density.

final result: passed
