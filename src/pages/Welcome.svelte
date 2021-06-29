<script lang="ts">
    import { Link } from 'svelte-navigator';
    import PageWrapper from '../components/PageWrapper.svelte';
</script>

<PageWrapper>
    <h1>Welcome</h1>
    <p class="subtitle text--md">Enjoy the sampling and we'll take care of the rest</p>

    <div class="content-wrapper">
        <Link to="/setup" class="btn-primary">Start Tasting!</Link>
    </div>
</PageWrapper>
