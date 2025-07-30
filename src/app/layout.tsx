'use client';

import './globals.css';
import Navbar from '../components/Navbar'; // ✅ Adjust path if needed

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
