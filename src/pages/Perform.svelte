<script lang="ts">
    import { Link } from 'svelte-navigator';
    import PageWrapper from '../components/PageWrapper.svelte';

    import { data } from '../stores/data';
</script>

<PageWrapper>
    <h1>Perform Tasting</h1>

    <h3 class="subtitle-wrapper">Order of Samples</h3>

    <div class="content-wrapper">
        <p class="text--sm">Serve the samples in the order below</p>
        <ol>
            {#each $data.samples as sample, i}
                <li>
                    <div>{i + 1}</div>
                    <span>{sample.name}</span>
                </li>
            {/each}
        </ol>
        <!-- <h3>Tips</h3>
        <p>1. Prepare a small portion of each type of {$sampleType}</p>
        <p>1. Prepare a small portion of each type of {$sampleType}</p> -->
        <p class="text--sm">When finished select "Input Results" below</p>
    </div>
    <div class="button-wrapper">
        <Link to="/confirm" class="btn-secondary">Back</Link>
        <Link to="/rank" class="btn-primary">Input Results</Link>
    </div>
</PageWrapper>
