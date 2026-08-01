import type { Metadata } from 'next';
import Script from 'next/script';
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
      <head>
        <Script id="apollo-tracker" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
o.onload=function(){window.trackingFunctions.onLoad({appId:"6a4826e95dc1dc0018c57e26"})},
document.head.appendChild(o)}initApollo();`
        }} />
      </head>
      <body className="antialiased bg-[#000c2d] text-white overflow-x-clip min-h-screen">
        {children}
      </body>
    </html>
  );
}
