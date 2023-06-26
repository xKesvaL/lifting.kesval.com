<script lang="ts">
	import { page } from '$app/stores';
	import { IconHome, IconBarbell, IconUser } from '@tabler/icons-svelte';
	import NavigationLink from '$lib/components/layout/NavigationLink.svelte';
	import { _ } from 'svelte-i18n';

	import Logo from '$lib/components/brand/Logo.svelte';
</script>

<nav
	class="bg-base-300 max-md:btm-nav md:menu md:menu-vertical max-md:w-screen md:sticky md:top-0 md:h-screen md:w-fit md:min-w-[12rem] md:gap-4 md:border-r-[1px] md:border-neutral/10 md:px-0"
>
	<div class="!hidden justify-center px-2 py-4 text-xl md:!flex">
		<Logo animated={false} />
	</div>
	<NavigationLink
		href="/"
		active={$page.url.pathname === '/' || $page.url.pathname.startsWith('/food')}
	>
		<IconHome slot="icon" />
		{$_('nav.home')}
	</NavigationLink>
	<NavigationLink href="/workout" active={$page.url.pathname.startsWith('/workout')}>
		<IconBarbell slot="icon" />
		{$_('nav.workout')}
	</NavigationLink>
	<NavigationLink
		href="/profile"
		active={$page.url.pathname.startsWith('/profile') || $page.url.pathname.startsWith('/settings')}
	>
		<IconUser slot="icon" />
		{$_('nav.profile')}
	</NavigationLink>
</nav>
