<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getStorageImageUrl } from '@/services/storage';

const homeImageUrl = ref('');
const isLoadingImage = ref(true);
const imageError = ref('');

onMounted(async () => {
  try {
    homeImageUrl.value = await getStorageImageUrl('hom-image.png');
  } catch (error) {
    console.error(error);
    imageError.value = 'Failed to load home image from Firebase Storage.';
  } finally {
    isLoadingImage.value = false;
  }
});
</script>

<template>
  <div class="home-page">
    <nav class="nav-bar">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/explore" class="nav-link">Explore</RouterLink>
      <RouterLink to="/about-us" class="nav-link">About us</RouterLink>
      <RouterLink to="/credits" class="nav-link">Credits</RouterLink>
    </nav>

    <section class="hom-section">
      <div class="survey-link-row">
        <a href="#" class="survey-link">Survey here</a>
      </div>

      <h1 class="hom-title">Co-Creation<br />Human X Ai</h1>

      <a href="#" class="join-link">Join us</a>

      <div class="hom-image-container">
        <img
          v-if="homeImageUrl && !isLoadingImage"
          :src="homeImageUrl"
          alt="Co-Creation Human X AI"
          class="hom-image"
        />

        <div v-else-if="isLoadingImage" class="hom-placeholder">
          Loading image...
        </div>

        <div v-else class="hom-placeholder">
          {{ imageError || 'No image available.' }}
        </div>
      </div>
    </section>

    <main class="content-section">
      <div class="caption-text">
        Caption: Zachary Kelbaugh’s stamp design after using DALL-E image generation to help with arm anatomy
      </div>

      <h2 class="main-title">Artists in the Age of AI</h2>

      <div class="text-box">
        <p class="body-text">
          Artificial Intelligence is becoming an important part of modern creative work.
          Today, many artists, designers, writers, and photographers use AI tools to support
          their ideas, speed up their workflow, and explore new creative possibilities.
          Rather than replacing human creativity, AI works best as a collaborative partner
          that helps creators experiment and refine their work.
        </p>
      </div>

      <div class="text-box">
        <p class="body-text">
          This website explores how humans and AI can work together in the creative process,
          also known as co-creation. Through examples, tools, and explanations, it shows how
          AI can assist creators while still keeping human imagination, judgment, and intent
          at the center of creative work.
        </p>
      </div>

      <div class="text-box narrow-text-box">
        <p class="body-text">
          By understanding how to use AI responsibly and effectively, creators can expand
          their imagination while maintaining authorship and originality.
        </p>
      </div>

      <div class="learn-section">
        <h3 class="learn-title">What You’ll Learn</h3>

        <div class="learn-grid">
          <div class="learn-item">
            <span class="bullet">•</span>
            <p class="learn-text">
              What co-creation means and how artists and AI collaborate creatively
            </p>
          </div>

          <div class="learn-item">
            <span class="bullet">•</span>
            <p class="learn-text">
              How AI is used in creative software, such as tools in Adobe Photoshop
            </p>
          </div>

          <div class="learn-item">
            <span class="bullet">•</span>
            <p class="learn-text">
              Using AI as a reference or assistant under human guidance rather than the final output
            </p>
          </div>

          <div class="learn-item">
            <span class="bullet">•</span>
            <p class="learn-text">
              The ethical responsibilities of artists using AI within creative fields
            </p>
          </div>
        </div>
      </div>

      <div class="text-box final-text-box">
        <p class="body-text">
          This site aims to explain how AI can enhance creativity while keeping the human
          creator in control of the artistic vision.
        </p>
      </div>
    </main>

    <footer class="footer">
      <div class="footer-icons">f &nbsp; ⊙ &nbsp; ♫</div>

      <div class="footer-main-row">
        <div class="footer-slogan">Debate It. Don’t Hate It.</div>

        <div class="footer-contact-column">
          <div class="footer-contact">hello@figma.com</div>
          <div class="footer-contact">
            1750 Candyland Lane,<br />
            Portland, OR 97205<br />
            (646) 555-4567
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-copyright">Lincoln High School © 2025 All Rights Reserved</div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=Rethink+Sans:wght@400&display=swap');

:global(body) {
  margin: 0;
  background: #fcfaf6;
  font-family: 'Gowun Batang', serif;
}

* {
  box-sizing: border-box;
}

.home-page {
  min-height: 100vh;
  background: #fcfaf6;
  color: #000;
}

.nav-bar {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e4e4e4;
  background: rgba(252, 250, 246, 0.95);
  backdrop-filter: blur(12px);
}

.nav-link {
  text-decoration: none;
  color: #000;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  padding: 0.25rem 0.5rem;
}

.hom-section {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.survey-link-row {
  width: 100%;
  background: #efe8dc;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin: 1rem 0 2rem;
}

.survey-link {
  color: #000;
  font-size: 0.95rem;
}

.hom-title {
  text-align: center;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1.05;
  font-weight: 700;
  margin: 1rem 0 2rem;
}

.join-link {
  color: #000;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.hom-image-container {
  width: 100%;
  min-height: 320px;
  height: clamp(320px, 58vw, 760px);
  overflow: hidden;
  background: #e9e4dc;
}

.hom-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hom-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
}

.content-section {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.caption-text {
  margin-top: 0.5rem;
  margin-bottom: 4rem;
  font-size: clamp(1rem, 1.6vw, 1.5rem);
  line-height: 1.4;
  text-align: center;
  max-width: 1100px;
}

.main-title {
  font-size: clamp(2.2rem, 4.8vw, 4rem);
  line-height: 1.15;
  text-align: center;
  font-weight: 400;
  margin: 0 0 3rem;
}

.text-box {
  width: min(100%, 820px);
  margin-bottom: 2.75rem;
}

.narrow-text-box {
  width: min(100%, 760px);
}

.final-text-box {
  width: min(100%, 900px);
  margin-top: 3rem;
  margin-bottom: 2rem;
}

.body-text {
  font-size: clamp(1.05rem, 1.7vw, 1.6rem);
  line-height: 1.45;
  text-align: center;
  margin: 0;
}

.learn-section {
  width: 100%;
  max-width: 950px;
  margin-top: 1rem;
}

.learn-title {
  text-align: center;
  font-size: clamp(1.2rem, 1.8vw, 1.7rem);
  font-weight: 400;
  margin: 0 0 3.5rem;
}

.learn-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 6rem;
  row-gap: 3rem;
}

.learn-item {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0.75rem;
  min-height: 130px;
}

.bullet {
  font-size: 1.5rem;
  line-height: 1;
  margin-top: 0.1rem;
}

.learn-text {
  margin: 0;
  max-width: 250px;
  text-align: center;
  font-size: clamp(1rem, 1.45vw, 1.35rem);
  line-height: 1.35;
}

.footer {
  margin-top: 3rem;
  background: #545454;
  color: #fcfaf6;
  padding: 0.75rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.footer-icons {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  font-size: 0.85rem;
}

.footer-main-row {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-slogan,
.footer-contact {
  font-size: clamp(1rem, 1.5vw, 1.35rem);
  line-height: 1.35;
}

.footer-contact-column {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-bottom {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
}

.footer-copyright {
  color: #e4e4e4;
  font-size: 0.7rem;
  font-family: 'Rethink Sans', sans-serif;
}

@media (max-width: 900px) {
  .learn-grid {
    grid-template-columns: 1fr;
    column-gap: 0;
    row-gap: 2rem;
  }

  .learn-item {
    min-height: auto;
  }

  .learn-text {
    max-width: 320px;
  }
}

@media (max-width: 768px) {
  .nav-bar {
    justify-content: center;
  }

  .caption-text {
    margin-bottom: 2.5rem;
  }

  .main-title {
    margin-bottom: 2rem;
  }

  .text-box {
    margin-bottom: 2rem;
  }

  .footer-main-row {
    flex-direction: column;
  }

  .footer-slogan,
  .footer-contact,
  .footer-copyright {
    text-align: left;
  }
}
</style>