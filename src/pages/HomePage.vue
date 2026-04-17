<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
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
  <MainLayout>
    <section class="home-page">
      <div class="home-page__inner">

        <h1 class="hero-title">Co-Creation<br />Human X Ai</h1>


        <div class="hero-image-container">
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
        </div>

        <main class="content-section">
          <div class="caption-text">
            Caption: Zachary Kelbaugh's stamp design after using DALL-E image generation
            to help with arm anatomy
          </div>

          <h2 class="main-title">Artists in the Age of AI</h2>

          <div class="text-box">
            <p class="body-text">
              Artificial Intelligence is becoming an important part of modern creative work.
              Today, many artists, designers, writers, and photographers use AI tools to
              support their ideas, speed up their workflow, and explore new creative
              possibilities. Rather than replacing human creativity, AI works best as a
              collaborative partner that helps creators experiment and refine their work.
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              This website explores how humans and AI can work together in the creative
              process, also known as co-creation. Through examples, tools, and explanations,
              it shows how AI can assist creators while still keeping human imagination,
              judgment, and intent at the center of creative work.
            </p>
          </div>

          <div class="content-grid">
            <div class="learning-header">
              <p class="body-text">
                By understanding how to use AI responsibly and effectively, creators can
                expand their imagination while maintaining authorship and originality.
              </p>
              <p class="body-text">What You'll Learn</p>
            </div>

            <div class="learning-card">
              <p class="body-text">
                What co-creation means and how artists and AI collaborate creatively
              </p>
            </div>

            <div class="learning-card">
              <p class="body-text">
                How AI is used in creative software, such as tools in Adobe Photoshop
              </p>
            </div>

            <div class="learning-card">
              <p class="body-text">
                Using AI as a reference or assistant under human guidance rather than the
                final output
              </p>
            </div>

            <div class="learning-card">
              <p class="body-text">
                The ethical responsibilities of artists using AI within creative fields
              </p>
            </div>
          </div>

          <div class="closing-text">
            <p class="body-text">
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
.home-page {
  background: #e67db8;
}

.home-page__inner {
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
  color: #111;
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

.hero-image-container {
  width: 100%;
  max-width: 1280px;
  min-height: 320px;
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.hero-image {
  width: 100%;
  display: block;
  object-fit: cover;
}

.image-placeholder {
  min-height: 320px;
  display: grid;
  place-items: center;
  background: #ffba2f;
  font-family: 'Rethink Sans', sans-serif;
  color: #ffba2f;
}

.content-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1rem, 1vw, 5rem);
  padding: clamp(3rem, 10vw, 6rem) 0 0;
}

.caption-text {
  color: black;
  font-size: clamp(1.25rem, 1vw, 1.875rem);
  font-family: 'Helvetica', serif;
  font-weight: 400;
  line-height: 1.2;
  text-align: center;
  max-width: 1100px;
}

.main-title {
  color: black;
  font-size: clamp(2rem, 4vw, 6.25rem);
  font-family: 'Helvetica', serif;
  font-weight: 600;
  line-height: 1.1;
  text-align: center;
}

.body-text {
  color: black;
  font-size: clamp(1.15rem, 1vw, 1.6rem);
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

.content-grid {
  display: grid;
  min-height: 100px;
  max-width: 1000px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;
}

.learning-header,
.learning-card {
  background: #ffba2f;
  border-radius: 16px;
  padding: clamp(1.5rem, 5vw, 3rem);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.learning-header {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.learning-card {
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.closing-text {
  max-width: 1000px;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .hero-utility {
    border-radius: 12px;
  }

  .hero-image-container {
    min-height: 240px;
  }

  .image-placeholder {
    min-height: 240px;
  }
}
</style>