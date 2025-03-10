<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="hero-contact">
      <div class="contact-info">
        <ul>
          <li><h6>Address</h6></li>
          <li>1234 Main Street</li>
          <li>City, State 12345</li>
          <li>Country</li>
        </ul>
        <ul>
          <li><h6>Contact</h6></li>
          <li>+34 123 456 789</li>
          <li>info@my-portfolio</li>
        </ul>
        <ul>
          <li><h6>Opening hours</h6></li>
          <li>Monday to Friday: 9am -6pm</li>
        </ul>
        <ul>
          <li><h6>Follow me</h6></li>
          <li>
            <div class="social-icons">
              <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </li>
        </ul>
      </div>
      <div class="project-description">
        <img :src="contactImage" alt="Contact image">
      </div>
    </section>

    <!-- Contact Form Section -->
    <ContactForm />
  </div>
</template>

<script>
import ContactForm from '@/components/ContactForm.vue'
import { fetchImages } from '@/services/unsplash'
import { ref, onMounted } from 'vue'

export default {
  name: 'SiteContact',
  components: {
    ContactForm
  },
  setup() {
    const contactImage = ref('/img/sea.jpg')

    const loadContactImage = async () => {
      try {
        // Try to get a cached image first
        const cachedImage = localStorage.getItem('contactImage')
        const cachedTimestamp = localStorage.getItem('contactImageTimestamp')
        
        // Check if cache is valid (less than 24 hours old)
        const isCacheValid = cachedTimestamp && 
          (Date.now() - parseInt(cachedTimestamp) < 24 * 60 * 60 * 1000)
        
        if (cachedImage && isCacheValid) {
          contactImage.value = cachedImage
        } else {
          // Fetch new image
          const images = await fetchImages('sea', 1)
          if (images && images.length > 0) {
            contactImage.value = images[0].urls.regular
            
            // Cache the image URL
            localStorage.setItem('contactImage', images[0].urls.regular)
            localStorage.setItem('contactImageTimestamp', Date.now().toString())
          }
        }
      } catch (error) {
        console.error('Error loading contact image:', error)
        // Keep using default image if there's an error
      }
    }

    onMounted(() => {
      loadContactImage()
    })

    return {
      contactImage
    }
  }
}
</script>

<style scoped>
.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icons a {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid #333;
  transition: all 0.3s ease;
}

.social-icons a:hover {
  background-color: #333;
  color: white;
}
</style>
