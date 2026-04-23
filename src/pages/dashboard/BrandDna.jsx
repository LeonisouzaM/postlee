import React, { useState } from 'react';
import { Upload, Palette, Type, MessageSquare, Paintbrush, Save } from 'lucide-react';

export default function BrandDna() {
  const [colors, setColors] = useState({ primary: '#4f46e5', secondary: '#9333ea', background: '#ffffff' });

  return (
    <div className="space-y-8 animate-fade-in pb-10 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">DNA da Marca</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Configure suas diretrizes visuais e verbais. A IA usará essas regras em 100% dos seus carrosséis.
          </p>
        </div>
        <button className="btn-primary py-2.5 px-6 shadow-md shrink-0">
          <Save size={18} /> Salvar Configurações
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Formulário Principal (Esquerda) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Seção Logo */}
          <section className="bg-white border border-zinc-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <Upload size={18} className="text-zinc-400" /> Logotipo Principal
            </h2>
            <div className="border-2 border-dashed border-zinc-200 bg-zinc-50 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-100 transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload size={20} className="text-indigo-600" />
              </div>
              <p className="text-sm font-medium text-zinc-700">Clique para fazer upload ou arraste o arquivo</p>
              <p className="text-xs text-zinc-400 mt-1">SVG, PNG ou JPG (Fundo transparente recomendado)</p>
            </div>
          </section>

          {/* Seção Cores */}
          <section className="bg-white border border-zinc-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <Palette size={18} className="text-zinc-400" /> Paleta de Cores (HEX)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Cor Primária</label>
                <div className="flex bg-zinc-50 border border-zinc-200 rounded-lg overflow-hidden focus-within:ring-2 ring-indigo-500/20 transition-all">
                  <div className="w-10 h-10 shrink-0 border-r border-zinc-200" style={{ backgroundColor: colors.primary }} />
                  <input 
                    type="text" 
                    value={colors.primary} 
                    onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                    className="w-full bg-transparent border-none text-sm font-mono text-zinc-700 px-3 outline-none" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Secundária</label>
                <div className="flex bg-zinc-50 border border-zinc-200 rounded-lg overflow-hidden focus-within:ring-2 ring-indigo-500/20 transition-all">
                  <div className="w-10 h-10 shrink-0 border-r border-zinc-200" style={{ backgroundColor: colors.secondary }} />
                  <input 
                    type="text" 
                    value={colors.secondary} 
                    onChange={(e) => setColors({ ...colors, secondary: e.target.value })}
                    className="w-full bg-transparent border-none text-sm font-mono text-zinc-700 px-3 outline-none" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Fundo (Geral)</label>
                <div className="flex bg-zinc-50 border border-zinc-200 rounded-lg overflow-hidden focus-within:ring-2 ring-indigo-500/20 transition-all">
                  <div className="w-10 h-10 shrink-0 border-r border-zinc-200" style={{ backgroundColor: colors.background }} />
                  <input 
                    type="text" 
                    value={colors.background} 
                    onChange={(e) => setColors({ ...colors, background: e.target.value })}
                    className="w-full bg-transparent border-none text-sm font-mono text-zinc-700 px-3 outline-none" 
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Seção Tipografia */}
          <section className="bg-white border border-zinc-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <Type size={18} className="text-zinc-400" /> Tipografia
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Fonte dos Títulos (Headings)</label>
                <select className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20">
                  <option>Inter</option>
                  <option>Outfit</option>
                  <option>Playfair Display</option>
                  <option>Roboto</option>
                  <option>Montserrat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Fonte de Textos (Body)</label>
                <select className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20">
                  <option>Inter</option>
                  <option>Roboto</option>
                  <option>Open Sans</option>
                </select>
              </div>
            </div>
          </section>

          {/* Seção Texto e Tom de Voz */}
          <section className="bg-white border border-zinc-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-zinc-400" /> Contexto para Inteligência Artificial
            </h2>
            
            <div className="mb-5">
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Tom de Voz</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Profissional', 'Humorístico', 'Inspirador', 'Técnico'].map(t => (
                  <label key={t} className="relative flex cursor-pointer rounded-lg border bg-white p-3 shadow-sm hover:bg-zinc-50 has-[:checked]:border-indigo-500 has-[:checked]:ring-1 has-[:checked]:ring-indigo-500 transition-all">
                    <input type="radio" name="tone" value={t} defaultChecked={t === 'Profissional'} className="sr-only" />
                    <span className="text-sm font-medium text-zinc-900 w-full text-center">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Quem é o seu negócio? O que você faz?</label>
              <textarea 
                rows="4" 
                placeholder="Ex: Somos uma agência de marketing focada em e-commerce. Ajudamos pequenos lojistas a aumentarem suas vendas através de tráfego pago..."
                className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 resize-none"
              />
              <p className="text-xs text-zinc-400 mt-2">Seja o mais específico possível. A IA vai usar essa descrição em todos os seus agendamentos para criar conteúdos que pareçam escritos por você.</p>
            </div>
          </section>
        </div>

        {/* Live Preview (Direita) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border border-zinc-200 rounded-2xl p-6 shadow-xl shadow-zinc-900/5">
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-zinc-100 pb-4">
              <Paintbrush size={16} className="text-indigo-600" /> Preview em Tempo Real
            </h3>

            {/* Mock Layout Preview */}
            <div 
              className="rounded-xl overflow-hidden shadow-inner flex flex-col justify-center items-center p-6 text-center transition-all duration-500 mx-auto aspect-square"
              style={{ backgroundColor: colors.background, border: `2px solid ${colors.primary}20` }}
            >
              <div 
                className="w-10 h-10 rounded-full mb-4 shadow-sm flex items-center justify-center font-bold text-white text-lg"
                style={{ backgroundColor: colors.secondary }}
              >
                P
              </div>
              
              <h4 
                className="text-xl font-bold mb-3 leading-tight transition-colors duration-500" 
                style={{ color: colors.primary, fontFamily: 'Inter, sans-serif' }}
              >
                Título do seu incrível Carrossel vai brilhar aqui
              </h4>
              
              <p 
                className="text-sm leading-relaxed mb-6 px-2 opacity-80"
                style={{ color: colors.background === '#ffffff' ? '#333' : '#fff', fontFamily: 'Inter, sans-serif' }}
              >
                O texto de apoio será legível, claro e formatado para gerar a máxima conversão no seu público.
              </p>

              <div 
                className="w-3/4 h-1.5 rounded-full mt-auto opacity-50"
                style={{ backgroundColor: colors.primary }}
              />
            </div>

            <p className="text-center text-xs text-zinc-400 mt-6 px-4">
              Altere os códigos HEX ao lado para ver como os posts da IA serão renderizados visualmente.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
