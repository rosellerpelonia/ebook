<script setup lang="ts">
import { computed, ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/services/firestore'
import MainLayout from '@/layouts/MainLayout.vue'

const question = ref('')
const optionA = ref('')
const optionB = ref('')
const optionC = ref('')
const optionD = ref('')
const answer = ref('')
const imageUrl = ref('')
const message = ref('')
const messageType = ref<'success' | 'error' | ''>('')
const saving = ref(false)

const options = computed(() => [
    optionA.value.trim(),
    optionB.value.trim(),
    optionC.value.trim(),
    optionD.value.trim(),
])

function clearForm() {
    question.value = ''
    optionA.value = ''
    optionB.value = ''
    optionC.value = ''
    optionD.value = ''
    answer.value = ''
    imageUrl.value = ''
    message.value = ''
    messageType.value = ''
}

async function addQuizQuestion() {
    message.value = ''
    messageType.value = ''

    const payload = {
        question: question.value.trim(),
        options: options.value,
        answer: answer.value.trim(),
        imageUrl: imageUrl.value.trim(),
    }

    if (
        !payload.question ||
        !payload.options[0] ||
        !payload.options[1] ||
        !payload.options[2] ||
        !payload.options[3] ||
        !payload.answer
        // !payload.imageUrl
    ) {
        message.value = 'Please fill in all fields.'
        messageType.value = 'error'
        return
    }

    if (!payload.options.includes(payload.answer)) {
        message.value = 'Correct answer must exactly match one of the options.'
        messageType.value = 'error'
        return
    }

    saving.value = true

    try {
        await addDoc(collection(db, 'art_quiz_questions'), payload)

        message.value = 'Artwork quiz question added successfully.'
        messageType.value = 'success'
        clearForm()
    } catch (error) {
        console.error('Failed to add quiz question:', error)
        message.value = 'Failed to add quiz question.'
        messageType.value = 'error'
    } finally {
        saving.value = false
    }
}
</script>

<template>
    <MainLayout>
        <div
            class="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fffafc_0%,#fff4ea_45%,#fffdf8_100%)] px-4 py-10 md:px-6">
            <!-- decorative background -->
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

            <div class="relative mx-auto max-w-4xl">
                <div
                    class="overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_24px_70px_rgba(179,106,146,0.14)] backdrop-blur-xl md:p-8">
                    <!-- hero -->
                    <div
                        class="relative mb-8 overflow-hidden rounded-[1.8rem] border border-white/60 bg-white/70 p-8 text-center">
                        <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#e67db8]/25 blur-3xl"></div>
                        <div class="absolute -bottom-10 left-0 h-40 w-40 rounded-full bg-[#ffba2f]/25 blur-3xl"></div>

                        <div class="relative">
                            <p
                                class="mb-3 inline-flex rounded-full border border-[#f3c3d9] bg-[#fff3f8] px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#b85f93]">
                                Quiz Management
                            </p>

                            <h1
                                class="bg-gradient-to-r from-[#d85fa5] via-[#f39bc4] to-[#f0a32f] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent md:text-5xl">
                                Add Artwork Question
                            </h1>

                            <p class="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                                Create a gallery-inspired quiz item by adding the question,
                                artwork image, four choices, and the exact correct answer.
                            </p>
                        </div>
                    </div>

                    <form class="space-y-6" @submit.prevent="addQuizQuestion">
                        <div class="grid gap-6">
                            <div>
                                <label class="mb-2 block text-sm font-semibold text-slate-800">
                                    Question
                                </label>
                                <input v-model="question" type="text" placeholder="Enter the quiz question"
                                    class="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-800 placeholder:text-slate-400 shadow-sm transition focus:border-[#e67db8] focus:outline-none focus:ring-4 focus:ring-[#f8d4e7]" />
                            </div>

                            <div>
                                <label class="mb-2 block text-sm font-semibold text-slate-800">
                                    Artwork Image URL
                                </label>
                                <input v-model="imageUrl" type="text" placeholder="Paste artwork image URL"
                                    class="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-800 placeholder:text-slate-400 shadow-sm transition focus:border-[#e67db8] focus:outline-none focus:ring-4 focus:ring-[#f8d4e7]" />
                                <p class="mt-2 text-xs text-slate-500">
                                    Add the image that will appear above the quiz question.
                                </p>
                            </div>

                            <div v-if="imageUrl"
                                class="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/70 shadow-[0_12px_35px_rgba(179,106,146,0.10)]">
                                <div class="relative h-56 w-full overflow-hidden md:h-72">
                                    <img :src="imageUrl" alt="Artwork preview" class="h-full w-full object-cover" />
                                    <div
                                        class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent">
                                    </div>
                                    <div class="absolute left-4 top-4">
                                        <span
                                            class="rounded-full border border-white/40 bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                                            Artwork Preview
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label class="mb-2 block text-sm font-semibold text-slate-800">
                                        Option A
                                    </label>
                                    <input v-model="optionA" type="text" placeholder="Enter option A"
                                        class="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-800 placeholder:text-slate-400 shadow-sm transition focus:border-[#e67db8] focus:outline-none focus:ring-4 focus:ring-[#f8d4e7]" />
                                </div>

                                <div>
                                    <label class="mb-2 block text-sm font-semibold text-slate-800">
                                        Option B
                                    </label>
                                    <input v-model="optionB" type="text" placeholder="Enter option B"
                                        class="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-800 placeholder:text-slate-400 shadow-sm transition focus:border-[#e67db8] focus:outline-none focus:ring-4 focus:ring-[#f8d4e7]" />
                                </div>

                                <div>
                                    <label class="mb-2 block text-sm font-semibold text-slate-800">
                                        Option C
                                    </label>
                                    <input v-model="optionC" type="text" placeholder="Enter option C"
                                        class="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-800 placeholder:text-slate-400 shadow-sm transition focus:border-[#e67db8] focus:outline-none focus:ring-4 focus:ring-[#f8d4e7]" />
                                </div>

                                <div>
                                    <label class="mb-2 block text-sm font-semibold text-slate-800">
                                        Option D
                                    </label>
                                    <input v-model="optionD" type="text" placeholder="Enter option D"
                                        class="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-800 placeholder:text-slate-400 shadow-sm transition focus:border-[#e67db8] focus:outline-none focus:ring-4 focus:ring-[#f8d4e7]" />
                                </div>
                            </div>

                            <div>
                                <label class="mb-2 block text-sm font-semibold text-slate-800">
                                    Correct Answer
                                </label>
                                <input v-model="answer" type="text" placeholder="Must exactly match one of the options"
                                    class="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-800 placeholder:text-slate-400 shadow-sm transition focus:border-[#e67db8] focus:outline-none focus:ring-4 focus:ring-[#f8d4e7]" />
                            </div>
                        </div>

                        <div class="flex flex-col gap-3 pt-2 sm:flex-row">
                            <button type="submit"
                                class="rounded-2xl bg-gradient-to-r from-[#e67db8] via-[#f39bc4] to-[#ffba2f] px-5 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                                :disabled="saving">
                                {{ saving ? 'Saving...' : 'Add Question' }}
                            </button>

                            <button type="button"
                                class="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
                                @click="clearForm">
                                Clear
                            </button>
                        </div>

                        <div v-if="message" class="rounded-2xl border px-4 py-3 text-sm font-medium" :class="messageType === 'success'
                            ? 'border-green-300 bg-green-50 text-green-700'
                            : 'border-red-300 bg-red-50 text-red-700'
                            ">
                            {{ message }}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<style scoped>
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