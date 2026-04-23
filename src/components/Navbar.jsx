import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#how-it-works', label: 'Produto' },
  { href: '#pricing',      label: 'Preços' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg border-b border-zinc-200 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="font-semibold tracking-tight text-zinc-900">
            Postlee<span className="text-indigo-500 font-normal">.ai</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-zinc-900 transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors px-3 py-2">Entrar</a>
          <a href="/register" className="btn-primary px-5 py-2.5">
            Começar Grátis
          </a>
        </div>

        <button className="md:hidden text-zinc-600" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-b border-zinc-200 px-6 py-6 flex flex-col gap-5 shadow-lg">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-lg font-medium text-zinc-800" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <hr className="border-zinc-100" />
          <a href="#pricing" className="btn-primary w-full justify-center">Começar Grátis</a>
        </div>
      )}
    </header>
  );
}
