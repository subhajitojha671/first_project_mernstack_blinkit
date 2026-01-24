import React from 'react'
import { useState } from "react";
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";



const FooterSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center md:hidden font-semibold py-2"
      >
        {title}
        <span>{open ? "−" : "+"}</span>
      </button>

      {/* Desktop Title */}
      <h4 className="hidden md:block font-semibold mb-3">
        {title}
      </h4>

      <ul
        className={`space-y-2 text-sm text-gray-600 dark:text-gray-400 ${
          open ? "block" : "hidden"
        } md:block`}
      >
        {children}
      </ul>
    </div>
  );
};

function Footer() {
  return (
    <footer className="bg-gray-100 mt-16 border-t dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-extrabold text-blinkitGreen mb-2">
              blinkit
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              India’s last minute app — grocery delivery in minutes.
            </p>

            {/* Social Icons */}
             <div className="flex gap-4 mt-4 text-xl">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer">
                      <FaInstagram />
                  </a>

                  <a href="https://twitter.com" target="_blank" rel="noreferrer">
                      <FaTwitter />
                  </a>

                  <a href="https://facebook.com" target="_blank" rel="noreferrer">
                     <FaFacebook />
                  </a>

                  <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                     <FaLinkedin />
                  </a>
    </div>
          </div>

          {/* Company */}
          <FooterSection title="Company">
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Press</a></li>
          </FooterSection>

          {/* Legal */}
          <FooterSection title="Legal">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="#" className="hover:underline">Security</a></li>
          </FooterSection>

          {/* Cities */}
          <FooterSection title="We Deliver To">
            <li>Kolkata</li>
            <li>Delhi</li>
            <li>Mumbai</li>
            <li>Bangalore</li>
            <li>Hyderabad</li>
          </FooterSection>

        </div>

        {/* Divider */}
        <div className="border-t dark:border-gray-800 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">

          <p>
            © {new Date().getFullYear()} Blinkit Clone. All rights reserved.
          </p>

          {/* App Buttons */}
          <div className="flex gap-3">
            <button className="border dark:border-gray-700 px-4 py-2 rounded-lg text-sm">
              Google Play
            </button>
            <button className="border dark:border-gray-700 px-4 py-2 rounded-lg text-sm">
              App Store
            </button>
          </div>

        </div>

      </div>
    </footer>
   
  )
}

export default Footer
