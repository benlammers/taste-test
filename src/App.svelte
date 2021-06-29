<script lang="ts">
    import { Router, Route } from 'svelte-navigator';
    import Confirm from './pages/Confirm.svelte';
    import Home from './pages/Home.svelte';
    import Perform from './pages/Perform.svelte';
    import Rank from './pages/Rank.svelte';
    import Results from './pages/Results.svelte';
    import Setup from './pages/Setup.svelte';
</script>

<main>
    <Router>
        <Route path="/">
            <Home />
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

<!-- 
    Step 1: Home Page - START TASTING!

    Step 2: Input Category - Single Text Input

    Step 3: Input Samples (Types of Category) - ItemList

    Step 4: Input Participants - Item List

    Step 5: Overview and Confirmation
        - Show list of samples
        - Randomize list?
        - button to input rankings/back button

    Steps 6 -> (# of participants + 6)

    Step 7ish: Middle page - confirm "See Results"

    Step 8: Show results
-->
<style type="text/scss">
    main {
        min-height: 100%;
        width: 100%;
        background: var(--color-subtle);
        display: grid;
        text-align: center;
    }
</style>
