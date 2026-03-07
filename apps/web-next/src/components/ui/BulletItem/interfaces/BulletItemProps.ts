/**
 * Props for BulletItem: one row with yellow-dot bullet and description text.
 */
export interface BulletItemProps {
  /** Description text shown next to the bullet. */
  description: string;
  /** Optional text direction for RTL/LTR. */
  direction?: 'ltr' | 'rtl';
  /** Optional additional class names. */
  className?: string;
}
