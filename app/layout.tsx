import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ConvexWithClerk } from '@/provider/ConvexWithClerk';
import { ThemeProvider } from '@/provider/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import NextTopLoader from 'nextjs-toploader';

const poppins = Poppins({ subsets: ['latin'], weight: '500' });

export const metadata: Metadata = {
  title: 'Smashback',
  description: 'Get paid for listening to your users',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <NextTopLoader color='#EA580C' />
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          disableTransitionOnChange
        >
          <ConvexWithClerk>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster />
          </ConvexWithClerk>
        </ThemeProvider>
      </body>
    </html>
  );
}
