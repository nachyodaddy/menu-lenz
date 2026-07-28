import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu LENZ | Visual Companion App for My25 Residential Management',
  description: 'AI-assisted visual meal planning, handwritten kitchen note OCR parser, dietary compliance tracking, dynamic QR meal logging, and grocery budget ecosystem for residential communities.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-base text-slate-100 antialiased selection:bg-brand-500 selection:text-dark-base">
        {children}
      </body>
    </html>
  );
}
