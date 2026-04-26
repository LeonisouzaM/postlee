import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Mariana Lima',
    role: 'Social Media',
    content: 'A Posta mudou minha forma de criar conteúdo. Em minutos eu tenho um carrossel lindo e pronto para postar.',
    img: 'https://i.pravatar.cc/100?img=32'
  },
  {
    name: 'Rafael Costa',
    role: 'Fundador',
    content: 'Os templates são incríveis e a IA entende exatamente o que meu público quer ver. Ganhei muito tempo e resultados!',
    img: 'https://i.pravatar.cc/100?img=12'
  },
  {
     name: 'Juliana Mendes',
     role: 'Estrategista de Conteúdo',
     content: 'Uso todos os dias na minha agência. Nossos clientes amaram a consistência e o engajamento aumentou.',
     img: 'https://i.pravatar.cc/100?img=44'
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="section-container">
        
        <div className="max-w-2xl mb-16">
            <div className="badge mb-4 bg-orange-50 text-orange-600 border-orange-100 uppercase">QUEM USA, APROVA</div>
            <h2 className="text-4xl font-extrabold text-zinc-900 leading-tight">
                Criadores e agências que crescem com a Posta.ai
            </h2>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-6">
                {reviews.map((r, i) => (
                    <div key={i} className="p-8 bg-[#fafafa] border border-gray-100 rounded-[32px] flex flex-col justify-between">
                        <div>
                            <div className="flex text-yellow-500 mb-6">
                                {[1,2,3,4,5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                            </div>
                            <p className="text-gray-600 font-medium leading-relaxed mb-8 italic">
                                "{r.content}"
                            </p>
                        </div>
                        <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                            <img src={r.img} alt={r.name} className="w-10 h-10 rounded-full grayscale" />
                            <div>
                                <h4 className="font-bold text-zinc-900 text-sm">{r.name}</h4>
                                <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">{r.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-[#5c54ed] rounded-[32px] p-8 text-white flex flex-col justify-between items-start">
                <div>
                     <p className="text-[11px] font-bold opacity-70 uppercase tracking-widest mb-6">Junte-se a nós</p>
                     <h3 className="text-2xl font-extrabold leading-tight mb-8">
                        Junte-se a mais de 10.000 criadores que já transformam ideias em carrosséis que geram resultado.
                     </h3>
                </div>
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-[#5c54ed] bg-white/20 overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?img=${i+50}`} alt="user" />
                            </div>
                        ))}
                        <div className="w-10 h-10 rounded-full border-2 border-[#5c54ed] bg-white text-[#5c54ed] flex items-center justify-center text-xs font-bold">
                            +10k
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}
