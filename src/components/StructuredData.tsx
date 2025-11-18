import siteContent from '../../content-extraction/site-content.json';

export default function StructuredData({ locale }: { locale: 'en' | 'es' | 'pt' }) {
  const localeData = siteContent[locale];
  const contact = siteContent.site.contact;
  const social = siteContent.site.social;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'NewSite by Carolina Arango',
    alternateName: 'NewSite',
    description: localeData.meta.description,
    url: 'https://newsitebycaro.com',
    logo: 'https://newsitebycaro.com/images/logo.png',
    image: 'https://newsitebycaro.com/images/og-image.jpg',
    telephone: contact.phone,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    sameAs: [
      social.facebook,
      social.instagram,
      social.linkedin,
      social.medium,
    ],
    priceRange: '$$',
    founder: {
      '@type': 'Person',
      name: 'Carolina Arango',
      jobTitle: 'Digital Marketing Specialist',
      description: 'Social Media Manager and digital marketing specialist for vacation rentals',
      image: 'https://newsitebycaro.com/images/profile-picture2.png',
      sameAs: [
        social.linkedin,
        social.instagram,
      ],
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    serviceType: [
      'Digital Marketing',
      'Social Media Management',
      'Paid Advertising',
      'Vacation Rental Marketing',
      'Content Creation',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Marketing Services',
      itemListElement: localeData.services.items.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
        },
        position: index + 1,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
