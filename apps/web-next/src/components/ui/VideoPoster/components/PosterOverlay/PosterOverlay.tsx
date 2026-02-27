'use client';

import React from 'react';
import SoundButton from '../SoundButton';
import type { PosterOverlayProps } from './interfaces/PosterOverlayProps';

const PosterOverlay: React.FC<PosterOverlayProps> = ({
  title,
  subtitle,
  text,
  isSmall,
  isMobile,
  videoLoaded,
  isPlayerOpen,
  onOpenVideo,
  onMuteToggle,
  isMuted,
}) => (
  <div
    className={`${isPlayerOpen ? 'hidden' : ''} z-10 ${
      isSmall
        ? 'flex justify-between absolute top-0 w-full h-full rounded-[0.625rem] px-6 pl-[3.75rem] items-center max-[768px]:flex-col max-[768px]:justify-between max-[768px]:pt-4 max-xs:p-0 max-xs:pt-4 max-[768px]:p-2.5 max-[768px]:pb-20 pointer-events-none'
        : 'flex justify-center absolute top-0 w-full h-full rounded-[0.625rem] px-0 xs:px-4 sm:px-11 items-center max-[768px]:flex-col max-[768px]:justify-center max-[768px]:pt-4 max-[768px]:pb-20 pointer-events-none'
    }`}
  >
    {isMobile && !videoLoaded && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 text-white py-4 px-6 rounded-xl font-semibold z-10 text-center text-[clamp(0.875rem,0.85rem+0.25vw,1rem)]">
        Tap to start video
      </div>
    )}

    <div
      className={
        isSmall
          ? 'flex flex-col gap-1 items-start h-[11.5rem] justify-center max-[768px]:mt-0 max-[768px]:items-center'
          : 'relative flex flex-col gap-2 items-start -mt-2 max-[768px]:mt-0 max-[768px]:items-center w-[clamp(500px,78.61vw,1132px)] h-[clamp(150px,19.79vw,285px)] max-[768px]:w-full max-[768px]:h-auto'
      }
    >
      <h2
        className={
          isSmall
            ? 'font-normal leading-normal w-[37.25rem] text-textTheme-primary max-[768px]:text-center max-[768px]:w-full text-[1.75rem] sm:text-[31px] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem]'
            : 'font-medium leading-normal uppercase text-textTheme-primary max-[768px]:normal-case max-[768px]:text-center text-[1.75rem] sm:text-[31px] md:text-[2rem] lg:text-[2.5rem] xl:text-[4rem]'
        }
      >
        {title}
      </h2>
      <p className="font-normal text-accent-primary max-[768px]:text-center text-[clamp(1.25rem,1.2rem+0.5vw,1.9375rem)]">
        {subtitle}
      </p>
      <span
        className={
          isSmall
            ? 'font-normal opacity-90 text-textTheme-primary whitespace-pre-line max-[768px]:text-center text-[clamp(0.875rem,0.9rem+0.3vw,1.125rem)]'
            : 'font-normal opacity-90 text-textTheme-primary whitespace-pre-line max-[768px]:text-center text-[clamp(0.875rem,0.95rem+0.35vw,1.25rem)]'
        }
      >
        {text}
      </span>

      {!isSmall && (
        <div className="pointer-events-auto absolute flex flex-col justify-between items-center top-[5px] right-[clamp(10px,1.75vw,20px)] rtl:right-auto rtl:left-[clamp(10px,1.75vw,20px)] w-[clamp(40px,5.07vw,73px)] h-full max-[768px]:static max-[768px]:flex-row max-[768px]:justify-between max-[768px]:w-full max-[768px]:h-auto">
          <button
            type="button"
            onClick={onOpenVideo}
            className="cursor-pointer w-[clamp(20px,2.22vw,32px)] h-[clamp(20px,2.22vw,32px)] flex items-center justify-center shrink-0 p-0 border-0 bg-transparent"
            aria-label="Open video player"
          >
            <svg className="w-full h-full" viewBox="0 0 32 32" fill="none">
              <path
                d="M20 4H28V12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 28H4V20"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M28 4L19 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 28L13 19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <SoundButton isMuted={isMuted} onClick={onMuteToggle} />
        </div>
      )}
    </div>
  </div>
);

export default PosterOverlay;
