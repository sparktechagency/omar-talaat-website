'use client';

import TheVaultContainer from '@/components/vault/TheVaultContainer';
import React, { useState } from 'react';

const TheVault = () => {
  const [isVaultOpen, setIsVaultOpen] = useState(true);

  const handleCloseVault = () => {
    setIsVaultOpen(false);
    // Redirect to home or previous page
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-black">
      <TheVaultContainer isOpen={isVaultOpen} onClose={handleCloseVault} />
    </div>
  );
};

export default TheVault;