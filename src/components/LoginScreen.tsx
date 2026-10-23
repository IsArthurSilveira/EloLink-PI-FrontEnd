import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, BriefcaseBusiness, Rocket } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (role: 'admin' | 'investor' | 'startup') => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState<'investor' | 'startup'>('startup');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === 'register' && !name.trim()) {
      setError('Informe seu nome para criar a conta.');
      return;
    }
    if (!email.trim() || !password) {
      setError('Informe seu e-mail e sua senha para continuar.');
      return;
    }

    if (!email.includes('@')) {
      setError('Informe um e-mail válido.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    const demoAccounts = {
      'admin@elolink.com': { password: 'admin123', role: 'admin' as const },
      'investidor@elolink.com': { password: 'investor123', role: 'investor' as const },
      'startup@elolink.com': { password: 'startup123', role: 'startup' as const }
    };
    if (mode === 'login') {
      const account = demoAccounts[email.trim().toLowerCase() as keyof typeof demoAccounts];
      if (!account || account.password !== password) {
        setError('E-mail ou senha inválidos.');
        return;
      }
      localStorage.setItem('elo-link-authenticated', 'true');
      localStorage.setItem('elo-link-role', account.role);
      onLogin(account.role);
      return;
    }

    localStorage.setItem('elo-link-authenticated', 'true');
    localStorage.setItem('elo-link-role', accountType);
    onLogin(accountType);
  };

  return (
    <main className="min-h-screen bg-[#06080F] text-zinc-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-blue-500 to-emerald-400 p-[1.5px] shadow-2xl shadow-purple-950/40">
            <div className="w-full h-full bg-[#0C0F1C] rounded-[14px] flex items-center justify-center p-3 overflow-hidden">
              <img
                src="/assets/brand/elolink_logo_Elo_branco_1_059c311e.png"
                alt="EloLink"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-black tracking-tight text-white">
            Elo<span className="text-purple-400">Link</span>
          </h1>
          <p className="mt-1 text-sm text-zinc-400 text-center">
            Conecte-se ao ecossistema de startups e investidores
          </p>
        </div>

        <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-black/30">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">{mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}</h2>
            <p className="mt-1 text-xs text-zinc-400">{mode === 'login' ? 'Entre na sua conta para continuar' : 'Escolha seu perfil para entrar no ecossistema'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label htmlFor="register-name" className="mb-1.5 block text-xs font-semibold text-zinc-300">Nome completo</label>
                <input id="register-name" type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Seu nome" autoComplete="name" className="w-full rounded-xl border border-purple-950/50 bg-[#080B16] px-3 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-purple-500" />
              </div>
            )}
            <div>
              <label htmlFor="login-email" className="block mb-1.5 text-xs font-semibold text-zinc-300">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="voce@empresa.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-purple-950/50 bg-[#080B16] py-3 pl-10 pr-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block mb-1.5 text-xs font-semibold text-zinc-300">
                Senha
              </label>
              <div className="relative">
                <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-purple-950/50 bg-[#080B16] py-3 pl-10 pr-11 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-200"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <p className="mb-2 text-xs font-semibold text-zinc-300">Você é:</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'startup' as const, label: 'Startup', icon: Rocket },
                    { value: 'investor' as const, label: 'Investidor', icon: BriefcaseBusiness }
                  ].map(({ value, label, icon: Icon }) => (
                    <button key={value} type="button" onClick={() => setAccountType(value)} className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition-colors ${accountType === value ? 'border-purple-500 bg-purple-500/15 text-purple-200' : 'border-purple-950/50 bg-[#080B16] text-zinc-400'}`}>
                      <Icon className="mr-1.5 inline h-4 w-4" />{label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-center text-xs text-zinc-400">
              {mode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
              <button
                type="button"
                onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
                className="font-bold text-purple-400 transition-colors hover:text-purple-300"
              >
                {mode === 'login' ? 'Cadastre-se' : 'Entre'}
              </button>
            </p>

            {error && (
              <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-purple-950/40 transition-all hover:from-purple-500 hover:to-blue-500 active:scale-[0.99]"
            >
              {mode === 'login' ? 'Entrar' : 'Criar conta'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </main>
  );
};
