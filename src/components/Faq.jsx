import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'A Postlee possui algum risco de banir meu Instagram?',
    answer: 'Absolutamente não. Nós utilizamos exclusivamente a Graph API Oficial da Meta. Ao contrário de ferramentas piratas que imitam um celular (o que causa Shadowban), nossa conexão é aprovada e auditada pelo próprio Facebook. Você está 100% seguro.'
  },
  {
    question: 'A Inteligência Artificial cria o Design ou só os textos?',
    answer: 'Nós geramos o carrossel completo! O texto persuasivo, as legendas do Instagram e o mais importante: a estrutura visual pronta. Você apenas define suas cores no "DNA da Marca" e nós montamos os slides magicamente.'
  },
  {
    question: 'Como a IA sabe como escrever para o meu nicho específico?',
    answer: 'Através da nossa tecnologia de "Brand DNA". Assim que você entra na plataforma, você preenche um briefing rápido sobre o que sua empresa faz e qual seu tom de voz (Ex: Profissional, Humorístico, Técnico). A IA salva essas regras e as aplica em toda geração.'
  },
  {
    question: 'Posso aprovar os carrosséis antes deles irem ao ar?',
    answer: 'Com certeza! Nós possuímos a aba "Calendário". Todos os posts gerados caem primeiro em um status de "Aguardando Revisão". Se você não aprovar, nós não postamos. Você tem total controle.'
  },
  {
    question: 'Preciso de cartão de crédito para o teste grátis?',
    answer: 'Não. Você pode fazer seu cadastro agora, plugar as suas mídias e gerar gratuitamente as primeiras publicações para atestar com seus próprios olhos a qualidade do nosso robô. Sem amarras.'
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24 bg-[#fafafa]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-[32px] md:text-[40px] font-bold text-zinc-900 tracking-tight leading-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-[17px] text-zinc-500 max-w-2xl mx-auto">
            Tudo o que você precisa saber sobre o primeiro motor inteligente de mídias sociais.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen ? 'bg-white border-indigo-200 shadow-md shadow-indigo-600/5' : 'bg-transparent border-zinc-200 hover:border-zinc-300 hover:bg-white'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className={`text-base md:text-lg font-semibold transition-colors ${isOpen ? 'text-indigo-600' : 'text-zinc-800'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`shrink-0 text-zinc-400 transition-transform duration-300 ml-4 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`}
                    size={20}
                  />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-zinc-600 text-[15px] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
