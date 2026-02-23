import React from 'react';

/**
 * Standalone layout — no header, footer, or sidebar.
 * Used for pages like mobile document upload that need a clean, full-screen experience.
 */
const StandaloneLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default StandaloneLayout;
