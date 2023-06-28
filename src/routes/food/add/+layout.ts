import { QueryClient } from '@tanstack/svelte-query';
import { browser } from '$app/environment';
import type { LayoutLoad } from '../../../../.svelte-kit/types/src/routes';

export const load: LayoutLoad = async () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	return {
		queryClient
	};
};
