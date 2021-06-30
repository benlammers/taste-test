import { writable } from 'svelte/store';
import { test } from './data';

export const category = writable<string>(test ? 'cheese' : '');
