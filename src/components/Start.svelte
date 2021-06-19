<script lang="ts">
    import { Link } from 'svelte-navigator';

    import { useNavigate, useLocation } from 'svelte-navigator';

    const navigate = useNavigate();
    const location = useLocation();
</script>

<h1>Lets Get Started</h1>
<p>Add all the items you would like to test</p>
<p>Keep this hidden if you would like it to be a blind taste test</p>

<style lang="scss">
    h1 {
        color: var(--color-primary);
        text-transform: uppercase;
        font-size: 6rem;
        font-weight: 100;
    }

    p {
        font-size: 1.6rem;
    }
</style>
