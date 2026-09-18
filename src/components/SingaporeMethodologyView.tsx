import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Play, 
  Layers, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Globe, 
  Clock, 
  MessageSquare,
  HelpCircle,
  Shapes,
  Maximize2,
  Atom,
  FlaskConical,
  Sun,
  Droplets,
  Microscope,
  CheckCircle2,
  Lock,
  UserCheck
} from 'lucide-react';
import { SINGAPORE_CLASSES, LESSON_VIDEOS } from '../data/singaporeData';
import { SingaporeVideo, Language } from '../types';
import { translations } from '../data/translations';

interface SingaporeMethodologyViewProps {
  onSelectVideo: (video: SingaporeVideo) => void;
  onOpenAITutor: () => void;
  onOpenFeedback: () => void;
  onOpenLogin: () => void;
  lang: Language;
}

export const SingaporeMethodologyView: React.FC<SingaporeMethodologyViewProps> = ({
  onSelectVideo,
  onOpenAITutor,
  onOpenFeedback,
  onOpenLogin,
  lang,
}) => {
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'math-bar' | 'science-inquiry'>('math-bar');
  const [activeCpaTab, setActiveCpaTab] = useState<'concrete' | 'pictorial' | 'abstract'>('pictorial');
  const [activeScience5ETab, setActiveScience5ETab] = useState<'engage' | 'explore' | 'explain' | 'elaborate' | 'evaluate'>('explore');
  const [modelType, setModelType] = useState<'part-whole' | 'comparison'>('comparison');
  
  // Interactive Bar Model values (Singapore Math)
  const [partA, setPartA] = useState<number>(30);
  const [multiplier, setMultiplier] = useState<number>(3);

  // Interactive Science Lab values (Singapore Science 5E Inquiry: Photosynthesis & Plant Growth)
  const [sunlightHours, setSunlightHours] = useState<number>(8);
  const [waterLevel, setWaterLevel] = useState<number>(75);

  const t = translations[lang];
  const total = modelType === 'comparison' ? partA + (partA * multiplier) : partA * 2;

  // Science calculation
  const growthRate = Math.min(100, Math.round((sunlightHours / 12) * 55 + (waterLevel / 100) * 45));
  const oxygenOutput = (sunlightHours * 1.8 * (waterLevel / 100)).toFixed(1);

  return (
    <div className="space-y-12">
      {/* Hero / Introduction to Singapore Curriculum in our School - White & Blue Theme */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white p-6 sm:p-10 shadow-xl border border-blue-900/50">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.methodologyHeroBadge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
            {t.methodologyHeroTitle}
          </h1>

          <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
            {t.methodologyHeroDesc}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="hero-watch-lessons-btn"
              onClick={() => {
                const el = document.getElementById('lesson-videos-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{t.watchLessonsBtn}</span>
            </button>

            <button
              id="hero-open-ai-tutor-btn"
              onClick={onOpenAITutor}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>{t.tryAiTutorBtn}</span>
            </button>

            <button
              id="hero-open-login-btn"
              onClick={onOpenLogin}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-400/20 hover:bg-sky-400/30 text-sky-200 font-bold text-xs sm:text-sm border border-sky-300/30 transition-all cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-sky-300" />
              <span>{lang === 'kk' ? 'Аккаунтпен кіру (Оқушы, Ата-ана, Мұғалім)' : 'Login with Account (Student, Parent, Teacher)'}</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid - White & Blue themed */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-blue-800/60 text-center">
          <div className="p-3.5 rounded-2xl bg-blue-900/40 border border-blue-700/40 backdrop-blur-xs">
            <div className="text-2xl font-black text-sky-300">{t.classesCountStat}</div>
            <div className="text-[11px] text-blue-200 font-medium mt-0.5">{t.classesSubStat}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-900/40 border border-blue-700/40 backdrop-blur-xs">
            <div className="text-2xl font-black text-white">Math & Science</div>
            <div className="text-[11px] text-blue-200 font-medium mt-0.5">
              {lang === 'kk' ? 'Ағылшын тілінде оқу' : 'English Immersion'}
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-900/40 border border-blue-700/40 backdrop-blur-xs">
            <div className="text-2xl font-black text-sky-300">CPA & 5E</div>
            <div className="text-[11px] text-blue-200 font-medium mt-0.5">
              {lang === 'kk' ? 'Сингапур оқыту жүйесі' : 'Pedagogical Frameworks'}
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-900/40 border border-blue-700/40 backdrop-blur-xs">
            <div className="text-2xl font-black text-amber-300">ЖИ / AI Lab</div>
            <div className="text-[11px] text-blue-200 font-medium mt-0.5">
              {lang === 'kk' ? '5-сыныппен зерттеу' : 'Human-AI Interaction'}
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Quick Access Callout */}
      <section className="bg-blue-50/80 rounded-2xl p-4 sm:p-5 border border-blue-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
            <UserCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
              {lang === 'kk' ? 'Үш деңгейлі жеке қолжетімділік' : 'Three-Tier Role Access'}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {lang === 'kk'
                ? 'Оқушы (Жансая 5 «Ғ»), ата-ана (Қайрат А.) және мұғалім (Айнұр Қ.) өз жеке кабинетіне кіре алады.'
                : 'Student (Zhansaia 5 G), Parent (Kairat A.), and Teacher (Ainur Q.) sign in to dedicated portals.'}
            </p>
          </div>
        </div>
        <button
          onClick={onOpenLogin}
          className="shrink-0 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
        >
          {lang === 'kk' ? 'Аккаунтты ауыстыру / Кіру' : 'Switch Account / Login'}
        </button>
      </section>

      {/* School Classes Presentation: 5 «А», 5 «Ғ», 1 «Ә» in Clean White & Blue */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
              {lang === 'kk' ? 'Мектебіміздің Сингапур сыныптары' : 'Our School Singapore Classes'}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {lang === 'kk' ? 'Инновациялық сыныптар (5 «А», 5 «Ғ», 1 «Ә»)' : 'Singapore Innovation Classes (5 A, 5 G, 1 Ä)'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            {lang === 'kk' 
              ? 'Математика мен жаратылыстану пәндерін ағылшын тілінде Сингапур әдістемесімен меңгереді.'
              : 'Learning Mathematics and Science in English through the Singapore pedagogy.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SINGAPORE_CLASSES.map((cls) => (
            <div
              key={cls.id}
              className={`bg-white rounded-2xl p-5 border transition-all shadow-xs hover:shadow-md flex flex-col justify-between ${
                cls.id === 'class-5g' ? 'border-blue-400 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    {lang === 'kk' ? cls.gradeKk : cls.gradeEn}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {cls.studentsCount} {lang === 'kk' ? 'оқушы' : 'students'}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      {lang === 'kk' ? cls.name : cls.nameEn}
                    </h3>
                    {cls.id === 'class-5g' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-900 border border-sky-300">
                        {lang === 'kk' ? 'Жансая сыныбы' : 'Zhansaia\'s Class'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {lang === 'kk' ? cls.focusKk : cls.focusEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                  <div>
                    <span className="font-semibold text-slate-700">
                      {lang === 'kk' ? 'Жетекші мұғалімдер:' : 'Instructors:'}
                    </span> {cls.mentorTeacher}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">
                      {lang === 'kk' ? 'Оқу жылы:' : 'Academic Year:'}
                    </span> {cls.activeSince}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 flex flex-wrap gap-1.5 border-t border-slate-100">
                {cls.badges.map((b, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50/80 text-blue-700 border border-blue-100"
                  >
                    #{b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two Core Pillars: Singapore Mathematics (CPA) & Singapore Science (5E Inquiry) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
            {lang === 'kk' ? 'Сингапур әдістемесінің екі негізгі іргетасы' : 'Two Foundational Pillars of Singapore Curriculum'}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {lang === 'kk' 
              ? 'Математика және Жаратылыстану: Ағылшын тілінде қабылдау үлгісі'
              : 'Mathematics & Science: English Immersion Pedagogy'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {lang === 'kk'
              ? '5 «А», 5 «Ғ» және 1 «Ә» сыныптарында оқушылар жай ғана аударма жасамайды. Олар ойлауды ағылшын тілінде математикалық модельдер (Bar Models) және ғылыми 5E зерттеу циклі арқылы жүзеге асырады.'
              : 'In Singapore classes, learners do not just translate text. They cultivate mathematical modeling (Bar Models) and scientific reasoning directly through the 5E inquiry cycle in English.'}
          </p>
        </div>

        {/* 2-Pillars Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1: Singapore Math */}
          <div className="bg-gradient-to-br from-blue-50 via-white to-sky-50/50 rounded-2xl p-6 border border-blue-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Shapes className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {t.cpaPillarTitle}
                </h3>
                <span className="text-[11px] font-semibold text-blue-700">Concrete ➔ Pictorial ➔ Abstract</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.cpaPillarSubtitle}
            </p>
            <div className="space-y-2 pt-2 border-t border-blue-100 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Concrete (Заттық):</strong> Dienes blocks, Unifix текшелерімен тәжірибе жасау.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Pictorial (Bar Model):</strong> Мәтінді блок-сызбаға түсіріп, 1 unit табу.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Abstract (Формула):</strong> Ағылшын тілінде математикалық өрнек пен дәлел жазу.</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Singapore Science */}
          <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50/50 rounded-2xl p-6 border border-indigo-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {t.sciencePillarTitle}
                </h3>
                <span className="text-[11px] font-semibold text-indigo-700">Engage ➔ Explore ➔ Explain ➔ Elaborate ➔ Evaluate</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.sciencePillarSubtitle}
            </p>
            <div className="space-y-2 pt-2 border-t border-indigo-100 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span><strong>Engage & Explore:</strong> Тәжірибе арқылы табиғи құбылыстарды бақылау.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span><strong>Explain:</strong> Ғылыми терминдерді ағылшын тілінде түсіндіру (Photosynthesis, Density).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span><strong>Elaborate & Evaluate:</strong> Гипотезаның дұрыстығын ЖИ-мен тексеріп бағалау.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Simulator Section: Switch between Singapore Math & Singapore Science */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                {lang === 'kk' ? 'Практикалық зертхана' : 'Hands-on Interactive Lab'}
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {activeInteractiveTab === 'math-bar' ? t.barModelInteractive : t.scienceInquiryInteractive}
              </h3>
            </div>

            {/* Toggle between Math Bar Model & Science 5E Lab */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                id="interactive-tab-math-bar"
                onClick={() => setActiveInteractiveTab('math-bar')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeInteractiveTab === 'math-bar'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Shapes className="w-3.5 h-3.5" />
                <span>Singapore Math (Bar Model)</span>
              </button>
              <button
                id="interactive-tab-science-inquiry"
                onClick={() => setActiveInteractiveTab('science-inquiry')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeInteractiveTab === 'science-inquiry'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Singapore Science (5E Lab)</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Singapore Math Bar Model Simulator (White & Blue) */}
          {activeInteractiveTab === 'math-bar' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-blue-50/50 rounded-2xl p-6 border border-blue-200">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-600 text-white">
                    5 «Ғ» сыныбы мысалы
                  </span>
                  <span className="text-xs text-slate-500">
                    Қайратқызы Жансаяның шешу әдісі
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900">
                  {modelType === 'comparison'
                    ? (lang === 'kk' ? 'Салыстыру моделі (Comparison Model)' : 'Comparison Model Word Problem')
                    : (lang === 'kk' ? 'Бөлік және бүтін (Part-Whole Model)' : 'Part-Whole Bar Model')}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === 'kk'
                    ? 'Жансая мен Айсұлтанда барлығы стикерлер бар. Айсұлтанда Жансаяға қарағанда бірнеше есе көп. Біз есепті теңдеусіз-ақ, бірліктерге (1 unit) бөліп көрнекі шығарамыз.'
                    : 'Zhansaia and Aisultan collect problem cards. Aisultan has a multiple of Zhansaia\'s count. We solve this visually without abstract equations by finding 1 Unit.'}
                </p>

                <div className="bg-white p-3.5 rounded-xl border border-blue-200 text-xs space-y-1.5">
                  <div className="text-blue-950 font-bold">
                    {lang === 'kk' ? 'Ағылшынша академиялық дәлелдеу:' : 'Mathematical Proof in English:'}
                  </div>
                  <div className="font-mono text-blue-700 bg-blue-50/60 p-2 rounded text-[11px]">
                    1 Unit = {partA} <br />
                    Total Units = {modelType === 'comparison' ? 1 + multiplier : 2} <br />
                    Total Value = {total} units
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setModelType('comparison')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                      modelType === 'comparison'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Comparison Model
                  </button>
                  <button
                    onClick={() => setModelType('part-whole')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                      modelType === 'part-whole'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Part-Whole Model
                  </button>
                </div>
              </div>

              {/* Visual Bars Container */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-blue-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-blue-900">
                    {lang === 'kk' ? 'Көрнекі сызба (Visual Bar)' : 'Visual Bar Canvas'}
                  </span>
                  <span className="text-xs font-bold text-blue-600">
                    Total: {total} units
                  </span>
                </div>

                {/* Bars */}
                <div className="space-y-3 py-2">
                  <div>
                    <div className="text-[11px] text-slate-500 mb-1 flex justify-between">
                      <span>{lang === 'kk' ? 'Жансая (1 unit):' : 'Zhansaia (1 unit):'}</span>
                      <strong className="text-blue-700">{partA}</strong>
                    </div>
                    <div className="h-8 bg-blue-600 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-xs">
                      {partA}
                    </div>
                  </div>

                  {modelType === 'comparison' && (
                    <div>
                      <div className="text-[11px] text-slate-500 mb-1 flex justify-between">
                        <span>{lang === 'kk' ? `Айсұлтан (${multiplier} есе көп):` : `Aisultan (${multiplier}x multiple):`}</span>
                        <strong className="text-sky-700">{partA * multiplier}</strong>
                      </div>
                      <div className="flex gap-1.5">
                        {Array.from({ length: multiplier }).map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-xs"
                          >
                            {partA}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sliders */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <label className="block text-slate-500 text-[11px] mb-1">
                      {lang === 'kk' ? `1 Unit мәні: ${partA}` : `1 Unit value: ${partA}`}
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      step={5}
                      value={partA}
                      onChange={(e) => setPartA(Number(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                  {modelType === 'comparison' && (
                    <div>
                      <label className="block text-slate-500 text-[11px] mb-1">
                        {lang === 'kk' ? `Еселенуі: ${multiplier}x` : `Multiple: ${multiplier}x`}
                      </label>
                      <input
                        type="range"
                        min={2}
                        max={5}
                        step={1}
                        value={multiplier}
                        onChange={(e) => setMultiplier(Number(e.target.value))}
                        className="w-full accent-sky-500 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Singapore Science 5E Inquiry Lab (White & Blue) */}
          {activeInteractiveTab === 'science-inquiry' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-indigo-50/40 rounded-2xl p-6 border border-indigo-200">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-600 text-white">
                    Singapore Science (Inquiry)
                  </span>
                  <span className="text-xs text-slate-500">
                    Photosynthesis & Plant Systems Lab
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900">
                  {lang === 'kk' 
                    ? '5E ғылыми эксперименті: Фотосинтез және айнымалылар'
                    : '5E Scientific Experiment: Photosynthesis & Controlled Variables'}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === 'kk'
                    ? 'Сингапур жаратылыстануында оқушылар ағылшын тілінде ғылыми гипотеза құрады: "If sunlight and water increase, then the rate of photosynthesis will increase proportionally".'
                    : 'In Singapore Science, students test independent variables (Sunlight & Water) and analyze dependent outcomes (Plant Growth & Oxygen) using authentic English scientific discourse.'}
                </p>

                {/* 5E Step Indicators */}
                <div className="grid grid-cols-5 gap-1 pt-1 text-center">
                  {[
                    { key: 'engage', label: '1. Engage' },
                    { key: 'explore', label: '2. Explore' },
                    { key: 'explain', label: '3. Explain' },
                    { key: 'elaborate', label: '4. Elaborate' },
                    { key: 'evaluate', label: '5. Evaluate' },
                  ].map((step) => (
                    <button
                      key={step.key}
                      onClick={() => setActiveScience5ETab(step.key as any)}
                      className={`py-1 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                        activeScience5ETab === step.key
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {step.label}
                    </button>
                  ))}
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-indigo-200 text-xs space-y-1">
                  <div className="font-bold text-indigo-950">
                    {lang === 'kk' ? 'Ғылыми тұжырымдама (Scientific Conclusion):' : 'Scientific Conclusion:'}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    &ldquo;Under <strong>{sunlightHours}h of sunlight</strong> and <strong>{waterLevel}% hydration</strong>, the photosynthetic efficiency reaches <strong>{growthRate}%</strong> with <strong>{oxygenOutput} mL/h</strong> O₂ output.&rdquo;
                  </p>
                </div>
              </div>

              {/* Science Interactive Controls & Visual Canvas */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-indigo-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                    <Microscope className="w-4 h-4 text-indigo-600" />
                    <span>Inquiry Simulation Canvas</span>
                  </span>
                  <span className="text-xs font-bold text-indigo-600">
                    Growth: {growthRate}%
                  </span>
                </div>

                {/* Sliders for Variables */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span className="flex items-center gap-1 font-semibold">
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                        Sunlight Duration (Күн жарығы):
                      </span>
                      <strong className="text-amber-600">{sunlightHours} hours/day</strong>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={12}
                      step={1}
                      value={sunlightHours}
                      onChange={(e) => setSunlightHours(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span className="flex items-center gap-1 font-semibold">
                        <Droplets className="w-3.5 h-3.5 text-blue-500" />
                        Water Hydration Level (Су мөлшері):
                      </span>
                      <strong className="text-blue-600">{waterLevel}%</strong>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={100}
                      step={5}
                      value={waterLevel}
                      onChange={(e) => setWaterLevel(Number(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Progress bar metrics */}
                <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Photosynthetic Rate (Өсімдік өсімі):</span>
                      <span className="font-bold text-indigo-600">{growthRate}%</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
                        style={{ width: `${growthRate}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Oxygen Release (Оттегі өндірісі):</span>
                    <strong className="text-slate-800">{oxygenOutput} mL/h</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Classroom Lesson Videos Section - White & Blue Theme */}
      <section id="lesson-videos-section" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
              {lang === 'kk' ? 'Мектептегі нақты сабақ үдерісі' : 'Actual Classroom Dynamics'}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {t.videoLessonsTitle}
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            {t.videoLessonsSubtitle}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LESSON_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all flex flex-col"
            >
              {/* Thumbnail Container */}
              <div 
                className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer"
                onClick={() => onSelectVideo(video)}
              >
                <img
                  src={video.thumbnailUrl}
                  alt={lang === 'kk' ? video.titleKk : video.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white backdrop-blur-xs shadow-xs">
                    {video.className}
                  </span>
                  <span className="px-2 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 text-slate-200 backdrop-blur-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectVideo(video);
                  }}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-all group-hover:scale-110 cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </button>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-bold text-sky-300 block">
                    {video.subject} • {video.cpaStage}
                  </span>
                </div>
              </div>

              {/* Video Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 
                    onClick={() => onSelectVideo(video)}
                    className="font-bold text-slate-900 text-base leading-snug hover:text-blue-700 cursor-pointer"
                  >
                    {lang === 'kk' ? video.titleKk : video.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {lang === 'kk' ? video.descriptionKk : video.descriptionEn}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>
                      {lang === 'kk' ? 'Мұғалім:' : 'Teacher:'} <strong>{video.teacherName}</strong>
                    </span>
                    <span>{video.date}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => onSelectVideo(video)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-blue-700" />
                      <span>{t.watchVideo}</span>
                    </button>
                    <button
                      onClick={onOpenFeedback}
                      className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                    >
                      <MessageSquare className="w-3 h-3 text-amber-600" />
                      <span>{t.leaveFeedback}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Research & Inquiry Highlight (White & Blue) */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-800/40">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-400 text-slate-950 text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>{lang === 'kk' ? 'ЖИ-мен тиімді қарым-қатынас зерттеу' : 'Effective AI Communication Research'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            {t.aiResearchPillarTitle}
          </h3>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            {t.aiResearchPillarDesc}
          </p>
        </div>

        <button
          onClick={onOpenAITutor}
          className="shrink-0 px-5 py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-extrabold text-sm shadow-lg transition-all cursor-pointer"
        >
          {lang === 'kk' ? 'ЖИ Тәлімгерін іске қосу 🚀' : 'Launch AI Companion 🚀'}
        </button>
      </section>
    </div>
  );
};
