import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'XNOPay - Nano Payment Processor',
  description: 'Secure and fast Nano payments with XNOPay',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}