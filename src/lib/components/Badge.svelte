<script lang="ts">
  let { 
    variant = 'default',
    size = 'md',
    children
  } = $props<{
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'verified';
    size?: 'sm' | 'md' | 'lg';
    children: any;
  }>();
  
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    verified: 'bg-blue-100 text-blue-800 border border-blue-200'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };
</script>

<span class="inline-flex items-center rounded-full font-medium {variantClasses[variant]} {sizeClasses[size]}">
  {#if variant === 'verified'}
    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  {/if}
  {@render children()}
</span>
