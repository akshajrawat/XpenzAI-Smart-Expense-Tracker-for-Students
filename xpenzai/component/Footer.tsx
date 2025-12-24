"use client";

import Link from "next/link";
import { Github, Linkedin, Globe } from "lucide-react";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 font-(family-name:--font-baloo-bhai)">
      {/* ======= Top Section ======= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold tracking-tighter text-white">
              Expenz<span className="text-green-500">AI.</span>
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-medium">
            Smarter expense tracking powered by AI — built for students and
            professionals who want clarity and control over their finances.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-green-500 mb-6">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm font-medium text-slate-300">
            {[
              { label: "Home", href: "/" },
              { label: "Features", href: "/#features" },
              { label: "Pricing", href: "/pricing" },
              { label: "About", href: "/about" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="hover:text-green-400 transition-colors duration-200 flex items-center gap-2"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-green-500 mb-6">
            Resources
          </h3>
          <ul className="space-y-3 text-sm font-medium text-slate-300">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "FAQs", href: "/faq" },
              { label: "Support", href: "/contact" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="hover:text-green-400 transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-green-500">
            Connect With Us
          </h3>
          <div className="flex items-center space-x-5 text-slate-300">
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              {
                icon: Linkedin,
                href: "https://linkedin.com",
                label: "LinkedIn",
              },
              { icon: Globe, href: "https://xpenz.ai", label: "Website" },
            ].map((social, idx) => (
              <Link
                key={idx}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                className="bg-slate-900 p-2 rounded-lg border border-slate-800 hover:border-green-500 hover:text-green-400 transition-all transform hover:-translate-y-1"
              >
                <social.icon size={20} strokeWidth={2} />
              </Link>
            ))}
          </div>
          <p className="text-xs text-slate-500 font-medium italic">
            Made by students, for students 💚
          </p>
        </div>
      </div>

      {/* ======= Bottom Section ======= */}
      <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} Expenz AI. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <span>Built with</span>
          <span className="text-slate-300">Next.js</span>
          <span className="text-green-500">/</span>
          <span className="text-slate-300">Tailwind</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
