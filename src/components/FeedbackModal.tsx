import React, { useState } from 'react';
import { X, Send, Star, MessageSquare } from 'lucide-react';
import { FeedbackItem, Language } from '../types';
import { translations } from '../data/translations';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: { 
    author: string; 
    authorEn?: string;
    studentName: string; 
    messageKk: string; 
    messageEn: string; 
    rating: number; 
    categoryKk?: string;
    categoryEn?: string;
  }) => void;
  initialStudentName?: string;
  initialAuthorName?: string;
  lang: Language;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialStudentName = 'Қайратқызы Жансая (5 «Ғ»)',
  initialAuthorName = 'Қайрат Асқарұлы (Жансаяның әкесі)',
  lang,
}) => {
  const [author, setAuthor] = useState(initialAuthorName);
  const [studentName, setStudentName] = useState(initialStudentName);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState<string>('Сингапур әдістемесі');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const t = translations[lang];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit({
        author: author || (lang === 'kk' ? 'Ата-ана' : 'Parent'),
        authorEn: author,
        studentName,
        messageKk: message,
        messageEn: message,
        rating,
        categoryKk: category,
        categoryEn: category === 'Сингапур әдістемесі' ? 'Singapore Methodology' : 'General',
      });
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        setMessage('');
        onClose();
      }, 1200);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-amber-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {t.parentFeedbackBoxTitle}
              </h3>
              <p className="text-[11px] text-slate-500">
                {t.parentFeedbackBoxDesc}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submittedSuccess ? (
          <div className="p-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h4 className="font-bold text-slate-900 text-base">
              {lang === 'kk' ? 'Пікіріңіз қабылданды!' : 'Feedback submitted successfully!'}
            </h4>
            <p className="text-xs text-slate-500">
              {lang === 'kk' ? 'Мұғалім жақын арада жауап береді.' : 'The Singapore class teacher will review and reply shortly.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'kk' ? 'Ата-ананың аты-жөні' : 'Parent Name'}
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Қайрат Асқарұлы"
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'kk' ? 'Балаңыздың аты және сыныбы' : "Child's Name & Class"}
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Қайратқызы Жансая (5 «Ғ»)"
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {lang === 'kk' ? 'Бағалау (Rating)' : 'Rating'}
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-200 hover:text-amber-200'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-amber-700 ml-2">
                  {rating} / 5
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {lang === 'kk' ? 'Пікір санаты' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
              >
                <option value="Сингапур әдістемесі">Сингапур әдістемесі (Bar Model, CPA)</option>
                <option value="Сабақ үдерісі">Сабақ үдерісі және бейнежазбалар</option>
                <option value="Ағылшын тілі">Ағылшын тілінде сөйлеу ортасы</option>
                <option value="ЖИ-мен қарым-қатынас">ЖИ тәлімгерімен жұмыс</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {lang === 'kk' ? 'Сіздің пікіріңіз бен ұсынысыңыз' : 'Your Message / Feedback'}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
                placeholder={lang === 'kk' 
                  ? 'Балаңыздың сабақ үлгерімі, видеолардан көрген әсеріңіз немесе ұсыныстарыңыз...' 
                  : 'Share your observations regarding your child’s progress in Singapore classes...'}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 disabled:opacity-50 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? t.loading : (lang === 'kk' ? 'Жіберу' : 'Submit')}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
