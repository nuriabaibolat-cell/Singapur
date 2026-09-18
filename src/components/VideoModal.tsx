import React from 'react';
import { SingaporeVideo, Language } from '../types';
import { X, Play, Clock, User, Sparkles, BookOpen } from 'lucide-react';
import { translations } from '../data/translations';

interface VideoModalProps {
  video: SingaporeVideo | null;
  onClose: () => void;
  lang: Language;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose, lang }) => {
  if (!video) return null;

  const t = translations[lang];
  const title = lang === 'kk' ? (video.titleKk || video.title) : (video.titleEn || video.title);
  const description = lang === 'kk' ? (video.descriptionKk || video.description) : (video.descriptionEn || video.description);
  const highlights = lang === 'kk' 
    ? (video.highlightsKk || video.highlights || []) 
    : (video.highlightsEn || video.highlights || []);

  const isYouTube = video.videoUrl.includes('youtube.com') || video.videoUrl.includes('youtu.be');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              {video.className}
            </span>
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {video.duration}
            </span>
          </div>
          <button
            id="close-video-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player (supports YouTube embed and HTML5 video) */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {isYouTube ? (
            <iframe
              src={`${video.videoUrl}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <video
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
              src={video.videoUrl}
              poster={video.thumbnailUrl}
            >
              {lang === 'kk' ? 'Браузер видео ойнатқышты қолдамайды.' : 'Browser does not support video playback.'}
            </video>
          )}
        </div>

        {/* Video Info & Educational Details */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 leading-snug">
              {title}
            </h3>
            {video.titleEn && lang === 'kk' && (
              <p className="text-sm font-medium text-slate-500 mt-1">
                {video.titleEn}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
            <div className="flex items-center gap-1.5 font-medium">
              <User className="w-4 h-4 text-indigo-600" />
              <span>{lang === 'kk' ? 'Мұғалім:' : 'Teacher:'} <strong className="text-slate-800">{video.teacherName}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'kk' ? 'Пән:' : 'Subject:'} <strong className="text-slate-800">{video.subject}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{lang === 'kk' ? 'Сингапур кезеңі:' : 'CPA Phase:'} <strong className="text-amber-700">{video.cpaStage}</strong></span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              {lang === 'kk' ? 'Сабақ сипаттамасы мен мақсаты' : 'Lesson Overview & Pedagogy Target'}
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Highlights / Timestamps */}
          {highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                {lang === 'kk' ? 'Сабақтың негізгі сәттері (Видео үзінділер таймкодтары)' : 'Key Lesson Highlights & Timestamps'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {highlights.map((h, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/50 border border-emerald-100 text-xs text-emerald-900 font-medium"
                  >
                    <Play className="w-3.5 h-3.5 text-emerald-600 shrink-0 fill-emerald-600" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>{lang === 'kk' ? 'Сингапур сыныптарының оқу-әдістемелік видео қоры' : 'Singapore Classes Video Repository'}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
