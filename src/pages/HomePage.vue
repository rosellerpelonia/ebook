<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getStorageImageUrl } from '@/services/storage';

const homeImageUrl = ref('');
const isLoadingImage = ref(true);
const imageError = ref('');

onMounted(async () => {
  try {
    // example path inside Firebase Storage
    // upload your file manually in Firebase Storage under:
    // home/hom-image.jpg
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
        <img v-if="homeImageUrl && !isLoadingImage" :src="homeImageUrl" alt="Co-Creation Human X AI"
          class="hom-image" />

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
          Today, many artists, designers, writers, and creators use AI as a tool to support
          ideation, exploration, and creative experimentation.
        </p>
      </div>

      <div class="text-box">
        <p class="body-text">
          Human creativity remains central. AI can help generate references, assist in visual
          exploration, and speed up some steps, but artistic direction, intention, and judgment
          still come from people.
        </p>
      </div>
    </main>

    <footer class="footer">
      <div class="footer-main-row">
        <div class="footer-slogan">Debate It. Don’t Hate It.</div>

        <div class="footer-contact-column">
          <div class="footer-contact">hello@figma.com</div>
          <div class="footer-contact">1750 Candyland Lane,<br />Portland, OR 97205</div>
          <div class="footer-contact">(646) 555-4567</div>
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
  gap: 3rem;
}

.caption-text,
.body-text,
.footer-slogan,
.footer-contact {
  font-size: clamp(1rem, 2.2vw, 1.75rem);
  line-height: 1.4;
  text-align: center;
}

.caption-text {
  margin-top: 0.5rem;
}

.main-title {
  font-size: clamp(2.25rem, 5vw, 4.2rem);
  line-height: 1.15;
  text-align: center;
  font-weight: 400;
  margin-top: 2rem;
}

.text-box {
  width: min(100%, 900px);
}

.footer {
  margin-top: 3rem;
  background: #545454;
  color: #fcfaf6;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.footer-main-row {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
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
  font-size: 0.95rem;
  font-family: 'Rethink Sans', sans-serif;
}

@media (max-width: 768px) {
  .nav-bar {
    justify-content: center;
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