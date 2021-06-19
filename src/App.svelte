<script lang="ts">
    import { Router, Route } from 'svelte-navigator';
    import Home from './pages/Home.svelte';
    import Start from './pages/Start.svelte';
</script>

<main>
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
    main {
        height: 100%;
        text-align: center;
        background: var(--color-subtle);
        padding-top: 8rem;

        display: grid;
        justify-content: center;
        align-content: start;
        row-gap: 1.6rem;
    }
</style>
