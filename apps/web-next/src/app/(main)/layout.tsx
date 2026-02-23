import React from 'react';
import LayoutShell from '@/components/layout/LayoutShell';
import ConditionalFooter from '@/components/layout/ConditionalFooter';
import SkipCookie from '@/components/ui/SkipCookie/SkipCookie';

/**
 * Layout for all main app routes.
 * Renders the shared shell (Header, Sidebar, MobileMenu) with the
 * standard Footer that auto-hides on service/calculator pages.
 * SkipCookie banner is shown site-wide for consent.
 */
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LayoutShell footer={<ConditionalFooter />}>
      {children}
      <SkipCookie />
    </LayoutShell>
  );
};

export default MainLayout;
