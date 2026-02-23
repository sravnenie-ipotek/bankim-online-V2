'use client';

import React from 'react';
import PersonalCabinetSection from '@/components/ui/PersonalCabinetSection/PersonalCabinetSection';

const PartnerPersonalData: React.FC = () => {
  return (
    <PersonalCabinetSection
      titleKey="partner_personal_data"
      descriptionKey="partner_data_description"
    />
  );
};

export default PartnerPersonalData;
