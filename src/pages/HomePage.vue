<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { getStorageImageUrl } from '@/services/storage'

const homeImageUrl = ref('')
const isLoadingImage = ref(true)
const imageError = ref('')

onMounted(async () => {
  try {
    homeImageUrl.value = await getStorageImageUrl('hom-image.png')
  } catch (error) {
    console.error(error)
    imageError.value = 'Failed to load home image from Firebase Storage.'
  } finally {
    isLoadingImage.value = false
  }
})
</script>

<template>
  <MainLayout>
    <section class="home-page">
      <div class="background-overlay"></div>
      <div class="background-glow background-glow--one"></div>
      <div class="background-glow background-glow--two"></div>

      <div class="home-page__inner">
        <header class="hero-section fade-up">
          <!-- <p class="hero-kicker">Interactive Thesis Ebook</p> -->
          <h1 class="hero-title">Co-Creation<br />Human X AI</h1>
          <p class="hero-subtitle">
            Exploring how artists and artificial intelligence collaborate while keeping
            human imagination, authorship, and creative direction at the center.
          </p>
        </header>

        <div class="hero-image-container fade-up fade-delay-1">
          <img
            v-if="homeImageUrl && !isLoadingImage"
            :src="homeImageUrl"
            alt="AI and human co-creation showcase"
            class="hero-image"
          />

          <div v-else-if="isLoadingImage" class="image-placeholder">
            Loading image...
          </div>

          <div v-else class="image-placeholder">
            {{ imageError || 'No image available.' }}
          </div>

          <div class="hero-image-overlay"></div>

          <!-- <div class="hero-caption">
            Caption: Zachary Kelbaugh's stamp design after using DALL-E image generation
            to help with arm anatomy
          </div> -->
        </div>

        <main class="content-section">
          <h2 class="main-title fade-up fade-delay-2">Artists in the Age of AI</h2>

          <div class="text-box text-box--left fade-up fade-delay-2">
            <p class="body-text">
              Artificial Intelligence is becoming an important part of modern creative work.
              Today, many artists, designers, writers, and photographers use AI tools to
              support their ideas, speed up their workflow, and explore new creative
              possibilities. Rather than replacing human creativity, AI works best as a
              collaborative partner that helps creators experiment and refine their work.
            </p>
          </div>

          <div class="text-box text-box--right fade-up fade-delay-3">
            <p class="body-text">
              This website explores how humans and AI can work together in the creative
              process, also known as co-creation. Through examples, tools, and explanations,
              it shows how AI can assist creators while still keeping human imagination,
              judgment, and intent at the center of creative work.
            </p>
          </div>

          <section class="content-grid fade-up fade-delay-3">
            <div class="learning-header">
              <p class="body-text">
                By understanding how to use AI responsibly and effectively, creators can
                expand their imagination while maintaining authorship and originality.
              </p>
              <p class="learning-title">What You'll Learn</p>
            </div>

            <div class="learning-card">
              <span class="card-number">01</span>
              <p class="body-text body-text--card">
                What co-creation means and how artists and AI collaborate creatively
              </p>
            </div>

            <div class="learning-card">
              <span class="card-number">02</span>
              <p class="body-text body-text--card">
                How AI is used in creative software, such as tools in Adobe Photoshop
              </p>
            </div>

            <div class="learning-card">
              <span class="card-number">03</span>
              <p class="body-text body-text--card">
                Using AI as a reference or assistant under human guidance rather than the
                final output
              </p>
            </div>

            <div class="learning-card">
              <span class="card-number">04</span>
              <p class="body-text body-text--card">
                The ethical responsibilities of artists using AI within creative fields
              </p>
            </div>
          </section>

          <div class="closing-text fade-up fade-delay-4">
            <p class="body-text closing-copy">
              This site aims to explain how AI can enhance creativity while keeping the
              human creator in control of the artistic vision.
            </p>
          </div>
        </main>
      </div>
    </section>
  </MainLayout>
</template>

<style scoped>

.home-page__inner {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 1.5rem) clamp(4rem, 8vw, 7rem);
}

.hero-section {
  max-width: 900px;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.hero-kicker {
  margin: 0 0 0.75rem;
  color: #ffba2f;
  font-size: 0.95rem;
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.hero-title {
  margin: 0;
  color: #f2f2f2;
  font-size: clamp(2.8rem, 7vw, 6.4rem);
  font-family: 'Helvetica', serif;
  font-weight: 700;
  line-height: 0.92;
  text-align: center;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
}

.hero-subtitle {
  max-width: 720px;
  margin: 1.25rem auto 0;
  color: rgba(242, 242, 242, 0.88);
  font-size: clamp(1rem, 1.5vw, 1.18rem);
  line-height: 1.75;
  font-family: 'Rethink Sans', sans-serif;
}

.hero-image-container {
  position: relative;
  width: 100%;
  max-width: 1180px;
  min-height: 360px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 28px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  box-shadow:
    0 25px 60px rgba(0, 0, 0, 0.28),
    0 0 40px rgba(255, 186, 47, 0.12);
  backdrop-filter: blur(8px);
}

.hero-image {
  width: 100%;
  height: 100%;
  display: block;
  min-height: 360px;
  object-fit: cover;
  transform: scale(1.01);
}

.hero-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(5, 7, 45, 0.78) 0%,
    rgba(5, 7, 45, 0.22) 36%,
    rgba(5, 7, 45, 0.06) 100%
  );
}

.hero-caption {
  position: absolute;
  left: 1.25rem;
  right: 1.25rem;
  bottom: 1.1rem;
  max-width: 780px;
  color: #f2f2f2;
  font-size: clamp(0.92rem, 1vw, 1.02rem);
  line-height: 1.55;
  font-family: 'Rethink Sans', sans-serif;
  background: rgba(0, 0, 0, 0.24);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 0.85rem 1rem;
  backdrop-filter: blur(12px);
}

.image-placeholder {
  min-height: 360px;
  display: grid;
  place-items: center;
  background: rgba(255, 186, 47, 0.92);
  font-family: 'Rethink Sans', sans-serif;
  color: #111827;
  font-weight: 600;
}

.content-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.75rem, 4vw, 3rem);
  padding: clamp(3rem, 8vw, 5.5rem) 0 0;
}

.main-title {
  margin: 0;
  color: #f2f2f2;
  font-size: clamp(2.2rem, 5vw, 5rem);
  font-family: 'Helvetica', serif;
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-align: center;
  text-shadow: 0 12px 28px rgba(0, 0, 0, 0.24);
}

.body-text {
  color: #111111;
  font-size: clamp(1.05rem, 1.15vw, 1.3rem);
  font-family: 'Gowun Batang', serif;
  font-weight: 500;
  line-height: 1.8;
  letter-spacing: 0.01em;
  text-align: justify;
}

.text-box {
  width: 100%;
  max-width: 960px;
  position: relative;
  background: rgba(255, 186, 47, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.18),
    0 0 22px rgba(255, 186, 47, 0.18);
  backdrop-filter: blur(12px);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.text-box::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.18),
    transparent 45%
  );
  border-radius: inherit;
  pointer-events: none;
}

.text-box:hover {
  transform: translateY(-6px);
  box-shadow:
    0 22px 44px rgba(0, 0, 0, 0.22),
    0 0 30px rgba(255, 186, 47, 0.24);
}

.text-box--left {
  align-self: flex-start;
  transform: translateX(-22px);
}

.text-box--right {
  align-self: flex-end;
  transform: translateX(22px);
}

.content-grid {
  display: grid;
  width: 100%;
  max-width: 1100px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.4rem;
}

.learning-header,
.learning-card {
  position: relative;
  overflow: hidden;
  background: rgba(255, 186, 47, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  padding: clamp(1.4rem, 3vw, 2rem);
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.16),
    0 0 24px rgba(255, 186, 47, 0.16);
  backdrop-filter: blur(12px);
}

.learning-header::before,
.learning-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.2), transparent 45%);
  pointer-events: none;
}

.learning-header {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.learning-title {
  margin: 0;
  color: #111111;
  font-size: clamp(1.3rem, 2vw, 1.8rem);
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.learning-card {
  min-height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.learning-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow:
    0 22px 50px rgba(0, 0, 0, 0.22),
    0 0 34px rgba(255, 186, 47, 0.28);
}

.card-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.12);
  color: #111111;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.body-text--card {
  text-align: left;
  line-height: 1.75;
}

.closing-text {
  max-width: 760px;
  text-align: center;
  margin-top: 0.5rem;
}

.closing-copy {
  color: #f2f2f2;
  text-align: center;
  opacity: 0.94;
}

.fade-up {
  opacity: 0;
  transform: translateY(34px);
  animation: fadeUp 0.9s ease forwards;
}

.fade-delay-1 {
  animation-delay: 0.15s;
}

.fade-delay-2 {
  animation-delay: 0.3s;
}

.fade-delay-3 {
  animation-delay: 0.45s;
}

.fade-delay-4 {
  animation-delay: 0.6s;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .text-box--left,
  .text-box--right {
    align-self: center;
    transform: none;
  }
}

@media (max-width: 768px) {
  .home-page__inner {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .hero-image-container,
  .hero-image,
  .image-placeholder {
    min-height: 250px;
  }

  .hero-caption {
    position: static;
    margin: 1rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .learning-card {
    min-height: auto;
  }

  .hero-subtitle {
    line-height: 1.6;
  }
}
</style>