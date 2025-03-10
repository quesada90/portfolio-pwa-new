<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-home">
      <div class="main-title">
        <h1>This is <br>my portfolio</h1>
        <div class="go-bottom"><a href="#projects" @click.prevent="scrollToProjects">⇩</a></div>
      </div>
    </section>

    <!-- Projects Section -->
    <ProjectList id="projects" />

    <!-- Gallery Section -->
    <Gallery />
  </div>
</template>

<script>
import ProjectList from '@/components/ProjectList.vue'
import Gallery from '@/components/Gallery.vue'

export default {
  name: 'SiteHome',
  components: {
    ProjectList,
    Gallery
  },
  methods: {
    scrollToProjects() {
      const projectsSection = document.getElementById('projects')
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  },
  mounted() {
    // Check if URL has hash and scroll to the section
    if (this.$route.hash) {
      setTimeout(() => {
        const element = document.querySelector(this.$route.hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    }
  }
}
</script>

<style>
.hero-home {
  position: relative;
  background: center url('../assets/img/pajaros.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -70px;
}

.main-title {
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-transform: uppercase;
}

.main-title h1 {
  font-size: var(--font-size-xxl);
  margin-bottom: 1rem;
  animation: titleFadeIn 0.6s ease-in;
}

.go-bottom a {
  color: white;
  font-size: var(--font-size-xl);
  text-decoration: none;
  position: absolute;
  bottom: 20px;
  transition: all 0.3s;
  margin: 0 auto;
  animation: translate 1s ease-in-out 1.5s infinite alternate-reverse;
}

@keyframes titleFadeIn {
  from {
    opacity: 0;
    transform: translateY(20%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes translate {
  from {
    transform: translateY(50%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
