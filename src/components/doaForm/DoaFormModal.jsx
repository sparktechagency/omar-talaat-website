"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DoaFormModal({ showAcceptButton = false, triggerComponent }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerComponent ? (
        <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      ) : null}
      <DialogContent className="sm:max-w-[800px] bg-black p-10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">DOA Form</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">1. Acceptance of Terms</h3>
            <p className="text-sm text-gray-300">
              By accessing or using We Share Together, you agree to these Terms and Conditions. We reserve the right to update or modify
              these Terms at any time, and such changes will be effective immediately upon posting. It is your responsibility to review these
              Terms periodically.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">2. Eligibility</h3>
            <p className="text-sm text-gray-300">
              You must be at least 18 years old to use We Share Together. By using our platform, you represent that you are at least 18 years of
              age or have the consent of a parent or legal guardian to use our services.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">3. Account Registration</h3>
            <p className="text-sm text-gray-300">
              To use certain features of the platform, you must create an account. When you register, you agree to provide accurate, complete,
              and up-to-date information. You are responsible for maintaining the confidentiality of your account information and for all
              activities under your account.
            </p>
          </div>

          {showAcceptButton && (
            <div className="mt-6 text-end">
              <Button 
                onClick={() => setOpen(false)} 
                className="  text-white py-2 rounded-lg"
              >
                I Accept
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}