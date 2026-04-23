import React from 'react';

const testimonials = [
  { quote: 'Antes eu perdia meus domingos planejando posts. Agora aprovo a semana inteira em 10 minutos.', name: 'Amanda S.', role: 'Dona de e-commerce', initials: 'AS', bg: 'bg-indigo-500' },
  { quote: 'O Postlee me permitiu escalar de 4 para 12 clientes sem contratar mais ninguém. O calendário visual é essencial.', name: 'Marcos T.', role: 'Social media freelancer', initials: 'MT', bg: 'bg-violet-500' },
  { quote: 'Nunca vi uma IA gerar legendas tão naturais. Meu LinkedIn cresceu 340% em 3 meses.', name: 'Júlia M.', role: 'Criadora de conteúdo', initials: 'JM', bg: 'bg-emerald-500' },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="tag mb-4">Depoimentos</span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-4">
            Quem usa, recomenda.
          </h2>
          <p className="text-zinc-500 text-[16px]">
            Resultados reais de criadores e empreendedores brasileiros.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map(({ quote, name, role, initials, bg }, i) => (
            <div key={i} className="p-7 rounded-2xl bg-[#fafafa] border border-zinc-100 flex flex-col justify-between gap-6 hover:shadow-lg hover:shadow-zinc-900/5 hover:border-zinc-200 transition-all">
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array(5).fill(0).map((_, s) => (
                  <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <p className="text-sm text-zinc-600 leading-relaxed flex-1">"{quote}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center text-xs font-bold text-white`}>
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-800">{name}</p>
                  <p className="text-[11px] text-zinc-400">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
