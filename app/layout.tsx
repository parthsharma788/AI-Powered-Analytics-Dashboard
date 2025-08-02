// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';        // Tailwind or existing global styles
import '/style.css';           // Import your public/style.css

export const metadata: Metadata = {
  title: 'ADmyBRAND Analytics Dashboard',
  description: 'Real-time analytics and insights dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
