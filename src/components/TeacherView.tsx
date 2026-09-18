import React, { useState } from 'react';
import { 
  School, 
  Award, 
  MessageSquare, 
  Plus, 
  Check, 
  Send, 
  Clock, 
  BookOpen, 
  UserCheck, 
  Users, 
  Star 
} from 'lucide-react';
import { GradeRecord, FeedbackItem, Language } from '../types';
import { translations } from '../data/translations';

interface TeacherViewProps {
  grades: GradeRecord[];
  feedbackList: FeedbackItem[];
  onAddGrade: (grade: Omit<GradeRecord, 'id'>) => void;
  onReplyFeedback: (id: string, reply: string) => void;
  lang: Language;
}

export const TeacherView: React.FC<TeacherViewProps> = ({
  grades,
  feedbackList,
  onAddGrade,
  onReplyFeedback,
  lang,
}) => {
  const [activeTeacherTab, setActiveTeacherTab] = useState<'gradebook' | 'feedback-mgmt'>('gradebook');
  
  const t = translations[lang];

  // New grade form state
  const [studentName, setStudentName] = useState('Қайратқызы Жансая');
  const [className, setClassName] = useState('5 «Ғ» Сингапур сыныбы');
  const [subject, setSubject] = useState('Singapore Mathematics');
  const [topic, setTopic] = useState('');
  const [score, setScore] = useState<number>(98);
  const [cpaLevel, setCpaLevel] = useState('Abstract (A) - Жоғары деңгей');
  const [feedback, setFeedback] = useState('');
  const [assessmentType, setAssessmentType] = useState<GradeRecord['assessmentType']>('БЖБ (Summative)');
  const [showAddGradeModal, setShowAddGradeModal] = useState(false);

  // Reply states
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || score === undefined) return;

    onAddGrade({
      studentId: 'stud-' + Date.now(),
      studentName,
      className,
      subject,
      subjectEn: subject,
      topic,
      topicEn: topic,
      score: Number(score),
      maxScore: 100,
      cpaLevel,
      feedback: feedback || (lang === 'kk' ? 'Жақсы нәтиже! Сингапур методикасымен есепті еркін талдады.' : 'Great work applying Singapore pedagogy!'),
      feedbackEn: feedback || 'Great work applying Singapore pedagogy!',
      date: new Date().toISOString().split('T')[0],
      assessmentType,
      assessmentTypeEn: assessmentType === 'БЖБ (Summative)' ? 'Summative (Unit)' : 'Formative Assessment',
    });

    setTopic('');
    setFeedback('');
    setShowAddGradeModal(false);
  };

  const handleSendReply = (feedbackId: string) => {
    const reply = replyTextMap[feedbackId];
    if (!reply || !reply.trim()) return;
    onReplyFeedback(feedbackId, reply);
    setReplyTextMap(prev => ({ ...prev, [feedbackId]: '' }));
  };

  return (
    <div className="space-y-8">
      {/* Teacher Welcome Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-bold uppercase tracking-wider">
              <School className="w-3.5 h-3.5" />
              <span>{lang === 'kk' ? 'Мұғалімнің жеке кабинеті' : 'Teacher Portal'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              {t.teacherGreeting}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              {t.teacherDesc}
            </p>
          </div>

          <button
            onClick={() => setShowAddGradeModal(true)}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addNewGradeBtn}</span>
          </button>
        </div>
      </div>

      {/* Teacher Sub-Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTeacherTab('gradebook')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTeacherTab === 'gradebook'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{t.teacherTabJournal} ({grades.length})</span>
        </button>

        <button
          onClick={() => setActiveTeacherTab('feedback-mgmt')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTeacherTab === 'feedback-mgmt'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{t.teacherTabFeedback} ({feedbackList.length})</span>
        </button>
      </div>

      {/* 1. GRADEBOOK TAB */}
      {activeTeacherTab === 'gradebook' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {lang === 'kk' ? 'Сингапур сыныптарының оқу журналы (5 «А», 5 «Ғ», 1 «Ә»)' : 'Singapore Classes Gradebook (5 A, 5 G, 1 Ä)'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'kk' ? 'CPA шкаласы бойынша бағалау және мұғалім кері байланысы' : 'CPA proficiency scoring and personalized instructor notes'}
                </p>
              </div>

              <button
                onClick={() => setShowAddGradeModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.addNewGradeBtn}</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">{t.studentNameCol}</th>
                    <th className="p-4">{t.classCol}</th>
                    <th className="p-4">{t.subjectCol}</th>
                    <th className="p-4">{t.topicCol}</th>
                    <th className="p-4">CPA</th>
                    <th className="p-4">{t.scoreCol}</th>
                    <th className="p-4">{t.dateCol}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {grades.map((g) => (
                    <tr key={g.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-slate-900">{g.studentName}</td>
                      <td className="p-4 text-slate-600">{g.className}</td>
                      <td className="p-4 font-medium text-indigo-700">{g.subject}</td>
                      <td className="p-4 text-slate-700 max-w-xs truncate">{lang === 'kk' ? g.topic : g.topicEn}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">
                          {g.cpaLevel}
                        </span>
                      </td>
                      <td className="p-4 font-black text-emerald-600 text-sm">{g.score}</td>
                      <td className="p-4 text-slate-400">{g.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. FEEDBACK MANAGEMENT FOR TEACHER */}
      {activeTeacherTab === 'feedback-mgmt' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base">
              {t.teacherTabFeedback}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'kk'
                ? 'Сингапур сыныбының мұғалімі ретінде әрбір ата-анаға кері байланыс беріңіз'
                : 'As a Singapore curriculum mentor, communicate and reply to parent queries'}
            </p>
          </div>

          <div className="space-y-4">
            {feedbackList.map((fb) => (
              <div
                key={fb.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      {lang === 'kk' ? fb.author : (fb.authorEn || fb.author)}
                    </div>
                    <div className="text-xs text-slate-400">
                      {lang === 'kk' ? 'Оқушы:' : 'Student:'} <strong>{fb.studentName}</strong> • {fb.date}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: fb.rating }).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-800">
                  {lang === 'kk' ? fb.messageKk : fb.messageEn}
                </p>

                {(fb.replyKk || fb.replyEn) ? (
                  <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                    <div className="flex items-center justify-between font-bold text-emerald-800">
                      <span>{lang === 'kk' ? 'Сіздің берген жауабыңыз:' : 'Your Official Response:'}</span>
                      <span className="text-[11px] text-emerald-600 font-normal">{fb.replyDate}</span>
                    </div>
                    <p>{lang === 'kk' ? fb.replyKk : fb.replyEn}</p>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      {t.replyToParentLabel}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={lang === 'kk' ? 'Мысалы: Құрметті ата-ана, ұсынысыңызды қабылдадық...' : 'Write reply here...'}
                        value={replyTextMap[fb.id] || ''}
                        onChange={(e) => setReplyTextMap({ ...replyTextMap, [fb.id]: e.target.value })}
                        className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => handleSendReply(fb.id)}
                        disabled={!replyTextMap[fb.id]?.trim()}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{t.replyBtn}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Grade Modal */}
      {showAddGradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">
                {lang === 'kk' ? 'Оқушыға жаңа баға қою' : 'Record New Assessment Grade'}
              </h3>
              <button
                onClick={() => setShowAddGradeModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleGradeSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'kk' ? 'Оқушының аты' : 'Student Name'}
                  </label>
                  <select
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Қайратқызы Жансая">Қайратқызы Жансая (5 «Ғ»)</option>
                    <option value="Әлихан Сейітқали">Әлихан Сейітқали (5 «А»)</option>
                    <option value="Айзере Мұратқызы">Айзере Мұратқызы (1 «Ә»)</option>
                    <option value="Айсұлтан Қайратұлы">Айсұлтан Қайратұлы (5 «Ғ»)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'kk' ? 'Сынып' : 'Class'}
                  </label>
                  <select
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="5 «Ғ» Сингапур сыныбы">5 «Ғ» Сингапур сыныбы (Grade 5 G)</option>
                    <option value="5 «А» Сингапур сыныбы">5 «А» Сингапур сыныбы (Grade 5 A)</option>
                    <option value="1 «Ә» Сингапур сыныбы">1 «Ә» Сингапур сыныбы (Grade 1 Ä)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'kk' ? 'Пән' : 'Subject'}
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Singapore Mathematics">Singapore Mathematics</option>
                    <option value="English Language">English Language</option>
                    <option value="Science & AI Discovery">Science & AI Discovery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'kk' ? 'Балл (0 - 100)' : 'Score (0 - 100)'}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'kk' ? 'Сабақ тақырыбы' : 'Lesson Topic'}
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Fractions Bar Modeling multi-step"
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CPA Деңгейі</label>
                  <select
                    value={cpaLevel}
                    onChange={(e) => setCpaLevel(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Abstract (A) - Жоғары деңгей">Abstract (A) - Жоғары деңгей</option>
                    <option value="Pictorial (P) - Bar Model">Pictorial (P) - Bar Model</option>
                    <option value="Concrete (C) - Заттық">Concrete (C) - Заттық</option>
                    <option value="Proficient (Ортадан жоғары)">Proficient (Ортадан жоғары)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Бағалау түрі</label>
                  <select
                    value={assessmentType}
                    onChange={(e) => setAssessmentType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="БЖБ (Summative)">БЖБ (Summative)</option>
                    <option value="Формативті бағалау">Формативті бағалау</option>
                    <option value="ТЖБ (Term)">ТЖБ (Term)</option>
                    <option value="Жобалық жұмыс">Жобалық жұмыс</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'kk' ? 'Мұғалімнің кері байланысы' : "Teacher's Feedback"}
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={3}
                  placeholder={lang === 'kk' ? 'Оқушының күшті жақтары мен Bar Model талдауын жазыңыз...' : 'Write feedback...'}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddGradeModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-xs cursor-pointer"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
