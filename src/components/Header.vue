<template>
  <header>
    <nav :class="{ 'nav-dark': !isHomePage }">
      <router-link to="/" class="logo">
        Javier <br> Quesada
      </router-link>
      <ul class="menu" :class="{ 'menu-open': menuOpen }">
        <li><router-link to="/" @click="closeMenu">Home</router-link></li>
        <li><router-link to="/#projects" @click="scrollToProjects">Projects</router-link></li>
        <li><router-link to="/contact" @click="closeMenu">Contact</router-link></li>
      </ul>
      <div class="menu-toggle" 
          @click="toggleMenu" 
          v-if="isMobile"
          aria-expanded="menuOpen"
          aria-label="Toggle navigation menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'SiteHeader',
  data() {
    return {
      menuOpen: false,
      isMobile: false
    }
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/'
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
      document.body.classList.toggle('no-scroll', this.menuOpen)
    },
    closeMenu() {
      if (this.menuOpen) {
        this.menuOpen = false
        document.body.classList.remove('no-scroll')
      }
    },
    scrollToProjects() {
      this.closeMenu()
      if (this.$route.path === '/') {
        const projectsSection = document.getElementById('projects')
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        this.$router.push('/')
        setTimeout(() => {
          const projectsSection = document.getElementById('projects')
          if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' })
          }
        }, 500)
      }
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768
      if (!this.isMobile && this.menuOpen) {
        this.closeMenu()
      }
    }
  },
  mounted() {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize)
  }
}
</script>

<style scoped>
.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
  z-index: 20;
}

.menu-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: var(--text-color);
  transition: all 0.3s ease;
}

.nav-dark .menu-toggle span {
  background-color: black;
}

@media (max-width: 767px) {
  .menu-toggle {
    display: flex;
  }

  .menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.95);
    transition: right 0.3s ease;
    z-index: 10;
  }

  .menu-open {
    right: 0;
  }

  .menuOpen .menu-toggle span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .menuOpen .menu-toggle span:nth-child(2) {
    opacity: 0;
  }
  
  .menuOpen .menu-toggle span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }

  .menu li {
    margin: 20px 0;
  }

  .menu a {
    color: black !important;
    font-size: 1.5rem;
  }
}

.no-scroll {
  overflow: hidden;
}
</style>
