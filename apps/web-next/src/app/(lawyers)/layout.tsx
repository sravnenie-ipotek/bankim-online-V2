import React from 'react';
import LayoutShell from '@/components/layout/LayoutShell';
import LawyersFooter from '@/components/layout/LawyersFooter';

/**
 * Layout for lawyers/real-estate pages.
 * Uses the shared shell (Header, Sidebar, MobileMenu) with a
 * dedicated LawyersFooter instead of the standard Footer.
 */
const LawyersLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <LayoutShell footer={<LawyersFooter />}>{children}</LayoutShell>;
};

export default LawyersLayout;
