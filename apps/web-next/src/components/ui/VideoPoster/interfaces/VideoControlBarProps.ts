import type { VideoControlBarItemKey } from '../types/VideoControlBarItemKey'

export interface VideoControlBarProps {
  isPlaying: boolean
  onPlayPause: () => void
  onSeekBack: () => void
  onSeekForward: () => void
  isMuted: boolean
  volume: number
  onMuteToggle: () => void
  onVolumeChange: (value: number) => void
  currentTime: number
  duration: number
  onSeek: (fraction: number) => void
  onFullscreen: () => void
  /** Called when user starts dragging the progress bar (parent can pause time updates for smooth drag) */
  onProgressDragStart?: () => void
  /** Called when user releases the progress bar after dragging */
  onProgressDragEnd?: () => void
  /** Order of controls left to right. Default: seekBack, playPause, seekForward, mute, volume, time, fullscreen */
  order?: VideoControlBarItemKey[]
  /** Compact mode for fixed 270x24 container */
  compact?: boolean
  /** Center controls horizontally in the bar (e.g. for modal) */
  centerControls?: boolean
  /** Text/flow direction: 'rtl' for Hebrew (progress bar fills right-to-left) */
  dir?: 'ltr' | 'rtl'
  /** Whether the player is in native fullscreen mode */
  isFullscreen?: boolean
}
