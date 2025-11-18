'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Section, Card, CardTitle, CardDescription } from '@/components/ui';
import siteContent from '../../../content-extraction/site-content.json';

export default function AboutSection() {
  const t = useTranslations('about');
  const locale = useLocale() as 'en' | 'es' | 'pt';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Get locale-specific content
  const content = siteContent[locale];
  const skills = content.about.skills;

  const capabilities = [
    {
      icon: '📱',
      title: 'Social Media Management',
      description: 'Instagram & Facebook strategy, content calendars & community management',
    },
    {
      icon: '🎯',
      title: 'Paid Advertising',
      description: 'Meta Ads & Google Ads, funnel optimization & ROAS tracking',
    },
    {
      icon: '🎬',
      title: 'Content Production',
      description: 'Reels, Carousels, Stories, video editing & visual storytelling',
    },
    {
      icon: '🎨',
      title: 'Branding & Identity',
      description: 'Visual systems for properties, mood boards & style guides',
    },
    {
      icon: '🔄',
      title: 'Sales Funnels',
      description: 'Lead nurturing workflows & WhatsApp automation',
    },
    {
      icon: '📊',
      title: 'Listing Optimization',
      description: 'Airbnb & Booking.com profiles, SEO for property descriptions',
    },
    {
      icon: '📈',
      title: 'Strategy & Analytics',
      description: 'Performance reporting & data-driven decision making',
    },
    {
      icon: '⚡',
      title: 'Conversion Optimization',
      description: 'A/B testing & user journey mapping',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <Section id="about" variant="default" spacing="lg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-6">{t('heading')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('bio')}
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left Column - Stats & Video (Sticky on desktop) */}
          <div className="lg:sticky lg:top-24 lg:self-start" ref={ref}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: '12+', label: t('yearsExperience') },
                  { value: '50+', label: t('projectsCompleted') },
                  { value: '36%', label: t('avgGrowth') },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-gradient-to-br from-primary-50 to-white rounded-xl shadow-card"
                  >
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Skills Progress Bars */}
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <SkillBar
                    key={index}
                    name={skill.name}
                    percentage={skill.percentage}
                    delay={index * 0.1}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Capability Cards (Scrolling) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <h3 className="text-2xl font-heading font-bold mb-6">Core Capabilities</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {capabilities.map((capability, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <Card
                    variant="hover"
                    padding="md"
                    className="h-full group relative overflow-hidden"
                  >
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

                    <div className="relative z-10">
                      <motion.div
                        className="text-4xl mb-3"
                        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        {capability.icon}
                      </motion.div>
                      <h4 className="text-lg font-heading font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                        {capability.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {capability.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Approach Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <Card variant="gradient" padding="lg">
            <h3 className="text-2xl font-heading font-bold mb-4">The Approach</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              I don't just post pretty pictures. Every campaign is built on audience research, emotional triggers, and conversion psychology.
            </p>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

// Skill Bar Component
function SkillBar({
  name,
  percentage,
  delay,
  isInView,
}: {
  name: string;
  percentage: number;
  delay: number;
  isInView: boolean;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        setWidth(percentage);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, percentage, delay]);

  return (
    <div className="skill-bar-container">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span className="text-sm font-bold text-primary-600">{percentage}%</span>
      </div>
      <div className="skill-bar h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="skill-bar-fill h-full bg-gradient-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay }}
        />
      </div>
    </div>
  );
}
