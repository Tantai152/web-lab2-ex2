# Project Rules — Lab 2 Exercise 2

## Language & Runtime

- Vanilla HTML5 + Modern CSS + ES6+ JavaScript
- NO frameworks, NO libraries, NO CDN
- Local server: http://localhost:5500 (Live Server). file:/// BANNED.

## Code Rules (BANNED → MUST USE)

| BANNED | MUST USE |
|--------|----------|
| var / implicit global | const (default), let (only when reassignment needed) |
| keypress / e.keyCode | keydown / e.key / e.code |
| innerHTML with user input | textContent or DOM APIs (createTextNode, replaceChildren) |
| Inline event handlers (onclick=, oninput=, ...) | Centralized Event Delegation at root |
| Array index as key | Stable unique ID (crypto.randomUUID()) |
| Direct setState call without closure | Use functional updater when needed |

## Semantic HTML

- NO `<div>` for structure — use section, article, header, footer, nav, figure, main
- Exactly 1 `<h1>` per document, no skipped heading levels (h1→h2→h3)

## Accessibility (WCAG 2.2 AA)

- Contrast ≥ 4.5:1
- Full keyboard Tab/Enter/Space flow
- :focus-visible outline 3px
- aria-pressed for toggle buttons (filter)
- aria-live="polite" for dynamic count/status

## Security

- Meta CSP in `<head>`:
  ```html
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; media-src 'self'">
  ```
- NO innerHTML with user input (XSS prevention)
- Task text MUST use textContent when rendering

## Responsive

- Mobile-first: verify at 375px before desktop
- Zero horizontal scrollbar

## State Machine Invariants

- Hook order IMMUTABLE: never call useState inside if/loop/nested function
- Cursor reset every render pass (resetCursor() before component runs)
- setState MUST check Object.is before triggerRender()
- Functional updater: if nextValue is a function → call nextValue(prevValue)

## Git Workflow

- 1 task = 1 file = 1 commit
- Commit message format: type(scope): description
- Types: docs(spec), feat(html), feat(css), feat(js), feat(core), feat(state), feat(events), feat(ui), fix(a11y), fix(nav), fix(sec), perf, chore

**Rules are immutable — no mid-stream changes.**