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
              Human-AI collaboration is changing the creative process. AI can assist with 
              idea generation, experimentation, and efficiency, but it does not replace human 
              intention and creativity. The meaning of creative work still comes from the artist.

            </p>
          </div>

          <div class="reflection-card text-box">
            <p class="body-text">
              Through Brand Communication, artists are able to express their identity, message, 
              and values, ensuring that their work remains human-centered even when AI is involved.
              The future of creativity depends not only on how AI is used, but also on how artists 
              communicate their ideas to their audience.
            </p>
          </div>
        </main>
      </div>
    </section>
  </MainLayout>
</template>

<style scoped>
.about-page {
  background: #e67db8;
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
  font-size: clamp(2rem, 7vw, 6.25rem);
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
  gap: clamp(2rem, 6vw, 3.5rem);
  padding: clamp(2rem, 6vw, 3rem) 0 0;
}

.body-text {
  color: black;
  font-size: clamp(1.15rem, 5vw, 1.6rem);
  font-family: 'Gowun Batang', serif;
  font-weight: 500;
  line-height: 1.35;
  text-align: justify;
}

.text-box {
  width: 100%;
  max-width: 1000px;
  background: #ffba2f;
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