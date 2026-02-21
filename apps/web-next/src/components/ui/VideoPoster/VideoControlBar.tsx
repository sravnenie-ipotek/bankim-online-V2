'use client'

import React, { useRef, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import type { VideoControlBarProps } from './interfaces/VideoControlBarProps'
import type { VideoControlBarItemKey } from './types/VideoControlBarItemKey'
import { DEFAULT_CONTROL_ORDER } from './types/VideoControlBarItemKey'
import { getIconButtonSx } from './styles/iconButtonSx'
import FullscreenEnterIcon from './components/FullscreenEnterIcon'
import FullscreenExitIcon from './components/FullscreenExitIcon'

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const iconSize = (compact: boolean) => (compact ? 14 : 24)

const VideoControlBar: React.FC<VideoControlBarProps> = ({
  isPlaying,
  onPlayPause,
  onSeekBack,
  onSeekForward,
  isMuted,
  volume,
  onMuteToggle,
  onVolumeChange,
  currentTime,
  duration,
  onSeek,
  onFullscreen,
  onProgressDragStart,
  onProgressDragEnd,
  order = DEFAULT_CONTROL_ORDER,
  compact = false,
  centerControls = false,
  dir = 'ltr',
  isFullscreen = false,
}) => {
  const handleVolumeChange = (_: Event, value: number | number[]) => {
    const v = Array.isArray(value) ? value[0] : value
    onVolumeChange(v / 100)
  }

  const progressValue = duration > 0 ? (currentTime / duration) * 100 : 0
  const [isDraggingProgress, setIsDraggingProgress] = useState(false)
  const [dragProgressValue, setDragProgressValue] = useState(0)
  const didNotifyDragStartRef = useRef(false)
  const progressAtGrabRef = useRef(0)

  const THUMB_GRAB_THRESHOLD = 3

  const handleProgressChange = (_: Event, value: number | number[]) => {
    const v = Array.isArray(value) ? value[0] : value
    if (!isDraggingProgress) {
      setIsDraggingProgress(true)
      didNotifyDragStartRef.current = true
      progressAtGrabRef.current = progressValue
      onProgressDragStart?.()
      const isGrabbingThumb = Math.abs(v - progressValue) < THUMB_GRAB_THRESHOLD
      setDragProgressValue(isGrabbingThumb ? progressValue : v)
    } else {
      setDragProgressValue(v)
    }
  }

  const handleProgressChangeCommitted = (_: Event | React.SyntheticEvent, value: number | number[]) => {
    const v = Array.isArray(value) ? value[0] : value
    const isGrabbingThumb = Math.abs(v - progressAtGrabRef.current) < THUMB_GRAB_THRESHOLD
    const seekValue = isDraggingProgress ? v : (isGrabbingThumb ? progressAtGrabRef.current : v)
    onSeek(seekValue / 100)
    setIsDraggingProgress(false)
    if (didNotifyDragStartRef.current) {
      didNotifyDragStartRef.current = false
      onProgressDragEnd?.()
    }
  }

  const size = iconSize(compact)
  const iconButtonSx = getIconButtonSx(compact)

  const controlNodes: Record<VideoControlBarItemKey, React.ReactNode> = {
    progress: (
      <Slider
        size="small"
        value={isDraggingProgress ? dragProgressValue : progressValue}
        onChange={handleProgressChange}
        onChangeCommitted={handleProgressChangeCommitted}
        min={0}
        max={100}
        step={0.01}
        sx={{
          width: '100%',
          height: '0.5px',
          color: 'white',
          '& .MuiSlider-rail': { height: '0.5px' },
          '& .MuiSlider-track': {
            height: '0.5px',
            transition: isDraggingProgress ? 'none' : 'width 0.1s ease-out',
          },
          '& .MuiSlider-thumb': {
            width: compact ? 8 : 12,
            height: compact ? 8 : 12,
            transition: isDraggingProgress ? 'none' : 'left 0.1s ease-out',
            '&::after': {
              width: 28,
              height: 28,
            },
          },
        }}
        aria-label="Video progress"
      />
    ),
    playPause: (
      <IconButton
        size="small"
        onClick={onPlayPause}
        sx={iconButtonSx}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        )}
      </IconButton>
    ),
    seekBack: (
      <IconButton size="small" onClick={onSeekBack} sx={iconButtonSx} aria-label="Seek backward">
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
        </svg>
      </IconButton>
    ),
    seekForward: (
      <IconButton size="small" onClick={onSeekForward} sx={iconButtonSx} aria-label="Seek forward">
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
        </svg>
      </IconButton>
    ),
    mute: (
      <IconButton
        size="small"
        onClick={onMuteToggle}
        sx={iconButtonSx}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </IconButton>
    ),
    volume: (
      <div className={compact ? '' : 'w-14 xs:w-16 sm:w-[72px] md:w-20 lg:w-20 xl:w-24 shrink-0'}>
        <Slider
          size="small"
          value={isMuted ? 0 : volume * 100}
          onChange={handleVolumeChange}
          min={0}
          max={100}
          className="shrink-0"
          sx={{
            width: compact ? 36 : '100%',
            color: 'white',
            '& .MuiSlider-thumb': { width: compact ? 8 : 12, height: compact ? 8 : 12 },
          }}
          aria-label="Volume"
        />
      </div>
    ),
    time: (() => {
      const displayTime =
        isDraggingProgress && duration > 0 ? (dragProgressValue / 100) * duration : currentTime
      return (
        <span className={`text-white tabular-nums shrink-0 ${compact ? 'text-[10px] ms-2' : 'ms-2 xs:ms-2 sm:ms-3 md:ms-3 lg:ms-3 xl:ms-4 text-[clamp(0.75rem,0.7rem+0.25vw,1rem)]'}`}>
          {formatTime(displayTime)} / {formatTime(duration)}
        </span>
      )
    })(),
    fullscreen: (
      <IconButton
        size="small"
        onClick={onFullscreen}
        className="shrink-0 inline-flex items-center justify-center"
        sx={iconButtonSx}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
      >
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
      </IconButton>
    ),
  }

  const hasProgress = order.includes('progress')
  const otherOrder = order.filter((k) => k !== 'progress')

  const progressRow = hasProgress && (
    <div className={`w-full ${compact ? 'px-0.5 pt-0.5 min-h-4' : 'pt-0.5 min-h-4 xs:pt-0.5 sm:pt-1 md:min-h-4'}`}>
      {controlNodes.progress}
    </div>
  )

  const controlsRow = otherOrder.length > 0 && (
    <div
      dir="ltr"
      className={`flex flex-row flex-nowrap items-center w-full min-w-0 ${hasProgress ? 'mt-[1px]' : ''} ${compact ? 'gap-1 px-0.5 py-0 min-h-6' : 'gap-1.5 py-1 min-h-7 xs:gap-1.5 xs:py-1 xs:min-h-7 sm:gap-2 sm:py-1.5 sm:min-h-8 md:gap-2 md:py-1.5 md:min-h-8 lg:gap-3 lg:min-h-8 xl:gap-3 xl:py-2 xl:min-h-9'} ${
        centerControls ? 'justify-center' : 'justify-start text-left'
      }`}
    >
      {otherOrder.map((key) =>
        key === 'fullscreen' && !centerControls ? (
          <div key={key} className="ml-auto">
            {controlNodes[key]}
          </div>
        ) : (
          <React.Fragment key={key}>{controlNodes[key]}</React.Fragment>
        )
      )}
    </div>
  )

  const rootPaddingClass = compact
    ? 'py-1 px-1.5'
    : isFullscreen
      ? 'px-4 py-1 sm:py-1.5 lg:py-2'
      : 'rounded-b-[0.625rem] px-2 py-1 xs:px-2 xs:py-1 sm:px-3 sm:py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-1.5 xl:px-4 xl:py-2'

  return (
    <div
      className={`flex flex-col min-w-0 bg-black/60 ${compact ? 'w-[270px] rounded-lg' : 'w-full'} ${rootPaddingClass}`}
      dir={dir}
    >
      {progressRow}
      {controlsRow}
    </div>
  )
}

export default VideoControlBar
