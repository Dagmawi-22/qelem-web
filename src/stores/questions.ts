import { writable } from 'svelte/store';

export type Option = {
	value: string;
	isCorrect: boolean;
	description: string;
};

export type Question = {
	question: string;
	options: Option[];
};

export const questionStore = writable<Question[]>([]);
