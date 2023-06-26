export interface Flow {
	name: string;
	stages: FlowStage[];
}

interface FlowStage {
	data: unknown;
	stage: number;
}

export type WorkoutType = 'powerlifting' | 'powerbuilding' | 'bodybuilding';

export interface FoodSearchResult {
	count: number;
	page: number;
	page_size: number;
	page_count: number;
	products: FoodCodeProduct[];
	skip: number;
}

export interface FoodCodeProduct {
	code: string;
	product_name: string;
	countries_lc: string;
}

export interface FoodSearchOptions {
	page_size?: number;
	page?: number;
}

// A simple way of creating a search query is to go to the openfoodfacts website,
// search for a food and then the query will be in the url. Just add &json=1 to the end.
