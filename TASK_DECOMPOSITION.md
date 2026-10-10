# Work Breakdown Structure (WBS) — Exercise 2: Reactive State Machine & Delegation Hub

| Task ID | Sub-task | Output file | Contract | Acceptance Criteria | Commit message |
|---------|----------|-------------|----------|---------------------|----------------|
| 0.1 | WBS definition | TASK_DECOMPOSITION.md | 6-col table; Ex 2 only | Committed before any code | docs(spec): add exercise 2 WBS |
| 0.2 | Project rules | project-rules.md | Banned: var, innerHTML, inline handlers, keypress/keyCode; CSP; semantic HTML; vanilla only | Matches Lab 2 constraints | docs(spec): add project rules |
| 2.1 | stateStore + cursor engine | src/state/state-store.js | stateStore = []; cursor = 0; setRenderer(fn); resetCursor() | Cursor resets each render pass; no hook order corruption | feat(state): implement stateStore and resetCursor engine |
| 2.2 | useState dispatcher | src/state/use-state.js | useState(init) → [value, setState]; function updater support; Object.is guard; triggerRender() | setCount(c => c+1) works; no re-render if value unchanged | feat(state): implement reactive useState dispatcher |
| 2.3 | Event delegation hub | src/events/delegation-hub.js | setupEventDelegation(root); ['click','input','keydown']; traverse event.target._vnode.props.onX | 1 listener/event type on root; zero listeners on button children | feat(events): attach root event delegation listener |
| 2.4 | Reactive Task Manager UI | src/app/task-manager.js | data-task-id, data-filter; aria-pressed, aria-live; filter ALL/ACTIVE/DONE; unique uuid key (NO index) | Add task; filter toggle works; zero orphan listeners | feat(ui): assemble reactive todo application |
| 2.5 | Mount task manager | src/main.js | Import task-manager.js; mount into #app | Task manager visible; no console errors | feat(ui): mount task manager |
| 2.6 | Task manager harness | index.html | Meta CSP; semantic tags; exactly 1 h1; aria-live status | Live Server 5500 clean; zero horizontal scroll at 375px | feat(html): add task manager harness |
| 2.7 | Grep + Live Server audit | N/A | grep banned: var, innerHTML, onclick=, oninput=, keyCode, keypress | Zero hits; DevTools Event Listeners: 0 orphan listeners on button children | chore(verify): final exercise audit |

**Total: 9 tasks. Each task produces exactly 1 file. Commits follow Conventional Commits.**