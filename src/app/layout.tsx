import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bocancorp',
  description: 'Bocancorp - High-Level Software Creation and Cloud Services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#000c2d] text-white overflow-x-clip min-h-screen">
        {children}
      </body>
    </html>
  );
}
