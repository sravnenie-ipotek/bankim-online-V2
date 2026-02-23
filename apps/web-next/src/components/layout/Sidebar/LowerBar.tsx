'use client';

import React from 'react';

const SOCIAL_ITEMS = [
  {
    href: 'https://www.instagram.com/bankimonline',
    icon: '/static/instagram.svg',
    label: 'Instagram',
  },
  { href: 'https://www.youtube.com/@bankimonline', icon: '/static/youtube.svg', label: 'YouTube' },
  {
    href: 'https://www.facebook.com/bankimonline',
    icon: '/static/facebook.svg',
    label: 'Facebook',
  },
  { href: 'https://twitter.com/bankimonline', icon: '/static/twitter.svg', label: 'Twitter' },
] as const;

interface LowerBarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const LowerBar: React.FC<LowerBarProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="w-full max-w-[1240px] h-[81px] bg-[#242529] flex flex-row items-center justify-between px-6 shrink-0 xl:w-sidebar-fluid">
      <div className="flex flex-row items-center gap-4">
        <button
          type="button"
          onClick={onToggle}
          className="w-[32px] h-[32px] flex items-center justify-center text-white shrink-0"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`relative inline-block w-6 h-6 text-white
              before:content-[''] before:absolute before:left-0 before:top-0 before:w-0.5 before:h-full before:bg-white
              after:content-[''] after:absolute after:right-0 after:top-0 after:w-0.5 after:h-full after:bg-white
              ${isOpen ? '[&>span]:rotate-45 before:invisible before:opacity-0 before:rotate-45 after:-rotate-45 after:right-1.5' : ''}`}
          >
            <span className="absolute left-1/2 top-0 w-0.5 h-full bg-white -translate-x-1/2 transition-transform duration-300" />
          </span>
        </button>
        <div className="flex flex-row items-center gap-4">
          {SOCIAL_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="opacity-50 hover:opacity-100 transition-opacity w-[32px] h-[32px] flex items-center justify-center shrink-0"
            >
              <img alt={item.label} src={item.icon} width={32} height={32} className="w-8 h-8" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LowerBar;
