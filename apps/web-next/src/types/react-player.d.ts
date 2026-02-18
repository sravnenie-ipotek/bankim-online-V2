declare module 'react-player' {
  import type { CSSProperties, ReactElement, ReactNode } from 'react'

  export interface OnProgressProps {
    played: number
    playedSeconds: number
    loaded: number
    loadedSeconds: number
  }

  export interface ReactPlayerProps {
    url?: string | string[] | { src: string; type?: string }[] | MediaStream
    playing?: boolean
    loop?: boolean
    controls?: boolean
    volume?: number
    muted?: boolean
    playbackRate?: number
    width?: string | number
    height?: string | number
    style?: CSSProperties
    light?: boolean | string | ReactElement
    onReady?: () => void
    onPlay?: () => void
    onPause?: () => void
    onEnded?: () => void
    onError?: (error: unknown) => void
    onProgress?: (state: OnProgressProps) => void
    onDuration?: (duration: number) => void
    config?: {
      file?: {
        attributes?: Record<string, unknown>
      }
    }
    [key: string]: unknown
  }

  export interface ReactPlayerRef {
    getCurrentTime(): number
    getDuration(): number
    seekTo(amount: number, type?: 'seconds' | 'fraction'): void
  }

  const ReactPlayer: React.ForwardRefExoticComponent<
    ReactPlayerProps & React.RefAttributes<ReactPlayerRef>
  >
  export default ReactPlayer
}
