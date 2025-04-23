<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
	<header class="bg-gray-800 text-white p-4 text-center text-xl font-bold shadow-md">
		Trick Me
	</header>

	<main class="flex-grow flex items-center justify-center p-4">
		{@render children()}
	</main>

	<footer class="bg-gray-100 text-center text-sm text-gray-600 p-4 shadow-inner">
		© {new Date().getFullYear()} Trick Me. All rights reserved.
	</footer>
</div>
