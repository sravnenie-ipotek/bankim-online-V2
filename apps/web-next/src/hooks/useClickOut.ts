'use client'

import { useCallback, useEffect, useRef } from 'react'

interface UseClickOutProps {
  handleClickOut?: () => void
}

export const useClickOut = ({ handleClickOut }: UseClickOutProps) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        handleClickOut
      ) {
        handleClickOut()
      }
    },
    [handleClickOut]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [handleClick, handleClickOut])

  return ref
}

export default useClickOut
