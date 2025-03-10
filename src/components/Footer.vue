<template>
  <footer>
    <nav>
      <div>
        <router-link to="/">This is my portfolio</router-link>
        <br>&copy; {{ currentYear }}
      </div>
      <ul>
        <li><a href="#" @click.prevent="openPrivacyPolicy">Privacy policy</a></li>
        <li><a href="#" @click.prevent="openTermsOfUse">Terms of use</a></li>
        <li><a href="#" @click.prevent="installPWA" v-if="showInstallButton">Install App</a></li>
      </ul>
    </nav>
    
    <!-- Modal for policies -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">&times;</button>
        <h2>{{ modalTitle }}</h2>
        <div v-html="modalContent"></div>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'

export default {
  name: 'SiteFooter',
  setup() {
    const currentYear = computed(() => new Date().getFullYear())
    const showModal = ref(false)
    const modalTitle = ref('')
    const modalContent = ref('')
    const showInstallButton = ref(false)
    let deferredPrompt = null
    
    const openPrivacyPolicy = () => {
      modalTitle.value = 'Privacy Policy'
      modalContent.value = `
        <p>Last updated: ${new Date().toLocaleDateString()}</p>
        <p>This Privacy Policy describes how we collect, use, and disclose your information when you use our service.</p>
        <h3>Information Collection</h3>
        <p>We collect information that you provide directly to us, such as when you create an account, submit a form, or communicate with us.</p>
        <h3>Use of Information</h3>
        <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with applicable laws.</p>
        <h3>Cookies</h3>
        <p>We use cookies and similar tracking technologies to track activity on our service and hold certain information.</p>
      `
      showModal.value = true
    }
    
    const openTermsOfUse = () => {
      modalTitle.value = 'Terms of Use'
      modalContent.value = `
        <p>Last updated: ${new Date().toLocaleDateString()}</p>
        <p>These Terms of Use constitute a legally binding agreement made between you and our website.</p>
        <h3>Intellectual Property Rights</h3>
        <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and their selection and arrangement are owned by us or our licensors.</p>
        <h3>User Representations</h3>
        <p>By using the Site, you represent and warrant that you have the legal capacity and you agree to comply with these Terms of Use.</p>
        <h3>Prohibited Activities</h3>
        <p>You may not access or use the Site for any purpose other than that for which we make the Site available.</p>
      `
      showModal.value = true
    }
    
    const closeModal = () => {
      showModal.value = false
    }
    
    // PWA installation handling
    const installPWA = async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        console.log(`User ${outcome} the installation`)
        deferredPrompt = null
        showInstallButton.value = false
      }
    }
    
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      deferredPrompt = e
      showInstallButton.value = true
    }
    
    const handleAppInstalled = () => {
      console.log('PWA was installed')
      showInstallButton.value = false
    }
    
    onMounted(() => {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.addEventListener('appinstalled', handleAppInstalled)
    })
    
    onUnmounted(() => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    })
    
    return {
      currentYear,
      showModal,
      modalTitle,
      modalContent,
      showInstallButton,
      openPrivacyPolicy,
      openTermsOfUse,
      closeModal,
      installPWA
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.close-button {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
}
</style>