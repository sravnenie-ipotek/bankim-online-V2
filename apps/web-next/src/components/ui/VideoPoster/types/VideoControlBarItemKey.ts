import type { ProgressBarItemKey } from './ProgressBarItemKey';
import type { ControlBarItemKey } from './ControlBarItemKey';

export type VideoControlBarItemKey = ProgressBarItemKey | ControlBarItemKey;

export const DEFAULT_CONTROL_ORDER: VideoControlBarItemKey[] = [
  'progress',
  'seekBack',
  'playPause',
  'seekForward',
  'mute',
  'volume',
  'time',
  'fullscreen',
];
