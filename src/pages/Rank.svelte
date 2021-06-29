<script lang="ts">
    import { flip } from 'svelte/animate';
    import { Link } from 'svelte-navigator';
    import { dndzone } from 'svelte-dnd-action';

    import type { ListItemType } from '../stores/data';
    import { data } from '../stores/data';
    import { rankIndex } from '../stores/steps';

    import PageWrapper from '../components/PageWrapper.svelte';

    // ITERATE THROUGH RESULTS INSTEAD OF PEOPLE?

    $: currPersonId = $data.persons[$rankIndex].id;

    function backParticipant(): void {
        if ($rankIndex !== 0) {
            rankIndex.decrement();
        } else {
            console.error('Current index should not go below 0');
        }
    }

    function nextParticipant(): void {
        rankIndex.increment();
    }

    const flipDurationMs: number = 300;

    $: currRankings = $data.results.find((result) => result.person === currPersonId)?.rankings;
    $: items = [...$data.samples].sort(sortBy(currRankings));

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
        data.updateRanks({ person: currPersonId, rankings: items.map((item) => item.id) });
    }

    function getIndexOfSample(id: number): number {
        return $data.samples.findIndex((sample) => sample.id === id) + 1;
    }

    // TODO: Is this accessible
    let dropTargetStyle = { outline: 'none' };
</script>

<PageWrapper>
    <h1>Input Rankings</h1>

    {#each $data.persons as person (person.id)}
        {#if currPersonId === person.id}
            <h2 class="subtitle">{person.name}</h2>
            <div class="content-wrapper list">
                <p>Rank</p>
                <div class="ranks">
                    {#each items as item, i}
                        <div><span>{i + 1}<sup>{i === 0 ? 'st' : i > 1 ? 'th' : 'nd'}</sup></span></div>
                    {/each}
                </div>
                <ul
                    use:dndzone={{ items, flipDurationMs, dropTargetStyle }}
                    on:consider={handleDndConsider}
                    on:finalize={handleDndFinalize}
                >
                    {#each items as tasteItem (tasteItem.id)}
                        <li animate:flip={{ duration: flipDurationMs }}>
                            <div>
                                {getIndexOfSample(tasteItem.id)}
                            </div>
                            <span>
                                {tasteItem.name}
                            </span>
                        </li>
                    {/each}
                </ul>
                <p>Green number is order in which samples were tasted</p>
            </div>
        {/if}
    {/each}

    <div class="button-wrapper">
        {#if $rankIndex === 0}
            <Link class="btn-secondary" to="/perform">Back</Link>
        {:else if currPersonId !== $data.persons[0].id}
            <button class="btn-secondary" on:click={backParticipant}>Back</button>
        {/if}

        {#if $rankIndex === $data.persons.length - 1}
            <Link to="/results" class="btn-primary">Continue</Link>
        {:else}
            <button class="btn-primary" on:click={nextParticipant}>Next</button>
        {/if}
    </div>
</PageWrapper>

<style lang="scss">
    .list {
        display: grid;
        grid-template-columns: max-content 1fr;
        width: calc(100vw - 48px);
        max-width: 400px;
        margin: 1.2rem auto;
        column-gap: 1.2rem;
        row-gap: 0.4rem;

        p {
            grid-column: 1 / 2;
            font-size: 1.6rem;
        }

        p:last-child {
            grid-column: 1 / -1;
            text-align: center;
            padding: 2.4rem 1.2rem 1.2rem;
        }
    }

    .ranks,
    ul {
        display: grid;
        align-content: start;
        row-gap: 1.2rem;
        grid-row: 2 / 3;
    }

    .ranks div,
    li {
        display: grid;
        align-content: center;
        box-shadow: var(--shadow-base);
        font-size: 1.8rem;
        border-radius: 4px;
        background: #ffffff;
    }

    .ranks div {
        height: 48px;
        width: 48px;
    }

    li {
        grid-template-columns: 48px 1fr;
        align-items: center;
        background: #ffffff;
        box-shadow: var(--shadow-base);
        font-size: 1.8rem;
        border-radius: 4px;
        overflow: hidden;

        span,
        div {
            padding: 1.2rem;
        }

        div {
            background-color: var(--color-primary);
            color: white;
        }
    }

    .button-wrapper {
        display: grid;
        grid-template-columns: 1fr max-content;
        width: 100%;

        button,
        a {
            justify-self: start;
        }

        button:last-child,
        a:last-child {
            justify-self: end;
        }
    }
</style>
