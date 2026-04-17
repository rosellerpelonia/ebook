<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';

const tools = [
  'Adobe Photoshop (AI features) – generative fill and image editing',
  'Stable Diffusion – text-to-image concept exploration',
  'Krita (AI tools) – assisted sketching and drawing',
  'ChatGPT Image Generation (OpenAI) – idea exploration',
  'DALL·E (OpenAI) – early concept image generation',
];
</script>

<template>
  <MainLayout>
    <section class="credits-page">
      <div class="credits-page__inner">

        <h1 class="hero-title">Credits &amp; Tools Used</h1>

        <main class="content-section">
          <div class="credits-card text-box">
            <p class="body-text">
              This project recognizes the AI tools that supported the creative workflow
              while maintaining that the human creator remains the primary author.
            </p>
          </div>

          <div class="credits-card text-box">
            <p class="body-text">
              Research shows that AI-assisted outputs are still considered human creations
              when humans control the prompts, editing, and final decisions.
            </p>
          </div>

          <div class="tools-grid">
            <div class="tools-header credits-card">
              <p class="body-text">AI Tools Referenced</p>
            </div>

            <div
              v-for="tool in tools"
              :key="tool"
              class="tools-card credits-card text-box"
            >
              <p class="body-text">{{ tool }}</p>
            </div>
          </div>

          <div class="credits-card text-box credits-card--double">
            <p class="body-text">
              Even when these tools were used, the final creative decisions, edits, and
              artistic direction were made by the human creator.
            </p>

            <p class="body-text">
              Acknowledging AI tools promotes ethical transparency while reinforcing that
              creativity, meaning, and responsibility remain human-centered.
            </p>
          </div>
        </main>
      </div>
    </section>
  </MainLayout>
</template>

<style scoped>
.credits-page {
  background: #e67db8;
}

.credits-page__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 2rem) clamp(1rem, 3vw, 1.25rem)
    clamp(3rem, 8vw, 6rem);
}

.hero-utility {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  background: #ffba2f;
  border-radius: 16px;
  padding: 1rem 1.25rem;
}

.hero-utility--top {
  margin-bottom: clamp(2rem, 6vw, 3rem);
  text-align: left;
}

.hero-utility--bottom {
  margin-top: clamp(1.5rem, 5vw, 2.5rem);
  margin-bottom: clamp(2rem, 6vw, 3.5rem);
  text-align: center;
  background: transparent;
  padding: 0;
}

.hero-utility__link {
  color: #000000;
  font-family: 'Rethink Sans', sans-serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.hero-title {
  color: black;
  font-size: clamp(2rem, 4vw, 6.25rem);
  font-family: 'Helvetica', serif;
  font-weight: 700;
  line-height: 0.95;
  text-align: center;
  margin: 0 auto;
  max-width: 800px;
}

.content-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1rem, 1vw, 3.5rem);
  padding: clamp(2rem, 6vw, 3rem) 0 0;
}

.body-text {
  color: black;
  font-size: clamp(1.15rem, 1vw, 1.6rem);
  font-family: 'Gowun Batang', serif;
  font-weight: 500;
  line-height: 1.35;
  text-align: justify;
}

.text-box,
.tools-header {
  width: 100%;
  max-width: 1000px;
  background: #ffba2f;
  border-radius: 16px;
  padding: clamp(1.5rem, 5vw, 3rem);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.credits-card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}

.credits-card--double {
  flex-direction: column;
  gap: 0.1rem;
}

.tools-grid {
  min-height: 100px;
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  align-items: stretch;
}

.tools-header {
  max-width: none;
  grid-column: 1 / -1;
  min-height: 120px;
}

.tools-card {
  min-height: 100px;
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }

  .hero-utility {
    border-radius: 12px;
  }
}
</style>