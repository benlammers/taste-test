<script>
    export let checked = false;
</script>

<label class="switch">
    <input type="checkbox" bind:checked />
    <span class="slider" />
</label>

<style lang="scss">
    .switch {
        position: relative;
        display: inline-block;
        width: 6rem;
        height: 3.4rem;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--color-secondary);
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 3.4rem;
    }

    .slider:before {
        position: absolute;
        content: '';
        height: 2.6rem;
        width: 2.6rem;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: var(--color-primary);
    }

    input:checked + .slider {
        box-shadow: 0 0 1px var(--color-primary);
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(2.6rem);
        -ms-transform: translateX(2.6rem);
        transform: translateX(2.6rem);
    }
</style>
