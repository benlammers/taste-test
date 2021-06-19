<script lang="ts">
    import ItemList from '../components/ItemList.svelte';
    import { tasteItems, participantItems } from '../stores';

    let showItems = true;
</script>

<h1>Lets Get Started</h1>
<p>Add all the items you would like to test</p>
<p>Keep this hidden if you would like it to be a blind taste test</p>

<div class="input-list-wrapper">
    {#if showItems}
        <ItemList items={tasteItems} label="Add Item" />
    {:else}
        <ItemList items={participantItems} label="Add Participant" />
    {/if}
</div>

<button
    on:click={() => {
        showItems = !showItems;
    }}>Input {showItems ? 'Taste Items' : 'Participants'}</button
>

<style lang="scss">
    p {
        font-size: 2rem;
    }

    .input-list-wrapper {
        display: grid;
        width: calc(100vw - 48px);
        max-width: 400px;
        margin: 1.2rem auto;
    }

    button {
        justify-self: center;
        display: grid;
        align-items: center;

        border: 1px solid lightgray;
        padding: 12px 16px;
        font-size: 1.8rem;
        border-radius: 4px;
        background: var(--color-primary);
        cursor: pointer;
    }
</style>
