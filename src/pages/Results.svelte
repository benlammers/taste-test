<script lang="ts">
    import { Link } from 'svelte-navigator';

    import { data } from '../stores/data';

    import PageWrapper from '../components/PageWrapper.svelte';
    import ParticipantResult from '../components/ParticipantResult.svelte';

    let viewResults = false;

    // // View Results

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

    <p class="subtitle" />

    <div class="content-wrapper">
        {#if viewResults}
            <h2>Overall</h2>
            <ol>
                {#each overall as result}
                    <li>
                        {result.name}
                        Score: {result.score}
                    </li>
                {/each}
            </ol>

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

<style lang="scss">
    :global(a) {
        justify-self: center;
        align-self: end;
    }

    p {
        font-size: 1.6rem;
    }
</style>
