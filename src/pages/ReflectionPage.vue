<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'

const reflections = [
  {
    title: 'Human Creativity Remains Central',
    text: 'Human-AI collaboration is changing the creative process. AI can assist with idea generation, experimentation, and efficiency, but it does not replace human intention and creativity. The meaning of creative work still comes from the artist.',
  },
  {
    title: 'Brand Communication Gives Meaning',
    text: 'Through Brand Communication, artists express their identity, message, and values, ensuring that their work remains human-centered even when AI is involved. The future of creativity depends not only on how AI is used, but also on how artists communicate their ideas to their audience.',
  },
  {
    title: 'Responsible Use Shapes the Future',
    text: 'The future of creativity depends on how humans choose to use AI tools. When used responsibly, AI can expand imagination and support innovation while still preserving human creativity, authorship, and meaning.',
  },
]
</script>

<template>
  <MainLayout>
    <section class="reflection-page">
      <div class="reflection-page__inner">
        <header class="hero-section fade-up">

          <h1 class="hero-title">Reflection /<br />Conclusion</h1>

          <p class="hero-subtitle">
            A closing statement on human creativity, AI collaboration, and the importance
            of keeping artistic meaning human-centered.
          </p>
        </header>

        <main class="content-section">
          <section class="reflection-grid fade-up fade-delay-1">
            <article v-for="(reflection, index) in reflections" :key="reflection.title" class="reflection-card">
              <span class="card-number">
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <h2 class="card-title">{{ reflection.title }}</h2>

              <p class="body-text">
                {{ reflection.text }}
              </p>
            </article>
          </section>

          <section class="closing-card fade-up fade-delay-2">
            <p class="closing-label">Conclusion</p>

            <p class="closing-copy">
              AI can support the creative journey, but the artist remains the one who gives
              direction, emotion, context, and meaning to the final work.
            </p>
          </section>
        </main>
      </div>
    </section>
  </MainLayout>
</template>

<style scoped>
.reflection-page {
  position: relative;
  overflow: hidden;
}

.reflection-page::before {
  content: '';
  position: absolute;
  inset: 0;
}

.reflection-page__inner {
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
  font-size: clamp(2.2rem, 5vw, 4.5rem);
  font-family: 'Helvetica', serif;
  font-weight: 700;
  line-height: 0.92;
  text-align: center;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
}

.hero-subtitle {
  max-width: 760px;
  margin: 1.25rem auto 0;
  color: rgba(242, 242, 242, 0.88);
  opacity: 0.9;
  font-size: 1.05rem;
  line-height: 1.75;
  font-family: 'Rethink Sans', sans-serif;
}

.reflection-card:nth-child(2) {
  --offset: 20px;
}

.reflection-card:nth-child(3) {
  --offset: 40px;
}

.reflection-card {
  gap: 1.2rem;
  align-items: flex-start;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

/* .body-text {
  max-width: 90%;
} */

.reflection-card {
  transform: translateY(var(--offset, 0));
}

.reflection-card:hover {
  transform: translateY(calc(var(--offset, 0) - 12px)) scale(1.03);
}

.closing-card {
  margin-top: 50px;
  max-width: 800px;
  text-align: center;
}

.closing-copy {
  font-size: 1.25rem;
  font-weight: 500;
}

.content-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.75rem, 4vw, 3rem);
  padding-top: clamp(2rem, 6vw, 4rem);
}

.reflection-grid {
  display: grid;
  width: 100%;
  max-width: 1100px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.4rem;
}

.reflection-card,
.closing-card {
  position: relative;
  overflow: hidden;
  background: rgba(255, 186, 47, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.18),
    0 0 22px rgba(255, 186, 47, 0.18);
  backdrop-filter: blur(12px);
}

.reflection-card::before,
.closing-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent 45%);
  border-radius: inherit;
  pointer-events: none;
}

.reflection-card {
  min-height: 420px;
  padding: clamp(1.4rem, 3vw, 2rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.reflection-card:hover {
  box-shadow:
    0 25px 60px rgba(0, 0, 0, 0.25),
    0 0 30px rgba(255, 186, 47, 0.35);
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
  font-weight: 800;
  letter-spacing: 0.08em;
}

.card-title {
  margin: 0;
  color: #111111;
  font-family: 'Rethink Sans', sans-serif;
  font-size: clamp(1.25rem, 1.8vw, 1.6rem);
  font-weight: 800;
  line-height: 1.2;
  margin-top: 0.3rem;
}

.body-text {
  margin: 0;
  max-width: 90%;
  color: #111111;
  font-size: clamp(1rem, 1.1vw, 1.15rem);
  font-family: 'Gowun Batang', serif;
  font-weight: 500;
  line-height: 1.75;
  text-align: justify;
}

.closing-card {
  width: 100%;
  max-width: 900px;
  padding: clamp(1.5rem, 4vw, 2.8rem);
}

.closing-label {
  margin: 0 0 0.5rem;
  color: rgba(17, 17, 17, 0.7);
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.closing-copy {
  margin: 0 auto;
  color: #111111;
  font-family: 'Gowun Batang', serif;
  font-size: clamp(1.1rem, 1.4vw, 1.45rem);
  line-height: 1.8;
  text-align: center;
  max-width: 85%;
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

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .reflection-grid {
    grid-template-columns: 1fr;
  }

  .reflection-card {
    min-height: auto;
  }
}

@media (max-width: 768px) {
  .reflection-page__inner {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .hero-subtitle {
    line-height: 1.6;
  }
}
</style>