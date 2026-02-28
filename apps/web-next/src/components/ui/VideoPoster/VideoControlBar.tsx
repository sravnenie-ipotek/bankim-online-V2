'use client';

import React, { useRef, useState } from 'react';
import type { VideoControlBarComponentProps } from './interfaces/VideoControlBarComponentProps';
import type { VideoControlBarItemKey } from './types/VideoControlBarItemKey';
import { DEFAULT_CONTROL_ORDER } from './types/VideoControlBarItemKey';
import VideoControlBarIconButton from './components/VideoControlBarIconButton/VideoControlBarIconButton';
import VideoControlBarSlider from './components/VideoControlBarSlider/VideoControlBarSlider';
import FullscreenEnterIcon from './components/FullscreenEnterIcon';
import FullscreenExitIcon from './components/FullscreenExitIcon';
import { FormatTimeHelper } from './helpers/FormatTimeHelper';

const iconSize = (compact: boolean) => (compact ? 14 : 24);

const VideoControlBar: React.FC<VideoControlBarComponentProps> = ({ config }) => {
  const handleVolumeChange = (v: number) => {
    config.onVolumeChange(v / 100);
  };

  const progressValue =
    config.duration > 0 ? (config.currentTime / config.duration) * 100 : 0;
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [dragProgressValue, setDragProgressValue] = useState(0);
  const didNotifyDragStartRef = useRef(false);
  const progressAtGrabRef = useRef(0);

  const THUMB_GRAB_THRESHOLD = 3;

  const handleProgressChange = (v: number) => {
    if (!isDraggingProgress) {
      setIsDraggingProgress(true);
      didNotifyDragStartRef.current = true;
      progressAtGrabRef.current = progressValue;
      config.onProgressDragStart?.();
      const isGrabbingThumb = Math.abs(v - progressValue) < THUMB_GRAB_THRESHOLD;
      setDragProgressValue(isGrabbingThumb ? progressValue : v);
    } else {
      setDragProgressValue(v);
    }
  };

  const handleProgressChangeCommitted = (v: number) => {
    const isGrabbingThumb = Math.abs(v - progressAtGrabRef.current) < THUMB_GRAB_THRESHOLD;
    const seekValue = isDraggingProgress ? v : isGrabbingThumb ? progressAtGrabRef.current : v;
    config.onSeek(seekValue / 100);
    setIsDraggingProgress(false);
    if (didNotifyDragStartRef.current) {
      didNotifyDragStartRef.current = false;
      config.onProgressDragEnd?.();
    }
  };

  const order = config.order ?? DEFAULT_CONTROL_ORDER;
  const compact = config.compact ?? false;
  const size = iconSize(compact);

  const controlNodes: Record<VideoControlBarItemKey, React.ReactNode> = {
    progress: (
      <VideoControlBarSlider
        value={isDraggingProgress ? dragProgressValue : progressValue}
        min={0}
        max={100}
        step={0.01}
        onChange={handleProgressChange}
        onCommit={handleProgressChangeCommitted}
        aria-label="Video progress"
        compact={compact}
      />
    ),
    playPause: (
      <VideoControlBarIconButton
        onClick={config.onPlayPause}
        aria-label={config.isPlaying ? 'Pause' : 'Play'}
        compact={compact}
      >
        {config.isPlaying ? (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        )}
      </VideoControlBarIconButton>
    ),
    seekBack: (
      <VideoControlBarIconButton
        onClick={config.onSeekBack}
        aria-label="Seek backward"
        compact={compact}
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
        </svg>
      </VideoControlBarIconButton>
    ),
    seekForward: (
      <VideoControlBarIconButton
        onClick={config.onSeekForward}
        aria-label="Seek forward"
        compact={compact}
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
        </svg>
      </VideoControlBarIconButton>
    ),
    mute: (
      <VideoControlBarIconButton
        onClick={config.onMuteToggle}
        aria-label={config.isMuted ? 'Unmute' : 'Mute'}
        compact={compact}
      >
        {config.isMuted ? (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </VideoControlBarIconButton>
    ),
    volume: (
      <div className={compact ? '' : 'w-14 xs:w-16 sm:w-[72px] md:w-20 lg:w-20 xl:w-24 shrink-0'}>
        <VideoControlBarSlider
          value={config.isMuted ? 0 : config.volume * 100}
          min={0}
          max={100}
          onChange={handleVolumeChange}
          aria-label="Volume"
          compact={compact}
          className="shrink-0"
        />
      </div>
    ),
    time: (() => {
      const displayTime =
        isDraggingProgress && config.duration > 0
          ? (dragProgressValue / 100) * config.duration
          : config.currentTime;
      return (
        <span
          className={`text-white tabular-nums shrink-0 ${compact ? 'text-[clamp(0.5rem,0.5rem+0.3vw,0.625rem)] ms-2' : 'ms-2 xs:ms-2 sm:ms-3 md:ms-3 lg:ms-3 xl:ms-4 text-[clamp(0.75rem,0.7rem+0.25vw,1rem)]'}`}
        >
          {FormatTimeHelper.formatTime(displayTime)} /{' '}
          {FormatTimeHelper.formatTime(config.duration)}
        </span>
      );
    })(),
    fullscreen: (
      <VideoControlBarIconButton
        onClick={config.onFullscreen}
        aria-label={(config.isFullscreen ?? false) ? 'Exit fullscreen' : 'Fullscreen'}
        compact={compact}
        className="shrink-0"
      >
        {(config.isFullscreen ?? false) ? (
          <FullscreenExitIcon />
        ) : (
          <FullscreenEnterIcon />
        )}
      </VideoControlBarIconButton>
    ),
  };

  const hasProgress = order.includes('progress');
  const otherOrder = order.filter((k) => k !== 'progress');

  const progressRow = hasProgress && (
    <div
      dir="ltr"
      className={`w-full ${compact ? 'px-0.5 pt-0.5 min-h-4' : 'pt-0.5 min-h-4 xs:pt-0.5 sm:pt-1 md:min-h-4'}`}
    >
      {controlNodes.progress}
    </div>
  );

  const centerControls = config.centerControls ?? false;
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
  );

  const isFullscreen = config.isFullscreen ?? false;
  const rootPaddingClass = compact
    ? 'py-1 px-1.5'
    : isFullscreen
      ? 'px-4 py-1 sm:py-1.5 lg:py-2'
      : 'rounded-b-[0.625rem] px-2 py-1 xs:px-2 xs:py-1 sm:px-3 sm:py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-1.5 xl:px-4 xl:py-2';

  const dir = config.dir ?? 'ltr';
  return (
    <div
      className={`flex flex-col min-w-0 bg-black/60 ${compact ? 'w-[270px] rounded-lg' : 'w-full'} ${rootPaddingClass}`}
      dir={dir}
    >
      {progressRow}
      {controlsRow}
    </div>
  );
};

export default VideoControlBar;
