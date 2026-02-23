import React from 'react';
import LayoutShell from '@/components/layout/LayoutShell';
import ConditionalFooter from '@/components/layout/ConditionalFooter';

/**
 * Layout for bank-employee, bank-partner, and bank-worker registration flows.
 * Uses the shared shell (Header, Sidebar, MobileMenu) with the standard Footer.
 */
const RegistrationLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <LayoutShell footer={<ConditionalFooter />}>{children}</LayoutShell>;
};

export default RegistrationLayout;
