import React from 'react';
import { Clock, TrendingDown, RefreshCcw, Layers } from 'lucide-react';

const items = [
  { icon: Clock,        title: 'Falta de tempo',        desc: 'Criar posts para múltiplas plataformas todos os dias consome horas que deveriam estar no seu negócio.' },
  { icon: RefreshCcw,   title: 'Falta de consistência', desc: 'Postar uma semana e sumir na outra destrói o alcance. O algoritmo exige regularidade.' },
  { icon: TrendingDown, title: 'Baixo engajamento',     desc: 'Publicações sem estratégia não geram retorno. É preciso postar o certo, para a pessoa certa, na hora certa.' },
  { icon: Layers,       title: 'Planejamento caótico',  desc: 'Planilhas e notas espalhadas sem visibilidade de quando cada post vai ao ar.' },
];

export default function Problem() {
  return (
    <section className="py-28" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="tag mb-5">O problema</span>
          <h2
            className="font-semibold tracking-tighter leading-tight mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#0E0E14' }}
          >
            Criar conteúdo todo dia é exaustivo.
          </h2>
          <p style={{ fontSize: '0.9375rem', color: '#6B6B80', lineHeight: 1.7 }}>
            Para quem administra um negócio, produzir conteúdo de qualidade de forma consistente parece impossível.
          </p>
        </div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-2xl"
          style={{ border: '1px solid #E2E2EA' }}
        >
          {items.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="p-7 flex flex-col gap-4 group transition-colors duration-200"
              style={{
                backgroundColor: '#FFFFFF',
                borderRight: i < 3 ? '1px solid #E2E2EA' : 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F7F7FA'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200"
                style={{ backgroundColor: '#F7F7FA', border: '1px solid #E2E2EA' }}
              >
                <Icon size={15} style={{ color: '#6B6B80' }} />
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1.5" style={{ color: '#0E0E14' }}>{title}</h3>
                <p style={{ fontSize: '0.75rem', color: '#A0A0B4', lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
