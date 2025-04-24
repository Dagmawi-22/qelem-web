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

		const correct = questions[currentIndex].options.find(opt => opt.value === value)?.isCorrect;
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
		questions.forEach(q => delete q.selected);
		startTimer();
	}
</script>

{#if !isFinished}
	<section class="max-w-3xl mx-auto p-6">
		<div class="flex justify-between mb-4">
			<p class="text-lg font-medium text-blue-600">⏱️ Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</p>
			<p class="text-gray-600">Question {currentIndex + 1} / {questions.length}</p>
		</div>

		<div class="mb-4">
			<h2 class="text-2xl font-semibold">{questions[currentIndex]?.question}</h2>
			<ul class="mt-4 space-y-2">
				{#each questions[currentIndex]?.options as option}
					<li
						class={`cursor-pointer rounded-md border p-3 ${selectedOption === option.value
							? option.isCorrect
								? 'bg-green-100 border-green-400'
								: 'bg-red-100 border-red-400'
							: 'hover:bg-gray-50'}`}
						on:click={() => !showNext && selectOption(option.value)}
					>
						<strong>{option.value}</strong>: {option.description}
					</li>
				{/each}
			</ul>
		</div>

		{#if showNext}
			<button
				class="mt-4 w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
				on:click={nextQuestion}
			>
				{currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Exam'}
			</button>
		{/if}
	</section>
{:else}
	<section class="max-w-4xl mx-auto p-6 space-y-8">
		<div class="text-center">
			<h2 class="text-3xl font-bold text-green-600">🎉 Exam Completed!</h2>
			<p class="text-xl mt-2">✅ Correct: {score} / {questions.length}</p>
			<p class="text-lg text-gray-700">❌ Incorrect: {questions.length - score}</p>
			<button
				on:click={restartExam}
				class="mt-4 rounded bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700"
			>
				Restart Exam
			</button>
		</div>

		<div class="space-y-6">
			<h3 class="text-2xl font-semibold text-gray-800">📋 Review Questions</h3>
			{#each questions as q, index}
				<div class="rounded-lg border p-4 shadow-sm">
					<p class="mb-2 font-semibold">{index + 1}. {q.question}</p>
					<ul class="ml-4 space-y-1">
						{#each q.options as option}
							<li
								class={
									option.value === q.selected
										? option.isCorrect
											? 'text-green-600 font-medium'
											: 'text-red-500 font-medium'
										: 'text-gray-700'
								}
							>
								<strong>{option.value}</strong>: {option.description}
								{option.value === q.selected
									? option.isCorrect ? ' ✅' : ' ❌'
									: ''}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>
{/if}
