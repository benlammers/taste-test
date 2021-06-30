<script lang="ts">
    import { Link, navigate } from 'svelte-navigator';

    import { category } from '../stores/category';
    import { data } from '../stores/data';

    import PageWrapper from '../components/PageWrapper.svelte';

    if ($data.samples.length === 0) navigate('/');
</script>

<PageWrapper>
    <h1>Confirm</h1>

    <div class="content-wrapper">
        <h3>Types of {$category}</h3>
        <ol>
            {#each $data.samples as sample, i}
                <li>
                    <div>{i + 1}</div>
                    <span>{sample.name}</span>
                </li>
            {/each}
        </ol>
        <h3>Participants</h3>
        <ol>
            {#each $data.persons as person, i}
                <li>
                    <div>{i + 1}</div>
                    <span>{person.name}</span>
                </li>
            {/each}
        </ol>
    </div>
    <div class="button-wrapper">
        <Link to="/setup" class="btn-secondary">Back</Link>
        <Link to="/perform" class="btn-primary">Confirm</Link>
    </div>
</PageWrapper>

<style lang="scss">
    h3 {
        margin-bottom: 0.4rem;
    }

    ol {
        margin-bottom: 2rem;
    }
</style>
