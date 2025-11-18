'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-background-light pt-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Brand */}
          <div className="mb-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold">
              <span className="gradient-text">{t('brand')}</span>
            </h1>
          </div>

          {/* Tagline */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-700 mb-4">
            {t('tagline')}
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            {t('subtitle')}
          </p>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('description')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#projects" className="btn btn-primary text-lg px-8 py-4">
              {t('cta')}
            </Link>
            <Link href="#contact" className="btn btn-outline text-lg px-8 py-4">
              {t('ctaSecondary')}
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">12+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">50+</div>
              <div className="text-gray-600">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">36%</div>
              <div className="text-gray-600">Avg Growth</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-primary-500"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
