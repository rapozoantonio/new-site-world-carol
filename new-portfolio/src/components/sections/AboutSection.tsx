'use client';

import { useTranslations } from 'next-intl';

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="section bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6">{t('heading')}</h2>
          <p className="text-lg text-gray-600">{t('bio')}</p>
        </div>
      </div>
    </section>
  );
}
