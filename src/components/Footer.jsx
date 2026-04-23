import React from 'react';

const navLinks = {
  Produto:  ['Funcionalidades', 'Como funciona', 'Preços', 'Changelog'],
  Recursos: ['Blog', 'Tutoriais', 'Suporte', 'API Docs'],
  Legal:    ['Privacidade', 'Termos', 'Contato'],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-[200px_1fr] gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">P</span>
            </div>
            <span className="font-semibold tracking-tight text-zinc-900">
              Postlee<span className="text-indigo-500 font-normal">.ai</span>
            </span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed max-w-[180px]">
            Automação inteligente de conteúdo para criadores e marcas que não param.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {Object.entries(navLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-900 mb-3">{section}</p>
              <ul className="flex flex-col gap-2">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-zinc-400">© 2026 Postlee Tecnologia Ltda. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[11px] text-zinc-400 hover:text-zinc-900 transition-colors">Twitter</a>
            <a href="#" className="text-[11px] text-zinc-400 hover:text-zinc-900 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
