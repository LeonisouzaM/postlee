import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Simula criação e joga pro app ou onboarding
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      
      {/* Header Minimalista */}
      <header className="p-6 md:p-8 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-inner">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-semibold tracking-tight text-zinc-900 text-lg">
            Postlee<span className="text-indigo-500 font-normal">.ai</span>
          </span>
        </NavLink>
        <NavLink to="/" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition-colors">
          <ArrowLeft size={16} /> Voltar ao Início
        </NavLink>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center p-4 gap-8 md:gap-16 max-w-5xl mx-auto w-full">
        
        {/* Left Side: Value Prop */}
        <div className="hidden md:flex flex-col flex-1 pb-10">
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6">
            Automatize o crescimento do seu negócio hoje.
          </h1>
          <div className="space-y-4">
            {[
              'Inteligência Artificial programada para engajar',
              'Geração visual de Carrosséis com design profissional',
              'Autopostagem nativa no Instagram (Risco Zero)',
              'Testado grátis nos primeiros 7 dias'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check size={14} className="text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-zinc-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full max-w-[440px] bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl shadow-zinc-900/5 animate-fade-up">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Criar Conta Grátis</h2>
            <p className="text-sm text-zinc-500 mt-2">Você a poucos passos de transformar sua rede social.</p>
          </div>

          <button 
            onClick={handleRegister}
            className="w-full bg-white border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 text-zinc-700 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l2.85-2.22.83-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Cadastrar com o Google
          </button>

          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-zinc-200"></div>
            <span className="shrink-0 text-xs font-medium text-zinc-400 px-4 uppercase tracking-wider">ou use seu e-mail</span>
            <div className="flex-grow border-t border-zinc-200"></div>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Nome Completo</label>
              <input 
                type="text" 
                required
                placeholder="Como devemos te chamar?"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Seu melhor E-mail</label>
              <input 
                type="email" 
                required
                placeholder="seu@negocio.com"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Crie uma Senha Forte</label>
              <input 
                type="password" 
                required
                placeholder="Mínimo 8 caracteres"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all"
              />
            </div>

            <button type="submit" className="w-full btn-primary py-3.5 mt-2 shadow-md shadow-indigo-600/10 text-sm group">
              Criar Conta e Continuar <ArrowRight className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[11px] text-zinc-400 mt-3">
              Ao criar conta, você concorda com nossos Termos de Uso e Política de Privacidade.
            </p>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
            <p className="text-sm text-zinc-500">
              Já tem uma conta? <NavLink to="/login" className="font-bold text-indigo-600 hover:text-indigo-700">Fazer Login</NavLink>
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}
