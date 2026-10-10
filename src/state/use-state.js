import { getRenderTrigger, getInternalStore } from './state-store.js';

/**
 * Retrieves or initializes state and returns its value with a setter.
 * @param {*} initialValue - Initial state value.
 * @returns {[*, Function]} Tuple containing the current state and setState function.
 */
export function useState(initialValue) {
  const store = getInternalStore();
  const currentCursor = store.cursorRef.get();

  if (store.states[currentCursor] === undefined) {
    store.states[currentCursor] = initialValue;
  }

  const setState = (nextValue) => {
    const resolvedValue =
      typeof nextValue === 'function'
        ? nextValue(store.states[currentCursor])
        : nextValue;

    if (Object.is(store.states[currentCursor], resolvedValue)) {
      return;
    }

    store.states[currentCursor] = resolvedValue;
    getRenderTrigger()();
  };

  store.cursorRef.increment();

  return [store.states[currentCursor], setState];
}
