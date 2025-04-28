<script lang="ts">
	import { flashCardStore } from '../../stores/flashcard';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

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
	<section class="mx-auto max-w-3xl p-6">
		<div class="mb-4 flex justify-between">
			<p class="text-lg font-medium text-blue-600">
				🃏 Flashcard {currentIndex + 1} / {flashcards.length}
			</p>
		</div>

		<div class="mb-4">
			<div class="relative w-full rounded-xl bg-white p-6 shadow-xl">
				<div class="flex items-center justify-center">
					<div
						class="flex h-64 w-full cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-center text-2xl font-bold text-white"
					>
						{#if isFlipped}
							<p class="text-lg">{flashcards[currentIndex].back}</p>
						{:else}
							<p class="text-lg">{flashcards[currentIndex].front}</p>
						{/if}
					</div>
				</div>
				<button
					class="absolute top-2 right-2 rounded-full bg-gray-700 p-2 text-white"
					on:click={flipCard}
				>
					🔄
				</button>
			</div>
		</div>

		{#if !isFlipped}
			<button
				class="mt-4 w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
				on:click={nextCard}
			>
				Next Flashcard
			</button>
		{/if}
	</section>
{:else}
	<p class="text-center text-lg font-semibold text-gray-600">No flashcards available.</p>
{/if}
