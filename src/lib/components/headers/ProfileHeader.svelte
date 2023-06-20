<script lang="ts">
	import { getContext } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { IconSettings, IconLogout } from '@tabler/icons-svelte';

	const user = getContext('user');
</script>

<header class="sticky left-0 right-0 top-0 grid grid-cols-3 items-center justify-between px-4 py-2">
	<button class="text-left text-primary">
		{$_('common.edit')}
		{$_('common.profile')}
	</button>
	<span class="text-center">
		{$user.displayName}
	</span>
	<div class="flex items-center justify-end gap-2">
		<button class="text-primary"> <IconLogout /> </button>
		<button class="text-primary"> <IconSettings /> </button>
	</div>
</header>
