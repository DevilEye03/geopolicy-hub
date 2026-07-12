import '../styles/reset.css';
import '../styles/tokens.css';
import '../styles/typography.css';
import '../styles/layout.css';
import '../styles/components.css';
import '../styles/pages.css';

import { MainLayout } from '../components/layout/MainLayout';

export const metadata = {
  title: 'GeoPolicy Hub',
  description: 'A platform for geopolitical analysis.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
