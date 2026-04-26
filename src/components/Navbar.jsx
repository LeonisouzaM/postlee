import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const links = [
  { href: '#produto', label: 'Produto' },
  { href: '#templates', label: 'Templates' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#recursos', label: 'Recursos' },
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
          ? 'bg-white/80 backdrop-blur-md border-b border-zinc-200'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="section-container h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#5c54ed] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12V20H12M12 4L20 12V20H12M12 4V20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight text-zinc-900">
            Posta<span className="font-medium text-gray-400">.ai</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-10 text-sm font-medium text-gray-500">
          {links.map(l => (
            <a key={l.label} href={l.href} className="hover:text-[#5c54ed] transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-4 py-2">
            Entrar
          </Link>
          <Link to="/register" className="btn-primary px-5 py-2.5 rounded-[10px] text-sm font-bold">
            Começar grátis →
          </Link>
        </div>

        <button className="lg:hidden text-zinc-600" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden absolute top-full inset-x-0 bg-white border-b border-zinc-200 p-6 flex flex-col gap-4 shadow-xl animate-fade-in">
          {links.map(l => (
            <a key={l.label} href={l.href} className="text-lg font-semibold text-gray-800" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <hr className="border-gray-100" />
          <div className="flex flex-col gap-3">
            <Link to="/login" className="btn-secondary w-full">Entrar</Link>
            <Link to="/register" className="btn-primary w-full">Começar grátis</Link>
          </div>
        </div>
      )}
    </header>
  );
}
