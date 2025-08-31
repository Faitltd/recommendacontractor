<script lang="ts">
  let { 
    rating = 0,
    maxRating = 5,
    size = 'md',
    showValue = true,
    interactive = false,
    onRatingChange
  } = $props<{
    rating: number;
    maxRating?: number;
    size?: 'sm' | 'md' | 'lg';
    showValue?: boolean;
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
  }>();
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  let hoveredRating = $state(0);
  
  function handleStarClick(starRating: number) {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  }
  
  function handleStarHover(starRating: number) {
    if (interactive) {
      hoveredRating = starRating;
    }
  }
  
  function handleMouseLeave() {
    if (interactive) {
      hoveredRating = 0;
    }
  }
  
  function getStarFill(starIndex: number): 'full' | 'half' | 'empty' {
    const currentRating = interactive && hoveredRating > 0 ? hoveredRating : rating;
    const starValue = starIndex + 1;
    
    if (currentRating >= starValue) {
      return 'full';
    } else if (currentRating >= starValue - 0.5) {
      return 'half';
    } else {
      return 'empty';
    }
  }
</script>

<div class="flex items-center space-x-2">
  <div
    class="flex items-center space-x-1"
    role="group"
    onmouseleave={handleMouseLeave}
  >
    {#each Array(maxRating) as _, i}
      {@const starFill = getStarFill(i)}
      <button
        type="button"
        class="relative focus:outline-none {interactive ? 'cursor-pointer hover:scale-110 transition-transform duration-150' : 'cursor-default'}"
        onclick={() => handleStarClick(i + 1)}
        onmouseenter={() => handleStarHover(i + 1)}
        disabled={!interactive}
      >
        {#if starFill === 'full'}
          <svg class="{sizeClasses[size]} text-yellow-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        {:else if starFill === 'half'}
          <div class="relative">
            <svg class="{sizeClasses[size]} text-gray-300 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <div class="absolute inset-0 overflow-hidden" style="width: 50%;">
              <svg class="{sizeClasses[size]} text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
        {:else}
          <svg class="{sizeClasses[size]} text-gray-300 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        {/if}
      </button>
    {/each}
  </div>
  
  {#if showValue}
    <span class="text-sm font-medium text-gray-700">
      {rating.toFixed(1)}
    </span>
  {/if}
</div>
