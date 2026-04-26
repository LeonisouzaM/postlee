import React from 'react';
import { Camera, Globe, Mail, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Produto',
    links: ['Como funciona', 'Templates', 'Integrações', 'Preços']
  },
  {
    title: 'Recursos',
    links: ['Blog', 'Tutoriais', 'Suporte', 'API Docs']
  },
  {
    title: 'Empresa',
    links: ['Sobre nós', 'Carreiras', 'Contato', 'Política de Privacidade', 'Termos de Uso']
  }
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 rounded-lg bg-[#5c54ed] flex items-center justify-center">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M12 4L4 12V20H12M12 4L20 12V20H12M12 4V20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </div>
               <span className="font-bold text-xl tracking-tight text-zinc-900">
                 Posta<span className="font-medium text-gray-400">.ai</span>
               </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-[280px] leading-relaxed mb-8 font-medium">
              A plataforma completa de IA e design para criadores, agências e marcas que querem crescer.
            </p>
            <div className="flex gap-4">
              {[Camera, Globe, Mail, Share2].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#5c54ed] hover:bg-indigo-50 transition-all border border-gray-100 shadow-sm">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col, i) => (
            <div key={i}>
              <h4 className="font-bold text-zinc-900 mb-6 text-sm uppercase tracking-widest">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-gray-500 hover:text-[#5c54ed] transition-colors text-sm font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            © 2026 Posta.ai. TODOS OS DIREITOS RESERVADOS.
          </p>
        </div>
      </div>
    </footer>
  );
}
