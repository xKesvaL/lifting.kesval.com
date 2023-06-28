<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { IconCheck } from '@tabler/icons-svelte';

	const getDaysInMonth = (month: number, year: number) => {
		return new Date(year, month, 0).getDate();
	};

	let month = new Date().getMonth();
	let year = new Date().getFullYear();

	let daysInMonth;
	$: daysInMonth = getDaysInMonth(month, year);
</script>

<div class="btn-ghost btn my-2 h-auto w-full bg-base-200 px-4 py-4 normal-case shadow-lg">
	<h2 class="mr-auto w-fit text-lg">{$_('calendar.calendar')}</h2>
	<div class="grid w-full grid-cols-7 gap-1">
		{#each { length: 7 } as d, i}
			<div class="mb-2 text-center">{$_('calendar.day.' + i)}</div>
		{/each}
		{#each { length: daysInMonth } as test, ind}
			<div class="aspect-square rounded-full bg-base-100">
				{#if ind % 5 === 0}
					<div
						class="m-1 grid aspect-square place-items-center rounded-full bg-primary pt-0.5 text-primary-content"
					>
						<IconCheck size={20} />
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
