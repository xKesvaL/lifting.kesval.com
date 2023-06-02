<script lang="ts">
	import { page } from '$app/stores';
	import { IconHome, IconBarbell, IconUser } from '@tabler/icons-svelte';
	import NavigationLink from '$lib/components/layout/NavigationLink.svelte';

	import common from '$lib/data/common';
</script>

<nav
	class="bg-base-300 max-md:btm-nav max-md:btm-nav-lg md:menu md:menu-vertical md:sticky md:top-0 md:h-screen md:w-fit md:min-w-[12rem] md:gap-4 md:border-r-[1px] md:border-neutral/10 md:px-0"
>
	<div class="!hidden justify-center py-4 text-xl md:!flex">{common.appName}</div>
	<NavigationLink href="/" active={$page.url.pathname === '/'}>
		<IconHome slot="icon" />
		Home</NavigationLink
	>
	<NavigationLink href="/workout" active={$page.url.pathname.startsWith('/workout')}>
		<IconBarbell slot="icon" />
		Workout</NavigationLink
	>
	<NavigationLink href="/profile" active={$page.url.pathname.startsWith('/profile')}>
		<IconUser slot="icon" />
		Profile</NavigationLink
	>
</nav>
