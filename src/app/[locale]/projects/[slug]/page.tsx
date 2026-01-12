/**
 * Enhanced Project Detail Page
 * 
 * Features:
 * - Full-width parallax hero with scroll-based animations
 * - Sticky sidebar with project overview and quick metrics
 * - Tabbed navigation (Overview, Challenge, Strategy, Results, Gallery)
 * - Animated metrics dashboard with staggered entrance animations
 * - Interactive image lightbox gallery with keyboard navigation
 * - Smooth transitions between tabs with Framer Motion
 * - Responsive design optimized for all screen sizes
 * 
 * Interactions:
 * - Click gallery images to open fullscreen lightbox
 * - Use arrow keys (←/→) or buttons to navigate between images
 * - Press ESC to close lightbox
 * - Tabs animate with smooth transitions
 * - Metrics animate on mount with staggered delays
 */

'use client';

import { notFound, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button, Card, Badge, Section } from '@/components/ui';
import projectsData from '../../../../../content-extraction/projects.json';

// Type definitions
type Locale = 'en' | 'es' | 'pt';

type TabType = 'overview' | 'challenge' | 'strategy' | 'results' | 'gallery';

export default function ProjectPage() {
  const params = useParams();
  const locale = params.locale as string;
  const slug = params.slug as string;
  const t = useTranslations();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Find project
  const project = projectsData.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const title = project.title[locale as Locale];
  const tagline = project.tagline[locale as Locale];
  const challenge = project.challenge[locale as Locale];

  const gallery = project.gallery || [];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        setImageIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
        setSelectedImage(gallery[imageIndex > 0 ? imageIndex - 1 : gallery.length - 1]);
      } else if (e.key === 'ArrowRight') {
        setImageIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
        setSelectedImage(gallery[imageIndex < gallery.length - 1 ? imageIndex + 1 : 0]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, imageIndex, gallery]);

  const tabLabels = {
    en: {
      overview: 'Overview',
      challenge: 'Challenge',
      strategy: 'Strategy',
      results: 'Results',
      gallery: 'Gallery'
    },
    es: {
      overview: 'Resumen',
      challenge: 'Desafío',
      strategy: 'Estrategia',
      results: 'Resultados',
      gallery: 'Galería'
    },
    pt: {
      overview: 'Resumo',
      challenge: 'Desafio',
      strategy: 'Estratégia',
      results: 'Resultados',
      gallery: 'Galeria'
    }
  };

  const currentLabels = tabLabels[locale as Locale] || tabLabels.en;

  const tabs = [
    { id: 'overview' as TabType, label: currentLabels.overview, icon: '📊' },
    { id: 'challenge' as TabType, label: currentLabels.challenge, icon: '🎯' },
    { id: 'strategy' as TabType, label: currentLabels.strategy, icon: '🚀' },
    { id: 'results' as TabType, label: currentLabels.results, icon: '📈' },
    { id: 'gallery' as TabType, label: currentLabels.gallery, icon: '🖼️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <Image
            src={project.heroImage}
            alt={title}
            fill
            className="object-cover opacity-30"
            priority
          />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-16 container-custom">
          <Link
            href={`/${locale}#projects`}
            className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-2 mb-8"
          >
            <span className="text-2xl">←</span>
            <span className="text-lg">Back to Projects</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {project.category.map((cat) => (
                <Badge key={cat} variant="primary" className="bg-white/20 backdrop-blur-md text-white border-white/30">
                  {cat.replace('-', ' ')}
                </Badge>
              ))}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-4 drop-shadow-lg">
              {title}
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 font-medium max-w-3xl">
              {tagline}
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Main Content with Sticky Sidebar */}
      <div className="container-custom py-16">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Sticky Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <Card variant="default" padding="lg" className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Client
                  </h3>
                  <p className="text-lg font-medium text-gray-900">{project.overview.client}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Industry
                  </h3>
                  <p className="text-lg font-medium text-gray-900">{project.overview.industry}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Location
                  </h3>
                  <p className="text-lg font-medium text-gray-900">{project.overview.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Duration
                  </h3>
                  <p className="text-lg font-medium text-gray-900">{project.overview.duration}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Target Audience
                  </h3>
                  <p className="text-lg font-medium text-gray-900">
                    {project.overview.targetAudience}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Services
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.overview.services.map((service) => (
                      <Badge key={service} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Website Link */}
                {(project.overview as any).website && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                      Website
                    </h3>
                    <a 
                      href={(project.overview as any).website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-2 transition-colors"
                    >
                      <span>Visit Website</span>
                      <span className="text-lg">↗</span>
                    </a>
                  </div>
                )}

                {/* Quick Metrics */}
                {project.results.metrics && (
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                      Key Results
                    </h3>
                    <div className="space-y-3">
                      {project.results.metrics.slice(0, 3).map((metric, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <span className="text-2xl">{metric.icon}</span>
                          <div>
                            <p className="text-xl font-bold text-primary-600">{metric.value}</p>
                            <p className="text-xs text-gray-600">{metric.label}</p>
                            {(metric as any).description && (
                              <p className="text-xs text-gray-500 mt-1">{(metric as any).description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Tab Navigation */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex gap-2 border-b border-gray-200 min-w-max pb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 font-medium transition-all relative whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-primary-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <Card variant="default" padding="lg">
                  <h2 className="text-3xl font-heading font-bold mb-6">Project Overview</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {tagline}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6 not-prose">
                      <div className="p-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl">
                        <h3 className="text-sm font-semibold text-primary-900 uppercase mb-2">
                          Client
                        </h3>
                        <p className="text-lg font-medium text-gray-900">{project.overview.client}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl">
                        <h3 className="text-sm font-semibold text-primary-900 uppercase mb-2">
                          Industry
                        </h3>
                        <p className="text-lg font-medium text-gray-900">{project.overview.industry}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Challenge Tab */}
              {activeTab === 'challenge' && (
                <Card variant="default" padding="lg">
                  <h2 className="text-3xl font-heading font-bold mb-6">The Challenge</h2>
                  <ul className="space-y-4">
                    {challenge.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-3xl flex-shrink-0">🎯</span>
                        <span className="text-lg text-gray-700 leading-relaxed">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Strategy Tab */}
              {activeTab === 'strategy' && (
                <div className="space-y-8">
                  {/* Solution Overview */}
                  {(project.strategy as any).solution && (
                    <Card variant="default" padding="lg" className="bg-gradient-to-br from-primary-50 to-accent-50">
                      <h2 className="text-3xl font-heading font-bold mb-6">Strategic Solution</h2>
                      <ul className="space-y-3">
                        {((project.strategy as any).solution[locale as Locale] || (project.strategy as any).solution.en).map((item: string, index: number) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <span className="text-primary-500 text-xl flex-shrink-0">✓</span>
                            <span className="text-gray-700">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </Card>
                  )}

                  {/* Conversion Funnel Strategy */}
                  {(project.strategy as any).conversionFunnel && (
                    <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 p-8 shadow-xl">
                      <h2 className="text-3xl font-heading font-bold mb-2 text-white">
                        {(project.strategy as any).conversionFunnel.title[locale as Locale] || (project.strategy as any).conversionFunnel.title.en}
                      </h2>
                      <p className="text-lg text-white/90 mb-6">
                        {(project.strategy as any).conversionFunnel.objective[locale as Locale] || (project.strategy as any).conversionFunnel.objective.en}
                      </p>

                      <div className="space-y-4">
                        {(project.strategy as any).conversionFunnel.phases.map((phase: any, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="p-5 rounded-xl bg-white/10 backdrop-blur-sm"
                          >
                            <div className="flex items-start gap-4">
                              <div className="text-4xl">{phase.icon}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold text-white">
                                    Phase {phase.number}
                                  </span>
                                  <h3 className="text-xl font-bold text-white">{phase.name}</h3>
                                </div>
                                {phase.objective && (
                                  <p className="text-white/90 mb-3">
                                    {typeof phase.objective === 'string' 
                                      ? phase.objective 
                                      : (phase.objective[locale as Locale] || phase.objective.en)}
                                  </p>
                                )}
                                {phase.description && (
                                  <p className="text-white/80 text-sm mb-3 italic">
                                    {typeof phase.description === 'string'
                                      ? phase.description
                                      : (phase.description[locale as Locale] || phase.description.en)}
                                  </p>
                                )}
                                {phase.tactics && (
                                  <ul className="space-y-2">
                                    {phase.tactics.map((tactic: any, tIndex: number) => (
                                      <li key={tIndex} className="text-sm text-white/90 flex items-start gap-2">
                                        <span className="text-white/60 flex-shrink-0">•</span>
                                        <span>
                                          {typeof tactic === 'string' 
                                            ? tactic 
                                            : (tactic[locale as Locale] || tactic.en)}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                                {phase.result && (
                                  <div className="mt-3 p-3 bg-white/10 rounded-lg">
                                    <p className="text-sm text-white font-medium">
                                      <span className="text-white/70">Result: </span>
                                      {typeof phase.result === 'string'
                                        ? phase.result
                                        : (phase.result[locale as Locale] || phase.result.en)}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-6 pt-6 border-t border-white/20">
                        <h4 className="text-lg font-semibold text-white mb-3">Technology & Automation</h4>
                        <ul className="grid md:grid-cols-2 gap-3">
                          {((project.strategy as any).conversionFunnel.technology[locale as Locale] || (project.strategy as any).conversionFunnel.technology.en).map((tech: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-white/90">
                              <span className="text-white/60">⚙️</span>
                              <span className="text-sm">{tech}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">✨</span>
                          <div>
                            <h4 className="font-semibold text-white mb-2">Key Insight</h4>
                            <p className="text-white/90 text-sm">
                              {(project.strategy as any).conversionFunnel.keyInsight[locale as Locale] || (project.strategy as any).conversionFunnel.keyInsight.en}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Product Purpose (Tap Tap) */}
                  {(project.strategy as any).productPurpose && (
                    <div className="space-y-6">
                      <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 p-8 shadow-xl">
                        <h2 className="text-3xl font-heading font-bold mb-4 text-white">For Businesses</h2>
                        <ul className="space-y-3">
                          {((project.strategy as any).productPurpose.forBusinesses[locale as Locale] || (project.strategy as any).productPurpose.forBusinesses.en).map((item: string, index: number) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 text-white"
                            >
                              <span className="text-yellow-300 text-xl flex-shrink-0">✓</span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <Card variant="default" padding="lg" className="bg-gradient-to-br from-accent-50 to-primary-50">
                        <h2 className="text-3xl font-heading font-bold mb-4">For Consumers</h2>
                        <ul className="space-y-3">
                          {((project.strategy as any).productPurpose.forConsumers[locale as Locale] || (project.strategy as any).productPurpose.forConsumers.en).map((item: string, index: number) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 text-gray-700"
                            >
                              <span className="text-primary-500 text-xl flex-shrink-0">✓</span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                  )}

                  {/* Key Features (Tap Tap) */}
                  {(project.strategy as any).keyFeatures && (
                    <Card variant="default" padding="lg">
                      <h2 className="text-3xl font-heading font-bold mb-6">Key Features</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        {(project.strategy as any).keyFeatures.map((feature: any, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-5 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 hover:shadow-lg transition-shadow"
                          >
                            <div className="text-4xl mb-3">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2">
                              {feature.title[locale as Locale] || feature.title.en}
                            </h3>
                            <p className="text-gray-700 text-sm">
                              {feature.description[locale as Locale] || feature.description.en}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Development Status (Animalist Club) */}
                  {(project.strategy as any).developmentStatus && (
                    <Card variant="default" padding="lg" className="bg-gradient-to-br from-primary-50 to-accent-50">
                      <h2 className="text-3xl font-heading font-bold mb-4">Development Status</h2>
                      <p className="text-lg text-gray-700">
                        {(project.strategy as any).developmentStatus[locale as Locale] || (project.strategy as any).developmentStatus.en}
                      </p>
                    </Card>
                  )}

                  {/* Key Objectives (Animalist Club) */}
                  {(project.strategy as any).keyObjectives && (
                    <Card variant="default" padding="lg">
                      <h2 className="text-3xl font-heading font-bold mb-6">Key Objectives</h2>
                      <div className="space-y-6">
                        {(project.strategy as any).keyObjectives.map((objective: any, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50"
                          >
                            <div className="text-4xl flex-shrink-0">{objective.icon}</div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold mb-2">
                                {objective.title[locale as Locale] || objective.title.en}
                              </h3>
                              <p className="text-gray-700">
                                {objective.description[locale as Locale] || objective.description.en}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* My Role (Animalist Club) */}
                  {(project.strategy as any).myRole && (
                    <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 p-8 shadow-xl">
                      <h2 className="text-3xl font-heading font-bold mb-4 text-white">My Role</h2>
                      <p className="text-lg text-white">
                        {(project.strategy as any).myRole[locale as Locale] || (project.strategy as any).myRole.en}
                      </p>
                    </div>
                  )}

                  {/* Core Features (Animalist Club) */}
                  {(project.strategy as any).coreFeatures && (
                    <Card variant="default" padding="lg">
                      <h2 className="text-3xl font-heading font-bold mb-6">Core Features</h2>
                      <div className="grid md:grid-cols-3 gap-6">
                        {(project.strategy as any).coreFeatures.map((feature: any, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-5 rounded-xl bg-gradient-to-br from-accent-50 to-primary-50 hover:shadow-lg transition-shadow"
                          >
                            <div className="text-4xl mb-3">{feature.icon}</div>
                            <h3 className="text-lg font-bold mb-2">
                              {feature.feature[locale as Locale] || feature.feature.en}
                            </h3>
                            <p className="text-gray-700 text-sm">
                              {feature.description[locale as Locale] || feature.description.en}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Paid Advertising Strategy */}
                  {(project.strategy as any).paidAdvertising && (
                    <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 p-8 shadow-xl">
                      <h2 className="text-3xl font-heading font-bold mb-4 text-white">Paid Advertising Strategy</h2>
                      <p className="text-lg text-white mb-6">
                        {(project.strategy as any).paidAdvertising.overview[locale as Locale] || (project.strategy as any).paidAdvertising.overview.en}
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        {(project.strategy as any).paidAdvertising.phases.map((phase: any, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="p-5 rounded-xl bg-white/10 backdrop-blur-sm"
                          >
                            <div className="text-3xl mb-3">
                              {index === 0 ? '📍' : index === 1 ? '💬' : '🎯'}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{phase.name}</h3>
                            <p className="text-sm text-white/80 mb-3">{phase.objective}</p>
                            <ul className="space-y-2">
                              {phase.tactics.map((tactic: string, tIndex: number) => (
                                <li key={tIndex} className="text-sm text-white/90 flex items-start gap-2">
                                  <span className="text-white/60 flex-shrink-0">•</span>
                                  <span>{tactic}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                      <div className="mt-6 pt-6 border-t border-white/20">
                        <h4 className="text-lg font-semibold text-white mb-3">Tools & Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {(project.strategy as any).paidAdvertising.tools.map((tool: string, index: number) => (
                            <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Phases */}
                  {project.strategy.phases && (
                    <Card variant="default" padding="lg">
                      <h2 className="text-3xl font-heading font-bold mb-6">Strategic Approach</h2>
                      <div className="grid md:grid-cols-3 gap-6">
                        {project.strategy.phases.map((phase: any, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="p-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 hover:shadow-lg transition-shadow"
                          >
                            <div className="text-4xl mb-4">
                              {index === 0 ? '🎯' : index === 1 ? '📝' : '🚀'}
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-2">
                              {phase.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                              {phase.duration || phase.days || ''}
                            </p>
                            <ul className="space-y-2">
                              {(phase.tasks || phase.objectives || []).map((task: any, taskIndex: number) => (
                                <li
                                  key={taskIndex}
                                  className="text-sm text-gray-700 flex items-start gap-2"
                                >
                                  <span className="text-primary-500 flex-shrink-0">✓</span>
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Brand Development */}
                  {project.strategy.brandDevelopment && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card variant="default" padding="lg">
                        <h3 className="text-xl font-semibold mb-6">Color Palette</h3>
                        <div className="space-y-4">
                          {['primary', 'secondary', 'accent'].map((colorType) => {
                            const bd = project.strategy.brandDevelopment as {
                              colorPalette?: {
                                primary?: string;
                                primaryName?: string;
                                secondary?: string;
                                secondaryName?: string;
                                accent?: string;
                                accentName?: string;
                              };
                            };
                            const palette = bd?.colorPalette || {};
                            const color = palette[colorType as keyof typeof palette] || '';
                            const colorName = palette[`${colorType}Name` as keyof typeof palette] || colorType;
                            return (
                              <div key={colorType} className="flex items-center gap-4">
                                <div
                                  className="w-20 h-20 rounded-xl shadow-lg"
                                  style={{ backgroundColor: color as string }}
                                />
                                <div>
                                  <p className="font-semibold text-lg capitalize">{colorName as string}</p>
                                  <p className="text-sm text-gray-500 font-mono">{color as string}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </Card>

                      <Card variant="default" padding="lg">
                        <h3 className="text-xl font-semibold mb-4">Brand Voice</h3>
                        <p className="text-gray-700 mb-6">
                          {project.strategy.brandDevelopment.brandVoice}
                        </p>
                        <h4 className="text-lg font-semibold mb-4">Content Pillars</h4>
                        <div className="space-y-4">
                          {project.strategy.brandDevelopment.contentPillars?.map(
                            (pillar, index) => (
                              <div key={index}>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium">{pillar.name}</span>
                                  <span className="text-primary-600 font-bold">
                                    {pillar.percentage}%
                                  </span>
                                </div>
                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pillar.percentage}%` }}
                                    transition={{ duration: 1, delay: index * 0.2 }}
                                    className="h-full bg-gradient-primary rounded-full"
                                  />
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </Card>
                    </div>
                  )}

                  {/* Content Strategy */}
                  {project.strategy.contentStrategy && (
                    <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 p-8 shadow-xl">
                      <h3 className="text-2xl font-heading font-bold mb-6 text-white">
                        Content Strategy
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-6">
                        {[
                          { icon: '🎬', label: 'Reels', value: project.strategy.contentStrategy.reels },
                          { icon: '📸', label: 'Carousels', value: project.strategy.contentStrategy.carousels },
                          { icon: '📱', label: 'Stories', value: project.strategy.contentStrategy.stories },
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl"
                          >
                            <div className="text-4xl mb-2">{item.icon}</div>
                            <h4 className="font-semibold text-white mb-1">{item.label}</h4>
                            <p className="text-white/90">{item.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Results Tab */}
              {activeTab === 'results' && (
                <div className="space-y-8">
                  {/* Personal Insight (Tap Tap) */}
                  {(project.results as any).personalInsight && (
                    <Card variant="default" padding="lg" className="bg-gradient-to-br from-primary-50 to-accent-50 border-l-4 border-primary-500">
                      <div className="flex items-start gap-4">
                        <span className="text-4xl">💡</span>
                        <div>
                          <h2 className="text-2xl font-heading font-bold mb-3">Personal Insight</h2>
                          <p className="text-lg text-gray-700 leading-relaxed">
                            {(project.results as any).personalInsight[locale as Locale] || (project.results as any).personalInsight.en}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Product Status (Tap Tap) */}
                  {(project.results as any).productStatus && (
                    <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 p-8 shadow-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">🚀</span>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">Product Status</h3>
                          <p className="text-lg text-white">
                            {(project.results as any).productStatus[locale as Locale] || (project.results as any).productStatus.en}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Project Status (Animalist Club) */}
                  {(project.results as any).projectStatus && (
                    <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 p-8 shadow-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">🔨</span>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">Project Status</h3>
                          <p className="text-lg text-white">
                            {(project.results as any).projectStatus[locale as Locale] || (project.results as any).projectStatus.en}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Personal Commitment (Animalist Club) */}
                  {(project.results as any).personalCommitment && (
                    <Card variant="default" padding="lg" className="bg-gradient-to-br from-accent-50 to-primary-50">
                      <div className="flex items-start gap-4">
                        <span className="text-4xl">💚</span>
                        <div>
                          <h3 className="text-2xl font-heading font-bold mb-3">Personal Commitment</h3>
                          <p className="text-lg text-gray-700 leading-relaxed">
                            {(project.results as any).personalCommitment[locale as Locale] || (project.results as any).personalCommitment.en}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Strategic Focus (Animalist Club) */}
                  {(project.results as any).strategicFocus && (
                    <Card variant="default" padding="lg">
                      <h3 className="text-2xl font-heading font-bold mb-4">Strategic Focus</h3>
                      <ul className="space-y-3">
                        {(project.results as any).strategicFocus.map((focus: string, index: number) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-primary-50 to-accent-50"
                          >
                            <span className="text-primary-500 text-xl flex-shrink-0">🎯</span>
                            <span className="text-gray-700">{focus}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </Card>
                  )}

                  {/* Campaign Example */}
                  {(project.results as any).campaignExample && (
                    <>
                      <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 p-8 shadow-xl">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <h2 className="text-3xl font-heading font-bold text-white mb-2">{(project.results as any).campaignExample.name}</h2>
                            <p className="text-white text-lg mb-4">
                              {(project.results as any).campaignExample.period} • Budget: {(project.results as any).campaignExample.budget}
                            </p>
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold text-white mb-3">Campaign Objectives:</h3>
                              <ul className="space-y-2">
                                {(project.results as any).campaignExample.objectives.map((obj: any, index: number) => (
                                  <li key={index} className="text-white flex items-start gap-2">
                                    <span className="text-yellow-300 flex-shrink-0">✨</span>
                                    <span className="text-sm">{obj[locale as Locale] || obj.en}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <span className="text-5xl flex-shrink-0 ml-4">🎯</span>
                        </div>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {(project.results as any).campaignExample.metrics.map((metric: any, index: number) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-4 rounded-xl bg-white/20 backdrop-blur-sm text-center border border-white/30"
                            >
                              <div className="text-3xl mb-2">{metric.icon}</div>
                              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                              <p className="text-xs text-white font-medium mb-1">{metric.label}</p>
                              <p className="text-xs text-white/90">{metric.description}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Campaign Positive Aspects */}
                      {(project.results as any).campaignExample.positiveAspects && (
                        <Card variant="default" padding="lg" className="bg-gradient-to-br from-green-50 to-emerald-50">
                          <h3 className="text-2xl font-heading font-bold mb-4 text-green-900">Positive Aspects</h3>
                          <ul className="grid md:grid-cols-2 gap-3">
                            {((project.results as any).campaignExample.positiveAspects[locale as Locale] || (project.results as any).campaignExample.positiveAspects.en).map((aspect: string, index: number) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3 p-3 rounded-lg bg-white/50"
                              >
                                <span className="text-green-500 text-xl flex-shrink-0">🚀</span>
                                <span className="text-gray-700">{aspect}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </Card>
                      )}

                      {/* Campaign Conclusion */}
                      {(project.results as any).campaignExample.conclusion && (
                        <Card variant="default" padding="lg" className="bg-gradient-to-br from-primary-50 to-accent-50 border-l-4 border-primary-500">
                          <div className="flex items-start gap-3">
                            <span className="text-3xl">✨</span>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Campaign Conclusion</h4>
                              <p className="text-gray-700 leading-relaxed">
                                {(project.results as any).campaignExample.conclusion[locale as Locale] || (project.results as any).campaignExample.conclusion.en}
                              </p>
                            </div>
                          </div>
                        </Card>
                      )}
                    </>
                  )}

                  {/* Latest Campaign Highlight */}
                  {(project.results as any).latestCampaign && (
                    <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 p-8 shadow-xl">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="text-3xl font-heading font-bold text-white mb-2">Latest Campaign</h2>
                          <p className="text-white text-lg">
                            {(project.results as any).latestCampaign.period} • Investment: {(project.results as any).latestCampaign.investment}
                          </p>
                        </div>
                        <span className="text-5xl">🚀</span>
                      </div>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {(project.results as any).latestCampaign.metrics.map((metric: any, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-xl bg-white/10 backdrop-blur-sm text-center"
                          >
                            <div className="text-3xl mb-2">{metric.icon}</div>
                            <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                            <p className="text-xs text-white/80 font-medium mb-1">{metric.label}</p>
                            <p className="text-xs text-white/60">{metric.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Revenue Projections */}
                  {(project.results as any).latestCampaign?.revenueProjections && (
                    <Card variant="default" padding="lg">
                      <h3 className="text-2xl font-heading font-bold mb-4">Revenue Projections</h3>
                      <p className="text-gray-600 mb-4">
                        Based on: {(project.results as any).latestCampaign.revenueProjections.assumptions}
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50">
                          <h4 className="font-semibold text-gray-900 mb-3">Total Potential Revenue</h4>
                          <p className="text-3xl font-bold text-primary-600">
                            {(project.results as any).latestCampaign.revenueProjections.potentialRevenue.min} - {(project.results as any).latestCampaign.revenueProjections.potentialRevenue.max}
                          </p>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900 mb-3">Conversion Scenarios</h4>
                          {(project.results as any).latestCampaign.revenueProjections.conversionScenarios.map((scenario: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                              <span className="font-medium text-gray-700">{scenario.rate} conversion</span>
                              <span className="font-bold text-primary-600">{scenario.revenue}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Key Actions */}
                  {(project.results as any).latestCampaign?.keyActions && (
                    <Card variant="default" padding="lg">
                      <h3 className="text-2xl font-heading font-bold mb-4">Key Actions Taken</h3>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {(project.results as any).latestCampaign.keyActions.map((action: string, index: number) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                          >
                            <span className="text-primary-500 text-xl flex-shrink-0">✓</span>
                            <span className="text-gray-700">{action}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </Card>
                  )}

                  {/* Overall Results Summary */}
                  {(project.results as any).overallResults && (
                    <Card variant="default" padding="lg" className="bg-gradient-to-r from-primary-500 to-accent-500">
                      <div className="text-center">
                        <h3 className="text-2xl font-heading font-bold mb-3 text-white">Results Summary</h3>
                        <p className="text-xl text-white/95 leading-relaxed">
                          {(project.results as any).overallResults[locale as Locale] || (project.results as any).overallResults.en}
                        </p>
                      </div>
                    </Card>
                  )}

                  <Card variant="default" padding="lg">
                    <h2 className="text-3xl font-heading font-bold mb-6">Overall Impact & Results</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {project.results.metrics?.map((metric, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: index * 0.1,
                            type: 'spring',
                            stiffness: 200,
                            damping: 20,
                          }}
                          className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 hover:shadow-xl transition-shadow"
                        >
                          <motion.div
                            initial={{ rotate: -180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                            className="text-6xl mb-4"
                          >
                            {metric.icon}
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                            className="text-4xl font-bold gradient-text mb-3"
                          >
                            {metric.value}
                          </motion.div>
                          <p className="text-gray-700 font-semibold mb-2">{metric.label}</p>
                          {(metric as any).description && (
                            <p className="text-xs text-gray-600 leading-relaxed">{(metric as any).description}</p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </Card>

                  {/* Additional Results Content */}
                  {project.results.achievements && (
                    <Card variant="default" padding="lg">
                      <h3 className="text-2xl font-heading font-bold mb-4">Key Achievements</h3>
                      <ul className="space-y-3">
                        {project.results.achievements.map((achievement: string, index: number) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <span className="text-2xl">🏆</span>
                            <span className="text-lg text-gray-700">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </Card>
                  )}

                  {/* Conclusion */}
                  {(project.results as any).conclusion && (
                    <Card variant="default" padding="lg" className="bg-gradient-to-br from-primary-50 to-accent-50 border-l-4 border-primary-500">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">✨</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 text-lg">Campaign Conclusion</h4>
                          <p className="text-gray-700 leading-relaxed">
                            {(project.results as any).conclusion[locale as Locale] || (project.results as any).conclusion.en}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Privacy Note */}
                  {(project.results as any).note && (
                    <Card variant="default" padding="lg" className="bg-gray-50 border-l-4 border-primary-500">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🔒</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Privacy Note</h4>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {(project.results as any).note[locale as Locale] || (project.results as any).note.en}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              )}

              {/* Gallery Tab */}
              {activeTab === 'gallery' && gallery.length > 0 && (
                <Card variant="default" padding="lg">
                  <h2 className="text-3xl font-heading font-bold mb-6">Project Gallery</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gallery.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                        onClick={() => {
                          setSelectedImage(image);
                          setImageIndex(index);
                        }}
                      >
                        <Image
                          src={image}
                          alt={`${title} - Image ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-4xl">
                            🔍
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              )}
            </motion.div>
          </main>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-gray-300 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              const newIndex = imageIndex > 0 ? imageIndex - 1 : gallery.length - 1;
              setImageIndex(newIndex);
              setSelectedImage(gallery[newIndex]);
            }}
          >
            ‹
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-gray-300 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              const newIndex = imageIndex < gallery.length - 1 ? imageIndex + 1 : 0;
              setImageIndex(newIndex);
              setSelectedImage(gallery[newIndex]);
            }}
          >
            ›
          </button>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative w-full max-w-6xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt={`${title} - Gallery`}
              fill
              className="object-contain"
            />
          </motion.div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-lg">
            {imageIndex + 1} / {gallery.length}
          </div>
        </motion.div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-heading font-bold mb-6 text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white mb-8">
              Let's create a strategy that delivers results like these.
            </p>
            <Link href={`/${locale}#contact`}>
              <Button variant="primary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Start Your Project
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
