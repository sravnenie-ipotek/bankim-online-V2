'use client';

import React, { useCallback } from 'react';
import { ContactTitle } from '../ContactTitle';
import { ContactsTabs } from './components/ContactsTabs';
import type { ContactTitleWithContactsProps } from './interfaces/ContactTitleWithContactsProps';
import { ContactSocial } from '@/components/ui/ContactSocial';

const SECTION_ID_PREFIX = 'contact-section-';

/** Container width; min-height for multiple sections */
const CONTAINER_SIZE_CLASS =
  'w-[clamp(280px,78.47vw,1507px)] min-h-0';

/** Gap between title and contacts (buttons + sections): 20px at 1440 → 28px at 1920 */
const GAP_CLASS = 'gap-[clamp(16px,1.389vw,28px)]';

const DETAILS_PANEL_CLASS =
  'w-full rounded-[clamp(12px,1.111vw,20px)] border border-base-stroke bg-base-base800 p-[clamp(20px,2.222vw,32px)]';
const SECTION_TITLE_CLASS =
  'text-[clamp(16px,1.389vw,24px)] font-semibold text-textTheme-primary text-left rtl:text-right';

const scrollToSection = (id: string): void => {
  const el = document.getElementById(`${SECTION_ID_PREFIX}${id}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    (el as HTMLElement).focus({ preventScroll: true });
  }
};

const ContactTitleWithContacts: React.FC<ContactTitleWithContactsProps> = ({
  title,
  contacts,
  direction,
}) => {
  const handleSelect = useCallback((id: string) => {
    scrollToSection(id);
  }, []);

  return (
    <div
      dir={direction}
      className={`flex flex-col ${CONTAINER_SIZE_CLASS} ${GAP_CLASS} w-full max-w-full box-border`}
    >
      {title != null && title !== '' ? <ContactTitle text={title} /> : null}
      <div className="flex flex-col w-full gap-[clamp(32px,4.444vw,64px)]">
        <ContactsTabs
          contacts={contacts}
          direction={direction}
          onSelect={handleSelect}
        />

        {contacts.map((contact) => (
          <section
            key={contact.id}
            id={`${SECTION_ID_PREFIX}${contact.id}`}
            tabIndex={-1}
            className="flex flex-col gap-[clamp(12px,1.111vw,20px)] scroll-mt-[clamp(16px,1.389vw,28px)]"
            aria-label={contact.label}
          >
            <h3 className={SECTION_TITLE_CLASS}>{contact.label}</h3>
            {contact.cards != null && contact.cards.length > 0 ? (
              contact.id === 'cooperation' && contact.cards.length > 2 ? (
                <div className="flex flex-col gap-[clamp(12px,1.111vw,20px)]">
                  <div className="flex flex-row flex-wrap gap-[clamp(12px,1.111vw,20px)]">
                    {contact.cards.slice(0, 2).map((card, cardIndex) => (
                      <div key={`${contact.id}-card-${cardIndex}`} className={`${DETAILS_PANEL_CLASS} flex-1 min-w-[clamp(200px,30%,320px)]`}>
                        <p className="text-[clamp(14px,1.111vw,16px)] font-semibold text-textTheme-primary mb-[clamp(12px,1.111vw,20px)]">
                          {card.label}
                        </p>
                        <ContactSocial
                          address=""
                          phone={card.phone}
                          email={card.email}
                          whatsapp={card.whatsapp}
                          direction="column"
                          variant="card"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row flex-wrap gap-[clamp(12px,1.111vw,20px)]">
                    {contact.cards.slice(2).map((card, cardIndex) => (
                      <div key={`${contact.id}-card-${cardIndex + 2}`} className={`${DETAILS_PANEL_CLASS} flex-1 min-w-[clamp(200px,30%,320px)]`}>
                        <p className="text-[clamp(14px,1.111vw,16px)] font-semibold text-textTheme-primary mb-[clamp(12px,1.111vw,20px)]">
                          {card.label}
                        </p>
                        <ContactSocial
                          address=""
                          phone={card.phone}
                          email={card.email}
                          whatsapp={card.whatsapp}
                          direction="column"
                          variant="card"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-row flex-wrap gap-[clamp(12px,1.111vw,20px)]">
                  {contact.cards.map((card, cardIndex) => (
                    <div key={`${contact.id}-card-${cardIndex}`} className={`${DETAILS_PANEL_CLASS} flex-1 min-w-[clamp(200px,30%,320px)]`}>
                      <p className="text-[clamp(14px,1.111vw,16px)] font-semibold text-textTheme-primary mb-[clamp(12px,1.111vw,20px)]">
                        {card.label}
                      </p>
                      <ContactSocial
                        address=""
                        phone={card.phone}
                        email={card.email}
                        whatsapp={card.whatsapp}
                        direction="column"
                        variant="card"
                      />
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className={DETAILS_PANEL_CLASS}>
                <div className="mt-[clamp(12px,1.111vw,20px)]">
                  <ContactSocial
                    address=""
                    phone={contact.phone}
                    email={contact.email}
                    whatsapp={contact.whatsapp}
                    direction="column"
                    variant="card"
                  />
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default ContactTitleWithContacts;
