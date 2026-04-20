<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
    collection,
    getDocs,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
} from 'firebase/firestore'
import { db } from '@/services/firestore'
import MainLayout from '@/layouts/MainLayout.vue'

interface QuizQuestion {
    id: string
    question: string
    options: string[]
    answer: string
    imageUrl?: string
}

interface QuizResultPayload {
    score: number
    total: number
    answers: Record<string, string>
    createdAt?: unknown
}

const questions = ref<QuizQuestion[]>([])
const selectedAnswers = ref<Record<string, string>>({})
const loading = ref(true)
const saving = ref(false)
const submitted = ref(false)
const errorMessage = ref('')
const saveMessage = ref('')

const score = computed(() => {
    return questions.value.reduce((total, question) => {
        return total + (selectedAnswers.value[question.id] === question.answer ? 1 : 0)
    }, 0)
})

const totalQuestions = computed(() => questions.value.length)

const allAnswered = computed(() => {
    return questions.value.every((question) => !!selectedAnswers.value[question.id])
})

const answeredCount = computed(() => Object.keys(selectedAnswers.value).length)

const progressPercent = computed(() => {
    if (!totalQuestions.value) return 0
    return Math.round((answeredCount.value / totalQuestions.value) * 100)
})

const resultTitle = computed(() => {
    const percentage = totalQuestions.value
        ? (score.value / totalQuestions.value) * 100
        : 0

    if (percentage === 100) return 'Master of Visual Arts'
    if (percentage >= 75) return 'Creative Visionary'
    if (percentage >= 50) return 'Gallery Explorer'
    return 'Emerging Artist'
})

async function fetchQuestions() {
    loading.value = true
    errorMessage.value = ''

    try {
        const questionsRef = collection(db, 'art_quiz_questions')
        const questionsQuery = query(questionsRef, orderBy('question', 'asc'))
        const snapshot = await getDocs(questionsQuery)

        questions.value = snapshot.docs.map((doc) => {
            const data = doc.data() as Omit<QuizQuestion, 'id'>
            return {
                id: doc.id,
                question: data.question,
                options: data.options,
                answer: data.answer,
                imageUrl: data.imageUrl || '',
            }
        })
    } catch (error) {
        console.error('Failed to fetch questions:', error)
        errorMessage.value = 'Failed to load quiz questions.'
    } finally {
        loading.value = false
    }
}

function selectAnswer(questionId: string, option: string) {
    if (submitted.value) return

    selectedAnswers.value = {
        ...selectedAnswers.value,
        [questionId]: option,
    }
}

async function submitQuiz() {
    if (!allAnswered.value || submitted.value) return

    submitted.value = true
    saveMessage.value = ''
    saving.value = true

    const payload: QuizResultPayload = {
        score: score.value,
        total: totalQuestions.value,
        answers: selectedAnswers.value,
        createdAt: serverTimestamp(),
    }

    try {
        await addDoc(collection(db, 'art_quiz_results'), payload)
        saveMessage.value = 'Your gallery result has been saved successfully!'
    } catch (error) {
        console.error('Failed to save result:', error)
        saveMessage.value = 'Quiz submitted, but saving to Firebase failed.'
    } finally {
        saving.value = false
    }
}

function resetQuiz() {
    selectedAnswers.value = {}
    submitted.value = false
    saveMessage.value = ''
    errorMessage.value = ''
}

onMounted(() => {
    fetchQuestions()
})
</script>

<template>
    <MainLayout>
        <div
            class="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fffafc_0%,#fff4ea_45%,#fffdf8_100%)] px-4 py-10 md:px-6">
            <div class="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    class="absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#f7b2d2]/30 blur-3xl animate-float-slow">
                </div>
                <div
                    class="absolute right-0 top-24 h-72 w-72 rounded-full bg-[#ffd580]/30 blur-3xl animate-float-delayed">
                </div>
                <div
                    class="absolute bottom-10 left-1/4 h-52 w-52 rounded-full bg-[#d9c2ff]/25 blur-3xl animate-float-slow">
                </div>
                <div
                    class="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#ffc6a5]/25 blur-3xl animate-float-delayed">
                </div>

                <div class="absolute left-10 top-1/3 rotate-12 text-7xl opacity-[0.05]">🎨</div>
                <div class="absolute right-20 top-1/2 -rotate-12 text-7xl opacity-[0.05]">🖌️</div>
                <div class="absolute bottom-20 left-1/2 text-7xl opacity-[0.05]">✨</div>
            </div>

            <div class="relative mx-auto max-w-5xl">
                <div
                    class="relative mb-8 overflow-hidden rounded-[2.2rem] border border-white/60 bg-white/70 p-8 shadow-[0_24px_70px_rgba(179,106,146,0.15)] backdrop-blur-xl md:p-10">
                    <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#e67db8]/30 blur-3xl"></div>
                    <div class="absolute -bottom-10 left-0 h-40 w-40 rounded-full bg-[#ffba2f]/30 blur-3xl"></div>

                    <div class="relative text-center">
                        <p
                            class="mb-3 inline-flex rounded-full border border-[#f3c3d9] bg-[#fff3f8] px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#b85f93]">
                            Digital Art Experience
                        </p>

                        <h1
                            class="bg-gradient-to-r from-[#d85fa5] via-[#f39bc4] to-[#f0a32f] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl">
                            Art Knowledge Gallery
                        </h1>

                        <p class="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                            Step into a creative journey through iconic artists, masterpieces,
                            and visual expression in a gallery-inspired interactive quiz.
                        </p>

                        <div class="mx-auto mt-8 max-w-2xl">
                            <div class="mb-2 flex items-center justify-between text-sm text-slate-600">
                                <span>Gallery Progress</span>
                                <span>{{ answeredCount }} / {{ totalQuestions }} answered</span>
                            </div>

                            <div class="h-3 overflow-hidden rounded-full bg-white/80 shadow-inner">
                                <div class="h-full rounded-full bg-gradient-to-r from-[#e67db8] via-[#f39bc4] to-[#ffba2f] transition-all duration-700 ease-out"
                                    :style="{ width: `${progressPercent}%` }"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="loading"
                    class="rounded-[2rem] border border-white/50 bg-white/75 p-12 text-center text-slate-500 shadow-[0_20px_60px_rgba(179,106,146,0.10)] backdrop-blur-xl">
                    <div
                        class="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#f3c4db] border-t-[#e67db8]">
                    </div>
                    Preparing your art gallery...
                </div>

                <div v-else-if="errorMessage"
                    class="rounded-[2rem] border border-red-200 bg-white/90 p-5 text-red-600 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
                    {{ errorMessage }}
                </div>

                <div v-else-if="questions.length === 0"
                    class="rounded-[2rem] border border-white/50 bg-white/75 p-12 text-center text-slate-500 shadow-[0_20px_60px_rgba(179,106,146,0.10)] backdrop-blur-xl">
                    No quiz questions found in Firebase.
                </div>

                <div v-else class="space-y-6">
                    <transition-group name="card" tag="div" class="space-y-6">
                        <div v-for="(question, index) in questions" :key="question.id"
                            class="group overflow-hidden rounded-[1.8rem] border border-white/70 bg-white/80 shadow-[0_18px_50px_rgba(179,106,146,0.10)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(179,106,146,0.16)]">

                            <div v-if="question.imageUrl" class="p-2">
                                <div
                                    class="relative h-56 w-full overflow-hidden rounded-[20px] md:h-72 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

                                    <img :src="question.imageUrl" :alt="question.question"
                                        class="h-full w-full object-cover object-[center_20%] transition duration-700 group-hover:scale-110" />

                                    <!-- Overlay gradient -->
                                    <div
                                        class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent">
                                    </div>

                                    <div class="absolute left-4 top-4">
                                        <span
                                            class="rounded-full border border-white/40 bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md shadow">
                                            ✦ Featured Artwork
                                        </span>
                                    </div>

                                    <div class="absolute bottom-4 left-4 text-xs text-white/80">
                                        Leonardo da Vinci • c. 1503
                                    </div>

                                </div>
                            </div>

                            <div class="p-6 md:p-7">
                                <div class="mb-5 flex items-start gap-4">
                                    <div
                                        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e67db8] via-[#f39bc4] to-[#ffba2f] text-base font-bold text-white shadow-lg">
                                        {{ index + 1 }}
                                    </div>

                                    <div>
                                        <p
                                            class="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                            🎨 Canvas {{ index + 1 }}
                                        </p>
                                        <h2 class="text-lg font-semibold leading-7 text-slate-800 md:text-xl">
                                            {{ question.question }}
                                        </h2>
                                    </div>
                                </div>

                                <div class="grid gap-3">
                                    <button v-for="option in question.options" :key="option" type="button"
                                        class="group/option relative overflow-hidden rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all duration-300"
                                        :class="[
                                            selectedAnswers[question.id] === option
                                                ? 'scale-[1.02] border-[#e8a1c7] bg-gradient-to-r from-[#fdeaf4] via-[#fff6fb] to-[#fff2de] text-[#a94c82] shadow-[0_8px_24px_rgba(230,125,184,0.22)] ring-2 ring-[#f5cade]'
                                                : 'border-slate-200 bg-white/90 text-slate-700 hover:border-[#efb0d0] hover:bg-[#fff7fb] hover:shadow-md',
                                            submitted && option === question.answer
                                                ? '!border-green-400 !bg-green-50 !text-green-700 !ring-0'
                                                : '',
                                            submitted && selectedAnswers[question.id] === option && option !== question.answer
                                                ? '!border-red-400 !bg-red-50 !text-red-700 !ring-0'
                                                : '',
                                        ]" @click="selectAnswer(question.id, option)">
                                        <span
                                            class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-gradient-to-b from-[#e67db8] to-[#ffba2f] opacity-0 transition-opacity duration-300"
                                            :class="selectedAnswers[question.id] === option ? 'opacity-100' : ''"></span>

                                        <div class="flex items-center justify-between gap-4">
                                            <span class="pl-2">{{ option }}</span>

                                            <span v-if="selectedAnswers[question.id] === option"
                                                class="flex h-7 w-7 items-center justify-center rounded-full bg-[#e67db8] text-xs font-bold text-white shadow-md transition-transform duration-300">
                                                ✓
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </transition-group>

                    <div
                        class="sticky bottom-4 z-10 rounded-[1.9rem] border border-white/70 bg-white/85 p-5 shadow-[0_18px_50px_rgba(179,106,146,0.14)] backdrop-blur-xl">
                        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p class="text-sm text-slate-600">
                                    Answered:
                                    <span class="font-semibold text-slate-900">{{ answeredCount }}</span>
                                    / {{ totalQuestions }}
                                </p>

                                <div v-if="submitted" class="mt-2">
                                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#b85f93]">
                                        Gallery Result
                                    </p>
                                    <p class="mt-1 text-2xl font-extrabold text-slate-900">
                                        {{ resultTitle }}
                                    </p>
                                    <p class="mt-1 text-sm text-slate-600">
                                        Score: <span class="font-bold text-slate-900">{{ score }} / {{ totalQuestions
                                        }}</span>
                                    </p>
                                </div>
                            </div>

                            <div class="flex flex-wrap gap-3">
                                <button type="button"
                                    class="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
                                    @click="resetQuiz">
                                    Reset
                                </button>

                                <button type="button"
                                    class="rounded-2xl bg-gradient-to-r from-[#e67db8] via-[#f39bc4] to-[#ffba2f] px-5 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                                    :disabled="!allAnswered || submitted || saving" @click="submitQuiz">
                                    {{ saving ? 'Saving...' : 'Submit Quiz' }}
                                </button>
                            </div>
                        </div>

                        <p v-if="!allAnswered && !submitted" class="mt-3 text-sm font-medium text-amber-600">
                            Please answer all questions before submitting.
                        </p>

                        <p v-if="saveMessage" class="mt-3 text-sm font-medium text-green-600">
                            {{ saveMessage }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<style scoped>
.card-enter-active,
.card-leave-active {
    transition: all 0.5s ease;
}

.card-enter-from {
    opacity: 0;
    transform: translateY(24px) scale(0.98);
}

.card-enter-to {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.card-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.card-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

@keyframes floatSlow {

    0%,
    100% {
        transform: translateY(0px) translateX(0px);
    }

    50% {
        transform: translateY(-12px) translateX(8px);
    }
}

@keyframes floatDelayed {

    0%,
    100% {
        transform: translateY(0px) translateX(0px);
    }

    50% {
        transform: translateY(10px) translateX(-10px);
    }
}

.animate-float-slow {
    animation: floatSlow 7s ease-in-out infinite;
}

.animate-float-delayed {
    animation: floatDelayed 9s ease-in-out infinite;
}
</style>