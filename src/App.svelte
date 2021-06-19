<script lang="ts">
    import { Router, Route, Link } from 'svelte-navigator';
    import Home from './components/Home.svelte';
    import Start from './components/Start.svelte';

    // export let name: string;
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
    }
</style>
