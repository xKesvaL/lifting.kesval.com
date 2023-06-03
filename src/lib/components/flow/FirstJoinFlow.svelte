<script lang="ts">
	import { createFlow } from '$lib/utils/stores';
	import Image from '$lib/components/elements/Image.svelte';
	import common from '$lib/data/common';
	import ThemeSwitcher from '$lib/components/layout/ThemeSwitcher.svelte';
	import type { Flow } from '$lib';
	import { onMount } from 'svelte';

	let store = createFlow('firstJoin');

	let loading = false;
	let stage = 0;
	let lastAction: string;
	let selected: 'powerlifting' | 'bodybuilding' | 'mixed';

	function select(type: 'powerlifting' | 'bodybuilding' | 'mixed') {
		selected = type;
	}

	function checkType() {
		if (!selected && ($store as Flow).stages[1]?.data.trainingType) {
			selected = ($store as Flow).stages[1]?.data.trainingType;
		}
	}

	onMount(() => {
		checkType();
	});

	function nextStage(e) {
		loading = true;
		let formData = new FormData(e.target);
		let data =
			stage === 1
				? {
						trainingType: selected
				  }
				: Object.fromEntries(formData.entries());

		store.nextStage(stage, data);

		if (stage === 2) {
			console.log('done');
		} else {
			stage++;
			checkType();
			lastAction = 'next';
			loading = false;
		}
	}

	function previousStage() {
		loading = true;
		if (lastAction === 'previous' || (stage - 1 === 0 && ($store as Flow).stages[1]?.data)) {
			store.previousStage();
		}
		stage--;
		checkType();
		lastAction = 'previous';
		loading = false;
	}
</script>

<section class="px-4 py-4">
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-4xl font-bold sm:text-5xl">{common.appName}</h1>
		<div class="mb-2">
			<ThemeSwitcher />
		</div>
	</div>
	<form
		class="{stage === 0
			? 'collapse-open py-6'
			: 'collapse-close py-2'} collapse !rounded-b-none border-b-[1px] border-base-300 border-neutral/25 bg-base-200 px-4"
		on:submit|preventDefault={nextStage}
		on:reset|preventDefault={previousStage}
	>
		<h2 class="collapse-title text-2xl font-bold uppercase">Identity</h2>
		<div class="collapse-content grid">
			<div>
				<div class="form-control w-full">
					<label for="username" class="label">
						<span class="label-text"> How should we call you? </span>
					</label>
					<input
						class="input-bordered input-primary input w-full"
						type="text"
						autocomplete="username"
						placeholder="CoolUsername123"
						required
						minlength="3"
						maxlength="20"
						id="username"
						name="username"
						value={$store.stages[0]?.data.username || ''}
					/>
				</div>
			</div>
			<div class="join ml-auto mt-4 w-fit">
				<button class="btn-disabled join-item btn flex-grow" type="reset">Previous</button>
				<button class="btn-primary join-item btn flex-grow" type="submit">
					{#if loading}
						<span class="loading loading-spinner" />
					{:else}
						Next
					{/if}
				</button>
			</div>
		</div>
	</form>
	<form
		class="{stage === 1
			? 'collapse-open py-6'
			: 'collapse-close py-2'} collapse !rounded-none border-b-[1px] border-base-300 border-neutral/25 bg-base-200 px-4"
		on:submit|preventDefault={nextStage}
		on:reset|preventDefault={previousStage}
	>
		<h2 class="collapse-title text-2xl font-bold uppercase">Workout Plans</h2>
		<div class="collapse-content grid">
			<div>
				<div class="mb-4 text-center text-xl">I want to do...</div>
				<div class="flex flex-col gap-1 sm:flex-row">
					<label
						class="grid cursor-pointer place-items-center bg-base-300 px-4 py-6 {selected ===
						'powerlifting'
							? 'outline outline-4 outline-primary'
							: ''}"
						on:click={() => select('powerlifting')}
						on:keypress={() => select('powerlifting')}
						tabindex="0"
					>
						<h3 class="text-xl font-bold">Powerlifting</h3>
						<input
							type="radio"
							name="trainingType"
							value="powerlifting"
							class="sr-only"
							required
							checked={selected === 'powerlifting'}
						/>
						<div class="max-w-[8rem] dark:invert sm:max-w-[12rem]">
							<Image src="/flows/first/powerlifting.png" />
						</div>
					</label>
					<label
						class="grid cursor-pointer place-items-center bg-base-300 px-4 py-6 {selected ===
						'mixed'
							? 'outline outline-4 outline-primary'
							: ''}"
						on:click={() => select('mixed')}
						on:keypress={() => select('mixed')}
						tabindex="0"
					>
						<h3 class="text-xl font-bold">A mix of both</h3>
						<input
							type="radio"
							name="trainingType"
							value="mixed"
							class="sr-only"
							required
							checked={selected === 'mixed'}
						/>
						<div class="max-w-[8rem] dark:invert sm:max-w-[12rem]">
							<Image src="/flows/first/mix.png" />
						</div>
					</label>
					<label
						class="grid cursor-pointer place-items-center bg-base-300 px-4 py-6 {selected ===
						'bodybuilding'
							? 'outline outline-4 outline-primary'
							: ''}"
						on:click={() => select('bodybuilding')}
						on:keypress={() => select('bodybuilding')}
						tabindex="0"
					>
						<h3 class="text-xl font-bold">Bodybuilding</h3>

						<input
							type="radio"
							name="trainingType"
							value="bodybuilding"
							class="sr-only"
							required
							checked={selected === 'bodybuilding'}
						/>
						<div class="max-w-[8rem] dark:invert sm:max-w-[12rem]">
							<Image src="/flows/first/bodybuilding.png" />
						</div>
					</label>
				</div>
			</div>
			<div class="join ml-auto mt-4 w-fit">
				<button class="btn-warning join-item btn flex-grow" type="reset">Previous</button>
				<button class="btn-primary join-item btn flex-grow" type="submit"
					>{#if loading}
						<span class="loading loading-spinner" />
					{:else}
						Next
					{/if}</button
				>
			</div>
		</div>
	</form>
	<form
		class="{stage === 2
			? 'collapse-open py-6'
			: 'collapse-close py-2'} collapse !rounded-t-none border-base-300 bg-base-200 px-4"
		on:submit|preventDefault={nextStage}
		on:reset|preventDefault={previousStage}
	>
		<h2 class="collapse-title text-2xl font-bold uppercase">Frequency</h2>
		<div class="collapse-content grid">
			<div>
				<div class="mb-4 text-center text-xl">I want to workout...</div>
				<input
					type="range"
					min="2"
					max="6"
					step="1"
					value={$store.stages[2]?.data.workoutDays || 4}
					class="range range-primary mt-2"
					name="workoutDays"
				/>
				<div class="mb-2 flex w-full justify-between px-2 text-xs">
					<span>2 day</span>
					<span>3 day</span>
					<span>4 day</span>
					<span>5 day</span>
					<span>6 day</span>
				</div>
				<div class="mb-4 text-center text-xl">...a week</div>
			</div>
			<div class="join ml-auto mt-4 w-fit">
				<button class="btn-warning join-item btn flex-grow" type="reset">Previous</button>
				<button class="btn-primary join-item btn flex-grow" type="submit"
					>{#if loading}
						<span class="loading loading-spinner" />
					{:else}
						Finish
					{/if}</button
				>
			</div>
		</div>
	</form>
</section>
