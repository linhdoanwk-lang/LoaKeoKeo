# Design QA — Featured categories

- Source visual truth: `C:\Users\PA\AppData\Local\Temp\codex-clipboard-0a9c1b6b-adaf-4db8-b5f5-27044c0db7ca.png`
- Implementation evidence: `codex-iab://tab/2` at `http://localhost:3000/` (browser-rendered desktop and mobile captures in the current Codex session)
- Source pixels: 1510 × 563
- Desktop implementation: 1464 × 877 CSS px, device scale factor 1
- Mobile implementation: 390 × 844 CSS px, device scale factor 1
- State: homepage after the scroll-triggered lazy bundle loads; featured-products AJAX request resolved
- Density normalization: judged at CSS-pixel scale; browser chrome excluded from component comparison

## Full-view comparison evidence

The desktop implementation preserves the reference composition: a left-aligned section title, a right-aligned view-all action, and a rounded two-row by five-column category grid. Thin neutral dividers, centered line icons, bold category labels, generous white space, and the monochrome palette closely match the source while adapting the content to a Vietnamese speaker catalog.

The 390 px mobile capture confirms a deliberate two-column grid with no horizontal page overflow. The title and view-all action remain on one line after the responsive typography adjustment.

## Focused region comparison evidence

- Fonts and typography: sans-serif heading and medium/bold labels match the source hierarchy; the mobile title is reduced only at the narrow breakpoint to prevent wrapping.
- Spacing and layout rhythm: desktop uses five equal tracks and two rows; mobile uses two equal tracks, consistent cell padding, and a single continuous rounded frame.
- Colors and visual tokens: white background, black copy, low-opacity gray icons, and subtle black borders follow both the reference and the storefront's established white/black theme.
- Image and icon fidelity: all category marks use the site's existing Lucide icon system with consistent 1.35 px strokes; no raster placeholders, emoji, or CSS-drawn symbols are used.
- Copy and content: labels are localized and specific to the speaker catalog: Bluetooth, portable, desktop, karaoke, soundbar, subwoofer, outdoor, smart, sound system, and accessories.

## Interaction and browser checks

- The component stays inside the existing scroll-triggered dynamic homepage bundle, so it does not increase the initial above-the-fold JavaScript path.
- Every category cell and the view-all action is a keyboard-accessible link to Collections.
- Desktop and 390 × 844 mobile layouts were visually inspected.
- The lazy boundary was exercised by scrolling from the initial skeleton state.
- Browser console errors and warnings checked after rendering: none.
- Production build completed successfully before browser QA.

## Findings

No actionable P0, P1, or P2 differences remain.

## Comparison history

- Initial mobile pass: the title wrapped to two lines beside the view-all action (P2 responsive drift).
- Fix: reduced only the narrow-breakpoint title/action sizes and tightened the header gap.
- Post-fix evidence: the 390 px browser capture shows both labels on one line while preserving readable type and the two-column grid.

## Follow-up polish

- P3: collection-specific destination URLs can replace the shared `/collections` destination when category filtering is added to the collection page.

final result: passed
