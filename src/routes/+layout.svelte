<script lang="ts">
	import '../app.postcss';
	import Navigation from '$lib/components/layout/Navigation.svelte';
	import { onMount, setContext } from 'svelte';
	import { themeChange } from 'theme-change';
	import { userStore } from 'firebase-svelte';
	import { auth } from '$lib/firebase';
	import Auth from '$lib/components/auth/Auth.svelte';
	import FirstJoinFlow from '$lib/components/flow/FirstJoinFlow.svelte';

	const user = userStore(auth);

	setContext('user', user);

	onMount(async () => {
		themeChange(false);
	});
</script>

{#if $user}
	{#if $user.displayName}
		<div class="md:flex">
			<Navigation />

			<main class="flex-grow">
				<slot />
			</main>
		</div>
	{:else}
		<main class="grid h-[90vh] place-items-center">
			<FirstJoinFlow />
		</main>
	{/if}
{:else if $user === undefined}
	<main class="grid h-[90vh] place-items-center">loading...</main>
{:else}
	<main class="grid h-[90vh] place-items-center">
		<Auth />
	</main>
{/if}
