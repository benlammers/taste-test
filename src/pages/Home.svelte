<script lang="ts">
    import { Link } from 'svelte-navigator';
    import PageWrapper from '../components/PageWrapper.svelte';
</script>

<PageWrapper>
    <h1>Welcome to the Taste Test App</h1>
    <p>Enjoy the sampling and we'll take care of the rest</p>

    <Link to="/setup" class="btn-primary">Start Tasting!</Link>
</PageWrapper>

<style lang="scss">
    :global(a) {
        justify-self: center;
    }

    p {
        font-size: 1.6rem;
    }
</style>
