'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Section, Card } from '@/components/ui';
import siteContent from '../../../content-extraction/site-content.json';

export default function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale() as 'en' | 'es' | 'pt';
  const services = siteContent[locale].services.items;

  // Icons are now stored directly as emojis in site-content.json

  return (
    <Section id="services" variant="light" spacing="lg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-6">{t('heading')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="hover" padding="lg" className="h-full group">
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <motion.div
                    className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-3xl shadow-lg"
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        {locale === 'es' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12 mb-8"
          >
            <p className="text-lg text-gray-600 italic max-w-3xl mx-auto">
              Nota: Todos los servicios pueden contratarse por separado o en formato pack, según las necesidades de tu propiedad y tus objetivos.
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="https://wa.me/34611200787"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-gradient text-lg px-8 py-4"
            >
              {locale === 'es' ? '🚀 Transformemos Tu Propiedad' : '🚀 Let\'s Transform Your Property'}
            </motion.button>
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
