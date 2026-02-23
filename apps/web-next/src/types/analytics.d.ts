declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetIdOrEventName: string,
      config?: Record<string, string | number | boolean>
    ) => void;
  }
}

export {};
