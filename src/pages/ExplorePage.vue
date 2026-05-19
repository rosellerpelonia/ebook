<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import MainLayout from '@/layouts/MainLayout.vue';
import { db } from '@/services/firestore';
import { getStorageImageUrl } from '@/services/storage';

type TopicId = 'brand-identity' | 'ai-workflow' | 'ethical-co-creation';

interface ExploreTopic {
  id: TopicId;
  title: string;
  kicker: string;
  iconKey: string;
  paragraphs: string[];
}

interface QuizQuestion {
  id: string;
  topicId: TopicId;
  order: number;
  question: string;
  options: string[];
  answer: string;
}

interface TutorialStep {
  title: string;
  description: string;
}

interface TutorialSample {
  title: string;
  beforeKey: string;
  afterKey: string;
}

interface TutorialSection {
  id: string;
  kicker: string;
  title: string;
  videoKey?: string;
  guideTitle?: string;
  steps?: TutorialStep[];
  samples?: TutorialSample[];
}

interface ImagePreview {
  src: string;
  title: string;
  label: string;
}

const moduleIconPaths: Record<string, string> = {
  brandIdentity: 'Theoretical_Foundation_of_Brand_Identity_and_Strategic_Positioning.png',
  aiWorkflow: 'AI_Workflow_and_Semantic_Collaboration.png',
  ethicalCoCreation: 'Case_Studies_and_Ethical_Co-Creation.png',
  quiz: 'quiz.png',
};

const moduleIconUrls = reactive<Record<string, string>>({});
const moduleIconErrors = ref<string[]>([]);

const topics: ExploreTopic[] = [
  {
    id: 'brand-identity',
    kicker: 'Theoretical Foundation',
    title: 'Theoretical Foundation of Brand Identity and Strategic Positioning',
    iconKey: 'brandIdentity',
    paragraphs: [
      'Brand identity is far more than just a logo, it represents the personality, values, and emotions of a brand. While AI can generate complex visuals in seconds, it fundamentally lacks <span class="highlight-term">Intentionality</span>, the profound "why" behind the art. Strategic positioning is the process of carving out a unique space in the audience’s mind. This requires <span class="highlight-term">Empathy</span>, a uniquely human ability to share the feelings of a target market, which remains the definitive boundary between robotic output and soulful branding.',

      'According to <span class="highlight-researcher">Mazzone & Elgammal (2019)</span>, while AI can simulate a wide array of artistic styles through style transfer, the human creator remains the sole provider of intentionality or the true message. The <span class="highlight-term">Human Voice</span> serves as the authoritative source of meaning amidst algorithms. Furthermore, <span class="highlight-researcher">Margaret Boden (2004)</span>, in her theory of creativity, notes that AI excels at combinational creativity, but only humans possess the capacity for transformational creativity, the ability to break and remake the rules of art to create something with lasting cultural significance.',

      'In the realm of marketing, research by <span class="highlight-researcher">Heding et al. (2020)</span> on the <span class="highlight-case">Brand Identity Trajectory</span> confirms that a successful brand must possess an inner core or soul. This soul is derived from lived human experience rather than statistical probability. AI serves as a mirror of historical data, but the human designer shapes the future by determining which design truly aligns with a brand’s higher purpose and evolving identity.',
    ],
  },
  {
    id: 'ai-workflow',
    kicker: 'Semantic Collaboration',
    title: 'AI Workflow and Semantic Collaboration',
    iconKey: 'aiWorkflow',
    paragraphs: [
      'In a modern creative workflow, AI acts as a support tool by rapidly generating ideas and variations. However, for a brand to remain authentic, the process must begin and end with human intervention. The artist acts as a <span class="highlight-term">Semantic Filter</span>, choosing only the AI outputs that resonate with human experience and cultural nuance. This <span class="highlight-term">Augmented Creativity</span> speeds up experimentation while keeping the designer in total control of the narrative.',

      '<span class="highlight-researcher">Anantrasirichai & Bull (2022)</span> emphasize that in the process of co-creation, humans provide the semantics or meaning to the raw data produced by AI. In this light, AI is an extension of the artist’s hand, much like a digital brush, but with higher computational power. According to <span class="highlight-researcher">Lubart’s (2005)</span> study on <span class="highlight-case">Human-Computer Interaction</span>, creativity is an iterative process. For every iteration an AI produces, a human must evaluate it against emotional and social standards.',

      'Without this human filter, AI output remains noise without context. The true value of design emerges only when a human decides that a specific color palette or shape is right for the specific emotion being communicated to the audience.',
    ],
  },
  {
    id: 'ethical-co-creation',
    kicker: 'Case Studies and Ethics',
    title: 'Case Studies and Ethical Co-Creation',
    iconKey: 'ethicalCoCreation',
    paragraphs: [
      'The use of <span class="highlight-case">case studies</span> and thorough documentation, such as screen recordings and version histories, serves as <span class="highlight-term">Proof of Process</span>. This documentation proves that the final design underwent thoughtful human refinement and was not a mere one-click generation.',

      'Regarding ethics, designers bear the responsibility of ensuring that AI is not used to plagiarize existing works or propagate misleading content fueled by <span class="highlight-term">Algorithmic Bias</span>. Ethical Co-Creation requires a high degree of accountability. According to the journal <span class="highlight-researcher">Ethics and Information Technology</span>, the artist is responsible for ensuring the output is authentic and does not infringe upon the voices of other creators.',

      'Furthermore, <span class="highlight-researcher">Jobin et al. (2019)</span>, in their analysis of the global landscape of AI ethics guidelines, argue that <span class="highlight-term">non-maleficence</span> and <span class="highlight-term">justice</span> must be integrated into creative workflows. This means designers must be vigilant against biases that AI might have learned from flawed datasets. Being an ethical co-creator means using technology to elevate communication while remaining committed to truth and originality.',
    ],
  },
];

const tutorialMediaPaths: Record<string, string> = {
  tutorial1: 'tutorial1.mp4',
  tutorial2: 'tutorial2.mp4',
  tutorial3: 'tutorial3.mp4',
  tutorial4: 'tutorial4.mp4',

  bokehBefore: '1_BEFORE.JPG',
  bokehAfter: '1_AFTER.jpg',

  starsBefore: '1_moon1.jpg',
  starsAfter: '1_moon2ai.jpg',

  beachBefore: '1_beach1.jpg',
  beachAfter: '1_beach2ai.jpg',

  cloudsBefore: '1_boat1.jpg',
  cloudsAfter: '1_boat2ai.jpg',

  spillsBefore: '2_BEFORE.JPG',
  spillsAfter: '2_AFTER.jpg',

  peopleBefore: '2_shoot1.jpg',
  peopleAfter: '2_shoot2 ai.jpg',

  billboardBefore: '2_animal1.jpg',
  billboardAfter: '2_animal2ai.jpg',

  dirtBefore: '2_poor2ai.jpg',
  dirtAfter: '2_poor1.jpg',

  patternBefore: '3_BEFORE.jpg',
  patternAfter: '3_AFTER.jpg',

  coupleBefore: '3_heart1.jpg',
  coupleAfter: '3_heart2ai.jpg',

  relativesBefore: '3_graduare1.jpg',
  relativesAfter: '3_graduate2ai.jpg',

  churchBefore: '3_church1.jpg',
  churchAfter: '3_church2ai.jpg',

  harmonizeOneBefore: '4_harmonize before4.png',
  harmonizeOneAfter: '4_harmonize_after4.png',

  harmonizeTwoBefore: '4_harmonize before2.png',
  harmonizeTwoAfter: '4_harmonize_after2.png',

  harmonizeThreeBefore: '4_harmonize_before3.png',
  harmonizeThreeAfter: '4_harmonize_after3.png',

  harmonizeFourBefore: '4_harmonize_before5.png',
  harmonizeFourAfter: '4_harmonize_after5.png',
};

const tutorialMediaUrls = reactive<Record<string, string>>({});
const isLoadingTutorialMedia = ref(true);
const tutorialMediaErrors = ref<string[]>([]);
const selectedImagePreview = ref<ImagePreview | null>(null);

const tutorialSections: TutorialSection[] = [
  {
    id: 'tutorial-1',
    kicker: 'Tutorial 1',
    title: 'Adding Realistic Subjects Using Photoshop AI',
    videoKey: 'tutorial1',
  },
  {
    id: 'generative-fill',
    kicker: 'Photoshop AI Workflow',
    title: 'How to Use Photoshop AI Generative Fill',
    guideTitle: 'Step-by-Step Guide',
    steps: [
      {
        title: 'Step 1 - Select the Area',
        description:
          'Use any selection tool in Adobe Photoshop to highlight the object or area where you want to apply AI enhancement.',
      },
      {
        title: 'Step 2 - Enter Your Prompt',
        description:
          'Type a clear description of what you want to add or generate. Example: “Add goggles”, “Create realistic ball”, or “Add a camping chair”.',
      },
      {
        title: 'Step 3 - Click Generative Fill',
        description:
          'Press the Generative Fill button and let Photoshop AI generate the enhancement automatically.',
      },
      {
        title: 'Step 4 - Choose Your Preferred Result',
        description:
          'Photoshop will generate three or more variations based on your prompt. Browse the generated designs and select the version that best matches your project.',
      },
      {
        title: 'Step 5 - Refine if Needed',
        description:
          'You can regenerate more variations or adjust your selection and prompt for better results.',
      },
    ],
    samples: [
      {
        title: 'Bokeh Lights',
        beforeKey: 'bokehBefore',
        afterKey: 'bokehAfter',
      },
      {
        title: 'Stars',
        beforeKey: 'starsBefore',
        afterKey: 'starsAfter',
      },
      {
        title: 'Human Body and Beach Sand',
        beforeKey: 'beachBefore',
        afterKey: 'beachAfter',
      },
      {
        title: 'Clouds and Soil',
        beforeKey: 'cloudsBefore',
        afterKey: 'cloudsAfter',
      },
    ],
  },
  {
    id: 'tutorial-2',
    kicker: 'Tutorial 2',
    title: 'AI Object Replacement',
    videoKey: 'tutorial2',
    guideTitle: 'How to Replace an Object Using Generative Fill',
    steps: [
      {
        title: 'Step 1 - Select the Object',
        description:
          'Use any selection tool in Adobe Photoshop to highlight the object you want to replace.',
      },
      {
        title: 'Step 2 - Open Generative Fill',
        description:
          'After selecting the object, click the Generative Fill option from the contextual task bar.',
      },
      {
        title: 'Step 3 - Enter Your Prompt',
        description: 'Type your replacement prompt. Example: “blue water”.',
      },
      {
        title: 'Step 4 - Generate the Replacement',
        description:
          'Click Generate and let Photoshop AI create new versions based on your prompt.',
      },
      {
        title: 'Step 5 - Choose the Best Result',
        description:
          'Photoshop will provide three or more generated variations. Select the version that fits your image best.',
      },
      {
        title: 'Step 6 - Refine if Needed',
        description:
          'If the result is not perfect, try adjusting the selection area, using a more detailed prompt, or generating additional variations.',
      },
    ],
    samples: [
      {
        title: 'Spills Removed',
        beforeKey: 'spillsBefore',
        afterKey: 'spillsAfter',
      },
      {
        title: 'People Removed',
        beforeKey: 'peopleBefore',
        afterKey: 'peopleAfter',
      },
      {
        title: 'Small Billboard and Lights Removed, Added Smoke',
        beforeKey: 'billboardBefore',
        afterKey: 'billboardAfter',
      },
      {
        title: 'Dirts Lessen',
        beforeKey: 'dirtBefore',
        afterKey: 'dirtAfter',
      },
    ],
  },
  {
    id: 'tutorial-3',
    kicker: 'Tutorial 3',
    title: 'Adobe Photoshop Generative Expand',
    videoKey: 'tutorial3',
    guideTitle: 'Photoshop Generative Expand Workflow',
    steps: [
      {
        title: 'Step 1 - Select the Subject',
        description:
          'Use a selection tool to highlight the subject you want to enhance.',
      },
      {
        title: 'Step 2 - Expand the Canvas',
        description:
          'Drag the image borders outward using the Crop Tool to add empty space.',
      },
      {
        title: 'Step 3 - Use AI Generative Expand',
        description: 'Click Generative Expand from the task bar.',
      },
      {
        title: 'Step 4 - Enter a Prompt',
        description:
          'Type how you want the background extended. Example: “extend the sky and mountains”.',
      },
      {
        title: 'Step 5 - Generate the Image',
        description:
          'Click Generate and let Photoshop AI enhance and extend the background.',
      },
      {
        title: 'Step 6 - Choose the Best Version',
        description: 'Select the AI-generated result that looks best.',
      },
    ],
    samples: [
      {
        title: 'Expanded Design Pattern',
        beforeKey: 'patternBefore',
        afterKey: 'patternAfter',
      },
      {
        title: 'Expanded Picture of Couple',
        beforeKey: 'coupleBefore',
        afterKey: 'coupleAfter',
      },
      {
        title: 'Expanded Picture of Relatives',
        beforeKey: 'relativesBefore',
        afterKey: 'relativesAfter',
      },
      {
        title: 'Expanded Church',
        beforeKey: 'churchBefore',
        afterKey: 'churchAfter',
      },
    ],
  },
  {
    id: 'tutorial-4',
    kicker: 'Tutorial 4',
    title: 'Lighting & Color Harmonization AI',
    videoKey: 'tutorial4',
    guideTitle: 'Easy Guide to Photoshop Harmonize Tool',
    steps: [
      {
        title: 'Step 1 - Select the Subject',
        description:
          'Use a selection tool to highlight the object or subject you want to blend.',
      },
      {
        title: 'Step 2 - Open Harmonize',
        description: 'Click Harmonize from the contextual task bar.',
      },
      {
        title: 'Step 3 - Apply AI Enhancement',
        description:
          'No prompt needed. Just click Harmonize and Photoshop AI will automatically match the lighting, color, and tone.',
      },
      {
        title: 'Step 4 - Choose the Best Result',
        description: 'Select the version that blends naturally with the background.',
      },
    ],
    samples: [
      {
        title: 'Harmonize Sample 1',
        beforeKey: 'harmonizeOneBefore',
        afterKey: 'harmonizeOneAfter',
      },
      {
        title: 'Harmonize Sample 2',
        beforeKey: 'harmonizeTwoBefore',
        afterKey: 'harmonizeTwoAfter',
      },
      {
        title: 'Harmonize Sample 3',
        beforeKey: 'harmonizeThreeBefore',
        afterKey: 'harmonizeThreeAfter',
      },
      {
        title: 'Harmonize Sample 4',
        beforeKey: 'harmonizeFourBefore',
        afterKey: 'harmonizeFourAfter',
      },
    ],
  },
];

const quizQuestions = ref<QuizQuestion[]>([]);
const selectedAnswers = reactive<Record<string, string>>({});
const isLoadingQuiz = ref(true);
const quizError = ref('');

const startedQuizTopics = reactive<Record<TopicId, boolean>>({
  'brand-identity': false,
  'ai-workflow': false,
  'ethical-co-creation': false,
});

const finishedQuizTopics = reactive<Record<TopicId, boolean>>({
  'brand-identity': false,
  'ai-workflow': false,
  'ethical-co-creation': false,
});

const activeQuestionIndex = reactive<Record<TopicId, number>>({
  'brand-identity': 0,
  'ai-workflow': 0,
  'ethical-co-creation': 0,
});

async function loadModuleIcons() {
  moduleIconErrors.value = [];

  const loaders = Object.entries(moduleIconPaths).map(async ([key, path]) => {
    try {
      moduleIconUrls[key] = await getStorageImageUrl(path);
    } catch (error) {
      console.error(`Failed to load module icon: ${path}`, error);
      moduleIconErrors.value.push(path);
    }
  });

  await Promise.all(loaders);
}

onMounted(() => {
  loadExploreQuizQuestions();
  loadTutorialMedia();
  loadModuleIcons();
});


async function loadTutorialMedia() {
  isLoadingTutorialMedia.value = true;
  tutorialMediaErrors.value = [];

  const loaders = Object.entries(tutorialMediaPaths).map(async ([key, path]) => {
    try {
      tutorialMediaUrls[key] = await getStorageImageUrl(path);
    } catch (error) {
      console.error(`Failed to load tutorial media: ${path}`, error);
      tutorialMediaErrors.value.push(path);
    }
  });

  await Promise.all(loaders);
  isLoadingTutorialMedia.value = false;
}

async function loadExploreQuizQuestions() {
  isLoadingQuiz.value = true;
  quizError.value = '';

  try {
    const snapshot = await getDocs(collection(db, 'explore_quiz_questions'));

    quizQuestions.value = snapshot.docs
      .map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          topicId: data.topicId,
          order: Number(data.order ?? 0),
          question: String(data.question ?? ''),
          options: Array.isArray(data.options) ? data.options : [],
          answer: String(data.answer ?? ''),
        } as QuizQuestion;
      })
      .filter((item) => item.topicId && item.question && item.options.length && item.answer)
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Failed to load explore quiz questions:', error);
    quizError.value = 'Unable to load quiz questions right now.';
  } finally {
    isLoadingQuiz.value = false;
  }
}

function getTopicQuestions(topicId: TopicId) {
  return quizQuestions.value.filter((question) => question.topicId === topicId);
}

function startQuiz(topicId: TopicId) {
  startedQuizTopics[topicId] = true;
  finishedQuizTopics[topicId] = false;
  activeQuestionIndex[topicId] = 0;
}

function restartQuiz(topicId: TopicId) {
  getTopicQuestions(topicId).forEach((question) => {
    delete selectedAnswers[question.id];
  });

  startedQuizTopics[topicId] = false;
  finishedQuizTopics[topicId] = false;
  activeQuestionIndex[topicId] = 0;
}

function getActiveQuestion(topicId: TopicId) {
  return getTopicQuestions(topicId)[activeQuestionIndex[topicId]];
}

function goToNextQuestion(topicId: TopicId) {
  const questions = getTopicQuestions(topicId);

  if (activeQuestionIndex[topicId] < questions.length - 1) {
    activeQuestionIndex[topicId] += 1;
    return;
  }

  finishedQuizTopics[topicId] = true;
}

function goToPreviousQuestion(topicId: TopicId) {
  if (activeQuestionIndex[topicId] > 0) {
    activeQuestionIndex[topicId] -= 1;
  }
}

function getTopicCorrectCount(topicId: TopicId) {
  return getTopicQuestions(topicId).filter(
    (question) => selectedAnswers[question.id] === question.answer
  ).length;
}

function getQuizResultTitle(topicId: TopicId) {
  return getTopicCorrectCount(topicId) === getTopicQuestions(topicId).length
    ? 'Excellent Work'
    : 'Quiz Completed';
}

function getQuizResultMessage(topicId: TopicId) {
  return getTopicCorrectCount(topicId) === getTopicQuestions(topicId).length
    ? 'Great job! You understood this topic very well.'
    : 'Review the topic section above, then retake the quiz to improve your score.';
}

function getQuizProgressWidth(topicId: TopicId) {
  const questions = getTopicQuestions(topicId);

  if (!questions.length) {
    return '0%';
  }

  return `${((activeQuestionIndex[topicId] + 1) / questions.length) * 100}%`;
}

function selectAnswer(questionId: string, option: string) {
  selectedAnswers[questionId] = option;
}

function isCorrect(question: QuizQuestion) {
  return selectedAnswers[question.id] === question.answer;
}

function openImagePreview(src: string, title: string, label: string) {
  selectedImagePreview.value = {
    src,
    title,
    label,
  };
}

function closeImagePreview() {
  selectedImagePreview.value = null;
}


</script>

<template>
  <MainLayout>
    <section class="explore-page">
      <div class="explore-page__inner">
        <section id="co-creation" class="co-creation scroll-mt-28">
          <section class="page-hero">
            <p class="section-kicker">Explore Module</p>
            <h1 class="hero-title">What Is Co-Creation?</h1>
          </section>

          <section class="content-section">
            <div class="text-box premium-card">
              <p class="body-text">
                To cocreate is to <strong>create something together</strong>, resulting in something that neither
                could easily be created alone. In this context, <strong>co-creation with AI</strong> describes
                the collaborative process in which artists, with the assistance of AI, work together to develop
                <strong>ideas, content, and solutions</strong>.
              </p>
            </div>

            <div class="content-grid">
              <div class="learning-header premium-card">
                <p class="body-text">
                  <strong>Artists provide the core elements of creativity, such as:</strong>
                </p>
              </div>

              <div class="learning-card premium-card">
                <p class="body-text"><strong>Vision</strong> – the main idea or concept of the project</p>
              </div>

              <div class="learning-card premium-card">
                <p class="body-text"><strong>Theme</strong> – personal style and aesthetic judgment</p>
              </div>

              <div class="learning-card premium-card">
                <p class="body-text"><strong>Direction</strong> – guiding the project toward a goal</p>
              </div>

              <div class="learning-card premium-card">
                <p class="body-text">
                  <strong>Meaning</strong> – giving the work emotional, cultural, or symbolic value
                </p>
              </div>

              <div class="learning-header premium-card">
                <p class="body-text">
                  <strong>While AI supports the process by providing:</strong>
                </p>
              </div>

              <div class="learning-card premium-card">
                <p class="body-text"><strong>Suggestions</strong> – offering possible ideas or concepts</p>
              </div>

              <div class="learning-card premium-card">
                <p class="body-text">
                  <strong>Variations</strong> – generating multiple versions of a prompt
                </p>
              </div>

              <div class="learning-card premium-card">
                <p class="body-text">
                  <strong>Speed</strong> – quickly producing concepts and references that would take artists longer
                </p>
              </div>

              <div class="learning-card premium-card">
                <p class="body-text">
                  <strong>Exploration</strong> – helping creators test different combinations and possibilities
                </p>
              </div>
            </div>
          </section>
        </section>

        <section v-for="topic in topics" :id="topic.id" :key="topic.id" class="topic-section scroll-mt-28">
          <div class="topic-card premium-card">
            <div class="topic-heading-row">
              <div v-if="moduleIconUrls[topic.iconKey]" class="topic-icon-shell">
                <img :src="moduleIconUrls[topic.iconKey]" :alt="`${topic.title} icon`" class="topic-icon" />
              </div>

              <div class="topic-heading-copy">
                <p class="section-kicker">{{ topic.kicker }}</p>
                <h2 class="topic-title">{{ topic.title }}</h2>
              </div>
            </div>

            <div class="topic-copy">
              <p v-for="paragraph in topic.paragraphs" :key="paragraph" class="body-text" v-html="paragraph" />
            </div>
          </div>

          <div class="quiz-panel">
            <div class="quiz-header">
              <div class="quiz-heading-row">
                <div v-if="moduleIconUrls.quiz" class="quiz-icon-shell">
                  <img :src="moduleIconUrls.quiz" alt="Quiz icon" class="quiz-icon" />
                </div>

                <div>
                  <p class="section-kicker section-kicker--dark">check your knowledge</p>
                  <h3 class="quiz-title">
                    {{ topic.title }} Quiz
                  </h3>
                </div>
              </div>

              <div v-if="startedQuizTopics[topic.id] && !finishedQuizTopics[topic.id]" class="quiz-score">
                {{ getTopicCorrectCount(topic.id) }} / {{ getTopicQuestions(topic.id).length }}
              </div>
            </div>

            <div v-if="isLoadingQuiz" class="quiz-status">
              Loading quiz questions...
            </div>

            <div v-else-if="quizError" class="quiz-status quiz-status--error">
              {{ quizError }}
            </div>

            <div v-else-if="getTopicQuestions(topic.id).length === 0" class="quiz-status">
              No quiz questions added yet.
            </div>

            <div v-else class="quiz-slider">
              <div v-if="!startedQuizTopics[topic.id]" class="quiz-start-card">
                <p class="quiz-start-kicker">Ready to test your knowledge?</p>

                <h4 class="quiz-start-title">
                  {{ topic.title }} Quiz
                </h4>

                <p class="quiz-start-description">
                  Answer each question one at a time. Click start when you are ready.
                </p>

                <button type="button" class="quiz-start-button" @click="startQuiz(topic.id)">
                  Start Quiz
                </button>
              </div>

              <div v-else-if="finishedQuizTopics[topic.id]" class="quiz-result-card">
                <p class="quiz-start-kicker">
                  {{ getQuizResultTitle(topic.id) }}
                </p>

                <h4 class="quiz-start-title">
                  Your Score: {{ getTopicCorrectCount(topic.id) }} / {{ getTopicQuestions(topic.id).length }}
                </h4>

                <p class="quiz-start-description">
                  {{ getQuizResultMessage(topic.id) }}
                </p>

                <button type="button" class="quiz-start-button" @click="restartQuiz(topic.id)">
                  Retake Quiz
                </button>
              </div>

              <article v-else-if="getActiveQuestion(topic.id)" class="quiz-card quiz-card--single">
                <div class="quiz-progress-row">
                  <span class="quiz-progress-pill">
                    Question {{ activeQuestionIndex[topic.id] + 1 }} of {{ getTopicQuestions(topic.id).length }}
                  </span>

                  <span class="quiz-progress-pill quiz-progress-pill--score">
                    {{ getTopicCorrectCount(topic.id) }} correct
                  </span>
                </div>

                <div class="quiz-progress-track">
                  <div class="quiz-progress-fill" :style="{ width: getQuizProgressWidth(topic.id) }" />
                </div>

                <p class="quiz-question">
                  {{ getActiveQuestion(topic.id).order }}. {{ getActiveQuestion(topic.id).question }}
                </p>

                <div class="quiz-options">
                  <button v-for="option in getActiveQuestion(topic.id).options" :key="option" type="button"
                    class="quiz-option" :class="{
                      'quiz-option--selected': selectedAnswers[getActiveQuestion(topic.id).id] === option,
                      'quiz-option--correct':
                        selectedAnswers[getActiveQuestion(topic.id).id] === option &&
                        option === getActiveQuestion(topic.id).answer,
                      'quiz-option--wrong':
                        selectedAnswers[getActiveQuestion(topic.id).id] === option &&
                        option !== getActiveQuestion(topic.id).answer,
                    }" @click="selectAnswer(getActiveQuestion(topic.id).id, option)">
                    {{ option }}
                  </button>
                </div>

                <p v-if="selectedAnswers[getActiveQuestion(topic.id).id]" class="quiz-feedback"
                  :class="{ 'quiz-feedback--correct': isCorrect(getActiveQuestion(topic.id)) }">
                  {{
                    isCorrect(getActiveQuestion(topic.id))
                      ? 'Correct answer.'
                      : `Correct answer: ${getActiveQuestion(topic.id).answer}`
                  }}
                </p>

                <div class="quiz-navigation">
                  <button type="button" class="quiz-nav-button quiz-nav-button--secondary"
                    :disabled="activeQuestionIndex[topic.id] === 0" @click="goToPreviousQuestion(topic.id)">
                    Previous
                  </button>

                  <button type="button" class="quiz-nav-button"
                    :disabled="!selectedAnswers[getActiveQuestion(topic.id).id]" @click="goToNextQuestion(topic.id)">
                    {{
                      activeQuestionIndex[topic.id] === getTopicQuestions(topic.id).length - 1
                        ? 'Finish Quiz'
                        : 'Next Question'
                    }}
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="photoshop-ai-tutorials" class="tutorial-master-section scroll-mt-28">
          <div class="topic-card tutorial-master-card premium-card">
            <p class="section-kicker">Master Tutorials</p>

            <h2 class="topic-title">Master Photoshop AI Tutorials</h2>

            <div class="topic-copy">
              <p class="body-text">
                Unlock the power of AI inside Adobe Photoshop through step-by-step tutorials designed for creators,
                photographers, designers, and beginners. Our tutorials use original video lessons, real editing
                workflows, and exclusive before-and-after sample images so you can learn exactly how professional
                AI retouching and enhancement works.
              </p>

              <p class="tutorial-tagline">
                Watch. Learn. Edit. Create.
              </p>
            </div>
          </div>
        </section>

        <section v-for="tutorial in tutorialSections" :id="tutorial.id" :key="tutorial.id"
          class="tutorial-section scroll-mt-28">
          <div class="tutorial-card">
            <div class="tutorial-heading">
              <p class="section-kicker">{{ tutorial.kicker }}</p>
              <h2 class="topic-title tutorial-title">{{ tutorial.title }}</h2>
            </div>

            <div v-if="tutorial.videoKey" class="video-shell">
              <div v-if="isLoadingTutorialMedia" class="media-placeholder">
                Loading tutorial video...
              </div>

              <video v-else-if="tutorialMediaUrls[tutorial.videoKey]" class="tutorial-video" controls playsinline
                preload="metadata">
                <source :src="tutorialMediaUrls[tutorial.videoKey]" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div v-else class="media-placeholder">
                Video unavailable.
              </div>
            </div>

            <div v-if="tutorial.guideTitle || tutorial.steps?.length" class="guide-box">
              <h3 v-if="tutorial.guideTitle" class="guide-title">
                {{ tutorial.guideTitle }}
              </h3>

              <div v-if="tutorial.steps?.length" class="steps-list">
                <article v-for="step in tutorial.steps" :key="step.title" class="step-card">
                  <h4 class="step-title">{{ step.title }}</h4>
                  <p class="body-text step-description">{{ step.description }}</p>
                </article>
              </div>
            </div>

            <div v-if="tutorial.samples?.length" class="samples-section">
              <div class="samples-header">
                <p class="section-kicker section-kicker--dark">Before & After</p>
                <h3 class="guide-title">Other Samples</h3>
              </div>

              <div class="sample-list">
                <article v-for="sample in tutorial.samples" :key="sample.title" class="sample-card">
                  <h4 class="sample-title">{{ sample.title }}</h4>

                  <div class="before-after-grid">
                    <div class="comparison-image-card">
                      <p class="comparison-label">Before</p>

                      <button v-if="tutorialMediaUrls[sample.beforeKey]" type="button" class="comparison-image-button"
                        @click="openImagePreview(tutorialMediaUrls[sample.beforeKey], sample.title, 'Before')">
                        <img :src="tutorialMediaUrls[sample.beforeKey]" :alt="`${sample.title} before`"
                          class="comparison-image" />

                        <span class="image-view-badge">Click to view</span>
                      </button>

                      <div v-else class="image-fallback">
                        Before image unavailable.
                      </div>
                    </div>

                    <div class="comparison-image-card">
                      <p class="comparison-label">After</p>

                      <button v-if="tutorialMediaUrls[sample.afterKey]" type="button" class="comparison-image-button"
                        @click="openImagePreview(tutorialMediaUrls[sample.afterKey], sample.title, 'After')">
                        <img :src="tutorialMediaUrls[sample.afterKey]" :alt="`${sample.title} after`"
                          class="comparison-image" />

                        <span class="image-view-badge">Click to view</span>
                      </button>

                      <div v-else class="image-fallback">
                        After image unavailable.
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <div v-if="tutorialMediaErrors.length" class="media-error-note">
              Some tutorial media could not be loaded. Please check the Firebase Storage filenames.
            </div>
          </div>
        </section>
      </div>

      <Teleport to="body">
        <div v-if="selectedImagePreview" class="image-preview-overlay" role="dialog" aria-modal="true"
          @click.self="closeImagePreview">
          <div class="image-preview-shell">
            <div class="image-preview-header">
              <div>
                <p class="image-preview-label">{{ selectedImagePreview.label }}</p>
                <h3 class="image-preview-title">{{ selectedImagePreview.title }}</h3>
              </div>

              <button type="button" class="image-preview-close" @click="closeImagePreview">
                ×
              </button>
            </div>

            <img :src="selectedImagePreview.src" :alt="`${selectedImagePreview.title} ${selectedImagePreview.label}`"
              class="image-preview-img" />
          </div>
        </div>
      </Teleport>
    </section>
  </MainLayout>
</template>

<style scoped>
.explore-page {
  min-height: 100vh;
  overflow: hidden;
}

.explore-page__inner {
  width: min(100% - 2rem, 1280px);
  margin: 0 auto;
  padding: clamp(2rem, 4vw, 3rem) 0 clamp(4rem, 8vw, 7rem);
}

.page-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}

.section-kicker {
  margin: 0;
  color: #ffffff;
  font-size: 0.95rem;
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.section-kicker--dark {
  color: #b36a00;
}

.hero-title {
  max-width: 900px;
  margin: 0 auto;
  color: #f2f2f2;
  font-size: clamp(2.8rem, 7vw, 6.4rem);
  font-family: 'Helvetica', serif;
  font-weight: 700;
  line-height: 0.92;
  text-align: center;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
}

.body-text {
  margin: 0;
  color: #111111;
  font-size: clamp(1.05rem, 1.15vw, 1.3rem);
  font-family: 'Gowun Batang', serif;
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: 0.01em;
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
}

.content-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.25rem, 2vw, 2rem);
  padding-top: clamp(2rem, 6vw, 3rem);
}

.premium-card {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.28), transparent 34%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.16), transparent 48%),
    rgba(255, 186, 47, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 28px;
  box-shadow:
    0 22px 60px rgba(8, 23, 36, 0.14),
    0 0 26px rgba(255, 186, 47, 0.12);
  backdrop-filter: blur(14px);
}

.text-box {
  width: 100%;
  max-width: 1000px;
  padding: clamp(1.5rem, 5vw, 3rem);
}

.content-grid {
  display: grid;
  width: 100%;
  max-width: 1000px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;
}

.learning-header,
.learning-card {
  padding: clamp(1.5rem, 4vw, 2.5rem);
}

.learning-header {
  grid-column: 1 / -1;
}

.learning-card {
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.learning-card:hover {
  transform: translateY(-6px);
  box-shadow:
    0 26px 66px rgba(8, 23, 36, 0.18),
    0 0 34px rgba(255, 186, 47, 0.2);
}

.topic-section,
.tutorial-master-section,
.tutorial-section {
  width: 100%;
  display: grid;
  gap: 1.5rem;
  padding-top: clamp(3rem, 7vw, 5rem);
}

.topic-heading-row {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2vw, 1.5rem);
  margin-bottom: 1.5rem;
}


.topic-heading-copy {
  min-width: 0;
  flex: 1;
}

.topic-icon-shell {
  width: clamp(72px, 7vw, 104px);
  height: clamp(72px, 7vw, 104px);
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 24px;
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.95), rgba(255, 250, 240, 0.72)),
    rgba(255, 255, 255, 0.58);
  border: 1px solid rgba(255, 255, 255, 0.68);
  box-shadow:
    0 16px 34px rgba(8, 23, 36, 0.12),
    inset 0 0 0 1px rgba(255, 255, 255, 0.38);
}

.topic-icon {
  width: 78%;
  height: 78%;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 10px 16px rgba(8, 23, 36, 0.16));
}

.topic-icon-shell {
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.topic-icon {
  transition:
    transform 0.25s ease,
    filter 0.25s ease;
}

.topic-card:hover .topic-icon-shell {
  transform: translateY(-3px) scale(1.03);
  box-shadow:
    0 20px 44px rgba(8, 23, 36, 0.16),
    0 0 22px rgba(255, 255, 255, 0.22),
    inset 0 0 0 1px rgba(255, 255, 255, 0.42);
}

.topic-card:hover .topic-icon {
  transform: scale(1.05);
  filter: drop-shadow(0 12px 18px rgba(8, 23, 36, 0.18));
}

.quiz-heading-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
}

.quiz-icon-shell {
  width: clamp(54px, 7vw, 76px);
  height: clamp(54px, 7vw, 76px);
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 22px;
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 186, 47, 0.24), transparent 48%),
    #fffaf0;
  border: 1px solid rgba(8, 23, 36, 0.08);
  box-shadow: 0 14px 30px rgba(8, 23, 36, 0.1);
}

.quiz-icon {
  width: 74%;
  height: 74%;
  object-fit: contain;
  display: block;
}

.topic-card {
  padding: clamp(1.5rem, 5vw, 3rem);
}

.topic-title {
  max-width: 1120px;
  margin: 0.35rem 0 0;
  color: #081724;
  font-size: clamp(1.9rem, 2.7vw, 2.65rem);
  font-family: 'Helvetica', serif;
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.035em;
}

.topic-heading-copy .section-kicker {
  margin-bottom: 0.45rem;
}

.topic-copy {
  display: grid;
  gap: 1.25rem;
  margin-top: 1.25rem;
}

.quiz-panel {
  padding: clamp(1.25rem, 4vw, 2rem);
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(255, 250, 240, 0.92));
  box-shadow:
    0 24px 70px rgba(8, 23, 36, 0.16),
    0 0 30px rgba(255, 186, 47, 0.08);
  backdrop-filter: blur(16px);
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.quiz-title {
  margin: 0.5rem 0 0;
  color: #081724;
  font-family: 'Rethink Sans', sans-serif;
  font-size: clamp(1.3rem, 2vw, 1.8rem);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.quiz-score {
  flex: 0 0 auto;
  border-radius: 999px;
  background: #081724;
  color: #ffba2f;
  padding: 0.6rem 1rem;
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 800;
  box-shadow: 0 10px 24px rgba(8, 23, 36, 0.18);
}

.quiz-status {
  border-radius: 18px;
  background: #fff6df;
  padding: 1rem;
  color: #081724;
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 700;
}

.quiz-status--error {
  background: #ffe4e4;
  color: #9f1239;
}

.quiz-list {
  display: grid;
  gap: 1rem;
}

.quiz-card {
  padding: clamp(1rem, 3vw, 1.5rem);
  border: 1px solid rgba(8, 23, 36, 0.08);
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 14px 34px rgba(8, 23, 36, 0.07);
}

.quiz-question {
  margin: 0 0 1rem;
  color: #081724;
  font-family: 'Rethink Sans', sans-serif;
  font-size: clamp(1rem, 1.15vw, 1.2rem);
  font-weight: 700;
  line-height: 1.6;
}

.quiz-options {
  display: grid;
  gap: 0.75rem;
}

.quiz-option {
  width: 100%;
  border: 1px solid rgba(8, 23, 36, 0.12);
  background: #fffaf0;
  color: #081724;
  border-radius: 16px;
  padding: 0.9rem 1rem;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.5;
  text-align: left;
  cursor: pointer;
  transition: 0.2s ease;
}

.quiz-option:hover {
  transform: translateY(-1px);
  border-color: #ffba2f;
  box-shadow: 0 10px 25px rgba(8, 23, 36, 0.08);
}

.quiz-option--selected {
  border-color: #081724;
  background: #081724;
  color: #ffffff;
}

.quiz-option--correct {
  border-color: #22c55e;
  background: #e8fceF;
  color: #14532d;
}

.quiz-option--wrong {
  border-color: #e11d48;
  background: #ffe4e6;
  color: #9f1239;
}

.quiz-feedback {
  margin: 0.9rem 0 0;
  color: #9f1239;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 800;
}

.quiz-feedback--correct {
  color: #15803d;
}

.tutorial-master-card {
  overflow: hidden;
}

.tutorial-tagline {
  margin: 0;
  color: #081724;
  font-family: 'Rethink Sans', sans-serif;
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.tutorial-card {
  width: 100%;
  padding: clamp(1.5rem, 5vw, 3rem);
  border: 1px solid rgba(255, 255, 255, 0.52);
  background:
    radial-gradient(circle at 12% 0%, rgba(255, 255, 255, 0.28), transparent 28%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent 42%),
    #ffba2f;
  border-radius: 32px;
  box-shadow:
    0 28px 78px rgba(8, 23, 36, 0.18),
    0 0 34px rgba(255, 186, 47, 0.14);
}

.tutorial-heading {
  max-width: 1040px;
}

.tutorial-title {
  max-width: 1080px;
}

.video-shell {
  width: 100%;
  margin-top: 1.5rem;
  overflow: hidden;
  border-radius: 28px;
  background: #081724;
  box-shadow:
    0 24px 64px rgba(8, 23, 36, 0.3),
    0 0 28px rgba(255, 186, 47, 0.18);
}

.tutorial-video {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
  background: #081724;
}

.media-placeholder,
.image-fallback {
  min-height: 220px;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(8, 23, 36, 0.94);
  color: #ffba2f;
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 700;
  text-align: center;
}

.guide-box {
  margin-top: 1.5rem;
  padding: clamp(1rem, 3vw, 1.5rem);
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.58);
  box-shadow: 0 18px 48px rgba(8, 23, 36, 0.08);
  backdrop-filter: blur(16px);
}

.guide-title {
  margin: 0 0 1rem;
  color: #081724;
  font-family: 'Rethink Sans', sans-serif;
  font-size: clamp(1.3rem, 2vw, 1.8rem);
  font-weight: 800;
  letter-spacing: 0.02em;
}

.steps-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.step-card {
  padding: 1rem;
  border-radius: 20px;
  background: #fffaf0;
  border: 1px solid rgba(8, 23, 36, 0.08);
  box-shadow: 0 10px 26px rgba(8, 23, 36, 0.06);
}

.step-title {
  margin: 0 0 0.35rem;
  color: #081724;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 1rem;
  font-weight: 800;
}

.step-description {
  text-align: left;
}

.samples-section {
  margin-top: 1.5rem;
}

.samples-header {
  margin-bottom: 1rem;
}

.sample-list {
  display: grid;
  gap: clamp(1.25rem, 3vw, 2rem);
}

.sample-card {
  padding: clamp(1rem, 3vw, 1.5rem);
  border-radius: 30px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 250, 240, 0.88));
  border: 1px solid rgba(255, 255, 255, 0.62);
  box-shadow: 0 22px 58px rgba(8, 23, 36, 0.12);
}

.sample-title {
  margin: 0 0 1rem;
  color: #081724;
  font-family: 'Rethink Sans', sans-serif;
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  font-weight: 800;
}

.before-after-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
  align-items: stretch;
}

.comparison-image-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 26px;
  background:
    radial-gradient(circle at top, rgba(255, 186, 47, 0.12), transparent 30%),
    #081724;
  box-shadow:
    0 20px 54px rgba(8, 23, 36, 0.18),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.comparison-label {
  margin: 0;
  padding: 0.85rem 1rem;
  background: rgba(8, 23, 36, 0.96);
  color: #ffba2f;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-align: center;
  text-transform: uppercase;
}

.comparison-image-button {
  position: relative;
  width: 100%;
  border: none;
  padding: 0;
  background: #0b1724;
  cursor: zoom-in;
  overflow: hidden;
}

.comparison-image-button::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, transparent 52%, rgba(8, 23, 36, 0.62)),
    radial-gradient(circle at center, rgba(255, 186, 47, 0.12), transparent 48%);
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}

.comparison-image-button:hover::after {
  opacity: 1;
}

.comparison-image-button:hover .comparison-image {
  transform: scale(1.025);
}

.comparison-image {
  width: 100%;
  height: clamp(320px, 34vw, 620px);
  display: block;
  object-fit: contain;
  background: #0b1724;
  transition: transform 0.3s ease;
}

.image-view-badge {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 2;
  border-radius: 999px;
  background: rgba(255, 186, 47, 0.95);
  color: #081724;
  padding: 0.55rem 0.85rem;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  box-shadow: 0 12px 28px rgba(8, 23, 36, 0.28);
}

.media-error-note {
  margin-top: 1rem;
  border-radius: 18px;
  background: rgba(255, 228, 230, 0.9);
  color: #9f1239;
  padding: 1rem;
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 700;
}

.quiz-slider {
  width: 100%;
}

.quiz-start-card,
.quiz-result-card {
  min-height: 280px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border-radius: 26px;
  overflow: hidden;
  background:
    radial-gradient(circle at center, rgba(255, 186, 47, 0.18), transparent 42%),
    #ffffff;
  border: 1px solid rgba(8, 23, 36, 0.08);
  box-shadow: 0 18px 46px rgba(8, 23, 36, 0.08);
}

.quiz-result-card::before {
  content: '✓';
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  margin: 0 auto 0.75rem;
  border-radius: 999px;
  background: #081724;
  color: #ffba2f;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  box-shadow: 0 14px 30px rgba(8, 23, 36, 0.18);
}

.quiz-start-kicker {
  margin: 0;
  color: #b36a00;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.quiz-start-title {
  margin: 0.75rem 0;
  color: #081724;
  font-family: 'Rethink Sans', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.5rem);
  font-weight: 900;
  line-height: 1.1;
}

.quiz-start-description {
  max-width: 560px;
  margin: 0 auto 1.5rem;
  color: rgba(8, 23, 36, 0.72);
  font-family: 'Rethink Sans', sans-serif;
  font-size: 1rem;
  line-height: 1.7;
}

.quiz-start-button,
.quiz-nav-button {
  border: none;
  border-radius: 999px;
  background: #081724;
  color: #ffba2f;
  padding: 0.9rem 1.4rem;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 900;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;
  box-shadow: 0 14px 30px rgba(8, 23, 36, 0.18);
}

.quiz-start-button:hover,
.quiz-nav-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 38px rgba(8, 23, 36, 0.22);
}

.quiz-card--single {
  min-height: 420px;
}

.quiz-progress-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.quiz-progress-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  background: #fff6df;
  color: #081724;
  padding: 0.5rem 0.85rem;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 900;
}

.quiz-progress-pill--score {
  background: #081724;
  color: #ffba2f;
}

.quiz-progress-track {
  width: 100%;
  height: 10px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(8, 23, 36, 0.1);
  margin-bottom: 1.25rem;
}

.quiz-progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ffba2f, #f4a900);
  transition: width 0.3s ease;
}

.quiz-navigation {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
}

.quiz-nav-button--secondary {
  background: #fff6df;
  color: #081724;
  border: 1px solid rgba(8, 23, 36, 0.12);
}

.quiz-nav-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.image-preview-overlay {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: grid;
  place-items: center;
  padding: clamp(1rem, 3vw, 2rem);
  background: rgba(3, 10, 18, 0.86);
  backdrop-filter: blur(16px);
}

.image-preview-shell {
  width: min(100%, 1280px);
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 30px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent),
    #081724;
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.45);
}

.image-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.image-preview-label {
  margin: 0 0 0.25rem;
  color: #ffba2f;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.image-preview-title {
  margin: 0;
  color: #ffffff;
  font-family: 'Rethink Sans', sans-serif;
  font-size: clamp(1rem, 2vw, 1.4rem);
  font-weight: 800;
}

.image-preview-close {
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.image-preview-close:hover {
  background: rgba(255, 186, 47, 0.95);
  color: #081724;
  transform: rotate(90deg);
}

.image-preview-img {
  width: 100%;
  max-height: calc(92vh - 86px);
  display: block;
  object-fit: contain;
  background: #050b12;
}

@media (max-width: 1024px) {

  .content-grid,
  .steps-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .before-after-grid {
    grid-template-columns: 1fr;
  }

  .comparison-image {
    height: auto;
    max-height: none;
  }

  .quiz-progress-row,
  .quiz-navigation {
    flex-direction: column;
  }

  .quiz-nav-button,
  .quiz-start-button {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .explore-page__inner {
    width: min(100% - 1.5rem, 1280px);
    padding-top: 1.5rem;
  }

  .content-grid,
  .steps-list,
  .before-after-grid {
    grid-template-columns: 1fr;
  }

  .hero-title,
  .topic-title {
    line-height: 1.05;
  }

  /* .body-text {
    text-align: left;
  } */

  .quiz-header {
    flex-direction: column;
  }

  .quiz-score {
    align-self: flex-start;
  }

  .topic-card,
  .tutorial-card,
  .sample-card,
  .guide-box,
  .quiz-panel {
    border-radius: 22px;
  }

  .comparison-image {
    height: auto;
    max-height: none;
    object-fit: contain;
  }

  .tutorial-video {
    aspect-ratio: 16 / 9;
  }

  .image-view-badge {
    right: 0.75rem;
    bottom: 0.75rem;
    font-size: 0.72rem;
  }

  .image-preview-shell {
    border-radius: 22px;
  }

  .image-preview-header {
    padding: 0.85rem;
  }

  .image-preview-close {
    width: 38px;
    height: 38px;
  }

  .topic-heading-row {
    align-items: flex-start;
    gap: 0.85rem;
    margin-bottom: 1.25rem;
  }

  .topic-icon-shell {
    width: 60px;
    height: 60px;
    border-radius: 18px;
  }

  .quiz-heading-row {
    align-items: center;
  }

  .quiz-icon-shell {
    width: 54px;
    height: 54px;
    border-radius: 18px;
  }

  .topic-title {
    font-size: clamp(1.35rem, 5vw, 2rem);
    line-height: 1.12;
    letter-spacing: -0.025em;
  }
}

:deep(.highlight-researcher) {
  color: #111111;
  background: transparent;
  padding: 0;
  border-radius: 0;
  font-weight: 900;
  box-shadow: none;
}

:deep(.highlight-case) {
  color: #111111;
  background: transparent;
  padding: 0;
  border-radius: 0;
  font-weight: 900;
}

/* :deep(.highlight-term) {
  color: #081724;
  font-weight: 900;
  text-decoration: underline;
  text-decoration-thickness: 0.1em;
  text-decoration-color: rgba(255, 255, 255, 0.8);
  text-underline-offset: 0.16em;
} */

@media (min-width: 1440px) {
  .explore-page__inner {
    width: min(100% - 4rem, 1440px);
  }

  .comparison-image {
    height: clamp(420px, 30vw, 680px);
  }

  .tutorial-video {
    max-height: 760px;
  }
}

@media (min-width: 1920px) {
  .explore-page__inner {
    width: min(100% - 6rem, 1680px);
  }

  .topic-title {
    max-width: 1200px;
  }

  .comparison-image {
    height: clamp(500px, 28vw, 760px);
  }

  .before-after-grid {
    gap: 2rem;
  }
}
</style>