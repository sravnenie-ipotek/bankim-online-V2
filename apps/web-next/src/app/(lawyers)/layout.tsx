import LayoutShell from '@/components/layout/LayoutShell'
import LawyersFooter from '@/components/layout/LawyersFooter'

/**
 * Layout for lawyers/real-estate pages.
 * Uses the shared shell (Header, Sidebar, MobileMenu) with a
 * dedicated LawyersFooter instead of the standard Footer.
 */
export default function LawyersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutShell footer={<LawyersFooter />}>
      {children}
    </LayoutShell>
  )
}
