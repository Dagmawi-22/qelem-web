<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import '../app.css';

	const showBackBtn = derived(page, ($page) => $page.url.pathname !== '/');
</script>

<div class="relative flex min-h-screen flex-col">
	{#if $showBackBtn}
		<button
			class="absolute top-4 left-4 rounded bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 shadow hover:bg-gray-200"
			on:click={() => (history.length > 1 ? history.back() : goto('/'))}
		>
			← Back
		</button>
	{/if}

	<a
		href="https://github.com/Dagmawi-22"
		target="_blank"
		rel="noopener noreferrer"
		class="absolute top-4 right-4 transition hover:opacity-80"
		aria-label="GitHub"
	>
		<img src="/github.png" alt="GitHub" class="h-6 w-6" />
	</a>

	<button
		class="cursor-pointer bg-gray-200 p-4 text-center text-xl font-bold text-gray-600 shadow-md"
		on:click={() => goto('/')}
	>
		QELEM
	</button>

	<main class="flex flex-grow items-center justify-center p-4">
		<slot />
	</main>

	<footer class="bg-gray-100 p-4 text-center text-sm text-gray-600 shadow-inner">
		© {new Date().getFullYear()} QELEM. All rights reserved.
	</footer>
</div>
