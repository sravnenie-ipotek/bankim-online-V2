/**
 * Standalone layout — no header, footer, or sidebar.
 * Used for pages like mobile document upload that need a clean, full-screen experience.
 */
export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
