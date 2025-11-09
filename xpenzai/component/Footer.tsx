"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Globe } from "lucide-react";

const Footer = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* ======= Top Section ======= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold text-green-400">Xpenz AI</h2>
            </div>
            <p className="mt-3 text-sm text-gray-400 max-w-sm leading-relaxed">
              Smarter expense tracking powered by AI — built for students and
              professionals who want clarity and control over their finances.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Features", href: "/#features" },
                { label: "Pricing", href: "/pricing" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-green-300 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Blog", href: "/blog" },
                { label: "FAQs", href: "/faq" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-green-300 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">
              Connect With Us
            </h3>
            <div className="flex items-center space-x-5">
              <Link
                href="https://github.com/"
                aria-label="GitHub"
                target="_blank"
                className="hover:text-green-300 transition-transform transform hover:scale-110"
              >
                <Github size={22} strokeWidth={1.6} />
              </Link>
              <Link
                href="https://linkedin.com/"
                aria-label="LinkedIn"
                target="_blank"
                className="hover:text-green-300 transition-transform transform hover:scale-110"
              >
                <Linkedin size={22} strokeWidth={1.6} />
              </Link>
              <Link
                href="https://xpenz.ai"
                aria-label="Website"
                target="_blank"
                className="hover:text-green-300 transition-transform transform hover:scale-110"
              >
                <Globe size={22} strokeWidth={1.6} />
              </Link>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Made by students, for students 💚
            </p>
          </div>
        </div>

        {/* ======= Bottom Section ======= */}
        <div className="border-t border-green-800 mt-10 pt-5 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Xpenz AI. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Built with ❤️ using
            <span className="text-green-400 font-medium">Next.js</span> &
            <span className="text-green-400 font-medium">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
