import React from 'react';
import { Target, Palette, Zap } from 'lucide-react';

const features = [
  {
    title: 'IA treinada para performar',
    description: 'Entenda seu nicho, seu público e sugere conteúdos que geram engajamento.',
    icon: Target,
    color: 'bg-indigo-50 text-[#5c54ed]'
  },
  {
    title: 'Design que representa',
    description: 'Templates 100% editáveis pensados para destacar sua mensagem.',
    icon: Palette,
    color: 'bg-indigo-50 text-[#5c54ed]'
  },
  {
    title: 'Publicação simplificada',
    description: 'Agende, publique e otimize seus carrosséis em poucos cliques.',
    icon: Zap,
    color: 'bg-indigo-50 text-[#5c54ed]'
  }
];

export default function Solution() {
  return (
    <section id="produto" className="py-24 bg-white relative overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          
          <div className="lg:col-span-1">
             <div className="badge mb-4">FEITO PARA QUEM CRIA</div>
             <h2 className="text-4xl font-extrabold text-zinc-900 leading-tight mb-6">
                Menos tela em branco. <br/>
                Mais conteúdo que funciona.
             </h2>
             <p className="text-gray-500 text-lg mb-8">
                A IA da Posta.ai entende sua marca, seu público e cria carrosséis que geram resultado todos os dias.
             </p>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-8 bg-[#fafafa] border border-gray-100 rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center mb-6 shadow-inner`}>
                  <f.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {f.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
