'use client';

import React from 'react';
import PersonalCabinetSection from '@/components/ui/PersonalCabinetSection/PersonalCabinetSection';

const MainBorrowerPersonalData: React.FC = () => {
  return (
    <PersonalCabinetSection
      titleKey="main_borrower_personal_data"
      descriptionKey="main_borrower_description"
    />
  );
};

export default MainBorrowerPersonalData;
