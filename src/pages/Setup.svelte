<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { useNavigate } from 'svelte-navigator';

    import Checkmark32 from 'carbon-icons-svelte/lib/Checkmark32';

    import { category } from '../stores/category';
    import { data } from '../stores/data';
    import { setupStep } from '../stores/steps';

    import ItemList from '../components/ItemList.svelte';
    import PageWrapper from '../components/PageWrapper.svelte';
    import Toggle from '../components/Toggle.svelte';

    const navigate = useNavigate();

    let message: string = '';

    let prevStep: number;
    let transitioning: boolean = false;

    let sampleTypeError: string = '';

    onMount(() => {
        prevStep = $setupStep === 1 ? 2 : $setupStep - 1;
    });

    const handleNext = (): void => {
        message = '';

        if ($setupStep === 2) {
            showNext();
        } else if ($setupStep === 3) {
            if ($data.samples.length < 2) {
                message = 'Must have at least 2 samples';
            } else showNext();
        } else if ($data.participants.length < 2) {
            message = 'Must have at least 2 participants';
        } else {
            navigate('/confirm');
        }
    };

    const handleSampleType = (): void => {
        sampleTypeError = '';
        if (!$category.replace(/\s/g, '')) {
            sampleTypeError = 'Sample Category must not be blank';
        } else {
            setupStep.increment();
        }
    };

    const showNext = (): void => {
        prevStep = $setupStep;
        setupStep.increment();
        transitioning = true;
    };

    const showPrev = (): void => {
        prevStep = $setupStep;
        setupStep.decrement();
        transitioning = true;
    };

    const onTransitionEnd = (): void => {
        transitioning = false;
    };

    // Pulled from template to avoid Typescript error
    $: step2x = $setupStep === 1 ? 300 : -300;
    $: step3x = $setupStep === 2 ? 300 : -300;
</script>

<PageWrapper>
    <h1>Lets Get Started</h1>

    {#if $setupStep === 1 && !transitioning}
        <p class="subtitle-wrapper text--sm" transition:fade|local>What category of samples will be tasted today?</p>
        <div class="content-wrapper" transition:fly|local={{ x: -300 }} on:outroend={onTransitionEnd}>
            <form on:submit|preventDefault={handleSampleType} class:error={sampleTypeError}>
                <label for="sample-type">Category of Samples</label>
                <input
                    type="text"
                    id="sample-type"
                    placeholder="ie. cheese, orange juice, etc"
                    bind:value={$category}
                    on:focus={() => (sampleTypeError = '')}
                />
                <button type="submit">
                    <Checkmark32 />
                </button>
                {#if sampleTypeError}
                    <span>{sampleTypeError}</span>
                {/if}
            </form>
        </div>
    {:else if $setupStep === 2 && !transitioning}
        <p class="subtitle-wrapper text--sm" transition:fade|local>Today you will be sampling</p>
        <div
            class="content-wrapper"
            in:fly|local={{ x: prevStep === 2 ? 300 : -300 }}
            out:fly|local={{ x: step2x }}
            on:outroend={onTransitionEnd}
        >
            <h2>{$category}</h2>
        </div>
    {:else if $setupStep === 3 && !transitioning}
        <p class="subtitle-wrapper text--sm" transition:fade|local>
            Add types of {$category.toLowerCase()}
            <span class="text--sm font--bold">in the order they will be sampled in</span>
        </p>
        <div
            class="content-wrapper"
            in:fly|local={{ x: prevStep === 2 ? 300 : -300 }}
            out:fly|local={{ x: step3x }}
            on:outroend={onTransitionEnd}
        >
            <ItemList
                items={$data.samples}
                add={data.addSample}
                remove={data.removeSample}
                label={`Add type of ${$category.toLowerCase()}`}
                itemName={$category}
                placeholder={`Type of ${$category.toLowerCase()}`}
                isAlphanumerical={$data.isAlphanumerical}
            />
            <div class="toggle-wrapper">
                <p class="text--sm">Use letters for ordering</p>
                <Toggle bind:checked={$data.isAlphanumerical} />
            </div>
        </div>
    {:else if $setupStep === 4 && !transitioning}
        <p class="subtitle-wrapper text--sm" transition:fade|local>Add today's participants</p>
        <div class="content-wrapper" transition:fly|local={{ x: 300 }} on:outroend={onTransitionEnd}>
            <ItemList
                items={$data.participants}
                add={data.addParticipant}
                remove={data.removeParticipant}
                label="Add Participant"
                itemName="Participant"
                placeholder="Participant Name"
            />
        </div>
    {/if}

    <span class="message-wrapper text--sm color--red">{message}</span>

    <div class="button-wrapper" class:error={message}>
        {#if $setupStep > 1}
            <button class="btn-secondary back" transition:fade|local on:click={showPrev}>Back</button>
            <button class="btn-primary next" transition:fade|local on:click={handleNext}
                >{$setupStep < 4 ? 'Next' : 'Continue'}</button
            >
        {/if}
    </div>
</PageWrapper>

<style lang="scss">
    .content-wrapper {
        grid-template-rows: max-content 1fr max-content;
    }

    .toggle-wrapper {
        align-self: end;
        display: grid;
        grid-template-columns: max-content max-content;
        align-items: center;
        justify-content: center;
        column-gap: 2.4rem;
    }
</style>
