<script lang="ts">
    import { Link, navigate } from 'svelte-navigator';
    import PageWrapper from '../components/PageWrapper.svelte';

    import { category } from '../stores/category';
    import { data } from '../stores/data';

    if ($data.samples.length === 0) navigate('/');
</script>

<PageWrapper>
    <h1>Perform Tasting</h1>

    <div class="content-wrapper">
        <h3>Order of Samples</h3>
        <p class="text--sm">Serve the samples in the order below</p>
        <ol>
            {#each $data.samples as sample, i}
                <li>
                    <div>{$data.isAlphanumerical ? String.fromCharCode(97 + i) : i + 1}</div>
                    <span>{sample.name}</span>
                </li>
            {/each}
        </ol>

        <h3>Step and Tips</h3>
        <p class="text--sm">Prepare only a small portion of each type of {$category}</p>
        <p class="text--sm">Give each participant a sheet of paper to record their thoughts and rankings</p>
        <p class="text--sm">
            Since the participants do not know which type of sample they are tasting they must record their sample
            rankings based on the order in which they are given
        </p>
        <h3>Example</h3>
        {#if $data.isAlphanumerical}
            <p class="text--sm">
                Billy is participating in a taste test with 3 samples. Billy liked sample A the least and liked sample B
                the best. Billy should hand in:
            </p>
            <p class="text--sm">
                1<sup>st</sup> - B<br />
                2<sup>nd</sup> - C<br />
                3<sup>rd</sup> - A
            </p>
        {:else}
            <p class="text--sm">
                Billy is participating in a taste test with 3 samples. Billy liked the first sample the least and liked
                the second sample the best. Billy should hand in:
            </p>
            <p class="text--sm">
                1<sup>st</sup> - 2<br />
                2<sup>nd</sup> - 3<br />
                3<sup>rd</sup> - 1
            </p>
        {/if}

        <p class="text--sm font--thick">
            Once you have collected all participants rankings select "Input Results" below
        </p>
    </div>
    <div class="button-wrapper">
        <Link to="/confirm" class="btn-secondary back">Back</Link>
        <Link to="/rank" class="btn-primary next">Input Results</Link>
    </div>
</PageWrapper>

<style lang="scss">
    h3:not(:first-child) {
        margin-top: 2.4rem;
    }

    p:last-child {
        margin-top: 2.4rem;
    }
</style>
