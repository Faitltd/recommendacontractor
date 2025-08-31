<script lang="ts">
  import FileUpload from './FileUpload.svelte';
  import type { UploadResult } from '$lib/storage/types';

  interface DocumentType {
    id: string;
    name: string;
    description: string;
    required: boolean;
    acceptedFormats: string[];
  }

  interface Props {
    documentTypes: DocumentType[];
    existingDocuments?: Record<string, string>;
    disabled?: boolean;
    onDocumentsChange?: (documents: Record<string, string>) => void;
    onError?: (error: string) => void;
  }

  let {
    documentTypes,
    existingDocuments = {},
    disabled = false,
    onDocumentsChange,
    onError
  }: Props = $props();

  let uploadedDocuments = $state<Record<string, string>>({ ...existingDocuments });
  let uploadingDocuments = $state<Set<string>>(new Set());
  let uploadErrors = $state<Record<string, string>>({});

  function handleUpload(documentTypeId: string, result: UploadResult) {
    if (result.success && result.url) {
      uploadedDocuments = { ...uploadedDocuments, [documentTypeId]: result.url };
      uploadErrors = { ...uploadErrors };
      delete uploadErrors[documentTypeId];
      
      // Remove from uploading set
      uploadingDocuments.delete(documentTypeId);
      uploadingDocuments = new Set(uploadingDocuments);
      
      if (onDocumentsChange) {
        onDocumentsChange(uploadedDocuments);
      }
    }
  }

  function handleError(documentTypeId: string, error: string) {
    uploadErrors = { ...uploadErrors, [documentTypeId]: error };
    
    // Remove from uploading set
    uploadingDocuments.delete(documentTypeId);
    uploadingDocuments = new Set(uploadingDocuments);
    
    if (onError) {
      onError(`${getDocumentType(documentTypeId)?.name}: ${error}`);
    }
  }

  function handleUploadStart(documentTypeId: string) {
    uploadingDocuments.add(documentTypeId);
    uploadingDocuments = new Set(uploadingDocuments);
    
    // Clear previous error
    uploadErrors = { ...uploadErrors };
    delete uploadErrors[documentTypeId];
  }

  function removeDocument(documentTypeId: string) {
    uploadedDocuments = { ...uploadedDocuments };
    delete uploadedDocuments[documentTypeId];
    
    if (onDocumentsChange) {
      onDocumentsChange(uploadedDocuments);
    }
  }

  function getDocumentType(id: string): DocumentType | undefined {
    return documentTypes.find(type => type.id === id);
  }

  function getFileIcon(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'M7 18A2 2 0 005 16V6a2 2 0 012-2h6l4 4v8a2 2 0 01-2 2H7z M9 8h6 M9 12h6 M9 16h3';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z';
      default:
        return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
    }
  }

  const requiredDocuments = $derived(documentTypes.filter(doc => doc.required));
  const optionalDocuments = $derived(documentTypes.filter(doc => !doc.required));
  const completedRequired = $derived(
    requiredDocuments.every(doc => uploadedDocuments[doc.id])
  );
</script>

<div class="document-upload">
  <div class="mb-6">
    <h3 class="text-lg font-medium text-gray-900 mb-2">Verification Documents</h3>
    <p class="text-sm text-gray-600">
      Upload the required documents to verify your contractor credentials.
    </p>
  </div>

  <!-- Progress Indicator -->
  <div class="progress-indicator mb-6">
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm font-medium text-gray-700">
        Required Documents ({Object.keys(uploadedDocuments).filter(id => 
          requiredDocuments.some(doc => doc.id === id)
        ).length}/{requiredDocuments.length})
      </span>
      {#if completedRequired}
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          Complete
        </span>
      {/if}
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div 
        class="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style="width: {(Object.keys(uploadedDocuments).filter(id => 
          requiredDocuments.some(doc => doc.id === id)
        ).length / requiredDocuments.length) * 100}%"
      ></div>
    </div>
  </div>

  <!-- Required Documents -->
  {#if requiredDocuments.length > 0}
    <div class="required-documents mb-8">
      <h4 class="text-md font-medium text-gray-900 mb-4 flex items-center">
        <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
        Required Documents
      </h4>
      
      <div class="space-y-6">
        {#each requiredDocuments as docType}
          <div class="document-section">
            <div class="document-header">
              <div class="flex items-start justify-between mb-2">
                <div>
                  <h5 class="text-sm font-medium text-gray-900">{docType.name}</h5>
                  <p class="text-xs text-gray-500 mt-1">{docType.description}</p>
                </div>
                {#if uploadedDocuments[docType.id]}
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Uploaded
                  </span>
                {/if}
              </div>
            </div>

            {#if uploadErrors[docType.id]}
              <div class="mb-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
                {uploadErrors[docType.id]}
              </div>
            {/if}

            {#if uploadedDocuments[docType.id]}
              <!-- Uploaded Document Display -->
              <div class="uploaded-document">
                <div class="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{getFileIcon(uploadedDocuments[docType.id])}"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">Document uploaded</p>
                      <p class="text-xs text-gray-500">Click to view</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <a 
                      href={uploadedDocuments[docType.id]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="text-blue-600 hover:text-blue-800 text-xs"
                    >
                      View
                    </a>
                    <button
                      onclick={() => removeDocument(docType.id)}
                      class="text-red-600 hover:text-red-800 text-xs"
                      disabled={disabled}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            {:else}
              <!-- Upload Area -->
              <div class="upload-area">
                <FileUpload
                  preset="verificationDocument"
                  accept={docType.acceptedFormats.join(',')}
                  disabled={disabled || uploadingDocuments.has(docType.id)}
                  showPreview={false}
                  className="document-upload-compact"
                  onUpload={(result) => handleUpload(docType.id, result)}
                  onError={(error) => handleError(docType.id, error)}
                />
                
                <div class="mt-2 text-xs text-gray-500">
                  Accepted formats: {docType.acceptedFormats.map(format => format.split('/')[1].toUpperCase()).join(', ')}
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Optional Documents -->
  {#if optionalDocuments.length > 0}
    <div class="optional-documents">
      <h4 class="text-md font-medium text-gray-900 mb-4 flex items-center">
        <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
        Optional Documents
      </h4>
      
      <div class="space-y-6">
        {#each optionalDocuments as docType}
          <div class="document-section">
            <div class="document-header">
              <div class="flex items-start justify-between mb-2">
                <div>
                  <h5 class="text-sm font-medium text-gray-900">{docType.name}</h5>
                  <p class="text-xs text-gray-500 mt-1">{docType.description}</p>
                </div>
                {#if uploadedDocuments[docType.id]}
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Uploaded
                  </span>
                {/if}
              </div>
            </div>

            {#if uploadErrors[docType.id]}
              <div class="mb-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
                {uploadErrors[docType.id]}
              </div>
            {/if}

            {#if uploadedDocuments[docType.id]}
              <!-- Uploaded Document Display -->
              <div class="uploaded-document">
                <div class="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{getFileIcon(uploadedDocuments[docType.id])}"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">Document uploaded</p>
                      <p class="text-xs text-gray-500">Click to view</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <a 
                      href={uploadedDocuments[docType.id]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="text-blue-600 hover:text-blue-800 text-xs"
                    >
                      View
                    </a>
                    <button
                      onclick={() => removeDocument(docType.id)}
                      class="text-red-600 hover:text-red-800 text-xs"
                      disabled={disabled}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            {:else}
              <!-- Upload Area -->
              <div class="upload-area">
                <FileUpload
                  preset="verificationDocument"
                  accept={docType.acceptedFormats.join(',')}
                  disabled={disabled || uploadingDocuments.has(docType.id)}
                  showPreview={false}
                  className="document-upload-compact"
                  onUpload={(result) => handleUpload(docType.id, result)}
                  onError={(error) => handleError(docType.id, error)}
                />
                
                <div class="mt-2 text-xs text-gray-500">
                  Accepted formats: {docType.acceptedFormats.map(format => format.split('/')[1].toUpperCase()).join(', ')}
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .document-section {
    @apply border border-gray-200 rounded-lg p-4;
  }

  .progress-indicator {
    @apply bg-gray-50 rounded-lg p-4;
  }

  :global(.document-upload-compact .drop-zone) {
    @apply p-3 text-center;
  }
  
  :global(.document-upload-compact .upload-prompt > div:first-child) {
    @apply w-8 h-8 mb-2;
  }
  
  :global(.document-upload-compact .upload-prompt > div:first-child svg) {
    @apply w-4 h-4;
  }
  
  :global(.document-upload-compact .upload-prompt p:first-of-type) {
    @apply text-xs font-medium;
  }
  
  :global(.document-upload-compact .upload-prompt p:last-of-type) {
    @apply text-xs;
  }
</style>
