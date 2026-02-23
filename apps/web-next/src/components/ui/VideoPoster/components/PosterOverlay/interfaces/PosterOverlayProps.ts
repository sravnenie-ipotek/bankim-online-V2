export interface PosterOverlayProps {
  title: string;
  subtitle: string;
  text: string;
  isSmall: boolean;
  isMobile: boolean;
  videoLoaded: boolean;
  isPlayerOpen: boolean;
  onOpenVideo: () => void;
  onMuteToggle: () => void;
  isMuted: boolean;
}
