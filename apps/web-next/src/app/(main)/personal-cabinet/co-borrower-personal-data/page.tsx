'use client';

import React from 'react';
import PersonalCabinetSection from '@/components/ui/PersonalCabinetSection/PersonalCabinetSection';

const CoBorrowerPersonalData: React.FC = () => {
  return (
    <PersonalCabinetSection
      titleKey="co_borrower_personal_data"
      descriptionKey="co_borrower_description"
    />
  );
};

export default CoBorrowerPersonalData;
