export interface Flow {
	name: string;
	stages: FlowStage[];
}

interface FlowStage {
	data: unknown;
	stage: number;
}

export type WorkoutType = 'powerlifting' | 'powerbuilding' | 'bodybuilding';
