import type { Metadata } from 'next';
import AdminDashboardClient from '@/components/admin/AdminDashboardClient';

export const metadata: Metadata = {
  title: 'Atelier Console & Frontend Management | ICON FURNITURE',
  description: 'Control dining table catalog, pricing in ETB, films, inquiries, and site configuration.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}
