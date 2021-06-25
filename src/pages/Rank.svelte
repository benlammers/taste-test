<script lang="ts">
    import { flip } from 'svelte/animate';
    import { dndzone } from 'svelte-dnd-action';

    import type { ListItemType } from '../stores';
    import { store } from '../stores';

    import PageWrapper from '../components/PageWrapper.svelte';

    // ITERATE THROUGH RESULTS INSTEAD OF PEOPLE?

    let currIndex = 0;
    $: currPersonId = $store.persons[currIndex].id;

    function backParticipant(): void {
        if (currIndex !== 0) {
            currIndex -= 1;
        } else {
            console.error('Current index should not go below 0');
        }
    }

    function nextParticipant(): void {
        if (currIndex <= $store.persons.length - 2) {
            currIndex += 1;
        } else {
            // console.error('Current index should not go above length of participants');

            // View Results
            let scores = $store.samples
                .map((sample) => {
                    return {
                        name: sample.name,
                        score: $store.results
                            .map((result) => result.rankings.indexOf(sample.id) + 1)
                            .reduce((a, b) => a + b, 0),
                    };
                })
                .sort((sampleA, sampleB) => sampleA.score - sampleB.score);
            alert(scores.map((score, i) => `${i + 1}. ${score.name}\n`).join(' '));
        }
    }

    const flipDurationMs: number = 300;

    $: currRankings = $store.results.find((result) => result.person === currPersonId)?.rankings;
    $: items = [...$store.samples.sort(sortBy(currRankings))];

    function sortBy(currRankings: number[] | undefined) {
        return function (sampleA: ListItemType, sampleB: ListItemType) {
            if (currRankings === undefined) {
                throw new TypeError('Could not find player rankings');
            }

            let indexA = currRankings.findIndex((rank) => rank === sampleA.id);
            let indexB = currRankings.findIndex((rank) => rank === sampleB.id);

            return indexA - indexB;
        };
    }

    function handleDndConsider(e: any): void {
        items = e.detail.items;
    }

    function handleDndFinalize(e: any): void {
        items = e.detail.items;
        store.updateRanks({ person: currPersonId, rankings: items.map((item) => item.id) });
    }

    // TODO: Is this accessible
    let dropTargetStyle = { outline: 'none' };
</script>

<PageWrapper>
    <h1>Input Rankings</h1>

    {#each $store.persons as person (person.id)}
        {#if currPersonId === person.id}
            <div class="list">
                <p>{person.name}</p>
                <ul
                    use:dndzone={{ items, flipDurationMs, dropTargetStyle }}
                    on:consider={handleDndConsider}
                    on:finalize={handleDndFinalize}
                >
                    {#each items as tasteItem (tasteItem.id)}
                        <li animate:flip={{ duration: flipDurationMs }}>
                            {tasteItem.name}
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
    {/each}

    <div class="button-wrapper">
        {#if currPersonId !== $store.persons[0].id}
            <button class="btn-secondary" on:click={backParticipant}>Back</button>
        {/if}
        <button class="btn-primary" on:click={nextParticipant}>Next</button>
    </div>
</PageWrapper>

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
