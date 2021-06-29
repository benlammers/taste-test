<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { useNavigate } from 'svelte-navigator';

    import Checkmark32 from 'carbon-icons-svelte/lib/Checkmark32';

    import { category, categorySet } from '../stores/category';
    import { data } from '../stores/data';
    import { setupStep } from '../stores/steps';

    import ItemList from '../components/ItemList.svelte';
    import PageWrapper from '../components/PageWrapper.svelte';

    const navigate = useNavigate();

    let message = '';

    let prevStep: number;
    let transitioning = false;

    let sampleTypeError = '';

    onMount(() => {
        prevStep = $setupStep > 1 ? $setupStep : $setupStep - 1;
    });

    const handleNext = (): void => {
        message = '';

        if ($setupStep === 1) {
            if (!$category.replace(/\s/g, '')) {
                message = 'Sample Type must not be blank';
            } else showNext();
        } else if ($setupStep === 2) {
            if ($data.samples.length < 2) {
                message = 'Must have at least 2 samples';
            } else showNext();
        } else if ($data.persons.length < 2) {
            message = 'Must have at least 2 participants';
        } else {
            navigate('/confirm');
        }
    };

    const handleSampleType = () => {
        sampleTypeError = '';
        if (!$category.replace(/\s/g, '')) {
            sampleTypeError = 'Sample Category must not be blank';
        } else {
            $categorySet = true;
        }
    };

    const showNext = () => {
        prevStep = $setupStep;
        setupStep.increment();
        transitioning = true;
    };

    const showPrev = () => {
        if ($setupStep === 1) {
            $categorySet = false;
        } else {
            prevStep = $setupStep;
            setupStep.decrement();
            transitioning = true;
        }
    };

    const onTransitionEnd = () => {
        transitioning = false;
    };

    // Pulled from template to avoid Typescript error
    $: step2x = $setupStep === 1 ? 300 : -300;
</script>

<PageWrapper>
    <h1>Lets Get Started</h1>

    {#if $setupStep === 1 && !transitioning}
        {#if !$categorySet}
            <p class="subtitle" transition:fade|local>What category of samples will be tasted today</p>
        {:else}
            <p class="subtitle" transition:fade|local>Today we will be sampling</p>
        {/if}
        <div class="content-wrapper" transition:fly|local={{ x: -300 }} on:outroend={onTransitionEnd}>
            {#if !$categorySet}
                <form on:submit|preventDefault={handleSampleType} class:error={sampleTypeError}>
                    <label for="sample-type">Category of Samples</label>
                    <input
                        type="text"
                        id="sample-type"
                        placeholder="Category of Samples"
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
            {:else}
                <h2>{$category}</h2>
            {/if}
        </div>
    {:else if $setupStep === 2 && !transitioning}
        <p class="subtitle" transition:fade|local>
            Add the types of {$category} you will be sampling<br /><strong
                >in the order you will be tasting them in</strong
            >
        </p>
        <div
            class="content-wrapper"
            in:fly|local={{ x: prevStep === 1 ? 300 : -300 }}
            out:fly|local={{ x: step2x }}
            on:outroend={onTransitionEnd}
        >
            <ItemList
                items={$data.samples}
                add={data.addSample}
                remove={data.removeSample}
                label={`Add type of ${$category}`}
                itemName={$category}
                placeholder={`Type of ${$category}`}
            />
        </div>
    {:else if $setupStep === 3 && !transitioning}
        <p class="subtitle" transition:fade|local>Add the participants of today's taste test</p>
        <div class="content-wrapper" transition:fly|local={{ x: 300 }} on:outroend={onTransitionEnd}>
            <ItemList
                items={$data.persons}
                add={data.addPerson}
                remove={data.removePerson}
                label="Add Participant"
                itemName="Participant"
                placeholder="Participant Name"
            />
        </div>
    {/if}

    <span class="message">{message}</span>

    <div class="button-wrapper" class:error={message}>
        {#if $setupStep > 1 || $categorySet}
            <button class="btn-secondary" transition:fade|local on:click={showPrev}>Back</button>
        {/if}
        {#if $category.replace(/\s/g, '') && $categorySet}
            <button class="btn-primary" transition:fade|local on:click={handleNext}>Next</button>
        {/if}
    </div>
</PageWrapper>

<!--

    <PageWrapper>
        <h1>
        <p class="subtitle">
        <div class="wrapper">
        <span class="message">
        <div class="buttons">    
    </PageWrapper>

-->
<style lang="scss">
    p {
        font-size: 2rem;
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
        color: red;
    }
</style>
