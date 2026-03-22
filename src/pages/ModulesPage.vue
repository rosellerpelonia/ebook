<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getStorageImageUrl } from '@/services/storage';

const exploreImage1Url = ref('');
const homeImageUrl = ref('');

const isLoading = ref(true);
const imageError = ref('');

onMounted(async () => {
  try {
    const [explore1, homeImg] = await Promise.all([
      getStorageImageUrl('explore-image-1.png'),
      getStorageImageUrl('hom-image.png'),
    ]);

    exploreImage1Url.value = explore1;
    homeImageUrl.value = homeImg;
  } catch (error) {
    console.error(error);
    imageError.value = 'Failed to load images from Firebase Storage.';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="explore-page">
    <nav class="nav-bar">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/explore" class="nav-link">Explore</RouterLink>
      <RouterLink to="/about-us" class="nav-link">About us</RouterLink>
      <RouterLink to="/credits" class="nav-link">Credits</RouterLink>
    </nav>

    <main class="page-shell">
      <section class="hero-section">
        <h1 class="page-title">What Is Co-Creation?</h1>
        <a href="#" class="join-link">Join us</a>
      </section>

      <section class="intro-section">
        <div class="text-block narrow">
          <p class="body-text">
            To co-create is to create something together resulting in
            something that neither could easily be created alone. In this
            context, co-creation with AI describes the collaborative
            process in which artists with the assistance of AI work
            together to develop ideas, content, and or solutions.
          </p>
        </div>

        <div class="two-column-section">
          <h2 class="section-subtitle">Artists provide the core elements of creativity, such as:</h2>

          <div class="bullet-grid">
            <div class="bullet-item">
              <span class="bullet">•</span>
              <p class="bullet-text">
                Vision – the main idea or concept of the project
              </p>
            </div>

            <div class="bullet-item">
              <span class="bullet">•</span>
              <p class="bullet-text">
                Theme – personal style and aesthetic judgment
              </p>
            </div>

            <div class="bullet-item">
              <span class="bullet">•</span>
              <p class="bullet-text">
                Direction – guiding the project toward a goal
              </p>
            </div>

            <div class="bullet-item">
              <span class="bullet">•</span>
              <p class="bullet-text">
                Meaning – giving the work emotional, cultural, or symbolic value
              </p>
            </div>
          </div>
        </div>

        <div class="two-column-section">
          <h2 class="section-subtitle">While AI supports the process by providing:</h2>

          <div class="bullet-grid">
            <div class="bullet-item">
              <span class="bullet">•</span>
              <p class="bullet-text">
                Suggestions – offering possible ideas or concepts
              </p>
            </div>

            <div class="bullet-item">
              <span class="bullet">•</span>
              <p class="bullet-text">
                Variations – generating multiple versions of a prompt
              </p>
            </div>

            <div class="bullet-item">
              <span class="bullet">•</span>
              <p class="bullet-text">
                Speed – quickly producing concepts and references that would take artists longer
              </p>
            </div>

            <div class="bullet-item">
              <span class="bullet">•</span>
              <p class="bullet-text">
                Exploration – helping creators test different combinations and possibilities
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="image-section">
        <div class="image-frame" v-if="exploreImage1Url && !isLoading">
          <img :src="exploreImage1Url" alt="Explore image 1" class="content-image" />
        </div>
        <div v-else-if="isLoading" class="image-placeholder">Loading image...</div>
        <div v-else class="image-placeholder">{{ imageError }}</div>

        <p class="caption-text">
          Caption: Cat Coquillette’s using ChatGPT image generation to find inspiration
        </p>

        <div class="text-block quote-block">
          <p class="quote-text">
            “Just like inspiration tools such as Pinterest, AI can be used to
            gather ideas and explore visual possibilities. However, artists
            should treat these results as inspiration rather than copying
            them directly.” - Cat Coquillette
          </p>
        </div>

        <div class="text-block medium">
          <p class="body-text">
            In her process, Cat Coquillette used AI image generation to quickly explore
            visual styles and concepts that could inspire her illustrations. The
            generated images helped her experiment with colors, themes, and
            compositions before developing her own artwork based on the ideas she
            found most interesting.
          </p>
        </div>

        <div class="text-block medium reference-block">
          <p class="body-text">
            Please refer to the link provided for more information:
          </p>
          <a href="#" class="reference-link">
            The Ethical Use of AI for Artists and Creative Entrepreneurs — CatCoq
          </a>
        </div>
      </section>

      <section class="image-section second-case-section">
        <div class="image-frame" v-if="homeImageUrl && !isLoading">
          <img :src="homeImageUrl" alt="Explore image 2" class="content-image" />
        </div>
        <div v-else-if="isLoading" class="image-placeholder">Loading image...</div>
        <div v-else class="image-placeholder">{{ imageError }}</div>

        <p class="caption-text">
          Caption: Zachary Kelbaugh’s stamp design after using DALL-E image generation to help with arm anatomy
        </p>

        <div class="text-block quote-block">
          <p class="quote-text">
            “I generated several options and kept the ones that had elements I liked,
            using them as references while I developed my own sketches.”
          </p>
        </div>

        <div class="text-block medium">
          <p class="body-text">
            To create the stamp design, Kelbaugh generated several AI images to study
            a difficult pose involving lighting, arm position, and costume details.
            He selected a few results that had useful elements and kept them beside
            his workspace while sketching in Procreate, gradually refining the drawing
            before inkig the final design. The AI images were used purely as references,
            while the final illustration was drawn and finished by the artist himself.
          </p>
        </div>

        <div class="text-block medium reference-block">
          <p class="body-text">
            Please refer to the link provided for more information:
          </p>
          <a href="#" class="reference-link">
            Disc Golf Art | I used AI to assist in making this stamp | Facebook
          </a>
        </div>

        <div class="text-block final-paragraph">
          <p class="body-text">
            Even though AI can generate ideas, us artists will make the final decisions.
            Depending on the artist’s workflow, AI assistance is used in situations where
            they need the most help in. The artist works on the product, chooses what to keep,
            what to change, and what the final work should appear visually as well as the purpose
            behind the final output. Because of this, AI is best understood as a tool or creative
            assistant, not the author.
          </p>
        </div>
      </section>
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

.explore-page {
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

.page-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem 4rem;
}

.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
}

.page-title {
  text-align: center;
  font-size: clamp(2.4rem, 6vw, 4.5rem);
  line-height: 1.08;
  font-weight: 700;
  margin: 1rem 0 2rem;
}

.join-link {
  color: #000;
  margin-bottom: 2.5rem;
  font-size: 0.95rem;
}

.intro-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-block {
  width: min(100%, 900px);
  margin: 0 auto 2.75rem;
}

.text-block.narrow {
  width: min(100%, 760px);
  margin-bottom: 3rem;
}

.text-block.medium {
  width: min(100%, 860px);
}

.body-text {
  font-size: clamp(1.05rem, 1.7vw, 1.6rem);
  line-height: 1.45;
  text-align: center;
  margin: 0;
}

.section-subtitle {
  text-align: center;
  font-size: clamp(1.1rem, 1.8vw, 1.6rem);
  font-weight: 700;
  margin: 0 0 2.25rem;
}

.two-column-section {
  width: min(100%, 980px);
  margin: 0 auto 3rem;
}

.bullet-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 5rem;
  row-gap: 2rem;
}

.bullet-item {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0.75rem;
  min-height: 110px;
}

.bullet {
  font-size: 1.5rem;
  line-height: 1;
  margin-top: 0.1rem;
}

.bullet-text {
  margin: 0;
  max-width: 260px;
  text-align: center;
  font-size: clamp(1rem, 1.45vw, 1.35rem);
  line-height: 1.35;
}

.image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.second-case-section {
  margin-top: 2rem;
}

.image-frame {
  width: min(100%, 1180px);
  border: 1px solid #666;
  background: #f5f5f5;
}

.content-image {
  width: 100%;
  height: auto;
  display: block;
}

.image-placeholder {
  width: min(100%, 1180px);
  min-height: 320px;
  display: grid;
  place-items: center;
  text-align: center;
  border: 1px solid #666;
  background: #f5f5f5;
}

.caption-text {
  width: min(100%, 980px);
  margin: 1.5rem auto 4rem;
  font-size: clamp(1rem, 1.5vw, 1.35rem);
  line-height: 1.4;
  text-align: center;
}

.quote-block {
  width: min(100%, 900px);
  margin-bottom: 2.5rem;
}

.quote-text {
  margin: 0;
  text-align: center;
  font-size: clamp(1.05rem, 1.7vw, 1.5rem);
  line-height: 1.45;
  font-weight: 700;
}

.reference-block {
  margin-top: 0.5rem;
}

.reference-link {
  display: inline-block;
  width: 100%;
  text-align: center;
  color: #000;
  font-size: clamp(1rem, 1.55vw, 1.35rem);
  line-height: 1.35;
}

.final-paragraph {
  width: min(100%, 980px);
  margin-top: 1.25rem;
  margin-bottom: 0;
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
  .bullet-grid {
    grid-template-columns: 1fr;
    column-gap: 0;
    row-gap: 1.5rem;
  }

  .bullet-item {
    min-height: auto;
  }

  .bullet-text {
    max-width: 340px;
  }

  .caption-text {
    margin-bottom: 2.5rem;
  }
}

@media (max-width: 768px) {
  .nav-bar {
    justify-content: center;
  }

  .page-title {
    margin-bottom: 1.5rem;
  }

  .join-link {
    margin-bottom: 2rem;
  }

  .text-block,
  .text-block.narrow,
  .text-block.medium,
  .two-column-section,
  .caption-text,
  .quote-block,
  .final-paragraph {
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