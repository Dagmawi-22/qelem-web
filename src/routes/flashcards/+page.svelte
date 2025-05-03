<script lang="ts">
    import FlashcardDeck from '../../components/FlashcardDeck.svelte';
    import { flashCardStore } from '../../stores/flashcard';
</script>

<FlashcardDeck initialFlashcards={$flashCardStore} />