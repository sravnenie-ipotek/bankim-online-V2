'use client';

import React from 'react';

/**
 * Bank employee registration success: confirmation message and link to admin login.
 */
const RegistrationSuccess: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="surface-card-p8 text-center">
        <h1 className="text-2xl font-bold text-green-400 mb-4">Registration Successful!</h1>
        <p className="text-textTheme-secondary mb-6">
          Your bank employee registration has been submitted successfully.
        </p>
        <a href="/admin/login" className="btn-primary-sm inline-block">
          Continue to Login
        </a>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
