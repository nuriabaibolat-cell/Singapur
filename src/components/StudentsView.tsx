import React, { useState } from 'react';
import { 
  Calendar, 
  Award, 
  Sparkles, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  BarChart3, 
  User, 
  Flame,
  Send,
  HelpCircle,
  Play
} from 'lucide-react';
import { SCHEDULE_DATA, AI_PROMPT_SUGGESTIONS } from '../data/singaporeData';
import { GradeRecord, ScheduleItem, SingaporeVideo, Language } from '../types';
import { translations } from '../data/translations';

interface StudentsViewProps {
  grades: GradeRecord[];
  onOpenAITutor: () => void;
  onSelectVideo: (video: SingaporeVideo) => void;
  lang: Language;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  grades,
  onOpenAITutor,
  lang,
}) => {
  const [selectedDay, setSelectedDay] = useState<ScheduleItem['day']>('Дүйсенбі');
  const [selectedClass, setSelectedClass] = useState<string>('5 «Ғ» Сингапур сыныбы');
  const [activeSubTab, setActiveSubTab] = useState<'schedule' | 'grades' | 'ai-lab'>('schedule');

  const t = translations[lang];

  // Filter schedule by day & class
  const filteredSchedule = SCHEDULE_DATA.filter(
    (item) => item.day === selectedDay && item.className === selectedClass
  );

  // Student specific grades: featured student Қайратқызы Жансая (5 «Ғ»)
  const studentGrades = grades.filter(
    (g) => g.studentName === 'Қайратқызы Жансая' || g.className === selectedClass
  );
  
  const averageScore = Math.round(
    studentGrades.reduce((acc, curr) => acc + curr.score, 0) / (studentGrades.length || 1)
  );

  const days: { kk: ScheduleItem['day']; en: ScheduleItem['dayEn'] }[] = [
    { kk: 'Дүйсенбі', en: 'Monday' },
    { kk: 'Сейсенбі', en: 'Tuesday' },
    { kk: 'Сәрсенбі', en: 'Wednesday' },
    { kk: 'Бейсенбі', en: 'Thursday' },
    { kk: 'Жұма', en: 'Friday' },
  ];

  return (
    <div className="space-y-8">
      {/* Student Profile Card Header: Featured Student: Қайратқызы Жансая (5 «Ғ») */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-xl shadow-md shadow-emerald-600/20">
            Ж
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                {lang === 'kk' ? 'Қайратқызы Жансая' : 'Zhansaia Kairatkyzy'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {selectedClass}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.studentProfileBadge}
            </p>
          </div>
        </div>

        {/* Class switcher & Quick KPIs */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="5 «Ғ» Сингапур сыныбы">5 «Ғ» Сингапур сыныбы (Grade 5 G)</option>
            <option value="5 «А» Сингапур сыныбы">5 «А» Сингапур сыныбы (Grade 5 A)</option>
            <option value="1 «Ә» Сингапур сыныбы">1 «Ә» Сингапур сыныбы (Grade 1 Ä)</option>
          </select>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>{t.averageScore}: {averageScore}%</span>
          </div>
        </div>
      </div>

      {/* Sub navigation for Student section */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveSubTab('schedule')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'schedule'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{t.studentTabSchedule}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('grades')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'grades'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{t.studentTabGrades}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ai-lab')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'ai-lab'
              ? 'border-amber-500 text-amber-800 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>{t.studentTabAiLab}</span>
        </button>
      </div>

      {/* 1. SCHEDULE TAB */}
      {activeSubTab === 'schedule' && (
        <div className="space-y-6">
          {/* Day of Week Selector */}
          <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-2xl">
            {days.map((d) => (
              <button
                key={d.kk}
                onClick={() => setSelectedDay(d.kk)}
                className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  selectedDay === d.kk
                    ? 'bg-white text-indigo-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'kk' ? d.kk : d.en}
              </button>
            ))}
          </div>

          {/* Timetable Cards */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {lang === 'kk' 
                ? `${selectedDay} күнгі сабақ кестесі (${selectedClass}):`
                : `${days.find(d => d.kk === selectedDay)?.en} Timetable (${selectedClass}):`}
            </div>

            {filteredSchedule.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">
                {lang === 'kk' ? 'Бұл күнге сабақ кестесі қосылмаған.' : 'No schedule entries for this day.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSchedule.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 transition-all shadow-xs flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                          <Clock className="w-3.5 h-3.5" />
                          {item.time}
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">
                          {item.room}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 text-base">
                          {item.subject}
                        </h4>
                        <p className="text-xs font-medium text-slate-500">
                          {item.englishTitle}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                        <div className="text-slate-700 font-semibold">
                          {lang === 'kk' ? 'Тақырып:' : 'Topic:'} <span className="font-normal text-slate-600">{lang === 'kk' ? item.topicKk : item.topicEn}</span>
                        </div>
                        <div className="text-slate-500 flex items-center justify-between pt-1">
                          <span>{lang === 'kk' ? 'Мұғалім:' : 'Teacher:'} {item.teacher}</span>
                          {item.cpaStage && (
                            <span className="font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded text-[10px]">
                              {item.cpaStage}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
                        onClick={onOpenAITutor}
                        className="text-emerald-700 font-semibold hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{lang === 'kk' ? 'ЖИ-мен тақырыпты талдау' : 'Analyze with AI'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. GRADES TAB */}
      {activeSubTab === 'grades' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs font-semibold text-slate-500">{t.averageScore}</div>
              <div className="text-3xl font-extrabold text-emerald-600 mt-1">
                {averageScore}%
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {lang === 'kk' ? 'Қайратқызы Жансаяның орташа көрсеткіші' : "Zhansaia Kairatkyzy's Average"}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs font-semibold text-slate-500">{t.cpaMasteryLevel}</div>
              <div className="text-xl font-bold text-indigo-700 mt-1">
                Abstract (A) - 98%
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {lang === 'kk' ? 'Bar Modeling және академиялық дәлелдеу' : 'Bar Modeling & Academic Reasoning'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs font-semibold text-slate-500">{t.totalGradesCount}</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">
                {studentGrades.length} {lang === 'kk' ? 'баға' : 'records'}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {lang === 'kk' ? 'Формативті және БЖБ бағалары' : 'Formative & Summative'}
              </p>
            </div>
          </div>

          {/* Grades Table / List */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {t.gradebookTitle} ({lang === 'kk' ? 'Қайратқызы Жансая' : 'Zhansaia Kairatkyzy'})
                </h3>
                <p className="text-xs text-slate-500">
                  {t.gradebookDesc}
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {studentGrades.map((grade) => (
                <div key={grade.id} className="p-5 hover:bg-slate-50/70 transition-colors space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {grade.subject}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {grade.date}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          • {lang === 'kk' ? grade.assessmentType : grade.assessmentTypeEn}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">
                        {lang === 'kk' ? grade.topic : grade.topicEn}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-2xl font-black text-emerald-600">
                          {grade.score}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold"> / 100</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                        {grade.cpaLevel}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-xs text-slate-700">
                    <strong className="text-slate-900">{t.teacherFeedback}</strong> {lang === 'kk' ? grade.feedback : grade.feedbackEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. AI LAB TAB */}
      {activeSubTab === 'ai-lab' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{t.aiLabTitle}</span>
            </div>

            <h3 className="text-2xl font-bold">
              {lang === 'kk' 
                ? 'Сингапур есептерін ЖИ-мен бірге шешіп, қарым-қатынасты зертте!'
                : 'Solve Singapore Math problems with AI and research interaction!'}
            </h3>

            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed max-w-2xl">
              {t.aiLabDesc}
            </p>

            <button
              id="open-ai-tutor-from-lab"
              onClick={onOpenAITutor}
              className="px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{t.openAiTutorModal}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_PROMPT_SUGGESTIONS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">
                      {item.subject === 'math' ? '📐 Singapore Math' : '🗣️ English Communication'}
                    </span>
                    <span className="text-xs text-slate-400">Prompt #{idx + 1}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mt-2">
                    {lang === 'kk' ? item.titleKk : item.titleEn}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    "{lang === 'kk' ? item.promptKk : item.promptEn}"
                  </p>
                </div>

                <button
                  onClick={onOpenAITutor}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-800 cursor-pointer pt-2"
                >
                  <span>{t.askThisQuestion}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
