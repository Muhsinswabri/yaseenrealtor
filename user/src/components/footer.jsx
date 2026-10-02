import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white px-5 sm:px-8 lg:px-16 py-12">

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">
            Yaseen Realtor
          </h2>

          <p className="text-gray-400 mt-4 leading-relaxed text-sm sm:text-base">
            Your trusted property partner. Helping you find the right property.
          </p>
        </div>


        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 mt-4 text-gray-400 text-sm sm:text-base">

            <a href="/" className="hover:text-white transition">
              Home
            </a>

            <a href="/property" className="hover:text-white transition">
              Properties
            </a>

          </div>
        </div>


        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold">
            Contact
          </h3>

          <div className="flex flex-col gap-3 mt-4 text-gray-400 text-sm sm:text-base">

            <p>+91 98765 43210</p>

            <p className="break-all">yaseenrealtor@gmail.com</p>

            <p>Malappuram, Kerala</p>

          </div>
        </div>


        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold">
            Follow Us
          </h3>

          <div className="flex gap-4 mt-4">

            <span className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 hover:border-white transition cursor-pointer">
              f
            </span>

            <span className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 hover:border-white transition cursor-pointer">
              in
            </span>

            <span className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 hover:border-white transition cursor-pointer">
              ▶
            </span>

          </div>
        </div>

      </div>


      {/* Bottom */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400 text-center sm:text-left">

        <p>
          © 2026 Yaseen Realtor. All rights reserved.
        </p>

        <p>
          Your Property Partner
        </p>

      </div>

    </footer>
  );
};

export default Footer;