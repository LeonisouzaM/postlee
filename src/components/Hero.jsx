import React from 'react';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/60 via-white to-[#fafafa] pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Badge */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-100 bg-white shadow-sm">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-medium text-zinc-600">Parceiro Oficial Meta Business</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-6 animate-fade-up">
          <h1 className="text-4xl md:text-[3.5rem] lg:text-[4rem] font-bold tracking-tight text-zinc-900 leading-[1.1]">
            Nunca mais crie um <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">post do zero.</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-center text-zinc-500 text-lg leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up" style={{animationDelay:'80ms'}}>
          A Postlee é seu designer e social media movido a IA. Criamos carrosséis 
          no seu tom de voz, com as cores da sua marca, e agendamos automaticamente.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 animate-fade-up" style={{animationDelay:'160ms'}}>
          <a href="/register" className="btn-primary px-8 py-3.5 text-[15px]">
            Começar Gratuitamente <ArrowRight className="w-4 h-4" />
          </a>
          <button className="btn-ghost px-8 py-3.5 text-[15px]">
            Ver demonstração
          </button>
        </div>

        {/* Trust markers */}
        <div className="flex flex-wrap justify-center gap-6 mb-20 animate-fade-in" style={{animationDelay:'240ms'}}>
          {['Sem cartão de crédito', '7 dias grátis', 'Cancele quando quiser'].map(t => (
            <span key={t} className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
              <Check size={13} className="text-emerald-500" /> {t}
            </span>
          ))}
        </div>

        {/* Dashboard Mockup */}
        <div className="relative max-w-4xl mx-auto animate-fade-up" style={{animationDelay:'320ms'}}>
          {/* Glow behind */}
          <div className="absolute -inset-8 bg-indigo-200/20 blur-[60px] rounded-full pointer-events-none" />

          <div className="relative rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/5 overflow-hidden">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100 bg-zinc-50">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
              </div>
              <div className="ml-4 flex-1 h-5 max-w-xs bg-zinc-100 rounded-md flex items-center justify-center">
                <span className="text-[10px] text-zinc-400 font-mono">app.postlee.ai/feed</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-10">
              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Agendados', value: '24', color: 'text-indigo-600' },
                  { label: 'Alcance', value: '18.4K', color: 'text-zinc-800' },
                  { label: 'Engajamento', value: '6.2%', color: 'text-zinc-800' },
                  { label: 'Ideias IA', value: '7', color: 'text-indigo-600' },
                ].map((m,i) => (
                  <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-xl p-4">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">{m.label}</div>
                    <div className={`text-2xl font-bold ${m.color}`}>{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Calendar preview */}
              <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-zinc-700">Calendário — Abril 2026</span>
                  <span className="text-[10px] font-mono text-zinc-400">Semana 17</span>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {['S','T','Q','Q','S','S','D'].map((d,i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-medium text-zinc-400">{d}</span>
                      <div className={`w-full h-12 rounded-lg border ${
                        i === 1 ? 'bg-indigo-50 border-indigo-200' : 
                        i === 4 ? 'bg-violet-50 border-violet-200' : 
                        'bg-white border-zinc-100'
                      } flex items-center justify-center`}>
                        {i === 1 && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                        {i === 4 && <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AutoFeed status */}
              <div className="mt-6 flex justify-center">
                <div className="inline-flex items-center gap-2 border border-zinc-200 bg-white rounded-full px-4 py-2 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-medium text-zinc-600">AutoFeed: Próximo post em 14h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
