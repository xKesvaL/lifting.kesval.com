<script lang="ts">
	import { getContext } from 'svelte';

	const userData = getContext('userData');
</script>

<a
	href="/profile"
	class="btn-ghost btn flex h-auto w-full flex-nowrap justify-between bg-base-200 px-4 py-4 normal-case shadow-lg"
>
	<div class="flex flex-col justify-start">
		<h2 class="w-fit text-lg">Food</h2>
		<p class="font-light">
			<span class="text-3xl">0</span><span>/{$userData.calorieGoal}</span> Cal
		</p>
	</div>
	<button class="btn-primary btn px-8">Enter</button>
</a>
