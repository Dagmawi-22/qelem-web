<script lang="ts">
	import FlashcardDeck from '../../components/FlashcardDeck.svelte';
	import { flashCardStore } from '../../stores/flashcard';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';

	let initialFlashcards: { front: string; back: string; id?: string }[] = [];

	$: deckId = $page.params.deckId || 'user-flashcards';

	onMount(() => {
		const storeFlashcards = get(flashCardStore);
		initialFlashcards = storeFlashcards.map((card, index) => ({
			...card,
			id: `user-card-${index}`
		}));
	});
</script>

<FlashcardDeck {initialFlashcards} {deckId} />
