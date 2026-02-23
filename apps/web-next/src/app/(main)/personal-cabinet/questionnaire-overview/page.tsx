'use client';

import React from 'react';
import PersonalCabinetSection from '@/components/ui/PersonalCabinetSection/PersonalCabinetSection';

const QuestionnaireOverview: React.FC = () => {
  return (
    <PersonalCabinetSection
      titleKey="questionnaire_overview"
      descriptionKey="questionnaire_overview_description"
    />
  );
};

export default QuestionnaireOverview;
