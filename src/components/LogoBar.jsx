import React from 'react';

const logos = [
  { name: 'RD Station', icon: 'RD' },
  { name: 'Rock Content', icon: 'RC' },
  { name: 'StartSe', icon: 'SS' },
  { name: 'Syrup', icon: 'SY' },
  { name: 'VTEX', icon: 'VT' },
];

export default function LogoBar() {
  return (
    <section className="py-12 border-y border-gray-100 bg-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 opacity-50 grayscale">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest max-w-[140px] text-center md:text-left leading-tight">
            CONFIADO POR MAKES QUE CRIAM CONTEÚDO TODOS OS DIAS
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-16 items-center flex-1">
            {logos.map(logo => (
              <div key={logo.name} className="flex items-center gap-2 group transition-all hover:grayscale-0 hover:opacity-100">
                <span className="font-extrabold text-zinc-900 text-xl tracking-tighter">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
