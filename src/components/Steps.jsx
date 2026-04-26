import React from 'react';
import { PenTool, Wand2, Share2, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Escreva sua ideia',
    description: 'Conte sobre o tema, sua audiência e o objetivo do carrossel.',
    icon: PenTool
  },
  {
    id: '02',
    title: 'IA cria o carrossel',
    description: 'A IA gera o conteúdo e o design com a identidade da sua marca.',
    icon: Wand2
  },
  {
    id: '03',
    title: 'Revise e publique',
    description: 'Edite como quiser, agende e publique direto nas suas redes.',
    icon: Share2
  }
];

export default function Steps() {
  return (
    <section className="py-24 lg:py-32 bg-[#fafafa]" id="como-funciona">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="w-full lg:w-1/3">
                <div className="badge mb-6">COMO FUNCIONA</div>
                <h2 className="text-4xl font-extrabold text-zinc-900 leading-tight mb-6">
                    Do texto à publicação em 3 passos simples
                </h2>
                <p className="text-gray-500 text-lg">
                    Crie carrosséis incríveis em minutos, mesmo sem ser designer.
                </p>
            </div>

            <div className="w-full lg:w-2/3">
                <div className="grid md:grid-cols-3 gap-6 relative">
                    {steps.map((s, i) => (
                        <div key={i} className="relative p-8 bg-white rounded-3xl border border-gray-100 shadow-sm z-10 flex flex-col items-start group">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5c54ed] flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                                <s.icon size={24} />
                            </div>
                            <span className="text-[11px] font-bold text-gray-300 uppercase mb-2 tracking-widest">{s.id}</span>
                            <h3 className="text-xl font-extrabold text-zinc-900 mb-3">{s.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {s.description}
                            </p>

                            {i < steps.length - 1 && (
                                <div className="hidden md:flex absolute top-1/2 -right-5 translate-x-1/2 -translate-y-1/2 text-[#5c54ed] z-20 opacity-50">
                                    <ArrowRight size={20} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}
