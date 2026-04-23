import React from 'react';
import { Sparkles, Palette, Share2 } from 'lucide-react';

const features = [
  { 
    icon: Sparkles, 
    title: 'IA que entende seu nicho', 
    desc: 'Nossa IA analisa o histórico da sua marca e o comportamento do seu público para gerar textos e ideias que conectam de verdade.',
    colSpan: 'md:col-span-2',
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-50',
  },
  { 
    icon: Palette,  
    title: 'Design coerente', 
    desc: 'Seu manual da marca aplicado automaticamente em cada carrossel gerado.',
    colSpan: 'md:col-span-1',
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-50',
  },
  { 
    icon: Share2,       
    title: 'Publicação automatizada e inteligente', 
    desc: 'O sistema identifica os horários de maior engajamento dos seus seguidores e agenda a publicação no momento exato, nas plataformas certas.',
    colSpan: 'md:col-span-3',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
  },
];

export default function Solution() {
  return (
    <section className="section-padding bg-[#fafafa]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="tag mb-4">Plataforma</span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-4">
            O copywriter que não tira férias,<br />
            o designer que nunca atrasa.
          </h2>
          <p className="text-zinc-500 text-[16px] leading-relaxed">
            A dor não é postar — é saber o que postar e manter a qualidade visual
            todos os dias. A Postlee resolve as duas coisas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc, colSpan, iconColor, iconBg }, i) => (
            <div key={i} className={`${colSpan} p-8 rounded-2xl bg-white border border-zinc-200/80 transition-all duration-200 hover:shadow-lg hover:shadow-zinc-900/5 hover:border-zinc-300 group`}>
              <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center mb-5`}>
                <Icon size={20} className={iconColor} />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">{title}</h3>
              <p className="text-zinc-500 text-[14px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
