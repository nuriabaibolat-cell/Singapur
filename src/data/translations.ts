import { Language } from '../types';

export const translations = {
  kk: {
    // App header & brand
    appTitle: 'Сингапур Академиясы',
    appSubtitle: 'Сингапур әдістемесі & ЖИ Білім беру платформасы',
    schoolClassesBadge: 'Сыныптар: 5 «А», 5 «Ғ», 1 «Ә»',

    // Navigation tabs
    navMethodology: 'Сингапур методикасы',
    navStudents: 'Сингапур сынып оқушылары',
    navParents: 'Ата-аналар',
    navTeacher: 'Мұғалім журналы',

    // Roles
    roleStudent: 'Оқушы',
    roleTeacher: 'Мұғалім',
    roleParent: 'Ата-ана',
    activeUser: 'Қолданушы',
    logOut: 'Шығу',
    logIn: 'Кіру',
    switchRole: 'Рөлді ауыстыру',

    // Authentication modal
    loginTitle: 'Сингапур сыныбы платформасына кіру',
    loginSubtitle: 'Оқушы, мұғалім және ата-ана жеке логин-құпиясөзбен кіреді',
    usernameLabel: 'Логин (пайдаланушы аты)',
    passwordLabel: 'Құпия сөз (Password)',
    rememberMe: 'Мені есте сақтау',
    signInButton: 'Жүйеге кіру',
    quickDemoAccounts: 'Жылдам кіруге арналған аккаунттар (Demo):',
    quickLoginAsStudent: '5 «Ғ» Оқушысы (Жансая)',
    quickLoginAsTeacher: 'Мұғалім (Айнұр Қ.)',
    quickLoginAsParent: 'Ата-ана (Қайрат А.)',
    loginErrorWrongCreds: 'Логин немесе құпия сөз қате! Демо деректерді пайдаланып көріңіз.',
    loggedInAs: 'Жүйеге кірген:',

    // AI Tutor floating button
    aiTutorBtnTitle: '5-сынып ЖИ Тәлімгері',
    aiTutorBtnSub: 'Сингапур математикасы & Ағылшын тілі',

    // General common
    watchVideo: 'Видеоны көру',
    leaveFeedback: 'Пікір білдіру',
    close: 'Жабу',
    save: 'Сақтау',
    cancel: 'Бас тарту',
    send: 'Жіберу',
    view: 'Қарау',
    back: 'Артқа',
    search: 'Іздеу',
    filterByClass: 'Сыныпты таңдау',
    allClasses: 'Барлық сыныптар',
    loading: 'Жүктелуде...',

    // Methodology View
    methodologyHeroBadge: 'Сингапур әдістемесі — Әлемдік көшбасшы білім беру моделі',
    methodologyHeroTitle: 'Математика және жаратылыстану сабақтарын ағылшын тілінде Сингапур методикасымен қабылдау',
    methodologyHeroDesc: '5 «А», 5 «Ғ» және 1 «Ә» Сингапур сыныптарында Математика (Singapore Math) және Жаратылыстану (Singapore Science) пәндері толықтай ағылшын тілінде оқытылады. Оқушылар математикалық Bar Model әдісін және ғылыми зерттеу (5E Inquiry) қадамдарын ЖИ көмекшісімен бірге терең меңгереді.',
    watchLessonsBtn: 'Сабақтан үзінді видеоларды көру',
    tryAiTutorBtn: '5-сынып ЖИ Тәлімгерін байқау',
    classesCountStat: '3 сынып',
    classesSubStat: '5 «А», 5 «Ғ» & 1 «Ә»',
    cpaPillarTitle: '1. Сингапур математикасы (CPA & Bar Modeling)',
    cpaPillarSubtitle: 'Сингапур математикасы жаттатпайды — алдымен нақты затпен ұстап (Concrete), кейін блок-модель сызып (Pictorial), соңында ғана формуланы жазады (Abstract). Барлық түсіндіру ағылшын тілінде жүреді.',
    sciencePillarTitle: '2. Сингапур жаратылыстануы (Science 5E Inquiry)',
    sciencePillarSubtitle: 'Жаратылыстану сабағы ағылшын тілінде 5E үлгісімен өтеді: Engage (Қызығушылық) ➔ Explore (Зерттеу) ➔ Explain (Түсіндіру) ➔ Elaborate (Тереңдету) ➔ Evaluate (Бағалау). Оқушылар гипотеза құрып, ғылыми дәлелдерді ағылшынша ұсынады.',
    tabConcrete: '1. Concrete (Заттық)',
    tabPictorial: '2. Pictorial (Bar Model)',
    tabAbstract: '3. Abstract (Формула)',
    barModelInteractive: 'Интерактивті Bar Model тренажеры:',
    scienceInquiryInteractive: 'Сингапур жаратылыстану зертханасы (Science 5E Lab):',
    videoLessonsTitle: 'Сингапур сабақтарынан үзінді видеолар',
    videoLessonsSubtitle: 'Математика мен Жаратылыстану сабақтарының қалай өтетінін көріңіз',
    aiResearchPillarTitle: '5-сыныпта Математика мен Жаратылыстануды ЖИ-мен қалай зерттейміз?',
    aiResearchPillarDesc: 'Оқушылар дайын жауапты көшірмейді! Сингапур әдісінде ЖИ оқушыға бағыттаушы сұрақтар қояды, Bar Model сызбасының дәлдігін және ғылыми гипотезаның ағылшынша құрылуын бірге талдайды.',

    // Student View (5 «Ғ» сынып оқушысы Қайратқызы Жансая)
    studentProfileTitle: 'Қайратқызы Жансая',
    studentProfileClass: '5 «Ғ» Сингапур сыныбы',
    studentProfileBadge: 'Сингапур оқыту бағдарламасы • Орта буын оқушысы • ID: SG-2025-5G',
    studentTabSchedule: 'Сабақ кестесі (Timetable)',
    studentTabGrades: 'Бағаларым мен үлгерім (Grades)',
    studentTabAiLab: '5-сынып ЖИ Көмекшісімен жұмыс',
    averageScore: 'Орташа үлгерім',
    cpaMasteryLevel: 'CPA Меңгеру деңгейі',
    totalGradesCount: 'Жинақталған бағалар',
    gradebookTitle: 'Оқушының бағалау журналы',
    gradebookDesc: 'Мұғалімдердің пікірлері және Сингапур бағалау критерийлері',
    teacherFeedback: 'Мұғалімнің кері байланысы:',
    aiLabTitle: '5-сынып ЖИ Зерттеу Орталығы',
    aiLabDesc: 'Сингапур есептерін ЖИ-мен бірге шешіп, қарым-қатынасты зертте! Біз дайын жауап алмай, дұрыс сұрақ (Prompt) қою арқылы Bar Model сызбасын қалай құруды үйренеміз.',
    openAiTutorModal: 'Интерактивті ЖИ Тәлімгерін ашу',
    askThisQuestion: 'Осы сұрақты ЖИ-ге қою',

    // Parent View
    parentGreeting: 'Қош келдіңіз, Қайрат Асқарұлы!',
    parentDesc: 'Балаңыз: Қайратқызы Жансая (5 «Ғ» Сингапур сыныбы). Мұнда бағаларды, сабақ видеоларын көріп, мұғалімдерге пікір қалдыра аласыз.',
    parentTabGrades: 'Баланың бағалары мен жетістіктері',
    parentTabVideos: 'Сабақ барысындағы видеолар',
    parentTabFeedback: 'Пікір білдіру терезесі & Жауаптар',
    parentFeedbackBoxTitle: 'Ата-аналардың пікір білдіру терезесі',
    parentFeedbackBoxDesc: 'Мектеп басшылығы мен Сингапур сыныбы мұғалімдеріне ұсыныс, пікір немесе сұрақ жазыңыз',
    newFeedbackBtn: 'Жаңа пікір қалдыру',
    teacherOfficialReply: 'Мұғалімнің ресми жауабы (Айнұр Қалибекқызы):',

    // Teacher View
    teacherGreeting: 'Қош келдіңіз, Айнұр Қалибекқызы!',
    teacherDesc: 'Сингапур әдістемесі жетекшісі • Сыныптар: 5 «А», 5 «Ғ», 1 «Ә»',
    teacherTabJournal: 'Бағалау журналы',
    teacherTabFeedback: 'Ата-аналар пікірлеріне жауап беру',
    addNewGradeBtn: 'Жаңа баға қою',
    studentNameCol: 'Оқушы',
    classCol: 'Сынып',
    subjectCol: 'Пән',
    topicCol: 'Тақырып',
    scoreCol: 'Балл',
    dateCol: 'Күні',
    replyToParentLabel: 'Ата-анаға ресми жауап жазу:',
    replyBtn: 'Жауап беру',

    // Footer
    footerRights: 'Сингапур сыныптарының білім беру және ЖИ платформасы • 5 «А», 5 «Ғ», 1 «Ә»',
    footerImmersion: 'Математика және Ағылшын тілі Сингапур CPA әдістемесімен ағылшын тілінде оқытылады',
  },

  en: {
    // App header & brand
    appTitle: 'Singapore Academy',
    appSubtitle: 'Singapore Methodology & AI Educational Platform',
    schoolClassesBadge: 'Classes: Grade 5 A, Grade 5 G, Grade 1 Ä',

    // Navigation tabs
    navMethodology: 'Singapore Methodology',
    navStudents: 'Singapore Class Students',
    navParents: 'Parents',
    navTeacher: 'Teacher Gradebook',

    // Roles
    roleStudent: 'Student',
    roleTeacher: 'Teacher',
    roleParent: 'Parent',
    activeUser: 'User',
    logOut: 'Sign Out',
    logIn: 'Sign In',
    switchRole: 'Switch Role',

    // Authentication modal
    loginTitle: 'Sign in to Singapore Class Platform',
    loginSubtitle: 'Students, teachers, and parents log in with their personal credentials',
    usernameLabel: 'Username / Login',
    passwordLabel: 'Password',
    rememberMe: 'Remember me',
    signInButton: 'Sign In',
    quickDemoAccounts: 'Quick Access Demo Accounts:',
    quickLoginAsStudent: 'Grade 5 G Student (Zhansaia)',
    quickLoginAsTeacher: 'Teacher (Ainur Q.)',
    quickLoginAsParent: 'Parent (Kairat A.)',
    loginErrorWrongCreds: 'Incorrect username or password! Please check demo credentials.',
    loggedInAs: 'Signed in as:',

    // AI Tutor floating button
    aiTutorBtnTitle: 'Grade 5 AI Tutor',
    aiTutorBtnSub: 'Singapore Math & English',

    // General common
    watchVideo: 'Watch Video',
    leaveFeedback: 'Leave Feedback',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    send: 'Send',
    view: 'View',
    back: 'Back',
    search: 'Search',
    filterByClass: 'Select Class',
    allClasses: 'All Classes',
    loading: 'Loading...',

    // Methodology View
    methodologyHeroBadge: 'Singapore Methodology — World-leading Educational Framework',
    methodologyHeroTitle: 'Singapore Methodology: Learning Mathematics and Science in English',
    methodologyHeroDesc: 'In Grade 5 A, Grade 5 G, and Grade 1 Ä Singapore classes, Mathematics (Singapore Math) and Science are taught completely in English. Students master visual Bar Modeling and the 5E Inquiry-based scientific model together with an AI companion.',
    watchLessonsBtn: 'Watch Classroom Video Excerpts',
    tryAiTutorBtn: 'Try Grade 5 AI Companion',
    classesCountStat: '3 Classes',
    classesSubStat: '5 A, 5 G & 1 Ä',
    cpaPillarTitle: '1. Singapore Mathematics (CPA & Bar Modeling)',
    cpaPillarSubtitle: 'Singapore Math avoids rote memorization: students manipulate real objects (Concrete), draw visual bar models (Pictorial), and formulate equations (Abstract). All reasoning is expressed in English.',
    sciencePillarTitle: '2. Singapore Science (5E Inquiry-Based Learning)',
    sciencePillarSubtitle: 'Science lessons follow the 5E inquiry cycle in English: Engage ➔ Explore ➔ Explain ➔ Elaborate ➔ Evaluate. Students formulate hypotheses and present experimental findings in academic English.',
    tabConcrete: '1. Concrete (Physical)',
    tabPictorial: '2. Pictorial (Bar Model)',
    tabAbstract: '3. Abstract (Equation)',
    barModelInteractive: 'Interactive Bar Model Simulator:',
    scienceInquiryInteractive: 'Singapore Science 5E Inquiry Lab:',
    videoLessonsTitle: 'Singapore Classroom Video Highlights',
    videoLessonsSubtitle: 'Watch Mathematics and Science inquiry in action',
    aiResearchPillarTitle: 'How Grade 5 students explore Math & Science with AI',
    aiResearchPillarDesc: 'Students never copy answers! In the Singapore framework, AI guides inquiry with scaffolding questions, verifying Bar Models and sharpening scientific hypotheses in English.',

    // Student View (Grade 5 G student Zhansaia Kairatkyzy)
    studentProfileTitle: 'Zhansaia Kairatkyzy',
    studentProfileClass: 'Grade 5 G Singapore Class',
    studentProfileBadge: 'Singapore Immersion Curriculum • Middle School Student • ID: SG-2025-5G',
    studentTabSchedule: 'Timetable',
    studentTabGrades: 'My Grades & Progress',
    studentTabAiLab: 'Grade 5 AI Companion Lab',
    averageScore: 'Average Score',
    cpaMasteryLevel: 'CPA Mastery Level',
    totalGradesCount: 'Total Grades',
    gradebookTitle: 'Student Assessment Logbook',
    gradebookDesc: 'Teacher feedback and Singapore curriculum assessment criteria',
    teacherFeedback: "Teacher's Feedback:",
    aiLabTitle: 'Grade 5 AI Inquiry Research Lab',
    aiLabDesc: 'Solve Singapore problems with AI and study effective human-AI communication! We craft prompts and discover how to build bar models step by step.',
    openAiTutorModal: 'Open Interactive AI Tutor',
    askThisQuestion: 'Ask AI This Question',

    // Parent View
    parentGreeting: 'Welcome, Mr. Kairat Askaruly!',
    parentDesc: 'Child: Zhansaia Kairatkyzy (Grade 5 G Singapore Class). View grades, classroom lesson recordings, and communicate directly with teachers.',
    parentTabGrades: "Child's Grades & Achievements",
    parentTabVideos: 'Classroom Lesson Videos',
    parentTabFeedback: 'Feedback Window & Replies',
    parentFeedbackBoxTitle: 'Parent Feedback & Inquiry Window',
    parentFeedbackBoxDesc: 'Submit suggestions, feedback, or inquiries to school leadership and Singapore teachers',
    newFeedbackBtn: 'Leave New Feedback',
    teacherOfficialReply: 'Official Teacher Reply (Ainur Qalibekkyzy):',

    // Teacher View
    teacherGreeting: 'Welcome, Ainur Qalibekkyzy!',
    teacherDesc: 'Singapore Curriculum Lead • Classes: Grade 5 A, Grade 5 G, Grade 1 Ä',
    teacherTabJournal: 'Gradebook Journal',
    teacherTabFeedback: 'Parent Inquiries & Responses',
    addNewGradeBtn: 'Add New Grade',
    studentNameCol: 'Student',
    classCol: 'Class',
    subjectCol: 'Subject',
    topicCol: 'Topic',
    scoreCol: 'Score',
    dateCol: 'Date',
    replyToParentLabel: 'Write official reply to parent:',
    replyBtn: 'Send Reply',

    // Footer
    footerRights: 'Singapore Classes Educational & AI Platform • 5 A, 5 G, 1 Ä',
    footerImmersion: 'Math & English taught through Singapore CPA methodology in full English immersion',
  }
};
