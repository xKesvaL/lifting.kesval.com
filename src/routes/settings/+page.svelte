<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { IconUser, IconLock, IconMeat } from '@tabler/icons-svelte';
	import SettingsHeader from '$lib/components/settings/SettingsHeader.svelte';
	import SettingsLink from '$lib/components/settings/SettingsLink.svelte';
</script>

<SettingsHeader />
<section class="in-container py-8">
	<h2 class="text-xl font-bold">{$_('settings.account')}</h2>
	<div class="grid grid-cols-1 md:grid-cols-2">
		<SettingsLink href="/settings/profile">
			<IconUser />
			{$_('common.profile')}
		</SettingsLink>
		<SettingsLink href="/settings/account">
			<IconLock />
			{$_('common.account')}
		</SettingsLink>
	</div>
	<h2 class="mt-8 text-xl font-bold">{$_('settings.preferences')}</h2>
	<div class="grid grid-cols-1 md:grid-cols-2">
		<SettingsLink href="/settings/profile">
			<IconMeat />
			{$_('common.food')}
		</SettingsLink>
		<SettingsLink href="/settings/account">
			<IconLock />
			{$_('common.account')}
		</SettingsLink>
		<SettingsLink href="/settings/profile">
			<IconUser />
			{$_('common.profile')}
		</SettingsLink>
	</div>
</section>
