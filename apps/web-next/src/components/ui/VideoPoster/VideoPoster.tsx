'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { useWindowResize } from '@/hooks/useWindowResize';
import { trackClick } from '@/helpers/analytics';
import type { VideoPosterProps } from './interfaces/VideoPosterProps';
import type { VideoControlBarProps } from './interfaces/VideoControlBarProps';
import type { ReactPlayerRef } from 'react-player';
import VideoControlBar from './VideoControlBar';
import PosterOverlay from './components/PosterOverlay/PosterOverlay';
import { SeekStepHelper } from './helpers/SeekStepHelper';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const VIDEO_URL = '/static/promo.mp4';
const POSTER_URL = '/static/Background.png';
const MODAL_VIDEO_ASPECT_RATIO = 1130 / 636;

const VideoPoster: React.FC<VideoPosterProps> = ({ title, subtitle, text, size = 'normal', autoPlay = true, showControls = false }) => {
  const { i18n } = useTranslation();
  const isRtl = (i18n.language || 'he') === 'he';
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const singlePlayerRef = useRef<ReactPlayerRef>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlayPauseOverlay, setShowPlayPauseOverlay] = useState(false);
  const [modalControlsVisible, setModalControlsVisible] = useState(true);
  const [posterControlsVisible, setPosterControlsVisible] = useState(false);
  const [isDraggingProgressBar, setIsDraggingProgressBar] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isDraggingRef = useRef(false);
  const wasPlayingBeforeDragRef = useRef(false);
  const overlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controlsHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const posterHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const MODAL_CONTROLS_HIDE_MS = 3000;
  const { isMobile } = useWindowResize();
  const isSmall = size === 'small';

  // Sound is from static file /static/promo.mp3 (plays on all devices, no isMobile flag).
  useEffect(() => {
    const el = audioRef.current;
    if (el) {
      el.src = '/static/promo.mp3';
      el.loop = true;
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying && !isMuted) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, isMuted, volume]);

  useEffect(() => {
    if (!isPlayerOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen?.();
        } else {
          setIsFullscreen(false);
          setIsPlayerOpen(false);
        }
      }
    };
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isPlayerOpen]);

  const scheduleControlsHide = useCallback(() => {
    if (controlsHideTimeoutRef.current) clearTimeout(controlsHideTimeoutRef.current);
    controlsHideTimeoutRef.current = setTimeout(() => {
      setModalControlsVisible(false);
      controlsHideTimeoutRef.current = null;
    }, MODAL_CONTROLS_HIDE_MS);
  }, []);

  const handleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleOpenModal = useCallback(() => {
    trackClick('hero_video_open');
    setIsFullscreen(false);
    setIsPlayerOpen(true);
    setPosterControlsVisible(false);
    if (posterHideTimeoutRef.current) {
      clearTimeout(posterHideTimeoutRef.current);
      posterHideTimeoutRef.current = null;
    }
    setModalControlsVisible(true);
    scheduleControlsHide();
  }, [scheduleControlsHide]);

  const handleCloseModal = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    }
    setIsFullscreen(false);
    setIsPlayerOpen(false);
  }, []);

  const handleSeekBack = useCallback(() => {
    const step = SeekStepHelper.getSeekStepSeconds(duration);
    const t = Math.max(0, currentTime - step);
    singlePlayerRef.current?.seekTo(t, 'seconds');
    setCurrentTime(t);
  }, [duration, currentTime]);

  const handleSeekForward = useCallback(() => {
    const step = SeekStepHelper.getSeekStepSeconds(duration);
    const t = Math.min(duration, currentTime + step);
    singlePlayerRef.current?.seekTo(t, 'seconds');
    setCurrentTime(t);
  }, [duration, currentTime]);

  const showModalControls = useCallback(() => {
    setModalControlsVisible(true);
    scheduleControlsHide();
  }, [scheduleControlsHide]);

  const schedulePosterControlsHide = useCallback(() => {
    if (posterHideTimeoutRef.current) clearTimeout(posterHideTimeoutRef.current);
    posterHideTimeoutRef.current = setTimeout(() => {
      setPosterControlsVisible(false);
      posterHideTimeoutRef.current = null;
    }, MODAL_CONTROLS_HIDE_MS);
  }, []);

  const showPosterControls = useCallback(() => {
    setPosterControlsVisible(true);
    schedulePosterControlsHide();
  }, [schedulePosterControlsHide]);

  const handleFullscreenToggle = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      videoWrapperRef.current?.requestFullscreen?.();
    }
    showModalControls();
  }, [showModalControls]);

  const handleVideoAreaClick = useCallback(() => {
    setIsPlaying((p) => !p);
    setShowPlayPauseOverlay(true);
    showModalControls();
    if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);
    overlayTimeoutRef.current = setTimeout(() => {
      setShowPlayPauseOverlay(false);
      overlayTimeoutRef.current = null;
    }, 800);
  }, [showModalControls]);

  useEffect(() => {
    return () => {
      if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);
      if (controlsHideTimeoutRef.current) clearTimeout(controlsHideTimeoutRef.current);
      if (posterHideTimeoutRef.current) clearTimeout(posterHideTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isPlayerOpen && controlsHideTimeoutRef.current) {
      clearTimeout(controlsHideTimeoutRef.current);
      controlsHideTimeoutRef.current = null;
    }
  }, [isPlayerOpen]);

  useEffect(() => {
    if (!isPlaying || isDraggingProgressBar) return;
    const id = setInterval(() => {
      const t = singlePlayerRef.current?.getCurrentTime();
      if (typeof t === 'number') setCurrentTime(t);
    }, 100);
    return () => clearInterval(id);
  }, [isPlaying, isDraggingProgressBar]);

  const handleWrapperClick = useCallback(() => {
    setIsPlaying((p) => !p);
    showPosterControls();
  }, [showPosterControls]);

  const containerClassName = isSmall
    ? 'h-[15.125rem] w-full rounded-[0.625rem] overflow-hidden'
    : 'h-[22.4375rem] w-full rounded-[0.625rem] max-[768px]:h-[233px] overflow-hidden sm:h-[233px] md:h-[22.4375rem]';

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
      };

  return (
    <>
      <div
        className={
          isSmall
            ? 'mt-[2px] max-sm:mb-0 sm:my-[2.4rem] sm:mb-[-0.2rem] relative w-full px-0 sm:px-5 md:px-0 max-w-full md:max-w-[1024px] lg:max-w-[1130px] xl:max-w-[1507px] mx-auto rtl:ms-auto'
            : 'mt-[2px] sm:mt-[2.6rem] relative w-full px-0 sm:px-5 md:px-0 max-w-full md:max-w-[1024px] lg:max-w-[1130px] xl:max-w-[1507px] mx-auto rtl:ms-auto'
        }
        style={
          isPlayerOpen ? { position: 'relative', zIndex: 10001, pointerEvents: 'none' } : undefined
        }
        onMouseMove={isPlayerOpen ? undefined : showPosterControls}
        onMouseEnter={isPlayerOpen ? undefined : showPosterControls}
        onMouseLeave={isPlayerOpen ? undefined : () => setPosterControlsVisible(false)}
        onTouchStart={isPlayerOpen ? undefined : showPosterControls}
      >
        <div
          className={`relative ${containerClassName}`}
          style={{ cursor: 'pointer' }}
          onClick={handleWrapperClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleWrapperClick();
          }}
        >
          <div aria-hidden className="w-full h-full min-h-full" />
          {!isPlaying && !isPlayerOpen && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none" aria-hidden>
              <svg width="55" height="54" viewBox="0 0 55 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.5 5.0625C23.1612 5.0625 18.9198 6.34911 15.3122 8.75964C11.7046 11.1702 8.8928 14.5963 7.2324 18.6049C5.57201 22.6134 5.13757 27.0243 5.98403 31.2798C6.8305 35.5353 8.91984 39.4441 11.9879 42.5122C15.0559 45.5802 18.9648 47.6695 23.2202 48.516C27.4757 49.3624 31.8866 48.928 35.8951 47.2676C39.9037 45.6072 43.3298 42.7954 45.7404 39.1878C48.1509 35.5802 49.4375 31.3388 49.4375 27C49.4303 21.184 47.1167 15.6084 43.0041 11.4959C38.8916 7.38335 33.316 5.06976 27.5 5.0625ZM35.1866 28.4048L25.0616 35.1548C24.7839 35.3389 24.4582 35.4372 24.125 35.4375C23.6775 35.4375 23.2482 35.2597 22.9318 34.9432C22.6153 34.6268 22.4375 34.1976 22.4375 33.75V20.25C22.4373 19.9444 22.5201 19.6445 22.677 19.3823C22.8339 19.1201 23.0591 18.9054 23.3285 18.7612C23.5979 18.617 23.9014 18.5486 24.2067 18.5634C24.5119 18.5782 24.8074 18.6756 25.0616 18.8452L35.1866 25.5952C35.418 25.7492 35.6079 25.958 35.7392 26.2031C35.8705 26.4482 35.9392 26.722 35.9392 27C35.9392 27.278 35.8705 27.5518 35.7392 27.7969C35.6079 28.042 35.418 28.2508 35.1866 28.4048Z" fill="white"/>
              </svg>
            </div>
          )}
          <div
            ref={videoWrapperRef}
            {...(isPlayerOpen && {
              role: 'dialog',
              'aria-modal': true,
              'aria-label': 'Video player',
            })}
            className={`overflow-hidden rounded-[0.625rem] [&_video]:!object-cover ${isPlayerOpen ? 'relative pointer-events-auto' : 'relative [&>div]:!w-full [&>div]:!h-full'}`}
            style={videoWrapperStyle}
            onClick={isPlayerOpen ? (e) => e.stopPropagation() : undefined}
          >
            <div className={isPlayerOpen ? 'absolute inset-0 [&>div]:!w-full [&>div]:!h-full' : ''}>
              <ReactPlayer
                ref={singlePlayerRef}
                url={VIDEO_URL}
                playing={isPlaying}
                muted
                volume={0}
                loop
                controls={false}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                onReady={() => setVideoLoaded(true)}
                onProgress={({ playedSeconds }) => {
                  if (!isDraggingRef.current) setCurrentTime(playedSeconds);
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
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
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
                          <svg
                            width={48}
                            height={48}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="shrink-0"
                          >
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          </svg>
                        ) : (
                          <svg
                            width={48}
                            height={48}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="shrink-0 ml-1"
                          >
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
                  config={{
                    isPlaying,
                    onPlayPause: () => setIsPlaying((p) => !p),
                    onSeekBack: handleSeekBack,
                    onSeekForward: handleSeekForward,
                    isMuted,
                    volume,
                    onMuteToggle: () => setIsMuted((m) => !m),
                    onVolumeChange: (v) => {
                      setVolume(v);
                      setIsMuted(v === 0);
                    },
                    currentTime,
                    duration,
                    onSeek: (fraction) => {
                      const t = fraction * duration;
                      singlePlayerRef.current?.seekTo(fraction, 'fraction');
                      setCurrentTime(t);
                    },
                    onFullscreen: handleFullscreenToggle,
                    onProgressDragStart: () => {
                      isDraggingRef.current = true;
                      wasPlayingBeforeDragRef.current = isPlaying;
                      setIsPlaying(false);
                      setIsDraggingProgressBar(true);
                    },
                    onProgressDragEnd: () => {
                      isDraggingRef.current = false;
                      setIsDraggingProgressBar(false);
                      if (wasPlayingBeforeDragRef.current) setIsPlaying(true);
                    },
                    compact: false,
                    centerControls: false,
                    dir: isRtl ? 'rtl' : 'ltr',
                    isFullscreen,
                  } as VideoControlBarProps}
                />
              </div>
            )}
          </div>
        </div>

        <PosterOverlay
          title={title ?? ''}
          subtitle={subtitle ?? ''}
          text={text ?? ''}
          isSmall={isSmall}
          isMobile={isMobile}
          videoLoaded={videoLoaded}
          isPlayerOpen={isPlayerOpen}
          onOpenVideo={handleOpenModal}
          onMuteToggle={handleMute}
          isMuted={isMuted}
        />

        {!isPlayerOpen && isPlaying && (
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 z-30 max-w-full block transition-opacity duration-300 ease-out ${isSmall ? 'w-full' : 'w-full sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[50%]'} ${showControls || posterControlsVisible || isMobile ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onMouseMove={showPosterControls}
            onMouseEnter={showPosterControls}
            onTouchStart={showPosterControls}
            onClick={(e) => e.stopPropagation()}
          >
            <VideoControlBar
              config={{
                isPlaying,
                onPlayPause: () => setIsPlaying((p) => !p),
                onSeekBack: handleSeekBack,
                onSeekForward: handleSeekForward,
                isMuted,
                volume,
                onMuteToggle: () => setIsMuted((m) => !m),
                onVolumeChange: (v) => {
                  setVolume(v);
                  setIsMuted(v === 0);
                },
                currentTime,
                duration,
                onSeek: (fraction) => {
                  const t = fraction * duration;
                  singlePlayerRef.current?.seekTo(fraction, 'fraction');
                  setCurrentTime(t);
                },
                onFullscreen: handleOpenModal,
                onProgressDragStart: () => {
                  isDraggingRef.current = true;
                  wasPlayingBeforeDragRef.current = isPlaying;
                  setIsPlaying(false);
                  setIsDraggingProgressBar(true);
                },
                onProgressDragEnd: () => {
                  isDraggingRef.current = false;
                  setIsDraggingProgressBar(false);
                  if (wasPlayingBeforeDragRef.current) setIsPlaying(true);
                },
                order: [
                  'progress',
                  'seekBack',
                  'playPause',
                  'seekForward',
                  'mute',
                  'volume',
                  'time',
                  'fullscreen',
                ],
                compact: false,
                centerControls: true,
                dir: isRtl ? 'rtl' : 'ltr',
                isFullscreen: false,
              } as VideoControlBarProps}
            />
          </div>
        )}

        <audio loop preload="none" ref={audioRef} />
      </div>

      {isPlayerOpen && (
        <div
          className="fixed inset-0 bg-black z-modal"
          onClick={handleCloseModal}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default VideoPoster;
