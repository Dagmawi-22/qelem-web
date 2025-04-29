<script lang="ts">
	import { flashCardStore } from '../../stores/flashcard';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';

	let flashcards: any[] = [];
	let currentIndex = 0;
	let isFlipped = false;
	let showNext = false;

	onMount(() => {
		flashcards = get(flashCardStore);
	});

	function flipCard() {
		isFlipped = !isFlipped;
	}

	function nextCard() {
		if (currentIndex < flashcards.length - 1) {
			currentIndex++;
			isFlipped = false;
			showNext = false;
		} else {
			currentIndex = 0;
		}
	}
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
			<div class="progress-bar">
				<div
					class="progress"
					style={`width: ${((currentIndex + 1) / flashcards.length) * 100}%`}
				></div>
			</div>
		</div>

		<div class="flashcard-container mb-8">
			<div
				class="flashcard h-64 w-full cursor-pointer {isFlipped ? 'flipped' : ''}"
				on:click={flipCard}
			>
				<div class="flashcard-face bg-gradient-to-br from-indigo-500 to-purple-600">
					<p class="text-md text-center font-bold text-white md:text-2xl" transition:fade>
						{!isFlipped ? flashcards[currentIndex].front : ''}
					</p>
				</div>
				<div class="flashcard-face flashcard-back bg-gradient-to-br from-blue-500 to-teal-400">
					<p class="text-md text-center font-bold text-white md:text-2xl" transition:fade>
						{isFlipped ? flashcards[currentIndex].back : ''}
					</p>
				</div>
			</div>
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

<style>
	.flashcard-container {
		perspective: 1000px;
		min-width: 300px;
	}

	.flashcard {
		transition: transform 0.6s;
		transform-style: preserve-3d;
		position: relative;
	}

	.flashcard.flipped {
		transform: rotateY(180deg);
	}

	.flashcard-face {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 1rem;
		padding: 2rem;
		box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
	}

	.flashcard-back {
		transform: rotateY(180deg);
	}

	.progress-bar {
		height: 6px;
		background-color: #e5e7eb;
		border-radius: 3px;
		overflow: hidden;
	}

	.progress {
		height: 100%;
		background: linear-gradient(90deg, #8b5cf6, #6366f1);
		transition: width 0.3s ease;
	}
</style>
