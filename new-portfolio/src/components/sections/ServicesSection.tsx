'use client';

import { useTranslations } from 'next-intl';

export default function ServicesSection() {
  const t = useTranslations('services');

  return (
    <section id="services" className="section bg-background-light">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6">{t('heading')}</h2>
          <p className="text-lg text-gray-600">{t('description')}</p>
        </div>
      </div>
    </section>
  );
}
