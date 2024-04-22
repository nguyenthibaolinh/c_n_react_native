interface EventListener {
  [eventName: string]: Array<(...args: any[]) => void>;
}

const eventListeners: EventListener = {};

export const sendEvent = (eventName: string, detail: any) => {
  const listeners = eventListeners[eventName] || [];
  listeners.forEach(listener => listener(detail));
}

export const listenEvent = (eventName: string, handler: (...args: any[]) => void) => {
  if (!eventListeners[eventName]) {
    eventListeners[eventName] = [];
  }
  eventListeners[eventName].push(handler);

  return () => {
    eventListeners[eventName] = eventListeners[eventName].filter(listener => listener !== handler);
  };
}
