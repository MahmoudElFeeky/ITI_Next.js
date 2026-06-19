import { Outfit } from 'next/font/google';
import "./globals.css";

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body style={{ 
        margin: 0, 
        backgroundColor: '#09090b', 
        color: '#f4f4f5', 
        fontFamily: 'var(--font-outfit), sans-serif',
        minHeight: '100vh',
        overflowX: 'hidden'
      }}>
        {children}
      </body>
    </html>
  );
}