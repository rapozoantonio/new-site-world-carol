'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, Section } from '@/components/ui';
import { createWhatsAppURL } from '@/lib/utils';
import siteContent from '../../../content-extraction/site-content.json';
import Image from 'next/image';

export default function ContactSection() {
  const t = useTranslations('contact');
  const locale = useLocale() as 'en' | 'es' | 'pt';
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = siteContent.site.contact;
  const teamMembers = siteContent.team;
  const content = siteContent[locale].contact;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Create WhatsApp message
    const message = `Hola! Soy ${formData.name}.\nTeléfono: ${formData.phone}\nEmail: ${formData.email}\n\nMensaje: ${formData.message}`;
    const whatsappURL = createWhatsAppURL(contactInfo.whatsapp, message);

    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');

    // Reset form
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const iconMap: { [key: string]: string } = {
    'fa-whatsapp': '💬',
    'fa-comments': '✉️',
    'icon_mail_alt': '📧',
  };

  return (
    <Section id="contact" variant="light" spacing="lg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">{content.heading}</h2>
          {content.subheading && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.subheading}
            </p>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="default" padding="lg">
              <h3 className="text-2xl font-heading font-bold mb-6">
                {content.form.submitButton}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    required
                    placeholder={content.form.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder={content.form.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder={locale === 'es' ? 'Tu Email' : locale === 'pt' ? 'Seu Email' : 'Your Email'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={5}
                    placeholder={content.form.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                >
                  {content.form.submitButton}
                </Button>

                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-center font-medium"
                  >
                    ✓ Opening WhatsApp...
                  </motion.p>
                )}
              </form>
            </Card>
          </motion.div>

          {/* Right Column - Contact Methods */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {content.methods.map((method, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card variant="hover" padding="md">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">
                      {iconMap[method.icon] || '📞'}
                    </div>
                    <div>
                      <h4 className="text-lg font-heading font-semibold mb-1">
                        {method.title}
                      </h4>
                      <p className="text-gray-600">{method.detail}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Quick WhatsApp Button */}
            <motion.div variants={itemVariants}>
              <a
                href={createWhatsAppURL(contactInfo.whatsapp, 'Hola! Me gustaría saber más sobre tus servicios.')}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" size="lg" fullWidth>
                  💬 WhatsApp Direct
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-heading font-bold text-center mb-8">
            {locale === 'es' ? 'Conoce al Equipo' : locale === 'pt' ? 'Conheça a Equipe' : 'Meet the Team'}
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <Card variant="hover" padding="lg" className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-heading font-bold mb-2">
                    {member.name}
                  </h4>
                  <p className="text-gray-600 mb-3">{member.role[locale]}</p>
                  {'upworkUrl' in member && member.upworkUrl && (
                    <a
                      href={member.upworkUrl as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <span>View Upwork Profile</span>
                      <span>→</span>
                    </a>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
