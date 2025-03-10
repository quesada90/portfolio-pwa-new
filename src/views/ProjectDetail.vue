<template>
  <div v-if="project" class="project-detail">
    <!-- Hero Section -->
    <section class="hero-project">
      <div class="project-title">
        <h6>{{ project.category }}</h6>
        <h2>{{ project.title }}</h2>
      </div>
      <img class="img-proyecto" :src="project.image" :alt="project.title">
    </section>

    <!-- Project Intro Section -->
    <main>
      <section class="project-intro">
        <div class="project-info">
          <ul>
            <li><strong>Año:</strong> {{ project.year }}</li>
            <li><strong>Autor:</strong> {{ project.author }}</li>
            <li><strong>Tipo:</strong> {{ project.type }}</li>
            <li><strong>Materiales:</strong> {{ project.materials }}</li>
            <li><strong>Medio:</strong> {{ project.medium }}</li>
            <li><strong>Dimensiones:</strong> {{ project.dimensions }}</li>
            <li><strong>Info:</strong> {{ project.info }}</li>
          </ul>
        </div>
        <div class="project-description">
          <p v-for="(paragraph, index) in projectDescription" :key="index">{{ paragraph }}</p>
        </div>
      </section>

      <!-- Project Details Section -->
      <section class="projects">
        <div 
          v-for="(detail, index) in project.details" 
          :key="index"
          :class="{'proyecto': index % 2 === 0, 'proyecto-inv': index % 2 !== 0}"
        >
          <img class="img-detail" :src="detail.image" :alt="detail.title">
          <div class="info-proyecto">
            <h2>{{ detail.title }}</h2>
            <p>{{ detail.description }}</p>
          </div>
        </div>
      </section>
    </main>
  </div>
  <div v-else class="loading-container">
    <div class="loading-spinner"></div>
    <p>Loading project...</p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import projectsData from '@/data/projects.json'

export default {
  name: 'SiteProjectDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const project = ref(null)
    
    // Split full description into paragraphs
    const projectDescription = computed(() => {
      if (!project.value || !project.value.fullDescription) return []
      return project.value.fullDescription.split(/\n\n+/)
    })
    
    onMounted(() => {
      const projectId = route.params.id
      const foundProject = projectsData.find(p => p.id === projectId)
      
      if (foundProject) {
        project.value = foundProject
        document.title = `${foundProject.title} - Javier Quesada`
      } else {
        // Project not found, redirect to home
        router.push('/')
      }
    })
    
    return {
      project,
      projectDescription
    }
  }
}
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
}

.loading-spinner {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #333;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.project-detail {
  animation: fadeIn 0.5s ease-in;
}

.hero-project {
  animation: titleFadeIn 0.6s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
</style>
