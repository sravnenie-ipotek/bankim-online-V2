import type { SxProps, Theme } from '@mui/material'

export function getIconButtonSx(compact: boolean): SxProps<Theme> {
  return {
    color: '#fff',
    '&:hover': { color: '#fff', backgroundColor: 'rgba(255,255,255,0.08)' },
    '&.Mui-focusVisible': { color: '#fff' },
    '& svg': { color: '#fff' },
    ...(compact ? { padding: 0.25 } : {}),
  }
}
