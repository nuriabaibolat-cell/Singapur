import { ScheduleItem, GradeRecord, SingaporeVideo, FeedbackItem, UserProfile } from '../types';

export const SINGAPORE_CLASSES = [
  {
    id: 'class-5a',
    name: '5 «А» Сингапур сыныбы',
    nameEn: 'Grade 5 A Singapore Class',
    gradeKk: '5-сынып (Орта буын)',
    gradeEn: 'Grade 5 (Middle School)',
    studentsCount: 24,
    focusKk: 'Математика және Жаратылыстану пәндерін ағылшын тілінде CPA & 5E әдісімен оқу',
    focusEn: 'Mathematics & Science taught in English via CPA & 5E Inquiry pedagogy',
    mentorTeacher: 'Айнұр Қалибекқызы & Mr. David Evans',
    activeSince: '2024-2025',
    badges: ['Singapore Math & Science', 'English Immersion', 'AI Inquiry Lab']
  },
  {
    id: 'class-5g',
    name: '5 «Ғ» Сингапур сыныбы',
    nameEn: 'Grade 5 G Singapore Class',
    gradeKk: '5-сынып (Орта буын)',
    gradeEn: 'Grade 5 (Middle School)',
    studentsCount: 22,
    focusKk: 'Математика (Bar Model) & Жаратылыстану (5E Inquiry) толық ағылшын тілінде',
    focusEn: 'Singapore Math (Bar Modeling) & Science (5E Inquiry) entirely in English',
    mentorTeacher: 'Гүлжанат Берікқызы & Ms. Sarah Jenkins',
    activeSince: '2024-2025',
    badges: ['Singapore Math & Science', '5E Inquiry Framework', 'Zhansaia Kairatkyzy Class']
  },
  {
    id: 'class-1a-umlaut',
    name: '1 «Ә» Сингапур сыныбы',
    nameEn: 'Grade 1 Ä Singapore Class',
    gradeKk: '1-сынып (Бастауыш буын)',
    gradeEn: 'Grade 1 (Primary)',
    studentsCount: 20,
    focusKk: 'Бастауыш математика (Number Bonds) және қарапайым жаратылыстану ағылшынша',
    focusEn: 'Primary Singapore Math (Number Bonds) & Early Science Discovery in English',
    mentorTeacher: 'Мөлдір Ерланқызы',
    activeSince: '2024-2025',
    badges: ['Early CPA Mastery', 'Primary Science Immersion']
  }
];

export const SCHEDULE_DATA: ScheduleItem[] = [
  // Дүйсенбі / Monday - 5 «Ғ» (Жансаяның сыныбы)
  {
    id: 'sch-1',
    day: 'Дүйсенбі',
    dayEn: 'Monday',
    time: '08:30 - 09:15',
    subject: 'Сингапур математикасы (Singapore Math)',
    englishTitle: 'Singapore Mathematics',
    teacher: 'Айнұр Қалибекқызы',
    room: '№ 304 (Singapore Lab)',
    className: '5 «Ғ» Сингапур сыныбы',
    topicKk: 'Bar Modeling: Бөлшектер мен көп сатылы есептер (Fractions & Multi-step)',
    topicEn: 'Bar Modeling: Fractions & Multi-step Word Problems',
    cpaStage: 'Pictorial'
  },
  {
    id: 'sch-2',
    day: 'Дүйсенбі',
    dayEn: 'Monday',
    time: '09:25 - 10:10',
    subject: 'Сингапур жаратылыстануы (Singapore Science)',
    englishTitle: 'Singapore Science (Inquiry-Based)',
    teacher: 'Mr. David Evans & Айнұр Қ.',
    room: '№ 306 (Science Lab)',
    className: '5 «Ғ» Сингапур сыныбы',
    topicKk: '5E Inquiry: Өсімдіктер жүйесі & Фотосинтез (Plant Systems & Photosynthesis in English)',
    topicEn: '5E Inquiry: Plant Systems & Photosynthesis in English',
    cpaStage: 'Inquiry'
  },
  {
    id: 'sch-3',
    day: 'Дүйсенбі',
    dayEn: 'Monday',
    time: '10:25 - 11:10',
    subject: 'ЖИ & Жаратылыстану Зертханасы',
    englishTitle: 'Math & Science AI Discovery Lab',
    teacher: 'Нұрлан Серікұлы',
    room: '№ 208 (AI Lab)',
    className: '5 «Ғ» Сингапур сыныбы',
    topicKk: 'ЖИ көмегімен математикалық модельдер мен ғылыми гипотезаларды талдау',
    topicEn: 'Analyzing Math Bar Models & Scientific Hypotheses with AI',
    cpaStage: 'Abstract'
  },

  // Сейсенбі / Tuesday - 5 «Ғ»
  {
    id: 'sch-4',
    day: 'Сейсенбі',
    dayEn: 'Tuesday',
    time: '08:30 - 09:15',
    subject: 'Сингапур математикасы (Singapore Math)',
    englishTitle: 'Singapore Mathematics',
    teacher: 'Айнұр Қалибекқызы',
    room: '№ 304 (Singapore Lab)',
    className: '5 «Ғ» Сингапур сыныбы',
    topicKk: 'Comparison Bar Models: Салыстыру модельдерін құру (Difference & Multiples)',
    topicEn: 'Comparison Models: Difference and Multiples',
    cpaStage: 'Pictorial'
  },
  {
    id: 'sch-5',
    day: 'Сейсенбі',
    dayEn: 'Tuesday',
    time: '09:25 - 10:10',
    subject: 'Сингапур жаратылыстануы (Singapore Science)',
    englishTitle: 'Singapore Science Experiment',
    teacher: 'Ms. Sarah Jenkins',
    room: '№ 306 (Science Lab)',
    className: '5 «Ғ» Сингапур сыныбы',
    topicKk: 'Hands-on Experiment: Заттардың тығыздығы мен күйлері (Matter & Density in English)',
    topicEn: 'Hands-on Experiment: Matter & Density in English',
    cpaStage: 'Concrete'
  },

  // Сәрсенбі / Wednesday - 5 «Ғ»
  {
    id: 'sch-6',
    day: 'Сәрсенбі',
    dayEn: 'Wednesday',
    time: '08:30 - 09:15',
    subject: 'Сингапур математикасы (Singapore Math)',
    englishTitle: 'Singapore Mathematics',
    teacher: 'Айнұр Қалибекқызы',
    room: '№ 304 (Singapore Lab)',
    className: '5 «Ғ» Сингапур сыныбы',
    topicKk: 'Concrete Phase: Бөлшек шеңберлері мен манипулятивтермен жұмыс',
    topicEn: 'Manipulatives: Fraction Discs & Geometric Shapes',
    cpaStage: 'Concrete'
  },
  {
    id: 'sch-7',
    day: 'Сәрсенбі',
    dayEn: 'Wednesday',
    time: '09:25 - 10:10',
    subject: 'Сингапур жаратылыстануы (Singapore Science)',
    englishTitle: 'Singapore Science (Ecosystems)',
    teacher: 'Mr. David Evans',
    room: '№ 306 (Science Lab)',
    className: '5 «Ғ» Сингапур сыныбы',
    topicKk: 'Ecosystems & Energy Flow: Энергия ағыны және қоректік тізбек ағылшын тілінде',
    topicEn: 'Ecosystems & Energy Flow Chains in English',
    cpaStage: 'Inquiry'
  },

  // Бейсенбі / Thursday - 5 «Ғ»
  {
    id: 'sch-8',
    day: 'Бейсенбі',
    dayEn: 'Thursday',
    time: '08:30 - 09:15',
    subject: 'Сингапур математикасы (Singapore Math)',
    englishTitle: 'Singapore Mathematics',
    teacher: 'Айнұр Қалибекқызы',
    room: '№ 304 (Singapore Lab)',
    className: '5 «Ғ» Сингапур сыныбы',
    topicKk: 'Ratio and Proportion: Қатынас және пропорция модельдері ағылшынша түсіндірумен',
    topicEn: 'Ratio & Proportion Bar Modeling with English Proofs',
    cpaStage: 'Pictorial'
  },

  // Жұма / Friday - 5 «Ғ»
  {
    id: 'sch-9',
    day: 'Жұма',
    dayEn: 'Friday',
    time: '08:30 - 09:15',
    subject: 'Сингапур математикасы & Жаратылыстану қорытындысы',
    englishTitle: 'Singapore Math & Science Integration',
    teacher: 'Айнұр Қалибекқызы',
    room: '№ 304 (Singapore Lab)',
    className: '5 «Ғ» Сингапур сыныбы',
    topicKk: 'Ғылыми деректерді математикалық графиктер мен модельдерге түсіру',
    topicEn: 'Plotting Scientific Data using Bar Models & Equations',
    cpaStage: 'Abstract'
  },

  // 5 «А» сабақ кестесі
  {
    id: 'sch-10',
    day: 'Дүйсенбі',
    dayEn: 'Monday',
    time: '08:30 - 09:15',
    subject: 'Сингапур математикасы (Singapore Math)',
    englishTitle: 'Singapore Mathematics',
    teacher: 'Гүлжанат Берікқызы',
    room: '№ 302',
    className: '5 «А» Сингапур сыныбы',
    topicKk: 'Whole Numbers & Order of Operations via Bar Models',
    topicEn: 'Whole Numbers & Order of Operations via Bar Models',
    cpaStage: 'Pictorial'
  },
  {
    id: 'sch-11',
    day: 'Дүйсенбі',
    dayEn: 'Monday',
    time: '09:25 - 10:10',
    subject: 'Сингапур жаратылыстануы (Singapore Science)',
    englishTitle: 'Singapore Science (Inquiry)',
    teacher: 'Ms. Sarah Jenkins',
    room: '№ 306',
    className: '5 «А» Сингапур сыныбы',
    topicKk: 'Cycles of Life: Тірі табиғат циклдері ағылшын тілінде',
    topicEn: 'Cycles of Life & Adaptations in English',
    cpaStage: 'Inquiry'
  },

  // 1 «Ә» сабақ кестесі
  {
    id: 'sch-12',
    day: 'Дүйсенбі',
    dayEn: 'Monday',
    time: '08:30 - 09:15',
    subject: 'Бастауыш Сингапур математикасы',
    englishTitle: 'Primary Singapore Math',
    teacher: 'Мөлдір Ерланқызы',
    room: '№ 102 (Junior Lab)',
    className: '1 «Ә» Сингапур сыныбы',
    topicKk: 'Number Bonds to 10 with Unifix Cubes',
    topicEn: 'Number Bonds to 10 with Unifix Cubes',
    cpaStage: 'Concrete'
  },
  {
    id: 'sch-13',
    day: 'Дүйсенбі',
    dayEn: 'Monday',
    time: '09:25 - 10:10',
    subject: 'Бастауыш Жаратылыстану (Primary Science Discovery)',
    englishTitle: 'Primary Science Discovery',
    teacher: 'Мөлдір Ерланқызы',
    room: '№ 102 (Junior Lab)',
    className: '1 «Ә» Сингапур сыныбы',
    topicKk: 'Living & Non-living Things: Айналадағы әлемді ағылшынша тану',
    topicEn: 'Living & Non-living Things in English',
    cpaStage: 'Concrete'
  }
];

export const INITIAL_GRADES: GradeRecord[] = [
  {
    id: 'g-1',
    studentId: 'stud-zhansaya',
    studentName: 'Қайратқызы Жансая',
    className: '5 «Ғ» Сингапур сыныбы',
    subject: 'Singapore Mathematics',
    subjectEn: 'Singapore Mathematics',
    topic: 'Bar Modeling: Fractions & Ratio (Бөлшектерді блок-модельмен шешу)',
    topicEn: 'Bar Modeling: Fractions & Ratio Problems',
    score: 98,
    maxScore: 100,
    cpaLevel: 'Abstract (A) - Жоғары деңгей',
    feedback: 'Жансая 3 бөліктен тұратын күрделі мәтіндік есептің Bar Model сызбасын мінсіз сызып, ағылшын тілінде шешімін толық дәлелдеп берді. Өте тамаша нәтиже!',
    feedbackEn: 'Zhansaia drew a flawless 3-part Bar Model for a complex word problem and articulated the full solution in fluent mathematical English. Outstanding work!',
    date: '2025-02-14',
    assessmentType: 'БЖБ (Summative)',
    assessmentTypeEn: 'Summative (Unit)'
  },
  {
    id: 'g-2',
    studentId: 'stud-zhansaya',
    studentName: 'Қайратқызы Жансая',
    className: '5 «Ғ» Сингапур сыныбы',
    subject: 'English Language',
    subjectEn: 'English Language',
    topic: 'Inquiry-Based Dialogue & Mathematical Vocabulary',
    topicEn: 'Inquiry-Based Dialogue & Mathematical Vocabulary',
    score: 96,
    maxScore: 100,
    cpaLevel: 'Proficient (Академиялық тіл)',
    feedback: 'Сыныптағы пікірталаста Сингапур академиялық сөздік қорын ("unit", "comparison", "reasoning") өте орынды қолданды. Топта көшбасшылық танытты.',
    feedbackEn: 'Accurately applied Singapore academic vocabulary ("unit", "comparison", "reasoning") in collaborative debates. Demonstrated strong leadership.',
    date: '2025-02-13',
    assessmentType: 'Формативті бағалау',
    assessmentTypeEn: 'Formative Assessment'
  },
  {
    id: 'g-3',
    studentId: 'stud-zhansaya',
    studentName: 'Қайратқызы Жансая',
    className: '5 «Ғ» Сингапур сыныбы',
    subject: 'Singapore Mathematics',
    subjectEn: 'Singapore Mathematics',
    topic: 'Comparison Model & Multiples word problems',
    topicEn: 'Comparison Model & Multiples word problems',
    score: 94,
    maxScore: 100,
    cpaLevel: 'Pictorial ➔ Abstract',
    feedback: 'Салыстыру моделі бойынша бірлікті (1 unit) табу амалдарын қатесіз орындады. ЖИ-ге дұрыс сұрақ қойып, жауапты тексеруді меңгерген.',
    feedbackEn: 'Correctly executed single unit calculations via comparison models. Demonstrated skilled prompting when cross-checking with AI.',
    date: '2025-02-11',
    assessmentType: 'Формативті бағалау',
    assessmentTypeEn: 'Formative Assessment'
  },
  {
    id: 'g-4',
    studentId: 'stud-zhansaya',
    studentName: 'Қайратқызы Жансая',
    className: '5 «Ғ» Сингапур сыныбы',
    subject: 'Singapore Science (Жаратылыстану)',
    subjectEn: 'Singapore Science (Inquiry)',
    topic: '5E Inquiry: Photosynthesis & Plant Systems in English (Өсімдіктер фотосинтезі)',
    topicEn: '5E Inquiry: Photosynthesis & Plant Systems in English',
    score: 97,
    maxScore: 100,
    cpaLevel: '5E Inquiry: Explain & Evaluate',
    feedback: 'Жансая өсімдік жасушалары мен жарықтың әсерін ағылшын тіліндегі ғылыми гипотезамен ("If light intensity increases, then...") өте шебер қорғап шықты.',
    feedbackEn: 'Zhansaia formulated hypotheses in scientific English and successfully explained the variables influencing photosynthesis.',
    date: '2025-02-12',
    assessmentType: 'Зертханалық жұмыс (Lab Work)',
    assessmentTypeEn: 'Scientific Inquiry Lab'
  },
  {
    id: 'g-5',
    studentId: 'stud-zhansaya',
    studentName: 'Қайратқызы Жансая',
    className: '5 «Ғ» Сингапур сыныбы',
    subject: 'Math & Science AI Lab',
    subjectEn: 'Math & Science AI Lab',
    topic: 'AI Prompt Engineering for Math Bar Models & Science Hypotheses',
    topicEn: 'AI Prompt Engineering for Math Bar Models & Science Hypotheses',
    score: 95,
    maxScore: 100,
    cpaLevel: 'Advanced AI Interaction',
    feedback: 'Жасанды интеллектпен диалогта есептің дайын жауабын сұрамай, "Bar Model сызбасы мен ғылыми айнымалылардың байланысы қандай?" деп сұрап, тиімді зерттеу жүргізді.',
    feedbackEn: 'Exemplary prompt technique with the AI tutor—asked scaffolding verification questions for both Bar Modeling and Science variables.',
    date: '2025-02-10',
    assessmentType: 'Жобалық жұмыс',
    assessmentTypeEn: 'Project Work'
  },
  {
    id: 'g-6',
    studentId: 'stud-alihan',
    studentName: 'Әлихан Сейітқали',
    className: '5 «А» Сингапур сыныбы',
    subject: 'Singapore Science (Жаратылыстану)',
    subjectEn: 'Singapore Science',
    topic: 'States of Matter & Density Inquiry (Заттардың күйлері және тығыздық)',
    topicEn: 'States of Matter & Density Inquiry',
    score: 93,
    maxScore: 100,
    cpaLevel: 'Explore ➔ Explain',
    feedback: 'Судың тығыздығы мен қалқымалы денелердің тәжірибесін ағылшынша түсіндіріп берді.',
    feedbackEn: 'Articulated density principles and buoyancy observations in academic English.',
    date: '2025-02-14',
    assessmentType: 'БЖБ (Summative)',
    assessmentTypeEn: 'Summative (Unit)'
  },
  {
    id: 'g-7',
    studentId: 'stud-1a-umlaut',
    studentName: 'Айзере Мұратқызы',
    className: '1 «Ә» Сингапур сыныбы',
    subject: 'Primary Singapore Math',
    subjectEn: 'Primary Singapore Math',
    topic: 'Number Bonds to 10 (Онға дейінгі сандар байланысы)',
    topicEn: 'Number Bonds to 10 using Unifix Cubes',
    score: 95,
    maxScore: 100,
    cpaLevel: 'Concrete (C)',
    feedback: 'Текшелермен 10 санын құраудың барлық нұсқасын қолмен көрсетіп, ағылшынша айтты.',
    feedbackEn: 'Demonstrated all combinations for number 10 using hands-on cubes and voiced them in English.',
    date: '2025-02-12',
    assessmentType: 'Формативті бағалау',
    assessmentTypeEn: 'Formative Assessment'
  }
];

export const LESSON_VIDEOS: SingaporeVideo[] = [
  {
    id: 'vid-1',
    titleKk: '5 «Ғ» сыныбы: Бөлшектерді Bar Model арқылы көрнекі шешу сабағы',
    titleEn: 'Grade 5 G: Fractions Mastery via Visual Bar Modeling',
    subject: 'Singapore Mathematics',
    className: '5 «Ғ» Сингапур сыныбы',
    duration: '14:20',
    date: '2025-02-13',
    teacherName: 'Айнұр Қалибекқызы',
    descriptionKk: '5 «Ғ» сыныбындағы ашық сабақ үзіндісі. Оқушы Қайратқызы Жансая тақтада "Before-After" Bar Model сызып, ағылшын тілінде есептің шешілу логикасын түсіндіреді.',
    descriptionEn: 'Classroom recording in Grade 5 G. Student Zhansaia Kairatkyzy presents a Before-After Bar Model at the whiteboard, explaining her reasoning in English.',
    videoUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    cpaStage: 'Bar Modeling (Pictorial)',
    highlightsKk: [
      'Қайратқызы Жансаяның тақтадағы дәлелдеуі (03:45)',
      '1 Unit (бірлік) анықтамасы мен есептеу алгоритмі',
      'Оқушылардың ағылшын тіліндегі математикалық сөйлеуі'
    ],
    highlightsEn: [
      'Zhansaia Kairatkyzy problem breakdown at the board (03:45)',
      'Unit definition and step-by-step arithmetic',
      'English math inquiry dialogue between students'
    ]
  },
  {
    id: 'vid-science-1',
    titleKk: '5 «Ғ» сыныбы: Сингапур жаратылыстануы — 5E Inquiry ғылыми зерттеу сабағы',
    titleEn: 'Grade 5 G: Singapore Science — 5E Inquiry & Ecosystem Experiment',
    subject: 'Singapore Science (Жаратылыстану)',
    className: '5 «Ғ» Сингапур сыныбы',
    duration: '13:10',
    date: '2025-02-12',
    teacherName: 'Mr. David Evans & Айнұр Қалибекқызы',
    descriptionKk: '5 «Ғ» сыныбы оқушыларының жаратылыстану сабағындағы ғылыми эксперименті. Өсімдіктер тыныс алуы мен фотосинтез процесін ағылшын тілінде болжап, зерттейді.',
    descriptionEn: 'Grade 5 G scientific inquiry session in English: Students test hypotheses on plant respiration and energy transfer using the Singapore 5E learning cycle.',
    videoUrl: 'https://www.youtube.com/embed/L_LUpnjgPso',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    cpaStage: '5E Inquiry (Engage & Explore)',
    highlightsKk: [
      'Жансаяның ғылыми гипотезаны ағылшынша ұсынуы (04:15)',
      'Айнымалыларды (Variables) салыстыру және дерек жазу',
      'Сингапур ғылыми сөздік қорымен диалог'
    ],
    highlightsEn: [
      'Zhansaia presenting hypothesis in scientific English (04:15)',
      'Controlling variables and data recording',
      'Singapore Science academic discourse'
    ]
  },
  {
    id: 'vid-2',
    titleKk: '5 «Ғ» сыныбы: ЖИ-мен тиімді қарым-қатынас — Математика мен ғылым сұрақтары',
    titleEn: 'Grade 5 G: AI Inquiry Lab — Math & Science Reasoning with AI',
    subject: 'Math & Science AI Lab',
    className: '5 «Ғ» Сингапур сыныбы',
    duration: '11:45',
    date: '2025-02-11',
    teacherName: 'Нұрлан Серікұлы & Айнұр Қалибекқызы',
    descriptionKk: 'Оқушылар ЖИ тәлімгерімен жұмыс істейді: есептің дұрыс сұрағын қою, математикалық терминдер мен ғылыми себеп-салдарды талдау.',
    descriptionEn: 'Students interact with the AI companion: learning prompt formulation, Singapore math terminology, and self-correcting calculation errors.',
    videoUrl: 'https://www.youtube.com/embed/L_LUpnjgPso',
    thumbnailUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    cpaStage: 'Abstract Reasoning',
    highlightsKk: [
      'ЖИ-ге сұрақ қою (Prompt Engineering) жаттығуы',
      'Жансая мен жұбының ЖИ диалогын талдауы',
      'Математика мен Жаратылыстану бойынша ағылшынша сұрақ қою'
    ],
    highlightsEn: [
      'Effective prompt formulation practice for Grade 5',
      'Analyzing AI feedback collaboratively',
      'Academic English reasoning'
    ]
  },
  {
    id: 'vid-3',
    titleKk: '5 «А» сыныбы: Comparison Bar Model мен теңдеулер байланысы',
    titleEn: 'Grade 5 A: Connecting Comparison Models with Equations',
    subject: 'Singapore Mathematics',
    className: '5 «А» Сингапур сыныбы',
    duration: '12:15',
    date: '2025-02-08',
    teacherName: 'Гүлжанат Берікқызы',
    descriptionKk: '5 «А» сыныбының есеп шығару шеберлігі. Салыстыру блоктарынан тікелей абстрактілі алгебралық өрнектерге көшу әдістемесі.',
    descriptionEn: 'Grade 5 A problem solving: Transitioning from pictorial comparison bars directly into algebraic equations.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    cpaStage: 'Bar Modeling (Pictorial)',
    highlightsKk: ['Салыстыру моделі (Comparison Model)', 'Пикториалдықтан абстрактіге өту'],
    highlightsEn: ['Comparison model architecture', 'Pictorial to abstract transition']
  },
  {
    id: 'vid-4',
    titleKk: '1 «Ә» сыныбы: Concrete сатысы — Number Bonds және текшелер',
    titleEn: 'Grade 1 Ä: Hands-on Manipulatives & Number Bonds',
    subject: 'Singapore Mathematics',
    className: '1 «Ә» Сингапур сыныбы',
    duration: '09:50',
    date: '2025-02-05',
    teacherName: 'Мөлдір Ерланқызы',
    descriptionKk: '1 «Ә» Сингапур сыныбының бастауыш буын оқушылары Unifix текшелерімен 10-ға дейінгі сандар байланысын тәжірибеде көреді.',
    descriptionEn: 'Grade 1 Ä primary learners discovering Number Bonds to 10 hands-on with colorful Unifix manipulative cubes.',
    videoUrl: 'https://www.youtube.com/embed/kJQP7kiw5Fk',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    cpaStage: 'Concrete-Pictorial',
    highlightsKk: ['Нақты заттармен (Manipulatives) жұмыс', 'Number Bonds әдісі', 'Ағылшынша санау'],
    highlightsEn: ['Manipulatives in action', 'Number Bonds visualization', 'English counting']
  }
];

export const INITIAL_FEEDBACK: FeedbackItem[] = [
  {
    id: 'fb-1',
    author: 'Қайрат Асқарұлы (Жансаяның әкесі, 5 «Ғ»)',
    authorEn: 'Kairat Askaruly (Father of Zhansaia, Grade 5 G)',
    studentName: 'Қайратқызы Жансая',
    date: '2025-02-14 15:30',
    messageKk: 'Қызым Жансая Сингапур математикасымен есепті Bar Model арқылы шешуді өте жақсы меңгерді! Әсіресе ағылшын тілінде ойын еркін жеткізіп жүргені қуантады. Сабақ видеолары мен ЖИ тәлімгері өте пайдалы екен. Мұғалімдерге мың алғыс!',
    messageEn: 'My daughter Zhansaia has mastered solving problems through Singapore Bar Modeling! Her confidence in explaining math solutions in English is remarkable. The lesson videos and AI companion are extremely helpful.',
    replyKk: 'Рақмет, Қайрат мырза! Жансая 5 «Ғ» сыныбында үлгілі оқушы, әсіресе Fractions (бөлшектер) бойынша модельді өте анық сызады және ЖИ-мен дұрыс сұрақ құрастыруда көшбасшылық танытып жүр.',
    replyEn: 'Thank you, Mr. Kairat! Zhansaia is a role model in Grade 5 G, sketching lucid models in Fractions and pioneering thoughtful prompts with the AI companion.',
    replyDate: '2025-02-14 17:10',
    rating: 5,
    categoryKk: 'Сингапур әдістемесі',
    categoryEn: 'Singapore Methodology'
  },
  {
    id: 'fb-2',
    author: 'Айнұр Маратқызы (Әлиханның анасы, 5 «А»)',
    authorEn: 'Ainur Maratkyzy (Mother of Alikhan, Grade 5 A)',
    studentName: 'Әлихан Сейітқали',
    date: '2025-02-12 11:20',
    messageKk: 'Ағылшын тілінде сөйлеу дағдысы бойынша сабақтар өте нәтижелі. Видеолардан балалардың қалай талқылап жатқанын көріп отырамыз.',
    messageEn: 'The English speaking practice is giving tangible results. Watching their classroom debates on video is so reassuring.',
    replyKk: 'Құрметті Айнұр ханым, жылы лебізіңізге рақмет! Оқушылардың академиялық сөйлеуін әрі қарай дамытамыз.',
    replyEn: 'Thank you, Mrs. Ainur! We will keep sharpening their academic presentation skills.',
    replyDate: '2025-02-12 14:00',
    rating: 5,
    categoryKk: 'Сабақ үдерісі',
    categoryEn: 'Lesson Process'
  }
];

export const AI_PROMPT_SUGGESTIONS = [
  {
    subject: 'math',
    titleKk: 'Bar Model арқылы қатынас (Ratio) есебін талдау',
    titleEn: 'Analyze Ratio word problem using Bar Modeling',
    promptKk: 'Жансая мен Айсұлтанда барлығы 120 стикер бар. Айсұлтанда Жансаяға қарағанда 3 есе көп стикер бар. Мұны Сингапур Bar Model сызбасы бойынша 5-сынып оқушысына қалай түсіндіресің?',
    promptEn: 'Zhansaia and Aisultan have 120 stickers in total. Aisultan has 3 times as many as Zhansaia. Explain how to solve this step-by-step using a Singapore comparison bar model for a 5th grader.'
  },
  {
    subject: 'math',
    titleKk: 'Бөлшектерді (Fractions) көрнекі модельдеу',
    titleEn: 'Visualizing Fractions in Singapore Math',
    promptKk: '1/2 мен 1/3 бөлшектерін қосу үшін Сингапур әдісінде блок-модельді қалай бірдей бөліктерге (equivalent units) бөлеміз?',
    promptEn: 'To add 1/2 and 1/3 in Singapore math, how do we partition bar models into equivalent units visually?'
  },
  {
    subject: 'english',
    titleKk: 'Математикалық дәлелдеуді ағылшынша сөйлеу',
    titleEn: 'Speaking Mathematical Reasoning in English',
    promptKk: '5-сынып оқушысы үшін "Мен бұл есепті 1 бөлік (unit) табу арқылы шештім" дегенді ағылшын тілінде академиялық сөйлеммен қалай жеткізуге болады?',
    promptEn: 'How can a 5th grader express "I solved this problem by finding the value of 1 unit first" in fluent academic mathematical English?'
  },
  {
    subject: 'english',
    titleKk: 'Сингапур сөздік қорымен диалог',
    titleEn: 'Inquiry Dialogue with Singapore Vocab',
    promptKk: 'Let\'s have a conversation in English about Singapore Math CPA stages: Concrete, Pictorial, and Abstract. Ask me 1 question to test my understanding!',
    promptEn: 'Let\'s have a conversation in English about Singapore Math CPA stages: Concrete, Pictorial, and Abstract. Ask me 1 question to test my understanding!'
  },
  {
    subject: 'science',
    titleKk: 'Сингапур Жаратылыстануы: 5E Inquiry гипотезасы',
    titleEn: 'Singapore Science 5E Hypothesis in English',
    promptKk: '5 «Ғ» сыныбындағы Сингапур жаратылыстануы бойынша фотосинтез процесіне жарықтың әсерін (effect of sunlight on plant growth) ағылшын тілінде 5E ғылыми моделімен және гипотезамен қалай зерттейміз?',
    promptEn: 'In Grade 5 Singapore Science, how do we formulate a testable scientific hypothesis in English for the effect of sunlight on plant growth using the 5E inquiry cycle?'
  },
  {
    subject: 'science',
    titleKk: 'Ғылыми терминдерді ағылшынша үйрену (Matter & Density)',
    titleEn: 'Science Academic Vocabulary in English (Density)',
    promptKk: 'Тығыздық (Density) және масса (Mass) ұғымдарын 5-сынып оқушысына ағылшын тілінде Сингапур тәсілімен эксперимент арқылы қалай түсіндіресің?',
    promptEn: 'Explain the concept of Density = Mass / Volume to a 5th grader in simple academic English with an interactive water buoyancy experiment!'
  }
];
