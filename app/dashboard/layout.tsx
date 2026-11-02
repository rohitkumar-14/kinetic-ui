import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard & CRM UI Templates',
  description: 'Production-ready responsive dashboard, CRM tables, analytics KPI metric cards, and charts for modern SaaS applications.',
  alternates: {
    canonical: '/dashboard',
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
