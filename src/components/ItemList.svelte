<script context="module">
    let numOfLists = 0;
</script>

<script lang="ts">
    import Checkmark32 from 'carbon-icons-svelte/lib/Checkmark32';
    import TrashCan24 from 'carbon-icons-svelte/lib/TrashCan24';

    import { flip } from 'svelte/animate';
    import { fly } from 'svelte/transition';

    import { capitalize } from '../util';
    import type { ListItemType } from '../stores/data';

    export let items: ListItemType[];
    export let label: string;
    export let itemName: string;
    export let placeholder: string;
    export let isAlphanumerical: boolean = false;

    export let add: (name: string) => void;
    export let remove: (id: number) => void;

    let newItem: string = '';
    let newItemError: string = '';
    let inputId: number = numOfLists++;

    const handleAddItem = (): void => {
        newItemError = '';
        if (!newItem.replace(/\s/g, '')) {
            newItemError = `${capitalize(itemName)} must not be blank`;
        } else if (items.filter((item) => item.name.toLowerCase() === newItem.toLowerCase()).length > 0) {
            newItemError = `${capitalize(newItem)} is already added`;
        } else {
            add(newItem.toLowerCase());
            newItem = '';
        }
    };

    const removeItem = (itemId: number): void => {
        remove(itemId);
    };
</script>

<form on:submit|preventDefault={handleAddItem} class:error={newItemError}>
    <label for={`new-item-${inputId}`}>{label}</label>
    <input
        type="text"
        id={`new-item-${inputId}`}
        {placeholder}
        bind:value={newItem}
        on:focus={() => (newItemError = '')}
    />
    <button type="submit">
        <Checkmark32 />
    </button>
    {#if newItemError}
        <span>{newItemError}</span>
    {/if}
</form>

<ol>
    {#each items as item, i (item.id)}
        <li out:fly|local={{ x: 10 }} in:fly|local={{ y: 50 }} animate:flip>
            <div>{isAlphanumerical ? String.fromCharCode(97 + i) : i + 1}</div>
            <span>{item.name}</span>
            <button on:click|once={() => removeItem(item.id)}>
                <TrashCan24 />
            </button>
        </li>
    {/each}
</ol>
