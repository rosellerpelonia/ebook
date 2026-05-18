<script setup lang="ts">
import { ref } from 'vue';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import MainLayout from '@/layouts/MainLayout.vue';
import { db } from '@/services/firestore';

interface ExploreQuizSeed {
  topicId: string;
  order: number;
  question: string;
  options: string[];
  answer: string;
}

const saving = ref(false);
const message = ref('');
const messageType = ref<'success' | 'error' | ''>('');

const questions: ExploreQuizSeed[] = [
  {
    topicId: 'brand-identity',
    order: 1,
    question: 'What is the primary difference of the "Human Voice" in AI-assisted branding?',
    options: [
      'The speed of logo generation',
      'The strategic intent, emotion, and personal narrative behind the work',
      'The number of colors used',
      'The file resolution',
    ],
    answer: 'The strategic intent, emotion, and personal narrative behind the work',
  },
  {
    topicId: 'brand-identity',
    order: 2,
    question: 'According to Boden’s theory, what unique human ability does AI struggle to replicate?',
    options: [
      'Rapid pattern recognition',
      'Transformational creativity (breaking and remaking rules)',
      'Storing large datasets',
      'Generating 3D renders',
    ],
    answer: 'Transformational creativity (breaking and remaking rules)',
  },
  {
    topicId: 'brand-identity',
    order: 3,
    question: 'Why is "Empathy" essential in Strategic Positioning?',
    options: [
      'To finish the work faster',
      'To truly understand and share the feelings of the target audience',
      'To save money on professional designers',
      'To create a random layout',
    ],
    answer: 'To truly understand and share the feelings of the target audience',
  },
  {
    topicId: 'brand-identity',
    order: 4,
    question: 'In the context of branding, what does "Intentionality" signify?',
    options: [
      'Using expensive software',
      'The desire to express a specific message rather than generating based on probability',
      'Copying existing works',
      'Automatically generating layouts',
    ],
    answer: 'The desire to express a specific message rather than generating based on probability',
  },
  {
    topicId: 'ai-workflow',
    order: 1,
    question: 'Where does the creative process begin in a Human AI collaboration?',
    options: [
      'With a random AI prompt',
      'With human ideas, visions, and brand values',
      'With a final market evaluation',
      'With a suggestion from computer hardware',
    ],
    answer: 'With human ideas, visions, and brand values',
  },
  {
    topicId: 'ai-workflow',
    order: 2,
    question: 'What is the role of "Evaluation" after AI produces an output?',
    options: [
      'Let the computer choose the winner',
      'A human led process to adjust the design based on cultural and emotional standards',
      'To immediately publish the first result',
      'To delete all AI-generated work',
    ],
    answer: 'A human led process to adjust the design based on cultural and emotional standards',
  },
  {
    topicId: 'ai-workflow',
    order: 3,
    question: 'What is meant by a "Semantic Filter" in branding?',
    options: [
      'A type of photo filter in software',
      'The human selection of AI outputs that carry true meaning and resonance',
      'The speed of the internet connection',
      'An algorithm for color selection',
    ],
    answer: 'The human selection of AI outputs that carry true meaning and resonance',
  },
  {
    topicId: 'ai-workflow',
    order: 4,
    question: 'How does AI function as a "support tool" in the workflow?',
    options: [
      'By replacing the designer entirely',
      'By making all moral decisions',
      'By accelerating experimentation and creating visual possibilities',
      'By understanding cultural history without human help',
    ],
    answer: 'By accelerating experimentation and creating visual possibilities',
  },
  {
    topicId: 'ethical-co-creation',
    order: 1,
    question: 'How can a designer prove the transparency of their creative process?',
    options: [
      'By hiding their tools',
      'Through workflow documentation and screen recordings as "Proof of Process"',
      'By claiming AI did everything',
      'By not showing the final design to the client',
    ],
    answer: 'Through workflow documentation and screen recordings as "Proof of Process"',
  },
  {
    topicId: 'ethical-co-creation',
    order: 2,
    question: 'What is the main focus of "Ethical Co creation"?',
    options: [
      'Using AI to copy famous works',
      'Balancing innovation with responsible communication',
      'Removing human emotion from branding',
      'Prioritizing speed over authenticity',
    ],
    answer: 'Balancing innovation with responsible communication',
  },
  {
    topicId: 'ethical-co-creation',
    order: 3,
    question: 'What is "Algorithmic Bias" that should be avoided in branding?',
    options: [
      'The computer’s favorite color',
      'The tendency of AI to repeat existing patterns instead of creating something new',
      'The price of an AI subscription',
      'The brand of the computer used',
    ],
    answer: 'The tendency of AI to repeat existing patterns instead of creating something new',
  },
];

async function questionAlreadyExists(question: string) {
  const q = query(
    collection(db, 'explore_quiz_questions'),
    where('question', '==', question),
  );

  const snapshot = await getDocs(q);

  return !snapshot.empty;
}

async function seedExploreQuestions() {
  saving.value = true;
  message.value = '';
  messageType.value = '';

  try {
    let addedCount = 0;
    let skippedCount = 0;

    for (const item of questions) {
      const exists = await questionAlreadyExists(item.question);

      if (exists) {
        skippedCount++;
        continue;
      }

      await addDoc(collection(db, 'explore_quiz_questions'), item);
      addedCount++;
    }

    message.value = `Explore quiz seed complete. Added: ${addedCount}. Skipped duplicates: ${skippedCount}.`;
    messageType.value = 'success';
  } catch (error) {
    console.error('Failed to seed explore quiz questions:', error);
    message.value = 'Failed to seed explore quiz questions.';
    messageType.value = 'error';
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <MainLayout>
    <section class="seed-page">
      <div class="seed-card">
        <p class="seed-kicker">Temporary Seeder</p>

        <h1 class="seed-title">Add Explore Quiz Questions</h1>

        <p class="seed-description">
          This page will add the topic quiz questions into Firestore collection
          <strong>explore_quiz_questions</strong>.
        </p>

        <button class="seed-button" type="button" :disabled="saving" @click="seedExploreQuestions">
          {{ saving ? 'Adding Questions...' : 'Seed Explore Questions' }}
        </button>

        <p
          v-if="message"
          class="seed-message"
          :class="messageType === 'success' ? 'seed-message--success' : 'seed-message--error'"
        >
          {{ message }}
        </p>
      </div>
    </section>
  </MainLayout>
</template>

<style scoped>
.seed-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
  background: linear-gradient(180deg, #fffafc 0%, #fff4ea 45%, #fffdf8 100%);
}

.seed-card {
  width: 100%;
  max-width: 760px;
  padding: clamp(1.5rem, 5vw, 3rem);
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 24px 70px rgba(179, 106, 146, 0.14);
  text-align: center;
}

.seed-kicker {
  margin: 0 0 1rem;
  color: #b85f93;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.seed-title {
  margin: 0;
  background: linear-gradient(90deg, #d85fa5, #f39bc4, #f0a32f);
  background-clip: text;
  color: transparent;
  font-family: 'Rethink Sans', sans-serif;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1;
}

.seed-description {
  max-width: 560px;
  margin: 1rem auto 2rem;
  color: #475569;
  font-family: 'Rethink Sans', sans-serif;
  line-height: 1.7;
}

.seed-button {
  border: none;
  border-radius: 18px;
  background: linear-gradient(90deg, #e67db8, #f39bc4, #ffba2f);
  color: #ffffff;
  padding: 0.95rem 1.4rem;
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 16px 35px rgba(216, 95, 165, 0.25);
  transition: 0.2s ease;
}

.seed-button:hover {
  transform: translateY(-2px);
}

.seed-button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
  transform: none;
}

.seed-message {
  margin: 1.5rem 0 0;
  border-radius: 16px;
  padding: 1rem;
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 700;
}

.seed-message--success {
  background: #dcfce7;
  color: #166534;
}

.seed-message--error {
  background: #ffe4e6;
  color: #9f1239;
}
</style>