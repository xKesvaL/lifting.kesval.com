import { writable } from 'svelte/store';
import type { Flow } from '$lib';

/**
 * @description Care: this should not be used with sensitive data
 * @param name
 */
export const createFlow = (name: string) => {
	const stages = localStorage.getItem(name);

	const { subscribe, update } = writable<Flow>({
		name,
		stages: stages ? JSON.parse(stages) : []
	});

	const nextStage = (stage: number, data: unknown) => {
		update((flow) => {
			let exists = false;
			flow.stages.forEach((st) => {
				if (st.stage === stage) {
					st.data = data;
					exists = true;
				}
			});

			if (!exists)
				flow.stages.push({
					data,
					stage
				});
			localStorage.setItem(name, JSON.stringify(flow.stages));
			return flow;
		});
	};

	const previousStage = () => {
		update((flow) => {
			if (flow.stages) {
				flow.stages.pop();
			}
			localStorage.setItem(name, JSON.stringify(flow.stages));
			return flow;
		});
	};

	return {
		subscribe,
		previousStage,
		nextStage
	};
};
