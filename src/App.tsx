import React, { useState, useEffect } from 'react';
import { UserRole, GradeRecord, FeedbackItem, SingaporeVideo, Language, AuthUser } from './types';
import { INITIAL_GRADES, INITIAL_FEEDBACK, LESSON_VIDEOS } from './data/singaporeData';
import { AUTH_USERS } from './data/authUsers';
import { translations } from './data/translations';
import { Header } from './components/Header';
import { SingaporeMethodologyView } from './components/SingaporeMethodologyView';
import { StudentsView } from './components/StudentsView';
import { ParentsView } from './components/ParentsView';
import { TeacherView } from './components/TeacherView';
import { VideoModal } from './components/VideoModal';
import { FeedbackModal } from './components/FeedbackModal';
import { AITutorDrawer } from './components/AITutorDrawer';
import { LoginModal } from './components/LoginModal';
import { Sparkles, School, ShieldCheck } from 'lucide-react';

export default function App() {
  // Language state: 'kk' (Kazakh) or 'en' (English)
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('singapore_academy_lang');
    return (saved === 'en' || saved === 'kk') ? saved : 'kk';
  });

  // Current authenticated user (defaults to 5 «Ғ» student Қайратқызы Жансая)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem('singapore_academy_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return AUTH_USERS[0];
      }
    }
    return AUTH_USERS[0]; // Default: Қайратқызы Жансая (5 «Ғ»)
  });

  const [activeTab, setActiveTab] = useState<string>('methodology');
  
  // Data state
  const [grades, setGrades] = useState<GradeRecord[]>(INITIAL_GRADES);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(INITIAL_FEEDBACK);

  // Modals & Drawers
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<SingaporeVideo | null>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);

  const t = translations[lang];

  // Persist language
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('singapore_academy_lang', newLang);
  };

  // Auth management
  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    localStorage.setItem('singapore_academy_user', JSON.stringify(user));
    
    // Automatically route to appropriate view on login
    if (user.role === 'student') {
      setActiveTab('students');
    } else if (user.role === 'parent') {
      setActiveTab('parents');
    } else if (user.role === 'teacher') {
      setActiveTab('teacher');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('singapore_academy_user');
    setIsLoginModalOpen(true);
  };

  // Fetch initial data from server if available
  useEffect(() => {
    fetch('/api/feedback')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFeedbackList(data);
        }
      })
      .catch(() => {
        // Local state fallback
      });

    fetch('/api/grades')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setGrades(data);
        }
      })
      .catch(() => {
        // Local state fallback
      });
  }, []);

  const handleAddGrade = async (newGrade: Omit<GradeRecord, 'id'>) => {
    try {
      const res = await fetch('/api/grades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGrade),
      });
      if (res.ok) {
        const created = await res.json();
        setGrades((prev) => [created, ...prev]);
        return;
      }
    } catch (e) {
      console.warn('API error, saving locally');
    }

    // Local fallback
    const localGrade: GradeRecord = {
      ...newGrade,
      id: 'g-' + Date.now(),
    };
    setGrades((prev) => [localGrade, ...prev]);
  };

  const handleReplyFeedback = async (id: string, reply: string) => {
    try {
      const res = await fetch(`/api/feedback/${id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply }),
      });
      if (res.ok) {
        const updated = await res.json();
        setFeedbackList((prev) => prev.map((item) => (item.id === id ? updated : item)));
        return;
      }
    } catch (e) {
      console.warn('API error, replying locally');
    }

    // Local fallback
    setFeedbackList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              replyKk: reply,
              replyEn: reply,
              replyDate: new Date().toLocaleDateString('kk-KZ', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }),
            }
          : item
      )
    );
  };

  const handleSubmitFeedback = async (feedbackData: {
    author: string;
    authorEn?: string;
    studentName: string;
    messageKk: string;
    messageEn: string;
    rating: number;
    categoryKk?: string;
    categoryEn?: string;
  }) => {
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });
      if (res.ok) {
        const created = await res.json();
        setFeedbackList((prev) => [created, ...prev]);
        return;
      }
    } catch (e) {
      console.warn('API error, submitting feedback locally');
    }

    // Local fallback
    const localItem: FeedbackItem = {
      id: 'fb-' + Date.now(),
      author: feedbackData.author,
      authorEn: feedbackData.authorEn || feedbackData.author,
      studentName: feedbackData.studentName,
      date: new Date().toLocaleDateString('kk-KZ', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      messageKk: feedbackData.messageKk,
      messageEn: feedbackData.messageEn,
      rating: feedbackData.rating,
      categoryKk: feedbackData.categoryKk,
      categoryEn: feedbackData.categoryEn,
    };
    setFeedbackList((prev) => [localItem, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Header with Language Switch & User Authentication */}
      <Header
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenAITutor={() => setIsAITutorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'methodology' && (
          <SingaporeMethodologyView
            onSelectVideo={(video) => setSelectedVideo(video)}
            onOpenAITutor={() => setIsAITutorOpen(true)}
            onOpenFeedback={() => setIsFeedbackModalOpen(true)}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            lang={lang}
          />
        )}

        {activeTab === 'students' && (
          <StudentsView
            grades={grades}
            onOpenAITutor={() => setIsAITutorOpen(true)}
            onSelectVideo={(video) => setSelectedVideo(video)}
            lang={lang}
          />
        )}

        {activeTab === 'parents' && (
          <ParentsView
            grades={grades}
            feedbackList={feedbackList}
            onOpenFeedback={() => setIsFeedbackModalOpen(true)}
            onSelectVideo={(video) => setSelectedVideo(video)}
            onOpenAITutor={() => setIsAITutorOpen(true)}
            lang={lang}
          />
        )}

        {activeTab === 'teacher' && (
          <TeacherView
            grades={grades}
            feedbackList={feedbackList}
            onAddGrade={handleAddGrade}
            onReplyFeedback={handleReplyFeedback}
            lang={lang}
          />
        )}
      </main>

      {/* Floating Action Button for 5th Grade AI Tutor */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="floating-ai-tutor-btn"
          onClick={() => setIsAITutorOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 hover:from-emerald-500 hover:to-indigo-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-xs">
            <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
          </div>
          <div className="text-left pr-1">
            <div className="text-xs font-black leading-none">
              {t.floatingAiBtn}
            </div>
            <div className="text-[10px] text-emerald-200 font-medium leading-none mt-1">
              Singapore Math & English
            </div>
          </div>
        </button>
      </div>

      {/* Login / Authentication Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        lang={lang}
      />

      {/* Video Player Modal */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        lang={lang}
      />

      {/* Parent Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleSubmitFeedback}
        initialStudentName="Қайратқызы Жансая (5 «Ғ»)"
        initialAuthorName={currentUser?.name || "Қайрат Асқарұлы"}
        lang={lang}
      />

      {/* 5th Grade AI Companion Drawer */}
      <AITutorDrawer
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        lang={lang}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <School className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-700">
              {t.footerText}
            </span>
            <span className="text-slate-400">• 5 «А», 5 «Ғ», 1 «Ә»</span>
          </div>
          <div className="text-center sm:text-right text-[11px] text-slate-400">
            {t.footerSub}
          </div>
        </div>
      </footer>
    </div>
  );
}
