import React from 'react';
import { 
  Globe, 
  School, 
  BookOpen, 
  Users, 
  Sparkles, 
  UserCheck, 
  LogOut, 
  LogIn, 
  Award,
  ChevronDown
} from 'lucide-react';
import { Language, UserRole, AuthUser } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  currentUser: AuthUser | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAITutor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenLogin,
  onLogout,
  activeTab,
  onTabChange,
  lang,
  onLanguageChange,
  onOpenAITutor,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner with bilingual switch & classes info */}
      <div className="bg-slate-900 text-slate-200 px-4 sm:px-6 lg:px-8 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-semibold text-blue-400">{t.schoolClassesBadge}</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-300">
              {lang === 'kk' ? 'Математика & Жаратылыстану сабақтары ағылшын тілінде' : 'Math & Science taught in full English immersion'}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Language Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-800 border border-slate-700">
              <button
                id="lang-switch-kk"
                onClick={() => onLanguageChange('kk')}
                className={`px-2 py-0.5 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                  lang === 'kk'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🇰🇿 Қаз
              </button>
              <button
                id="lang-switch-en"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-0.5 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🇬🇧 Eng
              </button>
            </div>

            {/* Current user session info / login button */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
                <span className="hidden md:inline text-[11px] text-slate-400">
                  {t.loggedInAs} <strong className="text-white">{currentUser.name}</strong>
                </span>
                <button
                  id="auth-logout-btn"
                  onClick={onLogout}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold text-red-300 hover:text-red-200 bg-red-950/60 hover:bg-red-900/80 rounded-md border border-red-800 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                  <span>{t.logOut}</span>
                </button>
              </div>
            ) : (
              <button
                id="auth-open-login-btn"
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-md shadow-xs transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t.logIn}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <div 
            onClick={() => onTabChange('methodology')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <School className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg text-slate-900 leading-none">
                  {t.appTitle}
                </h1>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-blue-100 text-blue-800 uppercase tracking-wider">
                  CPA & 5E
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* User Role Card & AI Quick Access */}
          <div className="flex items-center gap-3">
            {currentUser && (
              <div 
                onClick={onOpenLogin}
                className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-50 transition-colors cursor-pointer"
                title={t.switchRole}
              >
                <div className={`w-7 h-7 rounded-lg ${currentUser.avatarBg} text-white flex items-center justify-center font-bold text-xs shadow-xs`}>
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left leading-tight">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>{currentUser.name}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                  <div className="text-[10px] text-blue-700 font-medium">
                    {currentUser.roleTitle[lang]}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={onOpenAITutor}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-sky-200" />
              <span className="hidden sm:inline">{t.aiTutorBtnTitle}</span>
              <span className="sm:hidden">ЖИ</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex overflow-x-auto no-scrollbar gap-1 sm:gap-2 mt-3 pt-2 border-t border-slate-100">
          <button
            id="nav-tab-methodology"
            onClick={() => onTabChange('methodology')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'methodology'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.navMethodology}</span>
          </button>

          <button
            id="nav-tab-students"
            onClick={() => onTabChange('students')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'students'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t.navStudents} (5 «Ғ»)</span>
          </button>

          <button
            id="nav-tab-parents"
            onClick={() => onTabChange('parents')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'parents'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t.navParents}</span>
          </button>

          <button
            id="nav-tab-teacher"
            onClick={() => onTabChange('teacher')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'teacher'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{t.navTeacher}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
