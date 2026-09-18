import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store for Singapore classes (5 «А», 5 «Ғ», 1 «Ә»)
const store = {
  feedback: [
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
  ],
  grades: [
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
      studentId: 'stud-alihan',
      studentName: 'Әлихан Сейітқали',
      className: '5 «А» Сингапур сыныбы',
      subject: 'Singapore Mathematics',
      subjectEn: 'Singapore Mathematics',
      topic: 'Bar Modeling: Area & Perimeter of Compound Figures',
      topicEn: 'Bar Modeling: Area & Perimeter of Compound Figures',
      score: 92,
      maxScore: 100,
      cpaLevel: 'Abstract (A)',
      feedback: 'Күрделі фигураларды тіктөртбұрыштарға бөлу арқылы ауданын дәл есептеді.',
      feedbackEn: 'Accurately partitioned composite shapes into rectangles to calculate total area.',
      date: '2025-02-14',
      assessmentType: 'БЖБ (Summative)',
      assessmentTypeEn: 'Summative (Unit)'
    }
  ]
};

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', classes: ['5 «А»', '5 «Ғ»', '1 «Ә»'], time: new Date().toISOString() });
});

// Feedback API
app.get('/api/feedback', (req, res) => {
  res.json(store.feedback);
});

app.post('/api/feedback', (req, res) => {
  const { author, authorEn, studentName, messageKk, messageEn, message, rating, categoryKk, categoryEn } = req.body;
  const finalMsgKk = messageKk || message || '';
  const finalMsgEn = messageEn || message || '';
  if (!author || (!finalMsgKk && !finalMsgEn)) {
    return res.status(400).json({ error: 'Author and message are required' });
  }
  const newFeedback = {
    id: 'fb-' + Date.now(),
    author,
    authorEn: authorEn || author,
    studentName: studentName || 'Қайратқызы Жансая (5 «Ғ»)',
    date: new Date().toLocaleString('kk-KZ', { dateStyle: 'short', timeStyle: 'short' }),
    messageKk: finalMsgKk,
    messageEn: finalMsgEn,
    replyKk: '',
    replyEn: '',
    replyDate: '',
    rating: Number(rating) || 5,
    categoryKk: categoryKk || 'Сингапур әдістемесі',
    categoryEn: categoryEn || 'Singapore Methodology'
  };
  store.feedback.unshift(newFeedback);
  res.status(201).json(newFeedback);
});

app.post('/api/feedback/:id/reply', (req, res) => {
  const { id } = req.params;
  const { reply, replyEn } = req.body;
  const item = store.feedback.find(f => f.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Feedback not found' });
  }
  item.replyKk = reply;
  item.replyEn = replyEn || reply;
  item.replyDate = new Date().toLocaleString('kk-KZ', { dateStyle: 'short', timeStyle: 'short' });
  res.json(item);
});

// Grades API
app.get('/api/grades', (req, res) => {
  res.json(store.grades);
});

app.post('/api/grades', (req, res) => {
  const { studentName, className, subject, topic, topicEn, score, cpaLevel, feedback, feedbackEn, assessmentType, assessmentTypeEn } = req.body;
  if (!studentName || !subject || score === undefined) {
    return res.status(400).json({ error: 'Missing required grade fields' });
  }
  const newGrade = {
    id: 'g-' + Date.now(),
    studentId: 'stud-' + Date.now(),
    studentName,
    className: className || '5 «Ғ» Сингапур сыныбы',
    subject,
    subjectEn: subject,
    topic: topic || 'Singapore assessment',
    topicEn: topicEn || topic || 'Singapore assessment',
    score: Number(score),
    maxScore: 100,
    cpaLevel: cpaLevel || 'Abstract (A)',
    feedback: feedback || 'Жақсы нәтиже! Сингапур әдістемесімен есепті еркін шешті.',
    feedbackEn: feedbackEn || feedback || 'Great work applying Singapore pedagogy!',
    date: new Date().toISOString().split('T')[0],
    assessmentType: assessmentType || 'БЖБ (Summative)',
    assessmentTypeEn: assessmentTypeEn || 'Summative (Unit)'
  };
  store.grades.unshift(newGrade);
  res.status(201).json(newGrade);
});

// AI Singapore Tutor Endpoint
app.post('/api/ai-tutor', async (req, res) => {
  try {
    const { prompt, subject, conversationHistory } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getGeminiClient();

    const systemInstruction = `Сіз Сингапур әдістемесімен оқитын 5-сынып (әсіресе 5 «Ғ» және 5 «А») оқушыларына арналған жеке ЖИ тәлімгерісіз (Singapore Math & English AI Companion). Орта буын оқушысы Қайратқызы Жансая және оның сыныптастары сізбен математика мен ағылшын тілін үйренеді.
Сіздің басты мақсатыңыз:
1. Математиканы Сингапур CPA әдісімен (Concrete -> Pictorial / Bar Model -> Abstract) түсіндіру. Оқушыға дайын жауапты бірден бермей, Bar Model моделін (блоктарды) қалай сызу керектігін қадамдап бағыттау.
2. Ағылшын тілін (English for Singapore Math & Communication) үйрету, "unit", "comparison bar model", "reasoning", "solution" сөздерін дұрыс қолдануға баулу.
3. Қазақша немесе ағылшынша (сұрақтың тіліне сай) достық, мейірімді, 5-сынып баласына сай тілмен жауап беру.
4. Қажет болса мысал есепті Bar Model блоктарымен сипаттап беріңіз.`;

    if (!ai) {
      // Graceful smart simulated Singapore response if API key is not configured
      const isMath = subject === 'math' || prompt.toLowerCase().includes('math') || prompt.toLowerCase().includes('есеп') || prompt.toLowerCase().includes('бөлшек') || prompt.toLowerCase().includes('bar') || prompt.toLowerCase().includes('стикер');
      let fallbackText = '';
      if (isMath) {
        fallbackText = `🌟 **Керемет сұрақ, 5 «Ғ» сыныбының оқушысы! Сингапур Bar Model әдісімен талдайық:**\n\n1. **Concrete (Заттық кезең):** Берілген шамаларды ойша түрлі-түсті блоктар түрінде елестетейік.\n2. **Pictorial (Bar Model сызбасы):**\n   ┌──────────────┐\n   │  1-бөлік (X) │  = Жансая (1 unit)\n   ├──────────────┼──────────────┼──────────────┐\n   │  1-бөлік (X) │  1-бөлік (X) │  1-бөлік (X) │  = Айсұлтан (3 units)\n   └──────────────┴──────────────┴──────────────┘\n3. **Abstract (Арифметикалық шешім):**\n   - Барлығы = 1 + 3 = 4 бірлік (units)\n   - Егер барлығы 120 стикер болса:\n     1 unit = 120 ÷ 4 = 30 стикер\n   - Жансаяда: 30 стикер\n   - Айсұлтанда: 30 × 3 = 90 стикер\n\n💡 *Сен үшін сұрақ:* Осы есептің тексеруін (30 + 90 = 120) ағылшын тілінде қалай айтар едің? Көмектесейін бе? 🚀`;
      } else {
        fallbackText = `Hello Grade 5 student! Great inquiry! 👏\n\nIn our Singapore bilingual classroom, let's practice this reasoning:\n- **Singapore Math Vocabulary:**\n  • **Bar Model:** Visual rectangle used to represent quantities.\n  • **Unit:** An equal portion of the whole.\n  • **Comparison:** Finding differences between two models.\n\n- **Sentence Pattern:** "We can find the unknown quantity by dividing the total into equal units."\n\nTry building your own sentence using one of these words! I am here to assist you! ✨`;
      }
      return res.json({ response: fallbackText, simulated: true });
    }

    // Build context with history
    let formattedPrompt = `[Пән: ${subject || 'Singapore Math / English'}]\n\nОқушы сұрағы: ${prompt}`;
    if (conversationHistory && Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      const historySummary = conversationHistory
        .slice(-4)
        .map((m: any) => `${m.role === 'user' ? 'Оқушы' : 'ЖИ Тәлімгер'}: ${m.text}`)
        .join('\n');
      formattedPrompt = `Алдыңғы сұхбат:\n${historySummary}\n\nЖаңа сұрақ: ${prompt}`;
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ response: response.text || 'Жауап дайындалды.' });
    } catch (genError: any) {
      console.warn('Gemini generateContent temporary error, returning fallback:', genError.message);
      const isMath = subject === 'math' || prompt.toLowerCase().includes('math') || prompt.toLowerCase().includes('есеп') || prompt.toLowerCase().includes('бөлшек') || prompt.toLowerCase().includes('bar');
      let fallbackText = '';
      if (isMath) {
        fallbackText = `🌟 **Сингапур Bar Model бойынша талдау:**\n\n1. **Model:** Есепті бірдей тіктөртбұрышты блоктарға (units) бөлеміз.\n2. **Units саны:** Жалпы мәнді блоктар санына бөліп, 1 unit мәнін табамыз.\n3. **Reasoning:** Шыққан мәнді есеп шартындағы сұрақпен салыстырамыз.\n\n💡 Барлығы қанша unit бар екенін санап көрдің бе? Бірге тексерейік! 🚀`;
      } else {
        fallbackText = `Hello Grade 5 student! 🌟\n\nLet's express your answer in English:\n- "First, I find the value of 1 unit."\n- "Then, I multiply by the number of units to find the total."\n\nKeep practicing your English math vocabulary! ✨`;
      }
      return res.json({ response: fallbackText, simulated: true });
    }
  } catch (error: any) {
    console.error('Error in /api/ai-tutor route:', error);
    res.status(500).json({ error: 'ЖИ жауабын өңдеу кезінде қате орын алды' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Singapore Academy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
