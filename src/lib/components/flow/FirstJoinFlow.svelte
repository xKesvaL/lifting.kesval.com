<script lang="ts">
	import { createFlow } from '$lib/utils/stores';
	import Image from '$lib/components/elements/Image.svelte';
	import ThemeSwitcher from '$lib/components/layout/ThemeSwitcher.svelte';
	import type { Flow, WorkoutType } from '$lib';
	import { getContext, onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import Logo from '$lib/components/brand/Logo.svelte';
	import { updateProfile } from 'firebase/auth';
	import type { User } from 'firebase/auth';
	import { setDoc, doc } from 'firebase/firestore';
	import { firestore } from '$lib/firebase';

	let store = createFlow('firstJoin');

	let loading = false;
	let stage = 0;
	let lastAction: string;
	let selected: WorkoutType;

	const user = getContext('user') as User;

	function select(type: WorkoutType) {
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

		if (stage === 3) {
			let data = store.getData();

			let experienceMap = ['beginner', 'intermediate', 'advanced'];

			// we're using a subcollection here so if we load the common data we don't have to load the whole user document
			setDoc(doc(firestore, 'users', $user.uid, 'common', 'data'), {
				experience: experienceMap[parseInt(data.experience) - 1],
				workoutDays: data.workoutDays,
				trainingType: data.trainingType,
				calorieGoal: 2400,
				weight: 70,
				height: 170
			}).then(() => {
				updateProfile($user, {
					displayName: data.username
				}).then(() => {
					window.location.reload();
					loading = false;
				});
			});
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
		<Logo animated={false} size="semi-large" origin="left" />
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
		<h2 class="collapse-title text-2xl font-bold uppercase">{$_('firstJoinFlow.identity')}</h2>
		<div class="collapse-content grid">
			<div>
				<div class="form-control w-full">
					<label for="username" class="label">
						<span class="label-text">{$_('firstJoinFlow.callYou')}</span>
					</label>
					<input
						class="input-bordered input-primary input w-full"
						type="text"
						autocomplete="username"
						placeholder={$_('firstJoinFlow.usernamePlaceholder')}
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
				<button class="btn-disabled join-item btn flex-grow" type="reset">
					{$_('common.previous')}
				</button>
				{#if loading}
					<button class="btn-primary btn-disabled join-item btn flex-grow" type="button">
						<span class="loading loading-spinner" />
					</button>
				{:else}
					<button class="btn-primary join-item btn flex-grow" type="submit">
						{$_('common.next')}
					</button>
				{/if}
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
		<h2 class="collapse-title text-2xl font-bold uppercase">{$_('firstJoinFlow.plans')}</h2>
		<div class="collapse-content grid">
			<div>
				<div class="mb-4 text-center text-xl">{$_('firstJoinFlow.wantTo')}</div>
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
						<h3 class="text-xl font-bold">
							{$_('firstJoinFlow.powerlifting')}
						</h3>
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
						'powerbuilding'
							? 'outline outline-4 outline-primary'
							: ''}"
						on:click={() => select('powerbuilding')}
						on:keypress={() => select('powerbuilding')}
						tabindex="0"
					>
						<h3 class="text-xl font-bold">
							{$_('firstJoinFlow.powerbuilding')}
						</h3>
						<input
							type="radio"
							name="trainingType"
							value="powerbuilding"
							class="sr-only"
							required
							checked={selected === 'powerbuilding'}
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
						<h3 class="text-xl font-bold">
							{$_('firstJoinFlow.bodybuilding')}
						</h3>

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
				<button class="btn-warning join-item btn flex-grow" type="reset">
					{$_('common.previous')}
				</button>
				{#if loading}
					<button class="btn-primary btn-disabled join-item btn flex-grow" type="button">
						<span class="loading loading-spinner" />
					</button>
				{:else}
					<button class="btn-primary join-item btn flex-grow" type="submit">
						{$_('common.next')}
					</button>
				{/if}
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
		<h2 class="collapse-title text-2xl font-bold uppercase">
			{$_('firstJoinFlow.experience')}
		</h2>
		<div class="collapse-content grid">
			<div>
				<div class="mb-4 text-center text-xl">
					{$_('firstJoinFlow.hasExperience')}
				</div>
				<input
					type="range"
					min="1"
					max="3"
					step="1"
					value={$store.stages[2]?.data.experience || 2}
					class="range range-primary mt-2"
					name="experience"
				/>
				<div class="mb-2 flex w-full justify-between px-2 text-xs">
					<span>{$_('common.@beginner')}</span>
					<span>{$_('common.@intermediate')}</span>
					<span>{$_('common.@advanced')}</span>
				</div>
				<div class="mb-4 text-center text-xl">
					{$_('firstJoinFlow.lifter')}
				</div>
			</div>
			<div class="join ml-auto mt-4 w-fit">
				<button class="btn-warning join-item btn flex-grow" type="reset">
					{$_('common.previous')}
				</button>
				{#if loading}
					<button class="btn-primary btn-disabled join-item btn flex-grow" type="button">
						<span class="loading loading-spinner" />
					</button>
				{:else}
					<button class="btn-primary join-item btn flex-grow" type="submit">
						{$_('common.next')}
					</button>
				{/if}
			</div>
		</div>
	</form>
	<form
		class="{stage === 3
			? 'collapse-open py-6'
			: 'collapse-close py-2'} collapse !rounded-t-none border-base-300 bg-base-200 px-4"
		on:submit|preventDefault={nextStage}
		on:reset|preventDefault={previousStage}
	>
		<h2 class="collapse-title text-2xl font-bold uppercase">
			{$_('firstJoinFlow.frequency')}
		</h2>
		<div class="collapse-content grid">
			<div>
				<div class="mb-4 text-center text-xl">
					{$_('firstJoinFlow.howManyDays')}
				</div>
				<input
					type="range"
					min="2"
					max="6"
					step="1"
					value={$store.stages[3]?.data.workoutDays || 3}
					class="range range-primary mt-2"
					name="workoutDays"
				/>
				<div class="mb-2 flex w-full justify-between px-2 text-xs">
					<span>2 {$_('common.days')}</span>
					<span>3 {$_('common.days')}</span>
					<span>4 {$_('common.days')}</span>
					<span>5 {$_('common.days')}</span>
					<span>6 {$_('common.days')}</span>
				</div>
				<div class="mb-4 text-center text-xl">
					{$_('firstJoinFlow.aWeek')}
				</div>
			</div>
			<div class="join ml-auto mt-4 w-fit">
				<button class="btn-warning join-item btn flex-grow" type="reset">
					{$_('common.previous')}
				</button>
				{#if loading}
					<button class="btn-primary btn-disabled join-item btn flex-grow" type="button">
						<span class="loading loading-spinner" />
					</button>
				{:else}
					<button class="btn-primary join-item btn flex-grow" type="submit">
						{$_('common.finish')}
					</button>
				{/if}
			</div>
		</div>
	</form>
</section>
