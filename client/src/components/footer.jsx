import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white px-16 py-12">

      <div className="grid grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">
            Yaseen Realtor
          </h2>

          <p className="text-gray-400 mt-4 leading-relaxed">
            Your trusted property partner.
            <br />
            Helping you find the right property.
          </p>
        </div>


        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 mt-5 text-gray-400">

            <a href="/" className="hover:text-white">
              Home
            </a>

            <a href="/property" className="hover:text-white">
              Properties
            </a>

          </div>
        </div>


        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold">
            Contact
          </h3>

          <div className="flex flex-col gap-3 mt-5 text-gray-400">

            <p>+91 98765 43210</p>

            <p>yaseenrealtor@gmail.com</p>

            <p>Malappuram, Kerala</p>

          </div>
        </div>


        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold">
            Follow Us
          </h3>

          <div className="flex gap-4 mt-5">

            <span className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600">
              f
            </span>

            <span className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600">
              in
            </span>

            <span className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600">
              ▶
            </span>

          </div>
        </div>

      </div>


      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex justify-between text-sm text-gray-500">

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