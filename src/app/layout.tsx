import type { Metadata } from 'next';
import { Source_Code_Pro } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';

const fontCode = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-code',
});

export const metadata: Metadata = {
  title: 'Pokedex',
  description: 'Your ultimate pokemon directory',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'bg-[#282c34] min-h-screen scroll-smooth',
          fontCode.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
