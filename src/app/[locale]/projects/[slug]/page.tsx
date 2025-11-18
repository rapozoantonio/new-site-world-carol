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

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: '📊' },
    { id: 'challenge' as TabType, label: 'Challenge', icon: '🎯' },
    { id: 'strategy' as TabType, label: 'Strategy', icon: '🚀' },
    { id: 'results' as TabType, label: 'Results', icon: '📈' },
    { id: 'gallery' as TabType, label: 'Gallery', icon: '🖼️' },
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
                  {/* Phases */}
                  {project.strategy.phases && (
                    <Card variant="default" padding="lg">
                      <h2 className="text-3xl font-heading font-bold mb-6">Strategic Approach</h2>
                      <div className="grid md:grid-cols-3 gap-6">
                        {project.strategy.phases.map((phase, index) => (
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
                              {'duration' in phase ? phase.duration : 'days' in phase ? phase.days : ''}
                            </p>
                            <ul className="space-y-2">
                              {('tasks' in phase ? phase.tasks : 'objectives' in phase ? phase.objectives : []).map((task, taskIndex) => (
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
                    <Card variant="gradient" padding="lg">
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
                    </Card>
                  )}
                </div>
              )}

              {/* Results Tab */}
              {activeTab === 'results' && (
                <div className="space-y-8">
                  <Card variant="default" padding="lg">
                    <h2 className="text-3xl font-heading font-bold mb-6">Impact & Results</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                            className="text-5xl font-bold gradient-text mb-3"
                          >
                            {metric.value}
                          </motion.div>
                          <p className="text-gray-700 font-semibold">{metric.label}</p>
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
      <Section variant="gradient" spacing="lg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-heading font-bold mb-6 text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's create a strategy that delivers results like these.
            </p>
            <Link href={`/${locale}#contact`}>
              <Button variant="primary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Start Your Project
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
