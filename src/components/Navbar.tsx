'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

// Added Blog link
const mainLinks = [
  { label: 'Home', href: '/' },
  { label: 'Offers', href: '/offers' },
  { label: 'Prop Firms', href: '/prop-firms' },
  { label: 'Brokers', href: '/brokers' },
  { label: 'Compare', href: '/compare' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Blog', href: '/blog' }, // 👈 Added Blog here
  { label: 'Login', href: '/login' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ease-in-out px-6 py-4 border-b backdrop-blur-md ${
          scrolled ? 'shadow-md bg-black/80' : 'bg-black border-zinc-800'
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between text-white">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            Insight <span className="text-pink-500">Pip</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-pink-500 ${
                  isClient && pathname === link.href
                    ? 'text-pink-600 underline underline-offset-4'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Sign Up Button */}
            <Link
              href="/signup"
              className="ml-4 px-4 py-2 font-medium rounded-xl text-white bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 transition-all ring-2 ring-pink-400 ring-offset-2 ring-offset-black"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded hover:bg-zinc-800 text-white"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 px-6 pb-4 bg-black text-white">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`hover:text-pink-500 ${
                isClient && pathname === link.href ? 'text-pink-600 underline' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Sign Up Button in Mobile Menu */}
          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 text-center font-semibold text-white rounded-xl bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 ring-2 ring-pink-400 ring-offset-2 ring-offset-black transition-all"
          >
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
}
