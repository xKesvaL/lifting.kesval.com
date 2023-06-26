import type { PageLoad } from './$types';

const load: PageLoad = ({ url }) => {
	const from = url.searchParams.get('from') || 'settings';
	return {
		from
	};
};

export { load };
