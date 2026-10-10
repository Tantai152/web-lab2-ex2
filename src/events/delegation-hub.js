const SUPPORTED_EVENTS = ['click', 'input', 'keydown'];

/**
 * Sets up event delegation on the root container.
 * @param {HTMLElement} rootContainer - The root element for delegated events.
 * @returns {Function} A cleanup function that removes all delegated listeners.
 */
export function setupEventDelegation(rootContainer) {
  const listeners = [];

  for (const eventType of SUPPORTED_EVENTS) {
    const handlerProp =
      eventType === 'keydown'
        ? 'onKeyDown'
        : 'on' + eventType.charAt(0).toUpperCase() + eventType.slice(1);

    const listenerFn = (nativeEvent) => {
      let target = nativeEvent.target;

      while (target && target !== rootContainer) {
        if (
          target._vnode &&
          target._vnode.props &&
          typeof target._vnode.props[handlerProp] === 'function'
        ) {
          target._vnode.props[handlerProp](nativeEvent);
          return;
        }

        target = target.parentElement;
      }
    };

    rootContainer.addEventListener(eventType, listenerFn);
    listeners.push([eventType, listenerFn]);
  }

  return () => {
    for (const [eventType, listenerFn] of listeners) {
      rootContainer.removeEventListener(eventType, listenerFn);
    }
  };
}
