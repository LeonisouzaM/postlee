import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cta() {
  return (
    <section className="py-12 bg-white">
      <div className="section-container">
        <div className="bg-[#2b258c] rounded-[32px] p-10 md:p-14 text-white relative flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden min-h-[340px]">
          
          {/* Left Side: Rocket */}
          <div className="w-48 h-48 md:w-64 md:h-full md:absolute md:left-4 lg:left-12 flex-shrink-0 z-10 pointer-events-none drop-shadow-2xl mix-blend-lighten">
            <img src="/rocket_3d.png" alt="Rocket" className="w-full h-full object-contain object-right" />
          </div>

          {/* Center: Text & Actions */}
          <div className="flex-1 flex flex-col items-center justify-center text-center z-20 relative px-4 max-w-3xl mx-auto">
            <h2 className="text-[32px] md:text-[38px] font-bold leading-tight mb-4 tracking-[-0.03em] max-w-xl text-white">
              Pronto para criar carrosséis que conectam e geram resultado?
            </h2>
            <p className="text-white/80 text-[15px] mb-8 font-medium max-w-md">
              Comece grátis agora e veja a IA trabalhar por você.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link to="/register" className="px-6 py-3 bg-white text-[#2b258c] rounded-xl font-bold text-[15px] hover:bg-gray-50 hover:scale-105 transition-all flex items-center justify-center gap-2 group shadow-xl">
                Começar gratuitamente <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-6 py-3 bg-transparent border border-white/30 text-white rounded-xl font-bold text-[15px] hover:bg-white/10 transition-all flex items-center justify-center">
                Ver demonstração
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-[12px] font-medium text-white/70">
              <span className="flex items-center gap-1.5"><Check size={14} className="opacity-70" /> 7 dias grátis</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="opacity-70" /> Sem cartão de crédito</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="opacity-70" /> Cancele quando quiser</span>
            </div>
          </div>

          {/* Right Side: Glowing Stars */}
          <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 w-48 h-full pointer-events-none z-10">
             {/* Star 1 */}
             <svg className="absolute top-[20%] left-[20%] text-white opacity-80 w-8 h-8 drop-shadow-[0_0_15px_rgba(255,255,255,1)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
             </svg>
             {/* Star 2 */}
             <svg className="absolute bottom-[30%] right-[30%] text-white opacity-90 w-12 h-12 drop-shadow-[0_0_20px_rgba(255,255,255,1)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
             </svg>
             {/* Star 3 (small) */}
             <svg className="absolute top-[35%] right-[20%] text-white opacity-50 w-4 h-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
             </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
