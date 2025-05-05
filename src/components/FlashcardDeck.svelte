<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import FlashcardCard from './Flashcard.svelte';
	import { goto } from '$app/navigation';
	import { appModeStore } from '../stores/activemode';
	import { onMount } from 'svelte';
	import { FlipHorizontal, ArrowRight, Plus, Frown, X, Facebook, Link } from 'lucide-svelte';
	import { toast, Toaster } from 'svelte-sonner';

	export let initialFlashcards: { front: string; back: string; id?: string }[] = [];

	let flashcards: { front: string; back: string; id: string }[] = [];
	let currentIndex = 0;
	let isFlipped = false;
	let deckTitle = 'Your Flashcards';

	onMount(() => {
		if (initialFlashcards.length > 0) {
			flashcards = initialFlashcards.map((card, idx) => ({
				...card,
				id: card.id || `card-${idx}`
			}));
		}
	});

	function handleAddFlashcard() {
		appModeStore.set('flashcard');
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

	function shareOnX() {
		const url = `https://twitter.com/intent/tweet?text=Check out my flashcard deck!&url=${window.location.href}`;
		window.open(url, '_blank');
	}

	function shareOnFacebook() {
		const url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
		window.open(url, '_blank');
	}

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(window.location.href);
			toast.success('Link copied to clipboard!');
		} catch (err) {
			toast.error('Failed to copy link');
		}
	}

	$: progress = flashcards.length > 0 ? ((currentIndex + 1) / flashcards.length) * 100 : 0;
	$: currentCard = flashcards[currentIndex] || { front: '', back: '', id: '' };
</script>

<section class="mx-auto max-w-2xl p-4 sm:p-6">
	{#if flashcards.length > 0}
		<div class="mb-6">
			<div class="mb-2 flex items-center justify-between">
				<h2 class="font-semibold text-gray-800">{deckTitle}</h2>
				<span class="text-sm font-medium text-gray-500">
					{currentIndex + 1} / {flashcards.length}
				</span>
			</div>
			<div class="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
				<div
					class="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300 ease-out"
					style="width: {progress}%"
				/>
			</div>
		</div>

		<div class="mb-8 h-64 min-w-[300px]">
			<FlashcardCard
				front={currentCard.front}
				back={currentCard.back}
				bind:isFlipped
				on:click={flipCard}
				id={currentCard.id}
			/>
		</div>

		<div class="mb-8 flex justify-center space-x-4">
			<button
				class="flex items-center justify-center rounded-full bg-white p-3 shadow-md hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
				on:click={flipCard}
				title="Flip card"
			>
				<FlipHorizontal class="h-6 w-6 text-indigo-600" />
			</button>

			<button
				class="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
				on:click={nextCard}
				transition:fly={{ y: 20, duration: 300 }}
			>
				<ArrowRight class="h-6 w-6 text-white" />
			</button>
		</div>

		<div class="flex justify-center space-x-4">
			<button
				on:click={shareOnX}
				class="rounded-full bg-black p-3 text-white hover:bg-gray-800"
				title="Share on X"
			>
				<X class="h-5 w-5" />
			</button>
			<button
				on:click={shareOnFacebook}
				class="rounded-full bg-blue-600 p-3 text-white hover:bg-blue-700"
				title="Share on Facebook"
			>
				<Facebook class="h-5 w-5" />
			</button>
			<button
				on:click={copyLink}
				class="rounded-full bg-gray-600 p-3 text-white hover:bg-gray-700"
				title="Copy link"
			>
				<Link class="h-5 w-5" />
			</button>
		</div>
	{:else}
		<div class="py-12 text-center" transition:fade>
			<div class="mx-auto h-12 w-12 text-gray-400">
				<Frown class="icon" />
			</div>
			<h3 class="mt-4 text-lg font-medium text-gray-900">No flashcards available</h3>
			<p class="mt-1 text-gray-500">Add some flashcards to get started</p>
			<button
				on:click={handleAddFlashcard}
				class="mt-6 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-indigo-700"
			>
				<Plus class="h-5 w-5" />
				Add Flashcards
			</button>
		</div>
	{/if}
	<Toaster />
</section>
