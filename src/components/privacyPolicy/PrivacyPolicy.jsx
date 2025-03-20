"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="flex  justify-center items-center my-12">
      <Card className="w-full px-4 bg-[#18191b]   text-white shadow-lg">
        <CardHeader className=" border-b border-[#2E2E2EF5]">
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-sm leading-relaxed ">
            {/* Introduction */}
            <section>
              <h2 className="text-lg font-semibold mb-2">Introduction</h2>
              <p>
                Welcome to [Your Company Name]. Your privacy is important to us.
                This Privacy Policy explains how we collect, use, and protect
                your personal information.
              </p>
            </section>

            {/* Information Collection */}
            <section>
              <h2 className="text-lg font-semibold mb-2">
                Information We Collect
              </h2>
              <p>
                We collect personal data that you provide directly to us, such
                as your name, email, and contact information. We may also
                collect usage data, cookies, and other technical details.
              </p>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-lg font-semibold mb-2">
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To improve our services and user experience</li>
                <li>To process transactions securely</li>
                <li>To send updates and promotional content</li>
                <li>To ensure compliance with legal obligations</li>
              </ul>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <h2 className="text-lg font-semibold mb-2">
                Cookies and Tracking
              </h2>
              <p>
                We use cookies to enhance your browsing experience. You can
                manage your cookie preferences through your browser settings.
              </p>
            </section>

            {/* Data Protection */}
            <section>
              <h2 className="text-lg font-semibold mb-2">
                How We Protect Your Data
              </h2>
              <p>
                We implement strong security measures to protect your personal
                information from unauthorized access, alteration, or disclosure.
              </p>
            </section>

            {/* User Rights */}
            <section>
              <h2 className="text-lg font-semibold mb-2">
                Your Rights & Choices
              </h2>
              <p>
                You have the right to access, update, or delete your personal
                data. Contact us if you have any privacy concerns.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
              <p>
                If you have any questions about our Privacy Policy, please
                contact us at:{" "}
                <span className="text-blue-400">support@example.com</span>.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
