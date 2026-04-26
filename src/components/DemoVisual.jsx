import React from 'react';
import { Play, Check } from 'lucide-react';

export default function DemoVisual() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-16 px-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Veja o Posta.ai em ação</h2>
        <p className="text-slate-400 text-lg">A interface mais limpa e intuitiva que você já usou. Desenhada para criar e não para confundir.</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="glass rounded-[2rem] border border-white/10 p-2 md:p-6 shadow-2xl relative group">
          
          {/* Mockup Window Controls */}
          <div className="flex items-center gap-2 mb-4 px-4 w-full">
             <div className="w-3 h-3 rounded-full bg-slate-600"></div>
             <div className="w-3 h-3 rounded-full bg-slate-600"></div>
             <div className="w-3 h-3 rounded-full bg-slate-600"></div>
             <div className="ml-auto text-xs text-slate-500 font-medium">app.Posta.ai</div>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] md:aspect-[16/8] bg-dark-900 border border-white/5">
             {/* Fake UI Background */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
             
             {/* Play Button Overlay */}
             <div className="absolute inset-0 flex items-center justify-center bg-dark-900/40 backdrop-blur-sm group-hover:bg-dark-900/20 transition-all cursor-pointer">
               <div className="w-20 h-20 bg-white/10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                 <Play className="w-8 h-8 text-white ml-2" />
               </div>
             </div>

             {/* UI Cards Mockups overlaying */}
             <div className="absolute left-8 h-full py-8 flex flex-col justify-center gap-4 hidden md:flex pointer-events-none">
                <div className="glass p-4 rounded-xl border border-white/10 w-64 bg-dark-800/80 backdrop-blur-md">
                   <p className="text-xs text-slate-400 mb-2">Engajamento Mensal</p>
                   <div className="flex items-end gap-2 mb-3">
                     <h3 className="text-2xl font-bold text-white">24.5k</h3>
                     <span className="text-green-400 text-sm mb-1">+12%</span>
                   </div>
                   <div className="h-10 flex items-end gap-1">
                     {[4,6,5,8,7,9,12].map((h, i) => (
                       <div key={i} className="bg-brand-500 rounded-t-sm w-full transition-all" style={{height: `${h*8}%`}}></div>
                     ))}
                   </div>
                </div>

                <div className="glass p-4 rounded-xl border border-white/10 w-64 bg-dark-800/80 backdrop-blur-md">
                   <p className="text-xs text-brand-400 font-medium mb-1">Próximo Post</p>
                   <p className="text-sm text-white font-medium mb-2">Lançamento de Produto</p>
                   <div className="flex items-center gap-2">
                     <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Hoje, 18:00</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
