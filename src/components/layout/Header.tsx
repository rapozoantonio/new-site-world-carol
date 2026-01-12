"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: `/${locale}#about`, label: t("about") },
    { href: `/${locale}#services`, label: t("services") },
    { href: `/${locale}#projects`, label: t("projects") },
    { href: `/${locale}#blog`, label: t("blog") },
    { href: `/${locale}#contact`, label: t("contact") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center space-x-2 group"
          >
            <div className="text-2xl font-heading font-bold">
              <span className="gradient-text">New</span>
              <span className="text-gray-900">Site</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-primary-500 transition-colors font-medium animated-underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="https://www.facebook.com/profile.php?id=61559588763100"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-500 transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/carolina-arango-793018303"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-500 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/caroarangonew/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-500 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                <path d="M5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                <circle cx="18.406" cy="5.594" r="1.44" />
              </svg>
            </a>
            <a
              href="https://linktr.ee/CarolArango"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-500 transition-colors"
              aria-label="Linktree"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.953 15.066c-.08.163-.08.324-.08.486.08.517.528.897 1.052.897h1.294v4.461c0 .486.404.89.89.89h1.617a.898.898 0 0 0 .889-.89v-4.461h1.294c.53 0 .967-.38 1.052-.897 0-.162 0-.323-.08-.486l-3.17-6.704c-.165-.323-.49-.566-.89-.566s-.725.243-.89.566l-3.17 6.704zm10.377 0c-.08.163-.08.324-.08.486.08.517.528.897 1.052.897h1.294v4.461c0 .486.404.89.89.89h1.617a.898.898 0 0 0 .889-.89v-4.461h1.294c.53 0 .967-.38 1.052-.897 0-.162 0-.323-.08-.486l-3.17-6.704c-.165-.323-.49-.566-.89-.566s-.725.243-.89.566l-3.17 6.704zm-15.133 0c-.08.163-.08.324-.08.486.08.517.528.897 1.052.897h1.294v4.461c0 .486.404.89.89.89h1.617a.898.898 0 0 0 .889-.89v-4.461h1.294c.53 0 .967-.38 1.052-.897 0-.162 0-.323-.08-.486l-3.17-6.704c-.165-.323-.49-.566-.89-.566s-.725.243-.89.566l-3.17 6.704zM12 1.385c-.242 0-.485.081-.647.242L8.686 4.294c-.323.323-.323.809 0 1.132l.808.808c.323.323.809.323 1.132 0l.647-.647v3.544c0 .404.404.809.809.809s.809-.404.809-.809V5.587l.647.647c.323.323.809.323 1.132 0l.808-.808c.323-.323.323-.809 0-1.132L12.647 1.627c-.162-.161-.404-.242-.647-.242z" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
