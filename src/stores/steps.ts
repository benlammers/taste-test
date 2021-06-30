import { writable } from 'svelte/store';

export const createCount = (init: number) => {
    const { subscribe, update } = writable<number>(init);

    return {
        subscribe,
        increment: () => update((n) => n + 1),
        decrement: () => update((n) => n - 1),
    };
};

export const setupStep = createCount(3);
export const rankIndex = createCount(0);
