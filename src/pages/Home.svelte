<script lang="ts">
    import { Link } from 'svelte-navigator';
    import { useNavigate, useLocation } from 'svelte-navigator';

    const navigate = useNavigate();
    const location = useLocation();
</script>

<h1>Welcome to the Taste Test App</h1>
<p>Enjoy the tastes and we'll take care of the rest</p>

<Link to="/start">Start Tasting!</Link>

<style lang="scss">
    :global(a) {
        font-size: 1.6rem;
    }

    p {
        font-size: 1.6rem;
    }
</style>
