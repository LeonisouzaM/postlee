import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Globe, TrendingUp, Users, Clock, AlertCircle, Loader2, CheckCircle2, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api';
import { NavLink } from 'react-router-dom';

// Mock data for the chart
const data = [
  { name: 'Seg', impressions: 4000, reach: 2400 },
  { name: 'Ter', impressions: 3000, reach: 1398 },
  { name: 'Qua', impressions: 2000, reach: 9800 },
  { name: 'Qui', impressions: 2780, reach: 3908 },
  { name: 'Sex', impressions: 1890, reach: 4800 },
  { name: 'Sáb', impressions: 2390, reach: 3800 },
  { name: 'Dom', impressions: 3490, reach: 4300 },
];

export default function Overview() {
  const { activeProject } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState({ connected: false });
  const [upcomingPosts, setUpcomingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    if (!activeProject) return;
    try {
      const res = await api.get(`/projects/${activeProject.id}/instagram/status`);
      setStatus(res);
      
      const postsRes = await api.get(`/projects/${activeProject.id}/posts?status=scheduled&limit=3`);
      setUpcomingPosts(postsRes.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [activeProject]);

  const handleConnect = async () => {
    if (!activeProject) return;
    setIsConnecting(true);
    try {
      const res = await api.post(`/projects/${activeProject.id}/instagram/connect`);
      if (res.auth_url) {
        window.location.href = res.auth_url;
      }
    } catch (err) {
      alert("Erro ao conectar: " + err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  if (loading && !status.connected) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
        <p>Sincronizando seu dashboard...</p>
      </div>
    );
  }

  const isConnected = status.connected;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Visão Geral</h1>
        <p className="text-sm text-zinc-500 mt-1">Acompanhe a performance da sua conta do Instagram.</p>
      </div>

      {/* Integration Alert */}
      {!isConnected ? (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0 border border-amber-200/50">
            <Globe className="text-amber-600" size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-amber-900">Conecte seu Instagram comercial</h3>
            <p className="text-sm text-amber-800 mt-1 max-w-2xl leading-relaxed">
              O Posta.ai precisa da autorização oficial da Meta para agendar seus carrosséis e ler os resultados. Sem isso, os ganchos e artes não podem ser publicados automaticamente.
            </p>
            <button 
              onClick={handleConnect}
              disabled={isConnecting}
              className="mt-4 text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 px-6 py-2.5 rounded-xl transition-all inline-flex items-center gap-2 shadow-lg shadow-amber-600/20 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isConnecting ? (
                <><Loader2 size={16} className="animate-spin" /> Abrindo Central de Contas...</>
              ) : (
                <><Globe size={16} /> Conectar com a Meta</>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-start gap-4 transition-all animate-fade-in">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-200/50">
            <CheckCircle2 className="text-emerald-600" size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-emerald-900">Instagram Conectado: @{status.username}</h3>
            <p className="text-sm text-emerald-800 mt-1">Sua conta está saudável e pronta para receber postagens. O motor de IA está sincronizado com seu canal oficial.</p>
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Alcance Médio', value: '12.4K', trend: '+14%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Engajamento', value: '4.8%', trend: '+2.1%', icon: TrendingUp, color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Posts na Fila', value: '12', trend: '', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Status AutoFeed', value: isConnected ? 'Ativo' : 'Aguardando', trend: '', icon: Globe, color: isConnected ? 'text-emerald-600' : 'text-amber-600', bg: isConnected ? 'bg-emerald-50' : 'bg-amber-50' },
        ].map((metric, i) => (
          <div key={i} className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${metric.bg} flex items-center justify-center`}>
                <metric.icon size={20} className={metric.color} />
              </div>
              {metric.trend && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  {metric.trend}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">{metric.label}</p>
              <p className="text-2xl font-bold text-zinc-900 mt-1">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-zinc-900">Performance da Semana</h2>
          <select className="text-sm font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-indigo-500/20">
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
          </select>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ stroke: '#a1a1aa', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area type="monotone" dataKey="reach" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorReach)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Próximos Posts Preview */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-semibold text-zinc-900">Próximos Posts (AutoFeed)</h2>
          <NavLink to="/app/calendar" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            Ver calendário completo <ChevronRight size={14}/>
          </NavLink>
        </div>
        
        {upcomingPosts.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-10 text-center flex flex-col items-center">
             <Clock className="text-zinc-300 mb-3" size={32} />
             <p className="text-sm text-zinc-500">Nenhum post agendado para o AutoFeed.</p>
             <NavLink to="/app/calendar" className="text-sm font-bold text-indigo-600 mt-2">Agendar agora</NavLink>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {upcomingPosts.map((post) => (
              <NavLink to={`/app/editor/${post.id}`} key={post.id} className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    {post.ai_prompt?.split(' ')[0] || 'POST'}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">{new Date(post.scheduled_for).toLocaleDateString()}</span>
                </div>
                <p className="text-sm font-semibold text-zinc-800 line-clamp-2 leading-snug group-hover:text-indigo-700 transition-colors">
                  {post.ai_prompt || 'Post Gerado'}
                </p>
                <div className="mt-auto pt-4 flex gap-1.5">
                  {post.slides?.slice(0, 5).map((s, idx) => (
                    <div key={idx} className={`h-8 flex-1 rounded-md border ${idx === 0 ? 'bg-indigo-500 border-indigo-600' : 'bg-zinc-50 border-zinc-200'}`} />
                  ))}
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
