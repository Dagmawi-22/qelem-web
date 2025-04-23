<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 rounded-xl">
    <p class="text-lg text-gray-700 max-w-xl mb-6 text-center mx-auto">
        This app lets you upload a <strong>PDF document</strong>, choose the <strong>number of questions</strong> you want,
        select a <strong>difficulty level</strong>, and then generate <strong>custom questions</strong> using our powerful API.
    </p>
    
    <div class="flex justify-center">
        <button
            class="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold px-6 py-3 rounded-xl transition"
            on:click={() => goto('/generate')}
        >
            Get Started
        </button>
    </div>
</div>
