<script lang="ts">
	import { getContext } from 'svelte';
	import { _ } from 'svelte-i18n';

	const userData = getContext('userData');
</script>

<a
	href="/food"
	class="btn-ghost btn my-2 flex h-auto w-full flex-nowrap justify-between bg-base-200 px-4 py-4 normal-case shadow-lg"
>
	<div class="flex flex-col justify-start">
		<h2 class="w-fit text-lg">{$_('common.food')}</h2>
		<p class="font-light">
			<span class="text-3xl">0</span><span>/{$userData.calorieGoal}</span> Cal
		</p>
	</div>
	<button class="btn-primary btn px-8">Enter</button>
</a>
