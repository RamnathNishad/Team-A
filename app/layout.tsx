import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'SmartLoan - Intelligent Loan Management',
  description: 'Fast, secure, and intelligent loan application and management platform',
  viewport: 'width=device-width, initial-scale=1',
  icons: '/favicon.ico',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
