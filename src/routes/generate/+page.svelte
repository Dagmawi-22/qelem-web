<script lang="ts">
	import { questionStore } from '../../stores/questions';
	import { goto } from '$app/navigation';

	let numQuestions = 5;
	let difficulty = 'medium';
	let file: File | null = null;
	
	const difficultyLevels = [
		{ value: 'easy', label: 'Easy' },
		{ value: 'medium', label: 'Medium' },
		{ value: 'hard', label: 'Tricky' }
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

		const generated = Array.from({ length: numQuestions }, (_, i) => ({
			question: `(${difficulty.toUpperCase()}) Question ${i + 1}: What is the answer to question ${i + 1}?`,
			options: [
				{ value: 'A', isCorrect: i % 4 === 0, description: 'Option A explanation' },
				{ value: 'B', isCorrect: i % 4 === 1, description: 'Option B explanation' },
				{ value: 'C', isCorrect: i % 4 === 2, description: 'Option C explanation' },
				{ value: 'D', isCorrect: i % 4 === 3, description: 'Option D explanation' }
			]
		}));

		questionStore.set(generated);
		await goto('/exam');
	}
</script>

<section class="flex min-h-screen items-center justify-center px-4 py-12">
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
				Go &rarr;
			</button>
		</form>
	</div>
</section>
