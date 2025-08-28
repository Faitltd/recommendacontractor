<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	let { data } = $props();
	
	let searchQuery = $state('');
	let loadingFacebook = $state(false);
	let loadingGoogle = $state(false);
	
	function handleSearch() {
		if (searchQuery.trim()) {
			window.location.href = `/contractors?q=${encodeURIComponent(searchQuery)}`;
		}
	}
	
	async function handleFacebookSignIn() {
		loadingFacebook = true;
		try {
			const urlParams = new URLSearchParams(window.location.search);
			const callbackUrl = urlParams.get('callbackUrl') || '/';
			await signIn('facebook', { callbackUrl });
		} catch (e) {
			console.error('Facebook sign in error:', e);
			loadingFacebook = false;
		}
	}
	
	async function handleGoogleSignIn() {
		loadingGoogle = true;
		try {
			const urlParams = new URLSearchParams(window.location.search);
			const callbackUrl = urlParams.get('callbackUrl') || '/';
			await signIn('google', { callbackUrl });
		} catch (e) {
			console.error('Google sign in error:', e);
			loadingGoogle = false;
		}
	}
</script>

<!-- Hero Section -->
<section class="gradient-primary text-white section-padding">
	<div class="container-custom">
		<div class="text-center max-w-4xl mx-auto">
			<h1 class="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
				Find <span class="text-blue-200">Trusted Contractors</span><br>
				in Denver
			</h1>
			<p class="text-xl lg:text-2xl text-blue-100 mb-12 leading-relaxed">
				Connect with verified, highly-rated contractors. Read authentic reviews,
				compare ratings, and make informed decisions for your home projects.
			</p>

			<!-- Search Bar -->
			<div class="max-w-2xl mx-auto mb-12">
				<div class="flex flex-col sm:flex-row gap-4 sm:gap-0">
					<input
						bind:value={searchQuery}
						type="text"
						placeholder="Search contractors, services, or ZIP codes..."
						class="input input-lg flex-1 sm:rounded-r-none text-gray-900 placeholder-gray-500"
						onkeydown={(e) => e.key === 'Enter' && handleSearch()}
					/>
					<button
						onclick={handleSearch}
						class="btn btn-secondary btn-lg sm:rounded-l-none whitespace-nowrap"
					>
						<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
						Search Contractors
					</button>
				</div>
			</div>

			<!-- User Status -->
			{#if data.session?.user}
				<div class="bg-blue-500/20 border border-blue-400/30 rounded-xl p-6 max-w-lg mx-auto backdrop-blur-sm">
					<div class="flex items-center justify-center space-x-3">
						{#if data.session.user.image}
							<img
								src={data.session.user.image}
								alt={data.session.user.name}
								class="w-10 h-10 rounded-full border-2 border-white/20"
							/>
						{/if}
						<div>
							<p class="text-blue-100 font-medium">
								Welcome back, {data.session.user.name}!
							</p>
							<p class="text-blue-200 text-sm">
								Ready to find your next contractor?
							</p>
						</div>
					</div>
				</div>
			{:else}
				<div class="bg-white/10 border border-white/20 rounded-xl p-6 max-w-lg mx-auto backdrop-blur-sm">
					<p class="text-blue-100 mb-4">
						Sign in to leave reviews and save your favorite contractors
					</p>
					<div class="flex flex-col sm:flex-row gap-3 justify-center">
						<button onclick={handleFacebookSignIn} disabled={loadingFacebook} class="btn btn-secondary">
							<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
							</svg>
							{#if loadingFacebook}Signing in...{:else}Facebook{/if}
						</button>
						<button onclick={handleGoogleSignIn} disabled={loadingGoogle} class="btn btn-outline">
							<svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
								<path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.5-5.1 3.5-3.1 0-5.6-2.6-5.6-5.7s2.5-5.7 5.6-5.7c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.9 3.3 14.7 2.4 12 2.4 6.9 2.4 2.7 6.6 2.7 11.7S6.9 21 12 21c5.7 0 9.5-4 9.5-9.6 0-.6-.1-1-.1-1.4H12z"/>
							</svg>
							{#if loadingGoogle}Signing in...{:else}Google{/if}
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
