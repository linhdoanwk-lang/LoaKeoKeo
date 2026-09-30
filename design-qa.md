# Design QA — Homepage hero slider

- Source visual truth: `C:\Users\PA\AppData\Local\Temp\codex-clipboard-01306e29-172c-47a6-9836-9128ccb37fcb.png`
- Implementation screenshot: `codex-iab://tab/2` (browser-rendered captures taken in the current Codex session)
- Desktop viewport: 1464 × 884 CSS px, device scale factor 1
- Mobile viewport: 390 × 844 CSS px, device scale factor 1
- Source pixels: 1877 × 787
- State: homepage banner, slide 1; slide switching also tested
- Density normalization: compared at CSS-pixel scale; browser chrome excluded from layout judgments

## Full-view comparison evidence

The implementation preserves the reference hierarchy: large editable headline and supporting copy on the left, dominant product photography on the right, a single primary CTA, and three pagination indicators at the lower left. The website's established monochrome palette replaces the reference blue accent intentionally.

Desktop capture confirms the hero fills the main viewport width with a wide, light studio composition. Mobile capture confirms that headline, description, CTA, image subject, and pagination remain visible without horizontal overflow.

## Focused region comparison evidence

- Typography: bold geometric sans-serif headline, tight line height and large scale match the source hierarchy; supporting text stays lower contrast.
- Spacing: left content inset, vertical centering, CTA gap, and bottom pagination follow the reference rhythm.
- Colors: white/light-gray background, black text, black CTA, and neutral pagination match the site's requested white-and-black theme.
- Image quality: three purpose-made high-resolution product images are used; no placeholders, CSS product drawings, or stretched source screenshots.
- Copy: Vietnamese copy is specific to the speaker store and remains editable HTML.

## Interaction and browser checks

- Swiper pagination changes slides successfully.
- Autoplay, looping, pointer swipe, clickable pagination, pause-on-hover, and accessibility labels are enabled.
- Mobile layout tested at 390 × 844.
- Browser console checked after the final reload: no new warnings or errors.
- Production build completed successfully.

## Findings

No actionable P0, P1, or P2 differences remain. Rounded corners and the monochrome CTA are intentional adaptations to the existing storefront design system.

## Comparison history

- Initial pass: pagination used Swiper's centered default and disappeared visually on mobile (P2).
- Fix: added component-scoped pagination positioning, active-pill treatment, and responsive offsets.
- Post-fix evidence: desktop and 390 px mobile browser captures show pagination at the lower-left with all three controls visible.

## Follow-up polish

- P3: product photography could be replaced later with exact store inventory images when those assets are available.

final result: passed
