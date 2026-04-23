import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Globe, TrendingUp, Users, Clock, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

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
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simula o tempo do OAuth Popup da Meta
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Visão Geral</h1>
        <p className="text-sm text-zinc-500 mt-1">Acompanhe a performance da sua conta do Instagram.</p>
      </div>

      {/* Integration Alert */}
      {!isConnected ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 transition-all">
          <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="text-sm font-semibold text-amber-800">Conecte seu Instagram</h3>
            <p className="text-sm text-amber-700 mt-1">Para o AutoFeed funcionar e coletarmos métricas reais, você precisa conectar sua conta comercial.</p>
            <button 
              onClick={handleConnect}
              disabled={isConnecting}
              className="mt-3 text-sm font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 shadow-sm disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isConnecting ? (
                <><Loader2 size={16} className="animate-spin" /> Conectando com a Meta...</>
              ) : (
                <><Globe size={16} /> Conectar Conta Meta</>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 transition-all animate-fade-in">
          <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="text-sm font-semibold text-emerald-800">Instagram Conectado!</h3>
            <p className="text-sm text-emerald-700 mt-1">Sua conta <strong>@minhamarca</strong> foi vinculada com sucesso. O motor de automação já pode operar.</p>
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
        <h2 className="text-lg font-semibold text-zinc-900 mb-4">Próximos Posts (AutoFeed)</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { tag: 'IA', title: '5 Ferramentas de IA para não designers', time: 'Hoje, 18:00' },
            { tag: 'Estratégia', title: 'Como planejar seu mês em 1h', time: 'Amanhã, 12:00' },
            { tag: 'Vendas', title: 'O maior erro ao divulgar seu serviço', time: 'Sex, 09:00' },
          ].map((post, i) => (
            <div key={i} className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col hover:border-zinc-300 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  {post.tag}
                </span>
                <span className="text-xs font-mono text-zinc-400">{post.time}</span>
              </div>
              <p className="text-sm font-semibold text-zinc-800 line-clamp-2 leading-snug">
                {post.title}
              </p>
              <div className="mt-auto pt-4 flex gap-1">
                {[1,2,3,4,5].map(s => (
                  <div key={s} className="h-10 flex-1 bg-zinc-100 rounded-md border border-zinc-200" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
