<script lang="ts">
    import { Link } from 'svelte-navigator';
    import PageWrapper from '../components/PageWrapper.svelte';
</script>

<PageWrapper>
    <h1>Welcome</h1>
    <p class="subtitle-wrapper text--md">Enjoy the tasting and we'll take care of the rest</p>

    <div class="button-wrapper">
        <Link to="/setup" class="btn-primary center">Start Tasting!</Link>
    </div>
</PageWrapper>
