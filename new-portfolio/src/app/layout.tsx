import type { Metadata } from 'next';
import { Nunito, Poppins } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

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
