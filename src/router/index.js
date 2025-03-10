import { createRouter, createWebHistory } from 'vue-router'

// Import views
import Home from '../views/Home.vue'
import Contact from '../views/Contact.vue'
import ProjectDetail from '../views/ProjectDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Javier Quesada - Portfolio'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contact - Javier Quesada'
    }
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: ProjectDetail,
    props: true,
    meta: {
      title: 'Project - Javier Quesada'
    }
  },
  {
    // Redirect any unmatched routes to home
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // Scroll to top on route navigation
  scrollBehavior() {
    return { top: 0 }
  }
})

// Dynamic document title based on route
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Javier Quesada Portfolio'
  next()
})

export default router
