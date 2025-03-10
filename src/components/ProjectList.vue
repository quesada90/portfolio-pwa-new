<template>
  <section id="projects" class="projects">
    <div 
      v-for="(project, index) in projects" 
      :key="project.id" 
      class="proyecto"
      :class="{ 'reverse': index % 2 !== 0 }"
    >
      <img :src="project.image" :alt="project.title" class="img-proyecto">
      <div class="info-proyecto">
        <div>
          <h6>{{ project.category }}</h6>
          <h2>{{ project.title }}</h2>
        </div>
        <p>{{ project.description }}</p>
        <router-link :to="'/projects/' + project.id">Ver proyecto →</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import projectsData from '@/data/projects.json'

export default {
  name: 'ProjectList',
  data() {
    return {
      projects: projectsData
    }
  }
}
</script>

<style scoped>
.proyecto {
  animation: fadeIn 1s ease-in-out;
}

.reverse {
  flex-direction: row-reverse;
}

@media (max-width: 767px) {
  .reverse {
    flex-direction: column;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
