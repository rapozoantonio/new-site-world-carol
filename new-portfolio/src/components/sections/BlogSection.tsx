'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Section, Card } from '@/components/ui';
import siteContent from '../../../content-extraction/site-content.json';

export default function BlogSection() {
  const t = useTranslations('blog');
  const locale = useLocale() as 'en' | 'es' | 'pt';

  // Get locale-specific blog content
  const content = siteContent[locale];
  const posts = content.blog?.posts || [];

  // Only show blog section if posts exist for this locale
  if (!posts || posts.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Section id="blog" variant="light" spacing="lg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">{content.blog.heading}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.blog.description}
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post, index) => (
            <motion.a
              key={index}
              variants={cardVariants}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <Card variant="hover" padding="none" className="h-full overflow-hidden">
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      ✍️ {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      ⏱️ {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
                    <span>Read on Medium</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Card>
            </motion.a>
          ))}
        </motion.div>

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://medium.com/@newsitebycaro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg font-medium text-primary-600 hover:text-primary-700 transition-colors group"
          >
            <span>View all articles on Medium</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
