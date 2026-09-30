# Design QA — Floating contact buttons

- Source visual truth: `C:\Users\PA\AppData\Local\Temp\codex-clipboard-2f374fcc-6e40-4417-aada-19fb71dbbf35.png`
- Implementation evidence: local browser tab at `http://localhost:3000/`
- Source pixels: 159 × 258
- Desktop implementation: 1265 × 711 CSS px, device scale factor 1
- Mobile implementation: 390 × 844 CSS px, device scale factor 1
- Density normalization: the source is a focused crop while the implementation evidence is a full storefront viewport; comparison was limited to the two-button stack at its rendered CSS size
- State: storefront page, light theme, buttons idle; admin exclusion also verified

## Full-view comparison evidence

The implementation retains the reference composition: two circular contact controls in a fixed vertical stack near the lower-right edge, with Zalo above Messenger. Both remain visible during page scrolling and preserve the same order on desktop and mobile.

## Focused region comparison evidence

- Fonts and typography: the Zalo wordmark comes from the official-shaped Simple Icons glyph rather than reconstructed text; there is no additional visible copy.
- Spacing and layout rhythm: both controls are 56 px circles with a 12 px stack gap and consistent right/bottom offsets. The proportions closely match the source crop and remain touch-friendly.
- Colors and visual tokens: Zalo uses blue on white; Messenger uses a yellow outer circle with a white inner disc and yellow brand mark, matching the source palette.
- Image quality and asset fidelity: both marks are vector assets from `react-icons`, with no raster blur, placeholder, emoji, handcrafted SVG, or CSS-drawn logo.
- Copy and content: accessible names identify “Mở Zalo” and “Mở Messenger”; visible branding matches the source.

## Interaction and browser checks

- Zalo resolves to `NEXT_PUBLIC_ZALO_URL`, with `https://zalo.me/` as fallback.
- Messenger resolves to `NEXT_PUBLIC_MESSENGER_URL`, with `https://www.messenger.com/` as fallback.
- Links open in a new tab and use `noopener noreferrer`.
- Both controls expose hover, focus-visible, and keyboard-accessible states.
- The controls are intentionally hidden on `/admin` routes so they do not cover management actions.
- Desktop and 390 × 844 mobile layouts were visually checked.
- Browser console errors and warnings checked: none.

## Findings

No actionable P0, P1, or P2 differences remain.

## Comparison history

- Initial pass: Messenger rendered as a solid yellow button with a white mark, which differed from the source’s yellow ring and white center (P3).
- Polish applied: added a white inner disc and changed the Messenger glyph to yellow.
- Post-fix evidence: the mobile browser capture shows the yellow outer ring, white center, and yellow Messenger mark.

## Follow-up polish

- P3: replace fallback URLs with the store’s exact Zalo account and Facebook Page links in Vercel environment variables.

final result: passed
