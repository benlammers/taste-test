<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    import { Link } from 'svelte-navigator';
    import { dndzone } from 'svelte-dnd-action';

    import type { ListItemType } from '../stores/data';
    import { data } from '../stores/data';
    import { rankIndex } from '../stores/steps';

    import PageWrapper from '../components/PageWrapper.svelte';

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

    let prevIndex: number;
    let transitioning = false;

    const onTransitionEnd = () => {
        transitioning = false;
    };
</script>

<PageWrapper>
    <h1>Input Rankings</h1>

    {#each $data.persons as person (person.id)}
        {#if currPersonId === person.id}
            <h2 class="subtitle-wrapper" transition:fade|local>{person.name}</h2>
            <div class="content-wrapper" transition:fly|local={{ x: 300 }} on:outroend={onTransitionEnd}>
                <div class="ranked-list">
                    <p class="text--sm font--thick">Rank</p>
                    <div>
                        {#each items as item, i}
                            <div><span>{i + 1}<sup>{i === 0 ? 'st' : i > 1 ? 'th' : 'nd'}</sup></span></div>
                        {/each}
                    </div>
                    <ol
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
                    </ol>
                </div>
                <p class="text--sm">Green number is order in which samples were tasted</p>
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
