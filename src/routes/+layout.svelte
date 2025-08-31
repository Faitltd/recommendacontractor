<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import Navigation from '$lib/components/Navigation.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children, data } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Recommend a Contractor - Denver's Trusted Contractor Reviews</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 flex flex-col">
  <Navigation currentPath={data?.currentPath || ''} session={data?.session} />
  <main class="flex-1">
    {@render children?.()}
  </main>
  <Footer />
</div>

