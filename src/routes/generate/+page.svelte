

<script lang="ts">
    import { questionStore } from '../../stores/questions';
    import { goto } from '$app/navigation'; 

	let numQuestions = 5;
	let difficulty = 'medium';
	let file: File | null = null;
	let questions: string[] = [];

	const difficultyLevels = [
		{ value: 'easy', label: 'Easy' },
		{ value: 'medium', label: 'Medium' },
		{ value: 'hard', label: 'Hard' }
	];

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		file = target.files?.[0] ?? null;
	}

    async function handleSubmit() {
	if (!file) {
		alert('Please upload a PDF file.');
		return;
	}

	// Fake generation delay
	await new Promise((resolve) => setTimeout(resolve, 1000));

		questions = Array.from({ length: numQuestions }, (_, i) => {
			return `(${difficulty.toUpperCase()}) Question ${i + 1}: What is the answer to question ${i + 1}?`;
		});
	}
</script>

<section class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
	<div class="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
		<h2 class="mb-6 text-center text-3xl font-bold text-gray-800">📄 Generate Questions</h2>

		<form on:submit|preventDefault={handleSubmit} class="space-y-6">
			<div>
				<p class="mb-1 block text-sm font-semibold text-gray-700">Upload PDF (Upto 1MB)</p>
				<input
					type="file"
					accept=".pdf"
					on:change={handleFileChange}
					class="w-full rounded-lg border p-2 text-gray-600 file:mr-4 file:rounded-lg file:border-0
						file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
				/>
			</div>

			<div>
				<p class="mb-1 block text-sm font-semibold text-gray-700">
					Number of Questions (Between 5 & 20)
				</p>
				<input
					type="number"
					min="5"
					max="20"
					bind:value={numQuestions}
					class="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>

			<div>
				<p class="mb-1 block text-sm font-semibold text-gray-700">Difficulty</p>
				<select
					bind:value={difficulty}
					class="w-full rounded-lg border border-gray-300 bg-white p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				>
					{#each difficultyLevels as level}
						<option value={level.value}>{level.label}</option>
					{/each}
				</select>
			</div>

			<button
				type="submit"
				class="w-full transform cursor-pointer rounded-full bg-gradient-to-r from-blue-500 to-purple-600
					py-3 font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:from-blue-600
					hover:to-purple-700 hover:shadow-lg focus:ring-4 focus:ring-purple-300 focus:outline-none"
			>
				Trick Me!
			</button>
		</form>

		{#if questions.length}
			<div class="mt-8 space-y-4">
				<h3 class="text-xl font-semibold text-gray-700">Mocked Questions:</h3>
				<ul class="list-inside list-disc text-gray-600">
					{#each questions as question}
						<li>{question}</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</section>
