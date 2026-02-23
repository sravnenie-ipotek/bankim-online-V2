/**
 * Custom Tailwind plugin: semantic component classes (buttons, tabs, inputs, surfaces, layout).
 * Used via addComponents so these classes are available globally.
 */
export function uiComponentsPlugin({
  addComponents,
}: {
  addComponents: (components: Record<string, Record<string, unknown>>) => void;
}): void {
  addComponents({
    /* Primary CTA buttons */
    '.btn-primary': {
      '@apply rounded-lg font-medium transition-colors bg-accent-primary text-base-primary hover:bg-accent-primaryActiveButton': {},
    },
    '.btn-primary:disabled': {
      '@apply opacity-50 cursor-not-allowed': {},
    },
    '.btn-primary-sm': {
      '@apply rounded-lg font-medium transition-colors bg-accent-primary text-base-primary hover:bg-accent-primaryActiveButton px-4 py-2 text-sm': {},
    },
    '.btn-primary-md': {
      '@apply rounded-lg font-medium transition-colors bg-accent-primary text-base-primary hover:bg-accent-primaryActiveButton px-6 py-3': {},
    },
    '.btn-primary-lg': {
      '@apply rounded-lg font-medium transition-colors bg-accent-primary text-base-primary hover:bg-accent-primaryActiveButton px-8 py-3': {},
    },
    '.btn-primary-full': {
      '@apply rounded-lg font-medium transition-colors bg-accent-primary text-base-primary hover:bg-accent-primaryActiveButton w-full py-3': {},
    },
    /* Tab-like buttons (base; pair with -active / -inactive) */
    '.tab-btn': {
      '@apply px-4 py-2 rounded-lg text-sm font-medium transition-colors': {},
    },
    '.tab-btn-active': {
      '@apply bg-accent-primary text-base-primary': {},
    },
    '.tab-btn-inactive': {
      '@apply bg-base-secondary text-textTheme-secondary hover:bg-base-base800': {},
    },
    /* Base form input */
    '.input-base': {
      '@apply px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary w-full': {},
    },
    /* Surfaces / cards */
    '.surface-card': {
      '@apply bg-base-secondary rounded-lg': {},
    },
    '.surface-card-p6': {
      '@apply bg-base-secondary rounded-lg p-6': {},
    },
    '.surface-card-p8': {
      '@apply bg-base-secondary rounded-lg p-8': {},
    },
    '.surface-card-hover': {
      '@apply bg-base-secondary rounded-lg hover:bg-base-base800 transition-colors': {},
    },
    /* Page layout wrapper */
    '.page-stack': {
      '@apply flex flex-col gap-8 w-full my-8': {},
    },
  });
}
