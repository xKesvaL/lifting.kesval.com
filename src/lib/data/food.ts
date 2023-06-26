import xss from 'xss';
import type { FoodSearchOptions, FoodSearchResult } from '$lib';

const SERVER_URL = 'https://world.openfoodfacts.org/';

/**
 * Search for food by name
 * @param {string} query Search query (raw user input)
 * @param {FoodSearchOptions} options
 */
export const searchFood = async (
	query: string,
	options: FoodSearchOptions = {
		page_size: 24,
		page: 1
	}
): Promise<FoodSearchResult> => {
	query = query.replace(' ', '+');
	// no need to do it but hey, why not
	query = xss(query);
	const response = await fetch(
		`${SERVER_URL}/cgi/search.pl?search_terms=${query}&action=process&json=1&fields=code,product_name${
			options.page_size ? `&page_size=${options.page_size}` : ''
		}${options.page ? `&page=${options.page}` : ''}`
	);
	return (await response.json()) as FoodSearchResult;
};

export const getFoodByBarcode = async (barcode: string) => {
	return;
};
