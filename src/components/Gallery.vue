<template>
  <section class="gallery">
    <h2>Gallery</h2>
    <div class="swiper-container" ref="swiperContainer">
      <div class="swiper-wrapper">
        <div 
          v-for="(image, index) in images" 
          :key="index" 
          class="swiper-slide"
        >
          <img :src="image.urls.regular" :alt="image.alt_description || 'Gallery image'" />
        </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
    </div>
  </section>
</template>

<script>
import { onMounted, ref } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { fetchImages } from '@/services/unsplash'

// Register Swiper modules
Swiper.use([Navigation, Pagination, EffectCoverflow])

export default {
  name: 'SiteGallery',
  setup() {
    const swiperContainer = ref(null)
    const images = ref([])
    const loading = ref(true)
    const error = ref(null)

    const initSwiper = () => {
      if (swiperContainer.value) {
        new Swiper(swiperContainer.value, {
          loop: true,
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        })
      }
    }

    const loadImages = async () => {
      try {
        loading.value = true
        // Try to get cached images first
        const cachedImages = localStorage.getItem('galleryImages')
        const cachedTimestamp = localStorage.getItem('galleryImagesTimestamp')
        
        // Check if cache is valid (less than 24 hours old)
        const isCacheValid = cachedTimestamp && 
          (Date.now() - parseInt(cachedTimestamp) < 24 * 60 * 60 * 1000)
        
        if (cachedImages && isCacheValid) {
          images.value = JSON.parse(cachedImages)
        } else {
          // Fetch new images
          const fetchedImages = await fetchImages('nature', 10)
          images.value = fetchedImages
          
          // Cache the result
          localStorage.setItem('galleryImages', JSON.stringify(fetchedImages))
          localStorage.setItem('galleryImagesTimestamp', Date.now().toString())
        }
      } catch (err) {
        console.error('Error loading images:', err)
        error.value = 'Failed to load gallery images'
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadImages().then(() => {
        // Initialize Swiper after images are loaded
        setTimeout(initSwiper, 100)
      })
    })

    return {
      swiperContainer,
      images,
      loading,
      error
    }
  }
}
</script>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 4rem;
  text-align: center;
}

.swiper-container {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  overflow: hidden;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .swiper-slide {
    width: 250px;
    height: 250px;
  }
}
</style>
