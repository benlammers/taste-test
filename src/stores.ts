import { writable } from "svelte/store";

export interface ListItemType {
    name: string;
    id: number;
}

export const tasteItems = writable<ListItemType[]>([{ name: "apple", id: 1 }, {name: "banana", id: 2 }, {name: "cantelope", id: 3 }, {name: "mango", id: 4 }]);
// export const items = writable<TasteItemType[]>([]);
export const participantItems = writable<ListItemType[]>([{ name: "Ben", id: 1 }]);
// export const participantItems = writable<ListItemType[]>([]);
