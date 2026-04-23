import React from 'react';
import { Palette, Sparkles, Send, CheckCircle2, Bot } from 'lucide-react';

const steps = [
  {
    tag: 'Passo 1',
    title: 'Ensine a IA sobre a sua marca',
    desc: 'Sem formulários chatos. Apenas nos diga suas cores, cole sua logo e escreva 3 linhas sobre o que você faz. Nosso motor entende seu tom de voz em segundos.',
    icon: Palette,
    color: 'bg-violet-500',
    Visual: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-white flex items-center justify-center p-6">
        <div className="w-full max-w-[200px] space-y-3 bg-white p-4 rounded-xl shadow-sm border border-violet-100">
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-violet-600 shadow-sm" />
            <div className="w-6 h-6 rounded-full bg-indigo-500 shadow-sm" />
            <div className="w-6 h-6 rounded-full bg-zinc-900 shadow-sm" />
          </div>
          <div className="h-2 bg-zinc-100 rounded-full w-full" />
          <div className="h-2 bg-zinc-100 rounded-full w-4/5" />
        </div>
      </div>
    )
  },
  {
    tag: 'Passo 2',
    title: 'A fábrica de conteúdo gira',
    desc: 'Você vai dormir. A Inteligência Artificial acorda, estuda seu nicho e escreve/desenha carrosséis inteiros de alto engajamento, colocando-os na sua fila.',
    icon: Bot,
    color: 'bg-indigo-500',
    Visual: () => (
      <div className="absolute inset-0 bg-gradient-to-bl from-indigo-50 to-white flex items-center justify-center p-6">
         <div className="grid grid-cols-2 gap-2 w-full max-w-[200px]">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square bg-white rounded-lg shadow-sm border border-indigo-100 flex items-center justify-center relative overflow-hidden">
                <Sparkles size={16} className={i % 2 === 0 ? 'text-indigo-300' : 'text-indigo-500'} />
                {i === 1 && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-400 rounded-full" />}
              </div>
            ))}
         </div>
      </div>
    )
  },
  {
    tag: 'Passo 3',
    title: 'Revise com 1 clique. Nós postamos.',
    desc: 'Gostou do Post? Clique em aprovar. Nossa conexão oficial com a Meta publica a imagem e a legenda com as hashtags exatas no melhor horário do seu perfil.',
    icon: Send,
    color: 'bg-emerald-500',
    Visual: () => (
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50 to-white flex items-center justify-center p-6">
        <div className="w-[140px] h-[180px] bg-white rounded-2xl shadow-sm border border-emerald-100 flex flex-col overflow-hidden relative">
          <div className="h-8 bg-zinc-50 border-b border-emerald-50 flex items-center px-3 gap-1.5">
            <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center"><CheckCircle2 size={10} className="text-emerald-600"/></div>
            <div className="h-1.5 bg-zinc-200 rounded-full w-12" />
          </div>
          <div className="flex-1 bg-zinc-100 m-2 rounded-lg" />
          <div className="h-6 bg-emerald-500 absolute bottom-0 left-0 w-full flex items-center justify-center">
            <span className="text-[8px] font-bold text-white uppercase tracking-widest">Publicado</span>
          </div>
        </div>
      </div>
    )
  }
];

export default function Steps() {
  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 animate-fade-up">
          <span className="tag mb-4">Como funciona</span>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-4">
            Em 5 minutos,<br className="hidden sm:block"/> o piloto automático assume.
          </h2>
          <p className="text-zinc-500 text-lg leading-relaxed">
            Nós transformamos o trabalho de 3 dias de uma agência num processo de 3 passos intuitivos dentro da sua tela.
          </p>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {steps.map((step, index) => {
            const isEven = index % 2 === 1;
            
            return (
              <div key={index} className={`flex flex-col gap-8 lg:gap-16 items-center ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${step.color} bg-opacity-10 text-sm font-bold mb-6`}>
                    <step.icon size={16} className={`text-${step.color.split('-')[1]}-600`} />
                    <span className={`text-${step.color.split('-')[1]}-700`}>{step.tag}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">{step.title}</h3>
                  <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                    {step.desc}
                  </p>
                </div>

                {/* Visual Block */}
                <div className="flex-1 w-full max-w-md">
                  <div className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-100 shadow-xl shadow-zinc-900/5 group">
                    <step.Visual />
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
