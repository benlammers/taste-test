<script context="module">
    let numOfLists = 0;
</script>

<script lang="ts">
    import type { Writable } from 'svelte/store';
    import { flip } from 'svelte/animate';
    import { fly } from 'svelte/transition';

    import type { ListItemType } from '../stores';
    import TrashIcon from '../icons/TrashIcon.svelte';

    export let items: Writable<ListItemType[]>;
    export let label: string;
    export let placeholder: string;

    let newItem: string = '';
    let inputId = numOfLists++;

    const handleAddItem = (): void => {
        let newId = $items.length === 0 ? 1 : $items[$items.length - 1].id + 1;
        items.update((items) => [...items, { name: newItem, id: newId }]);
        newItem = '';
    };

    const removeItem = (itemId: number): void => {
        items.update((items) => items.filter((item) => item.id !== itemId));
    };
</script>

<form on:submit|preventDefault={handleAddItem}>
    <label for={`new-item-${inputId}`}>{label}</label>
    <input type="text" id={`new-item-${inputId}`} {placeholder} bind:value={newItem} />
</form>

<ul>
    {#each $items as item (item.id)}
        <li out:fly|local={{ x: 10 }} in:fly|local={{ y: 50 }} animate:flip>
            <span>{item.name}</span>
            <button on:click|once={() => removeItem(item.id)}>
                <TrashIcon />
            </button>
        </li>
    {/each}
</ul>

<style lang="scss">
    form {
        font-size: 1.6rem;
        width: 100%;
        display: grid;
        grid-template-columns: max-content 1fr;
        align-items: center;
        column-gap: 1.2rem;
        margin-bottom: 2.4rem;
    }

    ul {
        display: grid;
        align-content: start;
        row-gap: 1.2rem;

        padding: 1.2rem 0;
        min-height: min(32rem, 40vh);
    }

    li {
        display: grid;
        grid-template-columns: 1fr max-content;
        align-items: center;
        height: min-content;

        background: #ffffff;
        box-shadow: var(--shadow-base);
        font-size: 1.8rem;
        border-radius: 4px;
        overflow: hidden;

        & button {
            padding: 1.2rem;
            background: #c70000;
            font-size: 2.8rem;
            border: none;
            cursor: pointer;
            display: grid;
            align-items: center;
        }
    }
</style>
