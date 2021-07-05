<script lang="ts">
    import { Link, navigate } from 'svelte-navigator';
    import * as animateScroll from 'svelte-scrollto';

    import { data, getOrderBySampleId } from '../stores/data';
    import { capitalize } from '../util';

    import PageWrapper from '../components/PageWrapper.svelte';
    import ParticipantResult from '../components/ParticipantResult.svelte';
    import { fade, fly } from 'svelte/transition';

    if ($data.results.length === 0) navigate('/');

    interface SampleResult {
        id: number;
        name: string;
        score: number;
        firsts: number;
        lasts: number;
    }

    let viewResults: boolean = false;

    let results: SampleResult[] = $data.samples.map<SampleResult>((sample) => {
        return {
            name: sample.name,
            id: sample.id,
            score: $data.results.map((result) => result.rankings.indexOf(sample.id) + 1).reduce((a, b) => a + b, 0),
            firsts: $data.results
                .map((result) => (result.rankings[0] === sample.id ? 1 : 0))
                // @ts-ignore
                .reduce((a, b) => a + b, 0),
            lasts: $data.results
                .map((result) => (result.rankings[result.rankings.length - 1] === sample.id ? 1 : 0))
                // @ts-ignore
                .reduce((a, b) => a + b, 0),
        };
    });

    const sortByScore = (sampleA: SampleResult, sampleB: SampleResult): number => {
        return sampleA.score - sampleB.score;
    };

    const sortByFirsts = (sampleA: SampleResult, sampleB: SampleResult): number => {
        return sampleB.firsts - sampleA.firsts;
    };

    const sortByLasts = (sampleA: SampleResult, sampleB: SampleResult): number => {
        return sampleB.lasts - sampleA.lasts;
    };

    const getAllMost = (
        property: 'lasts' | 'firsts',
        sortingFunction: (sampleA: SampleResult, sampleB: SampleResult) => number
    ): { displayString: string; total: number } => {
        let arrayToSort = [...results];
        let total = arrayToSort.sort(sortingFunction)[0]?.[property];
        let allMost = arrayToSort.filter((sampleResult) => sampleResult[property] === total);
        let displayString: string;
        if (allMost.length === 1) displayString = capitalize(allMost[0]?.name);
        else {
            let lastItem = allMost.pop() as SampleResult;
            displayString =
                allMost.map((sampleResult) => capitalize(sampleResult.name)).join(', ') +
                ' and ' +
                capitalize(lastItem?.name);
        }
        return {
            displayString,
            total,
        };
    };

    let overall: SampleResult[] = [...results].sort((sampleA, sampleB) => {
        let diff = sortByScore(sampleA, sampleB);
        if (diff === 0) {
            diff = sortByFirsts(sampleA, sampleB);
        }
        return diff;
    });

    let mostLoved = getAllMost('firsts', sortByFirsts);
    let mostHated = getAllMost('lasts', sortByLasts);
</script>

<PageWrapper>
    <h1>Results</h1>

    <p class="subtitle-wrapper" />

    <div class="content-wrapper">
        {#if viewResults}
            <div class="results" transition:fly|local={{ duration: 600, delay: 300, y: 400 }}>
                <div class="overall">
                    <h2>Overall</h2>
                    <p class="text--sm">Lowest Score Wins</p>
                    <div class="ranked-list">
                        <p class="text--sm font--thick">Rank</p>
                        <div>
                            {#each overall as result, i}
                                <div>
                                    <span
                                        >{i + 1}<sup>{i === 0 ? 'st' : i === 1 ? 'nd' : i > 2 ? 'th' : 'rd'}</sup></span
                                    >
                                </div>
                            {/each}
                        </div>
                        <ol>
                            {#each overall as result}
                                <li>
                                    <div>{getOrderBySampleId(result.id)}</div>
                                    <span>{result.name}</span>
                                    <div>{result.score}pts</div>
                                </li>
                            {/each}
                        </ol>
                    </div>
                    <p class="text--xs">
                        1<sup>st</sup> = 1pt, &nbsp;2<sup>nd</sup> = 2pts, &nbsp;3<sup>rd</sup> = 3pts &nbsp;etc.
                    </p>
                </div>

                <div class="stat">
                    <h3>Most Loved</h3>
                    <p class="color--gold text--md">{mostLoved.displayString}</p>
                    <p class="text--sm">with {mostLoved.total} first{mostLoved.total > 1 ? 's' : ''}</p>
                </div>

                <div class="stat">
                    <h3>Most Hated</h3>
                    <p class="color--red text--md">{mostHated.displayString}</p>
                    <p class="text--sm">with {mostHated.total} last{mostHated.total > 1 ? 's' : ''}</p>
                </div>
                <div class="participants">
                    <h2>Participants</h2>
                    {#each $data.results as result}
                        <ParticipantResult {result} />
                    {/each}
                </div>
            </div>
        {:else}
            <div class="preview">
                <p class="text--md" transition:fade|local={{ duration: 300 }}>The results are in!</p>
                <button
                    class="btn-primary"
                    transition:fade|local={{ duration: 300 }}
                    on:click|once={() => (viewResults = true)}>View Results</button
                >
            </div>
        {/if}
    </div>

    <div class="button-wrapper">
        {#if !viewResults}
            <Link to="/rank" class="btn-secondary back">Back</Link>
        {:else}
            <button class="btn-primary center" on:click={() => animateScroll.scrollToTop()}>Back to Top</button>
        {/if}
    </div>
</PageWrapper>

<style lang="scss">
    .preview {
        display: grid;
        justify-items: center;
        row-gap: 4.8rem;
    }

    .results {
        display: grid;
        row-gap: 2.4rem;
    }

    .overall p:last-child {
        margin-top: 1.2rem;
    }

    .stat {
        margin: 2.4rem 0;
        display: grid;
        row-gap: 0.8rem;
    }

    .participants {
        display: grid;
        row-gap: 3.2rem;
    }
</style>
