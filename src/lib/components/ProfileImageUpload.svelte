<script lang="ts">
  import FileUpload from './FileUpload.svelte';
  import type { UploadResult } from '$lib/storage/types';

  interface Props {
    currentImageUrl?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    disabled?: boolean;
    onUpload?: (result: UploadResult) => void;
    onError?: (error: string) => void;
  }

  let {
    currentImageUrl,
    size = 'md',
    disabled = false,
    onUpload,
    onError
  }: Props = $props();

  let uploadedImageUrl = $state<string | undefined>(currentImageUrl);
  let isUploading = $state(false);
  let uploadError = $state<string | undefined>();

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  function handleUpload(result: UploadResult) {
    if (result.success && result.url) {
      uploadedImageUrl = result.url;
      uploadError = undefined;
      if (onUpload) {
        onUpload(result);
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

  function handleUploadStart() {
    isUploading = true;
    uploadError = undefined;
  }
</script>

<div class="profile-image-upload">
  <div class="flex items-start space-x-4">
    <!-- Current/Preview Image -->
    <div class="relative {sizeClasses[size]} rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
      {#if uploadedImageUrl}
        <img
          src={uploadedImageUrl}
          alt="Profile"
          class="w-full h-full object-cover"
        />
      {:else}
        <!-- Default Avatar -->
        <div class="w-full h-full flex items-center justify-center bg-gray-100">
          <svg class="w-1/2 h-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
      {/if}
      
      <!-- Upload Overlay -->
      {#if isUploading}
        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <svg class="w-6 h-6 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </div>
      {/if}
    </div>

    <!-- Upload Controls -->
    <div class="flex-1">
      <div class="mb-2">
        <h4 class="text-sm font-medium text-gray-900">Profile Photo</h4>
        <p class="text-xs text-gray-500">
          Upload a professional photo. JPG, PNG, or WebP. Max 5MB.
        </p>
      </div>

      {#if uploadError}
        <div class="mb-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
          {uploadError}
        </div>
      {/if}

      <!-- Compact File Upload -->
      <div class="max-w-xs">
        <FileUpload
          preset="profileImage"
          accept="image/jpeg,image/png,image/webp"
          {disabled}
          showPreview={false}
          className="compact-upload"
          onUpload={handleUpload}
          onError={handleError}
        />
      </div>

      <!-- Upload Guidelines -->
      <div class="mt-3 text-xs text-gray-500">
        <p class="font-medium mb-1">Photo guidelines:</p>
        <ul class="space-y-1">
          <li>• Use a clear, professional headshot</li>
          <li>• Face should be clearly visible</li>
          <li>• Minimum 150x150 pixels</li>
          <li>• Good lighting and high quality</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  :global(.compact-upload .drop-zone) {
    @apply p-4 text-left;
  }
  
  :global(.compact-upload .upload-prompt) {
    @apply flex items-center space-x-2;
  }
  
  :global(.compact-upload .upload-prompt > div:first-child) {
    @apply w-8 h-8 mb-0 mr-2;
  }
  
  :global(.compact-upload .upload-prompt > div:first-child svg) {
    @apply w-4 h-4;
  }
  
  :global(.compact-upload .upload-prompt p:first-of-type) {
    @apply text-xs font-medium mb-0;
  }
  
  :global(.compact-upload .upload-prompt p:last-of-type) {
    @apply hidden;
  }
</style>
