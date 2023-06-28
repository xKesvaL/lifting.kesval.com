<script lang="ts">
	import { IconChevronLeft, IconChevronRight } from '@tabler/icons-svelte';
	import { getContext } from 'svelte';
	import { _, locale } from 'svelte-i18n';
	import { fireDocStore } from 'firebase-svelte';
	import { firestore } from '$lib/firebase';
	import { doc } from 'firebase/firestore';

	let selected = 6; // 0-6
	let day = new Date().getDate(); // 1-31
	let month = new Date().getMonth(); // 0-11
	let year = new Date().getFullYear();

	const previousWeek = () => {
		if (day - 7 < 1) {
			if (month - 1 < 0) {
				month = 11;
				year -= 1;
			} else {
				month -= 1;
			}
			console.log(day);
			console.log(month);
			day = new Date(year, month + 1, 0).getDate() + (day - 7);
		} else {
			day -= 7;
		}
	};

	const nextWeek = () => {
		if (day + 7 > 31) {
			if (month + 1 > 11) {
				year += 1;
				month = 0;
			} else {
				month += 1;
			}
			day = day + 7 - new Date(year, month, 0).getDate();
		} else {
			day += 7;
		}
	};

	let date;
	$: date = new Date(year, month, day - (6 - selected));

	$: console.log('day', day);
	$: console.log('month', month);
	$: console.log('year', year);
	$: console.log('date', date);

	let data;
	let weekDocs = [];

	// get docs for each week day (use selected or smth)

	$: {
		// data = fireDocStore(firestore, doc(firestore, 'users', 'test'));
		// do query using day, month, year
		// console.log($data);
	}

	// btw why does day start at 1 but month at 0, k

	let userData = getContext('userData');

	console.log($userData.calorieGoal.toString());
</script>

<div class="relative flex items-center">
	<button class="btn-ghost btn-circle btn absolute left-0" on:click={previousWeek}>
		<IconChevronLeft />
	</button>
	<div class="relative mx-12 flex h-52 w-full justify-center gap-0">
		<div
			data-calorie-goal={$userData.calorieGoal.toString()}
			class="border-1 absolute left-[-10px] right-[-10px] top-2 z-[-1] h-0 border border-dashed border-accent after:absolute after:right-0 after:top-[-32px] after:content-[attr(data-calorie-goal)] sm:left-4 sm:right-4"
		/>
		<div
			class="border-1 absolute left-[-10px] right-[-10px] top-20 z-[-1] h-0 border border-dashed border-neutral sm:left-4 sm:right-4"
		/>
		{#each { length: 7 } as i, index}
			<button
				class="relative flex h-full w-full max-w-[3rem] flex-1 cursor-pointer flex-col items-center justify-end rounded-full pb-10 pt-4 transition-colors sm:pb-14 {index ===
				selected
					? 'bg-base-200'
					: ''}"
				on:click={() => (selected = index)}
			>
				<div class="w-2/5 rounded-full bg-primary sm:w-2/5" style="height: {100 * (index / 6)}%" />
				<span
					class="absolute bottom-1 grid aspect-square w-5/6 place-items-center rounded-full transition-colors {index ===
					selected
						? 'bg-base-300'
						: ''}"
				>
					{index}
				</span>
			</button>
		{/each}
	</div>
	<button class="btn-ghost btn-circle btn absolute right-0" on:click={nextWeek}>
		<IconChevronRight />
	</button>
</div>
<div class="px-4 py-4">
	<div class="rounded-xl bg-base-300 p-4">
		<p>
			{date.toLocaleDateString($locale, {
				weekday: 'short',
				month: 'short',
				day: 'numeric'
			})}
		</p>
		<h2 class="m-4 text-center text-2xl">0 Cal</h2>
	</div>
	<div class="mt-4 rounded-xl bg-base-300 p-4">
		<p>{$_('food.nutrientIntake')}</p>
	</div>
	<div class="mt-4 rounded-xl bg-base-300 p-4">
		<p>{$_('food.nutritionInfo')}</p>
	</div>
</div>
