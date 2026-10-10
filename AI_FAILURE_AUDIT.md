# AI Failure Mode Audit — Exercise 2

This document records three common AI failure modes observed when generating code for the reactive state machine and delegation hub in Exercise 2, along with detection methods and verified fixes.

### Entry 1 — addEventListener in Component Body (Listener Accumulation)

- **Sample AI Prompt:** "Add click handler to task delete button"
- **AI Generated Code (WRONG):**
  ```js
  function TaskManager() {
    const root = document.createElement('main');
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add';
    addBtn.addEventListener('click', () => console.log('clicked'));
    root.appendChild(addBtn);
    return root;
  }
  ```
- **Risk:** Each re-render creates a new button + new listener; old button is replaced but listener remains in memory if node hasn't been garbage collected.
- **Detection Method:** DevTools → Elements → select button → Event Listeners panel → see multiple duplicate click listeners after several state changes. DevTools → Performance Monitor → Listener count increases.
- **Engineering Refactor:** Attach `_vnode.props.onClick` on element, NO `addEventListener`. Delegation hub traverses from `event.target` up to root.
- **Verified Fix:** DevTools Event Listeners: root has 3 listeners (click/input/keydown), child buttons have 0 listeners.

### Entry 2 — Array Index as Key in Task List

- **Sample AI Prompt:** "Render tasks array into list with checkbox"
- **AI Generated Code (WRONG):**
  ```js
  tasks.map((task, i) =>
    createElement('li', { key: i },
      createElement('input', { type: 'checkbox', checked: task.done }),
      task.text
    )
  );
  ```
- **Risk:** Deleting first task → index shifts → checkbox of next task inherits state of deleted task. User checks "Buy milk", deletes it, task "Review PR" automatically becomes done.
- **Detection Method:** Add 2 tasks, check task 1, delete task 1 → task 2 auto-checks. DevTools → Elements → data-task-id doesn't match.
- **Engineering Refactor:** `key: task.id` with `id = crypto.randomUUID()` when creating task.
- **Verified Fix:** Delete any task → remaining tasks keep correct done state.

### Entry 3 — Stale Closure in setState

- **Sample AI Prompt:** "Implement setState that updates state and re-renders"
- **AI Generated Code (WRONG):**
  ```js
  function useState(init) {
    let value = init;
    const setState = (next) => {
      value = next;              // BUG: captures local variable, doesn't write to store
      triggerRender();
    };
    return [value, setState];
  }
  ```
- **Risk:** `value` is a local variable, each render pass creates a new closure. `setState` writes to old variable → state doesn't persist across renders. UI doesn't update correctly.
- **Detection Method:** Click filter twice rapidly → filter stays unchanged, doesn't toggle. DevTools → log stateStore shows value doesn't change.
- **Engineering Refactor:** Store state in module-level `stateStore[]` + cursor index. `setState` writes to `stateStore[currentCursor]`, closure preserves correct index.
- **Verified Fix:** `getInternalStore().states[0]` updates after `setState`; UI re-renders correctly.

## Summary

| # | Failure Mode | Severity | Status |
|---|--------------|----------|--------|
| 1 | Listener accumulation | High (Memory) | Fixed |
| 2 | Index as key | High (State corruption) | Fixed |
| 3 | Stale closure | Critical (State broken) | Fixed |