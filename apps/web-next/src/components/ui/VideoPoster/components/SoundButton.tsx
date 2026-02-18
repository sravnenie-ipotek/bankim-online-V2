'use client'

import React from 'react'
import Image from 'next/image'
import IconButton from '@mui/material/IconButton'

interface SoundButtonProps {
  isMuted: boolean
  onClick: () => void
}

const SPEAKER_OFF_SRC = '/static/speaker-off.svg'
const SPEAKER_ON_SRC = '/static/speaker-on.svg'

const SoundButton: React.FC<SoundButtonProps> = ({ isMuted, onClick }) => (
  <IconButton
    type="button"
    onClick={onClick}
    aria-label={isMuted ? 'Unmute' : 'Mute'}
    disableRipple
    sx={{
      width: 73,
      height: 73,
      padding: 0,
      borderRadius: 0,
      border: 'none',
      outline: 'none',
      '&:hover': { backgroundColor: 'transparent', opacity: 0.9 },
      '&:focus': { outline: 'none' },
      '&:focus-visible': { outline: 'none' },
      '&.Mui-focusVisible': { outline: 'none' },
    }}
  >
    <Image
      src={isMuted ? SPEAKER_OFF_SRC : SPEAKER_ON_SRC}
      alt=""
      width={73}
      height={73}
      style={{ display: 'block', transform: 'rotate(180deg)' }}
      aria-hidden
    />
  </IconButton>
)

export default SoundButton
