<script lang="ts">
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  
  let formData = $state({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general' // general, contractor, technical, billing
  });
  
  let loading = $state(false);
  let submitted = $state(false);
  let errors = $state<Record<string, string>>({});
  
  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }
  
  async function handleSubmit(event: Event) {
    event.preventDefault();
    if (!validateForm()) return;

    loading = true;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real app, this would send the message to the server
      console.log('Contact form submitted:', formData);

      submitted = true;

      // Reset form
      formData = {
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      };
    } catch (error) {
      console.error('Failed to send message:', error);
      errors = { submit: 'Failed to send message. Please try again.' };
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Contact Us - Recommend a Contractor</title>
  <meta name="description" content="Get in touch with Recommend a Contractor. We're here to help homeowners and contractors with questions, support, and feedback." />
</svelte:head>

<!-- Hero Section -->
<section class="bg-white border-b border-gray-200">
  <div class="container-custom py-12">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Contact Us
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Have questions, feedback, or need support? We're here to help! 
        Reach out to us and we'll get back to you as soon as possible.
      </p>
    </div>
  </div>
</section>

<!-- Contact Section -->
<section class="section-padding">
  <div class="container-custom">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Contact Information -->
      <div class="lg:col-span-1">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>
        
        <div class="space-y-6">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">Email</h3>
              <p class="text-gray-600">support@recomendacontractor.com</p>
              <p class="text-sm text-gray-500 mt-1">We typically respond within 24 hours</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">Phone</h3>
              <p class="text-gray-600">(303) 555-0199</p>
              <p class="text-sm text-gray-500 mt-1">Monday - Friday, 9 AM - 6 PM MST</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">Office</h3>
              <p class="text-gray-600">
                1234 Main Street<br>
                Denver, CO 80202
              </p>
              <p class="text-sm text-gray-500 mt-1">By appointment only</p>
            </div>
          </div>
        </div>
        
        <!-- FAQ Link -->
        <div class="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 class="font-semibold text-gray-900 mb-2">Looking for Quick Answers?</h3>
          <p class="text-gray-600 text-sm mb-4">
            Check out our frequently asked questions for immediate help with common issues.
          </p>
          <a href="/faq" class="btn btn-outline btn-sm">
            View FAQ
          </a>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div class="lg:col-span-2">
        {#if submitted}
          <div class="card p-8 text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h3>
            <p class="text-gray-600 mb-6">
              Thank you for contacting us. We've received your message and will get back to you within 24 hours.
            </p>
            <button 
              onclick={() => submitted = false}
              class="btn btn-primary"
            >
              Send Another Message
            </button>
          </div>
        {:else}
          <div class="card p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            <form onsubmit={handleSubmit} class="space-y-6">
              <!-- Message Type -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" for="contact-type">
                  What can we help you with?
                </label>
                <select id="contact-type" bind:value={formData.type} class="input">
                  <option value="general">General Question</option>
                  <option value="contractor">Contractor Support</option>
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing Question</option>
                </select>
              </div>
              
              <!-- Name and Email -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="contact-name">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    bind:value={formData.name}
                    type="text"
                    class="input {errors.name ? 'border-red-500' : ''}"
                    placeholder="Your full name"
                  />
                  {#if errors.name}
                    <p class="text-red-600 text-sm mt-1">{errors.name}</p>
                  {/if}
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="contact-email">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    bind:value={formData.email}
                    type="email"
                    class="input {errors.email ? 'border-red-500' : ''}"
                    placeholder="your@email.com"
                  />
                  {#if errors.email}
                    <p class="text-red-600 text-sm mt-1">{errors.email}</p>
                  {/if}
                </div>
              </div>
              
              <!-- Subject -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" for="contact-subject">
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  bind:value={formData.subject}
                  type="text"
                  class="input {errors.subject ? 'border-red-500' : ''}"
                  placeholder="Brief description of your inquiry"
                />
                {#if errors.subject}
                  <p class="text-red-600 text-sm mt-1">{errors.subject}</p>
                {/if}
              </div>
              
              <!-- Message -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" for="contact-message">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  bind:value={formData.message}
                  rows="6"
                  class="input {errors.message ? 'border-red-500' : ''}"
                  placeholder="Please provide as much detail as possible..."
                ></textarea>
                {#if errors.message}
                  <p class="text-red-600 text-sm mt-1">{errors.message}</p>
                {/if}
              </div>
              
              <!-- Submit Button -->
              <div>
                <button 
                  type="submit" 
                  disabled={loading}
                  class="btn btn-primary w-full md:w-auto"
                >
                  {#if loading}
                    <LoadingSpinner size="sm" color="white" />
                    <span class="ml-2">Sending...</span>
                  {:else}
                    Send Message
                  {/if}
                </button>
              </div>
              
              {#if errors.submit}
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p class="text-red-800">{errors.submit}</p>
                </div>
              {/if}
            </form>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<!-- Support Categories -->
<section class="section-padding bg-gray-50">
  <div class="container-custom">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">How Can We Help?</h2>
      <p class="text-xl text-gray-600">
        Choose the category that best describes your inquiry
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="card p-6 text-center hover:shadow-lg transition-shadow">
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="font-semibold text-gray-900 mb-2">General Questions</h3>
        <p class="text-gray-600 text-sm">
          Questions about our platform, services, or how to get started.
        </p>
      </div>
      
      <div class="card p-6 text-center hover:shadow-lg transition-shadow">
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <h3 class="font-semibold text-gray-900 mb-2">Contractor Support</h3>
        <p class="text-gray-600 text-sm">
          Help with contractor registration, profile management, or platform features.
        </p>
      </div>
      
      <div class="card p-6 text-center hover:shadow-lg transition-shadow">
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
        <h3 class="font-semibold text-gray-900 mb-2">Technical Issues</h3>
        <p class="text-gray-600 text-sm">
          Report bugs, website issues, or problems with platform functionality.
        </p>
      </div>
      
      <div class="card p-6 text-center hover:shadow-lg transition-shadow">
        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <h3 class="font-semibold text-gray-900 mb-2">Billing Questions</h3>
        <p class="text-gray-600 text-sm">
          Questions about pricing, payments, subscriptions, or billing issues.
        </p>
      </div>
    </div>
  </div>
</section>
