import { Metadata } from 'next';
import CinemaClient from '@/components/cinema/CinemaClient';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Atelier Cinema & Visual Journal | ICON FURNITURE',
  description:
    'Experience our bespoke architectural furniture in motion. High-definition cinema documenting solid timber craftsmanship, tactile fabrics, and living room vignettes.',
};

export default function CinemaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <CinemaClient />
      </main>
      <Footer />
    </>
  );
}
