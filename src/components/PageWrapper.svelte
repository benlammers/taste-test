<script lang="ts">
    import { fade } from 'svelte/transition';
</script>

<div class="page-wrapper" in:fade={{ duration: 400, delay: 300 }} out:fade={{ duration: 400 }}>
    <slot />
</div>

<style lang="scss">
    .page-wrapper {
        grid-column: 1 / 2;
        grid-row: 1 / 2;

        height: max-content;
        min-height: min(80rem, 80vh);
        width: calc(100vw - 48px);
        max-width: 600px;
        margin: 1.2rem auto;
        padding: 2.4rem;

        display: grid;
        grid-template-rows: max-content max-content 1fr max-content max-content;
        align-content: start;
        row-gap: 2.4rem;

        @media only screen and (max-width: 576px) {
            min-height: 100%;
        }
    }

    :global {
        .subtitle-wrapper {
            grid-row: 2 / 3;
            grid-column: 1 / 2;
        }

        .content-wrapper {
            grid-row: 3 / 4;
            grid-column: 1 / 2;

            display: grid;
            align-content: start;
        }

        .message-wrapper {
            grid-row: 4 / 5;
            grid-column: 1 / 2;
        }

        .button-wrapper {
            grid-row: -2 / -1;
            grid-column: 1 / 2;
        }
    }
</style>
