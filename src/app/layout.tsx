import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import AppProviders from '@/components/providers/AppProviders';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Addis Sans — Ethiopian Amharic luxury typeface
// Path is relative to THIS file (src/app/layout.tsx → ../../public/fonts/)
const addisSans = localFont({
  src: [
    {
      path: '../../public/fonts/Addis-Sans.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Addis-Sans-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-amharic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ICON FURNITURE | Master Handcrafted Luxury Dining Tables',
  description:
    'Bespoke luxury dining tables handcrafted from solid kiln-dried American walnut, quarter-sawn white oak, and honed Roman travertine stone. The generational centerpiece of the home.',
  icons: {
    icon: [
      { url: '/assets/if-favicon.png' },
      { url: '/if-favicon.png' },
    ],
    shortcut: '/assets/if-favicon.png',
    apple: '/assets/if-favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} ${addisSans.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-[#f7f5f0] text-[#121417]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
