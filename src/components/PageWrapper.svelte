<script lang="ts">
    import { fade } from 'svelte/transition';
</script>

<div class="page-wrapper" in:fade={{ duration: 400, delay: 300 }} out:fade={{ duration: 400 }}>
    <slot />
</div>

<style lang="scss">
    .page-wrapper {
        min-height: min(80rem, 80vh);
        height: max-content;
        width: 100%;
        grid-row: 1 / 2;
        grid-column: 1 / 2;

        max-width: 600px;
        padding: 2.4rem;

        margin: 0 auto;

        display: grid;
        align-content: start;
        grid-template-rows: max-content max-content 1fr max-content max-content;
        row-gap: 2.4rem;

        @media only screen and (max-width: 576px) {
            min-height: 100%;
        }
    }
</style>
