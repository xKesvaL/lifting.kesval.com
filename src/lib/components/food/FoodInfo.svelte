<script lang="ts">
	import { IconChevronLeft, IconChevronRight } from '@tabler/icons-svelte';
	import { getContext } from 'svelte';
	import { _, locale } from 'svelte-i18n';
	import { fireDocStore } from 'firebase-svelte';
	import { firestore } from '$lib/firebase';
	import { doc } from 'firebase/firestore';

	const previousWeek = () => {
		day -= 7;
	};

	const nextWeek = () => {
		day += 7;
	};

	const DEFAULT_DOC = {
		calorieIntake: 0
	};

	let selected = 6; // 0-6
	let day = new Date().getDate(); // 1-31

	const currentDay = new Date().getDate();
	const month = new Date().getMonth(); // 0-11
	const year = new Date().getFullYear();
	const user = getContext('user');
	let userData = getContext('userData');

	let lastDayDate;
	let date;
	$: date = new Date(year, month, day - (6 - selected));
	$: lastDayDate = new Date(year, month, day);

	$: console.log('day', day);
	$: console.log('month', month);
	$: console.log('year', year);
	$: console.log('date', date);

	let weekDocs = [];

	$: for (let i = 0; i < 7; i++) {
		weekDocs[i] = {
			...fireDocStore(
				firestore,
				doc(
					firestore,
					'users',
					$user.uid,
					'food',
					`${lastDayDate.getFullYear()}-${lastDayDate.getMonth() + 1}-${
						lastDayDate.getDate() - 6 + i
					}`
				),
				DEFAULT_DOC
			),
			date: new Date(
				lastDayDate.getFullYear(),
				lastDayDate.getMonth(),
				lastDayDate.getDate() - 6 + i
			)
		};
		console.log(weekDocs[i].date);
	}

	let store;
	$: {
		store = weekDocs[0];
		console.log($store);
	}

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
		<!--		key the div and make a transition, rn it isn't clear that the button you clicked on did something -->
		{#each weekDocs as weekDoc, index}
			<button
				class="relative flex h-full w-full max-w-[3rem] flex-1 cursor-pointer flex-col items-center justify-end rounded-full pb-10 pt-4 transition-colors sm:pb-14 {index ===
				selected
					? 'bg-base-200'
					: ''}"
				on:click={() => (selected = index)}
			>
				<div
					class="w-2/5 rounded-full bg-primary transition-all sm:w-2/5"
					style="height: {100 * (index / 6)}%"
				/>
				<span
					class="absolute bottom-1 grid aspect-square w-5/6 place-items-center rounded-full text-sm transition-colors {index ===
					selected
						? 'bg-base-300'
						: ''}"
				>
					{weekDoc.date.getDate()}
				</span>
			</button>
		{/each}
	</div>
	<button
		class="btn-ghost btn-circle btn absolute right-0 {day + 7 > currentDay
			? 'btn-disabled max-md:!bg-transparent'
			: ''}"
		on:click={nextWeek}
	>
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
