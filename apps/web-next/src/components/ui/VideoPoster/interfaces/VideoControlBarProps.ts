import type { VideoControlBarItemKey } from '../types/VideoControlBarItemKey';

export interface VideoControlBarProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSeekBack: () => void;
  onSeekForward: () => void;
  isMuted: boolean;
  volume: number;
  onMuteToggle: () => void;
  onVolumeChange: (volumeFraction: number) => void;
  currentTime: number;
  duration: number;
  onSeek: (fraction: number) => void;
  onFullscreen: () => void;
  onProgressDragStart?: () => void;
  onProgressDragEnd?: () => void;
  order?: VideoControlBarItemKey[];
  compact?: boolean;
  centerControls?: boolean;
  dir?: 'ltr' | 'rtl';
  isFullscreen?: boolean;
}
