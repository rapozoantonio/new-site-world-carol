import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, Badge, Section } from '@/components/ui';
import projectsData from '../../../../../content-extraction/projects.json';

// Type definitions
type Locale = 'en' | 'es' | 'pt';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
  const locales = ['en', 'es', 'pt'];
  const projects = projectsData.projects;

  const params = [];
  for (const locale of locales) {
    for (const project of projects) {
      params.push({
        locale,
        slug: project.slug,
      });
    }
  }

  return params;
}

// Generate metadata
export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const project = projectsData.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const title = project.title[locale as Locale];
  const tagline = project.tagline[locale as Locale];

  return {
    title: `${title} | NewSite by Carolina Arango`,
    description: tagline,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations();

  // Find project
  const project = projectsData.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const title = project.title[locale as Locale];
  const tagline = project.tagline[locale as Locale];
  const challenge = project.challenge[locale as Locale];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section variant="gradient" spacing="lg" noContainer>
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link
                href={`/${locale}#projects`}
                className="text-primary-600 hover:text-primary-700 transition-colors inline-flex items-center gap-2"
              >
                ← Back to Projects
              </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {project.category.map((cat) => (
                  <Badge key={cat} variant="primary">
                    {cat.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
              <h1 className="mb-4">{title}</h1>
              <p className="text-2xl text-gray-600 font-medium">{tagline}</p>
            </div>

            {/* Hero Image */}
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={project.heroImage}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Overview Section */}
      <Section variant="default" spacing="lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">
            Project Overview
          </h2>
          <Card variant="default" padding="lg">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Client
                </h3>
                <p className="text-lg font-medium">{project.overview.client}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Industry
                </h3>
                <p className="text-lg font-medium">{project.overview.industry}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Location
                </h3>
                <p className="text-lg font-medium">{project.overview.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Duration
                </h3>
                <p className="text-lg font-medium">{project.overview.duration}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Target Audience
                </h3>
                <p className="text-lg font-medium">
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
            </div>
          </Card>
        </div>
      </Section>

      {/* Challenge Section */}
      <Section variant="light" spacing="lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">
            The Challenge
          </h2>
          <Card variant="default" padding="lg">
            <ul className="space-y-4">
              {challenge.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🎯</span>
                  <span className="text-lg text-gray-700 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* Strategy Section */}
      <Section variant="default" spacing="lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">
            The Strategy
          </h2>

          {/* Phases (if exists) */}
          {project.strategy.phases && (
            <div className="mb-12">
              <div className="grid md:grid-cols-3 gap-6">
                {project.strategy.phases.map((phase, index) => (
                  <Card key={index} variant="hover" padding="lg">
                    <div className="text-4xl mb-4">
                      {index === 0 ? '🎯' : index === 1 ? '📝' : '🚀'}
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-2">
                      {phase.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{phase.duration}</p>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, taskIndex) => (
                        <li
                          key={taskIndex}
                          className="text-sm text-gray-700 flex items-start gap-2"
                        >
                          <span className="text-primary-500 flex-shrink-0">•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Brand Development (if exists) */}
          {project.strategy.brandDevelopment && (
            <div className="mb-12">
              <h3 className="text-2xl font-heading font-bold mb-6">
                Brand Development
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Color Palette */}
                <Card variant="default" padding="lg">
                  <h4 className="text-lg font-semibold mb-4">Color Palette</h4>
                  <div className="space-y-3">
                    {['primary', 'secondary', 'accent'].map((colorType) => {
                      const color =
                        project.strategy.brandDevelopment![
                          colorType as keyof typeof project.strategy.brandDevelopment
                        ];
                      const colorName =
                        project.strategy.brandDevelopment![
                          `${colorType}Name` as keyof typeof project.strategy.brandDevelopment
                        ];
                      return (
                        <div key={colorType} className="flex items-center gap-3">
                          <div
                            className="w-16 h-16 rounded-lg shadow-md"
                            style={{ backgroundColor: color as string }}
                          />
                          <div>
                            <p className="font-medium capitalize">{colorName}</p>
                            <p className="text-sm text-gray-500 font-mono">
                              {color}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* Brand Voice */}
                <Card variant="default" padding="lg">
                  <h4 className="text-lg font-semibold mb-4">Brand Voice</h4>
                  <p className="text-gray-700 mb-6">
                    {project.strategy.brandDevelopment.brandVoice}
                  </p>

                  <h4 className="text-lg font-semibold mb-4">Content Pillars</h4>
                  <div className="space-y-3">
                    {project.strategy.brandDevelopment.contentPillars?.map(
                      (pillar, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-sm">
                              {pillar.name}
                            </span>
                            <span className="text-primary-600 font-bold text-sm">
                              {pillar.percentage}%
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-primary rounded-full"
                              style={{ width: `${pillar.percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Content Strategy (if exists) */}
          {project.strategy.contentStrategy && (
            <Card variant="gradient" padding="lg" className="mb-12">
              <h3 className="text-2xl font-heading font-bold mb-6">
                Content Strategy
              </h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl mb-2">🎬</div>
                  <h4 className="font-semibold mb-1">Reels</h4>
                  <p className="text-gray-700">
                    {project.strategy.contentStrategy.reels}
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-2">📸</div>
                  <h4 className="font-semibold mb-1">Carousels</h4>
                  <p className="text-gray-700">
                    {project.strategy.contentStrategy.carousels}
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-2">📱</div>
                  <h4 className="font-semibold mb-1">Stories</h4>
                  <p className="text-gray-700">
                    {project.strategy.contentStrategy.stories}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Section>

      {/* Results Section */}
      <Section variant="light" spacing="lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">
            The Results
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.results.metrics.map((metric, index) => (
              <Card
                key={index}
                variant="hover"
                padding="lg"
                className="text-center"
              >
                <div className="text-5xl mb-3">{metric.icon}</div>
                <div className="text-4xl font-bold gradient-text mb-2">
                  {metric.value}
                </div>
                <p className="text-gray-600 font-medium">{metric.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <Section variant="default" spacing="lg">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-center">
              Project Gallery
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg group"
                >
                  <Image
                    src={image}
                    alt={`${title} - Image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <Section variant="gradient" spacing="lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's create a strategy that delivers results like these.
          </p>
          <Link href={`/${locale}#contact`}>
            <Button variant="gradient" size="lg">
              Start Your Project
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
