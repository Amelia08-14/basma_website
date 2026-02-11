'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar({ dict, lang }: { dict: any, lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: dict.about, href: `/${lang}/#impact` },
    { name: dict.solutions, href: `/${lang}/solutions` },
    { name: dict.expertise, href: `/${lang}/#expertise` },
    { name: dict.contact, href: `/${lang}/#contact` },
  ];

  const targetLang = lang === 'en' ? 'fr' : 'en';
  const newPath = pathname ? pathname.replace(`/${lang}`, `/${targetLang}`) : `/${targetLang}`;

  return (
    <nav className="fixed w-full z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href={`/${lang}`} className="flex items-center gap-2">
                <img src="/logo_basma.png" alt="Basma Logo" className="h-20 w-auto object-contain" />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="ml-8 border-l border-white/20 pl-6">
                <Link href={newPath} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-medium">
                    <Globe size={18} />
                    <span>{lang === 'en' ? 'FR' : 'EN'}</span>
                </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link href={newPath} className="text-gray-300 hover:text-white">
                <span className="font-bold">{lang === 'en' ? 'FR' : 'EN'}</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
