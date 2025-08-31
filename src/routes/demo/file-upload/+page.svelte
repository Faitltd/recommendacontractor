<script lang="ts">
  import ProfileImageUpload from '$lib/components/ProfileImageUpload.svelte';
  import ReviewPhotoUpload from '$lib/components/ReviewPhotoUpload.svelte';
  import DocumentUpload from '$lib/components/DocumentUpload.svelte';
  import FileUpload from '$lib/components/FileUpload.svelte';
  import type { UploadResult } from '$lib/storage/types';

  let profileImageUrl = $state('');
  let reviewPhotos = $state<string[]>([]);
  let documents = $state<Record<string, string>>({});
  let message = $state('');
  let error = $state('');

  // Document types for demo
  const documentTypes = [
    {
      id: 'business_license',
      name: 'Business License',
      description: 'Valid business license or registration certificate',
      required: true,
      acceptedFormats: ['application/pdf', 'image/jpeg', 'image/png'],
    },
    {
      id: 'insurance_certificate',
      name: 'Insurance Certificate',
      description: 'General liability insurance certificate',
      required: true,
      acceptedFormats: ['application/pdf', 'image/jpeg', 'image/png'],
    },
    {
      id: 'trade_certification',
      name: 'Trade Certification',
      description: 'Professional trade certifications or licenses',
      required: false,
      acceptedFormats: ['application/pdf', 'image/jpeg', 'image/png'],
    },
  ];

  function handleProfileImageUpload(result: UploadResult) {
    if (result.success && result.url) {
      profileImageUrl = result.url;
      showMessage('Profile photo uploaded successfully!');
    }
  }

  function handleReviewPhotosChange(photos: string[]) {
    reviewPhotos = photos;
    showMessage(`Review photos updated: ${photos.length} photos`);
  }

  function handleDocumentsChange(docs: Record<string, string>) {
    documents = docs;
    showMessage(`Documents updated: ${Object.keys(docs).length} documents`);
  }

  function handleUploadError(errorMsg: string) {
    error = errorMsg;
    setTimeout(() => error = '', 5000);
  }

  function showMessage(msg: string) {
    message = msg;
    setTimeout(() => message = '', 3000);
  }

  function handleGenericUpload(result: UploadResult) {
    if (result.success) {
      showMessage(`File uploaded: ${result.filename}`);
    }
  }
</script>

<svelte:head>
  <title>File Upload Demo - Recommend a Contractor</title>
  <meta name="description" content="Demonstration of file upload components and functionality." />
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold text-gray-900">File Upload System Demo</h1>
      <p class="mt-2 text-lg text-gray-600">
        Demonstration of various file upload components with Google Cloud Storage integration
      </p>
    </div>

    <!-- Messages -->
    {#if message}
      <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex">
          <svg class="w-5 h-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div class="ml-3">
            <p class="text-sm text-green-800">{message}</p>
          </div>
        </div>
      </div>
    {/if}

    {#if error}
      <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div class="flex">
          <svg class="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div class="ml-3">
            <p class="text-sm text-red-800">{error}</p>
          </div>
        </div>
      </div>
    {/if}

    <div class="space-y-12">
      <!-- Profile Image Upload Demo -->
      <section class="bg-white shadow-professional rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Profile Image Upload</h2>
        <p class="text-sm text-gray-600 mb-6">
          Specialized component for uploading profile pictures with image validation and optimization.
        </p>
        
        <ProfileImageUpload
          currentImageUrl={profileImageUrl}
          size="lg"
          onUpload={handleProfileImageUpload}
          onError={handleUploadError}
        />

        {#if profileImageUrl}
          <div class="mt-4 p-3 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-700">
              <strong>Uploaded URL:</strong> 
              <a href={profileImageUrl} target="_blank" class="text-blue-600 hover:text-blue-800 break-all">
                {profileImageUrl}
              </a>
            </p>
          </div>
        {/if}
      </section>

      <!-- Review Photos Upload Demo -->
      <section class="bg-white shadow-professional rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Review Photos Upload</h2>
        <p class="text-sm text-gray-600 mb-6">
          Multi-image upload component for project photos with reordering and management features.
        </p>
        
        <ReviewPhotoUpload
          maxPhotos={5}
          existingPhotos={reviewPhotos}
          onPhotosChange={handleReviewPhotosChange}
          onError={handleUploadError}
        />

        {#if reviewPhotos.length > 0}
          <div class="mt-4 p-3 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-700 mb-2">
              <strong>Uploaded Photos ({reviewPhotos.length}):</strong>
            </p>
            <div class="space-y-1">
              {#each reviewPhotos as photo, index}
                <p class="text-xs text-gray-600">
                  {index + 1}. <a href={photo} target="_blank" class="text-blue-600 hover:text-blue-800 break-all">{photo}</a>
                </p>
              {/each}
            </div>
          </div>
        {/if}
      </section>

      <!-- Document Upload Demo -->
      <section class="bg-white shadow-professional rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Document Upload</h2>
        <p class="text-sm text-gray-600 mb-6">
          Structured document upload component for verification documents with progress tracking.
        </p>
        
        <DocumentUpload
          {documentTypes}
          existingDocuments={documents}
          onDocumentsChange={handleDocumentsChange}
          onError={handleUploadError}
        />

        {#if Object.keys(documents).length > 0}
          <div class="mt-4 p-3 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-700 mb-2">
              <strong>Uploaded Documents ({Object.keys(documents).length}):</strong>
            </p>
            <div class="space-y-1">
              {#each Object.entries(documents) as [docId, url]}
                {@const docType = documentTypes.find(d => d.id === docId)}
                <p class="text-xs text-gray-600">
                  <strong>{docType?.name}:</strong> 
                  <a href={url} target="_blank" class="text-blue-600 hover:text-blue-800 break-all">{url}</a>
                </p>
              {/each}
            </div>
          </div>
        {/if}
      </section>

      <!-- Generic File Upload Demo -->
      <section class="bg-white shadow-professional rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Generic File Upload</h2>
        <p class="text-sm text-gray-600 mb-6">
          Basic file upload component that can be configured for different file types and use cases.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Single Image Upload -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-3">Single Image Upload</h3>
            <FileUpload
              preset="reviewPhoto"
              accept="image/*"
              onUpload={handleGenericUpload}
              onError={handleUploadError}
            />
          </div>

          <!-- Multiple Image Upload -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-3">Multiple Images</h3>
            <FileUpload
              preset="reviewPhoto"
              accept="image/*"
              multiple={true}
              maxFiles={3}
              onUpload={handleGenericUpload}
              onError={handleUploadError}
            />
          </div>

          <!-- Document Upload -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-3">Document Upload</h3>
            <FileUpload
              preset="verificationDocument"
              accept="application/pdf,image/*"
              onUpload={handleGenericUpload}
              onError={handleUploadError}
            />
          </div>

          <!-- Profile Image Upload -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-3">Profile Image</h3>
            <FileUpload
              preset="profileImage"
              accept="image/*"
              onUpload={handleGenericUpload}
              onError={handleUploadError}
            />
          </div>
        </div>
      </section>

      <!-- Configuration Info -->
      <section class="bg-white shadow-professional rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Upload Configuration</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-4 bg-blue-50 rounded-lg">
            <h3 class="text-sm font-medium text-blue-900 mb-2">Profile Images</h3>
            <ul class="text-xs text-blue-800 space-y-1">
              <li>• Max size: 5MB</li>
              <li>• Min: 150x150px</li>
              <li>• Max: 2000x2000px</li>
              <li>• Formats: JPG, PNG, WebP</li>
              <li>• Auto-optimization</li>
            </ul>
          </div>
          
          <div class="p-4 bg-green-50 rounded-lg">
            <h3 class="text-sm font-medium text-green-900 mb-2">Review Photos</h3>
            <ul class="text-xs text-green-800 space-y-1">
              <li>• Max size: 10MB</li>
              <li>• Max: 1920x1080px</li>
              <li>• Formats: JPG, PNG, WebP</li>
              <li>• Multiple uploads</li>
              <li>• Auto-thumbnails</li>
            </ul>
          </div>
          
          <div class="p-4 bg-purple-50 rounded-lg">
            <h3 class="text-sm font-medium text-purple-900 mb-2">Documents</h3>
            <ul class="text-xs text-purple-800 space-y-1">
              <li>• Max size: 20MB</li>
              <li>• Formats: PDF, JPG, PNG</li>
              <li>• No optimization</li>
              <li>• Secure storage</li>
              <li>• Verification ready</li>
            </ul>
          </div>
          
          <div class="p-4 bg-orange-50 rounded-lg">
            <h3 class="text-sm font-medium text-orange-900 mb-2">Gallery Images</h3>
            <ul class="text-xs text-orange-800 space-y-1">
              <li>• Max size: 10MB</li>
              <li>• Max: 1920x1080px</li>
              <li>• Formats: JPG, PNG, WebP</li>
              <li>• Portfolio ready</li>
              <li>• Auto-thumbnails</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Setup Instructions -->
      <section class="bg-white shadow-professional rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Setup Instructions</h2>
        <div class="prose prose-sm max-w-none">
          <p class="text-gray-600 mb-4">
            To use the file upload system in production, you need to configure Google Cloud Storage:
          </p>
          
          <ol class="list-decimal list-inside space-y-2 text-gray-700">
            <li>Create a Google Cloud Storage bucket</li>
            <li>Set up service account credentials</li>
            <li>Update the configuration in <code class="bg-gray-100 px-1 rounded">src/lib/storage/config.ts</code></li>
            <li>Configure CORS settings for your bucket</li>
            <li>Set up proper IAM permissions</li>
          </ol>
          
          <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p class="text-sm text-yellow-800">
              <strong>Note:</strong> This demo currently shows the UI components. 
              File uploads will fail until Google Cloud Storage is properly configured.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>
