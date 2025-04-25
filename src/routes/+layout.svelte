<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.css';
</script>

<div class="relative flex min-h-screen flex-col">
	<a
		href="https://github.com/Dagmawi-22"
		target="_blank"
		rel="noopener noreferrer"
		class="absolute top-4 right-4 text-gray-400 transition hover:text-black"
		aria-label="GitHub"
	>
		<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
			<path
				fill-rule="evenodd"
				d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577 
				0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.612-4.042-1.612-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 
				1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.304.762-1.604-2.665-.304-5.467-1.334-5.467-5.93 
				0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 
				1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 
				1.235 1.913 1.235 3.222 0 4.61-2.807 5.624-5.48 5.921.43.37.823 1.102.823 2.222 
				0 1.604-.015 2.896-.015 3.286 0 .32.19.694.8.576C20.565 21.796 24 17.3 24 12 
				24 5.373 18.627 0 12 0z"
				clip-rule="evenodd"
			/>
		</svg>
	</a>

	<button
		class="cursor-pointer bg-gray-800 p-4 text-center text-xl font-bold text-white shadow-md"
		on:click={() => goto('/')}
	>
		Qelem
	</button>

	<main class="flex flex-grow items-center justify-center p-4">
		<slot />
	</main>

	<footer class="bg-gray-100 p-4 text-center text-sm text-gray-600 shadow-inner">
		© {new Date().getFullYear()} Qelem. All rights reserved.
	</footer>
</div>
