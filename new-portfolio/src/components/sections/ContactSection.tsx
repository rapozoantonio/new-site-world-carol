'use client';

import { useTranslations } from 'next-intl';

export default function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="section bg-background-light">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6">{t('heading')}</h2>
          <p className="text-lg text-gray-600 mb-8">{t('description')}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/34611200787"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {t('whatsapp')}
            </a>
            <a
              href="mailto:newsitebycaro@gmail.com"
              className="btn btn-outline"
            >
              {t('email')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
