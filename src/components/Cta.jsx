import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Cta() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 px-8 py-16 md:px-16 md:py-20 text-center">
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'}} />
          {/* Corner glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              O fim do bloqueio criativo.<br />
              O começo da previsibilidade.
            </h2>
            <p className="text-indigo-100 text-lg leading-relaxed max-w-xl mx-auto mb-10">
              Assuma o controle da sua presença digital. O Postlee trabalha 24/7 
              para que sua marca nunca saia da mente dos seus clientes.
            </p>

            <div className="flex flex-col items-center gap-4">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-indigo-700 bg-white hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-900/30 text-[15px]">
                Ativar Piloto Automático <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-4 text-indigo-200 text-xs font-medium">
                <span>✓ Cancelamento fácil</span>
                <span className="w-1 h-1 rounded-full bg-indigo-400" />
                <span>✓ 7 Dias sem custo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
