<script setup lang="ts">
import { ref } from 'vue'
import { uploadHeroImage } from '@/services/uploadImage'

const heroImageUrl = ref<string>('')
const isUploading = ref(false)
const errorMessage = ref('')

async function handleImageChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  try {
    isUploading.value = true
    errorMessage.value = ''
    heroImageUrl.value = await uploadHeroImage(file)
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Failed to upload image.'
  } finally {
    isUploading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#FCFAF6] text-black">
    <nav class="sticky top-0 z-50 border-b border-[#E4E4E4] bg-[#FCFAF6]/95 backdrop-blur">
      <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-4 md:justify-start md:gap-6 md:px-6">
        <RouterLink to="/" class="rounded px-3 py-2 text-sm md:text-base hover:bg-black/5">
          Home
        </RouterLink>
        <RouterLink to="/modules" class="rounded px-3 py-2 text-sm md:text-base hover:bg-black/5">
          Explore
        </RouterLink>
        <RouterLink to="/reflection" class="rounded px-3 py-2 text-sm md:text-base hover:bg-black/5">
          Reflection
        </RouterLink>
        <RouterLink to="/credits" class="rounded px-3 py-2 text-sm md:text-base hover:bg-black/5">
          Credits
        </RouterLink>
      </div>
    </nav>

    <section class="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-10 md:gap-12 md:px-6 md:py-16">
      <h1 class="text-center font-serif text-4xl leading-tight font-bold md:text-6xl">
        Co-Creation<br />
        Human X Ai
      </h1>

      <div class="w-full">
        <label class="mb-3 block text-sm">Test upload 1 hero image</label>
        <input type="file" accept="image/*" @change="handleImageChange" class="block w-full text-sm" />
        <p v-if="isUploading" class="mt-2 text-sm">Uploading...</p>
        <p v-if="errorMessage" class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>
      </div>

      <div class="w-full overflow-hidden rounded-xl shadow-lg">
        <img
          v-if="heroImageUrl"
          :src="heroImageUrl"
          alt="AI and human co-creation showcase"
          class="h-[260px] w-full object-cover sm:h-[360px] md:h-[520px]"
        />
        <div
          v-else
          class="flex h-[260px] w-full items-center justify-center bg-black/10 text-center text-sm sm:h-[360px] md:h-[520px]"
        >
          Upload an image to Firebase Storage to preview it here.
        </div>
      </div>
    </section>

    <main class="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 pb-12 md:gap-16 md:px-6 md:pb-20">
      <p class="max-w-5xl text-center font-serif text-lg leading-relaxed md:text-2xl">
        Caption: Zachary Kelbaugh's stamp design after using DALL-E image generation to help with arm anatomy
      </p>

      <h2 class="text-center font-serif text-4xl leading-tight md:text-6xl">
        Artists in the Age of AI
      </h2>

      <div class="max-w-4xl rounded-xl bg-[#FCFAF6] p-6 text-center shadow-sm md:p-10">
        <p class="font-serif text-lg leading-relaxed md:text-2xl">
          Artificial Intelligence is becoming an important part of modern creative work. Today, many artists,
          designers, writers, and photographers use AI tools to support their ideas, speed up their workflow,
          and explore new creative possibilities. Rather than replacing human creativity, AI works best as a
          collaborative partner that helps creators experiment and refine their work.
        </p>
      </div>

      <div class="max-w-4xl rounded-xl bg-[#FCFAF6] p-6 text-center shadow-sm md:p-10">
        <p class="font-serif text-lg leading-relaxed md:text-2xl">
          This website explores how humans and AI can work together in the creative process, also known as
          co-creation. Through examples, tools, and explanations, it shows how AI can assist creators while
          still keeping human imagination, judgment, and intent at the center of creative work.
        </p>
      </div>

      <div class="grid w-full max-w-7xl grid-cols-1 gap-5 md:grid-cols-2">
        <div class="rounded-xl bg-[#FCFAF6] p-6 text-center shadow-sm md:col-span-2 md:p-10">
          <p class="mb-6 font-serif text-lg leading-relaxed md:text-2xl">
            By understanding how to use AI responsibly and effectively, creators can expand their imagination
            while maintaining authorship and originality.
          </p>
          <p class="font-serif text-xl md:text-2xl">What You'll Learn</p>
        </div>

        <div class="rounded-xl bg-[#FCFAF6] p-6 text-center shadow-sm md:min-h-[240px] md:p-10">
          <p class="font-serif text-lg leading-relaxed md:text-2xl">
            What co-creation means and how artists and AI collaborate creatively
          </p>
        </div>

        <div class="rounded-xl bg-[#FCFAF6] p-6 text-center shadow-sm md:min-h-[240px] md:p-10">
          <p class="font-serif text-lg leading-relaxed md:text-2xl">
            How AI is used in creative software, such as tools in Adobe Photoshop
          </p>
        </div>

        <div class="rounded-xl bg-[#FCFAF6] p-6 text-center shadow-sm md:min-h-[240px] md:p-10">
          <p class="font-serif text-lg leading-relaxed md:text-2xl">
            Using AI as a reference or assistant under human guidance rather than the final output
          </p>
        </div>

        <div class="rounded-xl bg-[#FCFAF6] p-6 text-center shadow-sm md:min-h-[240px] md:p-10">
          <p class="font-serif text-lg leading-relaxed md:text-2xl">
            The ethical responsibilities of artists using AI within creative fields
          </p>
        </div>
      </div>

      <p class="max-w-5xl text-center font-serif text-lg leading-relaxed md:text-2xl">
        This site aims to explain how AI can enhance creativity while keeping the human creator in control of the artistic vision.
      </p>
    </main>

    <footer class="mx-auto mt-8 flex w-full max-w-7xl flex-col gap-6 rounded-t-xl bg-[#545454] px-4 py-8 text-[#FCFAF6] md:px-6 md:py-10">
      <div class="text-2xl font-serif md:text-3xl">Debate It. Don't Hate It.</div>

      <div class="flex flex-col gap-6 md:flex-row md:justify-between">
        <div></div>

        <div class="space-y-2 font-serif text-lg md:text-2xl">
          <p>hello@figma.com</p>
          <p>1750 Candyland Lane,<br />Portland, OR 97205</p>
          <p>(646) 555-4567</p>
        </div>
      </div>

      <div class="text-sm text-[#E4E4E4]">
        Lincoln High School © 2025 All Rights Reserved
      </div>
    </footer>
  </div>
</template>