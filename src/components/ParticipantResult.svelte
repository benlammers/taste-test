<script lang="ts">
    import type { ResultItemType } from '../stores/data';
    import { data } from '../stores/data';

    export let result: ResultItemType;

    let participantName = $data.persons.filter((person) => person.id === result.person)[0].name;

    const getSampleName = (id: number): string => {
        return $data.samples.filter((sample) => sample.id === id)[0].name;
    };
</script>

<h3>{participantName}</h3>
<ol>
    {#each result.rankings as ranking}
        <li>{getSampleName(ranking)}</li>
    {/each}
</ol>

<style lang="scss">
</style>
