'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'
import { useWindowResize } from '@/hooks/useWindowResize'
import { trackClick } from '@/helpers/analytics'
import type { VideoPosterProps } from './interfaces/VideoPosterProps'
import type { ReactPlayerRef } from 'react-player'
import VideoControlBar from './VideoControlBar'
import SoundButton from './components/SoundButton'
import { SeekStepHelper } from './helpers/SeekStepHelper'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const VIDEO_URL = '/static/promo.mp4'
const POSTER_URL = '/static/Background.png'
const MODAL_VIDEO_ASPECT_RATIO = 1130 / 636

const VideoPoster: React.FC<VideoPosterProps> = ({
  title,
  subtitle,
  text,
  size = 'normal',
}) => {
  const { i18n } = useTranslation()
  const isRtl = (i18n.language || 'he') === 'he'
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const singlePlayerRef = useRef<ReactPlayerRef>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)

  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showPlayPauseOverlay, setShowPlayPauseOverlay] = useState(false)
  const [modalControlsVisible, setModalControlsVisible] = useState(true)
  const [posterControlsVisible, setPosterControlsVisible] = useState(false)
  const [isDraggingProgressBar, setIsDraggingProgressBar] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const isDraggingRef = useRef(false)
  const wasPlayingBeforeDragRef = useRef(false)
  const overlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const controlsHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const posterHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const MODAL_CONTROLS_HIDE_MS = 3000
  const { isMobile } = useWindowResize()
  const isSmall = size === 'small'

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = '/static/promo.mp3'
      audioRef.current.loop = true
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current || isMobile) return
    if (isPlaying && !isMuted) {
      audioRef.current.volume = volume
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, isMuted, volume, isMobile])

  useEffect(() => {
    if (!isPlayerOpen) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen?.()
        } else {
          setIsFullscreen(false)
          setIsPlayerOpen(false)
        }
      }
    }
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isPlayerOpen])

  const scheduleControlsHide = useCallback(() => {
    if (controlsHideTimeoutRef.current) clearTimeout(controlsHideTimeoutRef.current)
    controlsHideTimeoutRef.current = setTimeout(() => {
      setModalControlsVisible(false)
      controlsHideTimeoutRef.current = null
    }, MODAL_CONTROLS_HIDE_MS)
  }, [])

  const handleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  const handleOpenModal = useCallback(() => {
    trackClick('hero_video_open')
    setIsFullscreen(false)
    setIsPlayerOpen(true)
    setPosterControlsVisible(false)
    if (posterHideTimeoutRef.current) {
      clearTimeout(posterHideTimeoutRef.current)
      posterHideTimeoutRef.current = null
    }
    setModalControlsVisible(true)
    scheduleControlsHide()
  }, [scheduleControlsHide])

  const handleCloseModal = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.()
    }
    setIsFullscreen(false)
    setIsPlayerOpen(false)
  }, [])

  const handleSeekBack = useCallback(() => {
    const step = SeekStepHelper.getSeekStepSeconds(duration)
    const t = Math.max(0, currentTime - step)
    singlePlayerRef.current?.seekTo(t, 'seconds')
    setCurrentTime(t)
  }, [duration, currentTime])

  const handleSeekForward = useCallback(() => {
    const step = SeekStepHelper.getSeekStepSeconds(duration)
    const t = Math.min(duration, currentTime + step)
    singlePlayerRef.current?.seekTo(t, 'seconds')
    setCurrentTime(t)
  }, [duration, currentTime])

  const showModalControls = useCallback(() => {
    setModalControlsVisible(true)
    scheduleControlsHide()
  }, [scheduleControlsHide])

  const schedulePosterControlsHide = useCallback(() => {
    if (posterHideTimeoutRef.current) clearTimeout(posterHideTimeoutRef.current)
    posterHideTimeoutRef.current = setTimeout(() => {
      setPosterControlsVisible(false)
      posterHideTimeoutRef.current = null
    }, MODAL_CONTROLS_HIDE_MS)
  }, [])

  const showPosterControls = useCallback(() => {
    setPosterControlsVisible(true)
    schedulePosterControlsHide()
  }, [schedulePosterControlsHide])

  const handleFullscreenToggle = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.()
    } else {
      videoWrapperRef.current?.requestFullscreen?.()
    }
    showModalControls()
  }, [showModalControls])

  const handleVideoAreaClick = useCallback(() => {
    setIsPlaying((p) => !p)
    setShowPlayPauseOverlay(true)
    showModalControls()
    if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current)
    overlayTimeoutRef.current = setTimeout(() => {
      setShowPlayPauseOverlay(false)
      overlayTimeoutRef.current = null
    }, 800)
  }, [showModalControls])

  useEffect(() => {
    return () => {
      if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current)
      if (controlsHideTimeoutRef.current) clearTimeout(controlsHideTimeoutRef.current)
      if (posterHideTimeoutRef.current) clearTimeout(posterHideTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isPlayerOpen && controlsHideTimeoutRef.current) {
      clearTimeout(controlsHideTimeoutRef.current)
      controlsHideTimeoutRef.current = null
    }
  }, [isPlayerOpen])

  useEffect(() => {
    if (!isPlaying || isDraggingProgressBar) return
    const id = setInterval(() => {
      const t = singlePlayerRef.current?.getCurrentTime()
      if (typeof t === 'number') setCurrentTime(t)
    }, 100)
    return () => clearInterval(id)
  }, [isPlaying, isDraggingProgressBar])

  const handleWrapperClick = useCallback(() => {
    setIsPlaying((p) => !p)
  }, [])

  const containerClassName = isSmall
    ? 'h-[15.125rem] w-full rounded-[0.625rem] overflow-hidden'
    : 'h-[22.4375rem] w-full rounded-[0.625rem] max-[768px]:h-[233px] overflow-hidden'

  const videoWrapperStyle: React.CSSProperties = isPlayerOpen
    ? isFullscreen
      ? {
          position: 'fixed',
          inset: 0,
          zIndex: 10001,
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
        }
      : {
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(90vw, 1130px)',
          maxWidth: 1130,
          maxHeight: 'calc(100vh - 3rem)',
          aspectRatio: MODAL_VIDEO_ASPECT_RATIO,
          zIndex: 10001,
          backgroundColor: '#000',
        }
    : {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }

  return (
    <>
      <div
        className={isSmall
          ? 'my-[2.4rem] mb-[-0.2rem] relative w-full'
          : 'mt-[2.6rem] relative w-full'
        }
        style={isPlayerOpen ? { position: 'relative', zIndex: 10001, pointerEvents: 'none' } : undefined}
        onMouseMove={isPlayerOpen ? undefined : showPosterControls}
        onMouseEnter={isPlayerOpen ? undefined : showPosterControls}
        onMouseLeave={isPlayerOpen ? undefined : () => setPosterControlsVisible(false)}
      >
        <div
          className={`relative ${containerClassName}`}
          style={{ cursor: 'pointer' }}
          onClick={handleWrapperClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleWrapperClick()
          }}
        >
          <div aria-hidden className="w-full h-full min-h-full" />
          <div
            ref={videoWrapperRef}
            className={`overflow-hidden rounded-[0.625rem] [&_video]:!object-cover ${isPlayerOpen ? 'relative pointer-events-auto' : 'relative [&>div]:!w-full [&>div]:!h-full'}`}
            style={videoWrapperStyle}
            onClick={isPlayerOpen ? (e) => e.stopPropagation() : undefined}
          >
            <div className={isPlayerOpen ? 'absolute inset-0 [&>div]:!w-full [&>div]:!h-full' : ''}>
              <ReactPlayer
                ref={singlePlayerRef}
                url={VIDEO_URL}
                playing={isPlaying}
                muted={isMobile ? isMuted : true}
                volume={isMobile ? volume : 0}
                loop
                controls={false}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                onReady={() => setVideoLoaded(true)}
                onProgress={({ playedSeconds }) => {
                  if (!isDraggingRef.current) setCurrentTime(playedSeconds)
                }}
                onDuration={setDuration}
                config={{
                  file: {
                    attributes: {
                      poster: POSTER_URL,
                    },
                  },
                }}
              />
              {isPlayerOpen && (
                <>
                  <button
                    type="button"
                    className={`absolute z-30 flex items-center justify-center text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white/50 rounded transition-opacity duration-500 ease-out ${isFullscreen || !modalControlsVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${isRtl ? 'right-4' : 'left-4'}`}
                    style={{ top: 32, width: 24, height: 24 }}
                    onClick={handleCloseModal}
                    aria-label="Close"
                  >
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="absolute inset-0 z-20 cursor-pointer border-0 bg-transparent p-0"
                    onClick={handleVideoAreaClick}
                    onMouseMove={showModalControls}
                    onMouseEnter={showModalControls}
                    onTouchStart={showModalControls}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                  {showPlayPauseOverlay && (
                    <div
                      className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                      aria-hidden
                    >
                      <span className="flex items-center justify-center w-20 h-20 rounded-full bg-black/50 text-white transition-opacity duration-150">
                        {isPlaying ? (
                          <svg width={48} height={48} viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          </svg>
                        ) : (
                          <svg width={48} height={48} viewBox="0 0 24 24" fill="currentColor" className="shrink-0 ml-1">
                            <path d="M8 5v14l11-7L8 5z" />
                          </svg>
                        )}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
            {isPlayerOpen && (
              <div
                className={`absolute bottom-0 left-0 right-0 z-30 w-full transition-opacity duration-500 ease-out ${modalControlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onMouseMove={showModalControls}
                onMouseEnter={showModalControls}
              >
                <VideoControlBar
                  isPlaying={isPlaying}
                  onPlayPause={() => setIsPlaying((p) => !p)}
                  onSeekBack={handleSeekBack}
                  onSeekForward={handleSeekForward}
                  isMuted={isMuted}
                  volume={volume}
                  onMuteToggle={() => setIsMuted((m) => !m)}
                  onVolumeChange={(v) => {
                    setVolume(v)
                    setIsMuted(v === 0)
                  }}
                  currentTime={currentTime}
                  duration={duration}
                  onSeek={(fraction) => {
                    const t = fraction * duration
                    singlePlayerRef.current?.seekTo(fraction, 'fraction')
                    setCurrentTime(t)
                  }}
                  onFullscreen={handleFullscreenToggle}
                  onProgressDragStart={() => {
                    isDraggingRef.current = true
                    wasPlayingBeforeDragRef.current = isPlaying
                    setIsPlaying(false)
                    setIsDraggingProgressBar(true)
                  }}
                  onProgressDragEnd={() => {
                    isDraggingRef.current = false
                    setIsDraggingProgressBar(false)
                    if (wasPlayingBeforeDragRef.current) setIsPlaying(true)
                  }}
                  compact={false}
                  centerControls={false}
                  dir={isRtl ? 'rtl' : 'ltr'}
                  isFullscreen={isFullscreen}
                />
              </div>
            )}
          </div>
        </div>

        <div className={`${isPlayerOpen ? 'hidden' : ''} ${isSmall
          ? 'flex justify-between absolute top-0 w-full h-full rounded-[0.625rem] px-6 pl-[3.75rem] items-center max-[768px]:flex-col max-[768px]:justify-center max-[768px]:p-2.5 pointer-events-none'
          : 'flex justify-between absolute top-0 w-full h-full rounded-[0.625rem] px-11 items-center max-[768px]:flex-col max-[768px]:justify-center max-[768px]:px-4 pointer-events-none'
        }`}>
          {isMobile && !videoLoaded && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 text-white py-4 px-6 rounded-xl text-base font-semibold z-10 text-center">
              Tap to start video
            </div>
          )}

          <div className={isSmall
            ? 'flex flex-col gap-1 items-start h-[11.5rem] justify-center max-[768px]:mt-8 max-[768px]:items-center'
            : 'flex flex-col gap-2 items-start -mt-2 max-[768px]:mt-2 max-[768px]:items-center'
          }>
            <h2 className={isSmall
              ? 'text-5xl font-normal leading-normal w-[37.25rem] text-textTheme-primary max-[768px]:text-[1.9375rem] max-[768px]:text-center max-[768px]:w-full'
              : 'text-[4rem] font-medium leading-normal uppercase text-textTheme-primary max-[768px]:text-[1.75rem] max-[768px]:normal-case max-[768px]:text-center'
            }>
              {title}
            </h2>
            <p className="text-[1.9375rem] font-normal text-accent-primary max-[768px]:text-[1.25rem] max-[768px]:text-center">
              {subtitle}
            </p>
            <span className={isSmall
              ? 'text-[1.125rem] font-normal opacity-90 text-textTheme-primary whitespace-pre-line max-[768px]:text-center'
              : 'text-[1.25rem] font-normal opacity-90 text-textTheme-primary whitespace-pre-line max-[768px]:text-[0.875rem] max-[768px]:text-center'
            }>
              {text}
            </span>
          </div>

          <div className={`pointer-events-auto ${isSmall
            ? 'flex flex-col justify-between h-[11.5rem] items-center max-[768px]:flex-row max-[768px]:w-full'
            : 'flex flex-col justify-between h-[17.8125rem] items-center max-[768px]:flex-row max-[768px]:w-full'
          }`}
          >
            <button onClick={handleOpenModal} className="cursor-pointer" aria-label="Open video player">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M20 4H28V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 28H4V20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M28 4L19 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 28L13 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <SoundButton isMuted={isMuted} onClick={handleMute} />
          </div>
        </div>

        {!isPlayerOpen && (
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-[50%] transition-opacity duration-300 ease-out ${posterControlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onMouseMove={showPosterControls}
            onMouseEnter={showPosterControls}
            onClick={(e) => e.stopPropagation()}
          >
            <VideoControlBar
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying((p) => !p)}
              onSeekBack={handleSeekBack}
              onSeekForward={handleSeekForward}
              isMuted={isMuted}
              volume={volume}
              onMuteToggle={() => setIsMuted((m) => !m)}
              onVolumeChange={(v) => {
                setVolume(v)
                setIsMuted(v === 0)
              }}
              currentTime={currentTime}
              duration={duration}
              onSeek={(fraction) => {
                const t = fraction * duration
                singlePlayerRef.current?.seekTo(fraction, 'fraction')
                setCurrentTime(t)
              }}
              onFullscreen={handleOpenModal}
              onProgressDragStart={() => {
                isDraggingRef.current = true
                wasPlayingBeforeDragRef.current = isPlaying
                setIsPlaying(false)
                setIsDraggingProgressBar(true)
              }}
              onProgressDragEnd={() => {
                isDraggingRef.current = false
                setIsDraggingProgressBar(false)
                if (wasPlayingBeforeDragRef.current) setIsPlaying(true)
              }}
              order={['progress', 'seekBack', 'playPause', 'seekForward', 'mute', 'volume', 'time']}
              compact={false}
              centerControls
              dir={isRtl ? 'rtl' : 'ltr'}
              isFullscreen={false}
            />
          </div>
        )}

        {!isMobile && (
          <audio loop preload="none" ref={audioRef} />
        )}
      </div>

      {isPlayerOpen && (
        <div
          className="fixed inset-0 bg-black z-[10000]"
          onClick={handleCloseModal}
          aria-hidden
        />
      )}
    </>
  )
}

export default VideoPoster
