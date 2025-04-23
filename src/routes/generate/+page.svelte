<script lang="ts">
	let numQuestions = 5;
	let difficulty = 'medium';
	let file: File | null = null;

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		file = target.files?.[0] ?? null;
	}

	function handleSubmit() {
		alert(`Generating ${numQuestions} ${difficulty} questions from PDF: ${file?.name}`);
	}
</script>

<section class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
	<div class="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
		<h2 class="text-3xl font-bold text-center text-gray-800 mb-6">📄 Generate Questions</h2>

		<form on:submit|preventDefault={handleSubmit} class="space-y-6">
			<div>
				<p class="block text-sm font-semibold text-gray-700 mb-1">Upload PDF</p>
				<input
					type="file"
					accept=".pdf"
					on:change={handleFileChange}
					class="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold 
						file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border rounded-lg p-2 text-gray-600"
				/>
			</div>

			<div>
				<p class="block text-sm font-semibold text-gray-700 mb-1">Number of Questions</p>
				<input
					type="number"
					min="1"
					bind:value={numQuestions}
					class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<div>
				<p class="block text-sm font-semibold text-gray-700 mb-1">Difficulty</p>
				<select
					bind:value={difficulty}
					class="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="easy">Easy</option>
					<option value="medium">Medium</option>
					<option value="hard">Hard</option>
				</select>
			</div>

			<button
				type="submit"
				class="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
					text-white font-bold py-3 rounded-full shadow-md transform transition-all duration-300 
					hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
			>
				 Trick Me!
			</button>
		</form>
	</div>
</section>
