import React from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const templates = [
  {
    title: 'Checklist para um perfil que vende todos os dias',
    color: 'bg-[#1a1a1a]',
    textColor: 'text-white'
  },
  {
    title: 'Os 4 pilares de um conteúdo que conecta',
    color: 'bg-[#f8f9fa]',
    textColor: 'text-zinc-900'
  },
  {
    title: 'Erros que podem estar matando seu engajamento',
    color: 'bg-[#7e6ef4]',
    textColor: 'text-white'
  },
  {
    title: 'Como organizar suas ideias para nunca mais travar',
    color: 'bg-[#fdf9f0]',
    textColor: 'text-zinc-900'
  }
];

export default function TemplateShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-white" id="templates">
      <div className="section-container">
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left side text */}
            <div className="w-full lg:w-1/3 shrink-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-600 uppercase tracking-wider mb-6">
                    TEMPLATES PROFISSIONAIS
                </div>
                <h2 className="text-[32px] md:text-[40px] font-extrabold text-zinc-900 leading-[1.1] mb-6 tracking-tight">
                    Templates prontos para qualquer tema e nicho
                </h2>
                <p className="text-gray-500 text-[17px] mb-8 leading-relaxed">
                    Milhares de combinações feitas por designers especialistas para você se destacar no feed.
                </p>
                <button className="px-6 py-3 rounded-xl border-2 border-zinc-200 text-zinc-900 font-bold hover:border-indigo-600 hover:text-indigo-600 transition-colors">
                    Ver templates
                </button>
            </div>

            {/* Right side templates map */}
            <div className="w-full lg:w-2/3 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {templates.map((t, i) => (
                    <div key={i} className={`shrink-0 w-[240px] ${t.color} aspect-[4/5] rounded-[24px] p-8 shadow-sm flex flex-col justify-between group cursor-pointer snap-center`}>
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-8 h-8 rounded-full border ${t.textColor === 'text-white' ? 'border-white/20' : 'border-zinc-900/10'} flex items-center justify-center`}>
                                    <span className={`text-[10px] font-bold opacity-70 ${t.textColor}`}>1/10</span>
                                </div>
                            </div>
                            <h3 className={`text-[19px] font-extrabold leading-tight ${t.textColor}`}>
                                {t.title}
                            </h3>
                        </div>

                        <div className="flex flex-col gap-3">
                             {[1,2,3,4].map(line => (
                                 <div key={line} className={`h-1.5 rounded-full ${t.textColor === 'text-white' ? 'bg-white/10' : 'bg-zinc-900/5'}`} style={{width: `${100 - line*10}%`}} />
                             ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>

        <div className="mt-12 hidden lg:flex justify-end gap-2 pr-10">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                <ChevronRight size={20} />
            </button>
        </div>

      </div>
    </section>
  );
}
