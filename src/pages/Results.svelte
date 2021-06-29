<script lang="ts">
    import { Link } from 'svelte-navigator';

    import { data } from '../stores/data';

    import PageWrapper from '../components/PageWrapper.svelte';
    import ParticipantResult from '../components/ParticipantResult.svelte';

    let viewResults = false;

    let results = $data.samples.map((sample) => {
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

    // TODO: Handle ties
    let overall = [...results].sort((sampleA, sampleB) => sampleA.score - sampleB.score);
    let mostLoved = [...results].sort((sampleA, sampleB) => sampleB.firsts - sampleA.firsts)[0];
    let mostHated = [...results].sort((sampleA, sampleB) => sampleB.lasts - sampleA.lasts)[0];

    $: console.log({ results, data: $data.results });
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

            <h2>Most Loved</h2>
            <p>{mostLoved.name}: {mostLoved.firsts} first places</p>

            <h2>Most Hated</h2>
            <p>{mostHated.name}: {mostHated.lasts} last places</p>

            <h2>Participants</h2>
            {#each $data.results as result}
                <ParticipantResult {result} />
            {/each}
        {:else}
            <button class="btn-primary" on:click|once={() => (viewResults = true)}>View Results</button>
        {/if}
    </div>

    {#if !viewResults}
        <div class="button-wrapper">
            <Link to="/rank" class="btn-secondary">Back</Link>
        </div>
    {/if}
</PageWrapper>
