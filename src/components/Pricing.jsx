import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Essencial',
    discount: '40% OFF',
    originalPrice: 'R$160/mês',
    price: '97',
    highlightedFeature: '12 carrosséis mensais',
    subtitle: 'Funcionalidades básicas:',
    cta: 'Experimente agora',
    featured: false,
    dark: false,
    features: [
      '1 Perfil Instagram',
      'Editor Visual de Slides',
      'Configuração Básica de Paleta',
      'Painel de aprovação',
      'Respostas de suporte em até 24h',
    ],
  },
  {
    name: 'Plus',
    discount: '33% OFF',
    originalPrice: 'R$294/mês',
    price: '197',
    highlightedFeature: '30 carrosséis mensais',
    subtitle: 'Tudo no plano Essencial, e mais:',
    cta: 'Assinar Plano Plus',
    featured: true,
    badge: 'Mais vendido',
    dark: false,
    features: [
      'Até 3 Perfis Integrados',
      'Brand DNA Pleno (Tom de Voz)',
      'Conversor Mágico de URLs/Artigos',
      'Otimização de Retenção nos Slides',
      'AutoFeed de Publicação Direta',
    ],
  },
  {
    name: 'Agência',
    discount: '50% OFF',
    originalPrice: 'R$994/mês',
    price: '497',
    highlightedFeature: 'Projetos ilimitados',
    subtitle: 'Tudo no plano Plus, e mais:',
    cta: 'Entrar em contato',
    featured: false,
    dark: true,
    features: [
      'Até 10 Marcas/Projetos',
      'Carrosséis gerados Ilimitados',
      'Treinamento Fino de Brand DNA',
      'Painel de Aprovação para Cliente',
      'Workflow Avançado de Equipe',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="precos" className="section-padding bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="tag mb-4">Preços</span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-4">
            Simples, justo e sem surpresas.
          </h2>
          <p className="text-zinc-500 text-[16px]">
            Mais barato que um freelancer. Mais constante que uma agência.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`relative flex flex-col p-8 rounded-[20px] transition-all duration-200
                ${p.featured
                  ? 'bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-600/10'
                  : p.dark
                    ? 'bg-[#0f172a] border border-[#1e293b]'
                    : 'bg-white border border-zinc-200 shadow-sm'}
              `}
            >
              {/* Badge Top Middle */}
              {p.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#064e3b] text-white text-[11px] font-bold tracking-wide px-4 py-1 rounded-full shadow-md z-10">
                  {p.badge}
                </div>
              )}

              {/* Header: Title and Discount Pill */}
              <div className="flex items-start justify-between mb-4">
                <h3 className={`text-xl font-bold ${p.dark ? 'text-white' : 'text-zinc-900'}`}>
                  {p.name}
                </h3>
                {p.discount && (
                  <div className="bg-[#dcfce7] text-[#166534] text-[11px] font-bold px-3 py-1 rounded-full">
                    {p.discount}
                  </div>
                )}
              </div>

              {/* Prices */}
              <div className="mb-6">
                <span className={`text-sm line-through block mb-1 font-medium ${p.dark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {p.originalPrice}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl md:text-[40px] font-extrabold tracking-tight ${p.dark ? 'text-white' : 'text-zinc-900'}`}>
                    R${p.price}
                  </span>
                  <span className={`text-sm font-medium ${p.dark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    /mês
                  </span>
                </div>
              </div>

              {/* Highlighted Feature */}
              <div className={`flex items-center gap-2 mb-6 text-[15px] font-bold ${p.dark ? 'text-white' : 'text-zinc-900'}`}>
                <Check size={18} strokeWidth={3} className={p.dark ? 'text-[#facc15]' : 'text-indigo-600'} />
                <span>{p.highlightedFeature}</span>
              </div>

              {/* Divider and Features Subtitle */}
              <div className="flex-1">
                <p className={`text-sm mb-4 ${p.dark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {p.subtitle}
                </p>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {p.features.map((f, j) => (
                    <div key={j} className="flex gap-3 text-[14px] items-start">
                      <Check size={16} strokeWidth={2.5} className={`shrink-0 mt-0.5 ${p.dark ? 'text-[#facc15]' : 'text-indigo-600'}`} />
                      <span className={p.dark ? 'text-zinc-300' : 'text-zinc-600'}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3.5 rounded-xl font-bold transition-all duration-200 text-sm flex items-center justify-center gap-2
                  ${p.dark 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' 
                    : p.featured
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'}
                `}
              >
                {p.cta} <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
