<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { useNavigate } from 'svelte-navigator';

    import { store, sampleType } from '../stores';

    import ItemList from '../components/ItemList.svelte';
    import PageWrapper from '../components/PageWrapper.svelte';

    const navigate = useNavigate();

    // let showItems = true;
    // let showNames = false;
    let message = '';

    let step = 1;
    let prevStep = step;
    let transitioning = false;

    const handleNext = (): void => {
        message = '';

        if (step === 1) {
            if (!$sampleType.replace(/\s/g, '')) {
                message = 'Sample Type must not be blank';
            } else showNext();
        } else if (step === 2) {
            if ($store.samples.length < 2) {
                message = 'Must have at least 2 samples';
            } else showNext();
        } else if ($store.persons.length < 2) {
            message = 'Must have at least 2 participants';
        } else {
            navigate('/rank');
        }
    };

    const showNext = () => {
        prevStep = step;
        step += 1;
        transitioning = true;
    };

    const showPrev = () => {
        prevStep = step;
        step -= 1;
        transitioning = true;
    };

    const onTransitionEnd = () => {
        transitioning = false;
    };

    let step2x = step === 1 ? 300 : -300;
</script>

<PageWrapper>
    <h1>Lets Get Started</h1>

    <p>Add all the items you would like to test</p>
    <p>Keep this hidden if you would like it to be a blind taste test</p>

    {#if step === 1 && !transitioning}
        <div class="input-wrapper" transition:fly|local={{ x: -300 }} on:outroend={onTransitionEnd}>
            <input type="text" placeholder="Type of samples" bind:value={$sampleType} />
        </div>
    {:else if step === 2 && !transitioning}
        <div
            class="input-wrapper"
            in:fly|local={{ x: prevStep === 1 ? 300 : -300 }}
            out:fly|local={{ x: step2x }}
            on:outroend={onTransitionEnd}
        >
            <ItemList
                items={$store.samples}
                add={store.addSample}
                remove={store.removeSample}
                label="Add Sample"
                itemName="Sample"
                placeholder="Sample Name"
            />
        </div>
    {:else if step === 3 && !transitioning}
        <div class="input-wrapper" transition:fly|local={{ x: 300 }} on:outroend={onTransitionEnd}>
            <ItemList
                items={$store.persons}
                add={store.addPerson}
                remove={store.removePerson}
                label="Add Participant"
                itemName="Participant"
                placeholder="Participant Name"
            />
        </div>
    {/if}

    <span class="message">{message}</span>

    <div class="button-wrapper">
        {#if step > 1}
            <button class="btn-secondary" transition:fade|local on:click={showPrev}>Back</button>
        {/if}
        <button class="btn-primary" on:click={handleNext}>Next</button>
    </div>
</PageWrapper>

<style lang="scss">
    p {
        font-size: 2rem;
    }

    .input-wrapper {
        display: grid;
        width: calc(100vw - 48px);
        max-width: 400px;
        margin: 1.2rem auto;
    }

    button {
        justify-self: center;
    }

    .button-wrapper {
        display: grid;
        grid-template-columns: 1fr max-content;
        width: 100%;

        button {
            justify-self: start;
        }

        button:last-child {
            justify-self: end;
        }
    }

    .message {
        font-size: 1.6rem;
    }
</style>
