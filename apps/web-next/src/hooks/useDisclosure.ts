'use client'

import { useState, useCallback, useMemo } from 'react'

interface DisclosureHandlers {
  open: () => void
  close: () => void
  toggle: () => void
}

type UseDisclosureReturn = [boolean, DisclosureHandlers]

const useDisclosure = (initial = false): UseDisclosureReturn => {
  const [opened, setOpened] = useState(initial)

  const open = useCallback(() => setOpened(true), [])
  const close = useCallback(() => setOpened(false), [])
  const toggle = useCallback(() => setOpened((prev) => !prev), [])

  const handlers = useMemo(() => ({ open, close, toggle }), [open, close, toggle])

  return [opened, handlers]
}

export default useDisclosure
