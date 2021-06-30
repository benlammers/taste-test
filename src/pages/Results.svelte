<script lang="ts">
    import { Link, navigate } from 'svelte-navigator';

    import { data } from '../stores/data';

    import PageWrapper from '../components/PageWrapper.svelte';
    import ParticipantResult from '../components/ParticipantResult.svelte';
    import { capitalize } from '../util';

    if ($data.results.length === 0) navigate('/');

    interface SampleResult {
        name: string;
        score: number;
        firsts: number;
        lasts: number;
    }

    let viewResults = false;

    let results = $data.samples.map<SampleResult>((sample) => {
        return {
            name: sample.name,
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

    let overall = [...results].sort((sampleA, sampleB) => {
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
            <h2>Overall</h2>
            <p class="text--sm font--thick">Lowest Score Wins</p>
            <div class="ranked-list">
                <p class="text--sm font--thick">Rank</p>
                <div>
                    {#each overall as result, i}
                        <div><span>{i + 1}<sup>{i === 0 ? 'st' : i > 1 ? 'th' : 'nd'}</sup></span></div>
                    {/each}
                </div>
                <ol>
                    {#each overall as result}
                        <li>
                            <div>{result.score}</div>
                            <span>{result.name}</span>
                        </li>
                    {/each}
                </ol>
            </div>

            <h3>Most Loved</h3>
            <p class="color--primary text--md">{mostLoved.displayString}</p>
            <p class="text--sm">with {mostLoved.total} firsts</p>

            <h3>Most Hated</h3>
            <p class="color--red text--md">{mostHated.displayString}</p>
            <p class="text--sm">with {mostHated.total} lasts</p>

            <h2>Participants</h2>
            {#each $data.results as result}
                <ParticipantResult {result} />
            {/each}
        {:else}
            <p class="text--md">The results are in!</p>
            <button class="btn-primary" on:click|once={() => (viewResults = true)}>View Results</button>
        {/if}
    </div>

    {#if !viewResults}
        <div class="button-wrapper">
            <Link to="/rank" class="btn-secondary">Back</Link>
        </div>
    {/if}
</PageWrapper>

<style lang="scss">
    .content-wrapper button {
        justify-self: center;
    }
</style>
