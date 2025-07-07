import React from 'react';
import DoaFormModal from '@/components/doaForm/DoaFormModal';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DoaFormPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-gray-800 rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">DOA Form</h1>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">1. Acceptance of Terms</h3>
            <p className="text-gray-300">
              By accessing or using We Share Together, you agree to these Terms and Conditions. We reserve the right to update or modify
              these Terms at any time, and such changes will be effective immediately upon posting. It is your responsibility to review these
              Terms periodically.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">2. Eligibility</h3>
            <p className="text-gray-300">
              You must be at least 18 years old to use We Share Together. By using our platform, you represent that you are at least 18 years of
              age or have the consent of a parent or legal guardian to use our services.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">3. Account Registration</h3>
            <p className="text-gray-300">
              To use certain features of the platform, you must create an account. When you register, you agree to provide accurate, complete,
              and up-to-date information. You are responsible for maintaining the confidentiality of your account information and for all
              activities under your account.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}