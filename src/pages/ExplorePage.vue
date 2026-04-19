<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { getStorageImageUrl } from '@/services/storage';

type ImageKey =
  | 'explore1'
  | 'homeImage'
  | 'explore2'
  | 'explore3'
  | 'explore4'
  | 'explore5'
  | 'explore6'
  | 'explore7'
  | 'explore8'
  | 'explore9'
  | 'explore10'
  | 'explore11'
  | 'explore12'
  | 'explore13'
  | 'explore14'
  | 'explore15'
  | 'explore16'
  | 'explore17'
  | 'explore18';

const imagePaths: Record<ImageKey, string> = {
  explore1: 'explore-image-1.png',
  homeImage: 'hom-image.png',
  explore2: 'explore-image-2.png',
  explore3: 'explore-image-3.png',
  explore4: 'explore-image-4.png',
  explore5: 'explore-image-5.png',
  explore6: 'explore-image-6.gif',
  explore7: 'explore-image-7.gif',
  explore8: 'explore-image-8.png',
  explore9: 'explore-image-9.png',
  explore10: 'explore-image-10.gif',
  explore11: 'explore-image-11.png',
  explore12: 'explore-image-12.png',
  explore13: 'explore-image-13.png',
  explore14: 'explore-image-14.png',
  explore15: 'explore-image-15.png',
  explore16: 'explore-image-16.png',
  explore17: 'explore-image-17.png',
  explore18: 'explore-image-18.png',
};

const imageUrls = reactive<Record<ImageKey, string>>({
  explore1: '',
  homeImage: '',
  explore2: '',
  explore3: '',
  explore4: '',
  explore5: '',
  explore6: '',
  explore7: '',
  explore8: '',
  explore9: '',
  explore10: '',
  explore11: '',
  explore12: '',
  explore13: '',
  explore14: '',
  explore15: '',
  explore16: '',
  explore17: '',
  explore18: '',
});

const isLoading = ref(true);
const imageErrors = ref<string[]>([]);

onMounted(async () => {
  const loaders = Object.entries(imagePaths).map(async ([key, path]) => {
    try {
      imageUrls[key as ImageKey] = await getStorageImageUrl(path);
    } catch (error) {
      console.error(`Failed to load image: ${path}`, error);
      imageErrors.value.push(path);
    }
  });

  await Promise.all(loaders);
  isLoading.value = false;
});

const hasImageErrors = computed(() => imageErrors.value.length > 0);
</script>

<template>
  <MainLayout>
    <section class="explore-page">
      <div class="explore-page__inner">
        <section class="page-hero">

          <h1 class="hero-title">What Is Co-Creation?</h1>

        </section>

        <section v-if="isLoading" class="status-box">
          Loading explore images...
        </section>

        <section v-else-if="hasImageErrors" class="status-box status-box--warning">
          Some images could not be loaded from Firebase Storage:
          <br />
          {{ imageErrors.join(', ') }}
        </section>

        <!-- 1. WHAT IS CO-CREATION -->
        <section class="content-section">
          <div class="text-box">
            <p class="body-text">
              To cocreate is to create something together resulting in something that neither
              could easily be created alone. In this context, co-creation with AI describes
              the collaborative process in which artists with the assistance of AI work
              together to develop ideas, content, and or solutions.
            </p>
          </div>

          <div class="content-grid">
            <div class="learning-header">
              <p class="body-text">
                Artists provide the core elements of creativity, such as:
              </p>
            </div>
            <div class="learning-card">
              <p class="body-text">Vision – the main idea or concept of the project</p>
            </div>
            <div class="learning-card">
              <p class="body-text">Theme – personal style and aesthetic judgment</p>
            </div>
            <div class="learning-card">
              <p class="body-text">Direction – guiding the project toward a goal</p>
            </div>
            <div class="learning-card">
              <p class="body-text">
                Meaning – giving the work emotional, cultural, or symbolic value
              </p>
            </div>

            <div class="learning-header">
              <p class="body-text">
                While AI supports the process by providing:
              </p>
            </div>
            <div class="learning-card">
              <p class="body-text">Suggestions – offering possible ideas or concepts</p>
            </div>
            <div class="learning-card">
              <p class="body-text">
                Variations – generating multiple versions of a prompt
              </p>
            </div>
            <div class="learning-card">
              <p class="body-text">
                Speed – quickly producing concepts and references that would take artists
                longer
              </p>
            </div>
            <div class="learning-card">
              <p class="body-text">
                Exploration – helping creators test different combinations and possibilities
              </p>
            </div>
          </div>
        </section>

        <section class="image-section">
          <img v-if="imageUrls.explore1" :src="imageUrls.explore1"
            alt="Cat Coquillette using ChatGPT image generation to find inspiration" class="section-image" />
          <div class="caption-box">
            <p class="body-text">
              Caption: Cat Coquillette's using ChatGPT image generation to find inspiration
            </p>
          </div>
        </section>

        <section class="content-section">
          <div class="text-box quote-box">
            <p class="body-text">
              "Just like inspiration tools such as Pinterest, AI can be used to gather ideas
              and explore visual possibilities. However, artists should treat these results
              as inspiration rather than copying them directly." - Cat Coquillette
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              In her process, Cat Coquillette used AI image generation to quickly explore
              visual styles and concepts that could inspire her illustrations. The generated
              images helped her experiment with colors, themes, and compositions before
              developing her own artwork based on the ideas she found most interesting.
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              Please refer to the link provided for more information:
            </p>
            <a href="https://catcoq.com/blog/ethical-ai-for-artists" target="_blank" rel="noopener noreferrer"
              class="hero-utility__link">
              The Ethical Use of AI for Artists and Creative Entrepreneurs — CatCoq
            </a>
          </div>
        </section>

        <section class="image-section">
          <img v-if="imageUrls.homeImage" :src="imageUrls.homeImage" alt="Zachary Kelbaugh stamp design"
            class="section-image" />
          <div class="caption-box">
            <p class="body-text">
              Caption: Zachary Kelbaugh's stamp design after using DALL-E image generation to
              help with arm anatomy
            </p>
          </div>

          <div class="text-box quote-box">
            <p class="body-text">
              "I generated several options and kept the ones that had elements I liked, using
              them as references while I developed my own sketches."
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              To create the stamp design, Kelbaugh generated several AI images to study a
              difficult pose involving lighting, arm position, and costume details. He
              selected a few results that had useful elements and kept them beside his
              workspace while sketching in Procreate, gradually refining the drawing before
              inking the final design. The AI images were used purely as references, while
              the final illustration was drawn and finished by the artist himself.
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              Please refer to the link provided for more information:
            </p>
            <a href="https://www.facebook.com/groups/discgolfart/posts/8070716616277225/" target="_blank"
              rel="noopener noreferrer" class="hero-utility__link">
              Disc Golf Art | I used AI to assist in making this stamp | Facebook
            </a>
          </div>

          <div class="text-box">
            <p class="body-text">
              Even though AI can generate ideas, us artists will make the final decisions.
              Depending on the artist's workflow, AI assistance is used in situations where
              they need the most help in. The artist works on the product, chooses what to
              keep, what to change, and what the final work should appear visually as well as
              the purpose behind the final output. Because of this, AI is best understood as
              a tool or creative assistant, not the author.
            </p>
          </div>
        </section>

        <!-- 2. HOW ARTISTS USE AI -->
        <section class="content-section">
          <h2 class="main-title">How Artists Use AI</h2>

          <div class="text-box">
            <p class="body-text">
              Artists often use AI as a tool to help them experiment with ideas and assist
              with time-consuming parts of the creative process either from external Ai
              websites to built-in smart software tool features. From these 2 case studies
              provided below, AI assistance in their workflow act as visual references that
              help the artist explore possibilities more quickly before refining the final
              artwork manually in their own style.
            </p>
          </div>
        </section>

        <section class="content-section">
          <h2 class="main-title">Case Study 1: Gary Hanna's AI-Assisted Workflow</h2>

          <div class="text-box">
            <p class="body-text">
              Digital artist Gary Hanna shares how he uses AI as part of his creative process
              while still maintaining full artistic control over the final result.
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              In his workflow, AI is mainly used during the early idea generation stage. The
              artist begins by generating multiple visual concepts using AI tools to explore
              possible compositions, lighting, and environments. These AI outputs act as
              inspiration, similar to a mood board.
            </p>
          </div>

          <div class="content-grid">
            <div class="learning-header">
              <p class="body-text">
                After selecting the most interesting results, the artist then:
              </p>
            </div>
            <div class="learning-card">
              <p class="body-text">sketches over the generated images</p>
            </div>
            <div class="learning-card">
              <p class="body-text">adjusts composition and perspective</p>
            </div>
            <div class="learning-card">
              <p class="body-text">modifies design elements</p>
            </div>
            <div class="learning-card">
              <p class="body-text">repaints and refines details manually</p>
            </div>
          </div>

          <div class="text-box">
            <p class="body-text">
              Instead of producing the final artwork, the AI helps the artist quickly explore
              visual ideas that would normally take much longer to develop manually. The
              final artwork is still shaped through the artist's own drawing, painting, and
              editing decisions.
            </p>
          </div>
        </section>

        <section class="image-section">
          <div class="text-box">
            <p class="body-text">
              Please refer to the link provided for more information:
            </p>
            <a href="https://www.facebook.com/groups/discgolfart/posts/8070716616277225/" target="_blank"
              rel="noopener noreferrer" class="hero-utility__link">
              Disc Golf Art | I used AI to assist in making this stamp | Facebook
            </a>
          </div>

          <img v-if="imageUrls.explore2" :src="imageUrls.explore2" alt="Gary Hanna AI assisted workflow"
            class="section-image" />
          <img v-if="imageUrls.explore3" :src="imageUrls.explore3" alt="Gary Hanna process images"
            class="section-image" />
          <div class="caption-box">
            <p class="body-text">
              Caption: Gary Hanna's art process with the goal to speed up their workflow
              using Stable Diffusion XL
            </p>
          </div>
        </section>

        <section class="content-section">
          <h2 class="main-title">
            Case Study 2: Wu Jin Long's AI-Assisted Illustration Process
          </h2>

          <div class="text-box">
            <p class="body-text">
              Digital artist Wu Jin Long demonstrated how AI can be integrated into a full
              illustration workflow while still relying on traditional artistic skills.
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              For his artwork Dreamwalkers: The Origin of the Worlds, he first generated
              visual inspiration using AI tools such as DALL·E 3 and Midjourney to explore
              possible compositions and color ideas. After gathering inspiration, he created
              pencil sketches to plan the scene and overall layout.
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              The sketch was then used to generate additional AI variations, helping the
              artist experiment with different lighting and color palettes. Using these
              references, he continued refining the artwork digitally in Procreate and later
              finalized the piece in Adobe Photoshop, where he added details, fixed
              artifacts, and improved the overall composition.
            </p>
          </div>
        </section>

 <section class="content-section">
          <h2 class="main-title">
           Branding Consistency
          </h2>

          <div class="text-box">
            <p class="body-text">
              AI is also transforming how artists approach branding by assisting with visual 
              consistency, color decisions, and user interface design. These tools help streamline 
              creative workflows while maintaining strong brand identity across different platforms.
              Some design platforms now include AI-powered color tools that help designers create 
              cohesive and appealing palettes based on brand identity or mood.
            </p>
          </div>

          <h2 class="main-title">Coolers</h2>
          <div class="text-box">
            <p class="body-text">
              Coolors generate color palettes based on user preferences. Designers can use the AI 
              by selecting colors they like, and the system will generate combinations tailored to 
              their taste. This helps in developing brand color schemes that are visually harmonious 
              and aligned with a brand’s personality and allows users to quickly explore variations 
              for branding projects. <br>
              Coolors is also a feature that can be used in Figma, which is ideal for UI UX projects.
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              There is also a color contrast checker by Coolors to see if your chosen colors are an 
              ideal match in terms of text color and background color for readability.
            </p>
          </div>
        </section>

        <h2 class="main-title">Uizard</h2>
        <div class="text-box">
            <p class="body-text">
              Uizard allows designers to generate UI layouts from text prompts, sketches, or 
              wireframes. It can transform hand-drawn ideas into digital mockups, making it useful 
              for quickly prototyping app or website designs. This is ideal for artists who do not 
              know how to code and the UI is simple to navigate around, similar to Canva. 
              </p>
          </div>

        <section class="image-section">
          <img v-if="imageUrls.explore4" :src="imageUrls.explore4" alt="Wu Jin Long artwork" class="section-image" />
        </section>

        <section class="content-section">
          <div class="text-box">
            <p class="body-text">
              You can drag and drop an image of what your desired UI design, and it will generate it
              for you from the buttons and text placements to the overall layout and structure of the 
              interface. The tool analyzes the visual elements in the uploaded image and converts them 
              into editable UI components, allowing designers to quickly transform ideas into functional 
              prototypes.
            </p>
          </div>

        </section>


        <h2 class="main-title">Canva’s Brand Kit</h2>
        <div class="text-box">
            <p class="body-text">
              Canva’s Brand Kit allows designers to store brand assets such as logos, fonts, 
              colors, and templates directly to the design platform. Once set up, these elements 
              can be automatically applied to any design, ensuring that all outputs follow the same 
              visual identity. This reduces the need to manually check brand guidelines every time 
              a new design is created.
              </p>
          </div>

        <section class="image-section">
          <img v-if="imageUrls.explore4" :src="imageUrls.explore4" alt="Wu Jin Long artwork" class="section-image" />
        </section>

          <div class="text-box">
            <p class="body-text">
              The tool also integrates with their AI-powered features like Magic Studio in Canva, 
              allowing designs to be generated or adjusted while keeping brand elements consistent. 
              This means that even AI-generated layouts or content will follow predefined brand 
              styles, improving efficiency while maintaining accuracy.Another useful feature is the 
              ability to manage multiple Brand Kits for different campaigns or sub-brands. Designers 
              can quickly switch between them, making it easier to maintain consistency across 
              various projects without confusion.
              </p>
          </div>

        <!-- 3. AI INSIDE ADOBE PHOTOSHOP -->
        <section class="content-section">
          <h2 class="main-title">AI Inside Adobe Photoshop</h2>
        </section>

        <section class="content-section">
          <h2 class="main-title">Generative Fill</h2>

          <div class="text-box">
            <p class="body-text">
              Generative Fill is an AI feature that allows users to add, remove, or modify
              parts of an image using text prompts.
            </p>
          </div>

          <div class="content-grid">
            <div class="learning-header">
              <p class="body-text">How to use Generative Fill</p>
            </div>
            <div class="learning-card">
              <p class="body-text">Open an image in Photoshop</p>
            </div>
            <div class="learning-card">
              <p class="body-text">Select the area you want to edit</p>
            </div>
            <div class="learning-card">
              <p class="body-text">Click Generative Fill</p>
            </div>
            <div class="learning-card">
              <p class="body-text">Enter a text prompt (optional)</p>
            </div>
            <div class="learning-card">
              <p class="body-text">Choose from several AI-generated results</p>
            </div>
          </div>

          <img v-if="imageUrls.explore6" :src="imageUrls.explore6" alt="Generative Fill demo" class="section-image" />

          <div class="text-box">
            <p class="body-text">Video embedded on the web article with thumbnail</p>
            <a href="https://www.youtube.com/watch?v=Sp6K3qpVFO0" target="_blank" rel="noopener noreferrer"
              class="hero-utility__link">
              Introduction to Generative Fill | Adobe Photoshop
            </a>
          </div>
        </section>

        <section class="content-section">
          <h2 class="main-title">Content-Aware Fill</h2>

          <div class="text-box">
            <p class="body-text">
              Content-Aware Fill removes objects from an image and automatically fills the
              empty space using surrounding textures and details.
            </p>
          </div>

          <div class="content-grid">
            <div class="learning-header">
              <p class="body-text">How to use Content-Aware Fill</p>
            </div>
            <div class="learning-card">
              <p class="body-text">
                Select the object you want to remove with a Lasso tool
              </p>
            </div>
            <div class="learning-card">
              <p class="body-text">Choose Edit → Content-Aware Fill</p>
            </div>
            <div class="learning-card">
              <p class="body-text">Adjust the preview if needed</p>
            </div>
            <div class="learning-card">
              <p class="body-text">Apply the fill</p>
            </div>
          </div>

          <img v-if="imageUrls.explore7" :src="imageUrls.explore7" alt="Content-Aware Fill demo"
            class="section-image" />

          <div class="text-box">
            <p class="body-text">Video embedded on the web article with thumbnail</p>
            <a href="https://www.youtube.com/watch?v=B6dS3zYlJW8" target="_blank" rel="noopener noreferrer"
              class="hero-utility__link">
              Content-Aware Fill in Photoshop | Learn from the Experts | Adobe Creative Cloud
            </a>
          </div>
        </section>

        <section class="content-section">
          <h2 class="main-title">AI Selection &amp; Masking</h2>

          <div class="text-box">
            <p class="body-text">
              Tools like Select Subject or Object Selection automatically detect and isolate
              objects in a photo. This makes it easier to select complex shapes such as hair
              or fur without manually outlining them, allowing artists to change backgrounds
              or combine images much faster.
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">Video embedded on the web article with thumbnail</p>
            <a href="https://www.youtube.com/watch?v=lgeYBcriWk4" target="_blank" rel="noopener noreferrer"
              class="hero-utility__link">
              Select and Mask in Photoshop | Learn from the Experts | Adobe Creative Cloud
            </a>
          </div>
        </section>

        <section class="content-section">
          <h2 class="main-title">Smart Retouching Tools</h2>

          <div class="text-box">
            <p class="body-text">
              Tools such as Spot Healing Brush, Healing Brush, and Patch Tool help fix
              imperfections in photos by analyzing nearby pixels and blending them naturally
              into the edited area. This allows users to quickly remove blemishes or
              unwanted marks while keeping the image looking clean and polished.
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">Video embedded on the web article with thumbnail</p>
              <a href="https://www.youtube.com/watch?v=30lc8fW7m2Y" target="_blank" rel="noopener noreferrer"
              class="hero-utility__link">
              Photoshop - 5 Basic Retouching Tools
            </a>
          </div>
        </section>

        <section class="content-section">
          <div class="text-box quote-box">
            <p class="body-text">
              These examples show some of the fundamental AI-assisted tools in Adobe
              Photoshop that are widely used by artists and designers. By simplifying tasks
              such as object removal, selection, and image generation, these features
              support the creative process and enable users to explore ideas more
              efficiently.
            </p>
          </div>
        </section>

                <section class="content-section">
          <div class="text-box quote-box">
            <p class="body-text">
              These AI tools simplify technical processes and improve efficiency. However, they
              do not replace the role of the artist.

              The artist still decides how the final image is presented and interpreted, which 
              is a key part of Brand Communication. Through layout, composition, and design choices, 
              artists guide how their work is understood by the audience.
            </p>
          </div>
        </section>

        <!-- 4. AI INSIDE OTHER DIGITAL SOFTWARES -->
        <section class="content-section">
          <h2 class="main-title">AI Inside Other Digital Softwares</h2>

          <div class="text-box">
            <p class="body-text">
              AI features are also being introduced in other illustration programs to help
              artists speed up workflows and improve drawing accuracy. These tools often
              assist with tasks such as line art creation, automatic coloring, and pose
              referencing.
            </p>
          </div>
        </section>

        <section class="content-section">
          <h2 class="main-title">AI Line Art Assistance Tool in Krita</h2>

          <div class="text-box">
            <p class="body-text">
              Some illustration programs experiment with AI tools that help artists refine
              sketches into clean line art. One example is the Fast Line Art project in
              Krita.
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              Fast Line Art is an experimental AI feature that converts rough sketches into
              clean line art using neural networks. Instead of manually tracing over a sketch
              multiple times, the tool automatically generates smoother lines that follow the
              artist's original drawing.
            </p>
          </div>

          <img v-if="imageUrls.explore8" :src="imageUrls.explore8" alt="Krita Fast Line Art example"
            class="section-image" />
          <img v-if="imageUrls.explore9" :src="imageUrls.explore9" alt="Krita Fast Line Art process"
            class="section-image" />

          <div class="text-box">
            <p class="body-text">
              This tool is designed to assist artists on linework rather than generate
              entirely new artwork, meaning it closely follows the sketch provided by the
              user.
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              Please refer to the link provided for more information:
            </p>
              <a href="https://krita-artists.org/t/introducing-a-new-project-fast-line-art/94265" target="_blank" rel="noopener noreferrer"
              class="hero-utility__link">
              Introducing a New Project: Fast Line Art
            </a>
          </div>
        </section>

        <section class="content-section">
          <h2 class="main-title">User-made Image Generation Tools in Krita</h2>

          <div class="text-box">
            <p class="body-text">
              Because Krita is open-source software, developers and artists can create
              additional tools and extensions that expand its capabilities. One example is
              Krita AI by Acly, which integrates AI image generation features directly inside
              the program and function similarly to Adobe Photoshop's AI features.
            </p>
          </div>

          <img v-if="imageUrls.explore10" :src="imageUrls.explore10" alt="Krita AI diffusion interface"
            class="section-image" />

          <div class="text-box">
            <p class="body-text">
              This tool allows artists to generate images from text prompts or from existing
              sketches within the Krita workspace with the help of Stable Diffusion AI.
              Artists can use it to quickly create concept ideas, experiment with
              compositions, or generate references that help guide their illustrations.
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              Please refer to the link provided for more information:
            </p>
              <a href="https://www.youtube.com/watch?v=Ly6USRwTHe0" target="_blank" rel="noopener noreferrer"
              class="hero-utility__link">
              Generative AI for Krita - With ControlNet
            </a>
          </div>
        </section>

        <section class="content-section">
          <h2 class="main-title">AI Tools in Clip Studio Paint</h2>

          <div class="text-box">
            <p class="body-text">
              Clip Studio Paint includes several AI-based tools that assist artists with
              coloring, posing, and image adjustments.
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              <strong>AI Colorize</strong><br />
              The Colorize feature automatically fills line drawings with colors using
              machine learning. Artists can either let the AI generate colors automatically
              or provide color hints for more control.
            </p>
          </div>

          <img v-if="imageUrls.explore11" :src="imageUrls.explore11" alt="Clip Studio Paint AI Colorize"
            class="section-image" />

          <div class="text-box">
            <p class="body-text">
              <strong>Pose Scanner</strong><br />
              Pose Scanner is an AI feature that extracts poses from photos and applies them
              to 3D drawing figures in the program.
            </p>
          </div>

          <img v-if="imageUrls.explore12" :src="imageUrls.explore12" alt="Clip Studio Paint Pose Scanner"
            class="section-image" />
          <img v-if="imageUrls.explore13" :src="imageUrls.explore13" alt="Clip Studio Paint Pose Scanner example"
            class="section-image" />

          <div class="text-box">
            <p class="body-text">
              <strong>Smart Smoothing</strong><br />
              Smart Smoothing is another AI-assisted tool that improves image quality by
              smoothing jagged edges and reducing noise when images are enlarged or edited.
              This feature is also common on other digital software like Adobe Photoshop and
              IbisPaintX.
            </p>
          </div>

          <img v-if="imageUrls.explore14" :src="imageUrls.explore14" alt="Clip Studio Paint Smart Smoothing 1"
            class="section-image" />
          <img v-if="imageUrls.explore15" :src="imageUrls.explore15" alt="Clip Studio Paint Smart Smoothing 2"
            class="section-image" />

          <div class="text-box">
            <p class="body-text">
              Please refer to the link provided for more information:
            </p>
              <a href="https://help.clip-studio.com/en-us/manual_en/390_filters/AI_Tools.htm" target="_blank" rel="noopener noreferrer"
              class="hero-utility__link">
              Clip Studio Paint Official User Guide
            </a>
          </div>
        </section>

        <!-- 5. ETHICS -->
        <section class="content-section">
          <h2 class="main-title">Ethics &amp; Creative Responsibility in AI Art</h2>

          <div class="text-box">
            <p class="body-text">
              Ethical use of AI is also an important part of Brand Communication, as it affects 
              how audiences perceive and trust the artist. Transparency about AI usage helps 
              communicate honesty, while proper credit and responsible practices show respect for 
              other creators. These actions strengthen the artist’s credibility and relationship 
              with their audience. In this way, communication is not only about visuals, but also 
              about values and responsibility.

            </p>
          </div>
        </section>

        <section class="content-section">
          <div class="text-box">
            <h2 class="main-title">Transparency</h2>
            <p class="body-text">
              Creators should clearly explain when and how AI tools are used. Being open
              about AI involvement helps maintain trust with audiences and collaborators.
            </p>
          </div>

          <div class="text-box">
            <h2 class="main-title">Credit and Consent</h2>
            <p class="body-text">
              Many AI models are trained using large collections of existing creative works.
              This raises concerns about credit, ownership, and fair compensation for
              original creators.
            </p>
          </div>

          <div class="text-box">
            <h2 class="main-title">Avoiding Over-Reliance</h2>
            <p class="body-text">
              While AI can make tasks easier, relying too heavily on it may reduce creative
              engagement and skill development. Humans should still stay actively involved in
              the creative process.
            </p>
          </div>

          <div class="text-box">
            <h2 class="main-title">Authenticity</h2>
            <p class="body-text">
              Real creative meaning often comes from human experiences, emotions, and
              cultural context. AI should enhance creativity without replacing the artist's
              personal voice.
            </p>
          </div>
        </section>

        <section class="content-section">
          <div class="text-box">
            <h2 class="main-title">
              PHILRECA Digital Poster-Making Contest Controversy
            </h2>
            <p class="body-text">
              One example of these concerns occurred in a nationwide digital poster-making
              contest organized by the Philippine Rural Electric Cooperatives Association
              (PHILRECA). The competition faced backlash after an artwork suspected of being
              AI-generated was recognized by a local electric cooperative. Many online users
              questioned the decision because the contest rules required entries to be
              original works and emphasized creativity and unique design.
            </p>
          </div>

          <img v-if="imageUrls.explore16" :src="imageUrls.explore16" alt="PHILRECA contest artwork"
            class="section-image" />
          <img v-if="imageUrls.explore17" :src="imageUrls.explore17" alt="Contest winner ceremony"
            class="section-image" />

          <div class="caption-box">
            <p class="body-text">
              Caption: AI-generated artwork that was recognized in the PHILRECA digital
              poster-making contest alongside a photo of the contest winner with the judges
              during the awarding ceremony
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              Critics argued that allowing AI-generated images in the competition could
              undermine the effort and skill of artists who created their work manually. The
              incident sparked discussions online about transparency and whether AI-generated
              images should be allowed in art competitions as well as educating others who
              are not knowledgeable about AI art.
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              Please refer to the link provided for more information:
            </p>
              <a href="https://interaksyon.philstar.com/trends-spotlights/2024/09/13/283483/poster-making-contest-draws-flak-for-recognizing-ai-generated-work/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="hero-utility__link">
              Digit-AI art? Poster-making contest draws flak for recognizing 'AI-generated'
              work
            </a>
          </div>
        </section>

        <section class="content-section">
          <div class="text-box">
            <h2 class="main-title">DeviantArt's DreamUp AI Controversy</h2>
            <p class="body-text">
              Another example is the controversy surrounding DreamUp, an AI image generator
              introduced by DeviantArt. Many artists criticized the tool because the AI
              model Stable Diffusion were trained on large datasets that may have included
              artworks from users without their clear consent. What's worse was that the
              feature is enabled by default when introduced and to opt-out of the service
              will take a few days.
            </p>
          </div>

          <img v-if="imageUrls.explore18" :src="imageUrls.explore18" alt="DreamUp AI samples" class="section-image" />

          <div class="caption-box">
            <p class="body-text">
              Caption: Sample AI-generated images produced using DreamUp
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              This raised concerns about artist rights, ownership, and whether AI-generated
              images were benefiting from the styles and labor of human creators. The issue
              sparked widespread discussions about transparency and how artists' works are
              used in training AI systems.
            </p>
          </div>

          <div class="text-box">
            <p class="body-text">
              Please refer to the link provided for more information:
            </p>
              <a href="https://www.deviantart.com/team/journal/933537821" target="_blank" rel="noopener noreferrer"
              class="hero-utility__link">
              Create AI-Generated Art Fairly with DreamUp by Team on DeviantArt
            </a>
          </div>
        </section>
      </div>
    </section>
  </MainLayout>
</template>

<style scoped>
.explore-page {
  background: #e67db8;
}

.explore-page__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 2rem) clamp(1rem, 3vw, 1.25rem) clamp(3rem, 8vw, 6rem);
}

.page-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-utility {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  background:  ##ffba2f;
  border-radius: 16px;
  padding: 1rem 1.25rem;
}

.hero-utility--top {
  margin-bottom: clamp(2rem, 6vw, 3rem);
  text-align: left;
}

.hero-utility--bottom {
  margin-top: clamp(1.5rem, 5vw, 2.5rem);
  margin-bottom: clamp(3rem, 8vw, 4.5rem);
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

.main-title {
  color: black;
  font-size: clamp(2.5rem, 7vw, 4.375rem);
  font-family: 'Helvetica', serif;
  font-weight: 600;
  line-height: 1.1;
  text-align: center;
}

.body-text {
  color: black;
  font-size: clamp(1.15rem, 5vw, 1.6rem);
  font-family: 'Gowun Batang', serif;
  font-weight: 500;
  line-height: 1.35;
  text-align: justify;
}

.content-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(2rem, 6vw, 3.5rem);
  padding: clamp(2rem, 6vw, 3rem) 0 0;
}

.text-box {
  width: 100%;
  max-width: 1000px;
  background: #ffba2f;
  border-radius: 16px;
  padding: clamp(1.5rem, 5vw, 3rem);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.quote-box {
  font-weight: 700;
}

.content-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
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

.image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-top: clamp(2rem, 6vw, 3rem);
}

.section-image {
  width: 100%;
  display: block;
  border-radius: 18px;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  background: #f3f3f3;
}

.caption-box {
  width: 100%;
  max-width: 1100px;
  text-align: justify;
}

.status-box {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto 2rem;
  background: #ffba2f;
  padding: 1rem 1.25rem;
  text-align: center;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  font-family: 'Rethink Sans', sans-serif;
}

.status-box--warning {
  background:  #ffba2f;
  color:  #000000;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .hero-utility {
    border-radius: 12px;
  }
}
</style>