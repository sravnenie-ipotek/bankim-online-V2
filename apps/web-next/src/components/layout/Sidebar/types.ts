import React from 'react'

interface IconProps {
  color?: string
  size?: number
}

export interface MenuItem {
  title: string
  path?: string
  icon?: React.FC<IconProps>
  isExternal?: boolean
}
