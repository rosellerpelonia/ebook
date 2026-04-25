<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'

const tools = [
  {
    name: 'Adobe Photoshop',
    description: 'AI generative fill and image editing',
    icon: '/images/ps.png',
  },
  {
    name: 'Stable Diffusion',
    description: 'Text-to-image concept exploration',
    icon: '/images/diffusion.png',
  },
  {
    name: 'Krita',
    description: 'AI-assisted drawing',
    icon: '/images/krita.png',
  },
  {
    name: 'ChatGPT Image',
    description: 'Idea exploration',
    icon: '/images/chatgpt.png',
  },
  {
    name: 'DALL·E',
    description: 'Concept image generation',
    icon: '/images/dalle.png',
  },
  {
    name: 'Canva',
    description: 'Layout & design',
    icon: '/images/canva.png',
  },
  {
    name: 'Coolors',
    description: 'Color palette generation',
    icon: '/images/coolors.png',
  },
  {
    name: 'Figma',
    description: 'UI/UX design',
    icon: '/images/figma.png',
  },
]
</script>

<template>
  <MainLayout>
    <section class="credits-page">
      <div class="credits-page__inner">
        <header class="hero-section fade-up">
          <h1 class="hero-title">Credits &amp;<br />Tools Used</h1>
          <p class="hero-subtitle">
            Recognizing the creative and AI tools that supported this project while keeping
            human authorship, judgment, and artistic direction at the center.
          </p>
        </header>

        <main class="content-section">
          <div class="text-box text-box--left fade-up fade-delay-1">
            <p class="body-text">
              This project recognizes the AI tools that supported the creative workflow
              while maintaining that the human creator remains the primary author.
            </p>
          </div>

          <div class="text-box text-box--right fade-up fade-delay-2">
            <p class="body-text">
              AI-assisted outputs are still considered human creations when humans control
              the prompts, editing, and final creative decisions.
            </p>
          </div>

          <section class="tools-grid fade-up fade-delay-3">
            <div class="tools-header">
              <p class="body-text">
                These tools were used for research, design support, visual exploration,
                layout planning, and creative development.
              </p>
              <p class="tools-title">AI Tools Referenced</p>
            </div>

            <div v-for="(tool, index) in tools" :key="tool.name" class="tool-card">
              <span class="card-number">
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <img :src="tool.icon" class="tool-icon" />

              <h3 class="tool-name">{{ tool.name }}</h3>

              <p class="tool-role">{{ tool.description }}</p>
            </div>
          </section>

          <div class="text-box closing-card fade-up fade-delay-4">
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
.credits-page__inner {
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

.content-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.75rem, 4vw, 3rem);
  padding: clamp(2rem, 6vw, 4rem) 0 0;
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

.text-box,
.tools-header,
.tool-card {
  position: relative;
  overflow: hidden;
  background: rgba(255, 186, 47, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.18),
    0 0 22px rgba(255, 186, 47, 0.18);
  backdrop-filter: blur(12px);
  align-items: flex-start;
}

.tool-card {
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.tool-card:hover {
  transform: translateY(-10px) scale(1.03);
}

.tool-name {
  font-weight: 800;
  font-size: 1.25rem;
}

.tool-role {
  opacity: 0.75;
  font-size: 0.95rem;
  line-height: 1.6;
}

.text-box {
  width: 100%;
  max-width: 960px;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.text-box::before,
.tools-header::before,
.tool-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.18), transparent 45%);
  border-radius: inherit;
  pointer-events: none;
}

.text-box:hover,
.tool-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 25px 60px rgba(0, 0, 0, 0.25),
    0 0 30px rgba(255, 186, 47, 0.35);
}

.text-box--left {
  align-self: flex-start;
  transform: translateX(-22px);
}

.text-box--right {
  align-self: flex-end;
  transform: translateX(22px);
}

.tools-grid {
  display: grid;
  width: 100%;
  max-width: 1100px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.4rem;
}

.tools-header {
  grid-column: 1 / -1;
  padding: clamp(1.4rem, 3vw, 2rem);
}

.tools-title {
  margin: 1rem 0 0;
  color: #111111;
  font-size: clamp(1.3rem, 2vw, 1.8rem);
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.tool-card {
  min-height: 260px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: clamp(1.4rem, 3vw, 2rem);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
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

.closing-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  .tools-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .text-box--left,
  .text-box--right {
    align-self: center;
    transform: none;
  }
}

@media (max-width: 768px) {
  .credits-page__inner {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .tools-grid {
    grid-template-columns: 1fr;
  }

  .tool-card {
    min-height: auto;
  }

  .hero-subtitle {
    line-height: 1.6;
  }
}

.tool-icon {
  width: 52px;
  height: 52px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.45),
      rgba(255, 255, 255, 0.1));

  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);

  padding: 0.6rem;
  border-radius: 14px;

  box-shadow:
    0 6px 16px rgba(0, 0, 0, 0.15),
    inset 0 1px 2px rgba(255, 255, 255, 0.4);
}

.tool-card:hover .tool-name {
  letter-spacing: 0.03em;
}

.tool-icon {
  transition: transform 0.3s ease;
}

.tool-icon {
  background: rgba(255, 255, 255, 0.25);
  padding: 0.6rem;
  border-radius: 12px;
  align-self: flex-start;

}

.tool-name {
  font-weight: 800;
  font-size: 1.2rem;
}

.tool-role {
  opacity: 0.8;
  font-size: 0.95rem;
}
</style>