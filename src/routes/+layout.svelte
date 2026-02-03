<script lang="ts">
	import './layout.css';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex flex-col min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="bg-white shadow-sm border-b border-gray-200">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<a href="/" class="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition">
				Make a Bet
			</a>
		</div>
	</header>

	<!-- Main Content -->
	<main class="flex-1">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="bg-white border-t border-gray-200">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="text-center text-gray-600 text-sm">
				<p>&copy; 2026 Make a Bet. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
