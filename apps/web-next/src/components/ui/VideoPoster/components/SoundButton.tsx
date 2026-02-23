'use client';

import React from 'react';
import Image from 'next/image';

interface SoundButtonProps {
  isMuted: boolean;
  onClick: () => void;
}

const SPEAKER_OFF_SRC = '/static/speaker-off.svg';
const SPEAKER_ON_SRC = '/static/speaker-on.svg';

const SoundButton: React.FC<SoundButtonProps> = ({ isMuted, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={isMuted ? 'Unmute' : 'Mute'}
    className="w-10 h-10 sm:w-[73px] sm:h-[73px] p-0 rounded-none border-none outline-none bg-transparent hover:opacity-90 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066cc] shrink-0"
  >
    <Image
      src={isMuted ? SPEAKER_OFF_SRC : SPEAKER_ON_SRC}
      alt=""
      width={73}
      height={73}
      className="w-full h-full object-contain"
      style={{ display: 'block', transform: 'rotate(180deg)' }}
      aria-hidden
    />
  </button>
);

export default SoundButton;
