'use client';

import { Linkedin } from 'lucide-react';

export default function Footer({ dict }: { dict: any }) {
  return (
    <footer className="py-8 text-center text-gray-500 text-xs border-t border-white/5 bg-black">
      <p className="mb-2">{dict.copyright} <span className="text-emerald-500">Amelia Benelhadj</span></p>
      <div className="flex justify-center gap-4 items-center">
        <a href="#" className="hover:text-white transition-colors">{dict.terms}</a>
        <span>-</span>
        <a href="#" className="hover:text-white transition-colors">{dict.privacy}</a>
        <span className="mx-2">|</span>
        <a href="https://www.linkedin.com/company/ba%E1%B9%A3ma-%D8%A8%D8%B5%D9%85%D8%A9/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0077b5] transition-colors">
            <Linkedin size={16} />
        </a>
      </div>
    </footer>
  );
}
