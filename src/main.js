/**
 * Bootstraps the task manager by registering the render function,
 * rendering the initial UI, and setting up event delegation once.
 */
import { setRenderer, resetCursor } from './state/state-store.js';
import { setupEventDelegation } from './events/delegation-hub.js';
import { TaskManager } from './app/task-manager.js';

const rootContainer = document.getElementById('app');

if (!rootContainer) {
  const status = document.getElementById('status');

  if (status) {
    status.textContent = '✗ Missing #app container';
  }

  throw new Error('Missing #app');
}

function render() {
  resetCursor();
  const tree = TaskManager();
  rootContainer.replaceChildren(tree);
}

setRenderer(render);

render();

setupEventDelegation(rootContainer);

const status = document.getElementById('status');

if (status) {
  status.textContent = '✓ Task manager mounted';
}
