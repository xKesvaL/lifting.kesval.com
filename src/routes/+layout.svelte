<script lang="ts">
	import '../app.postcss';
	import Navigation from '$lib/components/layout/Navigation.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	onMount(() => {
		themeChange(false);
	});
</script>

<svelte:head>
	<meta name="viewport" content="viewport-fit=cover" />
</svelte:head>

<div class="md:flex">
	<Navigation />

	<main class="flex-grow">
		<slot />
	</main>
</div>
