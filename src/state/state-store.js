let stateStore = [];
let cursor = 0;
let triggerRender = () => {};

/**
 * Registers the root re-render callback.
 * @param {Function} rerenderFn - Function that triggers a re-render.
 */
export function setRenderer(rerenderFn) {
  triggerRender = rerenderFn;
}

/**
 * Resets the hook cursor before each render pass.
 */
export function resetCursor() {
  cursor = 0;
}

/**
 * Returns the currently registered render trigger.
 * @returns {Function} The render trigger callback.
 */
export function getRenderTrigger() {
  return triggerRender;
}

/**
 * Provides access to the state array and a cursor reference wrapper.
 * @returns {{ states: Array, cursorRef: { get: Function, set: Function, increment: Function } }}
 */
export function getInternalStore() {
  return {
    states: stateStore,
    cursorRef: {
      get: () => cursor,
      set: (v) => {
        cursor = v;
      },
      increment: () => {
        cursor++;
      }
    }
  };
}
