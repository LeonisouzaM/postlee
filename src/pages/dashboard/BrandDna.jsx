import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, CheckCircle, X, Plus, Loader2, Palette, LayoutDashboard, Settings, Info } from 'lucide-react';
import { api } from '../../api';

const BrandDna = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const [dna, setDna] = useState({
    cor_da_marca: '#108981',
    nicho: '',
    nicho_outro: '',
    o_que_vende: '',
    cliente_ideal: '',
    dor_do_cliente: '',
    tom_de_voz: 'Direto e objetivo',
    palavras_proibidas: [],
    objetivo_principal: 'Posicionar'
  });

  useEffect(() => {
    const fetchDna = async () => {
      try {
        setLoading(true);
        if (!projectId) {
          const projectsData = await api.get('/projects');
          if (projectsData.projects?.length > 0) {
            navigate(`/app/brand/${projectsData.projects[0].id}`, { replace: true });
            return;
          }
        } else {
          const data = await api.get(`/projects/${projectId}`);
          if (data.project?.brand_dna?.full_config) {
            setDna(data.project.brand_dna.full_config);
          }
        }
      } catch (e) {
        console.error("Erro ao carregar DNA", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDna();
  }, [projectId, navigate]);

  const up = (field, val) => {
    setDna(prev => ({ ...prev, [field]: val }));
  };

  const addTag = () => {
    if (tagInput.trim() && dna.palavras_proibidas?.length < 6) {
      up('palavras_proibidas', [...(dna.palavras_proibidas || []), tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    up('palavras_proibidas', dna.palavras_proibidas.filter(t => t !== tag));
  };

  const save = async () => {
    try {
      setSaving(true);
      await api.put(`/projects/${projectId}/full-dna`, { dna });
      setShowToaster(true);
      setTimeout(() => setShowToaster(false), 3000);
    } catch (err) {
      alert(`❌ Erro: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const calculateProgress = () => {
    let filled = 1;
    if (dna.nicho) filled++;
    if (dna.o_que_vende?.trim()?.length > 5) filled++;
    if (dna.cliente_ideal?.trim()?.length > 5) filled++;
    if (dna.dor_do_cliente?.trim()?.length > 5) filled++;
    if (dna.tom_de_voz) filled++;
    if (dna.palavras_proibidas?.length > 0) filled++;
    if (dna.objetivo_principal) filled++;
    return filled;
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#f8fafb]">
      <Loader2 className="animate-spin text-[#108981]" size={32} />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-24 px-4">
      
      {/* HEADER DINÂMICO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 bg-[#f8fafb]/90 backdrop-blur-md sticky top-0 py-6 z-20 border-b border-gray-100 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#108981] w-2 h-6 rounded-full inline-block"></span>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">DNA da Marca</h1>
          </div>
          <p className="text-gray-500 text-sm font-medium">Personalize a inteligência por trás dos seus posts.</p>
        </div>
        <button 
          onClick={save} 
          disabled={saving}
          className="bg-[#108981] text-white px-10 py-4 rounded-2xl font-black shadow-2xl shadow-[#108981]/30 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 size={20} className="animate-spin"/> : <Save size={20}/>}
          SALVAR ALTERAÇÕES
        </button>
      </div>

      {/* BARRA DE PROCESSO PREMIUM */}
      <div className="mb-16 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#108981]">Status da Configuração</span>
          <span className="text-sm font-bold text-gray-900">{calculateProgress()}/8 Campos</span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex gap-1.5 p-1">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className={`flex-1 rounded-full transition-all duration-700 ${i <= calculateProgress() ? 'bg-gradient-to-r from-[#108981] to-[#14a39a]' : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>

      <div className="space-y-10">
        
        {/* IDENTIDADE E NICHO */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 hover:border-[#108981]/30 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#108981]/10 rounded-2xl text-[#108981]"><LayoutDashboard size={20}/></div>
              <label className="text-lg font-black text-gray-800">Seu Mercado</label>
            </div>
            <select 
              value={dna.nicho} 
              onChange={(e) => up('nicho', e.target.value)} 
              className="w-full p-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-[#108981] outline-none font-bold text-gray-700 appearance-none cursor-pointer"
            >
              <option value="">Selecione seu nicho...</option>
              {['Marketing Digital', 'Saúde e Bem-estar', 'Finanças', 'Educação', 'Moda e Beleza', 'Tech e SaaS', 'Fitness', 'Imobiliário', 'Outro'].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </section>

          <section className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 hover:border-[#108981]/30 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600"><Palette size={20}/></div>
              <label className="text-lg font-black text-gray-800">Cor da Marca</label>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative group">
                <input type="color" value={dna.cor_da_marca} onChange={(e) => up('cor_da_marca', e.target.value)} className="w-16 h-16 rounded-2xl cursor-pointer border-none bg-transparent" />
                <div className="absolute inset-0 rounded-2xl shadow-inner pointer-events-none border-2 border-white/20"></div>
              </div>
              <div className="flex gap-2">
                {['#108981', '#6366f1', '#f59e0b', '#000000'].map(c => (
                  <button key={c} onClick={() => up('cor_da_marca', c)} className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-125 ${dna.cor_da_marca === c ? 'border-gray-900 scale-110' : 'border-transparent'}`} style={{backgroundColor: c}} />
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* PRODUTO */}
        <section className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Info size={80}/></div>
          <label className="block text-lg font-black text-gray-800 mb-2">O que você vende?</label>
          <p className="text-xs text-gray-400 mb-6 font-medium">Explique seu produto como se eu tivesse 5 anos.</p>
          <textarea 
            rows="3"
            maxLength={250}
            value={dna.o_que_vende}
            onChange={(e) => up('o_que_vende', e.target.value)}
            className="w-full p-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#108981] outline-none text-gray-700 font-medium resize-none"
            placeholder="Ex: Eu ajudo dentistas a dobrarem seu faturamento usando anúncios no Instagram."
          />
        </section>

        {/* PÚBLICO E DOR */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex flex-col">
            <label className="text-lg font-black text-gray-800 mb-4">Público Alvo</label>
            <textarea 
              value={dna.cliente_ideal}
              onChange={(e) => up('cliente_ideal', e.target.value)}
              placeholder="Ex: Mulheres entre 25-40 anos que..."
              className="w-full p-4 rounded-xl bg-gray-50 border-none h-40 resize-none outline-none font-medium text-gray-600"
            />
          </section>
          <section className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex flex-col">
            <label className="text-lg font-black text-gray-800 mb-4 text-red-500">Qual a Maior Dor?</label>
            <textarea 
              value={dna.dor_do_cliente}
              onChange={(e) => up('dor_do_cliente', e.target.value)}
              placeholder="O que tira o sono do seu cliente?"
              className="w-full p-4 rounded-xl bg-gray-50 border-none h-40 resize-none outline-none font-medium text-gray-600"
            />
          </section>
        </div>

        {/* TOM DE VOZ DETALHADO */}
        <section className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
             <div className="p-3 bg-amber-50 rounded-2xl text-amber-600"><Settings size={20}/></div>
             <label className="text-lg font-black text-gray-800">Tom de Voz da Marca</label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'Direto', desc: 'Objetivo, sem enrolação e focado no resultado.' },
              { id: 'Acolhedor', desc: 'Empático, amigável e focado na conexão.' },
              { id: 'Técnico', desc: 'Autoridade, dados e termos específicos do nicho.' },
              { id: 'Inspirador', desc: 'Energético, aspiracional e motivador.' }
            ].map(opt => (
              <button 
                key={opt.id} 
                onClick={() => up('tom_de_voz', opt.id)} 
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  dna.tom_de_voz === opt.id ? 'border-[#108981] bg-[#108981]/5 shadow-sm' : 'border-gray-50 hover:border-gray-200'
                }`}
              >
                <div className="font-black text-gray-900 mb-1">{opt.id}</div>
                <div className="text-xs text-gray-400 font-medium leading-relaxed">{opt.desc}</div>
              </button>
            ))}
          </div>
        </section>

        {/* OBJETIVO PRINCIPAL */}
        <section className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
          <label className="block text-lg font-black text-gray-800 mb-8 text-center uppercase tracking-widest text-[#108981] text-xs">Objetivo do Perfil</label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'Vender', label: '💰 Vendas' },
              { id: 'Posicionar', label: '💎 Autoridade' },
              { id: 'Crescer', label: '🚀 Crescer' }
            ].map(opt => (
              <button 
                key={opt.id} 
                onClick={() => up('objetivo_principal', opt.id)} 
                className={`py-4 rounded-2xl border-2 font-black text-sm transition-all shadow-sm ${
                  dna.objetivo_principal === opt.id ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-50 text-gray-400 bg-gray-50/50 hover:bg-gray-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* PALAVRAS PROIBIDAS */}
        <section className="bg-white p-10 rounded-[40px] shadow-xl border-4 border-dashed border-gray-50">
          <label className="block text-xl font-black text-gray-900 mb-4">🚫 Blacklist</label>
          <p className="text-sm text-gray-400 mb-8 font-medium">Palavras que a IA NUNCA deve usar nos seus textos.</p>
          <div className="flex flex-wrap gap-3 p-4 rounded-[24px] bg-gray-50 min-h-[80px]">
            {dna.palavras_proibidas?.map((tag, i) => (
              <span key={i} className="bg-gray-900 text-white text-[11px] font-black px-5 py-2.5 rounded-full flex items-center gap-3 group">
                {tag} <X size={16} className="cursor-pointer text-gray-500 group-hover:text-red-400 transition-colors" onClick={() => removeTag(tag)}/>
              </span>
            ))}
            <input 
              type="text" 
              placeholder="Ex: Guru, Segredo, Grátis..." 
              className="bg-transparent outline-none p-2 flex-1 font-bold text-gray-700 min-w-[200px]" 
              value={tagInput} 
              onChange={(e) => setTagInput(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && addTag()} 
            />
          </div>
        </section>

      </div>

      {showToaster && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-[#108981] text-white px-12 py-5 rounded-[24px] font-black text-lg flex items-center gap-4 shadow-[0_20px_50px_rgba(16,137,129,0.4)] animate-bounce z-50">
          <CheckCircle size={24}/> DNA SINCRONIZADO!
        </div>
      )}
    </div>
  );
};

export default BrandDna;
