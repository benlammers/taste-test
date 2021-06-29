<script lang="ts">
    import { Link } from 'svelte-navigator';
    import PageWrapper from '../components/PageWrapper.svelte';
</script>

<PageWrapper>
    <h1>Welcome</h1>
    <p>Enjoy the sampling and we'll take care of the rest</p>

    <div class="content-wrapper">
        <Link to="/setup" class="btn-primary">Start Tasting!</Link>
    </div>
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
