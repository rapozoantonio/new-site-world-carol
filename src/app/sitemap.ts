import { MetadataRoute } from 'next';
import projectsData from '../../content-extraction/projects.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://newsitebycaro.com';
  const locales = ['en', 'es', 'pt'];
  const currentDate = new Date();

  // Main pages
  const mainPages = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
  ]);

  // Project pages
  const projectPages = locales.flatMap((locale) =>
    projectsData.projects.map((project) => ({
      url: `${baseUrl}/${locale}/projects/${project.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  return [...mainPages, ...projectPages];
}
