<script lang="ts">
    import type { ResultItemType } from '../stores/data';
    import { data } from '../stores/data';

    export let result: ResultItemType;

    let participantName = $data.persons.filter((person) => person.id === result.person)[0].name;

    const getSampleName = (id: number): string => {
        return $data.samples.filter((sample) => sample.id === id)[0].name;
    };

    const getIndexOfSample = (id: number): number => {
        return $data.samples.findIndex((sample) => sample.id === id) + 1;
    };
</script>

<h3>{participantName}</h3>
<div class="ranked-list">
    <p class="text--sm font--thick">Rank</p>
    <div>
        {#each result.rankings as ranking, i}
            <div><span>{i + 1}<sup>{i === 0 ? 'st' : i > 1 ? 'th' : 'nd'}</sup></span></div>
        {/each}
    </div>
    <ol>
        {#each result.rankings as ranking}
            <li>
                <div>{getIndexOfSample(ranking)}</div>
                <span>{getSampleName(ranking)}</span>
            </li>
        {/each}
    </ol>
</div>
