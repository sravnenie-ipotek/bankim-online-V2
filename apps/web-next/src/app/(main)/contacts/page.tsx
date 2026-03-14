'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { CONTACT_SECTIONS } from './constants/index';
import { ContactTitleWithContacts } from './components/ContactTitleWithContacts';
import Container from '@/components/ui/Container/Container';
import { ContactSocial } from '@/components/ui/ContactSocial';
import { SocialTitleLinks } from '@/components/ui/SocialTitleLinks';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import { ContactEntriesBuilder } from './helpers/ContactEntriesBuilder';

const Contacts: React.FC = () => {
  useContentFetch('contacts');
  const { getContent } = useContentApi('contacts');
  const { getContent: getGlobalContent } = useContentApi('global_components');
  const { i18n } = useTranslation();
  const direction = i18n.language?.startsWith('he') ? 'rtl' : 'ltr';
  const contactEntries = ContactEntriesBuilder.build(CONTACT_SECTIONS, getContent);

  return (
    <Container className="max-[890px]:!pb-4">
      <div className="page-stack">
        <h1 className="top-[clamp(48px,10.97vw,158px)] text-[clamp(1.9375rem,2rem+1vw,3rem)] font-medium text-textTheme-primary">
          {getContent('contacts_title')}
        </h1>

        <div className="flex flex-col gap-[clamp(48px,7.111vh,64px)] w-full">
          {/* Contact block: Main office + address, phone, email */}
          <div className="mt-8 flex flex-col gap-[clamp(16px,2.222vw,32px)] box-border items-start rtl:items-start self-start rtl:self-start">
            <h2 className="text-[clamp(1rem,2.153vw,1.9375rem)] font-semibold text-textTheme-primary text-left rtl:text-right">
              {getContent('contacts_main_office')}
            </h2>
            <div className="w-full min-w-0">
              <ContactSocial
                getContent={getContent}
                addressKey="contacts_address"
                phoneKey="contacts_general_phone"
                emailKey="contacts_general_email"
                direction="column"
              />
            </div>
          </div>

          <ContactTitleWithContacts
            title={getContent('contact_people')}
            contacts={contactEntries}
            direction={direction}
          />

          {/* Follow us: same container pattern as Main office */}
          <div className="flex flex-col gap-[clamp(16px,2.222vw,32px)] box-border items-start rtl:items-start self-start rtl:self-start">
            <h2 className="text-[clamp(1rem,2.153vw,1.9375rem)] font-semibold text-textTheme-primary text-left rtl:text-right">
              {getGlobalContent('footer_social_follow')}
            </h2>
            <div className="w-full min-w-0">
              <SocialTitleLinks
                showTitle={false}
                getContent={getGlobalContent}
                className="items-start rtl:items-start"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contacts;