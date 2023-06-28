import type { LayoutLoad } from './$types';

const load: LayoutLoad = ({ url }) => {
	const from = url.searchParams.get('from') || 'settings';
	return {
		from
	};
};

export { load };
