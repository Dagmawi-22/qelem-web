<script lang="ts">
	import { questionStore } from '../../stores/questions';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let questions: any[] = [];

	onMount(() => {
		questions = get(questionStore);
	});
</script>

<section class="p-6">
	<h2 class="text-2xl font-bold mb-4">📝 Exam Page</h2>
	{#each questions as q, index}
		<div class="mb-6 border-b pb-4">
			<p class="font-semibold text-lg">{index + 1}. {q.question}</p>
			<ul class="ml-4 mt-2 space-y-1">
				{#each q.options as option}
					<li>
						<strong>{option.value}</strong>: {option.description}
						{option.isCorrect ? ' ✅' : ''}
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</section>
