<script lang="ts">
    import { fade } from 'svelte/transition';
</script>

<div class="page-wrapper" in:fade={{ duration: 400, delay: 300 }} out:fade={{ duration: 400 }}>
    <slot />
</div>

<style lang="scss">
    .page-wrapper {
        height: 100%;
        width: 100%;
        grid-row: 1 / 2;
        grid-column: 1 / 2;

        max-width: 600px;
        padding: 2.4rem;

        margin: 0 auto;

        display: grid;
        align-content: start;
        row-gap: 2.4rem;
    }
</style>
