'use client';

import React from 'react';
import Image from 'next/image';

interface SoundButtonProps {
  isMuted: boolean;
  onClick: () => void;
}

const SPEAKER_OFF_SRC = '/static/speaker-off.svg';
const SPEAKER_ON_SRC = '/static/speaker-on.svg';

const SoundButton: React.FC<SoundButtonProps> = ({ isMuted, onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isMuted ? 'Unmute' : 'Mute'}
      className="w-[clamp(40px,5.07vw,73px)] h-[clamp(40px,5.07vw,73px)] p-0 rounded-none border-none outline-none bg-transparent opacity-70 hover:opacity-90 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066cc] shrink-0 transition-opacity"
    >
      <Image
        src={isMuted ? SPEAKER_OFF_SRC : SPEAKER_ON_SRC}
        alt=""
        width={73}
        height={73}
        className="object-contain"
        style={{ display: 'block', transform: 'rotate(180deg)', width: '100%', height: '100%' }}
        aria-hidden
      />
    </button>
  );
};

export default SoundButton;
