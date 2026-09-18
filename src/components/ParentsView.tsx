import React, { useState } from 'react';
import { 
  GraduationCap, 
  MessageSquare, 
  Play, 
  Star, 
  CheckCircle2, 
  Clock, 
  Award, 
  Plus, 
  Calendar, 
  ChevronRight,
  UserCheck,
  Send,
  Sparkles
} from 'lucide-react';
import { GradeRecord, FeedbackItem, SingaporeVideo, Language } from '../types';
import { LESSON_VIDEOS } from '../data/singaporeData';
import { translations } from '../data/translations';

interface ParentsViewProps {
  grades: GradeRecord[];
  feedbackList: FeedbackItem[];
  onOpenFeedback: () => void;
  onSelectVideo: (video: SingaporeVideo) => void;
  onOpenAITutor: () => void;
  lang: Language;
}

export const ParentsView: React.FC<ParentsViewProps> = ({
  grades,
  feedbackList,
  onOpenFeedback,
  onSelectVideo,
  onOpenAITutor,
  lang,
}) => {
  const [activeParentTab, setActiveParentTab] = useState<'grades' | 'videos' | 'feedback'>('grades');

  const t = translations[lang];

  // Filter child grades: Қайратқызы Жансая (5 «Ғ»)
  const childGrades = grades.filter((g) => g.studentName === 'Қайратқызы Жансая');
  const averageGrade = Math.round(
    childGrades.reduce((acc, curr) => acc + curr.score, 0) / (childGrades.length || 1)
  );

  return (
    <div className="space-y-8">
      {/* Parent Welcome Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              <UserCheck className="w-3.5 h-3.5" />
              <span>{lang === 'kk' ? 'Ата-ананың жеке кабинеті' : 'Parent Portal'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              {t.parentGreeting}
            </h2>
            <p className="text-amber-100 text-xs sm:text-sm max-w-2xl">
              {t.parentDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="parent-leave-feedback-banner-btn"
              onClick={onOpenFeedback}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-amber-600" />
              <span>{t.parentFeedbackBoxTitle}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Parent Sub-Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveParentTab('grades')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeParentTab === 'grades'
              ? 'border-amber-600 text-amber-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{t.parentTabGrades}</span>
        </button>

        <button
          onClick={() => setActiveParentTab('videos')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeParentTab === 'videos'
              ? 'border-amber-600 text-amber-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>{t.parentTabVideos}</span>
        </button>

        <button
          onClick={() => setActiveParentTab('feedback')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeParentTab === 'feedback'
              ? 'border-amber-600 text-amber-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{t.parentTabFeedback} ({feedbackList.length})</span>
        </button>
      </div>

      {/* 1. CHILD GRADES VIEW */}
      {activeParentTab === 'grades' && (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">{t.averageScore}</span>
              <div className="text-3xl font-extrabold text-emerald-600 mt-1">{averageGrade}%</div>
              <p className="text-[11px] text-slate-400 mt-1">
                {lang === 'kk' ? 'Үздік нәтиже (5 «Ғ» сыныбы)' : 'Top Performance (Grade 5 G)'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Singapore Mathematics</span>
              <div className="text-3xl font-extrabold text-indigo-600 mt-1">98%</div>
              <p className="text-[11px] text-slate-400 mt-1">Bar Modeling: Abstract Mastery</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">English Immersion</span>
              <div className="text-3xl font-extrabold text-amber-600 mt-1">96%</div>
              <p className="text-[11px] text-slate-400 mt-1">Academic dialogue & presentations</p>
            </div>
          </div>

          {/* Child Detailed Grade List */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {lang === 'kk' ? 'Қайратқызы Жансаяның Сингапур бағдарламасы бойынша бағалары' : "Zhansaia Kairatkyzy's Academic Assessment Records"}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'kk' ? 'Мұғалімдердің жеке комментарийлері және CPA бағалау шкаласы' : 'Personal instructor notes and CPA proficiency levels'}
                </p>
              </div>
              <button
                onClick={onOpenFeedback}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{lang === 'kk' ? 'Баға бойынша пікір жазу' : 'Comment on Grade'}</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {childGrades.map((grade) => (
                <div key={grade.id} className="p-5 hover:bg-slate-50/70 transition-colors space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {grade.subject}
                        </span>
                        <span className="text-xs text-slate-400">
                          {grade.date}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
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
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {grade.cpaLevel}
                      </span>
                    </div>
                  </div>

                  <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-100 text-xs text-slate-800">
                    <strong className="text-amber-900">{t.teacherFeedback}</strong> {lang === 'kk' ? grade.feedback : grade.feedbackEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. LESSON VIDEOS VIEW FOR PARENTS */}
      {activeParentTab === 'videos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {t.parentTabVideos}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'kk'
                  ? 'Балаңыз Жансаяның 5 «Ғ» сыныбында қалай жауап беріп, сабақ қалай өтіп жатқанын көріңіз'
                  : "Watch recordings of Zhansaia in Grade 5 G engaging in Singapore lessons"}
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {LESSON_VIDEOS.length} {lang === 'kk' ? 'бейнежазба' : 'videos'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LESSON_VIDEOS.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
              >
                <div 
                  className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer group"
                  onClick={() => onSelectVideo(video)}
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={lang === 'kk' ? video.titleKk : video.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />

                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-xs">
                      {video.className}
                    </span>
                    <span className="px-2 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {video.duration}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectVideo(video);
                    }}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-slate-900 ml-0.5" />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 
                      onClick={() => onSelectVideo(video)}
                      className="font-bold text-slate-900 text-sm leading-snug hover:text-amber-700 cursor-pointer"
                    >
                      {lang === 'kk' ? video.titleKk : video.titleEn}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {lang === 'kk' ? video.descriptionKk : video.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">{video.teacherName}</span>
                    <button
                      onClick={() => onSelectVideo(video)}
                      className="font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{t.view}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. PARENT FEEDBACK WINDOW */}
      {activeParentTab === 'feedback' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-600" />
                <span>{t.parentFeedbackBoxTitle}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.parentFeedbackBoxDesc}
              </p>
            </div>

            <button
              id="open-feedback-form-main-btn"
              onClick={onOpenFeedback}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t.newFeedbackBtn}</span>
            </button>
          </div>

          {/* Feedback list with teacher replies */}
          <div className="space-y-4">
            {feedbackList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4"
              >
                {/* Parent Question / Feedback */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                      {item.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        {lang === 'kk' ? item.author : (item.authorEn || item.author)}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {lang === 'kk' ? 'Оқушы:' : 'Student:'} <strong>{item.studentName}</strong> • {item.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                    {(item.categoryKk || item.categoryEn) && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 ml-1">
                        {lang === 'kk' ? item.categoryKk : item.categoryEn}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {lang === 'kk' ? item.messageKk : item.messageEn}
                </p>

                {/* Teacher Reply */}
                {(item.replyKk || item.replyEn) ? (
                  <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200/70 space-y-1.5 ml-4 sm:ml-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{t.teacherOfficialReply}</span>
                      </span>
                      <span className="text-[11px] text-emerald-700">{item.replyDate}</span>
                    </div>
                    <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                      {lang === 'kk' ? item.replyKk : item.replyEn}
                    </p>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-400 italic ml-4">
                    {lang === 'kk' ? 'Мұғалімнің жауабы дайындалуда...' : 'Teacher reply in preparation...'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
