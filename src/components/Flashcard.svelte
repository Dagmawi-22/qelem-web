<!-- FlashcardCard.svelte -->
<script lang="ts">
	import { fade } from 'svelte/transition';

	export let front: string;
	export let back: string;
	export let isFlipped: boolean;
	export let id: string = '';
</script>

<div class="perspective-1000 h-full w-full" {id}>
	<div
		class="preserve-3d relative h-full w-full cursor-pointer transition-transform duration-600"
		class:rotate-y-180={isFlipped}
	>
		<div
			class="absolute inset-0 flex rotate-y-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 shadow-lg backface-hidden"
		>
			<p class="text-center text-2xl font-bold text-white" transition:fade>
				{!isFlipped ? front : ''}
			</p>
		</div>
		<div
			class="absolute inset-0 flex rotate-y-180 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 p-8 shadow-lg backface-hidden"
		>
			<p class="text-center text-2xl font-bold text-white" transition:fade>
				{isFlipped ? back : ''}
			</p>
		</div>
	</div>
</div>

<style>
	.preserve-3d {
		transform-style: preserve-3d;
	}
	.backface-hidden {
		backface-visibility: hidden;
	}
	.rotate-y-0 {
		transform: rotateY(0deg);
	}
	.rotate-y-180 {
		transform: rotateY(180deg);
	}
	.perspective-1000 {
		perspective: 1000px;
	}
</style>
