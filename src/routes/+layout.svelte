<script lang="ts">
	import '../app.postcss';
	import Navigation from '$lib/components/layout/Navigation.svelte';
	import { onMount, setContext } from 'svelte';
	import { themeChange } from 'theme-change';
	import { userStore, fireDocStore } from 'firebase-svelte';
	import { auth, firestore } from '$lib/firebase';
	import Auth from '$lib/components/auth/Auth.svelte';
	import FirstJoinFlow from '$lib/components/flow/FirstJoinFlow.svelte';
	import Loading from '$lib/components/layout/Loading.svelte';
	import { doc } from 'firebase/firestore';
	import { page } from '$app/stores';

	const user = userStore(auth);

	let userData;

	$: if ($user) {
		userData = fireDocStore(firestore, doc(firestore, 'users', $user.uid, 'common', 'data'));
		setContext('userData', userData);
	}

	setContext('user', user);
	setContext('userData', userData);

	onMount(async () => {
		themeChange(false);
	});
</script>

{#if $user}
	{#if $userData && $userData.experience}
		<div class="md:flex">
			<Navigation mobile={!$page.url.pathname.startsWith('/food')} />
			<main class="flex-grow">
				<slot />
			</main>
		</div>
	{:else if $userData === undefined}
		<main class="grid h-[90vh] place-items-center">
			<Loading />
		</main>
	{:else}
		<main class="grid h-[90vh] place-items-center">
			<FirstJoinFlow />
		</main>
	{/if}
{:else if $user === undefined}
	<main class="grid h-[90vh] place-items-center">
		<Loading />
	</main>
{:else}
	<main class="grid h-[90vh] place-items-center">
		<Auth />
	</main>
{/if}
