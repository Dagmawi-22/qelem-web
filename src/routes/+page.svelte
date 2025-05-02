<script lang="ts">
	import { goto } from '$app/navigation';
	import { appModeStore } from '../stores/activemode';
</script>

<div
	class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-4 sm:p-8"
>
	<div
		class="border-opacity-10 w-full max-w-5xl overflow-hidden rounded-xl border border-purple-200 bg-white shadow-2xl"
	>
		<div class="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

		<div class="p-6 md:p-10 lg:p-12">
			<div class="mb-2 flex justify-center">
				<div
					class="rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold text-indigo-800 md:text-sm"
				>
					AI-Powered Learning Tools
				</div>
			</div>
			<h1
				class="mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-center text-xl leading-tight font-extrabold text-transparent sm:text-5xl md:text-3xl md:text-6xl"
			>
				Smart Study Companion
			</h1>
			<p class="mb-10 text-center text-sm text-gray-600 md:text-lg md:text-xl">
				Transform your documents into interactive learning materials with AI
			</p>

			<div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
				<div class="feature-card bg-indigo-50 hover:bg-indigo-100">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
						<svg
							class="h-6 w-6 text-indigo-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
							></path>
						</svg>
					</div>
					<h3 class="mb-2 text-sm font-semibold text-gray-800 md:text-lg">Upload Documents</h3>
					<p class="text-xs text-gray-600 md:text-sm">
						Upload PDFs, PPTs, or text files. Our AI extracts key concepts automatically.
					</p>
				</div>

				<div class="feature-card bg-purple-50 hover:bg-purple-100">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
						<svg
							class="h-6 w-6 text-purple-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
							/>
						</svg>
					</div>
					<h3 class="mb-2 text-sm font-semibold text-gray-800 md:text-lg">Smart Flash Cards</h3>
					<p class="text-xs text-gray-600 md:text-sm">
						Generate optimized study cards with spaced repetition algorithms.
					</p>
				</div>

				<div class="feature-card bg-blue-50 hover:bg-blue-100">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
						<svg
							class="h-6 w-6 text-blue-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							></path>
						</svg>
					</div>
					<h3 class="mb-2 text-sm font-semibold text-gray-800 md:text-lg">Custom Assessments</h3>
					<p class="text-xs text-gray-600 md:text-sm">
						Create quizzes with various question types tailored to your material.
					</p>
				</div>
			</div>

			<div class="mb-10 rounded-xl bg-gray-50 p-6 md:p-8">
				<h2 class="mb-4 text-center text-lg font-bold text-gray-800 md:text-2xl md:text-3xl">
					Why Choose Our Platform?
				</h2>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div class="flex flex-col items-start">
						<div class="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
							<svg
								class="h-5 w-5 text-indigo-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								></path>
							</svg>
						</div>
						<div>
							<h3 class="mb-1 text-xs font-semibold text-gray-800 md:text-sm">
								Active Recall & Spaced Repetition
							</h3>
							<p class="text-xs text-gray-600 md:text-sm">
								Our flash card system uses proven learning techniques to enhance memory retention.
							</p>
						</div>
					</div>
					<div class="flex flex-col items-start">
						<div class="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
							<svg
								class="h-5 w-5 text-purple-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								></path>
							</svg>
						</div>
						<div>
							<h3 class="mb-1 text-xs font-semibold text-gray-800 md:text-sm">
								Share Flashcards & Exams to Social Networks
							</h3>
							<p class="text-xs text-gray-600 md:text-sm">
								Seamlessly share your generated flash cards & exams to peers on popular platforms.
							</p>
						</div>
					</div>
					<div class="flex flex-col items-start">
						<div class="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
							<svg
								class="h-5 w-5 text-blue-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								></path>
							</svg>
						</div>
						<div>
							<h3 class="mb-1 text-xs font-semibold text-gray-800 md:text-sm">
								Smart Question Generation
							</h3>
							<p class="text-xs text-gray-600 md:text-sm">
								AI creates conceptual questions, not just simple fact recall.
							</p>
						</div>
					</div>
					<div class="flex flex-col items-start">
						<div class="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-pink-100">
							<svg
								class="h-5 w-5 text-pink-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								></path>
							</svg>
						</div>
						<div>
							<div class="mb-1 flex items-center gap-2">
								<h3 class="text-sm font-semibold text-gray-800 md:text-lg">Progress Tracking</h3>
								<span
									class="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-nowrap text-yellow-800"
									>Coming Soon</span
								>
							</div>
							<p class="text-xs text-gray-600 md:text-sm">
								Monitor your learning progress with detailed analytics and insights.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div
				class="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
			>
				<button
					on:click={() => goto('/generate')}
					class="group relative flex min-w-[220px] transform items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-indigo-600 hover:to-purple-700 hover:shadow-xl"
				>
					<span class="md:text-md relative z-10 flex items-center justify-center text-xs">
						Start Generating Now &rarr;
					</span>
					<span
						class="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></span>
				</button>

				<button
					on:click={() => {
						appModeStore.set('flash-card');
						goto('/generate');
					}}
					class="group relative flex min-w-[220px] transform items-center justify-center overflow-hidden rounded-full border border-indigo-500 bg-white px-8 py-3 font-bold text-indigo-600 shadow-md transition-all duration-300 hover:scale-105 hover:bg-indigo-50 hover:shadow-lg"
				>
					<span class="text md:text-md relative z-10 flex items-center justify-center text-xs">
						Create Flash Cards &rarr;
					</span>
				</button>
			</div>
		</div>
	</div>
</div>

<!-- styles -->
<style>
	.feature-card {
		padding: 1.75rem;
		border-radius: 0.75rem;
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.05),
			0 2px 4px -1px rgba(0, 0, 0, 0.02);
		cursor: default;
	}

	.feature-card:hover {
		transform: translateY(-0.5rem);
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}
</style>
