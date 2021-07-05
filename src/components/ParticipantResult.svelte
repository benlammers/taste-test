<script lang="ts">
    import type { ResultItemType } from '../stores/data';
    import { data, getOrderBySampleId } from '../stores/data';

    export let result: ResultItemType;

    let participantName: string = $data.participants.filter((participant) => participant.id === result.participant)[0]
        .name;

    const getSampleName = (id: number): string => {
        return $data.samples.filter((sample) => sample.id === id)[0].name;
    };
</script>

<div class="participant">
    <h3>{participantName}</h3>
    <div class="ranked-list">
        <p class="text--sm font--thick">Rank</p>
        <div>
            {#each result.rankings as ranking, i}
                <div><span>{i + 1}<sup>{i === 0 ? 'st' : i === 1 ? 'nd' : i > 2 ? 'th' : 'rd'}</sup></span></div>
            {/each}
        </div>
        <ol>
            {#each result.rankings as ranking}
                <li>
                    <div>{getOrderBySampleId(ranking)}</div>
                    <span>{getSampleName(ranking)}</span>
                </li>
            {/each}
        </ol>
    </div>
</div>
