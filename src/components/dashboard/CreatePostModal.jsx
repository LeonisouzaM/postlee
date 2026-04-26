import React, { useState } from 'react';
import { X, Sparkles, Link2, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';

export default function CreatePostModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { activeProject } = useAuth();
  const [tab, setTab] = useState('ia'); // 'ia' ou 'url'
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [numSlides, setNumSlides] = useState('7');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!activeProject || !inputVal) return;
    setLoading(true);
    console.log('🚀 [CREATE] Enviando para geração:', { tab, inputVal, numSlides, projectId: activeProject.id });
    try {
      let endpoint = tab === 'ia' 
        ? `/projects/${activeProject.id}/posts/generate` 
        : `/projects/${activeProject.id}/posts/from-news`;
      
      let payload = tab === 'ia' 
        ? { topic: inputVal, num_slides: parseInt(numSlides) } 
        : { url: inputVal };

      const res = await api.post(endpoint, payload);
      onClose();
      navigate(`/app/editor/${res.post.id}`);
    } catch (err) {
      alert("Erro ao gerar post: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-auto">
      {/* Overlay com blur */}
      <div 
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 mx-4 animate-fade-up z-10"
        style={{ animationDuration: '0.3s' }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 bg-zinc-100 hover:bg-zinc-200 p-1.5 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="mb-6 pr-8">
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Criar Novo Carrossel</h2>
          <p className="text-sm text-zinc-500 mt-1">A inteligência artificial fará o trabalho pesado por você.</p>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-zinc-100/80 rounded-xl mb-6">
          <button 
            onClick={() => setTab('ia')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg transition-all ${
              tab === 'ia' ? 'bg-white text-indigo-700 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'
            }`}
          >
            <Sparkles size={16} /> Tema Livre (IA)
          </button>
          <button 
            onClick={() => setTab('url')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg transition-all ${
              tab === 'url' ? 'bg-white text-indigo-700 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'
            }`}
          >
            <Link2 size={16} /> A partir de Notícia
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4 mb-6">
          {tab === 'ia' ? (
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Qual o tema do Carrossel?</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-zinc-400" size={20} />
                <textarea 
                  rows="3" 
                  autoFocus
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  placeholder="Ex: 5 erros fatais ao criar campanhas no Google Ads ou O que muda com a nova lei tributária..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-800 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 resize-none transition-all"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-1.5">URL da Matéria/Artigo</label>
              <div className="relative">
                <Link2 className="absolute left-3 top-3 text-zinc-400" size={20} />
                <input 
                  type="url" 
                  autoFocus
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  placeholder="https://exame.com/noticia/..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-800 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                />
              </div>
              <p className="text-xs text-zinc-500 mt-2">Iremos ler essa URL e transformar a informação em um carrossel educativo focado no seu nicho.</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Tamanho desejado</label>
            <select 
              value={numSlides}
              onChange={e => setNumSlides(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all"
            >
              <option value="5">Curto (5 Slides) - Ideal para dicas rápidas</option>
              <option value="7">Médio (7 Slides) - Padrão de engajamento</option>
              <option value="10">Longo (10 Slides) - Alta densidade técnica</option>
            </select>
          </div>
        </div>

        {/* Float Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
          <button 
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="btn-primary py-2.5 px-6 shadow-md relative overflow-hidden group min-w-[200px]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Sparkles size={18} className="animate-pulse" /> 
                Escrevendo e Desenhando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Sparkles size={18} /> 
                Gerar com Inteligência
              </span>
            )}
            {/* Shimmer effect */}
            {!loading && <div className="absolute inset-0 -translate-x-full bg-white/20 group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />}
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}
