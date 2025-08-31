<script lang="ts">
  import FileUpload from './FileUpload.svelte';
  import type { UploadResult } from '$lib/storage/types';

  interface Props {
    maxPhotos?: number;
    existingPhotos?: string[];
    disabled?: boolean;
    onPhotosChange?: (photos: string[]) => void;
    onError?: (error: string) => void;
  }

  let {
    maxPhotos = 5,
    existingPhotos = [],
    disabled = false,
    onPhotosChange,
    onError
  }: Props = $props();

  let uploadedPhotos = $state<string[]>([...existingPhotos]);
  let isUploading = $state(false);
  let uploadError = $state<string | undefined>();

  const remainingSlots = $derived(maxPhotos - uploadedPhotos.length);
  const canUploadMore = $derived(remainingSlots > 0 && !disabled);

  function handleUpload(result: UploadResult) {
    if (result.success && result.url) {
      uploadedPhotos = [...uploadedPhotos, result.url];
      uploadError = undefined;
      
      if (onPhotosChange) {
        onPhotosChange(uploadedPhotos);
      }
    }
    isUploading = false;
  }

  function handleError(error: string) {
    uploadError = error;
    isUploading = false;
    if (onError) {
      onError(error);
    }
  }

  function removePhoto(index: number) {
    uploadedPhotos = uploadedPhotos.filter((_, i) => i !== index);
    if (onPhotosChange) {
      onPhotosChange(uploadedPhotos);
    }
  }

  function reorderPhotos(fromIndex: number, toIndex: number) {
    const newPhotos = [...uploadedPhotos];
    const [movedPhoto] = newPhotos.splice(fromIndex, 1);
    newPhotos.splice(toIndex, 0, movedPhoto);
    uploadedPhotos = newPhotos;
    
    if (onPhotosChange) {
      onPhotosChange(uploadedPhotos);
    }
  }
</script>

<div class="review-photo-upload">
  <div class="mb-4">
    <h4 class="text-sm font-medium text-gray-900 mb-1">Project Photos</h4>
    <p class="text-xs text-gray-500">
      Add photos of the completed work. Up to {maxPhotos} photos, max 10MB each.
    </p>
  </div>

  {#if uploadError}
    <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
      {uploadError}
    </div>
  {/if}

  <!-- Existing Photos Grid -->
  {#if uploadedPhotos.length > 0}
    <div class="photo-grid mb-4">
      {#each uploadedPhotos as photo, index}
        <div class="photo-item" data-index={index}>
          <div class="photo-container">
            <img src={photo} alt="Project photo {index + 1}" class="photo-image" />
            
            <!-- Photo Controls -->
            <div class="photo-controls">
              <button
                onclick={() => removePhoto(index)}
                class="control-btn remove-btn"
                title="Remove photo"
                aria-label="Remove photo {index + 1}"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>

              {#if index > 0}
                <button
                  onclick={() => reorderPhotos(index, index - 1)}
                  class="control-btn move-btn"
                  title="Move left"
                  aria-label="Move photo {index + 1} left"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
              {/if}

              {#if index < uploadedPhotos.length - 1}
                <button
                  onclick={() => reorderPhotos(index, index + 1)}
                  class="control-btn move-btn"
                  title="Move right"
                  aria-label="Move photo {index + 1} right"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              {/if}
            </div>

            <!-- Primary Photo Badge -->
            {#if index === 0}
              <div class="primary-badge">
                <span class="text-xs font-medium">Primary</span>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Upload New Photos -->
  {#if canUploadMore}
    <div class="upload-section">
      <FileUpload
        preset="reviewPhoto"
        accept="image/jpeg,image/png,image/webp"
        multiple={true}
        maxFiles={remainingSlots}
        disabled={disabled || isUploading}
        showPreview={false}
        onUpload={handleUpload}
        onError={handleError}
      />
      
      <div class="upload-info">
        <p class="text-xs text-gray-500">
          {remainingSlots} of {maxPhotos} photo slots remaining
        </p>
      </div>
    </div>
  {:else if uploadedPhotos.length >= maxPhotos}
    <div class="max-photos-message">
      <div class="flex items-center justify-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-sm text-blue-700">
          Maximum of {maxPhotos} photos reached. Remove a photo to add more.
        </span>
      </div>
    </div>
  {/if}

  <!-- Photo Guidelines -->
  <div class="guidelines mt-4">
    <details class="text-xs text-gray-500">
      <summary class="cursor-pointer font-medium hover:text-gray-700">Photo Guidelines</summary>
      <div class="mt-2 space-y-1">
        <p>• Take clear, well-lit photos of the completed work</p>
        <p>• Show different angles and details of the project</p>
        <p>• The first photo will be used as the primary image</p>
        <p>• Avoid blurry or dark images</p>
        <p>• Include before/after shots when relevant</p>
      </div>
    </details>
  </div>
</div>

<style>
  .photo-grid {
    @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4;
  }

  .photo-item {
    @apply relative aspect-square;
  }

  .photo-container {
    @apply relative w-full h-full rounded-lg overflow-hidden border-2 border-gray-200;
  }

  .photo-item:hover .photo-container {
    @apply border-blue-300;
  }

  .photo-image {
    @apply w-full h-full object-cover;
  }

  .photo-controls {
    @apply absolute inset-0 bg-black bg-opacity-0 transition-all duration-200 flex items-center justify-center space-x-2 opacity-0;
  }

  .photo-item:hover .photo-controls {
    @apply bg-opacity-40 opacity-100;
  }

  .control-btn {
    @apply p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full transition-all duration-200 text-gray-700 hover:text-gray-900;
  }

  .remove-btn {
    @apply hover:bg-red-50 hover:text-red-600;
  }

  .move-btn {
    @apply hover:bg-blue-50 hover:text-blue-600;
  }

  .primary-badge {
    @apply absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium;
  }

  .upload-section {
    @apply border-2 border-dashed border-gray-300 rounded-lg p-4;
  }

  .upload-info {
    @apply mt-2 text-center;
  }

  .max-photos-message {
    @apply mt-4;
  }

  .guidelines {
    @apply border-t border-gray-200 pt-4;
  }
</style>
