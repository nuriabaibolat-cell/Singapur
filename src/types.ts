export type Language = 'kk' | 'en';
export type UserRole = 'student' | 'teacher' | 'parent';

export interface AuthUser {
  id: string;
  username: string;
  password?: string;
  name: string;
  role: UserRole;
  roleTitle: {
    kk: string;
    en: string;
  };
  className?: string;
  studentName?: string; // For parents: which child they represent
  avatarBg: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  className?: string;
  studentName?: string;
  avatarBg: string;
}

export interface ScheduleItem {
  id: string;
  day: 'Дүйсенбі' | 'Сейсенбі' | 'Сәрсенбі' | 'Бейсенбі' | 'Жұма';
  dayEn: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  time: string;
  subject: string;
  englishTitle: string;
  teacher: string;
  room: string;
  className: string;
  topicKk: string;
  topicEn: string;
  cpaStage?: 'Concrete' | 'Pictorial' | 'Abstract' | 'Inquiry' | 'Oral Presentation';
}

export interface GradeRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  subject: string;
  subjectEn: string;
  topic: string;
  topicEn: string;
  score: number;
  maxScore?: number;
  cpaLevel: string;
  feedback: string;
  feedbackEn: string;
  date: string;
  assessmentType: 'Формативті бағалау' | 'БЖБ (Summative)' | 'ТЖБ (Term)' | 'Жобалық жұмыс' | 'Зертханалық жұмыс (Lab Work)';
  assessmentTypeEn: 'Formative Assessment' | 'Summative (Unit)' | 'Summative (Term)' | 'Project Work' | 'Scientific Inquiry Lab';
}

export interface SingaporeVideo {
  id: string;
  titleKk: string;
  titleEn: string;
  subject: 'Singapore Mathematics' | 'English Language' | 'Science & STEM' | 'Singapore Science (Жаратылыстану)' | 'Math & Science AI Lab';
  className: string;
  duration: string;
  date: string;
  teacherName: string;
  descriptionKk: string;
  descriptionEn: string;
  videoUrl: string;
  thumbnailUrl: string;
  cpaStage: 'Concrete-Pictorial' | 'Bar Modeling (Pictorial)' | 'Abstract Reasoning' | 'Oral Presentation' | '5E Inquiry (Engage & Explore)';
  highlightsKk: string[];
  highlightsEn: string[];
}

export interface FeedbackItem {
  id: string;
  author: string;
  authorEn?: string;
  studentName: string;
  date: string;
  messageKk: string;
  messageEn: string;
  replyKk?: string;
  replyEn?: string;
  replyDate?: string;
  rating: number;
  categoryKk?: string;
  categoryEn?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  modelIllustration?: {
    type: 'part-whole' | 'comparison' | 'fraction';
    labels: string[];
    values: (number | string)[];
    total?: number | string;
  };
}
