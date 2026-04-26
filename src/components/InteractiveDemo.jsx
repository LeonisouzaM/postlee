import React from 'react';
import { Sparkles, BarChart3, Clock, TrendingUp, Heart } from 'lucide-react';

const stats = [
  { label: '+65% de engajamento médio', icon: TrendingUp },
  { label: '-10h por semana economizadas', icon: Clock },
  { label: '+10k criadores ativos', icon: BarChart3 },
  { label: '98% de satisfação', icon: Heart }
];

export default function InteractiveDemo() {
  return (
    <section className="py-24 lg:py-32 bg-white" id="recursos">
      <div className="section-container">
        
        {/* Main Card */}
        <div className="bg-[#f2f0ff] rounded-[48px] p-8 lg:p-14 mb-20 relative overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
                
                {/* Left side text & features */}
                <div className="z-10 relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-[#5c54ed] uppercase tracking-wider mb-6 shadow-sm">
                        PODER DA IA
                    </div>
                    <h2 className="text-[32px] md:text-[40px] font-extrabold text-zinc-900 leading-[1.1] mb-6 tracking-tight">
                        IA que trabalha por você
                    </h2>
                    <p className="text-gray-500 text-[17px] mb-10 leading-relaxed max-w-sm">
                        Mais que um gerador de carrosséis, a Posta.ai é sua parceira estratégica de conteúdo.
                    </p>

                    <div className="space-y-8">
                        {[
                            { title: 'Análise de tendências', desc: 'Sugerimos temas em alta no seu nicho.' },
                            { title: 'Sugestões de ganchos', desc: 'Aberturas que prendem a atenção do público.' },
                            { title: 'Otimização contínua', desc: 'Insights para melhorar o desempenho dos seus posts.' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white text-[#5c54ed] flex items-center justify-center shrink-0 shadow-sm">
                                    <Sparkles size={18} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-zinc-900 text-[15px] mb-1">{item.title}</h4>
                                    <p className="text-gray-500 text-[14px] leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right side form and result */}
                <div className="flex flex-col md:flex-row items-center gap-6 z-10 relative mt-10 lg:mt-0">
                    
                    {/* Input Form */}
                    <div className="bg-white rounded-[24px] shadow-sm p-6 w-full max-w-[280px]">
                        <div className="mb-6">
                            <label className="block text-[11px] font-bold text-gray-400 mb-2">Assunto</label>
                            <div className="w-full p-4 bg-white rounded-xl border border-gray-200 text-[13px] text-zinc-500 italic shadow-sm">
                                Dicas para melhorar a produtividade
                            </div>
                        </div>
                        <div className="mb-8">
                            <label className="block text-[11px] font-bold text-gray-400 mb-2">Tom</label>
                            <div className="w-full p-4 bg-white rounded-xl border border-gray-200 text-[13px] text-zinc-900 font-bold shadow-sm">
                                Profissional e inspirador
                            </div>
                        </div>
                        <button className="w-full bg-[#5c54ed] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#4a42d1] transition-colors shadow-md shadow-[#5c54ed]/20">
                             Gerar carrossel <Sparkles size={16} />
                        </button>
                    </div>

                    {/* Arrow connector */}
                    <div className="text-[#5c54ed] hidden md:block">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>

                    {/* Result Card Container */}
                    <div className="w-full max-w-[280px] bg-gradient-to-br from-[#5c54ed] to-[#3a32ca] rounded-[24px] p-8 text-white shadow-xl shadow-[#5c54ed]/20 flex flex-col justify-between aspect-[4/5] relative overflow-hidden">
                        {/* decorative shapes inside the card */}
                        <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-white/10 rounded-full blur-2xl pointer-events-none" />
                        <div>
                            <span className="text-[10px] font-bold opacity-60 mb-6 block uppercase tracking-wide">02/07</span>
                            <h4 className="text-[22px] font-extrabold leading-[1.2] mb-6">
                                Menos distração, mais foco: como produzir mais em menos tempo
                            </h4>
                        </div>
                        {/* Placeholder brain graphic or similar... using basic shapes as generic placeholder */}
                        <div className="flex-1 w-full bg-white/5 rounded-xl border border-white/10 mb-6 flex items-center justify-center backdrop-blur-sm">
                             <Sparkles size={32} className="opacity-20" />
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                            {[1,2,3,4,5,6].map(i => <div key={i} className={`h-1.5 rounded-full transition-all ${i === 2 ? 'w-4 bg-white' : 'w-1.5 bg-white/30'}`} />)}
                        </div>
                    </div>

                </div>

            </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto px-4">
            {stats.map((s, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
                    <div className="w-12 h-12 rounded-[16px] bg-[#f2f0ff] text-[#5c54ed] flex items-center justify-center shrink-0">
                        <s.icon size={22} className="opacity-80" />
                    </div>
                    <div>
                        <p className="text-[19px] font-extrabold text-zinc-900 leading-tight mb-1">{s.label.split(' ')[0]}</p>
                        <p className="text-gray-500 text-[13px] font-medium leading-tight">{s.label.substring(s.label.indexOf(' ') + 1)}</p>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}
