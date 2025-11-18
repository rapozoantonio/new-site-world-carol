'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Section, Card, Badge } from '@/components/ui';
import projectsData from '../../../content-extraction/projects.json';

type Category = 'all' | 'vacation-rentals' | 'branding' | 'paid-ads' | 'social-media';

export default function ProjectsSection() {
  const t = useTranslations('projects');
  const [filter, setFilter] = useState<Category>('all');
  const projects = projectsData.projects;

  const categories = [
    { key: 'all' as Category, label: t('categories.all') },
    { key: 'vacation-rentals' as Category, label: t('categories.vacation-rentals') },
    { key: 'branding' as Category, label: t('categories.branding') },
    { key: 'paid-ads' as Category, label: t('categories.paid-ads') },
    { key: 'social-media' as Category, label: t('categories.social-media') },
  ];

  const filtered = filter === 'all'
    ? projects.filter(p => p.featured)
    : projects.filter(p => p.featured && p.category.includes(filter));

  return (
    <Section id="projects" variant="default" spacing="lg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">{t('heading')}</h2>
          <p className="text-xl text-gray-600">
            Real results from vacation rental marketing campaigns
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat.key)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === cat.key
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="hover" padding="none" className="h-full overflow-hidden group">
                {/* Image Placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-primary-100 to-primary-50 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    {project.id === 'casa-kala' && '🏖️'}
                    {project.id === 'pedra-da-lua' && '🌿'}
                    {project.id === 'animalist-club' && '🐾'}
                    {project.id === 'feliz-boipeba' && '🏝️'}
                    {project.id === 'tap-tap' && '☕'}
                    {project.id === 'casa-laguna' && '🌅'}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.category.slice(0, 2).map((cat) => (
                      <Badge key={cat} variant="primary" size="sm">
                        {cat}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary-600 transition-colors">
                    {project.title.en}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.tagline.en}
                  </p>

                  {/* Quick Stats */}
                  {project.results?.metrics && (
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        ⏱️ {project.overview.duration}
                      </span>
                      {project.results.metrics[0] && (
                        <span className="flex items-center gap-1 font-semibold text-primary-600">
                          {project.results.metrics[0].icon} {project.results.metrics[0].value}
                        </span>
                      )}
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href={`#project-${project.slug}`}
                    className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center gap-2 group/link"
                  >
                    {t('viewCase')}
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No results message */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </Section>
  );
}
