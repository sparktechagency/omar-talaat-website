import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FooterLogo, MainLogo } from "../share/svg/Logo";

export default function Footer() {
  return (
    <div className="bg-[#181818] text-white">
      {/* Main Footer Content */}
      <footer className="container mx-auto py-[30px] ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Logo and Contact Section */}
          <div className="lg:col-span-1">
            <div className=" mb-6 ">
              <FooterLogo />
              <div className="">
                <h3 className="text-lg  my-3">
                  Have any Questions or Requests?
                </h3>
                <p className="text-gray-300 mb-4">
                  Feel free to message us on WhatsApp
                </p>
                <Link
                  href="https://wa.me/your-number"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Quick Links
            </h3>
            <div className="flex items-center lg:justify-center justify-between  lg:gap-6">
              <div className="space-y-2">
                <Link
                  href="/all-coral"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  All Coral
                </Link>
                <Link
                  href="/zoanthids"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Zoanthids
                </Link>
                <Link
                  href="/sps"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  SPS
                </Link>
                <Link
                  href="/lps"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  LPS
                </Link>
                <Link
                  href="/acropora"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Acropora
                </Link>
              </div>

              <div className="lg:col-span-1">
                <div className="space-y-2">
                  <Link
                    href="/montipora"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    Montipora
                  </Link>
                  <Link
                    href="/soft-corals"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    Soft Corals
                  </Link>
                  <Link
                    href="/wysiwyg"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    WYSIWYG
                  </Link>
                  <Link
                    href="/live-food"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    Live Food
                  </Link>
                  <Link
                    href="/the-vault"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    The Vault
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Information Links</h3>
            <div>
              <Link
                href="/doa-form"
                className="block text-gray-300 hover:text-white transition-colors font-medium"
              >
                DOA Form
              </Link>
            </div>
          </div>

          {/* Information Links & WhatsApp */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <div className="">
                <h4 className="text-lg font-semibold mb-3">
                  Join our WhatsApp Group
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  Through our WhatsApp group, you can get access to useful
                  information, latest frag drops and other useful services!
                </p>
                <Link
                  href="https://wa.me/your-group-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Sign up for exclusive offers, additions and more.
            </p>

            <div className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-r-none focus:border-gray-600"
              />
              <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-l-none px-4">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* bottom section */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto mb-2 ">
            <div className="flex flex-col md:flex-row justify-end items-center">
              <div className="flex items-center space-x-4">
                {/* Payment Icons */}
                <div className="flex space-x-2">
                  <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AE</span>
                  </div>
                  <div className="w-8 h-5 bg-gray-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AP</span>
                  </div>
                  <div className="w-8 h-5 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">MC</span>
                  </div>
                  <div className="w-8 h-5 bg-blue-800 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">V</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 md:mb-0">
          <p className="text-sm text-gray-400">© 2025 coral-Stash.com</p>
        </div>
      </footer>
    </div>
  );
}
