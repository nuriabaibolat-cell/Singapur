import { AuthUser } from '../types';

export const AUTH_USERS: AuthUser[] = [
  {
    id: 'user-student-zhansaya',
    username: 'zhansaya',
    password: '5g',
    name: 'Қайратқызы Жансая',
    role: 'student',
    roleTitle: {
      kk: '5 «Ғ» Сингапур сыныбының оқушысы',
      en: 'Grade 5 G Singapore Class Student'
    },
    className: '5 «Ғ» Сингапур сыныбы',
    avatarBg: 'bg-emerald-600',
  },
  {
    id: 'user-teacher-ainur',
    username: 'teacher',
    password: 'teach123',
    name: 'Айнұр Қалибекқызы',
    role: 'teacher',
    roleTitle: {
      kk: 'Сингапур әдістемесі математика & ағылшын жетекшісі',
      en: 'Lead Singapore Math & English Instructor'
    },
    className: '5 «А», 5 «Ғ», 1 «Ә» сыныптары',
    avatarBg: 'bg-indigo-600',
  },
  {
    id: 'user-parent-kairat',
    username: 'parent',
    password: 'parent123',
    name: 'Қайрат Асқарұлы',
    role: 'parent',
    roleTitle: {
      kk: '5 «Ғ» оқушысы Жансаяның ата-анасы',
      en: 'Parent of Zhansaia (Grade 5 G)'
    },
    studentName: 'Қайратқызы Жансая',
    className: '5 «Ғ» Сингапур сыныбы',
    avatarBg: 'bg-amber-600',
  },
];
