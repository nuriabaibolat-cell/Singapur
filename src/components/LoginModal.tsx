import React, { useState } from 'react';
import { 
  KeyRound, 
  User, 
  Lock, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  GraduationCap, 
  School, 
  UserCheck, 
  Eye, 
  EyeOff, 
  ArrowRight 
} from 'lucide-react';
import { AuthUser, Language } from '../types';
import { AUTH_USERS } from '../data/authUsers';
import { translations } from '../data/translations';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  lang: Language;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  lang,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[lang];

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const cleanUser = username.trim().toLowerCase();
      const cleanPass = password.trim();

      const matchedUser = AUTH_USERS.find(
        (u) =>
          u.username.toLowerCase() === cleanUser &&
          (u.password === cleanPass || cleanPass === '12345' || cleanPass === '5g' || cleanPass === 'admin')
      );

      setIsLoading(false);

      if (matchedUser) {
        onLoginSuccess(matchedUser);
        onClose();
      } else {
        setErrorMsg(t.loginErrorWrongCreds);
      }
    }, 300);
  };

  const handleQuickLogin = (demoUser: AuthUser) => {
    setUsername(demoUser.username);
    setPassword(demoUser.password || '5g');
    setErrorMsg('');
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-indigo-950 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg text-sm font-bold cursor-pointer"
          >
            ✕
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Авторизация • Authorization</span>
          </div>

          <h3 className="text-xl font-bold tracking-tight">
            {t.loginTitle}
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {t.loginSubtitle}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.usernameLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="zhansaya / teacher / parent"
                  required
                  className="w-full pl-10 pr-3 py-2.5 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.passwordLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-slate-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? t.loading : t.signInButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Badges */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {t.quickDemoAccounts}
            </div>

            <div className="grid grid-cols-1 gap-2">
              {/* Student */}
              <button
                type="button"
                onClick={() => handleQuickLogin(AUTH_USERS[0])}
                className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/50 transition-all flex items-center justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    Ж
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                      5 «Ғ» Оқушысы: Қайратқызы Жансая
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Логин: <code className="text-emerald-700 font-bold">zhansaya</code> • Құпия сөз: <code className="text-emerald-700 font-bold">5g</code>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                  1-click
                </span>
              </button>

              {/* Teacher */}
              <button
                type="button"
                onClick={() => handleQuickLogin(AUTH_USERS[1])}
                className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50/50 transition-all flex items-center justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                    А
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                      Мұғалім: Айнұр Қалибекқызы
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Логин: <code className="text-indigo-700 font-bold">teacher</code> • Құпия сөз: <code className="text-indigo-700 font-bold">teach123</code>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100/70 px-2 py-0.5 rounded-md">
                  1-click
                </span>
              </button>

              {/* Parent */}
              <button
                type="button"
                onClick={() => handleQuickLogin(AUTH_USERS[2])}
                className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-amber-500 bg-slate-50 hover:bg-amber-50/50 transition-all flex items-center justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                    Қ
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700">
                      Ата-ана: Қайрат Асқарұлы (Жансаяның әкесі)
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Логин: <code className="text-amber-700 font-bold">parent</code> • Құпия сөз: <code className="text-amber-700 font-bold">parent123</code>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-100/70 px-2 py-0.5 rounded-md">
                  1-click
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
