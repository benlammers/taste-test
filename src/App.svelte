<script lang="ts">
    import { Router, Route } from 'svelte-navigator';
    import Confirm from './pages/Confirm.svelte';
    import Welcome from './pages/Welcome.svelte';
    import Perform from './pages/Perform.svelte';
    import Rank from './pages/Rank.svelte';
    import Results from './pages/Results.svelte';
    import Setup from './pages/Setup.svelte';
</script>

<main>
    <Router>
        <Route path="/">
            <Welcome />
        </Route>
        <Route path="setup">
            <Setup />
        </Route>
        <Route path="confirm">
            <Confirm />
        </Route>
        <Route path="rank">
            <Rank />
        </Route>
        <Route path="perform">
            <Perform />
        </Route>
        <Route path="results">
            <Results />
        </Route>
    </Router>
</main>

<style type="text/scss">
    :global {
        @import 'src/styles/main.scss';
    }

    main {
        min-height: 100%;
        width: 100%;
        background: var(--color-subtle);
        display: grid;
        text-align: center;
    }
</style>
