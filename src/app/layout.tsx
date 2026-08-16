import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

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
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-[#f7f5f0] text-[#121417]">
        {children}
      </body>
    </html>
  );
}
