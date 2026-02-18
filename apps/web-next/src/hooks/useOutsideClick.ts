'use client'

import { useCallback, useEffect, useRef } from 'react'

export default function useOutsideClick(handleOutsideClick: () => void) {
  const ref = useRef<HTMLDivElement | null>(null)

  const onClick = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleOutsideClick()
      }
    },
    [handleOutsideClick]
  )

  useEffect(() => {
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
    }
  }, [onClick])

  return ref
}
