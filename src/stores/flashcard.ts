import { writable } from 'svelte/store';

export type FlashCard = {
	front: string;
	back: string;
};

export const flashCardStore = writable<FlashCard[]>([]);
