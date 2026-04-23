import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight, Image as ImageIcon, Sparkles, MoreHorizontal } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    topic: '5 Ferramentas de IA para não designers',
    status: 'pending',
    date: 'Hoje, 18:00',
    platform: 'Instagram',
    slidesCount: 6,
    caption: 'Não sabe usar Photoshop? Essas 5 ferramentas vão resolver a sua vida hoje mesmo...',
    slides: ['TÍTULO', 'Dica 1', 'Dica 2', 'Dica 3', 'Dica 4', 'CTA']
  },
  {
    id: 2,
    topic: 'Como planejar seu mês em 1h',
    status: 'approved',
    date: 'Amanhã, 12:00',
    platform: 'Instagram',
    slidesCount: 8,
    caption: 'Sem tempo para criar conteúdo? Veja o exato processo que uso para planejar...',
    slides: ['Planejamento', 'Ferramentas', 'Método', 'Trello', 'Calendário', 'Aprovação', 'Resultados', 'CTA']
  },
  {
    id: 3,
    topic: 'O maior erro ao divulgar seu serviço',
    status: 'scheduled',
    date: '15 de Abril, 09:00',
    platform: 'Instagram',
    slidesCount: 5,
    caption: 'Você está focando no que entrega ou na transformação? Descubra o maior erro...',
    slides: ['Erro Grave', 'Foco errado', 'Solução', 'Exemplo Prático', 'Compartilhe']
  }
];

export default function CalendarView() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Fila de Postagens</h1>
          <p className="text-sm text-zinc-500 mt-1">Gerencie, edite e aprove os carrosséis gerados pela IA.</p>
        </div>
        
        <div className="flex gap-2">
          {/* Status Filters */}
          {['Todos', 'Pendentes', 'Agendados'].map((f, i) => (
            <button 
              key={i} 
              onClick={() => setFilter(i === 0 ? 'all' : i === 1 ? 'pending' : 'scheduled')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${
                (filter === 'all' && i === 0) || (filter === 'pending' && i === 1) || (filter === 'scheduled' && i === 2)
                  ? 'bg-zinc-900 text-white border-zinc-900' 
                  : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Post List */}
      <div className="space-y-6">
        {mockPosts.map((post) => (
          <div key={post.id} className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            
            {/* Status Strip */}
            <div className={`absolute top-0 left-0 w-1.5 h-full ${
              post.status === 'pending' ? 'bg-amber-400' : 
              post.status === 'approved' ? 'bg-emerald-400' : 'bg-indigo-400'
            }`} />

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Column: Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {post.status === 'pending' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-bold uppercase tracking-wider text-amber-700">
                      <Sparkles size={12} className="text-amber-500" /> Aguardando Revisão
                    </span>
                  )}
                  {(post.status === 'approved' || post.status === 'scheduled') && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                      <CheckCircle2 size={12} className="text-emerald-600" /> 
                      {post.status === 'scheduled' ? 'Na fila de Publicação' : 'Aprovado'}
                    </span>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono bg-zinc-100 px-2 py-1 rounded">
                    <Clock size={12} /> {post.date}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mb-2 leading-snug">{post.topic}</h3>
                <p className="text-sm text-zinc-500 mb-4 line-clamp-2 leading-relaxed">
                  <span className="font-semibold text-zinc-700">Legenda:</span> {post.caption}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-auto pt-2">
                  <NavLink to="/app/editor" className="btn-primary py-2 px-5 text-sm">
                    {post.status === 'pending' ? 'Revisar e Aprovar' : 'Editar Post'}
                  </NavLink>
                  <button className="btn-ghost py-2 px-4 text-sm gap-2">
                    <ImageIcon size={16} /> Ver Ativos
                  </button>
                </div>
              </div>

              {/* Right Column: Carousel Preview */}
              <div className="lg:w-[480px] shrink-0 border-t lg:border-t-0 lg:border-l border-zinc-100 pt-6 lg:pt-0 lg:pl-6 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Pré-visualização ({post.slidesCount} slides)
                  </span>
                  <button className="text-zinc-400 hover:text-zinc-700">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                
                {/* Visual slides scroller */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                  {post.slides.map((slideTitle, i) => (
                    <div 
                      key={i} 
                      className={`
                        snap-center shrink-0 w-28 h-36 rounded-xl border flex flex-col
                        ${i === 0 ? 'bg-indigo-600 border-indigo-700' : 'bg-[#fafafa] border-zinc-200'}
                      `}
                    >
                      {/* Mockup card content based on slide type */}
                      <div className="p-3 flex flex-col h-full items-center justify-center text-center">
                        <span className={`text-[10px] font-bold break-words w-full line-clamp-4 ${i === 0 ? 'text-white' : 'text-zinc-800'}`}>
                          {slideTitle}
                        </span>
                        {i > 0 && i < post.slides.length - 1 && (
                          <div className="w-12 h-1.5 bg-zinc-200 rounded-full mt-auto mb-2 opacity-50" />
                        )}
                        {i === post.slides.length - 1 && (
                          <div className="w-8 h-8 rounded-full bg-indigo-100 mt-2 flex items-center justify-center">
                            <ChevronRight size={14} className="text-indigo-600" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
