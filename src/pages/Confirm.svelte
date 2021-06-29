<script lang="ts">
    import { Link } from 'svelte-navigator';

    import { category } from '../stores/category';
    import { data } from '../stores/data';

    import PageWrapper from '../components/PageWrapper.svelte';
</script>

<PageWrapper>
    <h1>Confirm</h1>

    <div class="content-wrapper">
        <h3>Types of {$category}</h3>
        <ul>
            {#each $data.samples as sample}
                <li>{sample.name}</li>
            {/each}
        </ul>
        <h3>Participants</h3>
        <ul>
            {#each $data.persons as person}
                <li>{person.name}</li>
            {/each}
        </ul>
    </div>
    <div class="button-wrapper">
        <Link to="/setup" class="btn-secondary">Back</Link>
        <Link to="/perform" class="btn-primary">Confirm</Link>
    </div>
</PageWrapper>
