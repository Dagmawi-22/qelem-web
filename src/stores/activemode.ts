import { writable } from 'svelte/store';

export type AppMode = 'flashcard' | 'question';

export const appModeStore = writable<AppMode>('question');
