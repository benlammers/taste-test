import { get, writable } from 'svelte/store';

export interface ListItemType {
    name: string;
    id: number;
}

export interface ResultItemType {
    participant: number;
    rankings: number[];
}

export const data = (() => {
    const { subscribe, set, update } = writable<{
        samples: ListItemType[];
        participants: ListItemType[];
        results: ResultItemType[];
        isAlphanumerical: boolean;
    }>({
        samples: [],
        participants: [],
        results: [],
        isAlphanumerical: true,
    });

    const addSample = (newSample: string): void => {
        update(({ samples, results, ...store }) => {
            let newSampleId: number;

            if (samples.length > 0) {
                newSampleId = samples[samples.length - 1].id + 1;
            } else {
                newSampleId = 1;
            }

            return {
                ...store,
                samples: [...samples, { name: newSample, id: newSampleId }],
                results: results.map((result) => {
                    return {
                        ...result,
                        rankings: [...result.rankings, newSampleId],
                    };
                }),
            };
        });
    };

    const removeSample = (sampleId: number): void => {
        update(({ samples, results, ...store }) => {
            return {
                ...store,
                samples: samples.filter((sample) => sample.id !== sampleId),
                results: results.map((result) => {
                    return {
                        ...result,
                        rankings: result.rankings.filter((sample) => sample !== sampleId),
                    };
                }),
            };
        });
    };

    const addParticipant = (newParticipant: string): void => {
        update(({ participants, results, samples, ...store }) => {
            let newParticipantId: number;

            if (participants.length > 0) {
                newParticipantId = participants[participants.length - 1].id + 1;
            } else {
                newParticipantId = 1;
            }

            return {
                ...store,
                samples,
                participants: [...participants, { name: newParticipant, id: newParticipantId }],
                results: [...results, { participant: newParticipantId, rankings: samples.map((sample) => sample.id) }],
            };
        });
    };

    const removeParticipant = (participantId: number): void => {
        update(({ participants, results, ...store }) => {
            return {
                ...store,
                participants: participants.filter((participant) => participant.id !== participantId),
                results: results.filter((result) => result.participant !== participantId),
            };
        });
    };

    const updateRanks = (newResult: ResultItemType): void => {
        update(({ results, ...store }) => {
            let resultIndex = results.findIndex((result) => result.participant === newResult.participant);
            let newResults = [...results];
            newResults[resultIndex] = newResult;

            return {
                ...store,
                results: newResults,
            };
        });
    };
    return {
        subscribe,
        set,
        update,
        addSample,
        removeSample,
        addParticipant,
        removeParticipant,
        updateRanks,
    };
})();

export const getOrderBySampleId = (id: number): number | string => {
    let { isAlphanumerical, samples } = get(data);
    let index = samples.findIndex((sample) => sample.id === id);

    return isAlphanumerical ? String.fromCharCode(97 + index) : index + 1;
};
