<script lang="ts">
	import type { LayoutData } from './$types';
	import { QueryClientProvider } from '@tanstack/svelte-query';

	export let data: LayoutData;
</script>

<QueryClientProvider client={data.queryClient}>
	<slot />
</QueryClientProvider>
