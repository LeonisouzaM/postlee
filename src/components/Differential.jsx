import React from 'react';
import { Component, Wand2, RefreshCw } from 'lucide-react';

const diffs = [
  { icon: Component, title: 'Branding automático em cada slide', desc: 'Envie sua logo e defina suas cores uma vez. Todos os carrosséis respeitam pixel a pixel o seu guia visual.' },
  { icon: Wand2,     title: 'Notícias do seu nicho viram posts', desc: 'A IA monitora fontes do seu segmento e transforma pautas relevantes em conteúdo fresco e informativo.' },
  { icon: RefreshCw, title: 'AutoFeed: seu perfil nunca para', desc: 'Mantenha o feed ativo mesmo nas férias. Agende 30 dias de conteúdo de impacto em menos de 1 hora.' },
];

export default function Differential() {
  return (
    <section className="section-padding bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — text */}
          <div>
            <span className="tag mb-5">Diferenciais</span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-10">
              Poder de agência. <br />
              Simplicidade de app.
            </h2>

            <div className="flex flex-col gap-8">
              {diffs.map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-zinc-900 mb-1">{title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — UI Preview */}
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-100/30 blur-[60px] rounded-full pointer-events-none" />
            <div className="relative bg-white border border-zinc-200 rounded-2xl shadow-xl shadow-zinc-900/5 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-zinc-700">Motor de conteúdo ativo</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 border border-zinc-200 px-2 py-0.5 rounded">v2.0</span>
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Suggestion cards */}
                {[
                  { platform: 'Instagram', time: 'Ter · 18:00', text: '3 erros silenciosos que destroem o alcance do seu negócio', approved: true },
                  { platform: 'LinkedIn', time: 'Qua · 09:00', text: 'O que aprendi gerenciando as redes de 12 pequenas empresas', approved: false },
                ].map((post, i) => (
                  <div key={i} className={`rounded-xl p-4 border ${post.approved ? 'border-indigo-200 bg-indigo-50/50' : 'border-zinc-200 bg-white'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-semibold text-zinc-500">{post.platform}</span>
                      <span className="text-[10px] text-zinc-400">{post.time}</span>
                    </div>
                    <p className="text-sm text-zinc-800 font-medium mb-3">"{post.text}"</p>
                    {post.approved 
                      ? <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Aprovado</span>
                      : <button className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors">Aprovar</button>
                    }
                  </div>
                ))}

                {/* Progress */}
                <div className="pt-2">
                  <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full w-2/3 transition-all" />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-mono text-zinc-400">Lote semanal</span>
                    <span className="text-[10px] font-mono text-indigo-600 font-semibold">65% completo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
