'use client';

import { useTranslations } from 'next-intl';

export default function ProjectsSection() {
  const t = useTranslations('projects');

  return (
    <section id="projects" className="section bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6">{t('heading')}</h2>
          <p className="text-lg text-gray-600">Featured projects coming soon...</p>
        </div>
      </div>
    </section>
  );
}
