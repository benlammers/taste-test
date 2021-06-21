<script lang="ts">
    import { fly } from 'svelte/transition';

    import ItemList from '../components/ItemList.svelte';
    import { tasteItems, participantItems } from '../stores';

    let showItems = true;
    let showNames = false;

    function goToNextPage() {
        console.log('NEXT PAGE');
    }
</script>

<h1>Lets Get Started</h1>
<p>Add all the items you would like to test</p>
<p>Keep this hidden if you would like it to be a blind taste test</p>

{#if showItems}
    <div class="input-list-wrapper" transition:fly|local={{ x: -300 }} on:outroend={() => (showNames = true)}>
        <ItemList items={tasteItems} label="Add Item" placeholder="Item Name" />
    </div>
{/if}
{#if showNames}
    <div class="input-list-wrapper" transition:fly|local={{ x: 300 }} on:outroend={() => (showItems = true)}>
        <ItemList items={participantItems} label="Add Participant" placeholder="Participant Name" />
    </div>
{/if}

<div class="button-wrapper">
    {#if !showItems}
        <button
            class="btn-secondary"
            on:click={() => {
                showNames = false;
            }}>Back</button
        >
        <button class="btn-primary" on:click={goToNextPage}>Continue</button>
    {:else}
        <button
            class="btn-primary"
            on:click={() => {
                showItems = false;
            }}
            >Next
        </button>
    {/if}
</div>

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
    }

    .button-wrapper {
        display: grid;
        grid-template-columns: max-content max-content;
        justify-content: center;
        column-gap: 2.4rem;
    }
</style>
