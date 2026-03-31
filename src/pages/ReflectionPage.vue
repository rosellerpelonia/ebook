<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
</script>

<template>
  <MainLayout>
    <section class="about-page">
      <div class="about-page__inner">

        <h1 class="hero-title">Reflection / Conclusion</h1>

        <main class="content-section">
          <div class="reflection-card text-box">
            <p class="body-text">
              Human-AI collaboration is changing the creative process. Instead of simply
              automating tasks, AI can participate in a dynamic creative exchange where
              humans and machines influence each other's ideas.
            </p>
          </div>

          <div class="reflection-card text-box">
            <p class="body-text">
              Research shows that AI can improve creative performance by helping with idea
              exploration, experimentation, and refinement. However, these benefits only
              occur when human intention and judgment remain central.
            </p>
          </div>

          <div class="reflection-card text-box">
            <p class="body-text">
              The future of creativity depends on how humans choose to use AI tools. When
              used responsibly, AI can expand imagination and support innovation while still
              preserving human creativity, authorship, and meaning.
            </p>
          </div>
        </main>
      </div>
    </section>
  </MainLayout>
</template>

<style scoped>
.about-page {
  background: #fcfaf6;
}

.about-page__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 2rem) clamp(1rem, 3vw, 1.25rem)
    clamp(3rem, 8vw, 6rem);
}

.hero-utility {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  background: #ece7db;
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
  color: #111;
  font-family: 'Rethink Sans', sans-serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.hero-title {
  color: black;
  font-size: clamp(2.5rem, 7vw, 4.375rem);
  font-family: 'Gowun Batang', serif;
  font-weight: 400;
  line-height: 1.1;
  text-align: center;
  margin: 0 auto;
  max-width: 983px;
}

.content-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(2rem, 6vw, 3.5rem);
  padding: clamp(2rem, 6vw, 3rem) 0 0;
}

.body-text {
  color: black;
  font-size: clamp(1.15rem, 3vw, 1.875rem);
  font-family: 'Gowun Batang', serif;
  font-weight: 400;
  line-height: 1.35;
  text-align: center;
}

.text-box {
  width: 100%;
  max-width: 800px;
  background: #fcfaf6;
  border-radius: 16px;
  padding: clamp(1.5rem, 5vw, 3rem);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.reflection-card {
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .hero-utility {
    border-radius: 12px;
  }
}
</style>