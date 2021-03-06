<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    import { Link, navigate } from 'svelte-navigator';
    import { dndzone } from 'svelte-dnd-action';
    import Draggable24 from 'carbon-icons-svelte/lib/Draggable24';

    import type { ListItemType } from '../stores/data';
    import { data, getOrderBySampleId } from '../stores/data';
    import { rankIndex } from '../stores/steps';

    import PageWrapper from '../components/PageWrapper.svelte';

    if ($data.samples.length === 0) navigate('/');

    let prevIndex: number;
    $: currParticipantId = $data.participants[$rankIndex]?.id;

    onMount(() => {
        prevIndex = $rankIndex === 1 ? 2 : $rankIndex;
    });

    const backParticipant = (): void => {
        if ($rankIndex !== 0) {
            prevIndex = $rankIndex;
            rankIndex.decrement();
        } else {
            console.error('Current index should not go below 0');
        }
    };

    const nextParticipant = (): void => {
        prevIndex = $rankIndex;
        rankIndex.increment();
    };

    const flipDurationMs: number = 300;

    $: currRankings = $data.results.find((result) => result.participant === currParticipantId)?.rankings;
    $: items = [...$data.samples].sort(sortBy(currRankings));

    const sortBy = (currRankings: number[] | undefined) => {
        return (sampleA: ListItemType, sampleB: ListItemType) => {
            if (currRankings === undefined) {
                throw new TypeError('Could not find player rankings');
            }

            let indexA = currRankings.findIndex((rank) => rank === sampleA.id);
            let indexB = currRankings.findIndex((rank) => rank === sampleB.id);

            return indexA - indexB;
        };
    };

    const handleDndConsider = (e: any): void => {
        items = e.detail.items;
    };

    const handleDndFinalize = (e: any): void => {
        items = e.detail.items;
        data.updateRanks({ participant: currParticipantId, rankings: items.map((item) => item.id) });
    };

    let transitioning: boolean = false;

    const onTransitionEnd = () => {
        transitioning = false;
    };

    const getOutX = (): -300 | 300 => {
        if (prevIndex <= $rankIndex) return -300;
        else return 300;
    };

    const getInX = (): -300 | 300 => {
        if (prevIndex <= $rankIndex) return 300;
        else return -300;
    };
</script>

<PageWrapper>
    <h1>Input Rankings</h1>

    {#each $data.participants as participant, i (participant.id)}
        {#if currParticipantId === participant.id}
            <h2 class="subtitle-wrapper" transition:fade|local>{participant.name}</h2>
            <div
                class="content-wrapper"
                in:fly|local={{ x: getInX(), delay: 300 }}
                out:fly|local={{ x: getOutX() }}
                on:outroend={onTransitionEnd}
            >
                <div class="ranked-list">
                    <p class="text--sm font--thick">Rank</p>
                    <div>
                        {#each items as item, i}
                            <div>
                                <span>{i + 1}<sup>{i === 0 ? 'st' : i === 1 ? 'nd' : i > 2 ? 'th' : 'rd'}</sup></span>
                            </div>
                        {/each}
                    </div>
                    <ol
                        use:dndzone={{ items, flipDurationMs, dropTargetStyle: { outline: 'none' } }}
                        on:consider={handleDndConsider}
                        on:finalize={handleDndFinalize}
                    >
                        {#each items as tasteItem (tasteItem.id)}
                            <li animate:flip={{ duration: flipDurationMs }}>
                                <div>
                                    {getOrderBySampleId(tasteItem.id)}
                                </div>
                                <span>
                                    {tasteItem.name}
                                </span>
                                <div>
                                    <Draggable24 />
                                </div>
                            </li>
                        {/each}
                    </ol>
                </div>
                <p class="text--xs">Drag and drop items to reorder</p>
                <p class="text--sm">
                    Green {$data.isAlphanumerical ? 'letter' : 'number'} is order in which samples were tasted
                </p>
            </div>
        {/if}
    {/each}

    <div class="button-wrapper">
        {#if $rankIndex === 0}
            <Link class="btn-secondary back" to="/perform">Back</Link>
        {:else if currParticipantId !== $data.participants[0].id}
            <button class="btn-secondary back" on:click={backParticipant}>Back</button>
        {/if}

        {#if $rankIndex === $data.participants.length - 1}
            <Link to="/results" class="btn-primary next">Continue</Link>
        {:else}
            <button class="btn-primary next" on:click={nextParticipant}>Next</button>
        {/if}
    </div>
</PageWrapper>
