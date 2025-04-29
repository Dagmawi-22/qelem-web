<script lang="ts">
	import FlashcardDeck from '../../components/FlashcardDeck.svelte';
	import { flashCardStore } from '../../stores/flashcard';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let flashcards: { front: string; back: string }[] = [];

	onMount(() => {
		flashcards = get(flashCardStore);
	});
</script>

<FlashcardDeck {flashcards} />
