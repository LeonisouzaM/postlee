import React from 'react';
import { Hexagon, Triangle, Circle, Square, Box } from 'lucide-react';

const logos = [
  { name: 'StartSe', icon: Square, color: 'text-orange-500' },
  { name: 'RD Station', icon: Hexagon, color: 'text-cyan-600' },
  { name: 'Rock Content', icon: Box, color: 'text-rose-500' },
  { name: 'Sympla', icon: Triangle, color: 'text-blue-500' },
  { name: 'VTEX', icon: Circle, color: 'text-pink-600' }
];

export default function LogoBar() {
  return (
    <div className="bg-white border-y border-zinc-100">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-14">
        <span className="text-[11px] font-medium tracking-wider uppercase text-zinc-400 shrink-0">
          Empresas que confiam
        </span>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map(logo => (
            <div key={logo.name} className="flex items-center gap-2.5 text-zinc-800 hover:opacity-80 transition-opacity select-none group">
              <logo.icon size={20} className={`shrink-0 ${logo.color}`} strokeWidth={3} />
              <span className="text-[17px] font-extrabold tracking-tight">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
