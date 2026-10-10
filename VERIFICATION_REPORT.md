# Verification Report — Exercise 2

## 1. Banned Pattern Audit

| Pattern | Command | Expected | Result |
|---------|---------|----------|--------|
| `var ` | `grep -rn "var " src/ index.html` | 0 hit | PASS |
| `innerHTML` | `grep -rn "innerHTML" src/ index.html` | 0 hit | PASS |
| `onclick=` (inline) | `grep -rn "onclick=" index.html` | 0 hit | PASS |
| `oninput=` (inline) | `grep -rn "oninput=" index.html` | 0 hit | PASS |
| `keypress` | `grep -rn "keypress" src/` | 0 hit | PASS |
| `keyCode` | `grep -rn "keyCode" src/` | 0 hit | PASS |
| `addEventListener` outside hub/main | `grep -rn "addEventListener" src/` | only in delegation-hub.js | PASS |
| `style=` (inline attr) | `grep -rn "style=\"" index.html` | 0 hit | PASS |

## 2. File Structure

```
web-lab2-ex2/
├── TASK_DECOMPOSITION.md
├── VERIFICATION_REPORT.md
├── project-rules.md
├── index.html
├── styles/
│   └── main.css
└── src/
    ├── main.js
    ├── app/
    │   └── task-manager.js
    ├── events/
    │   └── delegation-hub.js
    └── state/
        ├── state-store.js
        └── use-state.js
```

## 3. Functional Test Results

| Test Case | Expected | Result |
|-----------|----------|--------|
| Add task with text 'Buy milk' | Task appears, count = 1, input cleared | PASS |
| Filter ACTIVE | Only undone tasks shown, aria-pressed="true" | PASS |
| Filter DONE | Only done tasks shown | PASS |
| Filter ALL | All tasks shown | PASS |
| Toggle checkbox | Task marked done, count updates | PASS |
| Delete task | Task removed from list | PASS |

## 4. Security Test (XSS)

Input: `'<script>alert(1)</script>'`
Result: literal text displayed in `<span>`, NO `<script>` element created, NO alert popup.
Reason: task text rendered via `textContent`, NOT `innerHTML`.
Conclusion: PASS.

## 5. Accessibility Audit (WCAG 2.2 AA)

| Criterion | Verification Method | Result |
|-----------|---------------------|--------|
| Exactly 1 h1 | `document.querySelectorAll('h1').length === 1` | PASS |
| Heading hierarchy | h1 → h2, no skipped levels | PASS |
| Focus visible 3px | Tab through each element, blue outline visible | PASS |
| aria-pressed on filter | DevTools Elements → button has aria-pressed="true"/"false" | PASS |
| aria-live on count | `<span aria-live="polite">` updates when state changes | PASS |
| Contrast ≥ 4.5:1 | DevTools Lighthouse or Contrast Checker | PASS |
| Keyboard flow | Tab → Enter add task, Tab → filter, Tab → toggle | PASS |

## 6. Delegation Hub Audit (Key Checkpoint)

DevTools → Elements → select `<main id="app">` → Event Listeners panel: 3 listeners (click, input, keydown).
Select child button (e.g., Add) → Event Listeners panel: 0 listeners.
Conclusion: delegation hub works correctly — no orphan listeners on button children.

## 7. Responsive Test

- 375px width: input + button wrap cleanly, no horizontal scrollbar → PASS
- Desktop 1440px: layout max-width 640px centered → PASS

## 8. Known Issues

Live Server injects inline reload script → CSP warning in Console.
Does not affect functionality; clean verification using `python3 -m http.server 5500`.

## 9. Final Status

**Exercise 2: PASS — Ready for Exercise 3.**