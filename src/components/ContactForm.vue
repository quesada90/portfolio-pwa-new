<template>
  <form @submit.prevent="submitForm">
    <div class="contact-title">
      <h2>Contact</h2>
      <p>Feel free to contact me for any inquiries or collaborations. I will get back to you as soon as possible.</p>
      <p>For business inquiries, please contact me at info@my-portfolio.com</p>
    </div>
    <div class="inputs">
      <label>
        Name:
        <input 
          type="text" 
          v-model="form.name" 
          :class="{ 'error': errors.name }"
          @focus="clearError('name')"
        >
        <p class="error-message" v-if="errors.name">{{ errors.name }}</p>
      </label>
      <label>
        Last name:
        <input 
          type="text" 
          v-model="form.lastName" 
          :class="{ 'error': errors.lastName }"
          @focus="clearError('lastName')"
        >
        <p class="error-message" v-if="errors.lastName">{{ errors.lastName }}</p>
      </label>
      <label>
        Email:
        <input 
          type="email" 
          v-model="form.email"
          :class="{ 'error': errors.email }"
          @focus="clearError('email')"
        >
        <p class="error-message" v-if="errors.email">{{ errors.email }}</p>
      </label>
      <label>
        Phone:
        <input 
          type="tel" 
          v-model="form.phone"
          :class="{ 'error': errors.phone }"
          @focus="clearError('phone')"
        >
        <p class="error-message" v-if="errors.phone">{{ errors.phone }}</p>
      </label>
      <label>
        Message:
        <textarea 
          v-model="form.message"
          :class="{ 'error': errors.message }"
          @focus="clearError('message')"
        ></textarea>
        <p class="error-message" v-if="errors.message">{{ errors.message }}</p>
      </label>
      <button 
        type="submit" 
        id="submit" 
        :disabled="submitting"
      >
        {{ submitting ? 'Sending...' : 'Send →' }}
      </button>
    </div>
    
    <!-- Success message modal -->
    <div class="modal" v-if="showSuccessModal">
      <div class="modal-content">
        <h3>Thank you!</h3>
        <p>Your message has been sent successfully. I'll get back to you soon.</p>
        <button @click="showSuccessModal = false">Close</button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'ContactForm',
  setup() {
    const form = reactive({
      name: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    })
    
    const errors = reactive({
      name: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    })
    
    const submitting = ref(false)
    const showSuccessModal = ref(false)
    
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    }
    
    const validateForm = () => {
      let isValid = true
      
      // Reset errors
      Object.keys(errors).forEach(key => {
        errors[key] = ''
      })
      
      // Validate required fields
      if (!form.name.trim()) {
        errors.name = 'Name is required'
        isValid = false
      }
      
      if (!form.lastName.trim()) {
        errors.lastName = 'Last name is required'
        isValid = false
      }
      
      if (!form.email.trim()) {
        errors.email = 'Email is required'
        isValid = false
      } else if (!validateEmail(form.email)) {
        errors.email = 'Please enter a valid email address'
        isValid = false
      }
      
      if (!form.message.trim()) {
        errors.message = 'Message is required'
        isValid = false
      }
      
      return isValid
    }
    
    const clearError = (field) => {
      errors[field] = ''
    }
    
    const submitForm = () => {
      if (validateForm()) {
        submitting.value = true
        
        // Simulating form submission
        setTimeout(() => {
          // Store the form data in localStorage for offline capability
          const savedForms = JSON.parse(localStorage.getItem('savedForms') || '[]')
          savedForms.push({
            ...form,
            sentAt: new Date().toISOString(),
            status: navigator.onLine ? 'sent' : 'pending'
          })
          localStorage.setItem('savedForms', JSON.stringify(savedForms))
          
          // Reset form
          Object.keys(form).forEach(key => {
            form[key] = ''
          })
          
          submitting.value = false
          showSuccessModal.value = true
        }, 1500)
      }
    }
    
    return {
      form,
      errors,
      submitting,
      showSuccessModal,
      clearError,
      submitForm
    }
  }
}
</script>

<style scoped>
.error {
  border-color: red !important;
}

.error-message {
  color: red;
  font-size: 0.8em;
  margin-top: 0.2rem;
}

#submit {
  padding: 1rem 2rem;
  border: 2px solid black;
  text-decoration: none;
  border-radius: 0.5rem;
  width: fit-content;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

#submit:hover:not(:disabled) {
  background-color: #252525;
  color: aliceblue;
}

#submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 500px;
  text-align: center;
}

.modal-content button {
  padding: 0.5rem 1.5rem;
  background: #252525;
  color: white;
  border: none;
  border-radius: 0.25rem;
  margin-top: 1rem;
  cursor: pointer;
}
</style>
