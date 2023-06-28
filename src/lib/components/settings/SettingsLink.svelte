<script lang="ts">
	import { IconChevronRight } from '@tabler/icons-svelte';

	export let href: string;
</script>

<a
	{href}
	class="btn-ghost btn flex justify-between rounded-none border-0 border-b-2 border-base-300 max-md:last:!border-0 md:!border-r-2 md:last:border-b-0 md:even:!border-r-0"
>
	<div class="flex items-center gap-2">
		<slot />
	</div>
	<IconChevronRight />
</a>

<style>
	@media (min-width: 768px) {
		a:nth-last-child(2) {
			border-bottom: 0;
		}
	}
</style>
