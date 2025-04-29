<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import FlashcardCard from './Flashcard.svelte';

	export let flashcards: { front: string; back: string }[] = [];

	let currentIndex = 0;
	let isFlipped = false;

	function flipCard() {
		isFlipped = !isFlipped;
	}

	function nextCard() {
		if (currentIndex < flashcards.length - 1) {
			currentIndex++;
			isFlipped = false;
		} else {
			currentIndex = 0;
		}
	}

	$: progress = flashcards.length > 0 ? ((currentIndex + 1) / flashcards.length) * 100 : 0;
	$: currentCard = flashcards[currentIndex] || { front: '', back: '' };
</script>

{#if flashcards.length > 0}
	<section class="mx-auto max-w-2xl p-4 sm:p-6">
		<div class="mb-6">
			<div class="mb-2 flex items-center justify-between">
				<h2 class="text-xl font-semibold text-gray-800">Flashcards</h2>
				<span class="text-sm font-medium text-gray-500">
					{currentIndex + 1} / {flashcards.length}
				</span>
			</div>
			<div class="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
				<div
					class="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300 ease-out"
					style={`width: ${progress}%`}
				/>
			</div>
		</div>

		<div class="mb-8 h-64 min-w-[300px]">
			<FlashcardCard
				front={currentCard.front}
				back={currentCard.back}
				bind:isFlipped
				on:click={flipCard}
			/>
		</div>

		<div class="flex justify-center space-x-4">
			<button
				class="flex items-center justify-center rounded-full bg-white p-3 shadow-md hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
				on:click={flipCard}
				title="Flip card"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 text-indigo-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
					/>
				</svg>
			</button>

			<button
				class="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
				on:click={nextCard}
				transition:fly={{ y: 20, duration: 300 }}
			>
				&rarr;
			</button>
		</div>
	</section>
{:else}
	<div class="py-12 text-center" transition:fade>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="mx-auto h-12 w-12 text-gray-400"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<h3 class="mt-4 text-lg font-medium text-gray-900">No flashcards available</h3>
		<p class="mt-1 text-gray-500">Add some flashcards to get started</p>
	</div>
{/if}
