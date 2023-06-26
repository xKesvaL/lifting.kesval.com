<script lang="ts">
	import { getContext } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { IconSettings, IconLogout } from '@tabler/icons-svelte';

	const user = getContext('user');
</script>

<header
	class="sticky left-0 right-0 top-0 mx-auto grid max-w-[1024px] grid-cols-3 items-center justify-between px-4 py-4"
>
	<a
		class="text-left text-sm text-primary md:text-base lg:text-lg"
		href="/settings/profile?from=profile"
	>
		{$_('common.edit')}
		{$_('common.profile')}
	</a>
	<span class="text-center lg:text-lg">
		{$user.displayName}
	</span>
	<div class="flex items-center justify-end gap-2">
		<button class="text-primary"> <IconLogout /> </button>
		<a class="text-primary" href="/settings"> <IconSettings /> </a>
	</div>
</header>
