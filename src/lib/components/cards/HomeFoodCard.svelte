<script lang="ts">
	import { getContext } from 'svelte';

	const userData = getContext('userData');
</script>

<a
	href="/profile"
	class="btn-ghost btn flex h-auto w-full flex-nowrap justify-between bg-base-300 px-4 py-4 normal-case shadow-lg"
>
	<div class="flex flex-col justify-start">
		<h2 class="w-fit text-base">Food</h2>
		<p><span class="text-3xl">0</span><span>/{$userData.calorieGoal}</span> Cal</p>
	</div>
	<button class="btn-primary btn px-8">Enter</button>
</a>
