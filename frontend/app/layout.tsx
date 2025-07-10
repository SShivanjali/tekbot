import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TekBot',
  description: 'Tekweiser AI chat bot',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/bot.png" type="image/png" />
        {/* You can also use favicon.ico if you have it */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}