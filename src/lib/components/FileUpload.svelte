<script lang="ts">
  import { ClientFileUploadService } from '$lib/storage/client-upload';
  import { clientUploadPresets } from '$lib/storage/client-config';
  import type { UploadResult, UploadProgress } from '$lib/storage/types';
  import type { UploadState } from '$lib/storage/types';

  interface Props {
    preset: keyof typeof clientUploadPresets;
    accept?: string;
    multiple?: boolean;
    maxFiles?: number;
    disabled?: boolean;
    showPreview?: boolean;
    className?: string;
    onUpload?: (result: UploadResult) => void;
    onError?: (error: string) => void;
  }

  let {
    preset,
    accept,
    multiple = false,
    maxFiles = 1,
    disabled = false,
    showPreview = true,
    className = '',
    onUpload,
    onError
  }: Props = $props();

  let fileInput: HTMLInputElement;
  let uploadState = $state<UploadState>({
    status: 'idle',
    progress: 0
  });
  let selectedFiles = $state<File[]>([]);
  let previewUrls = $state<string[]>([]);
  let dragOver = $state(false);

  const config = clientUploadPresets[preset];
  const acceptTypes = accept || config.allowedTypes.join(',');

  function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      processFiles(Array.from(target.files));
    }
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    dragOver = false;
    
    if (event.dataTransfer?.files) {
      processFiles(Array.from(event.dataTransfer.files));
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    dragOver = true;
  }

  function handleDragLeave(event: DragEvent) {
    event.preventDefault();
    dragOver = false;
  }

  function processFiles(files: File[]) {
    if (disabled) return;

    // Limit number of files
    const filesToProcess = multiple ? files.slice(0, maxFiles) : [files[0]];
    
    selectedFiles = filesToProcess;
    
    // Generate preview URLs for images
    if (showPreview) {
      previewUrls = filesToProcess.map(file => {
        return ClientFileUploadService.createPreviewUrl(file) || '';
      });
    }

    // Auto-upload if single file
    if (!multiple && filesToProcess.length === 1) {
      uploadFile(filesToProcess[0]);
    }
  }

  async function uploadFile(file: File) {
    uploadState = { status: 'uploading', progress: 0 };

    try {
      const result = await ClientFileUploadService.uploadFile(
        file,
        preset,
        (progress: UploadProgress) => {
          uploadState = {
            status: 'uploading',
            progress: progress.percentage
          };
        }
      );

      if (result.success) {
        uploadState = { 
          status: 'success', 
          progress: 100,
          result: {
            id: result.filename || '',
            filename: result.filename || '',
            originalName: file.name,
            url: result.url || '',
            thumbnailUrl: result.thumbnailUrl,
            metadata: {
              size: file.size,
              type: file.type,
              width: result.metadata?.width,
              height: result.metadata?.height,
              uploadedAt: new Date(),
              uploadedBy: 'current-user', // This would come from auth
              originalName: file.name,
            },
            preset: preset,
          }
        };
        
        if (onUpload) {
          onUpload(result);
        }
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error: any) {
      uploadState = { 
        status: 'error', 
        progress: 0, 
        error: error.message 
      };
      
      if (onError) {
        onError(error.message);
      }
    }
  }

  function uploadAllFiles() {
    if (selectedFiles.length === 0) return;
    
    // For multiple files, upload them sequentially
    selectedFiles.forEach(file => uploadFile(file));
  }

  function removeFile(index: number) {
    selectedFiles = selectedFiles.filter((_, i) => i !== index);
    if (previewUrls[index]) {
      ClientFileUploadService.revokePreviewUrl(previewUrls[index]);
    }
    previewUrls = previewUrls.filter((_, i) => i !== index);

    // Reset upload state if no files
    if (selectedFiles.length === 0) {
      uploadState = { status: 'idle', progress: 0 };
    }
  }

  function reset() {
    selectedFiles = [];
    previewUrls.forEach(url => url && ClientFileUploadService.revokePreviewUrl(url));
    previewUrls = [];
    uploadState = { status: 'idle', progress: 0 };
    if (fileInput) {
      fileInput.value = '';
    }
  }

  // Cleanup preview URLs on component destroy
  $effect(() => {
    return () => {
      previewUrls.forEach(url => url && ClientFileUploadService.revokePreviewUrl(url));
    };
  });
</script>

<div class={`file-upload ${className}`}>
  <!-- Drop Zone -->
  <div
    class="drop-zone {dragOver ? 'drag-over' : ''} {disabled ? 'disabled' : ''}"
    ondrop={handleDrop}
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
    onclick={() => !disabled && fileInput.click()}
    onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && !disabled && fileInput.click()}
    role="button"
    tabindex="0"
    aria-label="Upload files"
  >
    <input
      bind:this={fileInput}
      type="file"
      {accept}
      {multiple}
      {disabled}
      onchange={handleFileSelect}
      class="hidden"
    />

    {#if uploadState.status === 'uploading'}
      <!-- Upload Progress -->
      <div class="upload-progress">
        <div class="progress-circle">
          <svg class="w-12 h-12" viewBox="0 0 36 36">
            <path
              class="progress-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              stroke-width="2"
            />
            <path
              class="progress-bar"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#3b82f6"
              stroke-width="2"
              stroke-dasharray="{uploadState.progress}, 100"
            />
          </svg>
          <span class="progress-text">{uploadState.progress}%</span>
        </div>
        <p class="text-sm text-gray-600 mt-2">Uploading...</p>
      </div>
    {:else if uploadState.status === 'success'}
      <!-- Success State -->
      <div class="upload-success">
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <p class="text-sm text-green-600">Upload successful!</p>
        <button onclick={reset} class="text-xs text-blue-600 hover:text-blue-800 mt-1">
          Upload another file
        </button>
      </div>
    {:else if uploadState.status === 'error'}
      <!-- Error State -->
      <div class="upload-error">
        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <p class="text-sm text-red-600 mb-2">{uploadState.error}</p>
        <button onclick={reset} class="text-xs text-blue-600 hover:text-blue-800">
          Try again
        </button>
      </div>
    {:else}
      <!-- Default Upload State -->
      <div class="upload-prompt">
        <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
        </div>
        <p class="text-sm font-medium text-gray-900 mb-1">
          {multiple ? 'Choose files' : 'Choose file'} or drag and drop
        </p>
        <p class="text-xs text-gray-500">
          {config.allowedTypes.includes('image/jpeg') ? 'Images' : 'Documents'} up to {Math.round(config.maxSize / (1024 * 1024))}MB
        </p>
      </div>
    {/if}
  </div>

  <!-- File Previews -->
  {#if showPreview && selectedFiles.length > 0 && uploadState.status === 'idle'}
    <div class="file-previews mt-4">
      {#each selectedFiles as file, index}
        <div class="file-preview">
          {#if previewUrls[index]}
            <img src={previewUrls[index]} alt={file.name} class="preview-image" />
          {:else}
            <div class="document-preview">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          {/if}
          <div class="file-info">
            <p class="file-name">{file.name}</p>
            <p class="file-size">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
          <button onclick={() => removeFile(index)} class="remove-file" aria-label="Remove file {file.name}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      {/each}
      
      {#if multiple}
        <button onclick={uploadAllFiles} class="btn btn-primary btn-sm mt-2">
          Upload {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''}
        </button>
      {/if}
    </div>
  {/if}
</div>

<style>
  .file-upload {
    @apply w-full;
  }

  .drop-zone {
    @apply border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer transition-colors;
  }

  .drop-zone:hover:not(.disabled) {
    @apply border-blue-400 bg-blue-50;
  }

  .drop-zone.drag-over {
    @apply border-blue-500 bg-blue-100;
  }

  .drop-zone.disabled {
    @apply opacity-50 cursor-not-allowed;
  }

  .upload-progress {
    @apply flex flex-col items-center;
  }

  .progress-circle {
    @apply relative;
  }

  .progress-text {
    @apply absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-900;
  }

  .file-previews {
    @apply space-y-2;
  }

  .file-preview {
    @apply flex items-center space-x-3 p-3 border border-gray-200 rounded-lg;
  }

  .preview-image {
    @apply w-12 h-12 object-cover rounded;
  }

  .document-preview {
    @apply w-12 h-12 bg-gray-100 rounded flex items-center justify-center;
  }

  .file-info {
    @apply flex-1 min-w-0;
  }

  .file-name {
    @apply text-sm font-medium text-gray-900 truncate;
  }

  .file-size {
    @apply text-xs text-gray-500;
  }

  .remove-file {
    @apply text-gray-400 hover:text-red-500 transition-colors;
  }
</style>
