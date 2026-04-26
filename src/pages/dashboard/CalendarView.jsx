import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight, Image as ImageIcon, Sparkles, MoreHorizontal, Plus, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api';

export default function CalendarView() {
  const { activeProject } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [topicInput, setTopicInput] = useState('');
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const fetchPosts = async () => {
    if (!activeProject) return;
    setIsLoading(true);
    try {
      const res = await api.get(`/projects/${activeProject.id}/posts`);
      setPosts(res.posts);
    } catch(err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if(!topicInput.trim()) return;
    
    setIsGenerating(true);
    try {
      await api.post(`/projects/${activeProject.id}/posts/generate`, { topic: topicInput });
      setShowGenerateModal(false);
      setTopicInput('');
      fetchPosts(); // Recarrega a lista
    } catch(err) {
      alert("Erro ao gerar: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredPosts = posts.filter(p => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Fila de Postagens</h1>
          <p className="text-sm text-zinc-500 mt-1">Gerencie, edite e aprove os carrosséis gerados pela IA.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2 bg-zinc-100 p-1 rounded-xl">
            {['Todos', 'Pendentes', 'Agendados'].map((f, i) => {
              const statusVal = i === 0 ? 'all' : i === 1 ? 'pending' : 'scheduled';
              return (
                <button 
                  key={i} 
                  onClick={() => setFilter(statusVal)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    filter === statusVal
                      ? 'bg-white text-zinc-900 shadow-sm' 
                      : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50'
                  }`}
                >
                  {f}
                </button>
              )
            })}
          </div>
          <button onClick={() => setShowGenerateModal(true)} className="btn-primary py-2 px-5 gap-2 group">
            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
            <span className="text-sm">Novo Carrossel IA</span>
          </button>
        </div>
      </div>

      {showGenerateModal && (
        <div className="fixed inset-0 z-50 bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-fade-up">
            <h2 className="text-xl font-bold text-zinc-900 mb-2">Criar com Inteligência Artificial</h2>
            <p className="text-sm text-zinc-500 mb-6">Qual é o tema do próximo conteúdo? Nossa IA elabora ganchos, corpo e legenda para você.</p>
            
            <form onSubmit={handleGenerate}>
              <input 
                type="text" 
                value={topicInput}
                onChange={e => setTopicInput(e.target.value)}
                placeholder="Ex: 3 Dicas de Produtividade para Agências"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all mb-4"
                disabled={isGenerating}
                autoFocus
              />
              
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowGenerateModal(false)} className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors" disabled={isGenerating}>Cancelar</button>
                <button type="submit" disabled={isGenerating || !topicInput} className="btn-primary py-2 px-6 gap-2 disabled:opacity-70">
                  {isGenerating ? <><Loader2 size={16} className="animate-spin" /> Gerando Textos...</> : <><Sparkles size={16} /> Gerar Carrossel</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
            <p>Buscando sua fila de postagens...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-white border border-zinc-200 border-dashed rounded-2xl p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 mb-4">
              <Sparkles size={28} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-1">Nenhum post na fila</h3>
            <p className="text-sm text-zinc-500 mb-6 max-w-sm">Use nossa inteligência artificial para criar o seu primeiro carrossel profissional em segundos.</p>
            <button onClick={() => setShowGenerateModal(true)} className="btn-primary py-2.5 px-6">Gerar Primeiro Post</button>
          </div>
        ) : filteredPosts.map((post) => (
          <div key={post.id} className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            
            {/* Status Strip */}
            <div className={`absolute top-0 left-0 w-1.5 h-full ${
              post.status === 'pending' ? 'bg-amber-400' : 
              post.status === 'approved' ? 'bg-emerald-400' : 'bg-indigo-400'
            }`} />

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Column: Info */}
              <div className="flex-1 min-w-0">
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
                    <Clock size={12} /> {post.scheduled_for ? new Date(post.scheduled_for).toLocaleString('pt-BR') : 'Sem data'}
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-zinc-900 mb-2 leading-snug truncate">{post.ai_prompt || 'Post Gerado'}</h3>
                <p className="text-sm text-zinc-500 mb-4 line-clamp-3 leading-relaxed pr-4">
                  <span className="font-semibold text-zinc-700">Legenda:</span> {post.caption}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-auto pt-2">
                  <NavLink to={`/app/editor/${post.id}`} className="btn-primary py-2 px-5 text-sm">
                    {post.status === 'pending' ? 'Revisar Montagem' : 'Editar Post'}
                  </NavLink>
                </div>
              </div>

              {/* Right Column: Carousel Preview */}
              <div className="lg:w-[480px] shrink-0 border-t lg:border-t-0 lg:border-l border-zinc-100 pt-6 lg:pt-0 lg:pl-6 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Pré-visualização ({post.slide_count || post.slides?.length || 0} slides)
                  </span>
                </div>
                
                {/* Visual slides scroller */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                  {post.slides?.map((slide, i) => (
                    <div 
                      key={i} 
                      className={`
                        snap-center shrink-0 w-32 h-44 rounded-xl border flex flex-col
                        ${i === 0 ? 'bg-indigo-600 border-indigo-700' : 'bg-[#fafafa] border-zinc-200'}
                      `}
                    >
                      {/* Mockup card content */}
                      <div className="p-3 flex flex-col h-full text-center">
                        <span className={`text-[11px] font-bold break-words w-full line-clamp-5 ${i === 0 ? 'text-white' : 'text-zinc-800'}`}>
                          {slide.text_headline}
                        </span>
                        {i === post.slides.length - 1 && (
                          <div className="w-8 h-8 rounded-full bg-indigo-100 mt-auto mx-auto flex items-center justify-center shadow-inner">
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
