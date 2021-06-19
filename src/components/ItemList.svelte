<script context="module">
    let numOfLists = 0;
</script>

<script lang="ts">
    import type { Writable } from 'svelte/store';
    import { quintOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    import type { ListItemType } from '../stores';

    export let items: Writable<ListItemType[]>;
    export let label: string;

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

    const [send, receive] = crossfade({
        duration: (d) => Math.sqrt(d * 200),

        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 600,
                easing: quintOut,
                css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
            };
        },
    });
</script>

<form on:submit|preventDefault={handleAddItem}>
    <label for={`new-item-${inputId}`}>{label}</label>
    <input type="text" id={`new-item-${inputId}`} bind:value={newItem} />
</form>

<ul>
    {#each $items as item (item.id)}
        <li in:receive={{ key: item.id }} out:send={{ key: item.id }} animate:flip={{ duration: 200 }}>
            {item.name}
            <button on:click|once={() => removeItem(item.id)}>×</button>
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
    }

    input {
        height: 32px;
    }

    ul {
        display: grid;
        align-content: start;
        row-gap: 1.2rem;

        padding: 1.2rem 0;
        height: 40vh;
        min-height: 20rem;
    }

    li {
        display: grid;
        grid-template-columns: 1fr max-content;
        align-items: center;

        background: #ffffff;
        box-shadow: var(--shadow-base);
        padding: 0.8rem 1.2rem;

        font-size: 1.8rem;
    }

    li button {
        background: red;
        display: block;
        font-size: 2.8rem;
        border-radius: 4px;
        border: none;
        cursor: pointer;
    }
</style>
