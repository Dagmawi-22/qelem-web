<script lang="ts">
	import { questionStore } from '../../stores/questions';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let questions: any[] = [];
	let currentIndex = 0;
	let selectedOption: string | null = null;
	let showNext = false;
	let score = 0;
	let isFinished = false;
	let timer = 0;
	let countdown: any;

	onMount(() => {
		questions = get(questionStore);
		startTimer();
	});

	function startTimer() {
		timer = questions.length * 60;
		countdown = setInterval(() => {
			timer--;
			if (timer <= 0) {
				clearInterval(countdown);
				finishExam();
			}
		}, 1000);
	}

	function selectOption(value: string) {
		selectedOption = value;
		questions[currentIndex].selected = value;

		const correct = questions[currentIndex].options.find((opt) => opt.value === value)?.isCorrect;
		if (correct) score++;

		showNext = true;
	}

	function nextQuestion() {
		if (currentIndex < questions.length - 1) {
			currentIndex++;
			selectedOption = null;
			showNext = false;
		} else {
			finishExam();
		}
	}

	function finishExam() {
		clearInterval(countdown);
		isFinished = true;
	}

	function restartExam() {
		currentIndex = 0;
		selectedOption = null;
		showNext = false;
		score = 0;
		isFinished = false;
		questions.forEach((q) => delete q.selected);
		startTimer();
	}
</script>

{#if !isFinished}
	<section class="mx-auto max-w-3xl p-6">
		<div
			class="mb-6 flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3"
		>
			<div class="flex items-center space-x-2">
				<span class="rounded-full bg-blue-100 p-2 text-blue-600"> ⏱️ </span>
				<div>
					<p class="text-sm font-medium text-gray-600">Time Remaining</p>
					<p class="text-xl font-bold text-blue-600">
						{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
					</p>
				</div>
			</div>
			<div class="rounded-full bg-white px-4 py-2 shadow-sm">
				<span class="font-medium text-gray-700">
					{currentIndex + 1}<span class="text-gray-400"> / {questions.length}</span>
				</span>
			</div>
		</div>

		<div class="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
			<h2 class="mb-6 text-xl font-bold text-gray-800 md:text-2xl">
				{questions[currentIndex]?.question}
			</h2>
			<ul class="space-y-3">
				{#each questions[currentIndex]?.options as option}
					<li
						class={`rounded-lg border p-4 transition-all ${
							selectedOption === option.value
								? option.isCorrect
									? 'border-green-300 bg-green-50 shadow-green-100'
									: 'border-red-300 bg-red-50 shadow-red-100'
								: 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
						} ${!showNext ? 'cursor-pointer' : 'cursor-default'}`}
						on:click={() => !showNext && selectOption(option.value)}
					>
						<div class="flex items-start">
							<span
								class={`mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full ${
									selectedOption === option.value
										? option.isCorrect
											? 'bg-green-100 text-green-600'
											: 'bg-red-100 text-red-600'
										: 'bg-gray-100 text-gray-600'
								}`}
							>
								{option.value}
							</span>
							<span class="flex-1">{option.description}</span>
						</div>
					</li>
				{/each}
			</ul>
		</div>

		{#if showNext}
			<button
				class="w-full transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95"
				on:click={nextQuestion}
			>
				{currentIndex < questions.length - 1 ? 'Next Question →' : 'Finish Exam'}
			</button>
		{/if}
	</section>
{:else}
	<section class="mx-auto max-w-4xl space-y-8 p-6">
		<div class="rounded-xl bg-gradient-to-r from-green-50 to-blue-50 py-8 text-center">
			<h2 class="text-3xl font-bold text-green-600 md:text-4xl">🎉 Exam Completed!</h2>
			<div
				class="mx-auto mt-4 flex max-w-xs items-center justify-center divide-x divide-gray-200 rounded-lg bg-white p-4 shadow-sm"
			>
				<div class="px-4 text-center">
					<p class="text-sm font-medium text-gray-500">Correct</p>
					<p class="text-2xl font-bold text-green-600">{score}</p>
				</div>
				<div class="px-4 text-center">
					<p class="text-sm font-medium text-gray-500">Incorrect</p>
					<p class="text-2xl font-bold text-red-600">{questions.length - score}</p>
				</div>
				<div class="px-4 text-center">
					<p class="text-sm font-medium text-gray-500">Score</p>
					<p class="text-2xl font-bold text-blue-600">
						{Math.round((score / questions.length) * 100)}%
					</p>
				</div>
			</div>
			<button
				on:click={restartExam}
				class="mt-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
			>
				Restart Exam
			</button>
		</div>

		<div class="space-y-6">
			<h3 class="text-2xl font-semibold text-gray-800">📋 Review Questions</h3>
			{#each questions as q, index}
				<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
					<p class="mb-3 text-lg font-semibold text-gray-800">
						<span class="text-blue-600">{index + 1}.</span>
						{q.question}
					</p>
					<ul class="space-y-2">
						{#each q.options as option}
							<li
								class={`rounded-lg border p-3 ${
									option.value === q.selected
										? option.isCorrect
											? 'border-green-200 bg-green-50'
											: 'border-red-200 bg-red-50'
										: 'border-gray-100'
								} ${option.isCorrect && !(option.value === q.selected) ? 'bg-blue-50' : ''}`}
							>
								<div class="flex items-start">
									<span
										class={`mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full ${
											option.value === q.selected
												? option.isCorrect
													? 'bg-green-100 text-green-600'
													: 'bg-red-100 text-red-600'
												: option.isCorrect
													? 'bg-blue-100 text-blue-600'
													: 'bg-gray-100 text-gray-600'
										}`}
									>
										{option.value}
									</span>
									<span
										class={`flex-1 ${
											option.value === q.selected
												? option.isCorrect
													? 'font-medium text-green-600'
													: 'font-medium text-red-600'
												: option.isCorrect
													? 'font-medium text-blue-600'
													: 'text-gray-700'
										}`}
									>
										{option.description}
										{#if option.value === q.selected}
											<span class="ml-2">
												{#if option.isCorrect}✅{:else}❌{/if}
											</span>
										{/if}
									</span>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>
{/if}
