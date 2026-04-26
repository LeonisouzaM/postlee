import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#eeedff] rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-[20%] left-[-5%] w-[30%] h-[30%] bg-purple-50 rounded-full blur-[100px] -z-10 opacity-40" />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column */}
          <div className="flex flex-col animate-fade-up">
            <div className="badge mb-6 self-start">
              <Sparkles className="w-3.5 h-3.5" />
              A IA que cria carrosséis que geram resultado
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
              Carrosséis que conectam, conteúdos que <span className="text-[#5c54ed]">transformam.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl leading-relaxed">
              A Posta.ai usa design e IA para criar carrosséis prontos para redes sociais em segundos.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/register" className="btn-primary px-8 py-4 rounded-xl text-base font-bold group">
                Começar gratuitamente
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="btn-secondary px-8 py-4 rounded-xl text-base font-bold flex items-center gap-2">
                Ver demonstração
              </button>
            </div>
            
            <div className="flex items-center gap-6 text-[13px] font-medium text-gray-400 mb-12">
              <span className="flex items-center gap-1.5"><Check size={16} className="text-gray-300" /> 7 dias grátis</span>
              <span className="flex items-center gap-1.5"><Check size={16} className="text-gray-300" /> Sem cartão de crédito</span>
              <span className="flex items-center gap-1.5"><Check size={16} className="text-gray-300" /> Cancele quando quiser</span>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 py-2 border-t border-gray-100 mt-2">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow-500">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  <span className="ml-2 text-zinc-900 font-bold">+10.000</span>
                  <span className="ml-1 text-gray-400 font-normal">criadores e agências</span>
                </div>
                <p className="text-[13px] text-gray-400 font-medium">acelerando resultados com a Posta.ai</p>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Showcase */}
          <div className="relative h-[600px] flex items-center justify-center pt-10 lg:pt-0">
            {/* Carousel Stack */}
            <div className="relative w-full max-w-[400px]">
              
              {/* Main Card */}
              <motion.div 
                initial={{ x: 20, rotate: 2 }}
                animate={{ x: 0, rotate: 0 }}
                className="absolute top-0 right-0 w-[85%] aspect-[4/5] bg-gradient-to-br from-[#5c54ed] to-[#3a32ca] rounded-[24px] carousel-card-shadow p-8 text-white z-30 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">01/06</span>
                  <Sparkles className="w-6 h-6 opacity-80" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-8xl font-bold leading-none">5</span>
                  <h3 className="text-3xl font-extrabold leading-tight">estratégias para crescer no Instagram em 2025</h3>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold opacity-80 uppercase tracking-widest group">
                  Arraste para o lado <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* Background Card 1 */}
              <div className="absolute top-4 left-[-15%] w-[85%] aspect-[4/5] bg-white rounded-[24px] shadow-xl p-8 z-20 overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-bold text-gray-300 uppercase">02/06</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Conheça sua audiência</h4>
                <div className="bg-gray-50 h-32 rounded-xl mb-4" />
                <div className="flex flex-col gap-2">
                  <div className="h-2 w-full bg-gray-100 rounded-full" />
                  <div className="h-2 w-3/4 bg-gray-100 rounded-full" />
                </div>
              </div>

              {/* Background Card 2 */}
              <div className="absolute top-8 left-[-30%] w-[85%] aspect-[4/5] bg-white/60 rounded-[24px] shadow-lg p-8 z-10 scale-[0.95] blur-[1px]">
                  <div className="bg-gray-100 h-full w-full rounded-xl opacity-50" />
              </div>

              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-24 h-32 bg-gray-50 rounded-2xl border border-gray-100 shadow-xl overflow-hidden p-3 z-40 lg:block hidden"
              >
                  <div className="h-2 w-10 bg-[#5c54ed] rounded-full mb-2" />
                  <div className="aspect-square bg-gray-100 rounded-lg mb-2" />
                  <div className="h-1.5 w-full bg-gray-200 rounded-full" />
              </motion.div>
            </div>

            {/* AI Generator Input Bar - Floating at bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[500px] z-50">
                <div className="mx-6 bg-white/80 backdrop-blur-xl border border-white p-2 rounded-2xl shadow-2xl flex items-center gap-3">
                    <div className="p-3 bg-indigo-50 text-[#5c54ed] rounded-xl">
                        <Sparkles size={20} />
                    </div>
                    <div className="flex-1 text-sm text-gray-400 font-medium italic">
                        Gerar carrossel com IA...
                    </div>
                    <div className="flex -space-x-2 mr-2">
                         {[1,2,3].map(i => (
                             <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                                 <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="avatar" />
                             </div>
                         ))}
                    </div>
                    <button className="w-10 h-10 bg-[#5c54ed] text-white rounded-xl flex items-center justify-center shadow-lg shadow-[#5c54ed]/30">
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
