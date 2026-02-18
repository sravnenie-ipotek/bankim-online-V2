import LayoutShell from '@/components/layout/LayoutShell'
import ConditionalFooter from '@/components/layout/ConditionalFooter'

/**
 * Layout for bank-employee, bank-partner, and bank-worker registration flows.
 * Uses the shared shell (Header, Sidebar, MobileMenu) with the standard Footer.
 */
export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutShell footer={<ConditionalFooter />}>
      {children}
    </LayoutShell>
  )
}
