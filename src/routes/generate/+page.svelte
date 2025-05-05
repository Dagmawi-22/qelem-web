<script lang="ts">
	import { appModeStore } from '../../stores/activemode';
	import { flashCardStore } from '../../stores/flashcard';
	import { goto } from '$app/navigation';
	import { questionStore } from '../../stores/questions';
	import { toast, Toaster } from 'svelte-sonner';
	import api from '$lib/api';

	let numQuestions = 5;
	let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
	let file: File | null = null;
	let isGenerating = false;

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
			toast('Please upload a PDF file.', {
				position: 'top-center',
				duration: 3000,
				style: 'background: #FEE2E2; color: #B91C1C; border: none;'
			});
			return;
		}

		if (file.size > 1024 * 1024) {
			toast('File size exceeds 1MB limit.', {
				position: 'top-center',
				duration: 3000,
				style: 'background: #FEE2E2; color: #B91C1C; border: none;'
			});
			return;
		}

		isGenerating = true;
		const loadingToast = toast.loading('Generating content...', {
			position: 'top-center',
			duration: 9000
		});

		try {
			const appMode = $appModeStore;
			const mode = appMode === 'flashcard' ? 'flashcard' : 'exam';

			const response = await api.uploadPdfAndGenerateContent(file, numQuestions, difficulty, mode);

			if (appMode === 'flashcard') {
				// If your flashcards API returns an array directly:
				flashCardStore.set(response);
				toast.success(`Generated ${numQuestions} flashcards!`, {
					id: loadingToast,
					position: 'top-center',
					duration: 2000,
					style: 'background: #DCFCE7; color: #166534; border: none;'
				});
				await goto('/flashcards');
			} else {
				// For exam questions, the response is already in the correct format
				// No need to map since the API returns exactly what we need
				questionStore.set(response);
				toast.success(`Generated ${numQuestions} questions!`, {
					id: loadingToast,
					position: 'top-center',
					duration: 2000,
					style: 'background: #DCFCE7; color: #166534; border: none;'
				});
				await goto('/exam');
			}
		} catch (error) {
			console.error('Generation failed:', error);
			toast.error('Failed to generate content. Please try again.', {
				id: loadingToast,
				position: 'top-center',
				duration: 3000,
				style: 'background: #FEE2E2; color: #B91C1C; border: none;'
			});
		} finally {
			isGenerating = false;
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/sonner/dist/sonner.min.css" />
</svelte:head>

<section class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-md space-y-8">
		<div class="text-center">
			<h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
				<span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Generate Study Content
				</span>
			</h1>
			<p class="mt-2 text-sm text-gray-600">
				Upload your PDF and we'll create flashcards or questions for you
			</p>
		</div>

		<div class="overflow-hidden rounded-xl bg-white shadow-xl">
			<div class="px-8 py-8 sm:px-10 sm:py-10">
				<form on:submit|preventDefault={handleSubmit} class="space-y-6">
					<div class="space-y-2">
						<p class="block text-sm font-medium text-gray-700">Upload PDF (Up to 1MB)</p>
						<div class="flex items-center justify-center">
							<label
								class="flex w-full cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-gray-300 bg-white px-4 py-6 transition hover:border-gray-400 hover:bg-gray-50"
							>
								{#if file}
									<svg
										class="mb-3 h-10 w-10 text-blue-500"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										></path>
									</svg>
									<span class="max-w-xs truncate text-sm font-medium text-gray-900">
										{file.name}
									</span>
									<span class="mt-1 text-xs text-gray-500"> Click to change file </span>
								{:else}
									<svg
										class="mb-3 h-10 w-10 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
										></path>
									</svg>
									<span class="text-sm text-gray-600"> Click to browse or drag and drop </span>
								{/if}
								<input type="file" accept=".pdf" on:change={handleFileChange} class="hidden" />
							</label>
						</div>
					</div>

					<div class="space-y-2">
						<label for="numQuestions" class="block text-sm font-medium text-gray-700">
							Number of Questions (5-20)
						</label>
						<input
							id="numQuestions"
							type="number"
							min="5"
							max="20"
							bind:value={numQuestions}
							class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
						/>
					</div>

					<div class="space-y-2">
						<label for="difficulty" class="block text-sm font-medium text-gray-700">
							Difficulty Level
						</label>
						<select
							id="difficulty"
							bind:value={difficulty}
							class="block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-xs focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm md:text-sm"
						>
							{#each difficultyLevels as level}
								<option value={level.value} class="">{level.label}</option>
							{/each}
						</select>
					</div>

					<div class="pt-2">
						<button
							type="submit"
							class="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
						>
							Generate Content
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>

<Toaster />
