<script lang="ts">
    import { Router, Route } from 'svelte-navigator';
    import Home from './pages/Home.svelte';
    import Start from './pages/Start.svelte';

    let headerHeight: number;
</script>

<header bind:clientHeight={headerHeight}>Taste Test</header>
<main style="--header-height: {headerHeight}px">
    <Router>
        <Route path="/">
            <Home />
        </Route>
        <Route path="start">
            <Start />
        </Route>
    </Router>
</main>

<style type="text/scss">
    header {
        background: var(--color-primary);
        padding: 1.2rem 2.4rem;
        font-size: 2.4rem;
    }

    main {
        min-height: calc(100% - var(--header-height));
        text-align: center;
        background: var(--color-subtle);
        padding-top: 8rem;

        display: grid;
        justify-content: center;
        align-content: start;
        row-gap: 1.6rem;
        padding-bottom: 2.4rem;
    }
</style>
