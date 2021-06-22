<script lang="ts">
    import {} from 'svelte/animate';
    import { fade, fly } from 'svelte/transition';

    import { tasteItems, participantItems } from '../stores';

    let currIndex = 0;
    $: currParticipant = $participantItems[currIndex].id;

    const backParticipant = (): void => {
        if (currIndex !== 0) {
            currIndex -= 1;
        } else {
            console.error('Current index should not go below 0');
        }
    };

    const nextParticipant = (): void => {
        if (currIndex <= $participantItems.length - 2) {
            currIndex += 1;
        } else {
            console.error('Current index should not go above length of participants');
        }
    };
</script>

<h1>Input Participant Rankings</h1>

{#each $participantItems as participant (participant.id)}
    {#if currParticipant === participant.id}
        <div class="list">
            <p transition:fade>{participant.name}</p>
            <ul in:fly={{ x: 50 }} out:fly={{ x: -50 }}>
                {#each $tasteItems as tasteItem (tasteItem.id)}
                    <li>
                        {tasteItem.name}
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
{/each}

<div class="button-wrapper">
    {#if currParticipant !== $participantItems[0].id}
        <button class="btn-secondary" on:click={backParticipant}>Back</button>
    {/if}
    <button class="btn-primary" on:click={nextParticipant}>Next</button>
</div>

<style lang="scss">
    .list {
        display: grid;
        width: calc(100vw - 48px);
        max-width: 400px;
        margin: 1.2rem auto;
    }

    p {
        font-size: 1.6rem;
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
        padding: 1.2rem;
    }

    .button-wrapper {
        display: grid;
        grid-template-columns: max-content max-content;
        justify-content: center;
        column-gap: 2.4rem;
    }
</style>
