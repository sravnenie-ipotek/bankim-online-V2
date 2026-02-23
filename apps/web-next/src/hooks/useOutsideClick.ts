'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Returns a ref to attach to a container; calls handleOutsideClick when a click occurs outside that container.
 * @param handleOutsideClick - Callback when user clicks outside the ref element.
 * @returns ref - Attach to the div (or element) that defines "inside".
 */
export default function useOutsideClick(handleOutsideClick: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onClick = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleOutsideClick();
      }
    },
    [handleOutsideClick]
  );

  useEffect(() => {
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
    };
  }, [onClick]);

  return ref;
}
