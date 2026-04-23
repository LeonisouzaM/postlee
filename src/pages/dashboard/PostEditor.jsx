import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Save, CheckCircle2, ChevronLeft, ChevronRight, Wand2, Image as ImageIcon, Send, Settings2 } from 'lucide-react';

const mockPost = {
  topic: '5 Ferramentas de IA para não designers',
  caption: 'Não sabe usar Photoshop? Estas ferramentas vão resolver sua vida. Salve para não perder! 👇\n\n#ia #design #marketing',
  brandColors: { primary: '#4f46e5', secondary: '#9333ea', bg: '#ffffff' },
  slides: [
    { id: 1, type: 'hook', headline: '5 Ferramentas de IA para não designers criarem posts incríveis', body: '' },
    { id: 2, type: 'content', headline: 'Ferramenta 1: Midjourney', body: 'Geração de imagens absurdas com poucos comandos de texto. Ideal para fundos.' },
    { id: 3, type: 'content', headline: 'Ferramenta 2: Canva Magic', body: 'Todo o poder da edição rápida somado a remoção de fundos perfeita por IA.' },
    { id: 4, type: 'cta', headline: 'Quer mais dicas práticas todo dia?', body: 'Siga nosso perfil e ative as notificações!', cta: 'Salvar Post' },
  ]
};

export default function PostEditor() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slides, setSlides] = useState(mockPost.slides);
  const [caption, setCaption] = useState(mockPost.caption);

  const currentSlide = slides[activeSlide];

  const updateCurrentSlide = (field, value) => {
    const newSlides = [...slides];
    newSlides[activeSlide] = { ...newSlides[activeSlide], [field]: value };
    setSlides(newSlides);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] -mx-4 md:-mx-8 -my-8 bg-[#f4f4f5]">
      
      {/* Editor Topbar */}
      <header className="h-16 bg-white border-b border-zinc-200 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <NavLink to="/app/calendar" className="text-zinc-400 hover:text-zinc-600 p-2 -ml-2 rounded-lg hover:bg-zinc-50 transition-colors">
            <ArrowLeft size={20} />
          </NavLink>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Aguardando Revisão</p>
            </div>
            <h1 className="text-sm font-semibold text-zinc-900 truncate max-w-[200px] md:max-w-md">{mockPost.topic}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button className="hidden md:flex btn-ghost py-2 px-4 shadow-none gap-2 text-sm">
            <Save size={16} /> Salvar Rascunho
          </button>
          <button className="btn-primary bg-emerald-600 hover:bg-emerald-700 shadow-md py-2 px-6 gap-2 text-sm shadow-emerald-600/20">
            <CheckCircle2 size={16} /> Aprovar e Agendar
          </button>
        </div>
      </header>

      {/* Editor Canvas */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Column: Post Details (Visible on lg) */}
        <aside className="w-80 bg-white border-r border-zinc-200 p-6 overflow-y-auto hidden lg:block shrink-0">
          <h2 className="text-sm font-bold text-zinc-800 mb-4 flex items-center gap-2">
            <Settings2 size={16} className="text-indigo-600"/> Detalhes do Post
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Legenda do Instagram</label>
              <textarea 
                rows="12"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-700 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 resize-none leading-relaxed"
              />
              <div className="flex justify-between items-center mt-2 px-1">
                <span className="text-[10px] font-medium text-zinc-400">{caption.length} caracteres</span>
                <button className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                  <Wand2 size={10} /> Reescrever com IA
                </button>
              </div>
            </div>

            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <h3 className="text-xs font-bold text-indigo-800 mb-1 flex items-center gap-1.5"><Send size={12}/> AutoFeed</h3>
              <p className="text-[11px] text-indigo-600 mb-3">Este post está alocado para o horário configurado no seu plano central.</p>
              <button className="w-full bg-white border border-indigo-200 text-indigo-700 text-[11px] font-semibold py-1.5 rounded-lg hover:bg-indigo-50 transition-colors">
                Personalizar Data/Hora
              </button>
            </div>
          </div>
        </aside>

        {/* Center Canvas: Carousel Visualizer */}
        <section className="flex-1 bg-zinc-100/50 flex flex-col items-center justify-between p-4 md:p-8 overflow-y-auto relative">
          
          {/* Main Slide Preview */}
          <div className="relative w-full max-w-sm aspect-square bg-white shadow-2xl rounded-sm flex flex-col justify-center items-center p-8 transition-all duration-300 mx-auto"
            style={{ 
              backgroundColor: currentSlide.type === 'hook' ? mockPost.brandColors.primary : mockPost.brandColors.bg,
              color: currentSlide.type === 'hook' ? '#ffffff' : '#18181b'
            }}
          >
            {/* Visual Header Mock */}
            {currentSlide.type !== 'hook' && (
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: mockPost.brandColors.secondary }} />
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Minha Marca</span>
              </div>
            )}

            <div className="w-full text-left">
              <h1 className={`${currentSlide.type === 'hook' ? 'text-3xl lg:text-4xl' : 'text-2xl'} font-bold mb-4 leading-[1.2]`}>
                {currentSlide.headline}
              </h1>
              {currentSlide.body && (
                <p className="text-sm md:text-base opacity-80 leading-relaxed font-medium">
                  {currentSlide.body}
                </p>
              )}
              {currentSlide.type === 'cta' && (
                <div className="mt-8 flex justify-center">
                  <div className="px-6 py-3 rounded-full text-sm font-bold shadow-lg"
                    style={{ backgroundColor: mockPost.brandColors.primary, color: '#ffffff' }}>
                    {currentSlide.cta || 'Salvar Post'}
                  </div>
                </div>
              )}
            </div>

            {/* Pagination Mock */}
            <div className="absolute bottom-6 flex gap-1.5">
              {slides.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === activeSlide ? 'opacity-90' : 'opacity-20'}`} 
                  style={{ backgroundColor: currentSlide.type === 'hook' ? '#ffffff' : mockPost.brandColors.primary }}
                />
              ))}
            </div>
            
            {/* Next Slide Hint */}
            {activeSlide < slides.length - 1 && (
              <div className="absolute right-4 bottom-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-zinc-400" onClick={() => setActiveSlide(s => s + 1)}>
                <ChevronRight size={20} />
              </div>
            )}
          </div>

          {/* Slide Scroller thumbnails */}
          <div className="mt-8 w-full max-w-2xl bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm flex gap-3 overflow-x-auto scrollbar-hide snap-x">
            {slides.map((s, i) => (
              <button 
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`snap-start shrink-0 relative w-20 h-24 rounded-lg flex flex-col text-left overflow-hidden border-2 transition-all p-2
                  ${activeSlide === i ? 'border-indigo-500 scale-105 shadow-md z-10' : 'border-transparent hover:border-zinc-300 opacity-70'}
                `}
                style={{ backgroundColor: s.type === 'hook' ? mockPost.brandColors.primary : mockPost.brandColors.bg }}
              >
                <span className={`text-[8px] font-bold leading-tight line-clamp-3 ${s.type === 'hook' ? 'text-white' : 'text-zinc-800'}`}>
                  {s.headline}
                </span>
                <span className="absolute bottom-1 right-1.5 text-[8px] font-mono font-bold opacity-30" style={{ color: s.type === 'hook' ? '#ffffff' : '#000000' }}>
                  {i + 1}
                </span>
              </button>
            ))}
          </div>

        </section>

        {/* Right Column: Slide Editor */}
        <aside className="w-80 sm:w-96 bg-white border-l border-zinc-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded uppercase tracking-wider">
                Slide {activeSlide + 1} de {slides.length}
              </span>
              <p className="text-xs font-medium text-zinc-500 mt-1 capitalize">{currentSlide.type} Slide</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))} disabled={activeSlide === 0} className="p-1.5 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200 rounded-md disabled:opacity-30">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => setActiveSlide(Math.min(slides.length - 1, activeSlide + 1))} disabled={activeSlide === slides.length - 1} className="p-1.5 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200 rounded-md disabled:opacity-30">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Title Input */}
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide flex justify-between">
                <span>Título Principal</span>
                <button className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 normal-case tracking-normal">
                  <Wand2 size={10} /> Melhorar
                </button>
              </label>
              <textarea 
                rows="3"
                value={currentSlide.headline}
                onChange={(e) => updateCurrentSlide('headline', e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-sm text-zinc-800 font-semibold outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 resize-none transition-all"
              />
            </div>

            {/* Body Input */}
            {currentSlide.type !== 'hook' && (
              <div>
                <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Texto de Apoio</label>
                <textarea 
                  rows="4"
                  value={currentSlide.body}
                  onChange={(e) => updateCurrentSlide('body', e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-sm text-zinc-700 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 resize-none transition-all"
                />
              </div>
            )}

            {/* AI Image Generation Prompt */}
            <div className="pt-4 border-t border-zinc-100">
               <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Fundo Visual</label>
               <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-center group cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
                  <div className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                    <ImageIcon size={18} className="text-zinc-400 group-hover:text-indigo-600" />
                  </div>
                  <p className="text-sm font-semibold text-zinc-800">Este slide usa fundo liso</p>
                  <p className="text-[11px] text-zinc-500 mt-1 mb-3">A IA do DALL-E pode gerar uma imagem abstrata baseada neste texto para preencher o fundo.</p>
                  <button className="w-full btn-ghost py-1.5 text-xs font-bold gap-2 shadow-none border-zinc-300 bg-white">
                    <Wand2 size={12} className="text-indigo-600" /> Gerar Fundo com IA
                  </button>
               </div>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}
