import type { Metadata } from 'next';
import { Geist, Lora } from 'next/font/google';
import './globals.css';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'GoldSense™ — AI Digital Karatometer by IGM',
    template: '%s | GoldSense™',
  },
  description:
    "GoldSense™ is IGM's AI digital karatometer — a handheld, non-destructive gold purity tester by India Gold Metaverse.",
  openGraph: {
    siteName: 'GoldSense™',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${lora.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
