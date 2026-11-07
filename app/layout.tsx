import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'Alex & Celine · Moon & Sun',
  description: 'Alex & Celine wedding — Moon & Sun, Bali.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
