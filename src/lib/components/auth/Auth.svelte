<script lang="ts">
	import Login from '$lib/components/auth/Login.svelte';
	import Register from '$lib/components/auth/Register.svelte';
	import Reauth from '$lib/components/auth/Reauth.svelte';
	import { fly, fade } from 'svelte/transition';

	export let component: 'login' | 'register' | 'reauth' = 'register';

	function switchComponent() {
		if (component === 'register') {
			component = 'login';
		} else if (component === 'login') {
			component = 'register';
		}
	}
</script>

<div class="card min-w-full gap-4 bg-base-200 px-10 py-12 sm:min-w-[24rem]">
	<h1 class="mb-4 text-center text-5xl font-bold">
		{#if component === 'register'}
			Register
		{:else}
			Login
		{/if}
	</h1>
	<div class="flex justify-center">
		{#if component === 'register'}
			<div class="w-full">
				<Register />
			</div>
		{:else if component === 'login'}
			<div class="w-full">
				<Login />
			</div>
		{:else if component === 'reauth'}
			<div class="w-full">
				<Reauth />
			</div>
		{/if}
	</div>
	{#if component !== 'reauth'}
		<button on:click={switchComponent} transition:fade={{ duration: 300, delay: 300 }}>
			{#if component === 'register'}
				Already have an account? <span class="text-primary">Log in.</span>
			{:else}
				Don't have an account? <span class="text-primary">Register.</span>
			{/if}
		</button>
	{/if}
</div>
