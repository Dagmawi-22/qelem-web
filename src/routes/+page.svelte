<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex flex-col items-center justify-center p-8">
	<div class="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden border border-opacity-10 border-purple-200">
		<!-- Decorative header strip -->
		<div class="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
		
		<div class="p-8 md:p-10">
			<!-- Animated title -->
			<h1 class="text-4xl md:text-5xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
				PDF Question Generator
			</h1>
			
			<!-- Feature highlights -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
				<div class="feature-card bg-indigo-50 hover:bg-indigo-100">
					<div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-gray-800 mb-2">Upload PDF</h3>
					<p class="text-gray-600">Simply upload your document and let our AI analyze the content.</p>
				</div>
				
				<div class="feature-card bg-purple-50 hover:bg-purple-100">
					<div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-gray-800 mb-2">Customize Questions</h3>
					<p class="text-gray-600">Choose quantity and difficulty to match your needs.</p>
				</div>
				
				<div class="feature-card bg-blue-50 hover:bg-blue-100">
					<div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-gray-800 mb-2">Instant Generation</h3>
					<p class="text-gray-600">Get high-quality questions in seconds with our powerful API.</p>
				</div>
			</div>
			
			<!-- Main description -->
			<p class="text-center text-lg text-gray-700 mb-10 leading-relaxed px-4">
				Transform your <span class="font-semibold text-indigo-600">PDF documents</span> into customized assessments 
				in just a few clicks. Our intelligent system analyzes your content and generates 
				<span class="font-semibold text-purple-600">perfectly tailored questions</span> at your preferred difficulty level.
			</p>
			
			<!-- CTA button -->
			<div class="flex justify-center">
				<button
					on:click={() => goto('/generate')}
					class="relative overflow-hidden group px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
				>
					<span class="relative z-10 flex items-center">
						Get Started
						<svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
						</svg>
					</span>
					<span class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.feature-card {
		padding: 1.5rem;
		border-radius: 0.5rem;
		transition: all 0.3s ease;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
		cursor: default;
	}
	
	.feature-card:hover {
		transform: translateY(-0.25rem);
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}
</style>