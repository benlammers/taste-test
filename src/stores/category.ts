import { writable } from 'svelte/store';

export const category = writable<string>('');
export const categorySet = writable<boolean>(false);
