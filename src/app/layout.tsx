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
  title: 'ICON FURNITURE | Editorial Modern Living & Timeless Craftsmanship',
  description:
    'Curated upscale furniture handcrafted from sustainable solid woods, tactile fabrics, and architectural stonework. Designed to elevate modern living spaces.',
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
