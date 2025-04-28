import { writable } from 'svelte/store';

export type AppMode = 'flash-card' | 'question';

export const appModeStore = writable<AppMode>('question');
