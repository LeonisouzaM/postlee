import React from 'react';
import { CalendarClock, CalendarDays, Sparkles, Users, BarChart2, ImageIcon } from 'lucide-react';

const features = [
  { icon: CalendarClock, title: 'Agendamento automático',    desc: 'Programe posts com semanas de antecedência.' },
  { icon: CalendarDays,  title: 'Calendário editorial',      desc: 'Visão mês/semana de toda a sua estratégia.' },
  { icon: Sparkles,      title: 'IA para legendas e ideias', desc: 'Textos que soam humanos, gerados em segundos.' },
  { icon: Users,         title: 'Múltiplas contas',          desc: 'Gerencie vários perfis no mesmo painel.' },
  { icon: BarChart2,     title: 'Analytics',                 desc: 'Entenda o que converte e ajuste a estratégia.' },
  { icon: ImageIcon,     title: 'Banco de imagens',          desc: 'Encontre a imagem certa sem sair da plataforma.' },
];

export default function Features() {
  return (
    <section id="features" className="py-28" style={{ backgroundColor: '#F7F7FA', borderTop: '1px solid #E2E2EA' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-16">
          <span className="tag mb-5">Features</span>
          <h2
            className="font-semibold tracking-tighter leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#0E0E14' }}
          >
            Tudo que você precisa, nada que vai atrapalhar.
          </h2>
        </div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 overflow-hidden rounded-2xl"
          style={{ border: '1px solid #E2E2EA' }}
        >
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="p-7 flex flex-col gap-4 transition-colors duration-200"
              style={{
                backgroundColor: '#FFFFFF',
                borderRight: (i + 1) % 3 !== 0 ? '1px solid #E2E2EA' : 'none',
                borderBottom: i < 3 ? '1px solid #E2E2EA' : 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F7F7FA'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#EEF0FB', border: '1px solid rgba(94,106,210,0.15)' }}
              >
                <Icon size={15} style={{ color: '#5E6AD2' }} />
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1" style={{ color: '#0E0E14' }}>{title}</h3>
                <p style={{ fontSize: '0.75rem', color: '#A0A0B4', lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
