'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button, Section, AnimatedText } from '@/components/ui';

export default function HeroSection() {
  const t = useTranslations('hero');
  const tAbout = useTranslations('about');

  const typedTexts = [
    'Marketing Digital',
    'Publicidad Pagada',
    'Optimización de Conversión',
    'Estrategia y Analítica',
    'Embudos de Ventas',
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Section
      variant="gradient"
      spacing="none"
      noContainer
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      id="hero"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary-100/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-primary-100/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Brand Name */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-bold mb-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="gradient-text inline-block">{t('brand')}</span>
            </motion.h1>
          </motion.div>

          {/* Animated Tagline */}
          <motion.div variants={itemVariants} className="mb-6 h-16 md:h-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-700">
              <AnimatedText
                texts={typedTexts}
                className="gradient-text"
                typingSpeed={80}
                deletingSpeed={40}
                pauseTime={2500}
              />
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-6 font-medium"
          >
            {t('subtitle')}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {t('description')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="#projects">
                <Button variant="gradient" size="lg" className="min-w-[200px]">
                  {t('cta')}
                </Button>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="#contact">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  {t('ctaSecondary')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: '13+', label: tAbout('yearsExperience') },
              { value: '25+', label: tAbout('projectsCompleted') },
              { value: '36%', label: tAbout('avgGrowth') },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={statVariants}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  className="text-5xl md:text-6xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1 + index * 0.2,
                    type: 'spring',
                    stiffness: 200,
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <Link href="#about">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex flex-col items-center cursor-pointer group"
          >
            <span className="text-sm text-gray-500 mb-2 group-hover:text-primary-500 transition-colors">
              Scroll
            </span>
            <svg
              className="w-6 h-6 text-primary-500 group-hover:text-primary-600 transition-colors"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </Link>
      </motion.div>
    </Section>
  );
}
