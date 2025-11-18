import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Carolina Arango | Digital Marketing Specialist',
  description: 'Expert digital marketing services for vacation rentals. Transform your property into a must-book destination.',
  keywords: ['digital marketing', 'vacation rentals', 'social media management', 'paid advertising'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
