import { useTranslations } from 'next-intl';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import BlogSection from '@/components/sections/BlogSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
