import React, { useState, useEffect } from 'react';
import { User, Zap, Globe, CreditCard, Shield, Plus, Clock, Loader2, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api';

export default function SettingsView() {
  const { user, activeProject, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ connected: false });
  const [disconnecting, setDisconnecting] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!activeProject) return;
      try {
        const res = await api.get(`/projects/${activeProject.id}/instagram/status`);
        setStatus(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [activeProject]);

  const handleDisconnect = async () => {
    if (!activeProject || !window.confirm("Deseja realmente desconectar seu Instagram?")) return;
    setDisconnecting(true);
    try {
      await api.delete(`/projects/${activeProject.id}/instagram/disconnect`);
      setStatus({ connected: false });
      alert("Instagram desconectado com sucesso.");
    } catch (err) {
      alert("Erro ao desconectar: " + err.message);
    } finally {
      setDisconnecting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
        <p>Carregando suas configurações...</p>
      </div>
    );
  }
  return (
    <div className="space-y-8 animate-fade-in pb-10 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Configurações</h1>
        <p className="text-sm text-zinc-500 mt-1">Gerencie sua conta, plano e integrações com redes sociais.</p>
      </div>

      <div className="space-y-6">
        
        {/* Integrações */}
        <section className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Globe size={20} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-zinc-900">Integração Oficial Meta</h2>
                <p className="text-sm text-zinc-500">Conecte sua Conta Comercial do Instagram e Página do Facebook.</p>
              </div>
            </div>
            {status.connected ? (
              <button 
                onClick={handleDisconnect}
                disabled={disconnecting}
                className="text-sm font-semibold text-rose-600 bg-rose-50 px-4 py-2 rounded-lg hover:bg-rose-100 transition-colors disabled:opacity-50"
              >
                {disconnecting ? 'Processando...' : 'Desconectar'}
              </button>
            ) : (
                <button 
                   onClick={() => window.location.href='/app'} // Redirect to dashboard to connect
                   className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  Conectar agora
                </button>
            )}
          </div>
          {status.connected && (
            <div className="bg-zinc-50 px-6 py-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-zinc-700">Conectado como <strong>@{status.username}</strong></span>
              {status.connected_at && <span className="text-xs text-zinc-400 ml-auto">Desde {new Date(status.connected_at).toLocaleDateString()}</span>}
            </div>
          )}
        </section>

        {/* AutoFeed Configuration */}
        <section className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                <Zap size={20} className="text-indigo-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-zinc-900">Setup do AutoFeed</h2>
                <p className="text-sm text-zinc-500">Controle o volume e os horários que a máquina vai rodar por você.</p>
              </div>
              
              <label className="ml-auto relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                <span className="ml-3 text-sm font-medium text-zinc-600">Ativado</span>
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Frequência (Entregas IA/Mês)</label>
                <div className="flex items-center gap-4">
                  <input type="range" min="1" max="30" defaultValue="12" className="w-full accent-indigo-600" />
                  <span className="text-sm font-bold text-zinc-900 bg-zinc-100 px-3 py-1 rounded-lg">12 Posts</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Horários de Postagem</label>
                <div className="flex flex-wrap gap-2">
                  {['09:00', '12:00', '18:00'].map(t => (
                    <span key={t} className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1.5 rounded-lg">
                      <Clock size={14} /> {t}
                    </span>
                  ))}
                  <button className="inline-flex items-center gap-1 bg-white border border-dashed border-zinc-300 text-zinc-500 hover:text-zinc-700 hover:border-zinc-400 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors">
                    <Plus size={14} /> Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Perfil */}
        <section className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
              <User size={20} className="text-zinc-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-900">Seu Perfil</h2>
              <p className="text-sm text-zinc-500">Atualize suas informações pessoais de acesso.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Nome Completo</label>
              <input type="text" readOnly value={user.name} className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">E-mail de Acesso</label>
              <input type="email" readOnly value={user.email} className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-500 outline-none" />
            </div>
          </div>
        </section>

        {/* Faturamento */}
        <section className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                <CreditCard size={20} className="text-violet-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-zinc-900">Assinatura Atual</h2>
                <p className="text-sm text-zinc-500">Você está atualmente no plano <strong className="text-violet-600 capitalize">{user.plan}</strong>.</p>
              </div>
            </div>
            <button className="btn-primary bg-zinc-900 hover:bg-zinc-800 shadow-none py-2 px-5 text-sm">
              Fazer Upgrade
            </button>
          </div>

          <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-zinc-900">Próxima renovação</p>
              <p className="text-sm text-zinc-500">12 de Maio de 2026</p>
            </div>
            <div className="flex items-center gap-2 text-zinc-600 text-sm font-medium">
              <Shield size={16} className="text-zinc-400" /> Pagamento Seguro via Kiwify
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
