'use client';

import React from 'react';
import { ContactTabButton } from '../../../ContactTabButton';
import type { ContactsTabsProps } from './interfaces/ContactsTabsProps';

const ContactsTabs: React.FC<ContactsTabsProps> = ({
  contacts,
  direction,
  onSelect,
}) => (
  <div className="flex flex-row flex-wrap gap-[clamp(8px,1.11vw,16px)] w-full">
    {contacts.map((entry) => (
      <div
        key={entry.id}
        className="flex-1 min-w-[clamp(180px,18.61vw,357px)]"
      >
        <ContactTabButton
          icon={entry.icon}
          text={entry.label}
          direction={direction}
          isActive={false}
          onClick={() => onSelect(entry.id)}
        />
      </div>
    ))}
  </div>
);

export default ContactsTabs;
