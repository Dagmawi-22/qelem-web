<!-- FlashcardDeck.svelte -->
<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import FlashcardCard from './Flashcard.svelte';
	import { goto } from '$app/navigation';
	import { appModeStore } from '../stores/activemode';
	import { page } from '$app/stores';

	export let flashcards: { front: string; back: string; id?: string }[] = [];

	const deckId = 'static-flashcard-deck-123';

	let currentIndex = 0;
	let isFlipped = false;
	let showShareModal = false;
	let copiedToClipboard = false;

	function handleAddFlashcard() {
		appModeStore.set('flash-card');
		goto('/generate');
	}

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

	function openShareModal() {
		showShareModal = true;
		copiedToClipboard = false;
	}

	function closeShareModal() {
		showShareModal = false;
	}

	function copyToClipboard() {
		const currentUrl = `${$page.url.origin}/flashcards/${deckId}?card=${currentIndex}`;
		navigator.clipboard.writeText(currentUrl);
		copiedToClipboard = true;
		setTimeout(() => (copiedToClipboard = false), 2000);
	}

	function shareOnTwitter() {
		const text = `Check out this flashcard: "${currentCard.front}"`;
		const url = `${$page.url.origin}/flashcards/${deckId}?card=${currentIndex}`;
		window.open(
			`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
			'_blank'
		);
	}

	function shareOnFacebook() {
		const url = `${$page.url.origin}/flashcards/${deckId}?card=${currentIndex}`;
		window.open(
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
			'_blank'
		);
	}

	$: progress = flashcards.length > 0 ? ((currentIndex + 1) / flashcards.length) * 100 : 0;
	$: currentCard = flashcards[currentIndex] || { front: '', back: '' };
	$: currentCardId = currentCard.id || `card-${currentIndex}`;
</script>

{#if flashcards.length > 0}
	<section class="mx-auto max-w-2xl p-4 sm:p-6" id={deckId}>
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
				id={currentCardId}
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

			<button
				class="flex items-center justify-center rounded-full bg-white p-3 shadow-md hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
				on:click={openShareModal}
				title="Share card"
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
						d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
					/>
				</svg>
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
		<button
			on:click={handleAddFlashcard}
			class="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-indigo-700"
		>
			➕ Add Flashcards
		</button>
	</div>
{/if}

{#if showShareModal}
	<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
		<div class="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl" transition:fade>
			<button
				class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
				on:click={closeShareModal}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			<h3 class="mb-4 text-lg font-semibold text-gray-900">Share this flashcard</h3>

			<div class="mb-4 flex items-center space-x-2">
				<input
					type="text"
					readonly
					value={`${$page.url.origin}/flashcards/${deckId}?card=${currentIndex}`}
					class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
				/>
				<button
					on:click={copyToClipboard}
					class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
				>
					{copiedToClipboard ? 'Copied!' : 'Copy'}
				</button>
			</div>

			<div class="flex justify-center space-x-4">
				<button
					on:click={shareOnTwitter}
					class="flex items-center space-x-2 rounded-lg bg-blue-400 px-4 py-2 text-white hover:bg-blue-500"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
						/>
					</svg>
					<span>Twitter</span>
				</button>

				<button
					on:click={shareOnFacebook}
					class="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
						/>
					</svg>
					<span>Facebook</span>
				</button>
			</div>
		</div>
	</div>
{/if}
